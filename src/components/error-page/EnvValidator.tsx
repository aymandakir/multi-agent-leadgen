'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const envSchema = z.object({
  supabaseUrl: z.string().url('Must be a valid URL'),
  supabaseKey: z.string().min(1, 'Required'),
});

type EnvFormData = z.infer<typeof envSchema>;

export default function EnvValidator() {
  const [validationStatus, setValidationStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [progress, setProgress] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EnvFormData>({
    resolver: zodResolver(envSchema),
  });

  const supabaseUrl = watch('supabaseUrl');
  const supabaseKey = watch('supabaseKey');

  // Real-time validation
  useEffect(() => {
    if (supabaseUrl && supabaseKey) {
      const urlPattern = /^https?:\/\/.+/;
      if (urlPattern.test(supabaseUrl) && supabaseKey.length > 20) {
        setValidationStatus('validating');
        // Simulate validation
        setTimeout(() => {
          setValidationStatus('valid');
          setProgress(100);
        }, 1500);
      } else {
        setValidationStatus('invalid');
        setProgress(0);
      }
    } else {
      setValidationStatus('idle');
      setProgress(0);
    }
  }, [supabaseUrl, supabaseKey]);

  const onSubmit = (data: EnvFormData) => {
    console.log('Environment variables:', data);
    // In a real app, you'd save these or validate with Supabase
  };

  return (
    <section className="px-4 py-16">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="backdrop-blur-[40px] bg-white/90 dark:bg-white/5 border-white/20 dark:border-white/10 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl">Live Validation</CardTitle>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Enter your Supabase credentials to validate
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Status Orb */}
              <div className="flex items-center justify-center mb-8">
                <motion.div
                  className="relative w-24 h-24 rounded-full flex items-center justify-center"
                  animate={{
                    scale: validationStatus === 'validating' ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ repeat: validationStatus === 'validating' ? Infinity : 0, duration: 1 }}
                >
                  {/* Progress Ring */}
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-gray-200 dark:text-gray-800"
                    />
                    <motion.circle
                      cx="48"
                      cy="48"
                      r="44"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: progress / 100 }}
                      transition={{ duration: 0.5 }}
                      className={
                        validationStatus === 'valid'
                          ? 'text-emerald-500 dark:text-teal-400'
                          : validationStatus === 'invalid'
                          ? 'text-red-500'
                          : 'text-indigo-500 dark:text-purple-500'
                      }
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {validationStatus === 'validating' && (
                      <Loader2 className="w-8 h-8 text-indigo-500 dark:text-purple-500 animate-spin" />
                    )}
                    {validationStatus === 'valid' && (
                      <CheckCircle2 className="w-10 h-10 text-emerald-500 dark:text-teal-400" />
                    )}
                    {validationStatus === 'invalid' && (
                      <XCircle className="w-10 h-10 text-red-500" />
                    )}
                    {validationStatus === 'idle' && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700" />
                    )}
                  </div>
                </motion.div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Supabase URL
                  </label>
                  <Input
                    {...register('supabaseUrl')}
                    placeholder="https://your-project.supabase.co"
                    className="w-full"
                  />
                  {errors.supabaseUrl && (
                    <p className="text-red-500 text-sm mt-1">{errors.supabaseUrl.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Supabase Anon Key
                  </label>
                  <Input
                    {...register('supabaseKey')}
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full"
                  />
                  {errors.supabaseKey && (
                    <p className="text-red-500 text-sm mt-1">{errors.supabaseKey.message}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 dark:bg-purple-600 hover:bg-indigo-700 dark:hover:bg-purple-700"
                disabled={validationStatus === 'validating'}
              >
                {validationStatus === 'validating' ? 'Validating...' : 'Validate & Save'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}

