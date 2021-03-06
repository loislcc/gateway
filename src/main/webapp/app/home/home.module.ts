import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { GrowlModule, PanelMenuModule } from 'primeng/primeng';

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild([HOME_ROUTE]), PanelMenuModule, GrowlModule],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayHomeModule {}
