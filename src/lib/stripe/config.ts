import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

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

