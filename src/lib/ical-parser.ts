// Minimal iCal parser for Airbnb calendar feeds
// Parses VEVENT blocks to extract reservation data

export interface ICalEvent {
  uid: string
  summary: string
  description?: string
  dtstart: Date
  dtend: Date
  status?: 'CONFIRMED' | 'TENTATIVE' | 'CANCELLED'
}

export interface ParsedICalFeed {
  events: ICalEvent[]
  etag?: string
}

/**
 * Parse iCal content and extract VEVENT blocks
 * This is a minimal parser - doesn't handle all iCal edge cases
 */
export function parseICalContent(icalContent: string): ICalEvent[] {
  const events: ICalEvent[] = []

  // Split into lines and normalize line endings
  const lines = icalContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n')

  let currentEvent: Partial<ICalEvent> | null = null
  let inEvent = false

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim()

    // Handle line folding (lines starting with space/tab continue previous line)
    while (i + 1 < lines.length && (lines[i + 1].startsWith(' ') || lines[i + 1].startsWith('\t'))) {
      i++
      line += lines[i].substring(1)
    }

    if (line === 'BEGIN:VEVENT') {
      inEvent = true
      currentEvent = {}
    } else if (line === 'END:VEVENT' && currentEvent) {
      // Validate required fields
      if (currentEvent.uid && currentEvent.dtstart && currentEvent.dtend) {
        events.push({
          uid: currentEvent.uid,
          summary: currentEvent.summary || 'Airbnb Reservation',
          description: currentEvent.description,
          dtstart: currentEvent.dtstart,
          dtend: currentEvent.dtend,
          status: currentEvent.status || 'CONFIRMED',
        })
      }
      currentEvent = null
      inEvent = false
    } else if (inEvent && currentEvent) {
      // Parse event properties
      const colonIndex = line.indexOf(':')
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex)
        const value = line.substring(colonIndex + 1)

        if (key === 'UID') {
          currentEvent.uid = value
        } else if (key === 'SUMMARY') {
          currentEvent.summary = unescapeICalValue(value)
        } else if (key === 'DESCRIPTION') {
          currentEvent.description = unescapeICalValue(value)
        } else if (key.startsWith('DTSTART')) {
          currentEvent.dtstart = parseICalDate(value)
        } else if (key.startsWith('DTEND')) {
          currentEvent.dtend = parseICalDate(value)
        } else if (key === 'STATUS') {
          const status = value.toUpperCase()
          if (status === 'CONFIRMED' || status === 'TENTATIVE' || status === 'CANCELLED') {
            currentEvent.status = status
          }
        }
      }
    }
  }

  return events
}

/**
 * Parse iCal date format (YYYYMMDD or YYYYMMDDTHHMMSS or YYYYMMDDTHHMMSSZ)
 */
function parseICalDate(dateString: string): Date {
  // Remove timezone info for simplicity (Z suffix)
  dateString = dateString.replace(/Z$/, '')

  // Format: YYYYMMDD
  if (dateString.length === 8) {
    const year = parseInt(dateString.substring(0, 4))
    const month = parseInt(dateString.substring(4, 6)) - 1
    const day = parseInt(dateString.substring(6, 8))
    return new Date(year, month, day)
  }

  // Format: YYYYMMDDTHHMMSS
  if (dateString.length >= 15) {
    const year = parseInt(dateString.substring(0, 4))
    const month = parseInt(dateString.substring(4, 6)) - 1
    const day = parseInt(dateString.substring(6, 8))
    const hour = parseInt(dateString.substring(9, 11))
    const minute = parseInt(dateString.substring(11, 13))
    const second = parseInt(dateString.substring(13, 15))
    return new Date(Date.UTC(year, month, day, hour, minute, second))
  }

  // Fallback
  return new Date(dateString)
}

/**
 * Unescape iCal text values
 */
function unescapeICalValue(value: string): string {
  return value
    .replace(/\\n/g, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\')
}

/**
 * Fetch and parse iCal feed from URL
 */
export async function fetchAndParseICalFeed(url: string): Promise<ParsedICalFeed> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'AirPlatform/1.0',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const content = await response.text()
    const events = parseICalContent(content)

    return {
      events,
      etag: response.headers.get('etag') || undefined,
    }
  } catch (error) {
    throw new Error(`Failed to fetch iCal feed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Calculate SHA256 hash of content for change detection
 */
export async function calculateContentHash(content: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const encoder = new TextEncoder()
    const data = encoder.encode(content)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  // Fallback for Node.js environment
  const crypto = require('crypto')
  return crypto.createHash('sha256').update(content).digest('hex')
}
