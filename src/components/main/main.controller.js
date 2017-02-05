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
    let sessionCurrentCount = session.sessionAttendance
    let sessionMax = session.sessionCapacity + overBooking
    return sessionCurrentCount <= sessionMax
}

function isSessionAvailable(
    sessionPeriod,
    studentSessions
) {
    let sessionFound = _.find(studentSessions, { 'sessionPeriod': sessionPeriod })
    if (!sessionFound) {
        return true
    } else {
        return false
    }
}

function returnLowestAttendance(sessionsArray) {
    let attendance = []
    for (var i = 0; i < sessionsArray.length; i++) {
        attendance.push(sessionsArray[i].sessionAttendance)
    }
    let lowest = _.min(attendance)
    let session = _.find(sessionsArray, {'sessionAttendance': lowest})
    return session
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
            let firstChoice = student.survey.choice1
            let firstChoiceSessions = _.filter(masterSchedule, {'sessionSubject': firstChoice})

            let chosenFirstChoice = returnLowestAttendance(firstChoiceSessions)
            let isFirstChoiceOpen = isThereRoom(
                masterSchedule,
                chosenFirstChoice.sessionId
            )
            let isFirstChoiceAvailable = isSessionAvailable(
                chosenFirstChoice.sessionPeriod,
                student.sessions
            )
            // See if their first choice can be added
            if (isFirstChoiceOpen && isFirstChoiceAvailable) {
                student.sessions.push(chosenFirstChoice)
                masterSchedule = addStudentToSession(
                    masterSchedule,
                    chosenFirstChoice.sessionId
                )
            }

            // Add their second choice if it's available
            let secondChoice = student.survey.choice2
            let secondChoiceSessions = _.filter(masterSchedule, {'sessionSubject': secondChoice})

            let chosenSecondChoice = returnLowestAttendance(secondChoiceSessions)
            let isSecondChoiceOpen = isThereRoom(
                masterSchedule,
                chosenSecondChoice.sessionId
            )
            let isSecondChoiceAvailable = isSessionAvailable(
                chosenSecondChoice.sessionPeriod,
                student.sessions
            )
            // See if their first choice can be added
            if (isSecondChoiceOpen && isSecondChoiceAvailable) {
                student.sessions.push(chosenSecondChoice)
                masterSchedule = addStudentToSession(
                    masterSchedule,
                    chosenSecondChoice.sessionId
                )
            }

            // Add their third choice if it's available
            let thirdChoice = student.survey.choice3
            let thirdChoiceSessions = _.filter(masterSchedule, {'sessionSubject': thirdChoice})

            let chosenThirdChoice = returnLowestAttendance(thirdChoiceSessions)
            let isThirdChoiceOpen = isThereRoom(
                masterSchedule,
                chosenThirdChoice.sessionId
            )
            let isThirdChoiceAvailable = isSessionAvailable(
                chosenThirdChoice.sessionPeriod,
                student.sessions
            )
            // See if their first choice can be added
            if (isThirdChoiceOpen && isThirdChoiceAvailable) {
                student.sessions.push(chosenThirdChoice)
                masterSchedule = addStudentToSession(
                    masterSchedule,
                    chosenThirdChoice.sessionId
                )
            }

            
        }
        // End Student for-loop

        // console.log(masterSchedule)
        console.log(masterStudentList)
    }

}
