"use client";

import React, { useState, useEffect } from "react";
import { type Project, type ProjectCategory } from "@/lib/schemas";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactModal } from "@/components/ContactModal";
import { Terminal, Code2, Cpu, Mail, ExternalLink, Sparkles } from "lucide-react";

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All Works" },
  { id: "ai-ml", label: "AI & ML" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "systems", label: "Systems & Security" },
];

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
  const [loading, setLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const res = await fetch(`/api/projects?category=${selectedCategory}`);
        const result = await res.json();
        if (result.success) {
          setProjects(result.data || []);
        }
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [selectedCategory]);

  return (
    <main className="min-h-screen relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      {/* Background Neon Blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header / Hero Section */}
      <header className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <Terminal className="w-3.5 h-3.5" /> SOUMEN MANIK // DEV PORTFOLIO
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">Intelligent Systems</span>
          </h1>
          <p className="mt-3 text-base text-slate-400 max-w-2xl leading-relaxed">
            Specializing in applied Machine Learning, full-stack Next.js/FastAPI cloud architectures, and high-performance software engineering.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsContactOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-sm font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
          >
            <Mail className="w-4 h-4" /> Get in Touch
          </button>
          <a
            href="https://github.com/soumenmanik1911"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Filter Tabs */}
      <section className="relative z-10 mt-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                  : "glass-panel text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative z-10 mt-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-64 rounded-2xl glass-panel animate-pulse bg-slate-900/50"
              />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="glass-panel text-center py-16 rounded-2xl border border-dashed border-slate-800">
            <p className="text-slate-400 text-sm">No projects found for this category.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-20 pt-8 border-t border-slate-900 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Soumen Manik. Built with Next.js App Router, TailwindCSS & Zod.</p>
      </footer>

      {/* Interactive Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
