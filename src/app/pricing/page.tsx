import { Metadata } from 'next'
import { MarketingLayout } from '@/components/layouts/marketing-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing - Worksy Ops',
  description:
    'Simple, transparent pricing for property managers. Choose the plan that fits your operation with a 14-day free trial.',
}

const pricingTiers = [
  {
    name: 'Starter',
    price: '$49',
    description: 'Perfect for individual hosts with 1-3 properties',
    features: [
      'Up to 3 properties',
      'Unlimited tasks & checklists',
      'Basic reporting',
      'Email support',
      'Mobile app access',
      'Task automation',
      'Guest messaging',
    ],
    cta: 'Start Free Trial',
    href: '/auth/signup',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$99',
    description: 'For growing property management businesses',
    features: [
      'Up to 10 properties',
      'Everything in Starter',
      'Advanced analytics',
      'Team collaboration (up to 10 users)',
      'Smart lock integration',
      'Priority support',
      'Custom workflows',
      'API access',
      'Vendor management',
    ],
    cta: 'Start Free Trial',
    href: '/auth/signup',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale operations',
    features: [
      'Unlimited properties',
      'Everything in Professional',
      'Unlimited team members',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee (99.9% uptime)',
      'Advanced security (SSO, audit logs)',
      'White-label options',
      'Onboarding & training',
      'Custom contracts',
    ],
    cta: 'Request Quote',
    href: '/demo',
    highlighted: false,
  },
]

const faqs = [
  {
    question: 'Can I switch plans later?',
    answer:
      'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    question: 'What happens after the free trial?',
    answer:
      "Your free trial lasts 14 days. After that, you'll be billed monthly based on your selected plan. No credit card required to start.",
  },
  {
    question: 'Do you offer annual billing?',
    answer:
      'Yes! Annual billing is available with a 20% discount. Contact sales for annual pricing details.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, Amex) and ACH transfers for Enterprise customers.',
  },
  {
    question: 'Is there a setup fee?',
    answer:
      'No setup fees for Starter and Professional plans. Enterprise plans may include optional onboarding services.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes, you can cancel your subscription at any time. Your access continues until the end of your billing period.',
  },
]

export default function PricingPage() {
  return (
    <MarketingLayout>
      <div className="py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-5xl font-bold tracking-tight">
              Simple, transparent pricing
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Choose the plan that fits your operation. All plans include a 14-day free trial, no
              credit card required.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mb-24 grid gap-8 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                className={`flex flex-col ${tier.highlighted ? 'border-primary shadow-lg ring-2 ring-primary/20' : ''}`}
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
                <CardContent className="flex flex-1 flex-col">
                  <ul className="mb-6 flex-1 space-y-3">
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
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg border p-6">
                  <h3 className="mb-2 font-semibold">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-24 rounded-2xl bg-primary/5 p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Still have questions?</h2>
            <p className="mb-6 text-muted-foreground">
              Our team is here to help you find the perfect plan for your operation
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/demo">Schedule a Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  )
}
