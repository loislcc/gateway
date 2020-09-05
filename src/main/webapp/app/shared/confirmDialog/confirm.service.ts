import { Injectable } from '@angular/core';
import { ConfirmComponent } from 'app/shared/confirmDialog/confirm.component';
import { DialogService } from 'primeng/api';

@Injectable()
export class ConfirmService {
    constructor(public dialogService: DialogService) {}

    /* 调用确认窗口与处理返回的数据，使用Promise.then只会执行一此 */
    confirm(msg: string): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            const dialogRef = this.dialogService.open(ConfirmComponent, {
                width: '400px',
                data: {
                    msg,
                    confirm: false
                }
            });

            dialogRef.onClose.subscribe(confirm => {
                resolve(confirm);
            });
        });
    }
}
