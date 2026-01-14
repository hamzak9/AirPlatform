import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  CalendarClock,
  ListChecks,
  Wrench,
  BarChart3,
  MessageSquare,
  Sparkles,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight">
            The Complete Operations Platform for Airbnb Property Managers
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Streamline tasks, coordinate teams, and deliver 5-star guest experiences with the
            all-in-one property management OS built exclusively for Airbnb hosts.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/auth/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-t bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Everything You Need to Run Your Airbnb</h2>
            <p className="text-muted-foreground">
              Powerful features designed specifically for short-term rental operations
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CalendarClock className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Task Scheduling</CardTitle>
                <CardDescription>
                  Automate cleaning, maintenance, and prep tasks tied to reservations
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <ListChecks className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Smart Checklists</CardTitle>
                <CardDescription>
                  Ensure consistency with customizable checklists for every task
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Wrench className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Maintenance Tracking</CardTitle>
                <CardDescription>
                  Track work orders, manage vendors, and prevent issues before they happen
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Sparkles className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Housekeeping Management</CardTitle>
                <CardDescription>
                  Coordinate cleaning teams and ensure properties are guest-ready
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <MessageSquare className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Team Communication</CardTitle>
                <CardDescription>
                  Keep everyone in sync with built-in messaging and notifications
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <BarChart3 className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Analytics & Insights</CardTitle>
                <CardDescription>
                  Make data-driven decisions with comprehensive reporting
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Transform Your Operations?</h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Join hundreds of Airbnb property managers saving time and delighting guests.
          </p>
          <Button size="lg" asChild>
            <Link href="/auth/signup">Get Started Free</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
