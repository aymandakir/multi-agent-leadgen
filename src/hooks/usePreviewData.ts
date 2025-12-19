'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ORG_ID } from '@/lib/org-context';
import { Lead } from '@/lib/types';

interface PreviewStats {
  totalLeads: number;
  outreachSent: number;
  conversionRate: number;
  avgScore: number;
}

const defaultStats: PreviewStats = {
  totalLeads: 247,
  outreachSent: 198,
  conversionRate: 23.4,
  avgScore: 84.2,
};

export function useDemoLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .eq('organization_id', ORG_ID)
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) {
          console.error('Error fetching leads:', error);
          setLeads(getDemoLeads());
        } else {
          setLeads(data && data.length > 0 ? data : getDemoLeads());
        }
      } catch (error) {
        console.error('Error:', error);
        setLeads(getDemoLeads());
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
    const interval = setInterval(fetchLeads, 30000);
    return () => clearInterval(interval);
  }, []);

  return { leads, loading };
}

export function useLiveStats() {
  const [stats, setStats] = useState<PreviewStats>(defaultStats);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = createClient();
        const { data: leads } = await supabase
          .from('leads')
          .select('score, status')
          .eq('organization_id', ORG_ID);

        if (leads && leads.length > 0) {
          const totalLeads = leads.length;
          const outreachSent = leads.filter(l => l.status === 'contacted' || l.status === 'responded').length;
          const conversionRate = totalLeads > 0 ? (outreachSent / totalLeads) * 100 : 0;
          const scores = leads.filter(l => l.score !== null).map(l => l.score as number);
          const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

          setStats({
            totalLeads,
            outreachSent,
            conversionRate: Math.round(conversionRate * 10) / 10,
            avgScore: Math.round(avgScore * 10) / 10,
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return { stats };
}

function getDemoLeads(): Lead[] {
  const companies = [
    'Acme Corp', 'Tech Startup', 'Innovation Labs', 'Digital Solutions', 'Cloud Systems',
    'Data Analytics', 'AI Ventures', 'Future Tech', 'Smart Solutions', 'NextGen Inc',
  ];
  const names = [
    'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim', 'Jessica Martinez',
    'Ryan Thompson', 'Amanda Wilson', 'James Brown', 'Lisa Anderson', 'Robert Taylor',
  ];
  const roles = ['VP of Engineering', 'CTO', 'Head of Product', 'VP of Sales', 'Director of Marketing'];
  const locations = ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Boston, MA'];
  const statuses: Array<'new' | 'contacted' | 'responded' | 'qualified'> = ['new', 'contacted', 'responded', 'qualified'];

  return Array.from({ length: 20 }, (_, i) => ({
    id: `demo-${i + 1}`,
    campaign_id: 'demo-campaign',
    company_name: companies[i % companies.length],
    company_size: '50-200',
    industry: 'Technology',
    role: roles[i % roles.length],
    name: names[i % names.length],
    email: `${names[i % names.length].toLowerCase().replace(/\s+/g, '.')}@${companies[i % companies.length].toLowerCase().replace(/\s+/g, '')}.com`,
    linkedin_url: `https://linkedin.com/in/${names[i % names.length].toLowerCase().replace(/\s+/g, '-')}`,
    location: locations[i % locations.length],
    enriched_data: {},
    score: Math.floor(Math.random() * 20) + 75,
    status: statuses[i % statuses.length],
    created_at: new Date(Date.now() - i * 86400000).toISOString(),
    updated_at: new Date(Date.now() - i * 86400000).toISOString(),
  }));
}

