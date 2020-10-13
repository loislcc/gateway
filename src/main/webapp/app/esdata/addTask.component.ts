import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef, LazyLoadEvent, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { ROW_NUM } from 'app/app.constants';
import { DataService } from 'app/service/data.service';
import { ConfirmService } from 'app/shared/confirmDialog/confirm.service';
import * as echarts from 'echarts';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'jhi-addtask',
    templateUrl: './addTask.component.html',
    styles: []
})
export class AddTaskComponent implements OnInit {
    formGroup: FormGroup;
    minDate: Date;
    // endminDate:
    get startime() {
        return this.formGroup.get('startime');
    }
    get endtime() {
        return this.formGroup.get('endtime');
    }
    get datanum() {
        return this.formGroup.get('datanum');
    }
    get checknum() {
        return this.formGroup.get('checknum');
    }
    get matrix() {
        return this.formGroup.get('matrix');
    }
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

    ngOnInit() {
        this.minDate = new Date();
    }

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
    save() {
        this.ref.close(this.formGroup.value);
    }
    closeDialog() {
        this.ref.close();
    }
}
