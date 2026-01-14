import { ListChecks, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/empty-state'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function ChecklistsPage() {
  const session = await auth()
  if (!session) return null

  const checklists = await db.checklist.findMany({
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
      items: true,
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Checklists</h1>
          <p className="text-muted-foreground">
            Create and manage checklists for consistent quality
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Checklist
        </Button>
      </div>

      {checklists.length === 0 ? (
        <EmptyState
          icon={ListChecks}
          title="No checklists yet"
          description="Create standardized checklists to ensure consistent quality across all your properties."
          action={{
            label: 'Create Checklist',
            onClick: () => console.log('Create checklist'),
          }}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {checklists.map((checklist) => (
            <Card key={checklist.id}>
              <CardHeader>
                <CardTitle className="text-lg">{checklist.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{checklist.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {checklist.unit.property.name} - {checklist.unit.name}
                    </span>
                    <Badge variant="outline">{checklist.items.length} items</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
