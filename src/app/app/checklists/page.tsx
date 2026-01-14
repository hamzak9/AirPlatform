import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { ListChecks } from 'lucide-react'

export default function ChecklistsPage() {
  return (
    <>
      <PageHeader
        title="Checklists"
        description="Reusable checklist templates for quality control and inspection workflows"
        action={<Button>New Checklist</Button>}
      />
      <EmptyStatePage
        icon={ListChecks}
        title="No checklists created"
        description="Build your first quality checklist template to ensure consistent standards across all properties."
        action={{
          label: "New Checklist",
          onClick: () => {}
        }}
      />
    </>
  )
}
