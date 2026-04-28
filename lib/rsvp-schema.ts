import { z } from 'zod';

export const rsvpSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  attending: z.enum(['yes', 'no']),
  guest_count: z.coerce.number().int().min(1).max(3).default(1),
  message: z.string().trim().max(1000).optional().or(z.literal('')),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
