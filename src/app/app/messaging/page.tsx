import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { MessageSquare } from 'lucide-react'

export default function MessagingPage() {
  return (
    <>
      <PageHeader
        title="Messaging"
        description="Automated message templates and guest communication workflows"
        action={<Button>New Template</Button>}
      />
      <EmptyStatePage
        icon={MessageSquare}
        title="No message templates"
        description="Create automated guest communications to save time and ensure consistent, professional messaging."
        action={{
          label: "New Template",
          onClick: () => {}
        }}
      />
    </>
  )
}
