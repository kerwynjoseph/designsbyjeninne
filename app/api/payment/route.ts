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
    let addOns = [];
    if (selectedAddOnsStr) {
      try {
        addOns = JSON.parse(selectedAddOnsStr);
      } catch (e) {
        addOns = [];
      }
    }

    const adminEmail = "info@designsbyjeninne.com";

    // Send confirmation email to client
    const clientConfirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #F5F1E8; background: #050505; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { border-bottom: 2px solid #F7C948; padding-bottom: 20px; margin-bottom: 20px; }
            .header h1 { color: #F7C948; margin: 0; font-size: 24px; }
            .section { margin: 20px 0; }
            .section-title { color: #F7C948; font-size: 14px; text-transform: uppercase; font-weight: bold; margin-bottom: 10px; }
            .detail { background: #101010; padding: 10px 15px; margin: 5px 0; }
            .detail-label { color: #B8B2A6; font-size: 11px; text-transform: uppercase; }
            .detail-value { color: #F5F1E8; font-weight: bold; }
            .total { background: #F7C948; color: #050505; padding: 15px; font-size: 18px; font-weight: bold; text-align: center; border-radius: 4px; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #F7C948; color: #B8B2A6; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✓ Payment Received</h1>
            </div>

            <div style="margin: 20px 0;">
              <p>Dear ${fullName},</p>
              <p>Thank you for submitting your payment information! We've received your submission and will verify your payment within 24 hours.</p>
            </div>

            ${
              serviceName
                ? `
            <div class="section">
              <div class="section-title">Booking Details</div>
              <div class="detail"><div class="detail-label">Service</div><div class="detail-value">${serviceName}</div></div>
              ${packageTier ? `<div class="detail"><div class="detail-label">Package</div><div class="detail-value" style="text-transform: capitalize;">${packageTier}</div></div>` : ""}
              ${packagePrice ? `<div class="detail"><div class="detail-label">Package Price</div><div class="detail-value">TT$${parseInt(packagePrice).toLocaleString()}</div></div>` : ""}
              ${
                addOns.length > 0
                  ? `<div class="detail"><div class="detail-label">Add-Ons</div>
                     ${addOns.map((ao: any) => `<div class="detail-value">${ao.name} - TT$${ao.price.toLocaleString()}</div>`).join("")}
                     </div>`
                  : ""
              }
            </div>
            `
                : ""
            }

            <div class="section">
              <div class="section-title">Project Information</div>
              <div class="detail"><div class="detail-label">Contact Email</div><div class="detail-value">${email}</div></div>
              <div class="detail"><div class="detail-label">Phone</div><div class="detail-value">${phone}</div></div>
              <div class="detail"><div class="detail-label">Project Description</div><div class="detail-value" style="white-space: pre-wrap; font-family: monospace; font-size: 12px;">${projectDetails}</div></div>
            </div>

            ${
              estimatedTotal
                ? `<div class="total">Amount Due: TT$${parseInt(estimatedTotal).toLocaleString()}</div>`
                : ""
            }

            <div style="background: #101010; padding: 15px; border-left: 4px solid #F7C948; margin: 20px 0;">
              <p style="margin: 0; color: #F5F1E8;"><strong>Next Steps:</strong></p>
              <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                <li>We'll verify your payment within 24 hours</li>
                <li>Once confirmed, we'll reach out to discuss your project timeline</li>
                <li>Your project begins after payment verification</li>
              </ul>
            </div>

            <p>If you have any questions, feel free to reach out via WhatsApp at <strong>+1 (868) 344-5101</strong> or email us at <strong>info@designsbyjeninne.com</strong>.</p>

            <div class="footer">
              <p style="margin: 0;">Designs by Jeninne | Premium Creative Studio<br>
              Email: info@designsbyjeninne.com | WhatsApp: +1 (868) 344-5101</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send notification email to admin
    const adminNotificationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #F5F1E8; background: #050505; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { border-bottom: 2px solid #F7C948; padding-bottom: 20px; margin-bottom: 20px; }
            .header h1 { color: #F7C948; margin: 0; font-size: 24px; }
            .section { margin: 20px 0; }
            .section-title { color: #F7C948; font-size: 14px; text-transform: uppercase; font-weight: bold; margin-bottom: 10px; }
            .detail { background: #101010; padding: 10px 15px; margin: 5px 0; }
            .detail-label { color: #B8B2A6; font-size: 11px; text-transform: uppercase; }
            .detail-value { color: #F5F1E8; font-weight: bold; }
            .action-box { background: #F7C948; color: #050505; padding: 15px; font-weight: bold; margin: 20px 0; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💰 Payment Received</h1>
            </div>

            <div class="section">
              <div class="section-title">Client Information</div>
              <div class="detail"><div class="detail-label">Name</div><div class="detail-value">${fullName}</div></div>
              <div class="detail"><div class="detail-label">Email</div><div class="detail-value">${email}</div></div>
              <div class="detail"><div class="detail-label">Phone</div><div class="detail-value">${phone}</div></div>
            </div>

            ${
              serviceName
                ? `
            <div class="section">
              <div class="section-title">Booking Information</div>
              <div class="detail"><div class="detail-label">Service</div><div class="detail-value">${serviceName}</div></div>
              ${packageTier ? `<div class="detail"><div class="detail-label">Package</div><div class="detail-value" style="text-transform: capitalize;">${packageTier}</div></div>` : ""}
              ${packagePrice ? `<div class="detail"><div class="detail-label">Package Price</div><div class="detail-value">TT$${parseInt(packagePrice).toLocaleString()}</div></div>` : ""}
              ${
                addOns.length > 0
                  ? `<div class="detail"><div class="detail-label">Add-Ons</div>
                     ${addOns.map((ao: any) => `<div class="detail-value">${ao.name} - TT$${ao.price.toLocaleString()}</div>`).join("")}
                     </div>`
                  : ""
              }
              ${estimatedTotal ? `<div class="detail"><div class="detail-label">Total Amount</div><div class="detail-value">TT$${parseInt(estimatedTotal).toLocaleString()}</div></div>` : ""}
            </div>
            `
                : ""
            }

            ${
              projectDetails
                ? `
            <div class="section">
              <div class="section-title">Project Details</div>
              <div style="background: #101010; padding: 15px; border-left: 4px solid #F7C948; white-space: pre-wrap; color: #F5F1E8; font-family: monospace; font-size: 12px;">${projectDetails}</div>
            </div>
            `
                : ""
            }

            ${
              selectedServices
                ? `
            <div class="section">
              <div class="section-title">Services Selected</div>
              <div style="background: #101010; padding: 15px; color: #F5F1E8;">${selectedServices}</div>
            </div>
            `
                : ""
            }

            <div class="section">
              <div class="section-title">Payment Proof</div>
              <div class="detail"><div class="detail-label">File Submitted</div><div class="detail-value">${paymentProof ? paymentProof.name : "No file uploaded"}</div></div>
            </div>

            <div class="action-box">
              ✓ ACTION REQUIRED: Review payment proof and confirm booking with client
            </div>

            <div style="background: #101010; padding: 15px; border-left: 4px solid #F7C948;">
              <p style="margin: 0; color: #F5F1E8;">Once payment is verified, send project details and timeline to the client.</p>
            </div>
          </div>
        </body>
      </html>
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
