import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef, LazyLoadEvent, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { ROW_NUM } from 'app/app.constants';
import { DataService } from 'app/service/data.service';
import { ConfirmService } from 'app/shared/confirmDialog/confirm.service';
import * as echarts from 'echarts';

@Component({
    selector: 'jhi-addTask',
    templateUrl: './addTask.component.html',
    styles: []
})
export class AddTaskComponent implements OnInit {
    constructor(
        // private principal: Principal,

        private router: Router,
        private dialogService: DialogService,
        private eventManager: JhiEventManager,
        private messageService: MessageService,
        private dataService: DataService,
        private confirmationService: ConfirmService,
        public ref: DynamicDialogRef
    ) {}

    ngOnInit() {}

    addContr(tsk) {
        this.dataService.addTaskinfo(tsk).subscribe(res => {
            if (res.status === 201 || res.status === 200) {
                this.messageService.add({ severity: 'success', summary: '控制器添加成功', detail: '' });
                this.ref.close(res.body);
                return;
            }
            this.messageService.add({ severity: 'error', summary: '控制器添加失败', detail: '' });
        });
    }
}
