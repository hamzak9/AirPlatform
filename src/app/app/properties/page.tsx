import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { Building2 } from 'lucide-react'

export default function PropertiesPage() {
  return (
    <>
      <PageHeader
        title="Properties"
        description="Manage your property portfolio, units, and location details"
        action={<Button>Add Property</Button>}
      />
      <EmptyStatePage
        icon={Building2}
        title="No properties yet"
        description="Add your first property to get started with automated operations and guest management."
        action={{
          label: "Add Property",
          onClick: () => {}
        }}
      />
    </>
  )
}
