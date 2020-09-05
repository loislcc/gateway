import { Route, Routes } from '@angular/router';

import { EsdataComponent } from './esdata.component';

export const EsdataRoutes: Routes = [
    {
        path: 'data',
        component: EsdataComponent,
        data: {
            pageTitle: '数据视图'
        }
    }
];
