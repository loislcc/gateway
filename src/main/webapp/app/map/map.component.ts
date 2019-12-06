import { Component, OnInit } from '@angular/core';
import { TrackerService } from 'app/service/tracker.service';

declare var BMap: any;

@Component({
    selector: 'jhi-map',
    templateUrl: './map.component.html',
    styles: []
})
export class MapComponent implements OnInit {
    constructor(private trackerService: TrackerService) {}

    ngOnInit() {
        const map = new BMap.Map('map');
        map.centerAndZoom(new BMap.Point(116.417854, 39.921988), 15);
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        const data_info = [[116.417854, 39.921988, '建筑物'], [116.406605, 39.921585, '车辆'], [116.412222, 39.912345, '涵洞']];
        const opts = {
            width: 250, // 信息窗口宽度
            height: 250, // 信息窗口高度
            title: '标记详情', // 信息窗口标题
            enableMessage: true //设置允许信息窗发送短息
        };
        for (var i = 0; i < data_info.length; i++) {
            const marker = new BMap.Marker(new BMap.Point(data_info[i][0], data_info[i][1])); // 创建标注
            // const content = data_info[i][2];
            const content =
                '<div style="margin:0;line-height:20px;padding:2px;">' +
                '<img src = "../../content/images/access.png" alt = "" style = "float: right; zoom:1; overflow: hidden; width: 100px; height: 100px; margin-left: 3px;"/>' +
                '名称：' +
                data_info[i][2] +
                '<br/> x：' +
                data_info[i][0] +
                '<br/> y：' +
                data_info[i][1] +
                '</div>';

            map.addOverlay(marker); // 将标注添加到地图中
            addClickHandler(content, marker);
        }

        this.trackerService.unsubscribe();
        this.trackerService.disconnect();
        this.trackerService.setTopic('notification');
        this.trackerService.connect();
        this.trackerService.subscribe();
        this.trackerService.receive().subscribe(data => {
            console.log(data);
        });

        function addClickHandler(content, marker) {
            marker.addEventListener('click', function(e) {
                openInfo(content, e);
            });
        }
        function openInfo(content, e) {
            const p = e.target;
            const point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
            const infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
            map.openInfoWindow(infoWindow, point); //开启信息窗口
        }
    }
}
