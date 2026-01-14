import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'

export default function SmartLocksPage() {
  return (
    <>
      <PageHeader
        title="Smart Locks"
        description="Smart lock integrations, access code generation, and guest access management"
        action={<Button>Connect Lock</Button>}
      />
      <EmptyStatePage
        icon={Lock}
        title="No smart locks connected"
        description="Integrate access control systems to automate guest check-in and secure your properties."
        action={{
          label: "Connect Lock",
          onClick: () => {}
        }}
      />
    </>
  )
}
