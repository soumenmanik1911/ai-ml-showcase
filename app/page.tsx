"use client";

import React, { useState, useEffect } from "react";
import { type Project, type ProjectCategory } from "@/lib/schemas";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactModal } from "@/components/ContactModal";
import {
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  Terminal,
  Sparkles,
  Code2,
  Cpu,
  Layers,
  GraduationCap,
  Award,
} from "lucide-react";

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "ai-ml", label: "AI & Machine Learning" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "systems", label: "Systems & Security" },
];

const SKILLS = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "TensorFlow",
  "PostgreSQL",
  "TailwindCSS",
  "REST APIs",
  "Java",
  "FastAPI",
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
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 to-purple-600/15 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 -right-40 w-[450px] h-[300px] bg-purple-500/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Navigation Bar */}
        <header className="flex items-center justify-between pb-10 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20 font-mono text-sm">
              SM
            </div>
            <div>
              <span className="font-semibold text-white tracking-wide block text-sm">
                Soumen Manik
              </span>
              <span className="text-xs text-slate-400 block font-mono">
                Software & AI Engineer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://github.com/soumenmanik1911"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/soumen-manik-19116725b"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsContactOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold tracking-wide transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)]"
            >
              <Mail className="w-3.5 h-3.5" />
              Contact
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 sm:py-20 md:py-24 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-300 text-xs font-mono mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Software Engineering & AI/ML Roles
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Soumen <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">Manik</span>
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-slate-300 font-medium">
              Full-Stack Developer & Machine Learning Engineer
            </p>

            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
              Building robust web architectures, scalable backend services, and applied machine learning models. Focused on high-performance code, clean UI systems, and modern developer experiences.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all transform active:scale-95"
              >
                <Mail className="w-4 h-4" /> Get in Touch
              </button>
              <a
                href="https://github.com/soumenmanik1911"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl glass-panel text-slate-200 hover:text-white hover:border-slate-600 text-sm font-medium flex items-center gap-2 transition-all"
              >
                <Github className="w-4 h-4" /> View GitHub
              </a>
            </div>
          </div>

          {/* Quick Info / Snapshot Card */}
          <div className="w-full max-w-sm glass-panel rounded-2xl p-6 border border-slate-800/80 shadow-2xl relative">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-4 pb-3 border-b border-slate-800/80">
              <Terminal className="w-4 h-4" /> profile_summary.json
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Education</div>
                  <div className="text-white font-medium text-xs sm:text-sm">B.Tech CSE, IEM Kolkata</div>
                  <div className="text-xs text-slate-500">2023 – 2027</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Selected Highlights</div>
                  <div className="text-white font-medium text-xs sm:text-sm">TCS Prime Offer • Infosys AI/ML</div>
                  <div className="text-xs text-slate-500">System Security Certifications</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Layers className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">Core Stack</div>
                  <div className="text-white font-medium text-xs sm:text-sm">React, Next.js, Node, Python</div>
                  <div className="text-xs text-slate-500">PostgreSQL, TensorFlow, REST</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Pills */}
        <section className="pb-12">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
            Technologies & Tools
          </div>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/60 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects Showcase Section */}
        <section className="pt-8 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan-400" /> Featured Projects
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore recent machine learning and full-stack software applications.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                      : "glass-panel text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-64 rounded-2xl glass-panel animate-pulse bg-slate-900/40"
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

        {/* Minimal Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Soumen Manik. All rights reserved.</p>
          <p className="font-mono">Built with Next.js App Router & TailwindCSS</p>
        </footer>
      </div>

      {/* Interactive Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
