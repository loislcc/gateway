import { Component, OnInit } from '@angular/core';
import { TrackerService } from 'app/service/tracker.service';

declare var BMap: any;

@Component({
    selector: 'jhi-map',
    templateUrl: './map.component.html',
    styles: []
})
export class MapComponent implements OnInit {
    initX: any;
    initY: any;

    constructor(private trackerService: TrackerService) {}

    ngOnInit() {
        this.initX = 116.35754;
        this.initY = 39.987037;

        const map = new BMap.Map('map');
        map.centerAndZoom(new BMap.Point(this.initX, this.initY), 18);

        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        const data_info = [[this.initX, this.initY, '设备']];
        const opts = {
            width: 250, // 信息窗口宽度
            height: 150, // 信息窗口高度
            title: '标记详情', // 信息窗口标题
            enableMessage: true // 设置允许信息窗发送短息
        };
        for (let i = 0; i < data_info.length; i++) {
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
            const x = data.selfLongitude + data.longitude;
            const y = data.selfLatitude + data.latitude;
            const marker = new BMap.Marker(new BMap.Point(x, y)); // 创建标注
            // const content = data_info[i][2];
            const content =
                '<div style="margin:0;line-height:20px;padding:2px;">' +
                '<img src = "../../content/images/access.png" alt = "" style = "float: right; zoom:1; overflow: hidden; width: 100px; height: 100px; margin-left: 3px;"/>' +
                '名称：' +
                data.category +
                '<br/> x：' +
                x +
                '<br/> y：' +
                y +
                '<br/> 时间：' +
                data.currentTime +
                '</div>';

            map.addOverlay(marker); // 将标注添加到地图中
            addClickHandler(content, marker);
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
            map.openInfoWindow(infoWindow, point); // 开启信息窗口
        }
    }
}
