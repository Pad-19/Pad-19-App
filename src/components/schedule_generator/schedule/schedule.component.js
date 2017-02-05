import ScheduleController from './schedule.controller'

export const ScheduleComponent = {
    bindings: {
        student: '<'
    },
    template: require('./schedule.tpl.html'),
    controller: ScheduleController
}
