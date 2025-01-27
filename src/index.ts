import 'reflect-metadata';
import { AchievementsCoreAdapter } from '@st-achievements/core';
import { StFirebaseApp } from '@st-api/firebase';
import { GetPeriodsController } from './get-periods.controller.js';
import { GetPeriodController } from './get-period.controller.js';

const app = StFirebaseApp.create({
  adapter: new AchievementsCoreAdapter({
    throttling: true,
    authentication: true,
  }),
  controllers: [GetPeriodsController, GetPeriodController],
}).withHttpHandler();

export const cfg_period = {
  management: {
    http: app.getHttpHandler(),
  },
};
