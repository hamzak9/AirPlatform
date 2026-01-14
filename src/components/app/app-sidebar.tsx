'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { APP_NAVIGATION } from '@/lib/app-navigation'
import { cn } from '@/lib/utils'
import { Building2 } from 'lucide-react'

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r bg-background overflow-y-auto">
      <div className="flex h-full flex-col py-4">
        <nav className="flex-1 space-y-6 px-3">
          {APP_NAVIGATION.map((section) => (
            <div key={section.title}>
              <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t px-3 pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span className="truncate">Coastal Stays Management</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
