import { NextRequest, NextResponse } from "next/server";
import {
  sendEmail,
  generateWaitlistClientEmail,
  generateWaitlistAdminEmail,
} from "@/lib/email-service";
import { services } from "@/lib/data/services";

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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // The client sends the service id; prefer its display title in the emails.
    const serviceName =
      services.find((s) => s.id === service)?.title ?? service;

    const adminEmail = "info@designsbyjeninne.com";

    const clientEmailResult = await sendEmail({
      to: email,
      subject: `You're on the waitlist - ${serviceName}`,
      html: generateWaitlistClientEmail({ email, serviceName }),
    });

    const adminEmailResult = await sendEmail({
      to: adminEmail,
      subject: `New Waitlist Signup: ${serviceName}`,
      replyTo: email,
      html: generateWaitlistAdminEmail({ email, serviceName }),
    });

    console.log("Waitlist signup:", {
      email,
      service,
      serviceName,
      clientEmailSent: clientEmailResult.success,
      adminEmailSent: adminEmailResult.success,
      clientEmailError: clientEmailResult.error,
      adminEmailError: adminEmailResult.error,
    });

    // Same rule as the contact and payment routes: the admin notification is
    // the signup record, so a failure there must not be reported as success.
    if (!adminEmailResult.success) {
      return NextResponse.json(
        { error: "Failed to register your interest" },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Added to waitlist",
        emailsSent: {
          client: clientEmailResult.success,
          admin: adminEmailResult.success,
        },
      },
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
