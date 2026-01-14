import { Sparkles, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/empty-state'

export default function HousekeepingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Housekeeping</h1>
          <p className="text-muted-foreground">
            Dedicated housekeeping management and team coordination
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Cleaning
        </Button>
      </div>

      <EmptyState
        icon={Sparkles}
        title="No housekeeping schedules"
        description="Create housekeeping schedules and manage your cleaning team efficiently."
        action={{
          label: 'Create Schedule',
          onClick: () => console.log('Create schedule'),
        }}
      />
    </div>
  )
}
