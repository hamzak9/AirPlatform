import { Package, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/empty-state'

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">
            Track supplies, linens, and amenities across properties
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <EmptyState
        icon={Package}
        title="No inventory tracked yet"
        description="Start tracking your inventory to manage supplies, linens, and amenities efficiently."
        action={{
          label: 'Add First Item',
          onClick: () => console.log('Add item'),
        }}
      />
    </div>
  )
}
