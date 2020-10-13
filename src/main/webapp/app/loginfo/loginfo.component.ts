import { Component, OnInit } from '@angular/core';
import { TrackerService } from 'app/service/tracker.service';
import { DialogService, LazyLoadEvent } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { ROW_NUM } from 'app/app.constants';
import { DataService } from 'app/service/data.service';
import { ConfirmService } from 'app/shared/confirmDialog/confirm.service';

declare var BMap: any;

@Component({
    selector: 'jhi-loginfo',
    templateUrl: './loginfo.component.html',
    providers: [MessageService]
})
export class LoginfoComponent implements OnInit {
    currentAccount: any;

    cols: any[];
    datas: any[];
    selectedInfo: any[];
    rows: number;
    stacked: boolean;

    param: any[];
    pageParam: any[];
    loadingData: boolean;
    totalCount: number;
    msgs: Message[] = [];

    constructor(
        // private principal: Principal,

        private router: Router,
        private dialogService: DialogService,
        private eventManager: JhiEventManager,
        private messageService: MessageService,
        private dataService: DataService,
        private confirmationService: ConfirmService
    ) {}

    ngOnInit() {
        this.cols = [
            { field: 'type', header: '类型' },
            { field: 'name', header: '名称' },
            { field: 'ip', header: 'IP' },
            { field: 'x', header: '坐标x' },
            { field: 'y', header: '坐标y' },
            { field: 'owner', header: '标记所属' },
            { field: 'level', header: '标记级别' },
            { field: 'eventime', header: '标注时间' },
            { field: 'note', header: '备注' }
        ];
        this.rows = ROW_NUM;

        this.loadingData = true;
        this.datas = [];
        // this.loadData();
    }

    refresh() {
        this.getData();
    }

    /* 删除信息 */
    deleteController() {
        if (this.selectedInfo === undefined) {
            this.messageService.add({ severity: 'info', summary: '请选择需要删除的信息', detail: '' });
            return;
        }
        this.confirmationService.confirm('删除信息').then(confirem => {
            if (confirem) {
                const idList = [];
                this.selectedInfo.forEach(c => {
                    idList.push(c.id);
                });
                this.dataService.deleteIDList(idList).subscribe(
                    res => {
                        if (res.status === 201 || res.status === 200) {
                            this.messageService.add({ severity: 'success', summary: '信息删除成功', detail: '' });
                            // this.loadData();
                            this.datas = this.datas.filter(c => this.selectedInfo.indexOf(c) === -1);
                            this.selectedInfo = [];
                            return;
                        }
                    },
                    error1 => {
                        this.messageService.add({ severity: 'error', summary: '信息删除失败', detail: '' });
                    }
                );
            } else {
            }
        });
    }

    clear() {
        this.eventManager.broadcast({ name: 'info', content: '清除筛选条件' });
    }

    loadLazy(event: LazyLoadEvent): void {
        this.param = [];
        this.pageParam = [];
        if (event.filters.global) {
            const filterValue = event.filters.global.value;
            if (filterValue !== '') {
                for (let i = 0; i < this.cols.length; i++) {
                    this.param.push([this.cols[i].field + '.contains', filterValue]);
                    this.pageParam.push([this.cols[i].field + '.contains', filterValue]);
                }
            }
        }
        const page = +event.first / +event.rows;
        this.pageParam.push(['page', page]);
        this.pageParam.push(['size', event.rows]);
        this.getData();
    }

    getData(): void {
        this.loadingData = true;
        // this.controllerService.get(this.commonService.paramToStr(this.param)).subscribe(count => (this.totalCount = count));
        this.dataService.queryDatainfo().subscribe(res => {
            this.loadingData = false;
            this.datas = res.body;
            this.totalCount = parseInt(res.headers.get('X-Total-Count'), 10);
        });
    }
}
