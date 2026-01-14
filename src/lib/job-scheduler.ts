/**
 * Background Job Scheduler
 *
 * DEVELOPMENT MODE: In-memory scheduler using setTimeout/setInterval
 * PRODUCTION MODE: Replace with proper job queue (BullMQ, Inngest, etc.)
 *
 * This file provides an abstraction for scheduling background jobs.
 * Currently uses a simple in-memory approach for development.
 *
 * ## Production Migration Path:
 *
 * ### Option 1: BullMQ (Redis-based)
 * ```typescript
 * import { Queue } from 'bullmq'
 * const syncQueue = new Queue('calendar-sync', { connection: redis })
 * await syncQueue.add('sync-feed', { feedId }, { repeat: { every: 15 * 60 * 1000 } })
 * ```
 *
 * ### Option 2: Inngest (Serverless-friendly)
 * ```typescript
 * import { Inngest } from 'inngest'
 * const inngest = new Inngest({ name: 'AirPlatform' })
 * inngest.createFunction(
 *   { name: 'Sync Airbnb Feeds' },
 *   { cron: '*/15 * * * *' }, // Every 15 minutes
 *   async ({ step }) => { ... }
 * )
 * ```
 *
 * ### Option 3: Vercel Cron (for Vercel deployments)
 * ```json
 * // vercel.json
 * {
 *   "crons": [{
 *     "path": "/api/cron/sync-feeds",
 *     "schedule": "*/15 * * * *"
 *   }]
 * }
 * ```
 *
 * ### Option 4: Node-Cron (for VPS deployments)
 * ```typescript
 * import cron from 'node-cron'
 * cron.schedule('*/15 * * * *', async () => {
 *   await syncAllFeeds()
 * })
 * ```
 */

import { syncAllFeeds } from '@/app/actions/airbnb-integration'
import { prisma } from './db'

type JobHandler = () => Promise<void>

interface Job {
  id: string
  name: string
  handler: JobHandler
  intervalMs: number
  timerId?: NodeJS.Timeout
}

class JobScheduler {
  private jobs: Map<string, Job> = new Map()
  private isStarted = false

  /**
   * Register a recurring job
   */
  register(job: Omit<Job, 'timerId'>) {
    this.jobs.set(job.id, job)
    console.log(`[JobScheduler] Registered job: ${job.name} (every ${job.intervalMs}ms)`)
  }

  /**
   * Start all registered jobs
   */
  start() {
    if (this.isStarted) {
      console.log('[JobScheduler] Already started')
      return
    }

    console.log(`[JobScheduler] Starting ${this.jobs.size} jobs...`)

    for (const [id, job] of this.jobs) {
      // Run immediately on start
      this.runJob(job)

      // Schedule recurring execution
      const timerId = setInterval(async () => {
        await this.runJob(job)
      }, job.intervalMs)

      job.timerId = timerId
      this.jobs.set(id, job)
    }

    this.isStarted = true
    console.log('[JobScheduler] All jobs started')
  }

  /**
   * Stop all jobs
   */
  stop() {
    console.log('[JobScheduler] Stopping all jobs...')

    for (const [id, job] of this.jobs) {
      if (job.timerId) {
        clearInterval(job.timerId)
      }
    }

    this.isStarted = false
    console.log('[JobScheduler] All jobs stopped')
  }

  /**
   * Run a single job immediately
   */
  private async runJob(job: Job) {
    const startTime = Date.now()
    console.log(`[JobScheduler] Running job: ${job.name}`)

    try {
      await job.handler()
      const duration = Date.now() - startTime
      console.log(`[JobScheduler] Job completed: ${job.name} (${duration}ms)`)
    } catch (error) {
      console.error(`[JobScheduler] Job failed: ${job.name}`, error)
    }
  }

  /**
   * Get status of all jobs
   */
  getStatus() {
    return {
      isStarted: this.isStarted,
      jobs: Array.from(this.jobs.values()).map(job => ({
        id: job.id,
        name: job.name,
        intervalMs: job.intervalMs,
        isRunning: !!job.timerId,
      })),
    }
  }
}

// Singleton instance
const scheduler = new JobScheduler()

/**
 * Register all application jobs
 */
export function registerJobs() {
  // Sync Airbnb calendar feeds every 15 minutes
  scheduler.register({
    id: 'sync-airbnb-feeds',
    name: 'Sync Airbnb Calendar Feeds',
    intervalMs: 15 * 60 * 1000, // 15 minutes
    handler: async () => {
      // Get all organizations
      const orgs = await prisma.organization.findMany({
        where: {
          airbnbIntegrations: {
            some: {
              status: 'CONNECTED',
            },
          },
        },
      })

      for (const org of orgs) {
        await syncAllFeeds(org.id)
      }
    },
  })

  // TODO: Add more jobs here
  // - Generate TaskInstances from upcoming reservations
  // - Send reminder notifications
  // - Update Unit ready status
  // - Clean up old audit logs
}

/**
 * Start the job scheduler
 * Call this in your application entry point
 */
export function startScheduler() {
  if (process.env.NODE_ENV === 'development') {
    console.log('[JobScheduler] Running in DEVELOPMENT mode - using in-memory scheduler')
    console.log('[JobScheduler] NOTE: Jobs will NOT persist across restarts')
  }

  registerJobs()
  scheduler.start()
}

/**
 * Stop the job scheduler
 * Call this during graceful shutdown
 */
export function stopScheduler() {
  scheduler.stop()
}

/**
 * Get scheduler status (useful for health checks)
 */
export function getSchedulerStatus() {
  return scheduler.getStatus()
}

// Auto-start in development (optional)
if (process.env.NODE_ENV === 'development' && process.env.AUTO_START_SCHEDULER === 'true') {
  startScheduler()

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('[JobScheduler] Received SIGINT, shutting down...')
    stopScheduler()
    process.exit(0)
  })

  process.on('SIGTERM', () => {
    console.log('[JobScheduler] Received SIGTERM, shutting down...')
    stopScheduler()
    process.exit(0)
  })
}

export default scheduler
