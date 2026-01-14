import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { add, sub } from 'date-fns'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.auditLog.deleteMany()
  await prisma.proof.deleteMany()
  await prisma.checklistRunItem.deleteMany()
  await prisma.checklistRun.deleteMany()
  await prisma.assignment.deleteMany()
  await prisma.payout.deleteMany()
  await prisma.invoice.deleteMany()
  await prisma.workOrderApproval.deleteMany()
  await prisma.workOrderQuote.deleteMany()
  await prisma.workOrderLineItem.deleteMany()
  await prisma.workOrder.deleteMany()
  await prisma.vendorCoverageArea.deleteMany()
  await prisma.vendorSkill.deleteMany()
  await prisma.vendor.deleteMany()
  await prisma.taskInstance.deleteMany()
  await prisma.checklistTemplateItem.deleteMany()
  await prisma.checklistTemplate.deleteMany()
  await prisma.taskTemplate.deleteMany()
  await prisma.reservation.deleteMany()
  await prisma.airbnbListingMapping.deleteMany()
  await prisma.airbnbIntegration.deleteMany()
  await prisma.unit.deleteMany()
  await prisma.property.deleteMany()
  await prisma.membership.deleteMany()
  await prisma.user.deleteMany()
  await prisma.organization.deleteMany()

  // ============================================
  // ORGANIZATION
  // ============================================

  console.log('📋 Creating organization...')
  const org = await prisma.organization.create({
    data: {
      name: 'Coastal Stays Management',
      slug: 'coastal-stays',
      timezone: 'America/Los_Angeles',
      plan: 'pro',
    },
  })

  // ============================================
  // USERS & MEMBERSHIPS
  // ============================================

  console.log('👥 Creating users and memberships...')
  const hashedPassword = await hash('password123', 10)

  const owner = await prisma.user.create({
    data: {
      email: 'sarah@coastalstays.com',
      name: 'Sarah Chen',
      password: hashedPassword,
      phone: '+1-415-555-0100',
    },
  })

  await prisma.membership.create({
    data: {
      userId: owner.id,
      organizationId: org.id,
      role: 'OWNER',
    },
  })

  const manager = await prisma.user.create({
    data: {
      email: 'mike@coastalstays.com',
      name: 'Mike Rodriguez',
      password: hashedPassword,
      phone: '+1-415-555-0101',
    },
  })

  await prisma.membership.create({
    data: {
      userId: manager.id,
      organizationId: org.id,
      role: 'MANAGER',
    },
  })

  const cleaner = await prisma.user.create({
    data: {
      email: 'jessica@example.com',
      name: 'Jessica Williams',
      password: hashedPassword,
      phone: '+1-415-555-0102',
    },
  })

  await prisma.membership.create({
    data: {
      userId: cleaner.id,
      organizationId: org.id,
      role: 'CLEANER',
    },
  })

  const inspector = await prisma.user.create({
    data: {
      email: 'david@example.com',
      name: 'David Park',
      password: hashedPassword,
      phone: '+1-415-555-0103',
    },
  })

  await prisma.membership.create({
    data: {
      userId: inspector.id,
      organizationId: org.id,
      role: 'INSPECTOR',
    },
  })

  // ============================================
  // PROPERTIES & UNITS
  // ============================================

  console.log('🏠 Creating properties and units...')

  const beachHouse = await prisma.property.create({
    data: {
      name: 'Ocean View Beach House',
      address: '123 Coastal Drive',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94121',
      country: 'US',
      timezone: 'America/Los_Angeles',
      latitude: 37.7749,
      longitude: -122.4194,
      organizationId: org.id,
    },
  })

  const downtownCondo = await prisma.property.create({
    data: {
      name: 'Downtown Luxury Condos',
      address: '456 Market Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'US',
      timezone: 'America/Los_Angeles',
      latitude: 37.7893,
      longitude: -122.4008,
      organizationId: org.id,
    },
  })

  const unitA = await prisma.unit.create({
    data: {
      name: 'Beach House - Main Unit',
      bedrooms: 3,
      bathrooms: 2.5,
      maxGuests: 6,
      readyStatus: 'READY',
      lastReadyAt: new Date(),
      propertyId: beachHouse.id,
    },
  })

  const unitB = await prisma.unit.create({
    data: {
      name: 'Condo 301',
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 4,
      readyStatus: 'IN_PROGRESS',
      propertyId: downtownCondo.id,
    },
  })

  const unitC = await prisma.unit.create({
    data: {
      name: 'Condo 405',
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      readyStatus: 'NOT_READY',
      propertyId: downtownCondo.id,
    },
  })

  // ============================================
  // AIRBNB INTEGRATION
  // ============================================

  console.log('🔗 Setting up Airbnb integrations...')

  const airbnbOrgIntegration = await prisma.airbnbIntegration.create({
    data: {
      level: 'ORGANIZATION',
      status: 'CONNECTED',
      accessToken: 'fake_access_token_org',
      refreshToken: 'fake_refresh_token_org',
      expiresAt: add(new Date(), { days: 30 }),
      lastSyncedAt: new Date(),
      organizationId: org.id,
    },
  })

  await prisma.airbnbListingMapping.create({
    data: {
      airbnbListingId: 'ABB-12345678',
      airbnbUrl: 'https://airbnb.com/rooms/12345678',
      autoSyncCalendar: true,
      lastSyncedAt: new Date(),
      unitId: unitA.id,
    },
  })

  await prisma.airbnbListingMapping.create({
    data: {
      airbnbListingId: 'ABB-87654321',
      airbnbUrl: 'https://airbnb.com/rooms/87654321',
      autoSyncCalendar: true,
      lastSyncedAt: new Date(),
      unitId: unitB.id,
    },
  })

  await prisma.airbnbListingMapping.create({
    data: {
      airbnbListingId: 'ABB-11223344',
      airbnbUrl: 'https://airbnb.com/rooms/11223344',
      autoSyncCalendar: true,
      lastSyncedAt: new Date(),
      unitId: unitC.id,
    },
  })

  // ============================================
  // TASK TEMPLATES
  // ============================================

  console.log('📝 Creating task templates...')

  const turnoverCleaningTemplate = await prisma.taskTemplate.create({
    data: {
      name: 'Standard Turnover Cleaning',
      description: 'Complete cleaning between guest stays',
      type: 'CLEANING',
      trigger: 'AFTER_CHECK_OUT',
      triggerOffsetHours: 2, // 2 hours after checkout
      requiresChecklist: true,
      requiresProof: true,
      estimatedMinutes: 90,
      organizationId: org.id,
    },
  })

  const inspectionTemplate = await prisma.taskTemplate.create({
    data: {
      name: 'Quality Inspection',
      description: 'Final quality check before guest arrival',
      type: 'INSPECTION',
      trigger: 'BEFORE_CHECK_IN',
      triggerOffsetHours: -4, // 4 hours before check-in
      requiresChecklist: true,
      requiresProof: false,
      estimatedMinutes: 30,
      organizationId: org.id,
    },
  })

  const restockingTemplate = await prisma.taskTemplate.create({
    data: {
      name: 'Restocking Supplies',
      description: 'Restock toiletries, linens, and amenities',
      type: 'RESTOCKING',
      trigger: 'AFTER_CHECK_OUT',
      triggerOffsetHours: 3,
      requiresChecklist: false,
      requiresProof: false,
      estimatedMinutes: 20,
      organizationId: org.id,
    },
  })

  // ============================================
  // CHECKLIST TEMPLATES
  // ============================================

  console.log('✅ Creating checklist templates...')

  const cleaningChecklist = await prisma.checklistTemplate.create({
    data: {
      name: 'Standard Cleaning Checklist',
      description: 'Items to complete for every turnover',
      type: 'CLEANING',
      organizationId: org.id,
    },
  })

  await prisma.checklistTemplateItem.createMany({
    data: [
      {
        templateId: cleaningChecklist.id,
        title: 'Strip and remake all beds with fresh linens',
        order: 1,
        requiresPhoto: true,
        photoPrompt: 'Photo of freshly made beds',
      },
      {
        templateId: cleaningChecklist.id,
        title: 'Clean and sanitize all bathrooms',
        order: 2,
        requiresPhoto: true,
        photoPrompt: 'Photo of clean bathroom',
      },
      {
        templateId: cleaningChecklist.id,
        title: 'Vacuum and mop all floors',
        order: 3,
        requiresPhoto: false,
      },
      {
        templateId: cleaningChecklist.id,
        title: 'Clean kitchen and appliances',
        order: 4,
        requiresPhoto: true,
        photoPrompt: 'Photo of clean kitchen',
      },
      {
        templateId: cleaningChecklist.id,
        title: 'Empty all trash and replace liners',
        order: 5,
        requiresPhoto: false,
      },
      {
        templateId: cleaningChecklist.id,
        title: 'Dust all surfaces and wipe down furniture',
        order: 6,
        requiresPhoto: false,
      },
    ],
  })

  const inspectionChecklistTemplate = await prisma.checklistTemplate.create({
    data: {
      name: 'Pre-Arrival Inspection',
      description: 'Final quality check',
      type: 'INSPECTION',
      organizationId: org.id,
    },
  })

  await prisma.checklistTemplateItem.createMany({
    data: [
      {
        templateId: inspectionChecklistTemplate.id,
        title: 'All lights working',
        order: 1,
      },
      {
        templateId: inspectionChecklistTemplate.id,
        title: 'Temperature comfortable (68-72°F)',
        order: 2,
      },
      {
        templateId: inspectionChecklistTemplate.id,
        title: 'No odors or cleanliness issues',
        order: 3,
      },
      {
        templateId: inspectionChecklistTemplate.id,
        title: 'Welcome book and amenities in place',
        order: 4,
        requiresPhoto: true,
        photoPrompt: 'Photo of welcome amenities',
      },
    ],
  })

  // ============================================
  // RESERVATIONS
  // ============================================

  console.log('📅 Creating reservations...')

  const now = new Date()

  // Past reservation (completed)
  const res1 = await prisma.reservation.create({
    data: {
      airbnbReservationId: 'RES-PAST-001',
      confirmationCode: 'HMB4K2XY',
      guestName: 'Emily Johnson',
      guestEmail: 'emily.j@email.com',
      guestPhone: '+1-555-0200',
      numberOfGuests: 4,
      hasPets: false,
      checkIn: sub(now, { days: 10 }),
      checkOut: sub(now, { days: 7 }),
      status: 'CHECKED_OUT',
      totalPrice: 1200,
      unitId: unitA.id,
    },
  })

  // Current reservation (checked in)
  const res2 = await prisma.reservation.create({
    data: {
      airbnbReservationId: 'RES-CURRENT-001',
      confirmationCode: 'XY7PQ9WL',
      guestName: 'James Martinez',
      guestEmail: 'james.m@email.com',
      numberOfGuests: 2,
      hasPets: false,
      checkIn: sub(now, { days: 2 }),
      checkOut: add(now, { days: 3 }),
      status: 'CHECKED_IN',
      totalPrice: 850,
      unitId: unitB.id,
    },
  })

  // Upcoming reservation (tomorrow check-in)
  const res3 = await prisma.reservation.create({
    data: {
      airbnbReservationId: 'RES-UPCOMING-001',
      confirmationCode: 'AB3CD4EF',
      guestName: 'Lisa Thompson',
      guestEmail: 'lisa.t@email.com',
      guestPhone: '+1-555-0202',
      numberOfGuests: 3,
      hasPets: true,
      checkIn: add(now, { hours: 24 }),
      checkOut: add(now, { days: 5 }),
      status: 'CONFIRMED',
      totalPrice: 1400,
      guestNotes: 'Early check-in requested at 2pm',
      unitId: unitC.id,
    },
  })

  // Upcoming reservation (3 days out)
  const res4 = await prisma.reservation.create({
    data: {
      airbnbReservationId: 'RES-UPCOMING-002',
      confirmationCode: 'GH5IJ6KL',
      guestName: 'Robert Kim',
      guestEmail: 'robert.k@email.com',
      numberOfGuests: 2,
      hasPets: false,
      checkIn: add(now, { days: 3 }),
      checkOut: add(now, { days: 7 }),
      status: 'CONFIRMED',
      totalPrice: 950,
      unitId: unitA.id,
    },
  })

  // Future reservation
  const res5 = await prisma.reservation.create({
    data: {
      airbnbReservationId: 'RES-FUTURE-001',
      confirmationCode: 'MN7OP8QR',
      guestName: 'Amanda Davis',
      guestEmail: 'amanda.d@email.com',
      numberOfGuests: 6,
      hasPets: false,
      checkIn: add(now, { days: 14 }),
      checkOut: add(now, { days: 18 }),
      status: 'CONFIRMED',
      totalPrice: 2100,
      unitId: unitA.id,
    },
  })

  const res6 = await prisma.reservation.create({
    data: {
      airbnbReservationId: 'RES-FUTURE-002',
      confirmationCode: 'ST9UV0WX',
      guestName: 'Chris Anderson',
      guestEmail: 'chris.a@email.com',
      numberOfGuests: 4,
      hasPets: true,
      checkIn: add(now, { days: 20 }),
      checkOut: add(now, { days: 23 }),
      status: 'CONFIRMED',
      totalPrice: 1650,
      unitId: unitB.id,
    },
  })

  // ============================================
  // TASK INSTANCES (Auto-generated from reservations)
  // ============================================

  console.log('📋 Creating task instances...')

  // For res3 (tomorrow check-in) - needs cleaning and inspection
  const cleaningTask1 = await prisma.taskInstance.create({
    data: {
      title: 'Turnover Cleaning - Unit C',
      description: 'Complete cleaning for Lisa Thompson arrival',
      type: 'CLEANING',
      status: 'COMPLETED',
      scheduledFor: add(res3.checkIn, { hours: -22 }), // 2 hours after previous checkout
      completedAt: sub(now, { hours: 6 }),
      templateId: turnoverCleaningTemplate.id,
      unitId: unitC.id,
      reservationId: res3.id,
    },
  })

  const inspectionTask1 = await prisma.taskInstance.create({
    data: {
      title: 'Pre-Arrival Inspection - Unit C',
      description: 'Final quality check before Lisa Thompson',
      type: 'INSPECTION',
      status: 'PENDING',
      scheduledFor: add(res3.checkIn, { hours: -4 }), // 4 hours before check-in
      templateId: inspectionTemplate.id,
      unitId: unitC.id,
      reservationId: res3.id,
    },
  })

  // For res4 (3 days out) - needs all tasks
  const cleaningTask2 = await prisma.taskInstance.create({
    data: {
      title: 'Turnover Cleaning - Beach House',
      description: 'Complete cleaning for Robert Kim arrival',
      type: 'CLEANING',
      status: 'ASSIGNED',
      scheduledFor: add(res4.checkIn, { hours: -70 }),
      templateId: turnoverCleaningTemplate.id,
      unitId: unitA.id,
      reservationId: res4.id,
    },
  })

  const restockingTask1 = await prisma.taskInstance.create({
    data: {
      title: 'Restock Supplies - Beach House',
      description: 'Restock toiletries and linens',
      type: 'RESTOCKING',
      status: 'PENDING',
      scheduledFor: add(res4.checkIn, { hours: -69 }),
      templateId: restockingTemplate.id,
      unitId: unitA.id,
      reservationId: res4.id,
    },
  })

  const inspectionTask2 = await prisma.taskInstance.create({
    data: {
      title: 'Pre-Arrival Inspection - Beach House',
      type: 'INSPECTION',
      status: 'PENDING',
      scheduledFor: add(res4.checkIn, { hours: -4 }),
      templateId: inspectionTemplate.id,
      unitId: unitA.id,
      reservationId: res4.id,
    },
  })

  // ============================================
  // CHECKLIST RUNS
  // ============================================

  console.log('✅ Creating checklist runs...')

  const cleaningRun1 = await prisma.checklistRun.create({
    data: {
      status: 'COMPLETED',
      startedAt: sub(now, { hours: 7 }),
      completedAt: sub(now, { hours: 6 }),
      passed: true,
      notes: 'All tasks completed. Unit looks great!',
      templateId: cleaningChecklist.id,
      unitId: unitC.id,
      taskInstanceId: cleaningTask1.id,
    },
  })

  // Create items for the completed checklist run
  await prisma.checklistRunItem.createMany({
    data: [
      {
        checklistRunId: cleaningRun1.id,
        title: 'Strip and remake all beds with fresh linens',
        completed: true,
        order: 1,
        requiresPhoto: true,
        photoUrl: 'https://example.com/photos/bed-made.jpg',
      },
      {
        checklistRunId: cleaningRun1.id,
        title: 'Clean and sanitize all bathrooms',
        completed: true,
        order: 2,
        requiresPhoto: true,
        photoUrl: 'https://example.com/photos/bathroom-clean.jpg',
      },
      {
        checklistRunId: cleaningRun1.id,
        title: 'Vacuum and mop all floors',
        completed: true,
        order: 3,
      },
      {
        checklistRunId: cleaningRun1.id,
        title: 'Clean kitchen and appliances',
        completed: true,
        order: 4,
        requiresPhoto: true,
        photoUrl: 'https://example.com/photos/kitchen-clean.jpg',
      },
      {
        checklistRunId: cleaningRun1.id,
        title: 'Empty all trash and replace liners',
        completed: true,
        order: 5,
      },
      {
        checklistRunId: cleaningRun1.id,
        title: 'Dust all surfaces and wipe down furniture',
        completed: true,
        order: 6,
      },
    ],
  })

  // ============================================
  // VENDORS
  // ============================================

  console.log('🔧 Creating vendors...')

  const cleaningVendor = await prisma.vendor.create({
    data: {
      name: 'Maria Gonzalez',
      company: 'Sparkle Clean Co',
      email: 'maria@sparkleclean.com',
      phone: '+1-415-555-0300',
      rating: 4.9,
      reviewCount: 127,
      organizationId: org.id,
    },
  })

  await prisma.vendorSkill.create({
    data: {
      type: 'CLEANING',
      hourlyRate: 45,
      vendorId: cleaningVendor.id,
    },
  })

  await prisma.vendorCoverageArea.createMany({
    data: [
      {
        vendorId: cleaningVendor.id,
        propertyId: beachHouse.id,
        travelTimeMinutes: 15,
      },
      {
        vendorId: cleaningVendor.id,
        propertyId: downtownCondo.id,
        travelTimeMinutes: 25,
      },
    ],
  })

  const plumbingVendor = await prisma.vendor.create({
    data: {
      name: 'Tom Harris',
      company: 'Bay Area Plumbing',
      email: 'tom@bayareaplumbing.com',
      phone: '+1-415-555-0301',
      rating: 4.7,
      reviewCount: 89,
      organizationId: org.id,
    },
  })

  await prisma.vendorSkill.create({
    data: {
      type: 'PLUMBING',
      hourlyRate: 95,
      vendorId: plumbingVendor.id,
    },
  })

  await prisma.vendorCoverageArea.create({
    data: {
      vendorId: plumbingVendor.id,
      propertyId: beachHouse.id,
      travelTimeMinutes: 30,
    },
  })

  // ============================================
  // ASSIGNMENTS
  // ============================================

  console.log('📌 Creating assignments...')

  const assignment1 = await prisma.assignment.create({
    data: {
      status: 'COMPLETED',
      userId: cleaner.id,
      taskInstanceId: cleaningTask1.id,
      assignedAt: sub(now, { hours: 8 }),
      acceptedAt: sub(now, { hours: 7, minutes: 30 }),
      completedAt: sub(now, { hours: 6 }),
    },
  })

  const assignment2 = await prisma.assignment.create({
    data: {
      status: 'ACCEPTED',
      userId: cleaner.id,
      taskInstanceId: cleaningTask2.id,
      assignedAt: sub(now, { hours: 2 }),
      acceptedAt: sub(now, { hours: 1 }),
    },
  })

  const assignment3 = await prisma.assignment.create({
    data: {
      status: 'PENDING',
      userId: inspector.id,
      taskInstanceId: inspectionTask1.id,
      assignedAt: sub(now, { hours: 1 }),
    },
  })

  // ============================================
  // PROOFS
  // ============================================

  console.log('📸 Creating proof records...')

  await prisma.proof.create({
    data: {
      type: 'GPS_CHECKIN',
      latitude: 37.7749,
      longitude: -122.4194,
      capturedAt: sub(now, { hours: 7 }),
      userId: cleaner.id,
      taskInstanceId: cleaningTask1.id,
    },
  })

  await prisma.proof.create({
    data: {
      type: 'PHOTO',
      fileUrl: 'https://example.com/proofs/bedroom-cleaned.jpg',
      note: 'All bedrooms cleaned and beds made',
      capturedAt: sub(now, { hours: 6, minutes: 30 }),
      userId: cleaner.id,
      taskInstanceId: cleaningTask1.id,
    },
  })

  await prisma.proof.create({
    data: {
      type: 'GPS_CHECKOUT',
      latitude: 37.7749,
      longitude: -122.4194,
      capturedAt: sub(now, { hours: 6 }),
      userId: cleaner.id,
      taskInstanceId: cleaningTask1.id,
    },
  })

  // ============================================
  // WORK ORDERS
  // ============================================

  console.log('🔨 Creating work orders...')

  const workOrder1 = await prisma.workOrder.create({
    data: {
      title: 'Leaking Kitchen Faucet',
      description: 'Guest reported dripping faucet in kitchen. Needs repair before next booking.',
      status: 'COMPLETED',
      priority: 'HIGH',
      propertyId: beachHouse.id,
      completedAt: sub(now, { days: 2 }),
    },
  })

  await prisma.workOrderLineItem.createMany({
    data: [
      {
        workOrderId: workOrder1.id,
        description: 'Replace kitchen faucet cartridge',
        quantity: 1,
        unitPrice: 45,
        totalPrice: 45,
      },
      {
        workOrderId: workOrder1.id,
        description: 'Labor (1.5 hours)',
        quantity: 1,
        unitPrice: 142.5,
        totalPrice: 142.5,
      },
    ],
  })

  const quote1 = await prisma.workOrderQuote.create({
    data: {
      totalAmount: 187.5,
      notes: 'Can complete today. Parts in stock.',
      status: 'ACCEPTED',
      vendorId: plumbingVendor.id,
      workOrderId: workOrder1.id,
    },
  })

  await prisma.workOrderApproval.create({
    data: {
      status: 'APPROVED',
      notes: 'Approved - urgent repair needed',
      approvedBy: manager.id,
      approvedByName: 'Mike Rodriguez',
      workOrderId: workOrder1.id,
    },
  })

  const woAssignment1 = await prisma.assignment.create({
    data: {
      status: 'COMPLETED',
      vendorId: plumbingVendor.id,
      workOrderId: workOrder1.id,
      assignedAt: sub(now, { days: 3 }),
      acceptedAt: sub(now, { days: 3 }),
      completedAt: sub(now, { days: 2 }),
    },
  })

  await prisma.proof.create({
    data: {
      type: 'PHOTO',
      fileUrl: 'https://example.com/proofs/faucet-repaired.jpg',
      note: 'Faucet repaired and tested - no leaks',
      capturedAt: sub(now, { days: 2 }),
      userId: manager.id, // Manager verified
      workOrderId: workOrder1.id,
    },
  })

  // Pending work order
  const workOrder2 = await prisma.workOrder.create({
    data: {
      title: 'HVAC Maintenance',
      description: 'Annual HVAC system check and filter replacement',
      status: 'PENDING_QUOTE',
      priority: 'MEDIUM',
      propertyId: downtownCondo.id,
    },
  })

  await prisma.workOrderLineItem.create({
    data: {
      workOrderId: workOrder2.id,
      description: 'Annual HVAC inspection and maintenance',
      quantity: 1,
    },
  })

  // ============================================
  // INVOICES & PAYOUTS
  // ============================================

  console.log('💰 Creating invoices and payouts...')

  const invoice1 = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2024-001',
      status: 'PAID',
      totalAmount: 187.5,
      paidAmount: 187.5,
      dueDate: sub(now, { days: 1 }),
      notes: 'Kitchen faucet repair - Ocean View Beach House',
      vendorId: plumbingVendor.id,
      organizationId: org.id,
    },
  })

  await prisma.payout.create({
    data: {
      amount: 187.5,
      status: 'PAID',
      method: 'ACH',
      description: 'Payment for kitchen faucet repair',
      paidAt: sub(now, { days: 1 }),
      vendorId: plumbingVendor.id,
      invoiceId: invoice1.id,
    },
  })

  // Pending payout for cleaning
  const invoice2 = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2024-002',
      status: 'SENT',
      totalAmount: 135, // 3 cleanings @ $45/hour
      paidAmount: 0,
      dueDate: add(now, { days: 7 }),
      notes: 'Cleaning services - Week of ' + now.toLocaleDateString(),
      vendorId: cleaningVendor.id,
      organizationId: org.id,
    },
  })

  await prisma.payout.create({
    data: {
      amount: 135,
      status: 'PENDING',
      method: 'PAYPAL',
      description: 'Weekly cleaning services',
      vendorId: cleaningVendor.id,
      invoiceId: invoice2.id,
    },
  })

  // ============================================
  // AUDIT LOG
  // ============================================

  console.log('📊 Creating audit log entries...')

  await prisma.auditLog.create({
    data: {
      action: 'CREATE',
      entityType: 'Reservation',
      entityId: res3.id,
      changes: {
        guestName: 'Lisa Thompson',
        checkIn: res3.checkIn.toISOString(),
        checkOut: res3.checkOut.toISOString(),
      },
      userId: manager.id,
      organizationId: org.id,
    },
  })

  await prisma.auditLog.create({
    data: {
      action: 'STATUS_CHANGE',
      entityType: 'TaskInstance',
      entityId: cleaningTask1.id,
      changes: {
        before: { status: 'ASSIGNED' },
        after: { status: 'COMPLETED' },
      },
      userId: cleaner.id,
      organizationId: org.id,
    },
  })

  await prisma.auditLog.create({
    data: {
      action: 'ASSIGN',
      entityType: 'Assignment',
      entityId: assignment2.id,
      changes: {
        taskId: cleaningTask2.id,
        assignedTo: cleaner.name,
      },
      userId: manager.id,
      organizationId: org.id,
    },
  })

  await prisma.auditLog.create({
    data: {
      action: 'APPROVE',
      entityType: 'WorkOrder',
      entityId: workOrder1.id,
      changes: {
        status: 'APPROVED',
        approvedBy: manager.name,
      },
      userId: manager.id,
      organizationId: org.id,
    },
  })

  console.log('✅ Seed complete!')
  console.log('')
  console.log('📊 Summary:')
  console.log('   - Organization: Coastal Stays Management')
  console.log('   - Users: 4 (Owner, Manager, Cleaner, Inspector)')
  console.log('   - Properties: 2')
  console.log('   - Units: 3')
  console.log('   - Reservations: 6 (1 past, 1 current, 4 upcoming)')
  console.log('   - Task Instances: 5')
  console.log('   - Checklist Runs: 1 (completed with 6 items)')
  console.log('   - Vendors: 2 (Cleaning, Plumbing)')
  console.log('   - Work Orders: 2 (1 completed, 1 pending)')
  console.log('   - Assignments: 4')
  console.log('   - Proofs: 4')
  console.log('   - Invoices: 2')
  console.log('   - Payouts: 2 (1 paid, 1 pending)')
  console.log('')
  console.log('🔐 Test Credentials:')
  console.log('   Email: sarah@coastalstays.com (Owner)')
  console.log('   Email: mike@coastalstays.com (Manager)')
  console.log('   Email: jessica@example.com (Cleaner)')
  console.log('   Email: david@example.com (Inspector)')
  console.log('   Password: password123 (all users)')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
