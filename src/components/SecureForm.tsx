import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { validateEmail, sanitizeFormData, rateLimiter } from '@/utils/security';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
  email: z.string()
    .min(1, 'Email is required')
    .refine(validateEmail, 'Please enter a valid email address'),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface SecureFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  isLoading?: boolean;
}

export const SecureForm: React.FC<SecureFormProps> = ({ onSubmit, isLoading = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const handleSubmit = useCallback(async (data: ContactFormData) => {
    // Rate limiting check
    const clientId = `${data.email}-${Date.now()}`;
    if (!rateLimiter.isAllowed(clientId, 3, 300000)) { // 3 attempts per 5 minutes
      toast({
        title: "Too many attempts",
        description: "Please wait before submitting again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Sanitize form data
      const sanitizedData = sanitizeFormData(data) as ContactFormData;
      
      // Add honeypot check (hidden field)
      const honeypot = (document.querySelector('input[name="website"]') as HTMLInputElement)?.value;
      if (honeypot) {
        console.warn('Bot detected - honeypot field filled');
        return;
      }
      
      await onSubmit(sanitizedData);
      
      form.reset();
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
    } catch {
      // Don't log error details to console in production
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [onSubmit, toast, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Honeypot field - hidden from users but visible to bots */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        />
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Your full name"
                  autoComplete="name"
                  maxLength={50}
                  disabled={isSubmitting || isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="your.email@example.com"
                  autoComplete="email"
                  disabled={isSubmitting || isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Brief description of your inquiry"
                  maxLength={100}
                  disabled={isSubmitting || isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Your message..."
                  className="min-h-32"
                  maxLength={1000}
                  disabled={isSubmitting || isLoading}
                />
              </FormControl>
              <FormMessage />
              <div className="text-sm text-muted-foreground text-right">
                {field.value?.length || 0}/1000
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full btn-enhanced"
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          This form is protected against spam and automated submissions.
        </p>
      </form>
    </Form>
  );
};