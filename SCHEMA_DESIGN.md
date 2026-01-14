# AirPlatform Prisma Schema Design

## Overview
This schema is designed for an Airbnb-only property operations OS focused on the **"Unit Ready"** workflow. The core premise: a Unit becomes READY only when all tasks for a turnover window are completed AND a final inspection checklist passes.

## Key Design Decisions

### 1. Multi-Tenancy via Membership Model
- **Organization**: Top-level tenant
- **User**: Global user account (can belong to multiple orgs)
- **Membership**: Join table with role-based access (OWNER, MANAGER, COORDINATOR, CLEANER, INSPECTOR, VENDOR)

**Why?** Users like cleaners or vendors may work for multiple property management companies. Membership model allows flexible many-to-many relationships with role scoping per organization.

### 2. Template vs Instance Pattern
The schema separates **templates** (reusable definitions) from **instances** (actual executions):

- **TaskTemplate** → **TaskInstance**
- **ChecklistTemplate** → **ChecklistRun**

**Why?** Organizations define standard procedures once (e.g., "Standard Turnover Cleaning") then auto-generate instances when reservations are created. Changing a template doesn't affect historical data.

### 3. Unit Ready Workflow

```
Reservation Created/Updated
  ↓
Generate TaskInstances (based on TaskTemplates with trigger rules)
  ↓
Assign TaskInstances to Users/Vendors
  ↓
Complete Tasks (may require ChecklistRun + Proof uploads)
  ↓
Run Final Inspection ChecklistRun
  ↓
If All Tasks COMPLETED + Inspection PASSED
  ↓
Unit.readyStatus = READY
```

Key fields enabling this:
- `Unit.readyStatus` (READY, NOT_READY, IN_PROGRESS, BLOCKED)
- `TaskTemplate.trigger` + `triggerOffsetHours` (e.g., BEFORE_CHECK_IN, -24 hours)
- `TaskTemplate.requiresChecklist` + `requiresProof`
- `ChecklistRun.passed` (boolean pass/fail)
- `TaskInstance.status` (PENDING → ASSIGNED → IN_PROGRESS → COMPLETED)

### 4. Assignment Model
Flexible assignment system linking tasks/work orders/checklists to either:
- Internal **User** (employee, cleaner)
- External **Vendor** (contractor)

Supports workflow:
- Assign → Accept → In Progress → Complete
- Track timestamps (assignedAt, acceptedAt, completedAt)

### 5. Proof System
Comprehensive proof tracking with:
- **ProofType**: PHOTO, NOTE, SIGNATURE, GPS_CHECKIN, GPS_CHECKOUT
- Links to TaskInstance or WorkOrder
- Captured by User with automatic timestamp
- GPS coordinates for location verification

### 6. Work Order Lifecycle
```
WorkOrder Created (OPEN)
  ↓
Request Quotes from Vendors (PENDING_QUOTE)
  ↓
Vendors Submit WorkOrderQuote (QUOTED)
  ↓
Manager Creates WorkOrderApproval (APPROVED/REJECTED)
  ↓
If APPROVED → Assign to Vendor (IN_PROGRESS)
  ↓
Vendor Completes Work + Uploads Proof (COMPLETED)
  ↓
Invoice + Payout Created
```

Line items allow detailed cost tracking.

## Indexes & Query Optimization

### Critical Query Patterns

#### 1. "What tasks are due today for my properties?"
```prisma
@@index([scheduledFor])     // TaskInstance
@@index([unitId])            // TaskInstance
```

**Query:**
```typescript
const tasks = await prisma.taskInstance.findMany({
  where: {
    scheduledFor: { gte: startOfDay, lte: endOfDay },
    unit: { property: { organizationId: userOrgId } }
  }
})
```

#### 2. "Show me all pending assignments for this user"
```prisma
@@index([userId])            // Assignment
@@index([status])            // Assignment
```

**Query:**
```typescript
const assignments = await prisma.assignment.findMany({
  where: { userId: userId, status: 'PENDING' },
  include: { taskInstance: true, workOrder: true }
})
```

#### 3. "Is Unit X ready for the next guest?"
```prisma
@@index([readyStatus])       // Unit
@@index([unitId, status])    // TaskInstance (composite)
```

**Query:**
```typescript
const unit = await prisma.unit.findUnique({
  where: { id: unitId },
  include: {
    taskInstances: {
      where: {
        reservationId: nextReservationId,
        status: { not: 'COMPLETED' }
      }
    },
    checklistRuns: {
      where: {
        taskInstance: { reservationId: nextReservationId },
        status: 'COMPLETED',
        passed: true
      }
    }
  }
})

// Logic: Unit is READY if taskInstances.length === 0 && checklistRuns with passed=true exists
```

#### 4. "Find all reservations with upcoming check-ins"
```prisma
@@index([checkIn])           // Reservation
@@index([checkOut])          // Reservation
@@index([status])            // Reservation
```

**Query:**
```typescript
const upcoming = await prisma.reservation.findMany({
  where: {
    checkIn: { gte: new Date(), lte: add(new Date(), { days: 7 }) },
    status: 'CONFIRMED'
  },
  orderBy: { checkIn: 'asc' }
})
```

#### 5. "Show work order history for a property"
```prisma
@@index([propertyId])        // WorkOrder
@@index([status])            // WorkOrder
```

#### 6. "Vendor performance: completed tasks this month"
```prisma
@@index([vendorId])          // Assignment
@@index([completedAt])       // Assignment (implicit via createdAt)
```

#### 7. "Audit trail: who changed this task?"
```prisma
@@index([entityType, entityId]) // AuditLog (composite)
@@index([createdAt])            // AuditLog
```

### Unique Constraints

1. **Organization.slug** - URL-friendly unique identifier
2. **User.email** - One email per user account
3. **Membership (userId, organizationId)** - User can only have one role per org
4. **AirbnbListingMapping.airbnbListingId** - One Airbnb listing maps to one Unit
5. **Reservation.airbnbReservationId** - Prevent duplicate import
6. **Invoice.invoiceNumber** - Sequential invoice numbering
7. **VendorCoverageArea (vendorId, propertyId)** - Prevent duplicate coverage entries

### Cascade Delete Behavior

#### Organization → Cascade All
When an Organization is deleted, cascade to:
- Memberships
- Properties → Units → Reservations, TaskInstances, ChecklistRuns
- Vendors, TaskTemplates, ChecklistTemplates, Invoices, AuditLogs

**Why?** Multi-tenant data isolation. If an org churns, remove all their data.

#### Property → Cascade Units
Units belong to Properties. If Property deleted, Units go too.

#### Reservation → SetNull on TaskInstance
If Reservation is deleted (e.g., cancellation), keep TaskInstances for historical record but set `reservationId = null`.

#### User/Vendor → SetNull on Assignments
If User or Vendor deleted, preserve Assignment history but null out the reference.

## Foreign Key Relationships Summary

```
Organization
  ├── Membership (userId)
  ├── Property
  │   ├── Unit
  │   │   ├── Reservation
  │   │   │   └── TaskInstance
  │   │   ├── TaskInstance
  │   │   └── ChecklistRun
  │   ├── WorkOrder
  │   └── VendorCoverageArea
  ├── Vendor
  │   ├── VendorSkill
  │   ├── VendorCoverageArea
  │   ├── WorkOrderQuote
  │   ├── Invoice
  │   └── Payout
  ├── TaskTemplate → TaskInstance
  ├── ChecklistTemplate
  │   ├── ChecklistTemplateItem
  │   └── ChecklistRun
  │       └── ChecklistRunItem
  └── AirbnbIntegration

TaskInstance
  ├── Assignment
  ├── ChecklistRun
  └── Proof

WorkOrder
  ├── WorkOrderLineItem
  ├── WorkOrderQuote
  ├── WorkOrderApproval
  ├── Assignment
  └── Proof

Assignment → User | Vendor
Assignment → TaskInstance | WorkOrder | ChecklistRun
```

## Enum Rationale

### TaskTrigger
- **BEFORE_CHECK_IN**: Generate task X hours before guest arrives
- **AFTER_CHECK_OUT**: Generate task X hours after guest leaves
- **MANUAL**: Created by staff, not auto-generated
- **RECURRING**: Weekly/monthly tasks (e.g., deep clean)

### UnitReadyStatus
- **READY**: All tasks done, inspection passed, ready for next guest
- **NOT_READY**: Default state, work needed
- **IN_PROGRESS**: Actively being worked on
- **BLOCKED**: Cannot proceed (e.g., maintenance issue)

### TaskInstanceStatus
- **PENDING**: Not started
- **ASSIGNED**: Given to someone
- **IN_PROGRESS**: Being worked on
- **BLOCKED**: Can't continue (waiting on parts, etc.)
- **COMPLETED**: Done
- **CANCELLED**: No longer needed

### ChecklistRunStatus
- **NOT_STARTED**: Created but not begun
- **IN_PROGRESS**: Some items checked
- **COMPLETED**: All items done
- **FAILED**: Inspection failed, unit not ready

## Future Enhancements (Stubbed)

### AirbnbOAuthToken
Store user-level OAuth tokens for Airbnb API access. Would enable:
- Automated reservation sync
- Automated message sending
- Calendar blocking

### AirbnbWebhookEvent
Process Airbnb webhooks for real-time updates:
- New reservation → Auto-generate TaskInstances
- Reservation updated → Adjust task schedules
- Cancellation → Mark tasks as cancelled

## Performance Considerations

1. **Composite indexes** for multi-field queries (e.g., `[entityType, entityId]` on AuditLog)
2. **Selective includes**: Only load relations when needed
3. **Pagination**: Use cursor-based pagination for large datasets
4. **Soft deletes**: Consider adding `deletedAt` for important entities instead of hard deletes
5. **Read replicas**: For analytics queries, use read replicas (Prisma supports this)

## Data Integrity Rules

1. **TaskInstance cannot be COMPLETED** until:
   - If `template.requiresChecklist` → linked ChecklistRun exists with `passed = true`
   - If `template.requiresProof` → at least one Proof record exists

2. **Unit.readyStatus = READY** requires:
   - All TaskInstances for next reservation have `status = COMPLETED`
   - Final inspection ChecklistRun has `passed = true`

3. **WorkOrderQuote can only be ACCEPTED** if:
   - Corresponding WorkOrderApproval has `status = APPROVED`

4. **Payout cannot be PAID** until:
   - Invoice is in SENT or PAID status (if linked to invoice)

These rules should be enforced in application logic or database triggers.
