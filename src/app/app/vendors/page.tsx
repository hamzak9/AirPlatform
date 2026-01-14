import { PageHeader } from '@/components/app/page-header'
import { EmptyStatePage } from '@/components/app/empty-state-page'
import { Button } from '@/components/ui/button'
import { Briefcase } from 'lucide-react'

export default function VendorsPage() {
  return (
    <>
      <PageHeader
        title="Vendors"
        description="Trusted service provider network with contact info and service coverage areas"
        action={<Button>Add Vendor</Button>}
      />
      <EmptyStatePage
        icon={Briefcase}
        title="No vendors added"
        description="Build your trusted service provider network for maintenance, cleaning, and property services."
        action={{
          label: "Add Vendor",
          onClick: () => {}
        }}
      />
    </>
  )
}
