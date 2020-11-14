import { Route } from '@angular/router';

import { HomeComponent } from './';
import { mapRoutes } from 'app/map/map.route';
import { loginfoRoutes } from 'app/loginfo/loginfo.route';
import { EsdataRoutes } from 'app/esdata/esdata.route';
import { topoRoutes } from 'app/topo/topo.route';

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,

    data: {
        authorities: [],
        pageTitle: 'Gateway'
    },
    children: [...mapRoutes, ...loginfoRoutes, ...EsdataRoutes, ...topoRoutes]
};
