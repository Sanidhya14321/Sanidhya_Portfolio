import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECEIVER_EMAIL = "sanidhya14321@gmail.com";
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]!));

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) {
      return NextResponse.json({ message: "Please submit feedback from this website." }, { status: 403 });
    }
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return NextResponse.json({ message: "Expected JSON feedback." }, { status: 415 });
    }
    const reader = request.body?.getReader();
    if (!reader) return NextResponse.json({ message: "Feedback is required." }, { status: 400 });
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8192) {
        await reader.cancel();
        return NextResponse.json({ message: "Feedback is too large." }, { status: 413 });
      }
      chunks.push(value);
    }
    let body: Record<string, unknown>;
    try {
      const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid feedback");
      body = parsed as Record<string, unknown>;
    } catch {
      return NextResponse.json({ message: "Invalid feedback format." }, { status: 400 });
    }
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const rating = body.rating;
    const source = typeof body.source === "string" ? body.source.trim() : "unknown";
    if (!name || name.length > 100 || !email || email.length > 254 || !isValidEmail(email) || !message || message.length > 5000 || source.length > 100 || typeof rating !== "number" || !Number.isInteger(rating) || rating < 1 || rating > 5 || /[\r\n]/.test(name)) {
      return NextResponse.json({ message: "Please provide a valid name, email, message, and rating from 1 to 5." }, { status: 400 });
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
            "Feedback is temporarily unavailable. Please contact me by email.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
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
        `Source: ${source}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <h2>New Feedback Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Rating:</strong> ${rating}/5</p>
        <p><strong>Source:</strong> ${escapeHtml(source)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
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
