# Multi-Agent AI Lead Generation SaaS

A production-ready SaaS application for automated lead generation using multi-agent AI systems. Built with Next.js, Supabase, and Stripe.

## 🚀 Features

- **Multi-Agent AI Pipeline**: Four specialized AI agents work together:
  - **Lead Sourcing Agent**: Finds potential leads based on Ideal Customer Profile (ICP)
  - **Enrichment Agent**: Enriches leads with emails, LinkedIn profiles, and company data
  - **Outreach Agent**: Generates personalized cold email drafts
  - **Analysis Agent**: Scores leads and provides actionable insights

- **Workspace Management**: Multi-tenant architecture with organizations and role-based access
- **Campaign Management**: Create and manage lead generation campaigns with custom ICPs
- **Stripe Integration**: Subscription-based credit system with Starter and Pro plans
- **Real-time Dashboard**: View campaigns, leads, outreach drafts, and analytics
- **Row-Level Security**: Secure multi-tenant data isolation with Supabase RLS

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **AI Provider**: OpenAI (configurable)
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript + Zod

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Stripe account
- OpenAI API key (or compatible AI provider)

## 🔧 Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd multi-agent-leadgen
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the migration file:
   ```bash
   # Copy contents of supabase/migrations/001_initial_schema.sql
   # Paste and execute in Supabase SQL Editor
   ```
3. Get your project URL and anon key from Settings > API

### 3. Stripe Setup

1. Create products and prices in Stripe Dashboard:
   - **Starter Plan**: $49/month (500 credits)
   - **Pro Plan**: $149/month (2,000 credits)
2. Copy the Price IDs from Stripe
3. Set up webhook endpoint:
   - URL: `https://your-domain.com/api/stripe/webhook`
   - Events to listen: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`
   - Copy the webhook signing secret

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_STARTER_PRICE_ID=price_your_starter_price_id
STRIPE_PRO_PRICE_ID=price_your_pro_price_id

# AI Provider Configuration
OPENAI_API_KEY=sk-your_openai_api_key
AI_MODEL=gpt-4o-mini
AI_BASE_URL=https://api.openai.com/v1

# Application URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
multi-agent-leadgen/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── campaigns/     # Campaign CRUD and run endpoints
│   │   │   ├── organizations/ # Organization management
│   │   │   └── stripe/        # Stripe checkout, webhooks, portal
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── login/             # Auth pages
│   │   └── signup/
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   └── dashboard/        # Dashboard-specific components
│   ├── lib/
│   │   ├── agents/           # Multi-agent engine
│   │   │   ├── sourcing-agent.ts
│   │   │   ├── enrichment-agent.ts
│   │   │   ├── outreach-agent.ts
│   │   │   ├── analysis-agent.ts
│   │   │   └── orchestrator.ts
│   │   ├── ai/              # AI provider abstraction
│   │   ├── supabase/        # Supabase client utilities
│   │   ├── stripe/          # Stripe configuration
│   │   ├── types.ts         # TypeScript types and Zod schemas
│   │   └── utils/           # Utility functions
│   └── middleware.ts        # Auth middleware
├── supabase/
│   └── migrations/          # Database migrations
└── public/                 # Static assets
```

## 🗄 Database Schema

### Core Tables

- **organizations**: Workspaces/tenants
- **members**: User-organization relationships with roles
- **subscriptions**: Stripe subscription data and credits
- **campaigns**: Lead generation campaigns with ICP config
- **leads**: Generated leads with enrichment data
- **lead_events**: Event tracking for lead processing
- **outreach_drafts**: AI-generated outreach emails
- **campaign_runs**: Campaign execution tracking

All tables have Row-Level Security (RLS) policies for multi-tenant isolation.

## 🔐 Authentication Flow

1. User signs up → Creates account in Supabase Auth
2. Organization created → User becomes owner
3. Default subscription → Free tier (100 credits)
4. Middleware protects routes → Redirects to login if unauthenticated

## 💳 Credits System

- Credits are consumed per lead: 4 credits (source + enrich + outreach + analyze)
- Credits reset monthly based on subscription plan
- Campaign runs are blocked if insufficient credits
- Usage tracked in `subscriptions` table

## 🤖 Multi-Agent Pipeline

When a campaign runs:

1. **Sourcing**: AI generates leads based on ICP
2. **Enrichment**: Each lead is enriched with contact info
3. **Outreach**: Personalized email drafts generated
4. **Analysis**: Leads scored and insights provided

All steps are logged in `lead_events` for auditability.

## 🚢 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Supabase Production Setup

1. Run migrations in production Supabase project
2. Update RLS policies if needed
3. Configure production database URL

### Stripe Production Setup

1. Switch to live API keys
2. Update webhook URL to production domain
3. Test webhook events

## 📝 API Routes

- `POST /api/organizations` - Create organization
- `GET /api/organizations` - List user's organizations
- `POST /api/campaigns` - Create campaign
- `GET /api/campaigns` - List campaigns
- `GET /api/campaigns/[id]` - Get campaign with leads
- `POST /api/campaigns/[id]/run` - Run campaign
- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/stripe/webhook` - Handle Stripe webhooks
- `POST /api/stripe/portal` - Create billing portal session

## 🔒 Security Considerations

- Row-Level Security (RLS) on all tables
- API routes protected with auth checks
- Stripe webhook signature verification
- Environment variables for sensitive data
- Middleware for route protection

## 🧪 Testing

To test the application:

1. Sign up with a test email
2. Create a campaign with ICP details
3. Run the campaign (requires credits)
4. View generated leads and outreach drafts
5. Test Stripe checkout (use test mode)

## 📚 Key Features Explained

### Campaign Creation
Users define an Ideal Customer Profile (ICP) including:
- Industry
- Company size
- Target role
- Geography
- Messaging tone
- Campaign goal

### Lead Generation
The orchestrator runs all four agents sequentially:
- Processes leads in batches
- Tracks credits usage
- Logs all events
- Updates campaign status

### Credit Management
- Credits checked before campaign runs
- Usage tracked per organization
- Automatic reset on subscription renewal
- Upgrade prompts when low

## 🤝 Contributing

This is a portfolio project. Feel free to fork and extend:
- Add more AI providers
- Implement additional agents
- Add more enrichment sources
- Enhance analytics

## 📄 License

MIT License - feel free to use this as a portfolio project or starting point.

## 🐛 Troubleshooting

**Campaigns not running?**
- Check credits availability
- Verify OpenAI API key
- Check Supabase connection

**Stripe webhooks not working?**
- Verify webhook secret
- Check webhook URL in Stripe dashboard
- Review server logs

**Database errors?**
- Ensure migrations are run
- Check RLS policies
- Verify Supabase connection

## 📞 Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ using Next.js, Supabase, and Stripe
