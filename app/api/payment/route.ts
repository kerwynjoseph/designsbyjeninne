import { NextRequest, NextResponse } from "next/server";
import {
  sendEmail,
  generatePaymentClientReceiptEmail,
  generatePaymentAdminNotificationEmail,
} from "@/lib/email-service";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const projectDetails = formData.get("projectDetails") as string;
    const selectedServices = formData.get("selectedServices") as string;
    const paymentProof = formData.get("paymentProof") as File | null;

    // Booking information from payment page
    const serviceName = formData.get("serviceName") as string;
    const packageTier = formData.get("packageTier") as string;
    const packagePrice = formData.get("packagePrice") as string;
    const selectedAddOnsStr = formData.get("selectedAddOns") as string;
    const estimatedTotal = formData.get("estimatedTotal") as string;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and phone" },
        { status: 400 }
      );
    }

    // Parse add-ons if available
    let addOns: Array<{ name: string; price: number }> = [];
    if (selectedAddOnsStr) {
      try {
        addOns = JSON.parse(selectedAddOnsStr);
      } catch {
        addOns = [];
      }
    }

    const adminEmail = "info@designsbyjeninne.com";

    // Convert payment proof to a base64 attachment
    let attachments: { filename: string; content: string }[] | undefined;
    if (paymentProof) {
      const bytes = await paymentProof.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      attachments = [
        {
          filename: paymentProof.name || "payment-proof",
          content: base64,
        },
      ];
    }

    const emailData = {
      fullName,
      email,
      phone,
      projectDetails,
      selectedServices,
      serviceName,
      packageTier,
      packagePrice: packagePrice ? parseInt(packagePrice, 10) : undefined,
      addOns,
      estimatedTotal: estimatedTotal ? parseInt(estimatedTotal, 10) : undefined,
      paymentProofFilename: paymentProof?.name,
    };

    const clientEmailResult = await sendEmail({
      to: email,
      subject: "Payment Submission Received - Designs by Jeninne",
      html: generatePaymentClientReceiptEmail(emailData),
      attachments,
    });

    const adminEmailResult = await sendEmail({
      to: adminEmail,
      subject: `New Payment Submission from ${fullName}`,
      replyTo: email,
      html: generatePaymentAdminNotificationEmail(emailData),
      attachments,
    });

    console.log("Payment submission emails:", {
      to: fullName,
      email,
      clientEmailSuccess: clientEmailResult.success,
      clientEmailError: clientEmailResult.error,
      adminEmailSuccess: adminEmailResult.success,
      adminEmailError: adminEmailResult.error,
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
