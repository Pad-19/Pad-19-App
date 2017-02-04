export default class MainController {
    constructor(MainService) {
        'ngInject'

        this.MainService = MainService
        this.masterSchedule = MainService.getMasterSchedule()

    }

    createSchedules() {
        console.log(this.masterSchedule)



    }

}
