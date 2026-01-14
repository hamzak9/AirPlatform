'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
          >
            Trusted by 1,000+ property managers
          </motion.div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Get units guest-ready,{' '}
            <span className="text-primary">automatically</span>
          </h1>

          <p className="mb-10 text-xl text-muted-foreground sm:text-2xl">
            The complete operations platform for Airbnb property managers. Automate tasks,
            coordinate teams, and deliver 5-star guest experiences.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/demo">
                Get a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
              <Link href="/auth/signin">
                <Play className="mr-2 h-4 w-4" /> Sign In
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            <div>
              <div className="text-3xl font-bold text-primary">10k+</div>
              <div className="mt-1 text-sm text-muted-foreground">Properties Managed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">500k+</div>
              <div className="mt-1 text-sm text-muted-foreground">Tasks Automated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="mt-1 text-sm text-muted-foreground">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="mt-1 text-sm text-muted-foreground">Support Available</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:14px_24px]" />
    </section>
  )
}
