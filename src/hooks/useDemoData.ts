'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ORG_ID } from '@/lib/org-context';
import { Lead } from '@/lib/types';

interface DemoStats {
  totalLeads: number;
  outreachSent: number;
  conversionRate: number;
  avgScore: number;
}

const defaultStats: DemoStats = {
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
          .limit(20);

        if (error) {
          console.error('Error fetching leads:', error);
          // Use demo data if fetch fails
          setLeads(getDemoLeads());
        } else {
          setLeads(data || getDemoLeads());
        }
      } catch (error) {
        console.error('Error:', error);
        setLeads(getDemoLeads());
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchLeads, 30000);
    return () => clearInterval(interval);
  }, []);

  return { leads, loading };
}

export function useLiveStats() {
  const [stats, setStats] = useState<DemoStats>(defaultStats);

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
    const interval = setInterval(fetchStats, 3000);
    return () => clearInterval(interval);
  }, []);

  return { stats };
}

function getDemoLeads(): Lead[] {
  return [
    {
      id: '1',
      campaign_id: 'demo-1',
      company_name: 'Acme Corp',
      company_size: '50-200',
      industry: 'Technology',
      role: 'VP of Engineering',
      name: 'Sarah Johnson',
      email: 'sarah@acme.com',
      linkedin_url: 'https://linkedin.com/in/sarahjohnson',
      location: 'San Francisco, CA',
      enriched_data: {},
      score: 92,
      status: 'qualified',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      campaign_id: 'demo-1',
      company_name: 'Tech Startup',
      company_size: '10-50',
      industry: 'SaaS',
      role: 'CTO',
      name: 'Michael Chen',
      email: 'michael@techstartup.com',
      linkedin_url: 'https://linkedin.com/in/michaelchen',
      location: 'New York, NY',
      enriched_data: {},
      score: 87,
      status: 'contacted',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      campaign_id: 'demo-1',
      company_name: 'Innovation Labs',
      company_size: '200-500',
      industry: 'AI/ML',
      role: 'Head of Product',
      name: 'Emily Rodriguez',
      email: 'emily@innovationlabs.com',
      linkedin_url: 'https://linkedin.com/in/emilyrodriguez',
      location: 'Austin, TX',
      enriched_data: {},
      score: 89,
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
}

