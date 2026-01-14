'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Loader2 } from 'lucide-react'
import { addCalendarFeed } from '@/app/actions/airbnb-integration'
import { Unit, Property, AirbnbListingMapping } from '@prisma/client'

interface UnitWithRelations extends Unit {
  property: Pick<Property, 'name'>
  airbnbListingMappings: AirbnbListingMapping[]
}

interface AddCalendarFeedDialogProps {
  units: UnitWithRelations[]
}

export function AddCalendarFeedDialog({ units }: AddCalendarFeedDialogProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [selectedUnitId, setSelectedUnitId] = useState('')
  const [icalUrl, setIcalUrl] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!selectedUnitId || !icalUrl) {
      setError('Please fill in all fields')
      return
    }

    startTransition(async () => {
      const result = await addCalendarFeed({
        unitId: selectedUnitId,
        icalUrl: icalUrl.trim(),
      })

      if (result.success) {
        setOpen(false)
        setSelectedUnitId('')
        setIcalUrl('')
        setError(null)
      } else {
        setError(result.error || 'Failed to add feed')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Calendar Feed
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add iCal Calendar Feed</DialogTitle>
            <DialogDescription>
              Add an iCal URL from Airbnb to sync reservations for a unit
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select value={selectedUnitId} onValueChange={setSelectedUnitId}>
                <SelectTrigger id="unit">
                  <SelectValue placeholder="Select a unit" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.property.name} - {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose which unit this calendar feed is for
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ical-url">iCal URL</Label>
              <Input
                id="ical-url"
                type="url"
                placeholder="https://www.airbnb.com/calendar/ical/..."
                value={icalUrl}
                onChange={(e) => setIcalUrl(e.target.value)}
                disabled={isPending}
              />
              <p className="text-xs text-muted-foreground">
                Get this from your Airbnb listing's calendar export settings
              </p>
            </div>

            <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-900 dark:bg-blue-950 dark:text-blue-100">
              <p className="font-medium">How to find your iCal URL:</p>
              <ol className="mt-2 list-inside list-decimal space-y-1 text-xs">
                <li>Go to your listing on Airbnb</li>
                <li>Click Calendar → Availability settings</li>
                <li>Scroll to "Sync calendars"</li>
                <li>Copy the "Export calendar" URL</li>
              </ol>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !selectedUnitId || !icalUrl}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Feed
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
