import angular from 'angular'

import { MainModule } from './main/main.module'
import { ScheduleGeneratorModule } from './schedule_generator/schedule_generator.module'

export const ComponentsModule = angular
    .module('app.components', [
        MainModule,
        ScheduleGeneratorModule,
    ])
    .name
