import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cleanSingleLine(value = "") {
  return String(value).replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return Response.json(
        {
          success: false,
          message: "Invalid content type.",
        },
        { status: 415 }
      );
    }

    const body = await request.json();

    const name = cleanSingleLine(body?.name);
    const email = cleanSingleLine(body?.email).toLowerCase();
    const message = String(body?.message || "").trim();

    // Honeypot field: bots commonly fill hidden inputs
    const website = String(body?.website || "").trim();

    if (website) {
      // Return success so bots do not know they were blocked
      return Response.json({
        success: true,
        message: "Message sent successfully.",
      });
    }

    if (!name || !email || !message) {
      return Response.json(
        {
          success: false,
          message: "Name, email and message are required.",
        },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 100) {
      return Response.json(
        {
          success: false,
          message: "Please enter a valid name.",
        },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
      return Response.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    if (message.length < 5 || message.length > 5000) {
      return Response.json(
        {
          success: false,
          message: "Message must contain between 5 and 5000 characters.",
        },
        { status: 400 }
      );
    }

    const requiredEnvironmentVariables = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASSWORD",
      "SMTP_FROM_EMAIL",
      "CONTACT_TO_EMAIL",
    ];

    const missingVariables = requiredEnvironmentVariables.filter(
      (variableName) => !process.env[variableName]
    );

    if (missingVariables.length > 0) {
      console.error(
        "Missing SMTP environment variables:",
        missingVariables.join(", ")
      );

      return Response.json(
        {
          success: false,
          message: "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    const smtpPort = Number(process.env.SMTP_PORT);

    if (!Number.isInteger(smtpPort)) {
      console.error("SMTP_PORT must be a valid number.");

      return Response.json(
        {
          success: false,
          message: "Email service configuration is invalid.",
        },
        { status: 500 }
      );
    }

    const secureConnection =
      process.env.SMTP_SECURE === "true" || smtpPort === 465;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: secureConnection,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },

      // Connection timeouts
      connectionTimeout: 15000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const fromName =
      process.env.SMTP_FROM_NAME || "Website Contact Form";

    await transporter.sendMail({
      from: {
        name: fromName,
        address: process.env.SMTP_FROM_EMAIL,
      },

      to: process.env.CONTACT_TO_EMAIL,

      // Clicking Reply sends the response to the form visitor
      replyTo: {
        name,
        address: email,
      },

      subject: `New website enquiry from ${name}`,

      text: `
New website enquiry

Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),

      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </head>

          <body
            style="
              margin: 0;
              padding: 30px 15px;
              background: #f4f7fb;
              font-family: Arial, Helvetica, sans-serif;
              color: #0f172a;
            "
          >
            <table
              role="presentation"
              width="100%"
              cellspacing="0"
              cellpadding="0"
              border="0"
            >
              <tr>
                <td align="center">
                  <table
                    role="presentation"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    style="
                      max-width: 620px;
                      background: #ffffff;
                      border-radius: 20px;
                      overflow: hidden;
                      border: 1px solid #e2e8f0;
                    "
                  >
                    <tr>
                      <td
                        style="
                          padding: 28px 32px;
                          background: #1e3a8a;
                          color: #ffffff;
                        "
                      >
                        <p
                          style="
                            margin: 0 0 8px;
                            font-size: 12px;
                            font-weight: 700;
                            letter-spacing: 2px;
                            text-transform: uppercase;
                            opacity: 0.8;
                          "
                        >
                          Website Contact Form
                        </p>

                        <h1
                          style="
                            margin: 0;
                            font-size: 26px;
                            line-height: 1.3;
                          "
                        >
                          New enquiry received
                        </h1>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 32px;">
                        <table
                          role="presentation"
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                        >
                          <tr>
                            <td
                              style="
                                padding-bottom: 20px;
                                border-bottom: 1px solid #e2e8f0;
                              "
                            >
                              <p
                                style="
                                  margin: 0 0 6px;
                                  font-size: 12px;
                                  font-weight: 700;
                                  text-transform: uppercase;
                                  color: #64748b;
                                "
                              >
                                Name
                              </p>

                              <p
                                style="
                                  margin: 0;
                                  font-size: 16px;
                                  font-weight: 600;
                                "
                              >
                                ${safeName}
                              </p>
                            </td>
                          </tr>

                          <tr>
                            <td
                              style="
                                padding: 20px 0;
                                border-bottom: 1px solid #e2e8f0;
                              "
                            >
                              <p
                                style="
                                  margin: 0 0 6px;
                                  font-size: 12px;
                                  font-weight: 700;
                                  text-transform: uppercase;
                                  color: #64748b;
                                "
                              >
                                Email
                              </p>

                              <a
                                href="mailto:${safeEmail}"
                                style="
                                  color: #1e40af;
                                  font-size: 16px;
                                  text-decoration: none;
                                "
                              >
                                ${safeEmail}
                              </a>
                            </td>
                          </tr>

                          <tr>
                            <td style="padding-top: 20px;">
                              <p
                                style="
                                  margin: 0 0 10px;
                                  font-size: 12px;
                                  font-weight: 700;
                                  text-transform: uppercase;
                                  color: #64748b;
                                "
                              >
                                Message
                              </p>

                              <div
                                style="
                                  padding: 18px;
                                  border-radius: 12px;
                                  background: #f8fafc;
                                  font-size: 15px;
                                  line-height: 1.7;
                                  color: #334155;
                                  word-break: break-word;
                                "
                              >
                                ${safeMessage}
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td style="padding-top: 26px;">
                              <a
                                href="mailto:${safeEmail}"
                                style="
                                  display: inline-block;
                                  padding: 13px 22px;
                                  border-radius: 10px;
                                  background: #1e3a8a;
                                  color: #ffffff;
                                  font-size: 14px;
                                  font-weight: 700;
                                  text-decoration: none;
                                "
                              >
                                Reply to ${safeName}
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    return Response.json(
      {
        success: true,
        message: "Message sent successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form SMTP error:", error);

    return Response.json(
      {
        success: false,
        message:
          "We could not send your message right now. Please try again.",
      },
      { status: 500 }
    );
  }
}