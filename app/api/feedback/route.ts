import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type FeedbackPayload = {
  name?: string;
  email?: string;
  message?: string;
  rating?: number;
  source?: string;
};

const RECEIVER_EMAIL = "sanidhya14321@gmail.com";

const isValidEmail = (value: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FeedbackPayload;

    const name = body.name?.trim() || "";
    const email = body.email?.trim() || "";
    const message = body.message?.trim() || "";
    const rating = Number(body.rating || 0);

    if (!name || !email || !message || !rating) {
      return NextResponse.json(
        { message: "Please fill all required fields before submitting." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.FEEDBACK_FROM_EMAIL || user;

    if (!host || !user || !pass) {
      return NextResponse.json(
        {
          message:
            "Email service is not configured on the server yet. Set SMTP_HOST, SMTP_USER, and SMTP_PASS (SMTP_PORT is optional and defaults to 587).",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from,
      to: RECEIVER_EMAIL,
      replyTo: email,
      subject: `Portfolio Feedback: ${rating}/5 from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Rating: ${rating}/5`,
        `Source: ${body.source || "unknown"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <h2>New Feedback Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Rating:</strong> ${rating}/5</p>
        <p><strong>Source:</strong> ${body.source || "unknown"}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ message: "Feedback sent successfully." }, { status: 200 });
  } catch (error) {
    console.error("Feedback API error:", error);
    return NextResponse.json(
      { message: "Unable to send feedback right now. Please try again." },
      { status: 500 }
    );
  }
}
