import { TrendingUp, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/empty-state'

export default function UpsellsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upsells</h1>
          <p className="text-muted-foreground">
            Manage add-on services and increase revenue per booking
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Upsell
        </Button>
      </div>

      <EmptyState
        icon={TrendingUp}
        title="No upsells configured"
        description="Create upsell opportunities like early check-in, late checkout, and premium amenities."
        action={{
          label: 'Create Upsell',
          onClick: () => console.log('Create upsell'),
        }}
      />
    </div>
  )
}
