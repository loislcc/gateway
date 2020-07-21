import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { GatewaySharedModule } from 'app/shared';
import { GatewayCoreModule } from 'app/core';
import { GatewayAppRoutingModule } from './app-routing.module';
import { GatewayHomeModule } from './home/home.module';
import { GatewayAccountModule } from './account/account.module';
import { GatewayEntityModule } from './entities/entity.module';
import * as moment from 'moment';
import { PanelMenuModule } from 'primeng/components/panelmenu/panelmenu';
import {
    ChartModule,
    DialogModule,
    DropdownModule,
    GrowlModule,
    InputTextModule,
    MessageService,
    PickListModule,
    StepsModule,
    TabMenuModule,
    TabViewModule,
    ToolbarModule,
    CheckboxModule,
    AccordionModule,
    TreeModule,
    ProgressBarModule,
    ProgressSpinnerModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';
import { MapComponent } from './map/map.component';
import { DataComponent } from '../data/data.component';

@NgModule({
    imports: [
        BrowserModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000
        }),
        GatewaySharedModule.forRoot(),
        GatewayCoreModule,
        GatewayHomeModule,
        GatewayAccountModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        GatewayEntityModule,
        GatewayAppRoutingModule,
        ChartModule,
        DialogModule,
        DropdownModule,
        GrowlModule,
        InputTextModule,
        PickListModule,
        StepsModule,
        TabMenuModule,
        TabViewModule,
        ToolbarModule,
        CheckboxModule,
        AccordionModule,
        TreeModule,
        ProgressBarModule,
        ProgressSpinnerModule,
        PanelMenuModule,
        TableModule,
        ButtonModule
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent, MapComponent, DataComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        },
        MessageService
    ],
    bootstrap: [JhiMainComponent]
})
export class GatewayAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
