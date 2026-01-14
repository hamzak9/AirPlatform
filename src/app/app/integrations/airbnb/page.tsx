import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { Plug } from 'lucide-react'

export default function AirbnbIntegrationPage() {
  return (
    <>
      <PageHeader
        title="Airbnb Integration"
        description="Connect your Airbnb account to sync listings, reservations, and calendar data"
        action={<Button>Connect Airbnb</Button>}
      />
      <EmptyStatePage
        icon={Plug}
        title="Airbnb not connected"
        description="Sync your listings and reservations automatically to streamline your operations workflow."
        action={{
          label: "Connect Airbnb",
          onClick: () => {}
        }}
      />
    </>
  )
}
