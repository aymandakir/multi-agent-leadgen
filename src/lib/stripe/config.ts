import Stripe from 'stripe';

// Lazy initialization to avoid build-time errors
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not set. Please configure your Stripe environment variables.');
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: '2025-12-15.clover',
    });
  }
  return stripeInstance;
}

export const PLAN_CONFIGS = {
  starter: {
    priceId: process.env.STRIPE_STARTER_PRICE_ID || '',
    monthlyCredits: 500,
    name: 'Starter',
  },
  pro: {
    priceId: process.env.STRIPE_PRO_PRICE_ID || '',
    monthlyCredits: 2000,
    name: 'Pro',
  },
} as const;

