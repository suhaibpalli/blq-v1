"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { submitContactForm } from "./actions";
import { Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const schema = z.object({
  name:    z.string().min(2, "Name is required"),
  email:   z.string().email("Valid email required"),
  company: z.string().optional(),
  service: z.string().min(1, "Select a service"),
  budget:  z.string().min(1, "Select a budget"),
  brief:   z.string().min(10, "Please tell us more"),
});

type FormValues = z.infer<typeof schema>;

const inputClass = cn(
  "w-full px-5 py-4 rounded-xl text-sm outline-none transition-all duration-300",
  "bg-(--color-surface) border border-(--color-border)",
  "text-(--color-ink) placeholder:text-(--color-ink-3)",
  "focus:border-(--color-cyan) focus:bg-(--color-bg-3)"
);

const labelClass = "block text-[11px] tracking-[0.18em] uppercase mb-3 font-medium";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success,    setSuccess]    = useState(false);
  const [error,      setError]      = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    setError("");
    try {
      const result = await submitContactForm(data);
      if (result.success) {
        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 6000);
      } else {
        setError(result.error || "Something went wrong");
      }
    } catch {
      setError("Failed to send. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ paddingTop: "120px" }}>
      <div className="px-6 md:px-10 max-w-[1440px] mx-auto pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40">
          
          {/* Left */}
          <div className="flex flex-col">
            <RevealOnScroll variant="fade-up">
              <p className="text-[11px] tracking-[0.22em] uppercase mb-8 font-medium" style={{ color: "var(--color-ink-3)" }}>
                Get In Touch
              </p>
              <h1
                className="font-display font-black leading-[0.93] tracking-[-0.04em] mb-10"
                style={{ fontSize: "clamp(48px,7vw,96px)", color: "var(--color-ink)" }}
              >
                Let&apos;s build
                <br />
                something
                <br />
                <span style={{ color: "var(--color-cyan)" }}>extraordinary.</span>
              </h1>
              <p className="text-lg leading-relaxed mb-16 max-w-md" style={{ color: "var(--color-ink-2)" }}>
                Tell us about your project. We respond within 24 hours and set up a no-pressure discovery call.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15} variant="fade-up" className="mt-auto">
              <div className="space-y-8">
                {[
                  { label: "Email",    value: "hello@blackquantumlabs.io", href: "mailto:hello@blackquantumlabs.io" },
                  { label: "Location", value: "Chennai, India (Remote-first)" },
                  { label: "Hours",    value: "Mon–Fri, 9AM–7PM IST" },
                ].map(({ label, value, href }) => (
                  <div key={label}>
                    <p className="text-[11px] tracking-[0.18em] uppercase mb-2 font-medium" style={{ color: "var(--color-ink-3)" }}>
                      {label}
                    </p>
                    {href ? (
                      <a href={href} className="text-base hover-line transition-colors" style={{ color: "var(--color-cyan)" }}>
                        {value}
                      </a>
                    ) : (
                      <p className="text-base" style={{ color: "var(--color-ink-2)" }}>{value}</p>
                    )}
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          {/* Right — Form */}
          <RevealOnScroll delay={0.2} variant="fade-up">
            <div
              className="rounded-2xl p-8 md:p-12 border"
              style={{ background: "var(--color-bg-2)", borderColor: "var(--color-border)" }}
            >
              {success ? (
                <div className="flex flex-col items-center justify-center text-center h-full min-h-[480px]">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6, bounce: 0.4 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
                    style={{ background: "var(--color-cyan-dim)", border: "1px solid var(--color-cyan-glow)" }}
                  >
                    <Check size={32} style={{ color: "var(--color-cyan)" }} />
                  </motion.div>
                  <h3 className="font-display font-black text-3xl mb-4" style={{ color: "var(--color-ink)" }}>
                    Message Received.
                  </h3>
                  <p style={{ color: "var(--color-ink-2)" }}>
                    We&apos;ll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {error && (
                    <div
                      className="p-4 rounded-xl text-sm border"
                      style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.3)", color: "#f87171" }}
                    >
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass} style={{ color: "var(--color-ink-3)" }}>Full Name *</label>
                      <input {...register("name")} className={inputClass} placeholder="Jane Doe" />
                      {errors.name && <p className="text-xs mt-2" style={{ color: "#f87171" }}>{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className={labelClass} style={{ color: "var(--color-ink-3)" }}>Email *</label>
                      <input {...register("email")} className={inputClass} placeholder="jane@company.com" />
                      {errors.email && <p className="text-xs mt-2" style={{ color: "#f87171" }}>{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} style={{ color: "var(--color-ink-3)" }}>Company (Optional)</label>
                    <input {...register("company")} className={inputClass} placeholder="Acme Corp" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass} style={{ color: "var(--color-ink-3)" }}>Service *</label>
                      <select {...register("service")} className={inputClass}>
                        <option value="">Select a service…</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="AI Integration">AI Integration</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Cloud / DevOps">Cloud / DevOps</option>
                        <option value="Consulting">Consulting</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.service && <p className="text-xs mt-2" style={{ color: "#f87171" }}>{errors.service.message}</p>}
                    </div>
                    <div>
                      <label className={labelClass} style={{ color: "var(--color-ink-3)" }}>Budget *</label>
                      <select {...register("budget")} className={inputClass}>
                        <option value="">Select budget…</option>
                        <option value="<₹50K">&lt; ₹50K</option>
                        <option value="₹50K–₹1.5L">₹50K – ₹1.5L</option>
                        <option value="₹1.5L–₹5L">₹1.5L – ₹5L</option>
                        <option value="₹5L+">₹5L+</option>
                      </select>
                      {errors.budget && <p className="text-xs mt-2" style={{ color: "#f87171" }}>{errors.budget.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} style={{ color: "var(--color-ink-3)" }}>Project Brief *</label>
                    <textarea
                      {...register("brief")}
                      rows={5}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us about your goals, timeline, and anything else that&#39;s important…"
                    />
                    {errors.brief && <p className="text-xs mt-2" style={{ color: "#f87171" }}>{errors.brief.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-14 rounded-full font-bold text-sm tracking-wide flex items-center justify-center gap-3 disabled:opacity-50"
                    style={{ background: "var(--color-cyan)", color: "#03030A" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {submitting ? (
                      <><Loader2 className="animate-spin" size={18} /> Sending…</>
                    ) : (
                      <>Send Message →</>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </main>
  );
}
