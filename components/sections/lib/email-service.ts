interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = "onboarding@resend.dev";

export async function sendEmail({
  to,
  subject,
  html,
  from = FROM_EMAIL,
}: SendEmailParams): Promise<{ success: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured - emails will not be sent");
    return {
      success: false,
      error: "Email service not configured",
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Resend API error:", error);
      return {
        success: false,
        error: error.message || "Failed to send email",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Email service error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error sending email",
    };
  }
}

export function generateClientConfirmationEmail(data: {
  name: string;
  email: string;
  serviceName: string;
  packageTier?: "bronze" | "silver" | "gold";
  estimatedTotal: number;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #F5F1E8; background: #050505; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { border-bottom: 2px solid #F7C948; padding-bottom: 20px; margin-bottom: 20px; }
          .header h1 { color: #F7C948; margin: 0; font-size: 24px; }
          .content { line-height: 1.6; }
          .detail { background: #101010; padding: 15px; margin: 15px 0; border-left: 4px solid #F7C948; }
          .detail-label { color: #B8B2A6; font-size: 12px; text-transform: uppercase; }
          .detail-value { color: #F5F1E8; font-weight: bold; font-size: 16px; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #F7C948; color: #B8B2A6; font-size: 12px; }
          .button { display: inline-block; background: #F7C948; color: #050505; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✓ Booking Confirmed</h1>
          </div>

          <div class="content">
            <p>Dear ${data.name},</p>

            <p>Thank you for choosing <strong>Designs by Jeninne</strong> for your project! We're excited to work with you.</p>

            <p><strong>Here's a summary of your booking:</strong></p>

            <div class="detail">
              <div class="detail-label">Service</div>
              <div class="detail-value">${data.serviceName}</div>
            </div>

            ${
              data.packageTier
                ? `
              <div class="detail">
                <div class="detail-label">Package</div>
                <div class="detail-value" style="text-transform: capitalize;">${data.packageTier}</div>
              </div>
            `
                : ""
            }

            <div class="detail">
              <div class="detail-label">Estimated Total</div>
              <div class="detail-value">TT$${data.estimatedTotal.toLocaleString()}</div>
            </div>

            <h3 style="color: #F7C948; margin-top: 30px;">Next Steps:</h3>
            <ol>
              <li>Visit our payment page to complete your payment</li>
              <li>Choose your preferred payment method (Bank Transfer, Payment Plan, or WhatsApp)</li>
              <li>Upload proof of payment</li>
              <li>We'll verify within 24 hours and begin your project</li>
            </ol>

            <a href="https://designsbyjeninne.com/payment" class="button">Complete Payment →</a>

            <p>If you have any questions, feel free to reach out via WhatsApp at <strong>+1 (868) 344-5101</strong> or email us at <strong>designsbyjeninne@gmail.com</strong>.</p>

            <p>Looking forward to creating something amazing with you!</p>

            <p>Warmly,<br><strong>Jeninne & The Team</strong></p>
          </div>

          <div class="footer">
            <p>Designs by Jeninne | Premium Creative Studio<br>
            Email: designsbyjeninne@gmail.com | WhatsApp: +1 (868) 344-5101</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function generateAdminNotificationEmail(data: {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceName: string;
  packageTier?: "bronze" | "silver" | "gold";
  addOns: Array<{ name: string; price: number }>;
  estimatedTotal: number;
  projectDetails: string;
  preferredDate: string;
  preferredContact: string;
}): string {
  return `
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
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Booking</h1>
          </div>

          <div class="section">
            <div class="section-title">Client Information</div>
            <div class="detail"><div class="detail-label">Name</div><div class="detail-value">${data.clientName}</div></div>
            <div class="detail"><div class="detail-label">Email</div><div class="detail-value">${data.clientEmail}</div></div>
            <div class="detail"><div class="detail-label">Phone</div><div class="detail-value">${data.clientPhone}</div></div>
            <div class="detail"><div class="detail-label">Preferred Contact</div><div class="detail-value">${data.preferredContact}</div></div>
            <div class="detail"><div class="detail-label">Preferred Date</div><div class="detail-value">${data.preferredDate}</div></div>
          </div>

          <div class="section">
            <div class="section-title">Service Details</div>
            <div class="detail"><div class="detail-label">Service</div><div class="detail-value">${data.serviceName}</div></div>
            ${
              data.packageTier
                ? `<div class="detail"><div class="detail-label">Package</div><div class="detail-value" style="text-transform: capitalize;">${data.packageTier}</div></div>`
                : ""
            }
            ${
              data.addOns.length > 0
                ? `
            <div class="detail">
              <div class="detail-label">Add-Ons</div>
              ${data.addOns.map((ao) => `<div class="detail-value">${ao.name} - TT$${ao.price.toLocaleString()}</div>`).join("")}
            </div>
            `
                : ""
            }
            <div class="detail"><div class="detail-label">Total</div><div class="detail-value">TT$${data.estimatedTotal.toLocaleString()}</div></div>
          </div>

          <div class="section">
            <div class="section-title">Project Details</div>
            <div style="background: #101010; padding: 15px; border-left: 4px solid #F7C948; white-space: pre-wrap; color: #F5F1E8; font-family: monospace; font-size: 12px;">
${data.projectDetails}
            </div>
          </div>

          <div class="section" style="margin-top: 30px; padding: 15px; background: #101010; border-left: 4px solid #F7C948;">
            <p style="margin: 0; color: #F5F1E8;"><strong>Action Required:</strong> Client has been sent payment instructions. Follow up once payment is received.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
