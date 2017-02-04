import angular from 'angular'

import { MainModule } from './main/main.module'

export const ComponentsModule = angular
    .module('app.components', [
        MainModule,
    ])
    .name
