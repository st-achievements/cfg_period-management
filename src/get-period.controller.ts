import { AssertAuthUser } from '@st-achievements/core';
import { cfg, Drizzle } from '@st-achievements/database';
import { Controller, Exceptions, Handler, ZParams, ZRes } from '@st-api/core';
import { and, eq, isNull } from 'drizzle-orm';

import { PERIOD_NOT_FOUND } from './exceptions.js';

import { PeriodDto } from './period.dto.js';
import { PeriodParams } from './period.params.js';

@AssertAuthUser()
@Exceptions([PERIOD_NOT_FOUND])
@ZRes(PeriodDto)
@Controller({
  path: 'v1/periods/:periodId',
  openapi: {
    tags: ['Periods'],
    responses: {},
  },
})
export class GetPeriodController implements Handler {
  constructor(private readonly drizzle: Drizzle) {}

  async handle(
    @ZParams(PeriodParams) { periodId }: PeriodParams,
  ): Promise<PeriodDto> {
    const entity = await this.drizzle.query.cfgPeriod.findFirst({
      columns: {
        id: true,
        startAt: true,
        endAt: true,
      },
      where: and(eq(cfg.period.id, periodId), isNull(cfg.period.inactivatedAt)),
    });
    if (!entity) {
      throw PERIOD_NOT_FOUND();
    }
    return {
      periodId: entity.id,
      startAt: entity.startAt,
      endAt: entity.endAt,
    };
  }
}
