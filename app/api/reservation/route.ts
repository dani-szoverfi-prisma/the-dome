import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, phone, email, date, time, guests, notes, locale } =
    await req.json();

  if (!name || !phone || !date || !time || !guests) {
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
    <h2 style="font-family: serif; color: #985333;">Rezervare nouă — The Dome</h2>
    <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
      <tr><td style="padding: 8px 0; color: #666; width: 140px;">Nume</td><td><strong>${name}</strong></td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Telefon</td><td><strong>${phone}</strong></td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Email</td><td>${email || "—"}</td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Data</td><td><strong>${date}</strong></td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Ora</td><td><strong>${time}</strong></td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Persoane</td><td><strong>${guests}</strong></td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Mențiuni</td><td>${notes || "—"}</td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Limbă</td><td>${locale ?? "ro"}</td></tr>
    </table>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_TO,
    subject: `Rezervare — ${name} | ${date} ${time} | ${guests} pers.`,
    html,
  });

  return NextResponse.json({ success: true });
}
