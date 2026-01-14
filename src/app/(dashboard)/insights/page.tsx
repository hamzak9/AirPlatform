import { BarChart3 } from 'lucide-react'
import { EmptyState } from '@/components/shared/empty-state'

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Insights & Reporting</h1>
        <p className="text-muted-foreground">
          Analytics, reports, and data-driven insights for your properties
        </p>
      </div>

      <EmptyState
        icon={BarChart3}
        title="No analytics data yet"
        description="Once you have more activity, you'll see detailed analytics and reports here."
      />
    </div>
  )
}
