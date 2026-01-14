import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { TrendingUp } from 'lucide-react'

export default function UpsellsPage() {
  return (
    <>
      <PageHeader
        title="Upsells"
        description="Revenue-boosting offers and add-on services for guests"
        action={<Button>Create Upsell</Button>}
      />
      <EmptyStatePage
        icon={TrendingUp}
        title="No upsell offers"
        description="Create add-on services to boost revenue with early check-in, late checkout, and premium amenities."
        action={{
          label: "Create Upsell",
          onClick: () => {}
        }}
      />
    </>
  )
}
