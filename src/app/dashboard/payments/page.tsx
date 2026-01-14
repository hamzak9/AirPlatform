import { DollarSign, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/empty-state'

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">
            Manage payouts, invoices, and financial transactions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Payout
        </Button>
      </div>

      <EmptyState
        icon={DollarSign}
        title="No payments recorded"
        description="Track and manage all payments, payouts, and financial transactions in one place."
        action={{
          label: 'Record Payment',
          onClick: () => console.log('Record payment'),
        }}
      />
    </div>
  )
}
