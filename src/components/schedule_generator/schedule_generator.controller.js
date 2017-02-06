const _ = require('lodash')

export default class ScheduleGeneratorController {
    constructor(ScheduleGeneratorService) {
        'ngInject'

        this.ScheduleGeneratorService = ScheduleGeneratorService
        this.students = this.ScheduleGeneratorService.returnStudentData().studentsSchedules

    }

    getSchool() {
        let school = _.filter(this.students, {'school': 'Falls City High School'})
        return school
    }
}
