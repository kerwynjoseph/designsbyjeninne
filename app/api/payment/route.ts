import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email-service";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const projectDetails = formData.get("projectDetails") as string;
    const selectedServices = formData.get("selectedServices") as string;
    const paymentProof = formData.get("paymentProof") as File | null;

    if (!fullName || !email || !phone || !projectDetails || !selectedServices) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const adminEmail = "info@designsbyjeninne.com";

    // Send confirmation email to client
    const clientConfirmationHtml = `
      <div style="font-family: Arial, sans-serif; color: #f5f1e8; background: #050505; padding: 40px;">
        <h2 style="color: #f7c948; margin-bottom: 20px;">Payment Submission Received</h2>
        <p>Hi ${fullName},</p>
        <p>Thank you for submitting your payment information and project details. We've received your submission and will review it within 24 hours.</p>

        <div style="background: #101010; padding: 20px; border-left: 3px solid #f7c948; margin: 20px 0;">
          <h3 style="color: #f7c948; margin-top: 0;">Your Submission Details</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Services:</strong> ${selectedServices}</p>
          <p><strong>Project Details:</strong> ${projectDetails}</p>
        </div>

        <p>We'll be in touch soon to confirm your booking and discuss next steps.</p>
        <p style="color: #b8b2a6; margin-top: 30px;">Best regards,<br/>Designs by Jeninne Team</p>
      </div>
    `;

    // Send notification email to admin
    const adminNotificationHtml = `
      <div style="font-family: Arial, sans-serif; color: #f5f1e8; background: #050505; padding: 40px;">
        <h2 style="color: #f7c948; margin-bottom: 20px;">New Payment Submission</h2>

        <div style="background: #101010; padding: 20px; border-left: 3px solid #f7c948; margin: 20px 0;">
          <h3 style="color: #f7c948; margin-top: 0;">Client Information</h3>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
        </div>

        <div style="background: #101010; padding: 20px; border-left: 3px solid #f7c948; margin: 20px 0;">
          <h3 style="color: #f7c948; margin-top: 0;">Project Details</h3>
          <p><strong>Services:</strong> ${selectedServices}</p>
          <p><strong>Details:</strong> ${projectDetails}</p>
        </div>

        <div style="background: #101010; padding: 20px; border-left: 3px solid #f7c948; margin: 20px 0;">
          <h3 style="color: #f7c948; margin-top: 0;">Payment Proof</h3>
          <p><strong>File Submitted:</strong> ${paymentProof ? paymentProof.name : "No file uploaded"}</p>
        </div>

        <p style="color: #b8b2a6;">Action required: Review payment proof and confirm booking with client.</p>
      </div>
    `;

    const clientEmailResult = await sendEmail({
      to: email,
      subject: "Payment Submission Received - Designs by Jeninne",
      html: clientConfirmationHtml,
    });

    const adminEmailResult = await sendEmail({
      to: adminEmail,
      subject: `New Payment Submission from ${fullName}`,
      html: adminNotificationHtml,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Payment submission received successfully",
        emailsSent: {
          client: clientEmailResult.success,
          admin: adminEmailResult.success,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment submission error:", error);
    return NextResponse.json(
      { error: "Failed to process payment submission" },
      { status: 500 }
    );
  }
}
