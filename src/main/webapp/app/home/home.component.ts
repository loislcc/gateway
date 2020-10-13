import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem, Message } from 'primeng/components/common/api';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account, LoginService, StateStorageService } from 'app/core';
import { Router } from '@angular/router';
declare var BMap: any;

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {
    account: Account;
    modalRef: NgbModalRef;
    private items: MenuItem[];
    navClose = false;
    toggleDescTip = '点击关闭导航菜单';
    authenticationError: boolean;
    msgs: Message[] = [];

    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private router: Router
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
        this.initlogin();
        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }
    ngAfterViewInit() {
        // this.otnService.setSideNav(this.sideNav);

        this.eventManager.subscribe('info', response => {
            this.msgs = [];
            this.msgs.push({ severity: 'info', summary: response.content });
        });
    }
    initlogin() {
        this.loginService
            .login({
                username: 'admin',
                password: 'admin',
                rememberMe: true
            })
            .then(() => {
                this.authenticationError = false;
                if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                    this.router.navigate(['']);
                }
                this.eventManager.broadcast({
                    name: 'authenticationSuccess',
                    content: 'Sending Authentication Success'
                });

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is successful, go to stored previousState and clear previousState
                const redirect = this.stateStorageService.getUrl();
                if (redirect) {
                    this.stateStorageService.storeUrl(null);
                    this.router.navigate([redirect]);
                }
            })
            .catch(() => {
                this.authenticationError = true;
            });
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
}
