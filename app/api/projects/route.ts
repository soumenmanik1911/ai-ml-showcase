import { NextRequest, NextResponse } from "next/server";
import { ProjectsQuerySchema, type Project, type ApiResponse } from "@/lib/schemas";

const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Visora",
    slug: "visora",
    description: "AI-assisted meeting summarization and real-time collaboration platform with smart action items extraction.",
    category: "ai-ml",
    tags: ["Next.js", "FastAPI", "OpenAI", "WebRTC"],
    featured: true,
    order: 1,
    githubUrl: "https://github.com/soumenmanik1911",
  },
  {
    id: "2",
    title: "DevLife",
    slug: "devlife",
    description: "Developer habit tracker, focus timers, and productivity analytics dashboard.",
    category: "fullstack",
    tags: ["React", "Node.js", "PostgreSQL", "TailwindCSS"],
    featured: true,
    order: 2,
    githubUrl: "https://github.com/soumenmanik1911",
  },
  {
    id: "3",
    title: "Stock Market Forecasting",
    slug: "stock-market-forecasting",
    description: "Time-series predictive modeling engine using LSTM deep neural network architectures.",
    category: "ai-ml",
    tags: ["Python", "TensorFlow", "Scikit-Learn", "Pandas"],
    featured: false,
    order: 3,
    githubUrl: "https://github.com/soumenmanik1911",
  },
  {
    id: "4",
    title: "Cold Drinks Inventory & Billing System",
    slug: "cold-drinks-inventory",
    description: "Robust retail inventory management, GST invoice generation, and sales forecasting.",
    category: "systems",
    tags: ["Java", "SQL", "Swing", "JasperReports"],
    featured: false,
    order: 4,
    githubUrl: "https://github.com/soumenmanik1911",
  },
];

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const query = ProjectsQuerySchema.parse(queryParams);

    let filtered = PROJECTS;
    if (query.category && query.category !== "all") {
      filtered = filtered.filter((p) => p.category === query.category);
    }
    if (query.featured !== undefined) {
      filtered = filtered.filter((p) => p.featured === query.featured);
    }

    const total = filtered.length;
    const startIndex = (query.page - 1) * query.limit;
    const paginated = filtered.slice(startIndex, startIndex + query.limit);

    const response: ApiResponse<Project[]> = {
      success: true,
      data: paginated,
      pagination: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit) || 1,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid query parameters",
          errors: err.errors.map((e: any) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
