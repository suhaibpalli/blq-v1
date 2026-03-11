"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  brief: z.string().min(10, "Project brief must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function submitContactForm(data: ContactFormData) {
  try {
    const validatedData = contactSchema.parse(data);

    // In a real application, you'd have a valid RESEND_API_KEY
    if (!process.env.RESEND_API_KEY) {
      console.log("No Resend API Key found. Simulating successful send with data:", validatedData);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true };
    }

    await resend.emails.send({
      from: "Black Quantum Labs <hello@blackquantumlabs.io>", // Must be a verified domain
      to: ["hello@blackquantumlabs.io"],
      subject: `New Project Inquiry from ${validatedData.name}`,
      text: `
Name: ${validatedData.name}
Email: ${validatedData.email}
Company: ${validatedData.company || 'N/A'}
Service: ${validatedData.service}
Budget: ${validatedData.budget}

Project Brief:
${validatedData.brief}
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Failed to send message. Please try again later." };
  }
}
