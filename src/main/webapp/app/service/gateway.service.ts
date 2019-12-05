import { Injectable } from '@angular/core';

@Injectable()
export class GatewayService {
    private currentPage = 'Home';
    private sideNav;
    private isSideNavOpened = true;
    private tipBar: any;

    constructor() {}

    toggleSideNav() {
        this.sideNav.toggle();
        this.isSideNavOpened = !this.isSideNavOpened;
    }

    getSideNavOpened() {
        return this.isSideNavOpened;
    }

    setSideNav(sideNav) {
        this.sideNav = sideNav;
    }

    setCurrentPage(menu: string) {
        this.currentPage = menu;
    }

    getCurrentPage(): string {
        return this.currentPage;
    }

    setTipBar(tipBar: any) {
        this.tipBar = tipBar;
    }

    getFilter(): any {
        return this.tipBar.getFilter();
    }
}
