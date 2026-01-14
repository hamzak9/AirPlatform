import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { CalendarClock } from 'lucide-react'

export default function SchedulingPage() {
  return (
    <>
      <PageHeader
        title="Scheduling"
        description="Automated task calendar with upcoming assignments and recurring schedules"
        action={<Button>Create Task</Button>}
      />
      <EmptyStatePage
        icon={CalendarClock}
        title="No tasks scheduled yet"
        description="Create your first automated task to streamline property operations and ensure nothing gets missed."
        action={{
          label: "Create Task",
          onClick: () => {}
        }}
      />
    </>
  )
}
