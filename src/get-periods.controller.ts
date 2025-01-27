import { Controller, Handler, ZQuery, ZRes } from '@st-api/core';
import { PeriodPagedDto } from './period-paged.dto.js';
import { PeriodsQueryParams } from './periods.params.js';
import { and, count, desc, gte, lte, SQL } from 'drizzle-orm';
import { cfg, Drizzle } from '@st-achievements/database';
import { AssertAuthUser } from '@st-achievements/core';
import { Logger } from '@st-api/firebase';

@AssertAuthUser()
@ZRes(PeriodPagedDto)
@Controller({
  path: 'v1/periods',
  openapi: {
    tags: ['Periods'],
    responses: {},
  },
})
export class GetPeriodsController implements Handler {
  constructor(private readonly drizzle: Drizzle) {}

  private readonly logger = Logger.create(this);

  async handle(
    @ZQuery(PeriodsQueryParams)
    { limit, cursor, startAt, endAt }: PeriodsQueryParams,
  ): Promise<PeriodPagedDto> {
    const where: Array<SQL | undefined> = [
      gte(cfg.period.startAt, startAt!).if(startAt),
      lte(cfg.period.endAt, endAt!).if(endAt),
    ];
    const [entities, [countResult]] = await Promise.all([
      this.drizzle.query.cfgPeriod.findMany({
        columns: {
          id: true,
          startAt: true,
          endAt: true,
        },
        limit: limit + 1,
        where: and(
          ...where,
          lte(cfg.period.id, cursor?.periodId ?? Number.MAX_SAFE_INTEGER).if(
            cursor,
          ),
        ),
        orderBy: desc(cfg.period.id),
      }),
      this.drizzle
        .select({ count: count() })
        .from(cfg.period)
        .where(and(...where)),
    ]);
    this.logger.info(
      `Entities = ${entities.length} - Count = ${countResult?.count}`,
    );
    const hasNext = entities.length > limit;
    const nextId = hasNext ? entities.pop()?.id : undefined;
    return {
      items: entities.map((entity) => ({
        periodId: entity.id,
        startAt: entity.startAt,
        endAt: entity.endAt,
      })),
      metadata: {
        hasNext,
        next: hasNext && nextId ? { workoutId: nextId } : undefined,
        totalRecords: countResult?.count ?? 0,
        limit,
      },
    };
  }
}
