'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItemProps {
  title: string
  items?: { name: string; description?: string; href: string }[]
  href?: string
}

export function NavigationMenu() {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)

  const platformItems = [
    { name: 'Task Scheduling', href: '/platform/task-scheduling' },
    { name: 'Work Coordination', href: '/platform/work-coordination' },
    { name: 'Checklists', href: '/platform/checklists' },
    { name: 'Maintenance', href: '/platform/maintenance' },
    { name: 'Inventory', href: '/platform/inventory' },
    { name: 'Payments', href: '/platform/payments' },
    { name: 'Insights & Reporting', href: '/platform/insights' },
    { name: 'Smart Locks', href: '/platform/smart-locks' },
    { name: 'Housekeeping', href: '/platform/housekeeping' },
    { name: 'Messaging', href: '/platform/messaging' },
    { name: 'Guide', href: '/platform/guide' },
    { name: 'Assist', href: '/platform/assist' },
    { name: 'Upsells', href: '/platform/upsells' },
  ]

  const solutionsItems = [
    { name: 'Vacation Rental Managers', href: '/solutions/vacation-rentals' },
    { name: 'Hotels & Resorts', href: '/solutions/hotels' },
    { name: 'Cleaners & Service Providers', href: '/solutions/cleaners' },
    { name: 'Residential Property Managers', href: '/solutions/residential' },
    { name: 'Serviced Apartments', href: '/solutions/serviced-apartments' },
    { name: 'Corporate Housing', href: '/solutions/corporate-housing' },
    { name: 'Hosts', href: '/solutions/hosts' },
  ]

  const resourcesItems = [
    { name: 'Blog', href: '/resources/blog' },
    { name: 'Case Studies', href: '/resources/case-studies' },
    { name: 'Documentation', href: '/resources/docs' },
    { name: 'API Reference', href: '/resources/api' },
    { name: 'Support', href: '/resources/support' },
  ]

  const navItems: NavItemProps[] = [
    { title: 'Platform', items: platformItems },
    { title: 'Solutions', items: solutionsItems },
    { title: 'Resources', items: resourcesItems },
    { title: 'Pricing', href: '/pricing' },
  ]

  return (
    <nav className="hidden items-center gap-6 lg:flex">
      {navItems.map((item) =>
        item.items ? (
          <div
            key={item.title}
            className="relative"
            onMouseEnter={() => setOpenDropdown(item.title)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {item.title}
              <ChevronDown className="h-4 w-4" />
            </button>
            {openDropdown === item.title && (
              <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-lg border bg-popover p-2 shadow-lg">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            key={item.title}
            href={item.href!}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.title}
          </Link>
        )
      )}
    </nav>
  )
}
