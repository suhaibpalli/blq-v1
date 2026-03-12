"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Check, Bot } from "lucide-react";

// ─── Welcome message shown before any interaction ─────────────────────────────
const WELCOME: UIMessage = {
  id:   "welcome-0",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Hi! I'm Qbot, the AI assistant for Black Quantum Labs. I can answer questions about our services, pricing, and process — or help you start a project inquiry. What's on your mind?",
    },
  ],
};

// ─── Shared transport (created once outside the component) ────────────────────
const transport = new DefaultChatTransport({ api: "/api/chat" });

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Extract the first text from a UIMessage's parts array. */
function getMessageText(msg: UIMessage): string {
  for (const part of msg.parts) {
    if (part.type === "text") return part.text;
  }
  return "";
}

type LeadResult =
  | { pending: true }
  | { pending: false; success: boolean; captured?: { name: string; email: string; service: string } };

/** Inspect parts for a captureLeadAndNotify tool invocation. */
function getLeadResult(msg: UIMessage): LeadResult | null {
  for (const part of msg.parts) {
    if (
      (part.type === "tool-captureLeadAndNotify" || part.type === "dynamic-tool") &&
      "state" in part
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const p = part as any;
      if (p.toolName && p.toolName !== "captureLeadAndNotify") continue;
      if (p.state === "output-available") {
        return { pending: false, success: p.output?.success ?? true, captured: p.output?.captured };
      }
      return { pending: true };
    }
  }
  return null;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BotAvatar() {
  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mb-0.5"
      style={{ background: "var(--color-cyan-dim)", border: "1px solid var(--color-cyan-glow)" }}
    >
      <Bot size={14} style={{ color: "var(--color-cyan)" }} />
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <BotAvatar />
      <div
        className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-bl-sm"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--color-ink-3)" }}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: UIMessage }) {
  const isUser = msg.role === "user";
  const text   = getMessageText(msg);
  const lead   = isUser ? null : getLeadResult(msg);

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[75%] px-4 py-3 rounded-2xl rounded-br-sm text-sm leading-relaxed"
          style={{ background: "var(--color-cyan)", color: "var(--color-bg)" }}
        >
          {text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2">
      <BotAvatar />
      <div className="flex flex-col gap-1 max-w-[82%]">
        {text && (
          <div
            className="px-4 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-ink)",
            }}
          >
            {text}
          </div>
        )}

        {/* Tool: pending */}
        {lead?.pending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
            style={{
              background: "rgba(0,232,255,0.05)",
              border: "1px solid rgba(0,232,255,0.15)",
              color: "var(--color-cyan)",
            }}
          >
            <Loader2 size={11} className="animate-spin" />
            Sending your details to the team…
          </motion.div>
        )}

        {/* Tool: done */}
        {lead && !lead.pending && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium mt-1"
            style={{
              background: lead.success ? "rgba(0,232,255,0.08)" : "rgba(239,68,68,0.08)",
              border: `1px solid ${lead.success ? "rgba(0,232,255,0.2)" : "rgba(239,68,68,0.2)"}`,
              color: lead.success ? "var(--color-cyan)" : "#f87171",
            }}
          >
            {lead.success ? (
              <>
                <Check size={12} />
                Details sent to the team · expect a reply within 24h
              </>
            ) : (
              <>⚠ Details noted · team will follow up manually</>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Main widget ──────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [isOpen, setIsOpen]       = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [input, setInput]         = useState("");
  const messagesEndRef             = useRef<HTMLDivElement>(null);
  const inputRef                   = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport,
    messages: [WELCOME],
  });

  const isStreaming = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const open = () => { setIsOpen(true); setHasOpened(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isStreaming) return;
    setInput("");
    sendMessage({ parts: [{ type: "text", text }] });
  };

  return (
    <>
      {/* ── Chat Panel ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[88px] right-4 sm:right-6 z-9985 flex flex-col overflow-hidden"
            style={{
              width:  "min(380px, calc(100vw - 32px))",
              height: "min(560px, calc(100svh - 120px))",
              background:   "var(--color-bg-2)",
              border:       "1px solid var(--color-border-strong)",
              borderRadius: "20px",
              boxShadow:    "0 24px 80px -8px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,232,255,0.06)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{ background: "var(--color-bg-3)", borderBottom: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "var(--color-cyan-dim)", border: "1px solid var(--color-cyan-glow)" }}
                >
                  <Bot size={17} style={{ color: "var(--color-cyan)" }} />
                </div>
                <div>
                  <p className="text-sm font-bold leading-none" style={{ color: "var(--color-ink)" }}>
                    Qbot
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <motion.span
                      className="block w-1.5 h-1.5 rounded-full"
                      style={{ background: "#22c55e" }}
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-[11px]" style={{ color: "var(--color-ink-3)" }}>
                      Black Quantum Labs · Online
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ color: "var(--color-ink-3)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--color-surface)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
              style={{ scrollbarWidth: "none" }}
            >
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
              {isStreaming && messages[messages.length - 1]?.role === "user" && (
                <TypingIndicator />
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="shrink-0 px-4 py-3"
              style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg-3)" }}
            >
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask anything…"
                  disabled={isStreaming}
                  className="flex-1 text-sm py-2.5 px-4 rounded-full outline-none transition-all"
                  style={{
                    background: "var(--color-surface)",
                    border:     "1px solid var(--color-border)",
                    color:      "var(--color-ink)",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--color-cyan-glow)")}
                  onBlur={e  => (e.currentTarget.style.borderColor = "var(--color-border)")}
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all disabled:opacity-40"
                  style={{ background: "var(--color-cyan)", color: "var(--color-bg)" }}
                  aria-label="Send"
                >
                  {isStreaming
                    ? <Loader2 size={15} className="animate-spin" />
                    : <Send size={15} />
                  }
                </motion.button>
              </form>
              <p className="text-center text-[10px] mt-2" style={{ color: "var(--color-ink-3)" }}>
                Powered by Groq · Black Quantum Labs
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle Button ───────────────────────────────────────────────────── */}
      <motion.button
        onClick={isOpen ? () => setIsOpen(false) : open}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-9986 flex items-center gap-2.5 rounded-full font-bold text-sm transition-all"
        style={{
          height:       "52px",
          paddingLeft:  "20px",
          paddingRight: "20px",
          background:   isOpen ? "var(--color-bg-3)" : "var(--color-cyan)",
          color:        isOpen ? "var(--color-ink-2)" : "var(--color-bg)",
          border:       isOpen ? "1px solid var(--color-border-strong)" : "none",
          boxShadow:    isOpen ? "none" : "0 4px 32px -4px rgba(0,232,255,0.5)",
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0,   opacity: 1 }}
              exit={{    rotate: 90,  opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={18} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90,  opacity: 0 }}
              animate={{ rotate: 0,   opacity: 1 }}
              exit={{    rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <MessageCircle size={18} />
              {!hasOpened && <span>Chat with us</span>}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Notification pulse */}
        {!hasOpened && !isOpen && (
          <motion.span
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
            style={{ background: "#22c55e" }}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </>
  );
}