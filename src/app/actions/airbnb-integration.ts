'use server'

import { prisma } from '@/lib/db'
import { fetchAndParseICalFeed, calculateContentHash } from '@/lib/ical-parser'
import { revalidatePath } from 'next/cache'

/**
 * Connect Airbnb (stub - no real OAuth)
 * Sets organization-level integration to CONNECTED
 */
export async function connectAirbnb(organizationId: string) {
  try {
    // Check if integration already exists
    let integration = await prisma.airbnbIntegration.findFirst({
      where: {
        organizationId,
        level: 'ORGANIZATION',
      },
    })

    if (integration) {
      // Update existing
      integration = await prisma.airbnbIntegration.update({
        where: { id: integration.id },
        data: {
          status: 'CONNECTED',
          lastSyncedAt: new Date(),
        },
      })
    } else {
      // Create new
      integration = await prisma.airbnbIntegration.create({
        data: {
          level: 'ORGANIZATION',
          status: 'CONNECTED',
          organizationId,
          lastSyncedAt: new Date(),
        },
      })
    }

    revalidatePath('/app/integrations/airbnb')

    return {
      success: true,
      integration,
    }
  } catch (error) {
    console.error('Failed to connect Airbnb:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect',
    }
  }
}

/**
 * Disconnect Airbnb
 */
export async function disconnectAirbnb(organizationId: string) {
  try {
    await prisma.airbnbIntegration.updateMany({
      where: {
        organizationId,
        level: 'ORGANIZATION',
      },
      data: {
        status: 'DISCONNECTED',
      },
    })

    revalidatePath('/app/integrations/airbnb')

    return { success: true }
  } catch (error) {
    console.error('Failed to disconnect Airbnb:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to disconnect',
    }
  }
}

/**
 * Add iCal feed for a unit
 */
export async function addCalendarFeed(data: {
  unitId: string
  icalUrl: string
  listingMappingId?: string
}) {
  try {
    // Validate URL format
    try {
      new URL(data.icalUrl)
    } catch {
      return {
        success: false,
        error: 'Invalid iCal URL format',
      }
    }

    // Check if feed already exists for this unit
    const existing = await prisma.airbnbCalendarFeed.findFirst({
      where: {
        unitId: data.unitId,
        icalUrl: data.icalUrl,
      },
    })

    if (existing) {
      return {
        success: false,
        error: 'This iCal feed is already added for this unit',
      }
    }

    // Create calendar feed
    const feed = await prisma.airbnbCalendarFeed.create({
      data: {
        icalUrl: data.icalUrl,
        unitId: data.unitId,
        listingMappingId: data.listingMappingId,
        syncStatus: 'NEVER_SYNCED',
      },
      include: {
        unit: {
          select: {
            name: true,
          },
        },
      },
    })

    revalidatePath('/app/integrations/airbnb')

    return {
      success: true,
      feed,
    }
  } catch (error) {
    console.error('Failed to add calendar feed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add feed',
    }
  }
}

/**
 * Remove calendar feed
 */
export async function removeCalendarFeed(feedId: string) {
  try {
    await prisma.airbnbCalendarFeed.delete({
      where: { id: feedId },
    })

    revalidatePath('/app/integrations/airbnb')

    return { success: true }
  } catch (error) {
    console.error('Failed to remove calendar feed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to remove feed',
    }
  }
}

/**
 * Manually trigger sync for a specific feed
 */
export async function syncCalendarFeed(feedId: string) {
  try {
    const feed = await prisma.airbnbCalendarFeed.findUnique({
      where: { id: feedId },
      include: {
        unit: true,
      },
    })

    if (!feed) {
      return {
        success: false,
        error: 'Feed not found',
      }
    }

    // Update status to indicate sync in progress
    await prisma.airbnbCalendarFeed.update({
      where: { id: feedId },
      data: {
        syncStatus: 'ACTIVE',
      },
    })

    // Fetch and parse iCal feed
    const { events, etag } = await fetchAndParseICalFeed(feed.icalUrl)

    // Calculate content hash
    const contentHash = await calculateContentHash(JSON.stringify(events))

    // Check if content has changed
    if (feed.lastHash === contentHash) {
      // No changes, just update lastFetchedAt
      await prisma.airbnbCalendarFeed.update({
        where: { id: feedId },
        data: {
          lastFetchedAt: new Date(),
          lastEtag: etag,
        },
      })

      revalidatePath('/app/integrations/airbnb')

      return {
        success: true,
        message: 'No changes detected',
        newReservations: 0,
        updatedReservations: 0,
      }
    }

    // Process events and create/update reservations
    let newCount = 0
    let updatedCount = 0

    for (const event of events) {
      // Check if reservation already exists (idempotency)
      const existing = await prisma.reservation.findUnique({
        where: { icalUid: event.uid },
      })

      if (existing) {
        // Update existing reservation
        await prisma.reservation.update({
          where: { id: existing.id },
          data: {
            guestName: event.summary,
            checkIn: event.dtstart,
            checkOut: event.dtend,
            status: event.status === 'CANCELLED' ? 'CANCELLED' : 'CONFIRMED',
            guestNotes: event.description,
          },
        })
        updatedCount++
      } else {
        // Create new reservation
        await prisma.reservation.create({
          data: {
            icalUid: event.uid,
            guestName: event.summary,
            checkIn: event.dtstart,
            checkOut: event.dtend,
            numberOfGuests: 2, // Default, can't extract from iCal
            status: event.status === 'CANCELLED' ? 'CANCELLED' : 'CONFIRMED',
            guestNotes: event.description,
            unitId: feed.unitId,
          },
        })
        newCount++
      }
    }

    // Update feed with sync results
    await prisma.airbnbCalendarFeed.update({
      where: { id: feedId },
      data: {
        lastFetchedAt: new Date(),
        lastEtag: etag,
        lastHash: contentHash,
        reservationsCount: events.length,
        lastReservationSync: new Date(),
        syncStatus: 'ACTIVE',
        errorMessage: null,
      },
    })

    revalidatePath('/app/integrations/airbnb')
    revalidatePath('/app/scheduling')

    return {
      success: true,
      message: `Synced ${events.length} events`,
      newReservations: newCount,
      updatedReservations: updatedCount,
      totalEvents: events.length,
    }
  } catch (error) {
    console.error('Failed to sync calendar feed:', error)

    // Update feed with error
    await prisma.airbnbCalendarFeed.update({
      where: { id: feedId },
      data: {
        syncStatus: 'ERROR',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      },
    })

    revalidatePath('/app/integrations/airbnb')

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to sync feed',
    }
  }
}

/**
 * Sync all active feeds for an organization
 */
export async function syncAllFeeds(organizationId: string) {
  try {
    // Get all units for this organization
    const units = await prisma.unit.findMany({
      where: {
        property: {
          organizationId,
        },
      },
      include: {
        calendarFeeds: {
          where: {
            syncStatus: {
              in: ['ACTIVE', 'NEVER_SYNCED'],
            },
          },
        },
      },
    })

    const feeds = units.flatMap(unit => unit.calendarFeeds)

    let successCount = 0
    let errorCount = 0

    for (const feed of feeds) {
      const result = await syncCalendarFeed(feed.id)
      if (result.success) {
        successCount++
      } else {
        errorCount++
      }
    }

    return {
      success: true,
      message: `Synced ${successCount} feeds, ${errorCount} errors`,
      successCount,
      errorCount,
      totalFeeds: feeds.length,
    }
  } catch (error) {
    console.error('Failed to sync all feeds:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to sync feeds',
    }
  }
}
