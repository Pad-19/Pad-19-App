import angular from 'angular';
import { MainComponent } from './main.component'
import { MainService } from './main.service'

export const MainModule = angular
    .module('main', [])
    .component('main', MainComponent)
    .service('MainService', MainService)
    .name
