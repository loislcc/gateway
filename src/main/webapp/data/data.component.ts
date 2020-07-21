import { Component, OnInit } from '@angular/core';
import { TrackerService } from 'app/service/tracker.service';
import { DialogService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { ROW_NUM } from 'app/app.constants';

declare var BMap: any;

@Component({
    selector: 'jhi-map',
    templateUrl: './data.component.html',
    styles: []
})
export class DataComponent implements OnInit {
    currentAccount: any;

    cols: any[];
    datas: any[];
    selectedControllers: any[];
    rows: number;
    stacked: boolean;

    param: any[];
    pageParam: any[];
    loadingData: boolean;
    totalCount: number;

    constructor(
        // private principal: Principal,

        private router: Router,
        private dialogService: DialogService,
        private eventManager: JhiEventManager,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.cols = [
            { field: 'name', header: '名称' },
            { field: 'type', header: '类型' },
            { field: 'virtualnode', header: '虚拟节点' },
            { field: 'realnode', header: '物理节点' },
            { field: 'time', header: '操作时间' }
        ];
        this.rows = ROW_NUM;

        this.loadingData = true;
        this.datas = [];
        // this.loadData();
    }

    // load controller data
    // loadData() {
    //     this.controllerService.findAll('all').subscribe(response => {
    //         this.datas = response.body;
    //     });
    // }
    //
    // refresh() {
    //     this.loadData();
    // }
    //
    // startConnect() {
    //     if (this.selectedControllers === undefined || this.selectedControllers.length !== 1) {
    //         this.messageService.add({ severity: 'info', summary: '请选择一个控制器' });
    //         return;
    //     }
    //     this.selectedControllers[0].connectstatus = '正在连接';
    //     this.controllerService.startConnect(this.selectedControllers[0].id).subscribe(res => {
    //         this.selectedControllers[0].connectstatus = '正在与远程服务器连接';
    //     });
    // }
    //
    // stopConnect() {
    //     if (this.selectedControllers === undefined || this.selectedControllers.length !== 1) {
    //         this.messageService.add({ severity: 'info', summary: '请选择一个控制器' });
    //         return;
    //     }
    //     this.controllerService.closeConnect(this.selectedControllers[0].id).subscribe(res => {
    //         this.selectedControllers[0].connectstatus = '正在断开';
    //     });
    // }
    //
    // /* 删除控制器 */
    // deleteController() {
    //     if (this.selectedControllers === undefined) {
    //         this.messageService.add({ severity: 'info', summary: '请选择一个控制器' });
    //         return;
    //     }
    //     this.confirmationService.confirm('删除控制器').then(confirem => {
    //         if (confirem) {
    //             const idList = [];
    //             this.selectedControllers.forEach(c => {
    //                 idList.push(c.id);
    //             });
    //             this.controllerService.deleteIDList(idList).subscribe(res => {
    //                 if (res.status === 201 || res.status === 200) {
    //                     this.messageService.add({ severity: 'success', summary: '控制器删除成功', detail: '' });
    //                     // this.loadData();
    //                     this.datas = this.datas.filter(c => this.selectedControllers.indexOf(c) === -1);
    //                     this.selectedControllers = [];
    //                     return;
    //                 }
    //                 this.messageService.add({ severity: 'error', summary: '控制器删除失败', detail: '' });
    //             });
    //         } else {
    //         }
    //     });
    // }
    //
    // /* 控制器添加 */
    // addContr() {
    //     // this.display = true;
    //     const ref = this.dialogService.open(AddControllerDialogComponent, {
    //         header: '新增控制器',
    //         width: '600px',
    //         // height: '700px',
    //         data: {
    //             contr: null
    //         }
    //         // contentStyle: {'max-height': '1000px', 'overflow': 'auto'}
    //     });
    //
    //     ref.onClose.subscribe((contr: Controller) => {
    //         if (contr) {
    //             // this.controllerService.create(contr).subscribe(res => {
    //             //     if (res.status === 201 || res.status === 200) {
    //             //         this.datas.push(res.body);
    //             //         this.messageService.add({ severity: 'success', summary: '控制器添加成功', detail: '' });
    //             //         return;
    //             //     }
    //             //     this.messageService.add({ severity: 'error', summary: '控制器添加失败', detail: '' });
    //             // });
    //             this.loadData();
    //             console.log(contr);
    //         }
    //     });
    // }
    //
    // clear() {
    //     this.eventManager.broadcast({ name: 'info', content: '清除筛选条件' });
    // }
    //
    // loadLazy(event: LazyLoadEvent): void {
    //     this.param = [];
    //     this.pageParam = [];
    //     if (event.filters.global) {
    //         const filterValue = event.filters.global.value;
    //         if (filterValue !== '') {
    //             for (let i = 0; i < this.cols.length; i++) {
    //                 this.param.push([this.cols[i].field + '.contains', filterValue]);
    //                 this.pageParam.push([this.cols[i].field + '.contains', filterValue]);
    //             }
    //         }
    //     }
    //     const page = +event.first / +event.rows;
    //     this.pageParam.push(['page', page]);
    //     this.pageParam.push(['size', event.rows]);
    //     this.getData();
    // }
    //
    // getData(): void {
    //     this.loadingData = true;
    //     // this.controllerService.get(this.commonService.paramToStr(this.param)).subscribe(count => (this.totalCount = count));
    //     this.controllerService.getData(this.commonService.paramToStr(this.pageParam)).subscribe(res => {
    //         this.loadingData = false;
    //         this.datas = res.body;
    //         this.totalCount = parseInt(res.headers.get('X-Total-Count'), 10);
    //     });
    // }
}
