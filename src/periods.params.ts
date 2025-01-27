import { ParamIntSchema, safe } from '@st-api/core';
import { z } from 'zod';

export const PeriodsCursorSchema = z.object({
  periodId: z.number(),
});

export const PeriodsCursorParam = z
  .string()
  .trim()
  .min(1)
  .max(5000)
  .transform((value) => {
    const [, json] = safe(
      () =>
        JSON.parse(Buffer.from(value, 'base64').toString('utf8')) as unknown,
    );
    return json;
  })
  .pipe(PeriodsCursorSchema)
  .openapi({
    example: Buffer.from(JSON.stringify({ periodId: 986 })).toString('base64'),
  });

export const PeriodsQueryParams = z.object({
  cursor: PeriodsCursorParam.optional(),
  limit: ParamIntSchema.pipe(z.number().min(1).max(1000)).default('100'),
  startAt: z.string().date().optional(),
  endAt: z.string().date().optional(),
});

export type PeriodsQueryParams = z.output<typeof PeriodsQueryParams>;
