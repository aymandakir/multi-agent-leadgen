export const ORG_ID = process.env.SUPABASE_ORG_ID || 'leadgen-demo';

export const withOrgFilter = <T extends { eq: (column: string, value: string) => any }>(
  query: T
): T => {
  return query.eq('organization_id', ORG_ID) as T;
};

