import { PrismaClient, UserRole, TaskStatus, TaskType, TaskPriority, ReservationStatus, UnitStatus, VendorType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clean existing data
  await prisma.message.deleteMany()
  await prisma.payout.deleteMany()
  await prisma.checklistItem.deleteMany()
  await prisma.checklist.deleteMany()
  await prisma.task.deleteMany()
  await prisma.reservation.deleteMany()
  await prisma.workOrder.deleteMany()
  await prisma.vendor.deleteMany()
  await prisma.unit.deleteMany()
  await prisma.integration.deleteMany()
  await prisma.property.deleteMany()
  await prisma.user.deleteMany()
  await prisma.organization.deleteMany()

  console.log('✅ Cleaned existing data')

  // Create Organization
  const org = await prisma.organization.create({
    data: {
      name: 'Coastal Stays Management',
      slug: 'coastal-stays',
      plan: 'pro',
      timezone: 'America/Los_Angeles',
    },
  })

  console.log('✅ Created organization:', org.name)

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('password123', 10)

  // Create Users
  const owner = await prisma.user.create({
    data: {
      email: 'owner@coastalstays.com',
      name: 'Sarah Johnson',
      password: hashedPassword,
      role: UserRole.OWNER,
      organizationId: org.id,
    },
  })

  const manager = await prisma.user.create({
    data: {
      email: 'manager@coastalstays.com',
      name: 'Michael Chen',
      password: hashedPassword,
      role: UserRole.MANAGER,
      organizationId: org.id,
    },
  })

  const cleaner1 = await prisma.user.create({
    data: {
      email: 'maria@coastalstays.com',
      name: 'Maria Rodriguez',
      password: hashedPassword,
      role: UserRole.CLEANER,
      organizationId: org.id,
    },
  })

  const cleaner2 = await prisma.user.create({
    data: {
      email: 'james@coastalstays.com',
      name: 'James Wilson',
      password: hashedPassword,
      role: UserRole.CLEANER,
      organizationId: org.id,
    },
  })

  console.log('✅ Created 4 users')

  // Create Properties
  const property1 = await prisma.property.create({
    data: {
      name: 'Sunset Beach House',
      address: '123 Ocean Drive',
      city: 'Santa Monica',
      state: 'CA',
      zipCode: '90401',
      country: 'US',
      airbnbListingId: 'AIRBNB-001',
      organizationId: org.id,
    },
  })

  const property2 = await prisma.property.create({
    data: {
      name: 'Downtown Loft Complex',
      address: '456 Main Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90012',
      country: 'US',
      airbnbListingId: 'AIRBNB-002',
      organizationId: org.id,
    },
  })

  console.log('✅ Created 2 properties')

  // Create Units for Property 1
  const unit1 = await prisma.unit.create({
    data: {
      name: 'Oceanview Suite',
      bedrooms: 2,
      bathrooms: 2,
      status: UnitStatus.ACTIVE,
      propertyId: property1.id,
    },
  })

  const unit2 = await prisma.unit.create({
    data: {
      name: 'Garden Villa',
      bedrooms: 3,
      bathrooms: 2.5,
      status: UnitStatus.ACTIVE,
      propertyId: property1.id,
    },
  })

  // Create Unit for Property 2
  const unit3 = await prisma.unit.create({
    data: {
      name: 'Penthouse Loft',
      bedrooms: 1,
      bathrooms: 1,
      status: UnitStatus.ACTIVE,
      propertyId: property2.id,
    },
  })

  console.log('✅ Created 3 units')

  // Create Reservations
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const nextWeek = new Date(now)
  nextWeek.setDate(nextWeek.getDate() + 7)
  const twoWeeks = new Date(now)
  twoWeeks.setDate(twoWeeks.getDate() + 14)

  const reservation1 = await prisma.reservation.create({
    data: {
      airbnbReservationId: 'RES-001',
      guestName: 'Emily Davis',
      guestEmail: 'emily.davis@example.com',
      guestPhone: '+1-555-0123',
      numberOfGuests: 2,
      checkIn: tomorrow,
      checkOut: nextWeek,
      status: ReservationStatus.CONFIRMED,
      totalPrice: 1200,
      unitId: unit1.id,
    },
  })

  const reservation2 = await prisma.reservation.create({
    data: {
      airbnbReservationId: 'RES-002',
      guestName: 'Robert Martinez',
      guestEmail: 'robert.m@example.com',
      guestPhone: '+1-555-0456',
      numberOfGuests: 4,
      checkIn: nextWeek,
      checkOut: twoWeeks,
      status: ReservationStatus.CONFIRMED,
      totalPrice: 1800,
      unitId: unit2.id,
    },
  })

  console.log('✅ Created 2 reservations')

  // Create Tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Pre-arrival deep clean',
        description: 'Complete deep clean before guest check-in tomorrow',
        type: TaskType.CLEANING,
        status: TaskStatus.ASSIGNED,
        priority: TaskPriority.HIGH,
        scheduledFor: new Date(tomorrow.getTime() - 3600000 * 4), // 4 hours before check-in
        unitId: unit1.id,
        assignedToId: cleaner1.id,
        reservationId: reservation1.id,
      },
      {
        title: 'Stock welcome basket',
        description: 'Prepare welcome basket with snacks and drinks',
        type: TaskType.RESTOCKING,
        status: TaskStatus.PENDING,
        priority: TaskPriority.MEDIUM,
        scheduledFor: new Date(tomorrow.getTime() - 3600000 * 2), // 2 hours before check-in
        unitId: unit1.id,
        reservationId: reservation1.id,
      },
      {
        title: 'Mid-stay inspection',
        description: 'Check unit condition and restock supplies',
        type: TaskType.INSPECTION,
        status: TaskStatus.PENDING,
        priority: TaskPriority.MEDIUM,
        scheduledFor: new Date(nextWeek.getTime() - 3600000 * 24 * 3), // 3 days into stay
        unitId: unit1.id,
        assignedToId: manager.id,
        reservationId: reservation1.id,
      },
      {
        title: 'Turnover cleaning',
        description: 'Full turnover clean after checkout',
        type: TaskType.CLEANING,
        status: TaskStatus.PENDING,
        priority: TaskPriority.HIGH,
        scheduledFor: nextWeek,
        unitId: unit2.id,
        assignedToId: cleaner2.id,
        reservationId: reservation2.id,
      },
      {
        title: 'Linen change - all bedrooms',
        description: 'Replace all linens with fresh sets',
        type: TaskType.LINEN_CHANGE,
        status: TaskStatus.PENDING,
        priority: TaskPriority.MEDIUM,
        scheduledFor: nextWeek,
        unitId: unit3.id,
        assignedToId: cleaner1.id,
      },
    ],
  })

  console.log('✅ Created 5 tasks')

  // Create Checklists
  const cleaningChecklist = await prisma.checklist.create({
    data: {
      name: 'Standard Turnover Checklist',
      description: 'Complete checklist for unit turnover between guests',
      unitId: unit1.id,
      items: {
        create: [
          { title: 'Strip and wash all linens', order: 1 },
          { title: 'Clean and sanitize bathrooms', order: 2 },
          { title: 'Vacuum and mop all floors', order: 3 },
          { title: 'Dust all surfaces', order: 4 },
          { title: 'Clean kitchen and appliances', order: 5 },
          { title: 'Restock toiletries and paper products', order: 6 },
          { title: 'Check and replace light bulbs', order: 7 },
          { title: 'Take out trash and recycling', order: 8 },
          { title: 'Final walkthrough and photos', order: 9 },
        ],
      },
    },
  })

  console.log('✅ Created checklist with 9 items')

  // Create Vendors
  const vendor1 = await prisma.vendor.create({
    data: {
      name: 'QuickFix Plumbing',
      email: 'service@quickfixplumbing.com',
      phone: '+1-555-7890',
      type: VendorType.PLUMBING,
      address: '789 Service Road, Santa Monica, CA 90401',
      organizationId: org.id,
    },
  })

  const vendor2 = await prisma.vendor.create({
    data: {
      name: 'Elite HVAC Services',
      email: 'contact@elitehvac.com',
      phone: '+1-555-4567',
      type: VendorType.HVAC,
      address: '321 Industrial Blvd, Los Angeles, CA 90012',
      organizationId: org.id,
    },
  })

  console.log('✅ Created 2 vendors')

  // Create Work Orders
  await prisma.workOrder.create({
    data: {
      title: 'Fix leaking bathroom faucet',
      description: 'Guest reported dripping faucet in master bathroom',
      status: 'OPEN',
      priority: 'HIGH',
      estimatedCost: 150,
      propertyId: property1.id,
      vendorId: vendor1.id,
    },
  })

  await prisma.workOrder.create({
    data: {
      title: 'Annual HVAC maintenance',
      description: 'Scheduled annual maintenance for all HVAC units',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      estimatedCost: 500,
      propertyId: property2.id,
      assignedToId: manager.id,
      vendorId: vendor2.id,
    },
  })

  console.log('✅ Created 2 work orders')

  // Create Airbnb Integration
  await prisma.integration.create({
    data: {
      provider: 'airbnb',
      status: 'CONNECTED',
      organizationId: org.id,
      lastSyncedAt: new Date(),
    },
  })

  console.log('✅ Created Airbnb integration')

  console.log('\n🎉 Seed completed successfully!')
  console.log('\n📧 Test login credentials:')
  console.log('   Email: owner@coastalstays.com')
  console.log('   Password: password123\n')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
