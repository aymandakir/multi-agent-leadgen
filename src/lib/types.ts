import { z } from 'zod';

// Organization Types
export const OrganizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Organization = z.infer<typeof OrganizationSchema>;

// Member Types
export const MemberRoleSchema = z.enum(['owner', 'admin', 'member']);
export type MemberRole = z.infer<typeof MemberRoleSchema>;

export const MemberSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  organization_id: z.string().uuid(),
  role: MemberRoleSchema,
  created_at: z.string(),
});

export type Member = z.infer<typeof MemberSchema>;

// Subscription Types
export const SubscriptionPlanSchema = z.enum(['starter', 'pro']);
export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;

export const SubscriptionStatusSchema = z.enum(['active', 'canceled', 'past_due', 'trialing']);
export type SubscriptionStatus = z.infer<typeof SubscriptionStatusSchema>;

export const SubscriptionSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  stripe_subscription_id: z.string().nullable(),
  stripe_customer_id: z.string(),
  plan: SubscriptionPlanSchema,
  status: SubscriptionStatusSchema,
  monthly_credits: z.number().int(),
  credits_used: z.number().int(),
  credits_reset_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;

// ICP Config Types
export const ICPConfigSchema = z.object({
  industry: z.string(),
  companySize: z.string(),
  role: z.string(),
  geography: z.string(),
});

export type ICPConfig = z.infer<typeof ICPConfigSchema>;

// Campaign Types
export const CampaignStatusSchema = z.enum(['draft', 'running', 'completed', 'paused']);
export type CampaignStatus = z.infer<typeof CampaignStatusSchema>;

export const CampaignSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string(),
  icp_config: ICPConfigSchema,
  messaging_tone: z.string(),
  goal: z.string(),
  status: CampaignStatusSchema,
  created_by: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Campaign = z.infer<typeof CampaignSchema>;

export const CreateCampaignSchema = z.object({
  name: z.string().min(1),
  icp_config: ICPConfigSchema,
  messaging_tone: z.string().min(1),
  goal: z.string().min(1),
});

export type CreateCampaign = z.infer<typeof CreateCampaignSchema>;

// Lead Types
export const LeadStatusSchema = z.enum(['new', 'contacted', 'responded', 'qualified', 'rejected']);
export type LeadStatus = z.infer<typeof LeadStatusSchema>;

export const LeadSchema = z.object({
  id: z.string().uuid(),
  campaign_id: z.string().uuid(),
  company_name: z.string(),
  company_size: z.string().nullable(),
  industry: z.string().nullable(),
  role: z.string(),
  name: z.string(),
  email: z.string().nullable(),
  linkedin_url: z.string().nullable(),
  location: z.string().nullable(),
  enriched_data: z.record(z.string(), z.unknown()).nullable(),
  score: z.number().nullable(),
  status: LeadStatusSchema,
  created_at: z.string(),
  updated_at: z.string(),
});

export type Lead = z.infer<typeof LeadSchema>;

// Lead Event Types
export const LeadEventTypeSchema = z.enum(['sourced', 'enriched', 'outreach_generated', 'analyzed', 'status_changed']);
export type LeadEventType = z.infer<typeof LeadEventTypeSchema>;

export const LeadEventSchema = z.object({
  id: z.string().uuid(),
  lead_id: z.string().uuid(),
  event_type: LeadEventTypeSchema,
  metadata: z.record(z.string(), z.unknown()).nullable(),
  created_at: z.string(),
});

export type LeadEvent = z.infer<typeof LeadEventSchema>;

// Outreach Draft Types
export const OutreachDraftSchema = z.object({
  id: z.string().uuid(),
  lead_id: z.string().uuid(),
  subject: z.string(),
  body: z.string(),
  variant: z.string(),
  score: z.number().nullable(),
  created_at: z.string(),
});

export type OutreachDraft = z.infer<typeof OutreachDraftSchema>;

// Campaign Run Types
export const CampaignRunStatusSchema = z.enum(['running', 'completed', 'failed']);
export type CampaignRunStatus = z.infer<typeof CampaignRunStatusSchema>;

export const CampaignRunSchema = z.object({
  id: z.string().uuid(),
  campaign_id: z.string().uuid(),
  status: CampaignRunStatusSchema,
  leads_generated: z.number().int(),
  credits_used: z.number().int(),
  error_message: z.string().nullable(),
  started_at: z.string(),
  completed_at: z.string().nullable(),
});

export type CampaignRun = z.infer<typeof CampaignRunSchema>;

