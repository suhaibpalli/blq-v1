"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { submitContactForm } from "./actions";
import { Button } from "@/components/ui/Button";
import { Check, Loader2 } from "lucide-react";

// Mirroring the schema from actions.ts for client-side validation
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget"),
  brief: z.string().min(10, "Please provide more details"),
});

type FormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const result = await submitContactForm(data);
      if (result.success) {
        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setErrorMsg(result.error || "An error occurred");
      }
    } catch (e) {
      setErrorMsg("Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 max-w-[1440px] mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 w-full max-w-[1200px] mx-auto">
        
        {/* Left Column: Info */}
        <div className="flex flex-col h-full">
          <RevealOnScroll>
            <h1 className="font-display font-bold text-[clamp(40px,6vw,80px)] leading-[1.1] mb-6">
              Let&apos;s build something <span className="text-accent-primary">extraordinary.</span>
            </h1>
            <p className="text-text-secondary text-lg mb-16 max-w-md">
              Tell us about your project. We&apos;ll respond within 24 hours to set up a discovery call.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="mt-auto">
            <div className="space-y-8 font-mono text-sm">
              <div>
                <span className="block text-text-muted tracking-widest uppercase text-xs mb-2">Email</span>
                <a href="mailto:hello@blackquantumlabs.io" className="text-text-primary hover:text-accent-primary transition-colors text-lg">
                  hello@blackquantumlabs.io
                </a>
              </div>
              <div>
                <span className="block text-text-muted tracking-widest uppercase text-xs mb-2">Location</span>
                <span className="text-text-primary text-lg">Chennai, India (Remote-first)</span>
              </div>
              <div>
                <span className="block text-text-muted tracking-widest uppercase text-xs mb-2">Hours</span>
                <span className="text-text-primary text-lg">Mon&ndash;Fri, 9AM&ndash;7PM IST</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Right Column: Form */}
        <div>
          <RevealOnScroll delay={0.2}>
            <div className="bg-bg-secondary border border-border rounded-2xl p-6 sm:p-10">
              {success ? (
                <div className="flex flex-col items-center justify-center text-center py-20 h-full">
                   <div className="w-16 h-16 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary mb-6">
                      <Check size={32} />
                   </div>
                   <h3 className="font-display font-bold text-3xl mb-4">Message Received.</h3>
                   <p className="text-text-secondary">We&apos;ll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
                  {errorMsg && (
                    <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg text-sm">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="text-xs uppercase tracking-widest text-text-secondary font-mono">Full Name *</label>
                       <input 
                         {...register("name")}
                         className="bg-bg-elevated border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                         placeholder="Jane Doe"
                       />
                       {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-xs uppercase tracking-widest text-text-secondary font-mono">Email Address *</label>
                       <input 
                         {...register("email")}
                         className="bg-bg-elevated border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                         placeholder="jane@example.com"
                       />
                       {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className="text-xs uppercase tracking-widest text-text-secondary font-mono">Company (Optional)</label>
                     <input 
                       {...register("company")}
                       className="bg-bg-elevated border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                       placeholder="Acme Corp"
                     />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="text-xs uppercase tracking-widest text-text-secondary font-mono">Service Needed *</label>
                       <select 
                         {...register("service")}
                         className="bg-bg-elevated border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors appearance-none"
                       >
                         <option value="">Select a service...</option>
                         <option value="Web Development">Web Development</option>
                         <option value="Mobile App">Mobile App</option>
                         <option value="AI Integration">AI Integration</option>
                         <option value="UI/UX Design">UI/UX Design</option>
                         <option value="Cloud/DevOps">Cloud / DevOps</option>
                         <option value="Consulting">Consulting</option>
                         <option value="Other">Other</option>
                       </select>
                       {errors.service && <span className="text-red-500 text-xs mt-1">{errors.service.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-xs uppercase tracking-widest text-text-secondary font-mono">Budget Range *</label>
                       <select 
                         {...register("budget")}
                         className="bg-bg-elevated border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors appearance-none"
                       >
                         <option value="">Select budget...</option>
                         <option value="<₹50K">&lt; ₹50K</option>
                         <option value="₹50K–₹1.5L">₹50K – ₹1.5L</option>
                         <option value="₹1.5L–₹5L">₹1.5L – ₹5L</option>
                         <option value="₹5L+">₹5L+</option>
                       </select>
                       {errors.budget && <span className="text-red-500 text-xs mt-1">{errors.budget.message}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className="text-xs uppercase tracking-widest text-text-secondary font-mono">Project Brief *</label>
                     <textarea 
                       {...register("brief")}
                       rows={5}
                       className="bg-bg-elevated border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors resize-none"
                       placeholder="Tell us about your goals, timeline, and any specific requirements..."
                     ></textarea>
                     {errors.brief && <span className="text-red-500 text-xs mt-1">{errors.brief.message}</span>}
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-full mt-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={20} /> Sending...</span>
                    ) : (
                      "Send Message \u2192"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </main>
  );
}
