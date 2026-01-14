import { ClipboardList, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/empty-state'

export default function CoordinationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Work Coordination</h1>
          <p className="text-muted-foreground">
            Coordinate work across teams, vendors, and properties
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Coordination
        </Button>
      </div>

      <EmptyState
        icon={ClipboardList}
        title="No coordination workflows yet"
        description="Set up coordination workflows to manage multi-team operations efficiently."
        action={{
          label: 'Create Workflow',
          onClick: () => console.log('Create workflow'),
        }}
      />
    </div>
  )
}
