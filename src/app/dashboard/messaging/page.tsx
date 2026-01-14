import { MessageSquare, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/empty-state'

export default function MessagingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messaging</h1>
          <p className="text-muted-foreground">
            Communicate with team members, guests, and vendors
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      <EmptyState
        icon={MessageSquare}
        title="No messages"
        description="Start conversations with your team, guests, or vendors to streamline communication."
        action={{
          label: 'Send Message',
          onClick: () => console.log('Send message'),
        }}
      />
    </div>
  )
}
