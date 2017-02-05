import angular from 'angular'
import { ScheduleComponent } from './schedule.component'

export const ScheduleModule = angular
    .module('schedule', [])
    .component('schedule', ScheduleComponent)
    .name
