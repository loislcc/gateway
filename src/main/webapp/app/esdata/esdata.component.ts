import { Component, OnInit } from '@angular/core';
import { DialogService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { ROW_NUM } from 'app/app.constants';
import { DataService } from 'app/service/data.service';
import { ConfirmService } from 'app/shared/confirmDialog/confirm.service';
import * as echarts from 'echarts';
import { AddTaskComponent } from 'app/esdata/addTask.component';
import { Task } from 'app/data/Task.model';

@Component({
    selector: 'jhi-esdata',
    templateUrl: './esdata.component.html',
    styles: []
})
export class EsdataComponent implements OnInit {
    cols: any[];
    datas: any[];
    rows: number;
    loadingData: boolean;
    selectedInfo: any[];
    totalCount: number;
    status: any;
    showDialog: boolean;

    innercols: any[];
    innerdatas: any[];
    loadinginnerData: boolean;
    totalinnerCount: number;
    svg: any;
    regionOptions;
    treedata: any;
    task: Task;

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
            { field: 'name', header: '名称' },
            { field: 'type', header: '类型' },
            { field: 'startime', header: '目标开始时间' },
            { field: 'endtime', header: '目标结束时间' },
            { field: 'realtime', header: '操作时间' },
            { field: 'status', header: '状态' }
        ];
        this.innercols = [
            { field: 'name', header: '名称' },
            { field: 'type', header: '类型' },
            { field: 'vnode', header: '虚拟节点' },
            { field: 'rnode', header: '物理节点' },
            { field: 'date', header: '操作时间' },
            { field: 'pname', header: '父文件名称' }
        ];
        this.rows = ROW_NUM;
        this.showDialog = false;
        this.loadingData = false;
        this.getData();
    }

    showDetail(task) {
        console.log(task);
        this.showDialog = true;
        this.loadinginnerData = true;
        this.dataService.queryEsinfo(task.name).subscribe(e => {
            this.innerdatas = e.body;
            this.loadinginnerData = false;
            this.totalinnerCount = parseInt(e.headers.get('X-Total-Count'), 10);
            this.dataService.queryMapRelation().subscribe(d => {
                this.process(e.body, d.body);
                this.onSuccess();
            });
        });
    }
    addTask() {
        // this.display = true;
        const ref = this.dialogService.open(AddTaskComponent, {
            header: '新增控制器',
            width: '600px',
            // height: '700px',
            data: {
                contr: null
            }
            // contentStyle: {'max-height': '1000px', 'overflow': 'auto'}
        });

        ref.onClose.subscribe((tsk: Task) => {
            if (tsk) {
                this.getData();
                console.log(tsk);
            }
        });
    }

    onSuccess() {
        const dom = document.getElementById('treeSvg');
        console.log(dom);
        // var chart = echarts.getInstanceByDom(dom);
        //     chart.dispose();
        //     chart = echarts.init(dom);
        let myChart = echarts.getInstanceByDom(document.getElementById('treeSvg')); // 有的话就获取已有echarts实例的DOM节点。
        if (myChart == null) {
            // 如果不存在，就进行初始化。
            myChart = echarts.init(document.getElementById('treeSvg'));
        }
        this.regionOptions = {
            toolbox: {
                show: true,
                left: '5',
                top: '5',
                feature: {
                    myCollapse: {
                        show: true,
                        title: '刷新',
                        icon:
                            'path://M974.1,602.1c0,2.1-0.2,3.6-0.6,4.5c-27.2,114-84.2,206.4-171,277.2C715.7,954.6,614,990,497.4,990c-62.1,0-122.2-11.7-180.2-35.1s-109.8-56.8-155.4-100.2L79.5,937c-8.1,8.1-17.7,12.1-28.7,12.1c-11.1,0-20.6-4-28.7-12.1C14,929,10,919.4,10,908.3V622.5c0-11.1,4-20.6,12.1-28.7s17.7-12.1,28.7-12.1h285.8c11.1,0,20.6,4,28.7,12.1s12.1,17.7,12.1,28.7c0,11.1-4,20.6-12.1,28.7L278,738.6c30.2,28.1,64.4,49.8,102.7,65.1c38.3,15.3,78.1,23,119.3,23c57,0,110.2-13.8,159.5-41.5c49.3-27.6,88.9-65.7,118.7-114.2c4.7-7.2,16-32.1,33.8-74.6c3.4-9.8,9.8-14.7,19.1-14.7h122.5c5.5,0,10.3,2,14.4,6.1S974,596.6,974.1,602.1z M990,91.7v285.8c0,11.1-4,20.6-12.1,28.7c-8.1,8.1-17.7,12.1-28.7,12.1H663.3c-11.1,0-20.6-4-28.7-12.1c-8.1-8.1-12.1-17.7-12.1-28.7c0-11.1,4-20.6,12.1-28.7l88-88c-63-58.3-137.2-87.4-222.7-87.4c-57,0-110.2,13.8-159.5,41.5c-49.3,27.6-88.9,65.7-118.7,114.2c-4.7,7.2-16,32.1-33.8,74.6c-3.4,9.8-9.8,14.7-19.1,14.7h-127c-5.5,0-10.3-2-14.4-6.1c-4-4-6.1-8.8-6.1-14.4v-4.5c27.6-114,85.1-206.4,172.3-277.2C280.9,45.4,383,10,500,10c62.1,0,122.5,11.8,181.2,35.4s110.8,56.9,156.3,99.9L920.5,63c8.1-8.1,17.7-12.1,28.7-12.1c11.1,0,20.6,4,28.7,12.1C986,71,990,80.6,990,91.7L990,91.7z',
                        onclick() {
                            myChart.setOption({
                                series: [{ initialTreeDepth: 1 }]
                            });
                        }
                    },
                    myExpand: {
                        show: true,
                        title: '全部展开',
                        icon:
                            'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                        onclick() {
                            myChart.setOption({
                                series: [{ initialTreeDepth: -1 }]
                            });
                        }
                    },
                    saveAsImage: { show: true }
                }
            },
            series: [
                {
                    type: 'tree',
                    data: [this.treedata],
                    top: '1%',
                    left: '1%',
                    bottom: '1%',
                    right: '20%',
                    symbolSize: 7,
                    initialTreeDepth: 1,
                    label: {
                        normal: {
                            formatter(o) {
                                return '{color1|' + o.name + '}';
                            },
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left',
                            rich: {
                                color1: {
                                    color: '#008B00'
                                }
                            }
                        }
                    },
                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }
            ],
            tooltip: {
                formatter(o) {
                    if (o.data.type === 'rnode' || o.data.type === 'vnode') {
                        return o.data.status;
                    }
                    // const data = o.data;
                    // var res = data.alarmName;
                    // if (data.nodeName != "")
                    //     res += "<br>" + data.nodeName;
                    // if (data.portName != "")
                    //     res += "<br>" + data.portName;
                    // if (data.arriveTime != "")
                    //     res += "<br>" + data.arriveTime;
                    return o.data.name;
                }
            }
        };

        // chart.on("contextmenu", function (params) {
        //     var dataSource = $("#dataSource").val();
        //     if (params.data.id == -1)
        //         return;
        //     if (params.componentType === 'series') {
        //         getAlarmTopo(dataSource, params);
        //     }
        // });
    }

    deleteTask() {
        if (this.selectedInfo === undefined) {
            this.messageService.add({ severity: 'info', summary: '请选择需要删除的信息' });
            return;
        }
        this.confirmationService.confirm('删除信息').then(confirem => {
            if (confirem) {
                const idList = [];
                this.selectedInfo.forEach(c => {
                    idList.push(c.id);
                });
                this.dataService.deleteIDList(idList).subscribe(res => {
                    if (res.status === 201 || res.status === 200) {
                        this.messageService.add({ severity: 'success', summary: '信息删除成功', detail: '' });
                        // this.loadData();
                        this.datas = this.datas.filter(c => this.selectedInfo.indexOf(c) === -1);
                        this.selectedInfo = [];
                        return;
                    }
                    this.messageService.add({ severity: 'error', summary: '信息删除失败', detail: '' });
                });
            } else {
            }
        });
    }

    getData(): void {
        this.loadingData = true;
        this.dataService.queryTaskinfo().subscribe(res => {
            this.loadingData = false;
            this.datas = res.body;
            this.totalCount = parseInt(res.headers.get('X-Total-Count'), 10);
        });
    }
    refresh() {
        this.getData();
    }

    process(datas, relations) {
        const maprelation = new Map<any, any[]>();
        const vrmap = new Map<any, any[]>();
        const root = datas[0].pname;
        const downlist = new Set<string>();
        datas.forEach(s => {
            if (!maprelation.has(s.vnode)) {
                const tmp = [];
                tmp.push(s.name);
                maprelation.set(s.vnode, tmp);
            } else {
                const tmp1 = maprelation.get(s.vnode);
                tmp1.push(s.name);
                maprelation.set(s.vnode, tmp1);
            }
            if (!vrmap.has(s.rnode)) {
                const tmp2 = [];
                relations.forEach(k => {
                    if (k.rnode === s.rnode) {
                        tmp2.push(k.vnode);
                    }
                    if (k.status === 'down') {
                        downlist.add(k.rnode);
                        downlist.add(k.vnode);
                    }
                });
                vrmap.set(s.rnode, tmp2);
            }
        });
        const rootchildren = [];
        console.log(downlist);
        vrmap.forEach((value, key) => {
            const vf = [];
            value.forEach(v => {
                let flag = 'down';
                if (!downlist.has(v)) {
                    flag = 'up';
                }
                if (maprelation.has(v)) {
                    const files = maprelation.get(v);
                    const ttlist = [];
                    files.forEach(x => {
                        const tt = {
                            name: x,
                            type: 'file'
                        };
                        ttlist.push(tt);
                    });
                    const t1 = {
                        name: v,
                        children: ttlist,
                        type: 'vnode',
                        status: flag
                    };
                    vf.push(t1);
                } else {
                    vf.push({
                        name: v,
                        children: [],
                        type: 'vnode',
                        status: flag
                    });
                }
            });
            let flag2 = 'down';
            if (!downlist.has(key)) {
                flag2 = 'up';
            }
            const t2 = {
                name: key,
                children: vf,
                type: 'rnode',
                status: flag2
            };
            rootchildren.push(t2);
        });
        this.treedata = { name: root, children: rootchildren, type: 'root' };
        console.log(this.treedata);
    }
}
