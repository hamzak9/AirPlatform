import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/sidebar'
import { TopBar } from '@/components/dashboard/top-bar'
import { db } from '@/lib/db'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin')
  }

  // Fetch properties for the property switcher
  const properties = await db.property.findMany({
    where: {
      organizationId: session.user.organizationId,
    },
    select: {
      id: true,
      name: true,
    },
    take: 10,
  })

  return (
    <div className="min-h-screen bg-background">
      <TopBar session={session} properties={properties} />
      <Sidebar />
      <main className="ml-64 mt-16 p-8">{children}</main>
    </div>
  )
}
