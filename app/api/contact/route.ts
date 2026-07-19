import { NextRequest, NextResponse } from "next/server";
import {
  sendEmail,
  generateClientConfirmationEmail,
  generateAdminNotificationEmail,
} from "@/lib/email-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      preferredContact,
      projectType,
      budget,
      preferredDate,
      message,
      serviceName,
      packageTier,
      packagePrice,
      selectedAddOns,
      estimatedTotal,
    } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const adminEmail = "info@designbyjeninne.com";

    const clientEmailResult = await sendEmail({
      to: email,
      subject: "Your Project Inquiry - Designs by Jeninne",
      html: generateClientConfirmationEmail({
        name: fullName,
        email,
        serviceName: serviceName || projectType || "Custom Project",
        packageTier: packageTier,
        estimatedTotal: estimatedTotal || 0,
      }),
    });

    const adminEmailResult = await sendEmail({
      to: adminEmail,
      subject: `New Booking: ${serviceName || projectType || "Custom Project"} - ${fullName}`,
      html: generateAdminNotificationEmail({
        clientName: fullName,
        clientEmail: email,
        clientPhone: phone,
        serviceName: serviceName || projectType || "Custom Project",
        packageTier: packageTier,
        addOns: selectedAddOns || [],
        estimatedTotal: estimatedTotal || 0,
        projectDetails: message,
        preferredDate,
        preferredContact,
      }),
    });

    console.log("Contact form submission:", {
      fullName,
      email,
      phone,
      projectType,
      budget,
      message,
      clientEmailSent: clientEmailResult.success,
      adminEmailSent: adminEmailResult.success,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your project inquiry has been received successfully",
        emailsSent: {
          client: clientEmailResult.success,
          admin: adminEmailResult.success,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process your inquiry" },
      { status: 500 }
    );
  }
}
