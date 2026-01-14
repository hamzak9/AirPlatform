# Worksy Ops

**The Complete Operations Platform for Airbnb Property Managers**

A production-grade SaaS application built with Next.js 14+ (App Router), TypeScript, and modern web technologies.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Auth.js (NextAuth v5) with credentials provider
- **Forms:** React Hook Form + Zod validation
- **Code Quality:** ESLint, Prettier, Husky, lint-staged

## Features

### Core Modules
- **Dashboard** - Overview of operations, stats, and recent activity
- **Task Scheduling** - Automated task creation and assignment
- **Work Coordination** - Multi-team workflow management
- **Checklists** - Standardized quality assurance
- **Maintenance** - Work order tracking and vendor management
- **Inventory** - Supply and amenity tracking
- **Payments** - Payout and invoice management
- **Insights & Reporting** - Analytics and data visualization
- **Smart Locks** - Access code automation
- **Housekeeping** - Cleaning team coordination
- **Messaging** - Internal communication
- **Guide** - Documentation and best practices
- **Assist** - AI-powered automation
- **Upsells** - Revenue optimization

### Multi-Tenancy
- Organization-based isolation
- Property and unit hierarchy
- Role-based access control (OWNER, MANAGER, COORDINATOR, VENDOR, CLEANER, INSPECTOR)

### Data Models
- Organizations & Users
- Properties & Units
- Reservations (Airbnb integration ready)
- Tasks & Checklists
- Work Orders & Vendors
- Payouts & Messages
- Integrations

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update DATABASE_URL in .env with your PostgreSQL connection string

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed database with sample data
npm run db:seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Demo Credentials

```
Email: owner@coastalstays.com
Password: password123
```

## Project Structure

```
worksy-ops/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts            # Seed data
├── src/
│   ├── app/
│   │   ├── (marketing)/   # Public pages
│   │   ├── (dashboard)/   # Protected app pages
│   │   ├── auth/          # Authentication pages
│   │   └── api/           # API routes
│   ├── components/
│   │   ├── ui/            # shadcn/ui components
│   │   ├── dashboard/     # Dashboard components
│   │   └── shared/        # Shared components
│   ├── lib/
│   │   ├── auth.ts        # Auth.js configuration
│   │   ├── db.ts          # Prisma client
│   │   ├── utils.ts       # Utilities
│   │   └── validations/   # Zod schemas
│   └── middleware.ts      # Route protection
└── public/                # Static assets
```

## Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Format code
npm run format

# Open Prisma Studio
npm run db:studio
```

## Database

### Prisma Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes (dev)
npm run db:push

# Create migration
npm run db:migrate

# Seed database
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

## Authentication

Uses Auth.js (NextAuth v5) with:
- Credentials provider (email/password)
- JWT session strategy
- Role-based access control
- Protected routes via middleware

## Deployment

### Environment Variables

Required for production:
- `DATABASE_URL` - PostgreSQL connection string
- `AUTH_SECRET` - Generate with `openssl rand -base64 32`
- `AUTH_URL` - Your production URL
- `NEXT_PUBLIC_APP_URL` - Your production URL

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## License

MIT

## Contributing

Contributions welcome! Please read our contributing guidelines first.
