import { Wrench, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { EmptyState } from '@/components/shared/empty-state'

export default async function MaintenancePage() {
  const session = await auth()
  if (!session) return null

  const workOrders = await db.workOrder.findMany({
    where: {
      property: {
        organizationId: session.user.organizationId,
      },
    },
    include: {
      property: true,
      assignedTo: true,
      vendor: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance</h1>
          <p className="text-muted-foreground">Track and manage maintenance work orders</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Work Order
        </Button>
      </div>

      {workOrders.length === 0 ? (
        <EmptyState
          icon={Wrench}
          title="No work orders yet"
          description="Create work orders to track maintenance requests and repairs across your properties."
          action={{
            label: 'Create Work Order',
            onClick: () => console.log('Create work order'),
          }}
        />
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Est. Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.title}</TableCell>
                  <TableCell>{order.property.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === 'COMPLETED'
                          ? 'success'
                          : order.status === 'IN_PROGRESS'
                            ? 'warning'
                            : 'secondary'
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.priority === 'EMERGENCY' || order.priority === 'HIGH'
                          ? 'destructive'
                          : 'outline'
                      }
                    >
                      {order.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.assignedTo?.name || '-'}</TableCell>
                  <TableCell>{order.vendor?.name || '-'}</TableCell>
                  <TableCell>
                    {order.estimatedCost ? `$${order.estimatedCost.toFixed(2)}` : '-'}
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
