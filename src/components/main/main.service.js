const masterSchedule = require('./mock-data.masterSchedule')

export class MainService {
    getStudents() {
        alert('students')
    }

    getMasterSchedule() {
        return masterSchedule
    }
}
