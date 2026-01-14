import { BookOpen } from 'lucide-react'
import { EmptyState } from '@/components/shared/empty-state'

export default function GuidePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Guide</h1>
        <p className="text-muted-foreground">
          Documentation, tutorials, and best practices for property management
        </p>
      </div>

      <EmptyState
        icon={BookOpen}
        title="Guide content coming soon"
        description="This section will contain helpful guides, tutorials, and best practices for managing your Airbnb properties."
      />
    </div>
  )
}
