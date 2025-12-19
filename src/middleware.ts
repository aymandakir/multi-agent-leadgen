import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { ORG_ID } from '@/lib/org-context';

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  
  // Set organization ID in headers and cookies for RLS
  if (response instanceof NextResponse) {
    response.headers.set('x-org-id', ORG_ID);
    response.cookies.set('org_id', ORG_ID, { path: '/', httpOnly: false });
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

