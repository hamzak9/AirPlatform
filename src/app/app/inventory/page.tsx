import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { Package } from 'lucide-react'

export default function InventoryPage() {
  return (
    <>
      <PageHeader
        title="Inventory"
        description="Supply tracking, par levels, and consumption monitoring across properties"
        action={<Button>Add Item</Button>}
      />
      <EmptyStatePage
        icon={Package}
        title="Start tracking inventory"
        description="Add your first supply item to monitor stock levels and automate reordering across all properties."
        action={{
          label: "Add Item",
          onClick: () => {}
        }}
      />
    </>
  )
}
