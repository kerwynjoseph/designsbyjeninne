interface EmailAttachment {
  filename: string;
  content: string; // base64-encoded file content
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = "Designs by Jeninne <info@designsbyjeninne.com>";
const LOGO_URL = "https://designsbyjeninne.com/logo.png";
const SITE_URL = "https://designsbyjeninne.com";

export async function sendEmail({
  to,
  subject,
  html,
  from = FROM_EMAIL,
  replyTo,
  attachments,
}: SendEmailParams): Promise<{ success: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    console.error(
      "RESEND_API_KEY not configured - emails will not be sent. Available env keys:",
      Object.keys(process.env).filter((k) => k.includes("RESEND"))
    );
    return {
      success: false,
      error: "Email service not configured",
    };
  }

  console.log(
    "Sending email to:",
    to,
    "from:",
    from,
    attachments ? `with ${attachments.length} attachment(s)` : ""
  );

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
        ...(replyTo ? { reply_to: replyTo } : {}),
        ...(attachments && attachments.length > 0 ? { attachments } : {}),
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

/* ------------------------------------------------------------------ */
/* Shared layout helpers                                              */
/* ------------------------------------------------------------------ */

const BASE_STYLES = `
  body { font-family: Arial, Helvetica, sans-serif; color: #F5F1E8; background: #050505; margin: 0; padding: 0; }
  .wrapper { background: #050505; padding: 32px 16px; }
  .container { max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 1px solid rgba(247,201,72,0.15); border-radius: 12px; padding: 32px; }
  .logo-wrap { text-align: center; margin-bottom: 20px; }
  .logo-wrap img { border-radius: 50%; border: 2px solid #F7C948; }
  .header { text-align: center; border-bottom: 2px solid #F7C948; padding-bottom: 20px; margin-bottom: 24px; }
  .header h1 { color: #F7C948; margin: 0; font-size: 22px; }
  .header .subtitle { color: #B8B2A6; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-top: 6px; }
  .content p { line-height: 1.6; color: #F5F1E8; }
  .section { margin: 24px 0; }
  .section-title { color: #F7C948; font-size: 13px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px; margin-bottom: 10px; }
  .detail-table { width: 100%; border-collapse: collapse; background: #101010; border-radius: 8px; overflow: hidden; }
  .detail-table td { padding: 10px 15px; font-size: 13px; border-bottom: 1px solid rgba(247,201,72,0.1); }
  .detail-table tr:last-child td { border-bottom: none; }
  .detail-label { color: #B8B2A6; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; width: 42%; vertical-align: top; }
  .detail-value { color: #F5F1E8; font-weight: 600; }
  .message-box { background: #101010; padding: 16px; border-left: 4px solid #F7C948; border-radius: 4px; white-space: pre-wrap; color: #F5F1E8; font-size: 13px; line-height: 1.6; }
  .total-box { background: linear-gradient(135deg, #F7C948, #d4a017); color: #050505; padding: 16px; font-size: 18px; font-weight: bold; text-align: center; border-radius: 8px; margin: 20px 0; }
  .action-box { background: #F7C948; color: #050505; padding: 14px 16px; font-weight: bold; margin: 20px 0; border-radius: 8px; text-align: center; }
  .note-box { background: #101010; padding: 15px; border-left: 4px solid #F7C948; border-radius: 4px; margin: 20px 0; }
  .note-box p { margin: 0; color: #F5F1E8; }
  .note-box ul { margin: 10px 0 0 0; padding-left: 20px; color: #F5F1E8; }
  .button { display: inline-block; background: #F7C948; color: #050505 !important; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
  .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(247,201,72,0.2); color: #B8B2A6; font-size: 12px; text-align: center; line-height: 1.6; }
`;

function emailShell(title: string, subtitle: string, bodyHtml: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>${BASE_STYLES}</style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="logo-wrap">
              <img src="${LOGO_URL}" width="64" height="64" alt="Designs by Jeninne" />
            </div>
            <div class="header">
              <h1>${title}</h1>
              <div class="subtitle">${subtitle}</div>
            </div>
            <div class="content">
              ${bodyHtml}
            </div>
            <div class="footer">
              Designs by Jeninne | Premium Creative Studio<br/>
              Email: info@designsbyjeninne.com &nbsp;|&nbsp; WhatsApp: +1 (868) 344-5101
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function detailTable(rows: Array<[string, string | undefined | null]>): string {
  const filtered = rows.filter(([, value]) => !!value && value.toString().trim() !== "");
  if (filtered.length === 0) return "";
  return `
    <table class="detail-table">
      ${filtered
        .map(
          ([label, value]) => `
        <tr>
          <td class="detail-label">${label}</td>
          <td class="detail-value">${value}</td>
        </tr>
      `
        )
        .join("")}
    </table>
  `;
}

function section(title: string, innerHtml: string): string {
  if (!innerHtml || innerHtml.trim() === "") return "";
  return `
    <div class="section">
      <div class="section-title">${title}</div>
      ${innerHtml}
    </div>
  `;
}

function formatAddOns(addOns?: Array<{ name: string; price: number }>): string {
  if (!addOns || addOns.length === 0) return "";
  return addOns
    .map((a) => `${a.name} &mdash; TT$${a.price.toLocaleString()}`)
    .join("<br/>");
}

function formatTime(time?: string): string | undefined {
  if (!time) return undefined;
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  if (isNaN(hour)) return time;
  const isAM = hour < 12;
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${isAM ? "AM" : "PM"}`;
}

function formatDate(date?: string): string | undefined {
  if (!date) return undefined;
  try {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return date;
  }
}

function timestampNow(): string {
  return new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/* ------------------------------------------------------------------ */
/* Contact form emails                                                */
/* ------------------------------------------------------------------ */

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  preferredContact?: string;
  projectType?: string;
  budget?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  serviceName: string;
  packageTier?: "bronze" | "silver" | "gold" | string;
  packagePrice?: number;
  addOns?: Array<{ name: string; price: number }>;
  estimatedTotal?: number;
}

export function generateClientConfirmationEmail(data: ContactEmailData): string {
  const hasBooking = !!(data.packageTier || (data.estimatedTotal && data.estimatedTotal > 0));

  const body = `
    <p>Dear ${data.name},</p>
    <p>Thank you for reaching out to <strong>Designs by Jeninne</strong>! We've received your project inquiry and will get back to you within 24 hours.</p>

    ${section(
      "Your Details",
      detailTable([
        ["Full Name", data.name],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Preferred Contact", data.preferredContact],
      ])
    )}

    ${section(
      "Project Information",
      detailTable([
        ["Project Type", data.projectType || data.serviceName],
        ["Budget Range", data.budget],
        ["Preferred Date", formatDate(data.preferredDate)],
        ["Preferred Time", formatTime(data.preferredTime)],
      ])
    )}

    ${
      hasBooking
        ? section(
            "Booking Summary",
            detailTable([
              ["Service", data.serviceName],
              ["Package", data.packageTier],
              ["Package Price", data.packagePrice ? `TT$${data.packagePrice.toLocaleString()}` : undefined],
              ["Add-Ons", formatAddOns(data.addOns)],
            ]) +
              (data.estimatedTotal
                ? `<div class="total-box">Estimated Total: TT$${data.estimatedTotal.toLocaleString()}</div>`
                : "")
          )
        : ""
    }

    ${
      data.message
        ? section("Your Message", `<div class="message-box">${data.message}</div>`)
        : ""
    }

    <div class="note-box">
      <p><strong>Next Steps:</strong></p>
      <ul>
        <li>Visit our payment page to complete your payment</li>
        <li>Choose your preferred payment method (Bank Transfer, Payment Plan, or WhatsApp)</li>
        <li>Upload proof of payment</li>
        <li>We'll verify within 24 hours and begin your project</li>
      </ul>
    </div>

    <div style="text-align:center;">
      <a href="${SITE_URL}/payment" class="button">Complete Payment &rarr;</a>
    </div>

    <p>If you have any questions, feel free to reach out via WhatsApp at <strong>+1 (868) 344-5101</strong> or email us at <strong>info@designsbyjeninne.com</strong>.</p>
    <p>Looking forward to creating something amazing with you!</p>
    <p>Warmly,<br/><strong>Jeninne &amp; The Team</strong></p>
  `;

  return emailShell("Inquiry Received", "Project Inquiry Confirmation", body);
}

interface AdminNotificationData {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  preferredContact?: string;
  projectType?: string;
  budget?: string;
  serviceName: string;
  packageTier?: "bronze" | "silver" | "gold" | string;
  packagePrice?: number;
  addOns: Array<{ name: string; price: number }>;
  estimatedTotal: number;
  projectDetails: string;
  preferredDate: string;
  preferredTime?: string;
}

export function generateAdminNotificationEmail(data: AdminNotificationData): string {
  const hasBooking = !!(data.packageTier || (data.estimatedTotal && data.estimatedTotal > 0));

  const body = `
    <p style="color:#B8B2A6; font-size:12px; text-align:center; margin-top:-10px;">Submitted ${timestampNow()}</p>

    ${section(
      "Client Information",
      detailTable([
        ["Name", data.clientName],
        ["Email", data.clientEmail],
        ["Phone", data.clientPhone],
        ["Preferred Contact", data.preferredContact],
      ])
    )}

    ${section(
      "Project Information",
      detailTable([
        ["Project Type", data.projectType || data.serviceName],
        ["Budget Range", data.budget],
        ["Preferred Date", formatDate(data.preferredDate)],
        ["Preferred Time", formatTime(data.preferredTime)],
      ])
    )}

    ${
      hasBooking
        ? section(
            "Service & Pricing",
            detailTable([
              ["Service", data.serviceName],
              ["Package", data.packageTier],
              ["Package Price", data.packagePrice ? `TT$${data.packagePrice.toLocaleString()}` : undefined],
              ["Add-Ons", formatAddOns(data.addOns)],
            ]) +
              (data.estimatedTotal
                ? `<div class="total-box">Total: TT$${data.estimatedTotal.toLocaleString()}</div>`
                : "")
          )
        : ""
    }

    ${section("Project Details / Message", `<div class="message-box">${data.projectDetails}</div>`)}

    <div class="action-box">Client has been sent a confirmation. Follow up once payment is received.</div>
  `;

  return emailShell("New Inquiry", "Contact Form Submission", body);
}

/* ------------------------------------------------------------------ */
/* Payment / booking emails                                           */
/* ------------------------------------------------------------------ */

export interface BookingLocationData {
  address: string;
  lat: number | null;
  lng: number | null;
  placeId: string | null;
}

export interface AdditionalLocationData extends BookingLocationData {
  id: string;
  travelFee: number;
}

export interface PaymentEmailData {
  fullName: string;
  email: string;
  phone: string;
  paymentMethod?: string;
  bookingReference?: string;

  serviceName?: string;
  packageTier?: string;
  packagePrice?: number;
  addOns?: Array<{ name: string; price: number }>;

  projectDetails?: string;
  clientNotes?: string;

  preferredDate?: string;
  preferredTime?: string;
  isCustomTime?: boolean;
  customTimeNote?: string;

  primaryLocation?: BookingLocationData | null;
  primaryTravelFee?: number;
  additionalLocations?: AdditionalLocationData[];

  estimatedTotal?: number;
  paymentProofFilename?: string;

  // Legacy fields kept for backward compatibility with older submissions
  selectedServices?: string;
}

function formatScheduledTime(data: PaymentEmailData): string | undefined {
  if (data.isCustomTime) {
    return data.customTimeNote
      ? `${data.customTimeNote} (custom - pending approval)`
      : undefined;
  }
  return formatTime(data.preferredTime);
}

function locationRows(data: PaymentEmailData): Array<[string, string | undefined]> {
  const rows: Array<[string, string | undefined]> = [
    ["Primary Location", data.primaryLocation?.address],
    [
      "Primary Location Travel Fee",
      data.primaryTravelFee ? `TT$${data.primaryTravelFee.toLocaleString()}` : undefined,
    ],
  ];

  (data.additionalLocations || []).forEach((loc, idx) => {
    rows.push([`Additional Location ${idx + 1}`, loc.address]);
    if (loc.travelFee) {
      rows.push([`Travel Fee (Location ${idx + 1})`, `TT$${loc.travelFee.toLocaleString()}`]);
    }
  });

  return rows;
}

function pricingBreakdownHtml(data: PaymentEmailData): string {
  const rows: Array<[string, string | undefined]> = [
    ["Base Package", data.packagePrice ? `TT$${data.packagePrice.toLocaleString()}` : undefined],
    ["Add-Ons", formatAddOns(data.addOns)],
    [
      "Primary Location Travel Fee",
      data.primaryTravelFee ? `TT$${data.primaryTravelFee.toLocaleString()}` : undefined,
    ],
  ];

  (data.additionalLocations || []).forEach((loc, idx) => {
    if (loc.travelFee) {
      rows.push([`Travel Fee (Location ${idx + 1})`, `TT$${loc.travelFee.toLocaleString()}`]);
    }
  });

  return detailTable(rows);
}

export function generatePaymentClientReceiptEmail(data: PaymentEmailData): string {
  const hasBooking = !!(data.serviceName || (data.estimatedTotal && data.estimatedTotal > 0));

  const body = `
    <p>Dear ${data.fullName},</p>
    <p>Thank you for submitting your payment! We've received your booking and will verify your payment within 24 hours.</p>

    ${
      data.bookingReference
        ? `<p style="color:#B8B2A6; font-size:12px; text-align:center;">Booking Reference: <strong style="color:#F7C948;">${data.bookingReference}</strong></p>`
        : ""
    }

    ${section(
      "Your Information",
      detailTable([
        ["Full Name", data.fullName],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Payment Method", data.paymentMethod],
      ])
    )}

    ${
      hasBooking
        ? section(
            "Booking Details",
            detailTable([
              ["Service", data.serviceName],
              ["Package", data.packageTier],
            ])
          )
        : ""
    }

    ${section(
      "Schedule",
      detailTable([
        ["Date", formatDate(data.preferredDate)],
        ["Time", formatScheduledTime(data)],
      ])
    )}

    ${section("Location", detailTable(locationRows(data)))}

    ${section("Pricing Breakdown", pricingBreakdownHtml(data))}

    ${
      data.estimatedTotal
        ? `<div class="total-box">Amount Due: TT$${data.estimatedTotal.toLocaleString()}</div>`
        : ""
    }

    ${section("Project Details", data.projectDetails ? `<div class="message-box">${data.projectDetails}</div>` : "")}

    ${section("Notes", data.clientNotes ? `<div class="message-box">${data.clientNotes}</div>` : "")}

    ${
      data.paymentProofFilename
        ? `<div class="note-box"><p>&#128206; Your uploaded payment receipt (<strong>${data.paymentProofFilename}</strong>) is attached to this email for your records.</p></div>`
        : ""
    }

    <div class="note-box">
      <p><strong>Next Steps:</strong></p>
      <ul>
        <li>We'll verify your payment within 24 hours</li>
        <li>Once confirmed, we'll reach out to discuss your project timeline</li>
        <li>Your project begins after payment verification</li>
      </ul>
    </div>

    <p>If you have any questions, feel free to reach out via WhatsApp at <strong>+1 (868) 344-5101</strong> or email us at <strong>info@designsbyjeninne.com</strong>.</p>
    <p>Warmly,<br/><strong>Jeninne &amp; The Team</strong></p>
  `;

  return emailShell("Payment Received", "Payment Submission Receipt", body);
}

export function generatePaymentAdminNotificationEmail(data: PaymentEmailData): string {
  const hasBooking = !!(data.serviceName || (data.estimatedTotal && data.estimatedTotal > 0));

  const body = `
    <p style="color:#B8B2A6; font-size:12px; text-align:center; margin-top:-10px;">Submitted ${timestampNow()}</p>

    ${
      data.bookingReference
        ? `<p style="color:#B8B2A6; font-size:12px; text-align:center;">Booking Reference: <strong style="color:#F7C948;">${data.bookingReference}</strong></p>`
        : ""
    }

    ${section(
      "Client Information",
      detailTable([
        ["Name", data.fullName],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Payment Method", data.paymentMethod],
      ])
    )}

    ${
      hasBooking
        ? section(
            "Booking Information",
            detailTable([
              ["Service", data.serviceName],
              ["Package", data.packageTier],
            ])
          )
        : ""
    }

    ${section(
      "Schedule",
      detailTable([
        ["Date", formatDate(data.preferredDate)],
        ["Time", formatScheduledTime(data)],
      ])
    )}

    ${section("Location", detailTable(locationRows(data)))}

    ${section("Pricing Breakdown", pricingBreakdownHtml(data))}

    ${
      data.estimatedTotal
        ? `<div class="total-box">Final Total: TT$${data.estimatedTotal.toLocaleString()}</div>`
        : ""
    }

    ${section("Project Details", data.projectDetails ? `<div class="message-box">${data.projectDetails}</div>` : "")}

    ${section("Client Notes", data.clientNotes ? `<div class="message-box">${data.clientNotes}</div>` : "")}

    ${section(
      "Payment Receipt",
      detailTable([
        ["File Submitted", data.paymentProofFilename || "No file uploaded"],
      ])
    )}

    <div class="action-box">&#10003; Action Required: Review the attached payment receipt and confirm booking with client</div>

    <div class="note-box">
      <p>Once payment is verified, send project details and timeline to the client. Reply directly to this email to reach them.</p>
    </div>
  `;

  return emailShell("Payment Received", "New Payment Submission", body);
}
