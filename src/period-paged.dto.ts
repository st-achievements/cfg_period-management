import { z } from 'zod';

import { PeriodDto } from './period.dto.js';

export const PeriodPagedDto = z.object({
  items: z.array(PeriodDto),
  metadata: z.object({
    next: z
      .object({
        workoutId: z.number(),
      })
      .transform((next) => Buffer.from(JSON.stringify(next)).toString('base64'))
      .optional()
      .openapi({
        example: Buffer.from(JSON.stringify({ periodId: 986 })).toString(
          'base64',
        ),
      }),
    hasNext: z.boolean(),
    limit: z.number().openapi({
      example: 10,
      description:
        'Returns the same value as received in the query string parameters',
    }),
    totalRecords: z.number().openapi({
      example: 1000,
      description: 'Total count of records',
    }),
  }),
});

export type PeriodPagedDto = z.input<typeof PeriodPagedDto>;
