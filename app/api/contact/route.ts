import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, message, locale } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const html = `
    <h2 style="font-family: serif; color: #985333;">Mesaj nou — The Dome</h2>
    <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
      <tr><td style="padding: 8px 0; color: #666; width: 140px;">Nume</td><td><strong>${name}</strong></td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Limbă</td><td>${locale ?? "ro"}</td></tr>
    </table>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
    <p style="color: #333; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_TO,
    replyTo: email,
    subject: `Mesaj de la ${name} — The Dome`,
    html,
  });

  return NextResponse.json({ success: true });
}
