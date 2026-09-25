import { NextRequest, NextResponse } from "next/server";
import { ContactSubmissionSchema, type ApiResponse } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = ContactSubmissionSchema.parse(body);

    // Business logic / DB storage / email forwarding mock hook
    console.log("Contact submission received:", validatedData);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      message: "Message received successfully. We will get back to you soon!",
      data: { id: `msg_${Date.now()}` },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: err.errors.map((e: any) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Invalid JSON or server error" },
      { status: 500 }
    );
  }
}
