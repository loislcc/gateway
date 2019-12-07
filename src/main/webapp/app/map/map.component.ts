import { Component, OnInit } from '@angular/core';
import { TrackerService } from 'app/service/tracker.service';

declare var BMap: any;

@Component({
    selector: 'jhi-map',
    templateUrl: './map.component.html',
    styles: []
})
export class MapComponent implements OnInit {
    private data_info: any[];
    constructor(private trackerService: TrackerService) {}

    ngOnInit() {
        const map = new BMap.Map('map');
        map.centerAndZoom(new BMap.Point(116.417854, 39.921988), 15);
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        this.data_info = [[116.417854, 39.921988, '10.4.10.10'], [116.406605, 39.921585, '涵洞']];
        const opts = {
            width: 250, // 信息窗口宽度
            height: 150, // 信息窗口高度
            title: '标记详情', // 信息窗口标题
            enableMessage: true // 设置允许信息窗发送短息
        };
        for (let i = 0; i < this.data_info.length; i++) {
            const marker = new BMap.Marker(new BMap.Point(this.data_info[i][0], this.data_info[i][1])); // 创建标注
            // const content = data_info[i][2];
            const content =
                '<div style="margin:0;line-height:20px;padding:2px;">' +
                '<img src = "../../content/images/access.png" alt = "" style = "float: right; zoom:1; overflow: hidden; width: 100px; height: 100px; margin-left: 3px;"/>' +
                '名称：' +
                this.data_info[i][2] +
                '<br/> x：' +
                this.data_info[i][0] +
                '<br/> y：' +
                this.data_info[i][1] +
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
            this.data_info.forEach(e => {
                // 删除同IP 节点位置
                if (e[2] === data.ip) {
                    const allOverlay = map.getOverlays();
                    for (let j = 0; j < allOverlay.length; j++) {
                        if (allOverlay[j].toString() === '[object Marker]') {
                            if (allOverlay[j].getPosition().lng === e[0] && allOverlay[j].getPosition().lat === e[1]) {
                                map.removeOverlay(allOverlay[j]);
                            }
                        }
                    }
                }
            });
            this.data_info.push([data.selfLongitude, data.selfLatitude, data.ip]); // 保存IP和标注物位置
            this.data_info.push([data.Longitude, data.Latitude, data.category]);

            // 添加节点位置
            const x = data.selfLongitude;
            const y = data.selfLatitude;
            const marker = new BMap.Marker(new BMap.Point(x, y)); // 创建标注
            const content =
                '<div style="margin:0;line-height:20px;padding:2px;">' +
                '<img src = "../../content/images/access.png" alt = "" style = "float: right; zoom:1; overflow: hidden; width: 100px; height: 100px; margin-left: 3px;"/>' +
                '名称：' +
                data.ip +
                '<br/> x：' +
                x +
                '<br/> y：' +
                y +
                '<br/> 时间：' +
                data.currentTime +
                '</div>';

            map.addOverlay(marker); // 将标注添加到地图中
            addClickHandler(content, marker);

            // 添加标注物位置
            const cx = data.longitude;
            const cy = data.latitude;
            const cmarker = new BMap.Marker(new BMap.Point(cx, cy)); // 创建标注
            const ccontent =
                '<div style="margin:0;line-height:20px;padding:2px;">' +
                '<img src = "../../content/images/access.png" alt = "" style = "float: right; zoom:1; overflow: hidden; width: 100px; height: 100px; margin-left: 3px;"/>' +
                '名称：' +
                data.category +
                '<br/> x：' +
                cx +
                '<br/> y：' +
                cy +
                '<br/> 时间：' +
                data.currentTime +
                '</div>';

            map.addOverlay(cmarker); // 将标注添加到地图中
            addClickHandler(ccontent, cmarker);
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
