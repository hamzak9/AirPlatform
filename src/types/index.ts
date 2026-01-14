import { UserRole, TaskStatus, TaskType, TaskPriority, ReservationStatus, UnitStatus, WorkOrderStatus, WorkOrderPriority, VendorType, PayoutStatus, IntegrationStatus } from '@prisma/client'

// Re-export Prisma enums for convenience
export {
  UserRole,
  TaskStatus,
  TaskType,
  TaskPriority,
  ReservationStatus,
  UnitStatus,
  WorkOrderStatus,
  WorkOrderPriority,
  VendorType,
  PayoutStatus,
  IntegrationStatus,
}

// Navigation types
export interface NavItem {
  name: string
  href: string
  icon: any
}

// Dashboard stats type
export interface DashboardStats {
  activeTasks: number
  properties: number
  upcomingReservations: number
  monthlyRevenue: number
}
