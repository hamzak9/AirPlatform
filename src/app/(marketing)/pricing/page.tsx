import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

const plans = [
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
    ],
  },
  {
    name: 'Professional',
    price: '$99',
    description: 'For growing property management businesses',
    features: [
      'Up to 10 properties',
      'Everything in Starter',
      'Advanced analytics',
      'Team collaboration',
      'Smart lock integration',
      'Priority support',
      'Custom workflows',
    ],
    popular: true,
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
      'Advanced security',
      'White-label options',
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground">
          Choose the plan that fits your operation. No hidden fees.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={plan.popular ? 'border-primary shadow-lg' : ''}
          >
            <CardHeader>
              {plan.popular && (
                <div className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== 'Custom' && (
                  <span className="text-muted-foreground">/month</span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full" variant={plan.popular ? 'default' : 'outline'} asChild>
                <Link href="/auth/signup">
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        All plans include a 14-day free trial. No credit card required.
      </div>
    </div>
  )
}
