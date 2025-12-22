import { siteConfig } from "@/app/site.config";
import { Resend } from "resend";
import { z } from "zod";
import ContactFormEmail from "../../components/shared/contact/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = contactFormSchema.parse(body);

    const { data, error } = await resend.emails.send({
      from: "Greeniilde Contact Form <greeniilde@inmybio.info>",
      to: [siteConfig.email],
      subject: `New Project Inquiry from ${name}`,
      react: (
        <ContactFormEmail
          name={name}
          email={email}
          phone={phone}
          message={message}
        />
      ),
      replyTo: email,
    });

    if (error) {
      console.error("Resend API error:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("Contact form error:", error);
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: (error as z.ZodError).issues },
        { status: 400 },
      );
    }
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
