'use client'

import { motion } from 'framer-motion'

export function IntegrationsSection() {
  return (
    <section className="border-y bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Seamless Integrations</h2>
          <p className="mb-8 text-muted-foreground">
            Built for Airbnb property managers, with more integrations coming soon
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          {/* Airbnb Logo */}
          <div className="flex h-20 w-40 items-center justify-center rounded-lg border bg-background p-6 shadow-sm">
            <svg
              viewBox="0 0 100 100"
              className="h-12 w-12 fill-[#FF5A5F]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M50 10c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 50c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20zm25-5c-2.8 6.9-7.9 12.6-14.3 16.1-6.4 3.5-13.6 4.4-20.5 2.5-6.9-1.9-12.9-6.3-16.9-12.4-4-6.1-5.8-13.3-5.1-20.4.7-7.1 3.9-13.6 9-18.4 5.1-4.8 11.7-7.8 18.8-8.5 7.1-.7 14.2 1.2 20.2 5.4 6 4.2 10.5 10.3 12.8 17.2 2.3 6.9 2.1 14.4-.5 21.2" />
            </svg>
          </div>

          {/* Coming Soon Badges */}
          <div className="flex h-20 w-40 items-center justify-center rounded-lg border border-dashed bg-background/50 p-6">
            <span className="text-sm font-medium text-muted-foreground">More coming soon</span>
          </div>
          <div className="hidden h-20 w-40 items-center justify-center rounded-lg border border-dashed bg-background/50 p-6 sm:flex">
            <span className="text-sm font-medium text-muted-foreground">Integration API</span>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Looking for a specific integration?{' '}
            <a href="/contact" className="font-medium text-primary hover:underline">
              Let us know
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
