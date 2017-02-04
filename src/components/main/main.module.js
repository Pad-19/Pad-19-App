import angular from 'angular';
import { MainComponent } from './main.component'

export const MainModule = angular
    .module('main', [])
    .component('main', MainComponent)
    .name
