"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  brief: z.string().min(10, "Project brief must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Nodemailer transporter using SMTP from .env
const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false },
});

export async function submitContactForm(data: ContactFormData) {
  try {
    const validatedData = contactSchema.parse(data);

    // Verify transporter configuration
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      console.log("SMTP configuration missing. Simulating successful send with data:", validatedData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true };
    }

    await mailer.sendMail({
      from: `"BQL Lead" <${process.env.SMTP_USER}>`,
      to: ["admin@suhaiblabs.info", "testsuhaib.palli@gmail.com"],
      replyTo: validatedData.email,
      subject: `New Lead: ${validatedData.name} — ${validatedData.service}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #00E8FF;">New Project Inquiry</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Company:</strong> ${validatedData.company || 'N/A'}</p>
          <p><strong>Service:</strong> ${validatedData.service}</p>
          <p><strong>Budget:</strong> ${validatedData.budget}</p>
          <hr />
          <h3>Project Brief:</h3>
          <p style="white-space: pre-wrap;">${validatedData.brief}</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Failed to send message. Please try again later." };
  }
}
