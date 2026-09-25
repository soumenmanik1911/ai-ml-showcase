"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSubmissionSchema, type ContactSubmission } from "@/lib/schemas";
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSubmission>({
    resolver: zodResolver(ContactSubmissionSchema),
  });

  if (!isOpen) return null;

  const onSubmit = async (data: ContactSubmission) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setStatus("success");
        setServerMessage(result.message || "Message sent successfully!");
        reset();
      } else {
        setStatus("error");
        setServerMessage(result.message || "Failed to submit. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerMessage("Network error occurred. Check connection.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel relative w-full max-w-lg rounded-3xl p-6 md:p-8 border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] bg-[#0e111a]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          Get in Touch <span className="text-cyan-400">⚡</span>
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Send a direct message regarding opportunities, collaborations, or tech discussions.
        </p>

        {status === "success" ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-semibold text-white">Message Delivered!</h3>
            <p className="text-sm text-slate-400">{serverMessage}</p>
            <button
              onClick={() => {
                setStatus("idle");
                onClose();
              }}
              className="mt-4 px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {status === "error" && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{serverMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Name</label>
              <input
                {...register("name")}
                placeholder="Soumen Manik"
                className="w-full rounded-xl bg-slate-900/90 border border-slate-700/60 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
              {errors.name && (
                <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
              <input
                {...register("email")}
                placeholder="you@example.com"
                type="email"
                className="w-full rounded-xl bg-slate-900/90 border border-slate-700/60 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
              {errors.email && (
                <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Subject</label>
              <input
                {...register("subject")}
                placeholder="AI Engineering Collab / Project Inquiries"
                className="w-full rounded-xl bg-slate-900/90 border border-slate-700/60 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
              {errors.subject && (
                <p className="text-xs text-red-400 mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Message</label>
              <textarea
                {...register("message")}
                rows={4}
                placeholder="Tell me about your project goals or inquiries..."
                className="w-full rounded-xl bg-slate-900/90 border border-slate-700/60 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
              />
              {errors.message && (
                <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
