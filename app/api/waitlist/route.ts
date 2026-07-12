import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, service } = body;

    if (!email || !service) {
      return NextResponse.json(
        { error: "Missing email or service" },
        { status: 400 }
      );
    }

    // TODO: Integrate with your email service (Resend, SendGrid, etc.)
    // For now, just log to console and return success
    console.log(`Waitlist signup: ${email} for service ${service}`);

    return NextResponse.json(
      { success: true, message: "Added to waitlist" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Failed to process waitlist signup" },
      { status: 500 }
    );
  }
}
