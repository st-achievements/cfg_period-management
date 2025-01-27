import { z } from 'zod';

export const PeriodDto = z.object({
  periodId: z.number().openapi({
    example: 1,
  }),
  startAt: z.string().date().openapi({
    example: '2024-01-01',
  }),
  endAt: z.string().date().openapi({
    example: '2024-12-31',
  }),
});

export type PeriodDto = z.input<typeof PeriodDto>;
