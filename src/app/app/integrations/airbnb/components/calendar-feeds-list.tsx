'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, Trash2, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react'
import { syncCalendarFeed, removeCalendarFeed } from '@/app/actions/airbnb-integration'
import { useState, useTransition } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { AirbnbCalendarFeed, CalendarSyncStatus } from '@prisma/client'

interface FeedWithMeta extends AirbnbCalendarFeed {
  unitName: string
  propertyName: string
}

interface CalendarFeedsListProps {
  feeds: FeedWithMeta[]
}

export function CalendarFeedsList({ feeds }: CalendarFeedsListProps) {
  const [isPending, startTransition] = useTransition()
  const [syncingFeedId, setSyncingFeedId] = useState<string | null>(null)

  const handleSync = (feedId: string) => {
    setSyncingFeedId(feedId)
    startTransition(async () => {
      await syncCalendarFeed(feedId)
      setSyncingFeedId(null)
    })
  }

  const handleRemove = (feedId: string) => {
    if (confirm('Are you sure you want to remove this calendar feed?')) {
      startTransition(async () => {
        await removeCalendarFeed(feedId)
      })
    }
  }

  if (feeds.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Calendar Feeds</CardTitle>
          <CardDescription>No calendar feeds added yet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted p-4">
              <ExternalLink className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Add an iCal URL to start syncing reservations
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar Feeds</CardTitle>
        <CardDescription>
          Manage iCal calendar feeds for your units
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feeds.map((feed) => (
            <div
              key={feed.id}
              className="flex items-start justify-between rounded-lg border p-4"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{feed.unitName}</span>
                  <span className="text-sm text-muted-foreground">
                    • {feed.propertyName}
                  </span>
                  <StatusBadge status={feed.syncStatus} />
                </div>

                <div className="text-sm text-muted-foreground">
                  <a
                    href={feed.icalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    {truncateUrl(feed.icalUrl)}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div>
                    <span className="font-medium">{feed.reservationsCount}</span> reservations
                  </div>
                  {feed.lastFetchedAt && (
                    <div>
                      Last synced {formatDistanceToNow(feed.lastFetchedAt, { addSuffix: true })}
                    </div>
                  )}
                </div>

                {feed.errorMessage && (
                  <div className="text-xs text-destructive">
                    Error: {feed.errorMessage}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSync(feed.id)}
                  disabled={isPending && syncingFeedId === feed.id}
                >
                  <RefreshCw
                    className={`h-4 w-4 ${
                      isPending && syncingFeedId === feed.id ? 'animate-spin' : ''
                    }`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(feed.id)}
                  disabled={isPending}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: CalendarSyncStatus }) {
  const config = {
    ACTIVE: { label: 'Active', variant: 'default' as const, icon: CheckCircle },
    PAUSED: { label: 'Paused', variant: 'secondary' as const, icon: AlertCircle },
    ERROR: { label: 'Error', variant: 'destructive' as const, icon: AlertCircle },
    NEVER_SYNCED: { label: 'Not Synced', variant: 'outline' as const, icon: AlertCircle },
  }

  const { label, variant, icon: Icon } = config[status]

  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  )
}

function truncateUrl(url: string, maxLength = 50): string {
  if (url.length <= maxLength) return url
  return url.substring(0, maxLength) + '...'
}
