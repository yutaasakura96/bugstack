import { z } from 'zod';

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required').max(65535),
});

const statusEnum = z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']);

export const issueFormSchema = issueSchema.extend({
  status: statusEnum.optional(),
  assignedToUserId: z.union([z.string().min(1), z.literal('unassigned')]).optional(),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255).optional(),
  description: z.string().min(1, 'Description is required').max(65535).optional(),
  assignedToUserId: z.string().min(1, 'User ID is required').max(255).optional().nullable(),
  status: statusEnum.optional(),
});
