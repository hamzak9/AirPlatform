import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { BarChart3 } from 'lucide-react'

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        title="Insights & Reporting"
        description="Analytics, custom reports, and data exports for operational intelligence"
        action={<Button>Generate Report</Button>}
      />
      <EmptyStatePage
        icon={BarChart3}
        title="No data yet"
        description="Reports will appear once you have activity. Start adding properties and tasks to see insights."
        action={{
          label: "Generate Report",
          onClick: () => {}
        }}
      />
    </>
  )
}
