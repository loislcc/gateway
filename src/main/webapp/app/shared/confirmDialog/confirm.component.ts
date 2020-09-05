import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/api';

@Component({
    templateUrl: './confirm.html'
})
export class ConfirmComponent implements OnInit {
    data: any;
    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

    ngOnInit() {
        this.data = this.config.data;
    }

    /* 取消 */
    close(): void {
        this.data.confirm = false;
        this.ref.close(this.data.confirm);
    }
    /* 确认 */
    confirm() {
        this.data.confirm = true;
        this.ref.close(this.data.confirm);
    }
}
