"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export async function submitContactForm(data: unknown) {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Invalid form data." };
  }

  // In a real application, you would use a service like Resend, SendGrid, or Nodemailer
  // to send an email. For this example, we'll just log it to the console.
  console.log("New contact form submission:", parsed.data);

  return { success: true, message: "Your message has been sent successfully!" };
}
