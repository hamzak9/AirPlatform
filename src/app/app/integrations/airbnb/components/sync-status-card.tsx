'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCw, Calendar, AlertCircle, CheckCircle } from 'lucide-react'
import { syncAllFeeds } from '@/app/actions/airbnb-integration'
import { useState, useTransition } from 'react'
import { formatDistanceToNow } from 'date-fns'

interface SyncStatusCardProps {
  totalFeeds: number
  activeFeeds: number
  errorFeeds: number
  totalReservations: number
  lastSync: Date | null | undefined
  organizationId: string
}

export function SyncStatusCard({
  totalFeeds,
  activeFeeds,
  errorFeeds,
  totalReservations,
  lastSync,
  organizationId,
}: SyncStatusCardProps) {
  const [isPending, startTransition] = useTransition()
  const [syncResult, setSyncResult] = useState<string | null>(null)

  const handleSyncAll = () => {
    setSyncResult(null)
    startTransition(async () => {
      const result = await syncAllFeeds(organizationId)
      if (result.success) {
        setSyncResult(result.message || 'Sync completed')
      } else {
        setSyncResult(`Error: ${result.error}`)
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sync Status</CardTitle>
            <CardDescription>Calendar feed synchronization overview</CardDescription>
          </div>
          <Button
            onClick={handleSyncAll}
            disabled={isPending || totalFeeds === 0}
            size="sm"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
            Sync All Feeds
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {syncResult && (
            <div className={`rounded-md p-3 text-sm ${
              syncResult.startsWith('Error')
                ? 'bg-destructive/10 text-destructive'
                : 'bg-green-500/10 text-green-700 dark:text-green-400'
            }`}>
              {syncResult}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-4">
            {/* Total Feeds */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{totalFeeds}</div>
                  <div className="text-xs text-muted-foreground">Total Feeds</div>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>

            {/* Active Feeds */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">{activeFeeds}</div>
                  <div className="text-xs text-muted-foreground">Active</div>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>

            {/* Error Feeds */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-destructive">{errorFeeds}</div>
                  <div className="text-xs text-muted-foreground">Errors</div>
                </div>
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
            </div>

            {/* Total Reservations */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{totalReservations}</div>
                  <div className="text-xs text-muted-foreground">Reservations</div>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>

          {/* Last Sync Time */}
          <div className="rounded-md bg-muted p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span className="font-medium">Last Sync:</span>
              </div>
              <span className="text-muted-foreground">
                {lastSync ? formatDistanceToNow(lastSync, { addSuffix: true }) : 'Never'}
              </span>
            </div>
          </div>

          {/* Note about scheduling */}
          <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100">
            <strong>Auto-sync:</strong> In production, feeds would sync automatically every 15 minutes using a background job scheduler (see job-scheduler.ts).
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
