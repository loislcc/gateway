import { Route, Routes } from '@angular/router';

import { TopoComponent } from './topo.component';

export const topoRoutes: Routes = [
    {
        path: 'topo',
        component: TopoComponent,
        data: {
            pageTitle: '拓扑视图'
        }
    }
];
