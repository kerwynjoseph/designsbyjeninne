import { NextRequest, NextResponse } from "next/server";
import {
  sendEmail,
  generatePaymentClientReceiptEmail,
  generatePaymentAdminNotificationEmail,
  type BookingLocationData,
  type AdditionalLocationData,
} from "@/lib/email-service";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const paymentMethod = formData.get("paymentMethod") as string;
    const bookingReference = formData.get("bookingReference") as string;
    const paymentProof = formData.get("paymentProof") as File | null;

    const serviceName = formData.get("serviceName") as string;
    const packageTier = formData.get("packageTier") as string;
    const packagePrice = formData.get("packagePrice") as string;
    const selectedAddOnsStr = formData.get("selectedAddOns") as string;
    const estimatedTotal = formData.get("estimatedTotal") as string;

    const projectDetails = formData.get("projectDetails") as string;
    const clientNotes = formData.get("clientNotes") as string;

    const preferredDate = formData.get("preferredDate") as string;
    const preferredTime = formData.get("preferredTime") as string;
    const isCustomTime = formData.get("isCustomTime") === "true";
    const customTimeNote = formData.get("customTimeNote") as string;

    const primaryLocationStr = formData.get("primaryLocation") as string;
    const primaryTravelFee = formData.get("primaryTravelFee") as string;
    const additionalLocationsStr = formData.get("additionalLocations") as string;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and phone" },
        { status: 400 }
      );
    }

    let addOns: Array<{ name: string; price: number }> = [];
    if (selectedAddOnsStr) {
      try {
        addOns = JSON.parse(selectedAddOnsStr);
      } catch {
        addOns = [];
      }
    }

    let primaryLocation: BookingLocationData | null = null;
    if (primaryLocationStr) {
      try {
        primaryLocation = JSON.parse(primaryLocationStr);
      } catch {
        primaryLocation = null;
      }
    }

    let additionalLocations: AdditionalLocationData[] = [];
    if (additionalLocationsStr) {
      try {
        additionalLocations = JSON.parse(additionalLocationsStr);
      } catch {
        additionalLocations = [];
      }
    }

    const adminEmail = "info@designsbyjeninne.com";

    // Convert payment receipt to a base64 attachment
    let attachments: { filename: string; content: string }[] | undefined;
    if (paymentProof) {
      const bytes = await paymentProof.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      attachments = [
        {
          filename: paymentProof.name || "payment-receipt",
          content: base64,
        },
      ];
    }

    const emailData = {
      fullName,
      email,
      phone,
      paymentMethod,
      bookingReference,
      serviceName,
      packageTier,
      packagePrice: packagePrice ? parseInt(packagePrice, 10) : undefined,
      addOns,
      projectDetails,
      clientNotes,
      preferredDate,
      preferredTime,
      isCustomTime,
      customTimeNote,
      primaryLocation,
      primaryTravelFee: primaryTravelFee ? parseFloat(primaryTravelFee) : 0,
      additionalLocations,
      estimatedTotal: estimatedTotal ? parseFloat(estimatedTotal) : undefined,
      paymentProofFilename: paymentProof?.name,
    };

    const clientEmailResult = await sendEmail({
      to: email,
      subject: `Payment Received - Designs by Jeninne (${bookingReference || "Booking"})`,
      html: generatePaymentClientReceiptEmail(emailData),
      attachments,
    });

    const adminEmailResult = await sendEmail({
      to: adminEmail,
      subject: `New Payment Submission from ${fullName} (${bookingReference || "Booking"})`,
      replyTo: email,
      html: generatePaymentAdminNotificationEmail(emailData),
      attachments,
    });

    console.log("Payment submission emails:", {
      to: fullName,
      email,
      bookingReference,
      clientEmailSuccess: clientEmailResult.success,
      clientEmailError: clientEmailResult.error,
      adminEmailSuccess: adminEmailResult.success,
      adminEmailError: adminEmailResult.error,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Payment submission received successfully",
        bookingReference,
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
