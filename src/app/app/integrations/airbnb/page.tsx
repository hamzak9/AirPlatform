import { PageHeader } from '@/components/app/page-header'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/db'
import { AirbnbConnectionCard } from './components/airbnb-connection-card'
import { CalendarFeedsList } from './components/calendar-feeds-list'
import { AddCalendarFeedDialog } from './components/add-calendar-feed-dialog'
import { SyncStatusCard } from './components/sync-status-card'

// This would come from auth session in real app
const MOCK_ORG_ID = 'coastal-stays-org'

export default async function AirbnbIntegrationPage() {
  // Get organization
  const org = await prisma.organization.findFirst({
    where: { slug: 'coastal-stays' },
  })

  if (!org) {
    return <div>Organization not found</div>
  }

  // Get Airbnb integration status
  const integration = await prisma.airbnbIntegration.findFirst({
    where: {
      organizationId: org.id,
      level: 'ORGANIZATION',
    },
  })

  // Get all units for adding feeds
  const units = await prisma.unit.findMany({
    where: {
      property: {
        organizationId: org.id,
      },
    },
    include: {
      property: {
        select: {
          name: true,
        },
      },
      airbnbListingMappings: true,
      calendarFeeds: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  // Get all calendar feeds
  const allFeeds = units.flatMap(unit =>
    unit.calendarFeeds.map(feed => ({
      ...feed,
      unitName: unit.name,
      propertyName: unit.property.name,
    }))
  )

  // Calculate sync stats
  const totalFeeds = allFeeds.length
  const activeFeeds = allFeeds.filter(f => f.syncStatus === 'ACTIVE').length
  const errorFeeds = allFeeds.filter(f => f.syncStatus === 'ERROR').length
  const totalReservations = allFeeds.reduce((sum, f) => sum + f.reservationsCount, 0)

  const lastSync = allFeeds
    .filter(f => f.lastFetchedAt)
    .sort((a, b) => (b.lastFetchedAt?.getTime() || 0) - (a.lastFetchedAt?.getTime() || 0))[0]?.lastFetchedAt

  return (
    <>
      <PageHeader
        title="Airbnb Integration"
        description="Connect your Airbnb account and sync calendar feeds automatically"
        action={<AddCalendarFeedDialog units={units} />}
      />

      <div className="space-y-6">
        {/* Connection Status */}
        <AirbnbConnectionCard
          integration={integration}
          organizationId={org.id}
        />

        {/* Sync Status Overview */}
        <SyncStatusCard
          totalFeeds={totalFeeds}
          activeFeeds={activeFeeds}
          errorFeeds={errorFeeds}
          totalReservations={totalReservations}
          lastSync={lastSync}
          organizationId={org.id}
        />

        {/* Calendar Feeds List */}
        <CalendarFeedsList feeds={allFeeds} />
      </div>
    </>
  )
}
