import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarClock, CheckCircle2, AlertCircle, DollarSign } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) return null

  // Fetch dashboard stats
  const [taskCount, propertyCount, upcomingReservations, recentTasks] = await Promise.all([
    db.task.count({
      where: {
        unit: {
          property: {
            organizationId: session.user.organizationId,
          },
        },
        status: { in: ['PENDING', 'ASSIGNED'] },
      },
    }),
    db.property.count({
      where: {
        organizationId: session.user.organizationId,
      },
    }),
    db.reservation.findMany({
      where: {
        unit: {
          property: {
            organizationId: session.user.organizationId,
          },
        },
        checkIn: {
          gte: new Date(),
        },
        status: 'CONFIRMED',
      },
      take: 5,
      orderBy: {
        checkIn: 'asc',
      },
      include: {
        unit: {
          include: {
            property: true,
          },
        },
      },
    }),
    db.task.findMany({
      where: {
        unit: {
          property: {
            organizationId: session.user.organizationId,
          },
        },
      },
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        unit: {
          include: {
            property: true,
          },
        },
        assignedTo: true,
      },
    }),
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {session.user.name}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskCount}</div>
            <p className="text-xs text-muted-foreground">Pending & assigned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{propertyCount}</div>
            <p className="text-xs text-muted-foreground">Under management</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Reservations</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingReservations.length}</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (MTD)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(0)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Reservations</CardTitle>
            <CardDescription>Next check-ins scheduled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingReservations.length === 0 ? (
                <p className="text-sm text-muted-foreground">No upcoming reservations</p>
              ) : (
                upcomingReservations.map((reservation) => (
                  <div key={reservation.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{reservation.guestName}</p>
                      <p className="text-xs text-muted-foreground">
                        {reservation.unit.property.name} - {reservation.unit.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {new Date(reservation.checkIn).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {reservation.numberOfGuests} guests
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Latest task activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent tasks</p>
              ) : (
                recentTasks.map((task) => (
                  <div key={task.id} className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {task.unit.property.name} - {task.unit.name}
                      </p>
                    </div>
                    <Badge
                      variant={
                        task.status === 'COMPLETED'
                          ? 'success'
                          : task.status === 'IN_PROGRESS'
                            ? 'warning'
                            : 'secondary'
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
