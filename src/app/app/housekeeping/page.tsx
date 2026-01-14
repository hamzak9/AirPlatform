import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export default function HousekeepingPage() {
  return (
    <>
      <PageHeader
        title="Housekeeping"
        description="Staff management, cleaning assignments, and quality control workflows"
        action={<Button>Add Staff Member</Button>}
      />
      <EmptyStatePage
        icon={Sparkles}
        title="No housekeeping staff"
        description="Build your cleaning team and assign tasks to ensure properties are guest-ready on time."
        action={{
          label: "Add Staff Member",
          onClick: () => {}
        }}
      />
    </>
  )
}
