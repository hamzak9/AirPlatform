# Worksy Ops - Route Map & Information Architecture

## Route Overview

### Core Operations (10 routes)

| Route               | Purpose                                  | Primary CTA         | Empty State Message                                                   |
| ------------------- | ---------------------------------------- | ------------------- | --------------------------------------------------------------------- |
| `/app/dashboard`    | Overview KPIs, alerts, and quick actions | "View All Tasks"    | "Welcome to Worksy Ops! Add your first property to get started."      |
| `/app/scheduling`   | Task calendar with upcoming assignments  | "Create Task"       | "No tasks scheduled yet. Create your first automated task."           |
| `/app/work`         | Kanban board for work coordination       | "Assign Work"       | "No work items yet. Start by creating tasks from scheduling."         |
| `/app/checklists`   | Checklist templates and execution runs   | "New Checklist"     | "No checklists created. Build your first quality checklist template." |
| `/app/maintenance`  | Work order triage and management         | "Create Work Order" | "No maintenance requests. Track repairs and vendor work here."        |
| `/app/inventory`    | Item tracking, par levels, consumption   | "Add Item"          | "Start tracking inventory. Add your first supply item."               |
| `/app/payments`     | Payouts, invoices, payment methods       | "Record Payout"     | "No payment records. Track team and vendor payouts here."             |
| `/app/insights`     | Analytics, reports, and data exports     | "Generate Report"   | "No data yet. Reports will appear once you have activity."            |
| `/app/smart-locks`  | Smart lock integrations and codes        | "Connect Lock"      | "No smart locks connected. Integrate access control systems."         |
| `/app/housekeeping` | Staff management and assignments         | "Add Staff Member"  | "No housekeeping staff. Build your cleaning team."                    |

### Guest Experience (4 routes)

| Route            | Purpose                           | Primary CTA     | Empty State Message                                               |
| ---------------- | --------------------------------- | --------------- | ----------------------------------------------------------------- |
| `/app/messaging` | Message templates and automation  | "New Template"  | "No message templates. Create automated guest communications."    |
| `/app/guide`     | Digital welcome book builder      | "Create Guide"  | "No guest guides created. Build your first digital welcome book." |
| `/app/assist`    | AI-powered guest assistant (stub) | "Configure AI"  | "AI assistant coming soon. Automate guest support with AI."       |
| `/app/upsells`   | Revenue-boosting offer catalog    | "Create Upsell" | "No upsell offers. Create add-on services to boost revenue."      |

### Setup & Admin (5 routes)

| Route                      | Purpose                                | Primary CTA          | Empty State Message                                              |
| -------------------------- | -------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| `/app/properties`          | Property list and detail management    | "Add Property"       | "No properties yet. Add your first property to get started."     |
| `/app/team`                | User management with role-based access | "Invite Team Member" | "You're the only team member. Invite others to collaborate."     |
| `/app/vendors`             | Vendor directory and service coverage  | "Add Vendor"         | "No vendors added. Build your trusted service provider network." |
| `/app/integrations/airbnb` | Airbnb connection and calendar sync    | "Connect Airbnb"     | "Airbnb not connected. Sync your listings and reservations."     |
| `/app/settings`            | Organization settings and preferences  | "Update Settings"    | "Configure your organization settings and preferences."          |

---

## Navigation Hierarchy

```
Dashboard (Home)

OPERATIONS
├── Scheduling
├── Work Coordination
├── Checklists
├── Maintenance
├── Inventory
├── Payments
├── Insights & Reporting
├── Smart Locks
└── Housekeeping

GUEST EXPERIENCE
├── Messaging
├── Guide
├── AI Assist
└── Upsells

SETUP
├── Properties
├── Team
├── Vendors
├── Integrations
│   └── Airbnb
└── Settings
```

---

## Page Structure Template

Each page follows this consistent structure:

```tsx
// Header Section
- Page Title (h1)
- Description (p, muted)
- Primary Action Button (top-right)

// Content Area
- Empty State (when no data)
  - Icon
  - Title
  - Description
  - CTA Button
- OR Data View (when data exists)
  - Table/Grid/Board
  - Pagination/Filters

// Footer
- Help text or links (optional)
```

---

## Component Hierarchy

```
AppLayout
├── AppSidebar (navigation)
├── AppHeader (breadcrumbs, user menu)
└── AppContent (page content)
    ├── PageHeader (title, description, actions)
    └── PageBody (empty state or data view)
```

---

## Design Principles

1. **Server-first**: Use Server Components by default
2. **Consistent UX**: Same empty state pattern across all pages
3. **Clear CTAs**: Single primary action per page
4. **Progressive disclosure**: Start simple, add complexity as needed
5. **Mobile-ready**: Responsive layouts throughout
6. **Type-safe**: Full TypeScript coverage
7. **Accessible**: ARIA labels, semantic HTML

---

## Future Enhancements

- Real-time updates (WebSockets)
- Advanced filtering and search
- Bulk operations
- Data exports (CSV, PDF)
- Mobile app parity
- Keyboard shortcuts
- Dark mode support
- Multi-language support
