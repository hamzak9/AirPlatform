'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, ArrowRight } from 'lucide-react'

const pricingTiers = [
  {
    name: 'Starter',
    price: '$49',
    description: 'Perfect for individual hosts',
    features: [
      'Up to 3 properties',
      'Unlimited tasks & checklists',
      'Mobile app access',
      'Email support',
    ],
    cta: 'Start Free Trial',
    href: '/pricing',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$99',
    description: 'For growing property managers',
    features: [
      'Up to 10 properties',
      'Everything in Starter',
      'Advanced analytics',
      'Team collaboration',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    href: '/pricing',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale operations',
    features: [
      'Unlimited properties',
      'Everything in Professional',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee',
    ],
    cta: 'Request Quote',
    href: '/demo',
    highlighted: false,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function PricingPreview() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Choose the plan that fits your operation. All plans include a 14-day free trial.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {pricingTiers.map((tier) => (
            <motion.div key={tier.name} variants={item}>
              <Card
                className={`h-full ${tier.highlighted ? 'border-primary shadow-lg ring-2 ring-primary/20' : ''}`}
              >
                <CardHeader>
                  {tier.highlighted && (
                    <div className="mb-2 inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      Most Popular
                    </div>
                  )}
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.price !== 'Custom' && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="mb-6 space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={tier.highlighted ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href={tier.href}>{tier.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            View detailed pricing <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
