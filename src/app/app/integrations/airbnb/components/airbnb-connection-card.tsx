'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { connectAirbnb, disconnectAirbnb } from '@/app/actions/airbnb-integration'
import { useState, useTransition } from 'react'
import { AirbnbIntegration } from '@prisma/client'

interface AirbnbConnectionCardProps {
  integration: AirbnbIntegration | null
  organizationId: string
}

export function AirbnbConnectionCard({ integration, organizationId }: AirbnbConnectionCardProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const isConnected = integration?.status === 'CONNECTED'

  const handleConnect = () => {
    setError(null)
    startTransition(async () => {
      const result = await connectAirbnb(organizationId)
      if (!result.success) {
        setError(result.error || 'Failed to connect')
      }
    })
  }

  const handleDisconnect = () => {
    setError(null)
    startTransition(async () => {
      const result = await disconnectAirbnb(organizationId)
      if (!result.success) {
        setError(result.error || 'Failed to disconnect')
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Airbnb Connection</CardTitle>
            <CardDescription>
              {isConnected
                ? 'Your Airbnb account is connected'
                : 'Connect your Airbnb account to enable calendar syncing'}
            </CardDescription>
          </div>
          {isConnected ? (
            <Badge variant="default" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Connected
            </Badge>
          ) : (
            <Badge variant="secondary" className="gap-1">
              <XCircle className="h-3 w-3" />
              Not Connected
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {isConnected ? (
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                <strong>Note:</strong> This is a stub connection. In production, this would use OAuth 2.0 to securely connect to your Airbnb account.
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Connected:</span>{' '}
                  <span className="font-medium">
                    {integration.lastSyncedAt?.toLocaleString() || 'Unknown'}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleDisconnect}
                disabled={isPending}
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Disconnect Airbnb
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-md bg-muted p-4 text-sm">
                <p className="font-medium">What happens when you connect:</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                  <li>Add iCal calendar feeds for your Airbnb listings</li>
                  <li>Automatically sync reservations to your units</li>
                  <li>Keep your calendar up-to-date</li>
                  <li>Generate tasks automatically for turnovers</li>
                </ul>
              </div>
              <Button
                onClick={handleConnect}
                disabled={isPending}
                size="lg"
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Connect Airbnb (Stub)
              </Button>
              <p className="text-xs text-muted-foreground">
                This is a development stub. Real OAuth integration coming soon.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
