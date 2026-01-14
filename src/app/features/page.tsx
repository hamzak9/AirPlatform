import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
  TrendingUp,
  Bot,
} from 'lucide-react'

const features = [
  {
    icon: CalendarClock,
    title: 'Task Scheduling',
    description:
      'Automatically create and assign tasks based on reservations. Schedule cleanings, inspections, and maintenance with intelligent automation.',
  },
  {
    icon: ClipboardList,
    title: 'Work Coordination',
    description:
      'Coordinate complex workflows across multiple teams, properties, and vendors with ease.',
  },
  {
    icon: ListChecks,
    title: 'Checklists',
    description:
      'Create standardized checklists for cleaning, inspections, and turnovers. Ensure consistent quality every time.',
  },
  {
    icon: Wrench,
    title: 'Maintenance Management',
    description:
      'Track work orders, manage vendors, and keep detailed maintenance history for each property.',
  },
  {
    icon: Package,
    title: 'Inventory Tracking',
    description:
      'Monitor supplies, linens, and amenities across all properties. Never run out of essentials.',
  },
  {
    icon: DollarSign,
    title: 'Payment Management',
    description:
      'Track payouts to cleaners, vendors, and team members. Manage invoices and expenses in one place.',
  },
  {
    icon: BarChart3,
    title: 'Insights & Reporting',
    description:
      'Comprehensive analytics on operations, costs, and performance. Make data-driven decisions.',
  },
  {
    icon: Lock,
    title: 'Smart Lock Integration',
    description:
      'Automate access codes for guests and team members. Integrate with popular smart lock brands.',
  },
  {
    icon: Sparkles,
    title: 'Housekeeping Management',
    description:
      'Dedicated tools for managing cleaning teams, schedules, and quality standards.',
  },
  {
    icon: MessageSquare,
    title: 'Team Messaging',
    description:
      'Built-in communication for teams, vendors, and guests. Keep all conversations organized.',
  },
  {
    icon: TrendingUp,
    title: 'Upsell Management',
    description:
      'Offer add-on services like early check-in, late checkout, and premium amenities to boost revenue.',
  },
  {
    icon: Bot,
    title: 'AI-Powered Assist',
    description:
      'Get intelligent suggestions, automate repetitive tasks, and optimize your operations with AI.',
  },
]

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Powerful Features for Property Managers</h1>
        <p className="text-xl text-muted-foreground">
          Everything you need to run a professional Airbnb operation
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card key={feature.title}>
              <CardHeader>
                <Icon className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
