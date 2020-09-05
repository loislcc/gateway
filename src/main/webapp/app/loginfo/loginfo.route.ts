import { Route, Routes } from '@angular/router';

import { LoginfoComponent } from './loginfo.component';

export const loginfoRoutes: Routes = [
    {
        path: 'loginfo',
        component: LoginfoComponent,
        data: {
            pageTitle: '日志视图'
        }
    }
];
