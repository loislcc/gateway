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
        const tileConfig = {
            tiles_ext: '.png', // 瓦片图的后缀 ------ 根据需要修改，一般是 .png .jpg
            tiles_dir: '../../content/lib/maptile', // 瓦片图的目录，为空默认在 baidumap_v2/tiles/ 目录
            home: ''
        };

        // 改写 API中的 getTilesUrl 方法,采用本地的瓦片图来渲染
        const tileLayer = new BMap.TileLayer({
            isTransparentPng: true
        });
        tileLayer.getTilesUrl = function(tileCoord, zoom) {
            const x = tileCoord.x;
            const y = tileCoord.y;
            return tileConfig.tiles_dir + '/' + zoom + '/' + x + '/' + y + tileConfig.tiles_ext;
        };

        const map = new BMap.Map('map');
        map.addTileLayer(tileLayer);
        map.centerAndZoom(new BMap.Point(120.201929, 30.275255), 15);
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        this.data_info = [[120.187564, 30.262842, '10.4.10.10'], [120.197122, 30.266367, '涵洞']];

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

        let cr = new BMap.CopyrightControl(); // 设置版权控件位置
        map.addControl(cr); // 添加版权控件
        let bs = map.getBounds(); // 返回地图可视区域
        cr.addCopyright({ id: 1, content: "<a href='#' style='font-size:20px;background:yellow'>离线地图API V2.0 </a>", bounds: bs });
    }
}
