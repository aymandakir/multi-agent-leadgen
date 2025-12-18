-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizations (workspaces)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Members (user-organization relationships)
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, organization_id)
);

-- Subscriptions (Stripe integration)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('starter', 'pro')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  monthly_credits INTEGER NOT NULL DEFAULT 0,
  credits_used INTEGER NOT NULL DEFAULT 0,
  credits_reset_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id)
);

-- Campaigns
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icp_config JSONB NOT NULL, -- { industry, companySize, role, geography }
  messaging_tone TEXT NOT NULL,
  goal TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'running', 'completed', 'paused')),
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  company_size TEXT,
  industry TEXT,
  role TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  linkedin_url TEXT,
  location TEXT,
  enriched_data JSONB, -- Additional enrichment data
  score DECIMAL(5,2),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'responded', 'qualified', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead Events (tracking enrichment, outreach generation, etc.)
CREATE TABLE lead_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('sourced', 'enriched', 'outreach_generated', 'analyzed', 'status_changed')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Outreach Drafts
CREATE TABLE outreach_drafts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  variant TEXT DEFAULT 'default',
  score DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Campaign Runs (tracks execution of agent pipeline)
CREATE TABLE campaign_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed')),
  leads_generated INTEGER DEFAULT 0,
  credits_used INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Indexes for performance
CREATE INDEX idx_members_user_id ON members(user_id);
CREATE INDEX idx_members_organization_id ON members(organization_id);
CREATE INDEX idx_campaigns_organization_id ON campaigns(organization_id);
CREATE INDEX idx_leads_campaign_id ON leads(campaign_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_lead_events_lead_id ON lead_events(lead_id);
CREATE INDEX idx_outreach_drafts_lead_id ON outreach_drafts(lead_id);
CREATE INDEX idx_campaign_runs_campaign_id ON campaign_runs(campaign_id);
CREATE INDEX idx_subscriptions_organization_id ON subscriptions(organization_id);
CREATE INDEX idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);

-- Row Level Security Policies

-- Organizations: users can only see organizations they're members of
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view organizations they belong to"
  ON organizations FOR SELECT
  USING (
    id IN (
      SELECT organization_id FROM members WHERE user_id = auth.uid()
    )
  );

-- Members: users can view members of their organizations
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view members of their organizations"
  ON members FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM members WHERE user_id = auth.uid()
    )
  );

-- Subscriptions: users can view subscriptions for their organizations
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view subscriptions for their organizations"
  ON subscriptions FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM members WHERE user_id = auth.uid()
    )
  );

-- Campaigns: users can view campaigns in their organizations
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view campaigns in their organizations"
  ON campaigns FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create campaigns in their organizations"
  ON campaigns FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update campaigns in their organizations"
  ON campaigns FOR UPDATE
  USING (
    organization_id IN (
      SELECT organization_id FROM members WHERE user_id = auth.uid()
    )
  );

-- Leads: users can view leads from campaigns in their organizations
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view leads from their organization campaigns"
  ON leads FOR SELECT
  USING (
    campaign_id IN (
      SELECT id FROM campaigns WHERE organization_id IN (
        SELECT organization_id FROM members WHERE user_id = auth.uid()
      )
    )
  );

-- Lead Events: users can view events for leads they can access
ALTER TABLE lead_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view lead events for accessible leads"
  ON lead_events FOR SELECT
  USING (
    lead_id IN (
      SELECT id FROM leads WHERE campaign_id IN (
        SELECT id FROM campaigns WHERE organization_id IN (
          SELECT organization_id FROM members WHERE user_id = auth.uid()
        )
      )
    )
  );

-- Outreach Drafts: users can view drafts for leads they can access
ALTER TABLE outreach_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view outreach drafts for accessible leads"
  ON outreach_drafts FOR SELECT
  USING (
    lead_id IN (
      SELECT id FROM leads WHERE campaign_id IN (
        SELECT id FROM campaigns WHERE organization_id IN (
          SELECT organization_id FROM members WHERE user_id = auth.uid()
        )
      )
    )
  );

-- Campaign Runs: users can view runs for campaigns they can access
ALTER TABLE campaign_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view campaign runs for accessible campaigns"
  ON campaign_runs FOR SELECT
  USING (
    campaign_id IN (
      SELECT id FROM campaigns WHERE organization_id IN (
        SELECT organization_id FROM members WHERE user_id = auth.uid()
      )
    )
  );

-- Functions and Triggers

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

