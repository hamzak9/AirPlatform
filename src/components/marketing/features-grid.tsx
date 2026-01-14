'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  CalendarClock,
  ClipboardList,
  ListChecks,
  Wrench,
  Package,
  DollarSign,
  BarChart3,
  Lock,
  Sparkles,
  MessageSquare,
  BookOpen,
  Bot,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const iconMap = {
  CalendarClock,
  ClipboardList,
  ListChecks,
  Wrench,
  Package,
  DollarSign,
  BarChart3,
  Lock,
  Sparkles,
  MessageSquare,
  BookOpen,
  Bot,
  TrendingUp,
}

const automateFeatures = [
  {
    icon: 'CalendarClock',
    name: 'Task Scheduling',
    description: 'Automated task creation tied to reservations',
    href: '/platform/task-scheduling',
  },
  {
    icon: 'ClipboardList',
    name: 'Work Coordination',
    description: 'Coordinate teams and workflows seamlessly',
    href: '/platform/work-coordination',
  },
  {
    icon: 'ListChecks',
    name: 'Checklists & Mobile App',
    description: 'Digital checklists with mobile access',
    href: '/platform/checklists',
  },
  {
    icon: 'Wrench',
    name: 'Maintenance',
    description: 'Track work orders and manage vendors',
    href: '/platform/maintenance',
  },
  {
    icon: 'Package',
    name: 'Inventory Tracking',
    description: 'Monitor supplies across properties',
    href: '/platform/inventory',
  },
  {
    icon: 'DollarSign',
    name: 'Payments',
    description: 'Automated payouts and expense tracking',
    href: '/platform/payments',
  },
  {
    icon: 'BarChart3',
    name: 'Insights & Reporting',
    description: 'Real-time analytics and dashboards',
    href: '/platform/insights',
  },
  {
    icon: 'Lock',
    name: 'Smart Locks',
    description: 'Automated access codes synced with bookings',
    href: '/platform/smart-locks',
  },
  {
    icon: 'Sparkles',
    name: 'Housekeeping',
    description: 'Cleaning team management tools',
    href: '/platform/housekeeping',
  },
]

const elevateFeatures = [
  {
    icon: 'MessageSquare',
    name: 'Messaging',
    description: 'Centralized guest communication',
    href: '/platform/messaging',
  },
  {
    icon: 'BookOpen',
    name: 'Guide',
    description: 'Digital welcome books',
    href: '/platform/guide',
  },
  {
    icon: 'Bot',
    name: 'Assist',
    description: 'AI-powered guest support',
    href: '/platform/assist',
  },
  {
    icon: 'TrendingUp',
    name: 'Upsells',
    description: 'Increase revenue with add-ons',
    href: '/platform/upsells',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function FeaturesGrid() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">
            Everything you need to run your properties
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Two powerful suites working together to automate operations and elevate guest
            experiences
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Automate Operations */}
          <div>
            <div className="mb-8">
              <h3 className="mb-2 text-2xl font-bold">Automate Operations</h3>
              <p className="text-muted-foreground">
                Streamline your workflow and save hours every week
              </p>
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            >
              {automateFeatures.map((feature) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap]
                return (
                  <motion.div key={feature.name} variants={item}>
                    <Link href={feature.href}>
                      <Card className="group h-full transition-all hover:border-primary hover:shadow-md">
                        <CardHeader>
                          <Icon className="mb-2 h-8 w-8 text-primary" />
                          <CardTitle className="text-base group-hover:text-primary">
                            {feature.name}
                          </CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Elevate Guest Experience */}
          <div>
            <div className="mb-8">
              <h3 className="mb-2 text-2xl font-bold">Elevate Guest Experience</h3>
              <p className="text-muted-foreground">
                Delight your guests and earn 5-star reviews
              </p>
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            >
              {elevateFeatures.map((feature) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap]
                return (
                  <motion.div key={feature.name} variants={item}>
                    <Link href={feature.href}>
                      <Card className="group h-full transition-all hover:border-primary hover:shadow-md">
                        <CardHeader>
                          <Icon className="mb-2 h-8 w-8 text-primary" />
                          <CardTitle className="text-base group-hover:text-primary">
                            {feature.name}
                          </CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/platform"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            Explore all features <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
