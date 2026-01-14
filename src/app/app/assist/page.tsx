import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { Bot } from 'lucide-react'

export default function AssistPage() {
  return (
    <>
      <PageHeader
        title="AI Assist"
        description="AI-powered guest assistant for automated support and instant responses"
        action={<Button>Configure AI</Button>}
      />
      <EmptyStatePage
        icon={Bot}
        title="AI assistant coming soon"
        description="Automate guest support with AI-powered responses to common questions and requests."
        action={{
          label: "Configure AI",
          onClick: () => {}
        }}
      />
    </>
  )
}
