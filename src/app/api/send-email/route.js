// src/app/api/send-email/route.js
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    );
  }

  const { email, subject, message } = body;
  if (!email || !subject || !message) {
    return NextResponse.json(
      { error: 'Email, subject & message are required.' },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    host:    process.env.SMTP_HOST,
    port:    Number(process.env.SMTP_PORT),
    secure:  process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from:    process.env.SMTP_FROM,
      to:      process.env.CONTACT_RECEIVER,
      subject: `[Portfolio Form submission] ${subject}`,
      text:    `${message}\n\nReply-To: ${email}`,
      replyTo: email,
    });
    console.log('✔️ Email sent:', info.messageId);
    return NextResponse.json(
      { success: true, messageId: info.messageId },
      { status: 200 }
    );
  } catch (err) {
    console.error('❌ sendMail error:', err);
    return NextResponse.json(
      { error: 'Failed to send email', details: err.message },
      { status: 500 }
    );
  }
}
