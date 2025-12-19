import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getStripe, PLAN_CONFIGS } from '@/lib/stripe/config';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = await createClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const organizationId = session.metadata?.organization_id;
        const plan = session.metadata?.plan as 'starter' | 'pro';

        if (!organizationId || !plan) {
          console.error('Missing metadata in checkout session');
          break;
        }

        const planConfig = PLAN_CONFIGS[plan];
        const resetDate = new Date();
        resetDate.setMonth(resetDate.getMonth() + 1);

        // Update subscription
        await supabase
          .from('subscriptions')
          .update({
            stripe_subscription_id: session.subscription as string,
            stripe_customer_id: session.customer as string,
            plan,
            status: 'active',
            monthly_credits: planConfig.monthlyCredits,
            credits_used: 0,
            credits_reset_at: resetDate.toISOString(),
          })
          .eq('organization_id', organizationId);

        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Find organization by customer ID
        const { data: sub } = await supabase
          .from('subscriptions')
          .select('organization_id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (!sub) {
          console.error('Subscription not found for customer:', customerId);
          break;
        }

        const status = subscription.status === 'active' ? 'active' :
                      subscription.status === 'canceled' ? 'canceled' :
                      subscription.status === 'past_due' ? 'past_due' :
                      'trialing';

        await supabase
          .from('subscriptions')
          .update({
            status,
            stripe_subscription_id: subscription.id,
          })
          .eq('organization_id', sub.organization_id);

        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Reset credits on successful payment
        const { data: sub } = await supabase
          .from('subscriptions')
          .select('organization_id, plan')
          .eq('stripe_customer_id', customerId)
          .single();

        if (sub) {
          const planConfig = PLAN_CONFIGS[sub.plan as keyof typeof PLAN_CONFIGS];
          const resetDate = new Date();
          resetDate.setMonth(resetDate.getMonth() + 1);

          await supabase
            .from('subscriptions')
            .update({
              credits_used: 0,
              credits_reset_at: resetDate.toISOString(),
            })
            .eq('organization_id', sub.organization_id);
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

