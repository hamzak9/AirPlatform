import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { Settings as SettingsIcon } from 'lucide-react'

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Organization settings, preferences, and configuration options"
        action={<Button>Update Settings</Button>}
      />
      <EmptyStatePage
        icon={SettingsIcon}
        title="Configure your settings"
        description="Configure your organization settings and preferences to customize your Worksy Ops experience."
        action={{
          label: "Update Settings",
          onClick: () => {}
        }}
      />
    </>
  )
}
