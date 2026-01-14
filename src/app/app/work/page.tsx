import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { ClipboardList } from 'lucide-react'

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="Work Coordination"
        description="Kanban board for managing work assignments, tracking progress, and team coordination"
        action={<Button>Assign Work</Button>}
      />
      <EmptyStatePage
        icon={ClipboardList}
        title="No work items yet"
        description="Start by creating tasks from scheduling or assign work directly to your team members."
        action={{
          label: "Assign Work",
          onClick: () => {}
        }}
      />
    </>
  )
}
