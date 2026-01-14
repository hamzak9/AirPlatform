import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { DollarSign } from 'lucide-react'

export default function PaymentsPage() {
  return (
    <>
      <PageHeader
        title="Payments"
        description="Track payouts, invoices, and payment methods for team and vendors"
        action={<Button>Record Payout</Button>}
      />
      <EmptyStatePage
        icon={DollarSign}
        title="No payment records"
        description="Track team and vendor payouts here. Record and manage all financial transactions in one place."
        action={{
          label: "Record Payout",
          onClick: () => {}
        }}
      />
    </>
  )
}
