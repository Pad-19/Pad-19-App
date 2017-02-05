const _ = require('lodash')

function addStudentToSession(masterSchedule, sessionId) {
    let sessionIndex = _.findIndex(masterSchedule, { 'sessionId': sessionId })
    masterSchedule[sessionIndex]['sessionAttendance']++
    return masterSchedule
}

function isThereRoom (
    masterSchedule,
    sessionId,
    overBooking = 4
) {

    let session = _.find(masterSchedule, { 'sessionId': sessionId })
    let sessionCurrentCount = session.sessionAttendance.length
    let sessionMax = session.sessionCapacity + overBooking

    return sessionCurrentCount < sessionMax
}

function isSessionAvailable(
    sessionPeriod,
    studentSessions
) {
    let available = _.find(studentSessions, { 'sessionPeriod': sessionId }

    return available != -1
}

function returnKeynotes(masterSchedule) {
    let keynotes = []
    for (var i = 0; i < masterSchedule.length; i++) {
        if (masterSchedule[i].sessionType === 'keynote') {
            keynotes.push(masterSchedule[i])
        }
    }
    return keynotes
}

function returnMockInterviews(masterSchedule) {
    let mockInterviews = []
    for (var i = 0; i < masterSchedule.length; i++) {
        if (masterSchedule[i].sessionType === 'interview') {
            mockInterviews.push(masterSchedule[i])
        }
    }
    return mockInterviews
}

function returnBooths(masterSchedule) {
    let booths = []
    for (var i = 0; i < masterSchedule.length; i++) {
        if (masterSchedule[i].sessionType === 'booths') {
            booths.push(masterSchedule[i])
        }
    }
    return booths
}

function updateMockInterviewsCount(currentCount, mockCount) {
    let count = currentCount
    if (count === mockCount-1) {
        count = 0
    } else {
        count++
    }
    return count
}







export default class MainController {
    constructor(MainService) {
        'ngInject'

        this.MainService = MainService
        this.masterSchedule = MainService.getMasterSchedule().masterSchedule
        this.studentResults = MainService.getStudentResults().studentResults
    }

    createSchedules() {
        let masterSchedule = this.masterSchedule
        let masterStudentList = this.studentResults

        let keynotes = returnKeynotes(masterSchedule)
        let mockInterviews = returnMockInterviews(masterSchedule)
        let booths = returnBooths(masterSchedule)
        let mockInterviewsCount = mockInterviews.length
        let boothCount = booths.length
        let mockInterviewsIndexer = 0



        for (let i = 0; i < masterStudentList.length; i++) {
            let student = masterStudentList[i]
            student.sessions = []

            // Add the keynotes to their schedule
            for (let e = 0; e < keynotes.length; e++) {
                student.sessions.push(keynotes[e])

                masterSchedule = addStudentToSession(
                    masterSchedule,
                    keynotes[e].sessionId
                )
            }

            // Add mock interviews to their schedule
            student.sessions.push(mockInterviews[mockInterviewsIndexer])
            masterSchedule = addStudentToSession(
                masterSchedule,
                mockInterviews[mockInterviewsIndexer].sessionId
            )

            mockInterviewsIndexer = updateMockInterviewsCount(
                mockInterviewsIndexer,
                mockInterviewsCount
            )


            // Add their first choice if it's available
            let session = _.find(masterSchedule, { 'sessionId': sessionId })


        }
        console.log(masterSchedule)
        console.log(masterStudentList)
    }

}
