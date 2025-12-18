'use client';

import { useState } from 'react';
import { Campaign, Lead, OutreachDraft } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CampaignDetailClientProps {
  campaign: Campaign;
  leads: Lead[];
  drafts: OutreachDraft[];
}

export default function CampaignDetailClient({ campaign, leads, drafts }: CampaignDetailClientProps) {
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');

  const handleRun = async () => {
    setRunning(true);
    setError('');

    try {
      const response = await fetch(`/api/campaigns/${campaign.id}/run`, {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to run campaign');
      }

      // Refresh page
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run campaign');
      setRunning(false);
    }
  };

  const getDraftForLead = (leadId: string) => {
    return drafts.find(d => d.lead_id === leadId);
  };

  return (
    <div className="space-y-6">
      {/* Campaign Info */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>ICP Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Industry:</span> {campaign.icp_config.industry}
            </div>
            <div>
              <span className="font-medium">Company Size:</span> {campaign.icp_config.companySize}
            </div>
            <div>
              <span className="font-medium">Role:</span> {campaign.icp_config.role}
            </div>
            <div>
              <span className="font-medium">Geography:</span> {campaign.icp_config.geography}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Messaging Tone:</span> {campaign.messaging_tone}
            </div>
            <div>
              <span className="font-medium">Goal:</span> {campaign.goal}
            </div>
            <div>
              <span className="font-medium">Status:</span>{' '}
              <span className={`px-2 py-1 rounded text-sm ${
                campaign.status === 'completed' ? 'bg-green-100 text-green-800' :
                campaign.status === 'running' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {campaign.status}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Run Campaign */}
      {campaign.status === 'draft' && (
        <Card>
          <CardContent className="py-6">
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200">
                {error}
              </div>
            )}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Ready to generate leads?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This will run the multi-agent pipeline to source, enrich, and generate outreach for leads.
                </p>
              </div>
              <Button onClick={handleRun} disabled={running}>
                {running ? 'Running...' : 'Run Campaign'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leads ({leads.length})</CardTitle>
          <CardDescription>Generated leads with outreach drafts</CardDescription>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <div className="py-8 text-center text-gray-600 dark:text-gray-400">
              No leads generated yet. Run the campaign to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {leads.map((lead) => {
                const draft = getDraftForLead(lead.id);
                return (
                  <div key={lead.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{lead.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {lead.role} at {lead.company_name}
                        </p>
                        <div className="mt-2 flex gap-4 text-xs text-gray-500">
                          {lead.email && <span>📧 {lead.email}</span>}
                          {lead.linkedin_url && (
                            <a href={lead.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              🔗 LinkedIn
                            </a>
                          )}
                          {lead.location && <span>📍 {lead.location}</span>}
                        </div>
                      </div>
                      {lead.score !== null && (
                        <div className="text-right">
                          <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                          <div className="text-xl font-bold">{lead.score.toFixed(0)}</div>
                        </div>
                      )}
                    </div>

                    {draft && (
                      <div className="border-t pt-3 space-y-2">
                        <div className="text-sm font-medium">Outreach Draft</div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 space-y-2">
                          <div>
                            <span className="font-medium">Subject:</span> {draft.subject}
                          </div>
                          <div>
                            <span className="font-medium">Body:</span>
                            <div className="mt-1 whitespace-pre-wrap text-sm">{draft.body}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

