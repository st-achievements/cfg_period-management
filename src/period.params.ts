import { ParamIntSchema } from '@st-api/core';

import { z } from 'zod';

export const PeriodParams = z.object({
  periodId: ParamIntSchema,
});

export type PeriodParams = z.output<typeof PeriodParams>;
