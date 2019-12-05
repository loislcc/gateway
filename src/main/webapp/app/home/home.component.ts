import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem, Message } from 'primeng/components/common/api';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';
declare var BMap: any;

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    private items: MenuItem[];
    navClose = false;
    toggleDescTip = '点击关闭导航菜单';

    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {
        this.items = [
            {
                label: '地图视图',
                icon: 'fa fa-map',
                routerLink: ['/map']
            }
        ];
    }

    ngOnInit() {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        // const map = new BMap.Map('map'); // 创建地图实例
        // const point = new BMap.Point(116.404, 39.915); // 创建点坐标
        // map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
        // map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
    toggleNav() {
        this.navClose = !this.navClose;
        if (this.navClose) {
            this.toggleDescTip = '点击展开导航菜单';
        } else {
            this.toggleDescTip = '点击关闭导航菜单';
        }
    }
    // getCurrentPage() {
    //     return this.gatewayservice.getCurrentPage();
    // }
}
