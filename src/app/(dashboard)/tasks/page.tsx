import { CalendarClock, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/empty-state'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default async function TasksPage() {
  const session = await auth()
  if (!session) return null

  const tasks = await db.task.findMany({
    where: {
      unit: {
        property: {
          organizationId: session.user.organizationId,
        },
      },
    },
    include: {
      unit: {
        include: {
          property: true,
        },
      },
      assignedTo: true,
    },
    orderBy: {
      scheduledFor: 'asc',
    },
    take: 20,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Scheduling</h1>
          <p className="text-muted-foreground">Manage and schedule all property tasks</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      {tasks.length === 0 ? (
        <EmptyState
          icon={CalendarClock}
          title="No tasks yet"
          description="Create your first task to get started with task scheduling and management."
          action={{
            label: 'Create Task',
            onClick: () => console.log('Create task'),
          }}
        />
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>
                    {task.unit.property.name} - {task.unit.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{task.type}</Badge>
                  </TableCell>
                  <TableCell>{task.assignedTo?.name || 'Unassigned'}</TableCell>
                  <TableCell>{new Date(task.scheduledFor).toLocaleDateString()}</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
