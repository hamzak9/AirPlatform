import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { Users } from 'lucide-react'

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="Team"
        description="User management with role-based access control and permissions"
        action={<Button>Invite Team Member</Button>}
      />
      <EmptyStatePage
        icon={Users}
        title="You're the only team member"
        description="Invite others to collaborate on property operations with customized roles and permissions."
        action={{
          label: "Invite Team Member",
          onClick: () => {}
        }}
      />
    </>
  )
}
