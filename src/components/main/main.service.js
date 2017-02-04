const masterSchedule = require('./mock-data.masterSchedule')
const studentResults = require('./mock-data.studentsResults')

export class MainService {
    getStudentResults() {
        return studentResults
    }

    getMasterSchedule() {
        return masterSchedule
    }
}
