import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { Wrench } from 'lucide-react'

export default function MaintenancePage() {
  return (
    <>
      <PageHeader
        title="Maintenance"
        description="Work order triage, repair tracking, and vendor coordination"
        action={<Button>Create Work Order</Button>}
      />
      <EmptyStatePage
        icon={Wrench}
        title="No maintenance requests"
        description="Track repairs and vendor work here. Create work orders to manage property maintenance efficiently."
        action={{
          label: "Create Work Order",
          onClick: () => {}
        }}
      />
    </>
  )
}
