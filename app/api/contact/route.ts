import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactSchema } from '@/lib/validation/contact';

const CONTACT_RECIPIENT = process.env.CONTACT_EMAIL ?? 'devctg01@gmail.com';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await request.json();
  const result = ContactSchema.safeParse(body);


  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? 'Invalid input.' },
      { status: 400 }
    );
  }

  const { name, email, phone, description } = result.data;

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact Form <onboarding@resend.dev>',
    to: [CONTACT_RECIPIENT],
    replyTo: email,
    subject: `New contact form message from ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${description}</p>
    `,
  });

  if (error) {
    console.error('Failed to send contact email:', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
