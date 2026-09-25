"use client";

import React from "react";
import { type Project } from "@/lib/schemas";
import { ExternalLink, Github, Sparkles } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="glass-panel group relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            {project.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold text-cyan-400 border border-cyan-500/30">
                <Sparkles className="w-3 h-3" /> Featured
              </span>
            )}
            <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-300 border border-purple-500/20 uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="mt-6">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-800/80 px-2 py-1 text-xs text-slate-300 border border-slate-700/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
