import { Metadata } from 'next'
import { MarketingLayout } from '@/components/layouts/marketing-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Request a Demo - Worksy Ops',
  description:
    'See Worksy Ops in action. Schedule a personalized demo with our team to learn how we can transform your property management operations.',
}

export default function DemoPage() {
  return (
    <MarketingLayout>
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            {/* Left Column - Form */}
            <div>
              <h1 className="mb-4 text-4xl font-bold tracking-tight">Request a demo</h1>
              <p className="mb-8 text-lg text-muted-foreground">
                See how Worksy Ops can automate your operations and save you 10+ hours per week.
                We'll walk you through the platform and answer all your questions.
              </p>

              <Card>
                <CardHeader>
                  <CardTitle>Get started in minutes</CardTitle>
                  <CardDescription>
                    Fill out the form and we'll be in touch within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Work Email</Label>
                      <Input id="email" type="email" placeholder="john@company.com" required />
                    </div>

                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" placeholder="Your Property Management Co." required />
                    </div>

                    <div>
                      <Label htmlFor="properties">Number of Properties</Label>
                      <Input id="properties" placeholder="e.g., 10" required />
                    </div>

                    <div>
                      <Label htmlFor="message">What are you looking to improve? (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your current challenges..."
                        rows={4}
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Schedule My Demo
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      By submitting this form, you agree to our privacy policy
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Benefits */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-2xl font-bold">What you'll learn</h2>
                <ul className="space-y-4">
                  {[
                    'How to automate 80% of your repetitive tasks',
                    'Best practices from 1,000+ property managers',
                    'Integration options with your existing tools',
                    'Custom workflow setup for your operation',
                    'ROI calculator and pricing options',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg">Trusted by industry leaders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <blockquote className="border-l-2 border-primary pl-4 italic">
                      "The demo was eye-opening. Within 30 days of onboarding, we automated our
                      entire turnover process."
                    </blockquote>
                    <div className="text-sm">
                      <div className="font-semibold">Sarah Johnson</div>
                      <div className="text-muted-foreground">CEO, Coastal Stays Management</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h3 className="mb-3 font-semibold">Have questions?</h3>
                <p className="text-sm text-muted-foreground">
                  Email us at{' '}
                  <a href="mailto:demo@worksyops.com" className="text-primary hover:underline">
                    demo@worksyops.com
                  </a>{' '}
                  or call{' '}
                  <a href="tel:+18005551234" className="text-primary hover:underline">
                    (800) 555-1234
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  )
}
