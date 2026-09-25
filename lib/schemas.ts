import { z } from "zod";

// --- Project Showcase Types & Schema ---
export const ProjectCategoryEnum = z.enum([
  "all",
  "ai-ml",
  "fullstack",
  "systems",
  "security",
]);
export type ProjectCategory = z.infer<typeof ProjectCategoryEnum>;

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  longDescription: z.string().optional(),
  category: ProjectCategoryEnum,
  tags: z.array(z.string()),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});
export type Project = z.infer<typeof ProjectSchema>;

export const ProjectsQuerySchema = z.object({
  category: ProjectCategoryEnum.optional().default("all"),
  featured: z
    .enum(["true", "false"])
    .transform((val) => val === "true")
    .optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

// --- Contact Submission Schema ---
export const ContactSubmissionSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address"),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});
export type ContactSubmission = z.infer<typeof ContactSubmissionSchema>;

// --- Standard API Response Envelope ---
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: { field?: string; message: string }[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
