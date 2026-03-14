import { createGroq } from "@ai-sdk/groq";
import { streamText, tool, stepCountIs, convertToModelMessages } from "ai";
import { z } from "zod";
import nodemailer from "nodemailer";

// ─── Groq client ────────────────────────────────────────────────────────────
const groq = createGroq({ apiKey: process.env.GROQ_API_KEY! });

// ─── Nodemailer transporter ──────────────────────────────────────────────────
const mailer = nodemailer.createTransport({
  host:   process.env.SMTP_HOST!,
  port:   Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
  tls: { rejectUnauthorized: false }, // required for most custom mail servers
});

// ─── System prompt ───────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `
You are Qbot — the AI assistant for Black Quantum Labs, a premium digital engineering studio based in Chennai, India.

## About Black Quantum Labs
- Full-spectrum digital studio: design + engineering under one roof
- Works with founders, startups, and companies globally (remote-first)
- Email: hello@blackquantumlabs.io | Phone: +91 9150448003
- Response time: within 24 hours

## Services & Pricing
1. Web Engineering      — Full-stack web apps, SaaS, marketing sites. ₹50K–₹5L+
2. Mobile Development   — iOS & Android with React Native/Expo. ₹1.5L–₹5L+
3. AI & Automation      — LLM integrations, agents, RAG pipelines. ₹1L–₹5L+
4. Cloud & DevOps       — AWS/GCP, CI/CD, infrastructure. ₹75K–₹3L
5. UI/UX Design         — Research-led design systems & Figma. ₹50K–₹2L
6. Tech Consulting      — Architecture reviews, CTO advisory. ₹25K/session+

## Pricing Tiers (rough guidance)
- Starter (₹50K–80K): Landing pages, MVPs
- Growth (₹1.5L–3L): Full web/mobile products
- Enterprise (₹5L+): End-to-end with ongoing support

## Process
Discovery → Architecture → Build (1-week sprints) → Launch & Scale

## Your Behaviour
- Be warm, direct, and genuinely helpful — not salesy
- Keep responses concise (2–4 sentences max unless explaining something complex)
- If someone asks about pricing, give ballpark ranges and suggest a discovery call
- If someone is interested in starting a project, naturally collect:
  1. Their name
  2. Their email address
  3. Which service they need
  4. A brief description of their project
  5. Budget range (optional)
- Once you have name + email + service + brief, IMMEDIATELY call the captureLeadAndNotify tool
- After the tool succeeds, confirm: "Perfect — I've sent your details to the team. Expect a reply within 24 hours!"
- Do NOT ask for all details in one message — collect them conversationally, 1–2 at a time
- Never make up facts about the studio or projects not listed above
`.trim();

// ─── POST handler ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5), // allows: user turn → tool call → tool result → final reply
    tools: {
      captureLeadAndNotify: tool({
        description:
          "Capture a potential client's project details and notify the Black Quantum Labs team via email. " +
          "Call this tool once you have collected name, email, service interest, and project brief. " +
          "Do not call it before you have at least name, email, service, and brief.",
        inputSchema: z.object({
          name:    z.string().describe("Full name of the potential client"),
          email:   z.string().describe("Email address"),
          service: z.string().describe("Service they are interested in (e.g. Web Engineering, Mobile App, AI & Automation)"),
          brief:   z.string().describe("Project description or requirements (their own words)"),
          budget:  z.string().optional().describe("Budget range if mentioned (e.g. ₹1.5L–3L)"),
          phone:   z.string().optional().describe("Phone number if voluntarily provided"),
        }),
        execute: async ({ name, email, service, brief, budget, phone }) => {
          try {
            await mailer.sendMail({
              from:    `"BQL Qbot" <${process.env.SMTP_USER}>`,
              to:      ["admin@suhaiblabs.info", "testsuhaib.palli@gmail.com"],
              replyTo: email,
              subject: `🤖 New Lead via Qbot: ${name} — ${service}`,
              html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Lead</title></head>
<body style="margin:0;padding:0;background:#03030A;font-family:'Courier New',monospace;">
  <div style="max-width:600px;margin:40px auto;background:#07070F;border:1px solid rgba(255,255,255,0.1);border-radius:16px;overflow:hidden;">
    
    <!-- Header -->
    <div style="background:#0D0D1A;padding:32px;border-bottom:1px solid rgba(255,255,255,0.07);">
      <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#55556A;">Black Quantum Labs</p>
      <h1 style="margin:0;font-size:22px;color:#00E8FF;letter-spacing:-0.02em;">New Project Inquiry</h1>
      <p style="margin:8px 0 0;font-size:12px;color:#55556A;">Captured via Qbot AI Assistant</p>
    </div>

    <!-- Details -->
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:#55556A;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;width:100px;vertical-align:top;">Name</td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid rgba(255,255,255,0.05);color:#EEEEFF;font-size:15px;">${name}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:#55556A;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;vertical-align:top;">Email</td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid rgba(255,255,255,0.05);vertical-align:top;">
            <a href="mailto:${email}" style="color:#00E8FF;text-decoration:none;font-size:15px;">${email}</a>
          </td>
        </tr>
        ${phone ? `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:#55556A;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;vertical-align:top;">Phone</td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid rgba(255,255,255,0.05);color:#EEEEFF;font-size:15px;">${phone}</td>
        </tr>` : ""}
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:#55556A;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;vertical-align:top;">Service</td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid rgba(255,255,255,0.05);color:#00E8FF;font-size:15px;font-weight:bold;">${service}</td>
        </tr>
        ${budget ? `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:#55556A;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;vertical-align:top;">Budget</td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid rgba(255,255,255,0.05);color:#EEEEFF;font-size:15px;">${budget}</td>
        </tr>` : ""}
      </table>

      <!-- Brief -->
      <div style="margin-top:24px;padding:20px;background:rgba(0,232,255,0.04);border:1px solid rgba(0,232,255,0.12);border-radius:10px;">
        <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#00E8FF;opacity:0.7;">Project Brief</p>
        <p style="margin:0;color:#EEEEFF;font-size:14px;line-height:1.7;">${brief}</p>
      </div>

      <!-- CTA -->
      <div style="margin-top:32px;text-align:center;">
        <a href="mailto:${email}" style="display:inline-block;background:#00E8FF;color:#03030A;padding:14px 32px;border-radius:999px;font-size:13px;font-weight:bold;text-decoration:none;letter-spacing:0.05em;">Reply to ${name}</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.07);text-align:center;">
      <p style="margin:0;font-size:11px;color:#55556A;">blackquantumlabs.io · Chennai, India</p>
    </div>
  </div>
</body>
</html>
              `.trim(),
            });

            return {
              success:  true,
              captured: { name, email, service },
              message:  "Lead captured and team notified successfully.",
            };
          } catch (err) {
            console.error("[Qbot] Email send failed:", err);
            // Don't expose internal errors to the model — still mark as captured
            return {
              success:  false,
              captured: { name, email, service },
              message:  "Details noted but email notification failed. Team will follow up.",
            };
          }
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}