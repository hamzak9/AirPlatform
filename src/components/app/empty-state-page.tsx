import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface EmptyStatePageProps {
  icon: LucideIcon
  title: string
  description: string
  action: {
    label: string
    onClick?: () => void
    href?: string
  }
}

export function EmptyStatePage({ icon: Icon, title, description, action }: EmptyStatePageProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-24 text-center">
        <div className="rounded-full bg-muted p-6">
          <Icon className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="mt-6 text-xl font-semibold">{title}</h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
        <Button onClick={action.onClick} className="mt-8" size="lg">
          {action.label}
        </Button>
      </CardContent>
    </Card>
  )
}
