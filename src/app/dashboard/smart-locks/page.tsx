import { Lock, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/empty-state'

export default function SmartLocksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Locks</h1>
          <p className="text-muted-foreground">
            Manage smart lock access codes and entry automation
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Connect Device
        </Button>
      </div>

      <EmptyState
        icon={Lock}
        title="No smart locks connected"
        description="Connect your smart locks to automate guest access codes and improve security."
        action={{
          label: 'Connect Smart Lock',
          onClick: () => console.log('Connect lock'),
        }}
      />
    </div>
  )
}
