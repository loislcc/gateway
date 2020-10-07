import { Component, OnDestroy, OnInit } from '@angular/core';
import { TerminalService } from 'primeng/components/terminal/terminalservice';
import { ConsoleInfo } from 'app/app.constants';
import { ConsoletrackerService } from 'app/service/consoletracker.service';

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['footer.scss'],
    providers: [TerminalService]
})
export class FooterComponent implements OnInit, OnDestroy {
    property: any;
    constructor(private trackerService: ConsoletrackerService) {}

    ngOnInit() {
        let info: any = '';
        ConsoleInfo.forEach(e => {
            if (info === null || info === '' || info === undefined) {
                info = e.toString();
            } else {
                info = info + '\n' + e.toString();
            }
        });
        this.property = info;
        this.trackerService.unsubscribe();
        this.trackerService.disconnect();
        this.trackerService.setTopic('console');
        this.trackerService.connect();
        this.trackerService.subscribe();
        this.trackerService.receive().subscribe(data => {
            console.log(data.brief);
            const tmp = new Date() + ': ' + data.brief;
            ConsoleInfo.push(tmp);
            this.addData(tmp);
        });
    }

    addData(tmp) {
        this.property = this.property + '\n' + tmp;
    }

    ngOnDestroy() {
        this.trackerService.unsubscribe();
        this.trackerService.disconnect();
    }
}
