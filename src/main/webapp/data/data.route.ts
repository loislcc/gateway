import { Route, Routes } from '@angular/router';

import { DataComponent } from './data.component';

export const mapRoutes: Routes = [
    {
        path: 'data',
        component: DataComponent,
        data: {
            pageTitle: '数据视图'
        }
    }
];
