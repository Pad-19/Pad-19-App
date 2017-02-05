import angular from 'angular'
import { ScheduleGeneratorComponent } from './schedule_generator.component'
import { ScheduleGeneratorService } from './schedule_generator.service'

import { ScheduleModule } from './schedule/schedule.module'

export const ScheduleGeneratorModule = angular
    .module('scheduleGenerator', [
        ScheduleModule
    ])
    .component('scheduleGenerator', ScheduleGeneratorComponent)
    .service('ScheduleGeneratorService', ScheduleGeneratorService)
    .name
