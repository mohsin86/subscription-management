import { NextResponse } from 'next/server';
import { ContactSchema } from '@/lib/validation/contact';

export async function POST(request: Request) {
  const body = await request.json();
  const result = ContactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? 'Invalid input.' },
      { status: 400 }
    );
  }

  // TODO (later phase): persist to DB via Prisma instead of just logging.
  console.log('New contact submission:', result.data);

  // const { name, email, phone, description } = body as {
  //   name?: string;
  //   email?: string;
  //   phone?: string;
  //   description?: string;
  // };

  // if (!name || !email || !phone || !description) {
  //   return NextResponse.json(
  //     { error: 'All fields are required.' },
  //     { status: 400 }
  //   );
  // }

  // TODO (later phase): persist to DB via Prisma instead of just logging.
  //console.log('New contact submission:', { name, email, phone, description });

  return NextResponse.json({ success: true });
}
