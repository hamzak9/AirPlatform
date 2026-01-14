import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'

export default function GuidePage() {
  return (
    <>
      <PageHeader
        title="Guide"
        description="Digital welcome books and property guides for an exceptional guest experience"
        action={<Button>Create Guide</Button>}
      />
      <EmptyStatePage
        icon={BookOpen}
        title="No guest guides created"
        description="Build your first digital welcome book with property info, local recommendations, and house rules."
        action={{
          label: "Create Guide",
          onClick: () => {}
        }}
      />
    </>
  )
}
