export default class ScheduleGeneratorController {
    constructor(ScheduleGeneratorService) {
        'ngInject'

        this.ScheduleGeneratorService = ScheduleGeneratorService
        this.students = this.ScheduleGeneratorService.returnStudentData().studentsSchedules

    }
}
