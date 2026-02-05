import { prisma } from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import authOptions from '../../auth/authOptions';
import { IssueSchema } from '../../validationSchemas';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const validation = IssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ errors: z.flattenError(validation.error) }, { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
