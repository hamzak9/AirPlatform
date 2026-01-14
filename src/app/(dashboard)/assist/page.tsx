import { Bot } from 'lucide-react'
import { EmptyState } from '@/components/shared/empty-state'

export default function AssistPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assist</h1>
        <p className="text-muted-foreground">
          AI-powered assistance for property management tasks
        </p>
      </div>

      <EmptyState
        icon={Bot}
        title="AI Assistant coming soon"
        description="Get intelligent suggestions, automate repetitive tasks, and streamline your workflow with AI."
      />
    </div>
  )
}
