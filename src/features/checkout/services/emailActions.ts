"use server";

import { Resend } from "resend";
import { auth } from "@/src/lib/auth";


export async function sendOrderEmail(orderNumber: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  const session = await auth();
  const email = session?.user?.email;
  const name = session?.user?.name ?? "Customer";
  if (!email) return;

  try {
    await resend.emails.send({
      from: "MealMover <orders@resend.dev>", 
      to: email,
      subject: `Order #${orderNumber} confirmed 🎉`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h1 style="color: #EF5B5B;">Order Confirmed!</h1>
          <p>Hi ${name},</p>
          <p>Your order <strong>#${orderNumber}</strong> has been received and the restaurant is already preparing your food.</p>
          <div style="background: #f5f5f5; padding: 16px; border-radius: 12px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #666;">Order number</p>
            <p style="margin: 4px 0 0; font-size: 24px; font-weight: bold; color: #EF5B5B;">#${orderNumber}</p>
          </div>
          <a href="https://mealmover.app/transactions" style="display: inline-block; background: #EF5B5B; color: white; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 500;">
            Track your order
          </a>
          <p style="color: #999; font-size: 13px; margin-top: 24px;">MealMover — fast food delivery</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[Resend] Failed to send email:", err);
  }
}