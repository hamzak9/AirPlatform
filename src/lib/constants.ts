// Design tokens and constants for Worksy Ops

export const SITE_CONFIG = {
  name: 'Worksy Ops',
  description: 'Get units guest-ready, automatically. The complete operations platform for Airbnb property managers.',
  url: 'https://worksyops.com',
  ogImage: 'https://worksyops.com/og.png',
  links: {
    twitter: 'https://twitter.com/worksyops',
    github: 'https://github.com/worksyops',
  },
}

export const PLATFORM_FEATURES = {
  automateOperations: [
    {
      name: 'Task Scheduling',
      description: 'Automated task creation tied to reservations and property events',
      icon: 'CalendarClock',
      href: '/platform/task-scheduling',
    },
    {
      name: 'Work Coordination',
      description: 'Coordinate teams, vendors, and workflows seamlessly',
      icon: 'ClipboardList',
      href: '/platform/work-coordination',
    },
    {
      name: 'Checklists & Mobile App',
      description: 'Digital checklists with mobile access for your team',
      icon: 'ListChecks',
      href: '/platform/checklists',
    },
    {
      name: 'Maintenance',
      description: 'Track work orders and manage vendor relationships',
      icon: 'Wrench',
      href: '/platform/maintenance',
    },
    {
      name: 'Inventory Tracking',
      description: 'Monitor supplies, linens, and amenities across properties',
      icon: 'Package',
      href: '/platform/inventory',
    },
    {
      name: 'Payments',
      description: 'Automated payouts and expense tracking',
      icon: 'DollarSign',
      href: '/platform/payments',
    },
    {
      name: 'Insights & Reporting',
      description: 'Real-time analytics and performance dashboards',
      icon: 'BarChart3',
      href: '/platform/insights',
    },
    {
      name: 'Smart Locks',
      description: 'Automated access codes synced with reservations',
      icon: 'Lock',
      href: '/platform/smart-locks',
    },
    {
      name: 'Housekeeping',
      description: 'Dedicated tools for cleaning team management',
      icon: 'Sparkles',
      href: '/platform/housekeeping',
    },
  ],
  elevateExperience: [
    {
      name: 'Messaging',
      description: 'Centralized guest communication hub',
      icon: 'MessageSquare',
      href: '/platform/messaging',
    },
    {
      name: 'Guide',
      description: 'Digital welcome books and property guides',
      icon: 'BookOpen',
      href: '/platform/guide',
    },
    {
      name: 'Assist',
      description: 'AI-powered guest support (coming soon)',
      icon: 'Bot',
      href: '/platform/assist',
    },
    {
      name: 'Upsells',
      description: 'Offer add-on services to increase revenue',
      icon: 'TrendingUp',
      href: '/platform/upsells',
    },
  ],
}

export const SOLUTIONS = [
  {
    name: 'Vacation Rental Managers',
    description: 'Purpose-built for short-term rental operations',
    href: '/solutions/vacation-rentals',
  },
  {
    name: 'Hotels & Resorts',
    description: 'Enterprise-grade for hospitality groups',
    href: '/solutions/hotels',
  },
  {
    name: 'Cleaners & Service Providers',
    description: 'Tools for cleaning and maintenance teams',
    href: '/solutions/cleaners',
  },
  {
    name: 'Residential Property Managers',
    description: 'Long-term rental operations simplified',
    href: '/solutions/residential',
  },
  {
    name: 'Serviced Apartments',
    description: 'Corporate housing operations platform',
    href: '/solutions/serviced-apartments',
  },
  {
    name: 'Corporate Housing',
    description: 'Extended stay management tools',
    href: '/solutions/corporate-housing',
  },
  {
    name: 'Hosts',
    description: 'Perfect for individual property owners',
    href: '/solutions/hosts',
  },
]

export const PRICING_TIERS = [
  {
    name: 'Starter',
    price: '$49',
    description: 'Perfect for individual hosts',
    features: [
      'Up to 3 properties',
      'Unlimited tasks & checklists',
      'Mobile app access',
      'Email support',
      'Basic reporting',
    ],
    cta: 'Start Free Trial',
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
      'Smart lock integration',
      'Priority support',
      'Custom workflows',
    ],
    cta: 'Start Free Trial',
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
      'Advanced security',
      'White-label options',
    ],
    cta: 'Request Quote',
    highlighted: false,
  },
]

export const TESTIMONIALS = [
  {
    quote:
      "Worksy Ops transformed how we manage our 47 properties. Tasks are automated, our team is coordinated, and guests are happier than ever.",
    author: 'Sarah Johnson',
    role: 'CEO, Coastal Stays Management',
    image: '/testimonials/sarah.jpg',
  },
  {
    quote:
      "The scheduling automation alone saves us 10+ hours per week. It's like having an extra employee dedicated to logistics.",
    author: 'Michael Chen',
    role: 'Operations Director, Urban Retreats',
    image: '/testimonials/michael.jpg',
  },
  {
    quote:
      "We tried 4 different platforms before finding Worksy Ops. The mobile app for our cleaning team is a game-changer.",
    author: 'Emily Rodriguez',
    role: 'Founder, Elite Vacation Rentals',
    image: '/testimonials/emily.jpg',
  },
]
