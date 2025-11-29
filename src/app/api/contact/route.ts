import { NextRequest, NextResponse } from "next/server";

const DEFAULT_TO_EMAIL = "fredi1574@gmail.com"; // Resend sandbox requires exact match to account email

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, message } = await req.json();
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    const toEmail = (
      process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL
    ).toLowerCase();
    const payload = {
      from: "Hagit Oz Interior Design <onboarding@resend.dev>",
      to: [toEmail],
      subject: `New Design Inquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Design Inquiry</title>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #1f1b16;
              background-color: #fff7ef;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #fff;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #bfa395, #a89885);
              color: white;
              padding: 32px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 400;
              font-family: 'Playfair Display', Georgia, serif;
            }
            .header p {
              margin: 8px 0 0 0;
              opacity: 0.9;
              font-size: 16px;
            }
            .content {
              padding: 32px;
            }
            .inquiry-details {
              background: #f4ece3;
              border-radius: 12px;
              padding: 24px;
              margin: 24px 0;
            }
            .detail-row {
              display: flex;
              margin-bottom: 16px;
              align-items: flex-start;
            }
            .detail-row:last-child {
              margin-bottom: 0;
            }
            .detail-label {
              font-weight: 600;
              color: #bfa395;
              min-width: 80px;
              margin-right: 16px;
            }
            .detail-value {
              flex: 1;
              color: #1f1b16;
            }
            .message-content {
              background: white;
              border: 2px solid #f4ece3;
              border-radius: 12px;
              padding: 20px;
              margin-top: 16px;
              font-style: italic;
              color: #1f1b16;
              line-height: 1.7;
            }
            .footer {
              background: #f4ece3;
              padding: 24px 32px;
              text-align: center;
              color: #bfa395;
              font-size: 14px;
            }
            .cta-button {
              display: inline-block;
              background: #bfa395;
              color: white;
              padding: 12px 24px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 600;
              margin-top: 16px;
            }
            .divider {
              height: 1px;
              background: linear-gradient(90deg, transparent, #bfa395, transparent);
              margin: 24px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Design Inquiry</h1>
            </div>
            
            <div class="content">
              <div class="inquiry-details">
                <div class="detail-row">
                  <div class="detail-label">Name:</div>
                  <div class="detail-value">${name}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Phone:</div>
                  <div class="detail-value">${phone}</div>
                </div>
                ${
                  email
                    ? `<div class="detail-row">
                  <div class="detail-label">Email:</div>
                  <div class="detail-value">${email}</div>
                </div>`
                    : ""
                }
                <div class="detail-row">
                  <div class="detail-label">Date:</div>
                  <div class="detail-value">${new Date().toLocaleDateString(
                    "en-IL",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}</div>
                </div>
              </div>
              
              <div class="divider"></div>
              
              <h3 style="color: #bfa395; margin: 0 0 16px 0; font-family: 'Playfair Display', Georgia, serif;">Their Message:</h3>
              <div class="message-content">
                ${message.replace(/\n/g, "<br>")}
              </div>
              
              <div style="text-align: center; margin-top: 32px;">
                ${
                  email
                    ? `<a href="mailto:${email}" class="cta-button">Reply to ${name}</a>`
                    : `<a href="tel:${phone.replace(
                        /\D/g,
                        ""
                      )}" class="cta-button">Call ${name}</a>`
                }
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `New Design Inquiry from ${name}

Name: ${name}
Phone: ${phone}
${email ? `Email: ${email}` : ""}
Date: ${new Date().toLocaleDateString()}

Message:
${message}

${email ? `Reply to: ${email}` : `Call: ${phone}`}`,
    };

    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json(
        { error: err || "Failed to send" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
