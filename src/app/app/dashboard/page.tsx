import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { LayoutDashboard } from 'lucide-react'

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your operations, key metrics, and quick actions"
        action={<Button>View All Tasks</Button>}
      />
      <EmptyStatePage
        icon={LayoutDashboard}
        title="Welcome to Worksy Ops!"
        description="Add your first property to get started with automated property operations management."
        action={{
          label: "Add Property",
          onClick: () => {}
        }}
      />
    </>
  )
}
