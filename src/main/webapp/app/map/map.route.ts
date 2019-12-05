import { Route, Routes } from '@angular/router';

import { MapComponent } from './map.component';

export const mapRoutes: Routes = [
    {
        path: 'map',
        component: MapComponent,
        data: {
            pageTitle: '地图视图'
        }
    }
];
