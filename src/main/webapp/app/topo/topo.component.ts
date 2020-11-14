import { Component, OnInit } from '@angular/core';
import { TrackerService } from 'app/service/tracker.service';

import { DataService } from 'app/service/data.service';
import * as d3 from 'd3';
import { SelectItem } from 'primeng/api';
declare var BMap: any;

@Component({
    selector: 'jhi-topo',
    templateUrl: './topo.component.html',
    styleUrls: ['topo.scss']
})
export class TopoComponent implements OnInit {
    width: any;
    height: any;
    svg: any;
    numberOptions: SelectItem[];
    number: any;
    synshow: boolean;

    constructor(private trackerService: TrackerService, private dataService: DataService) {}

    ngOnInit() {
        this.synshow = false;
        const res = {
            nodes: [{ id: 'edge1', name: 'edge1' }, { id: 'edge2', name: 'edge2' }, { id: 'edge3', name: 'edge3' }],
            links: [
                { source: 'edge1', target: 'edge2', content: '3' },
                { source: 'edge2', target: 'edge1', content: '1' },
                { source: 'edge1', target: 'edge3', content: '3' },
                { source: 'edge2', target: 'edge3', content: '1' }
            ]
        };
        this.onSuccess(res);
    }

    onSuccess(res) {
        console.log('okkk');
        const bk = d3.select('#topoSvg');
        const bound = (bk.node() as HTMLElement).getBoundingClientRect();
        this.width = bound.width;
        this.height = bound.height;
        const nodes = res.nodes;
        const links = res.links;
        this.doLinkMap(links);
        console.log(nodes);
        console.log(links);
        this.svg = d3.select('#topoSvg').select('svg');
        this.svg.attr('width', this.width);
        this.svg.attr('height', this.height);
        this.svg.selectAll('*').remove();
        const g = this.svg.append('g');
        const simulation = d3
            .forceSimulation()
            .force('link', d3.forceLink().id(d => d.id))
            .force('charge', d3.forceManyBody())
            .force(
                'collide',
                d3
                    .forceCollide(150)
                    .strength(0.2)
                    .iterations(1)
            )
            // .force('collide', d3.forceCollide(20).strength(0.2).iterations(1))
            .force('center', d3.forceCenter());

        var marker = this.svg
            .append('marker')
            .attr('id', 'resolved')
            .attr('markerUnits', 'userSpaceOnUse')
            .attr('viewBox', '0 -5 10 10') //坐标系的区域
            .attr('refX', 16) //箭头坐标
            .attr('refY', 0)
            .attr('markerWidth', 12) //标识的大小
            .attr('markerHeight', 12)
            .attr('orient', 'auto') //绘制方向，可设定为：auto（自动确认方向）和 角度值
            .attr('stroke-width', 2) //箭头宽度
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5') //箭头的路径
            .attr('fill', '#000000'); //箭头颜色

        const linkall = g
            .append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(links)
            .enter()
            .append('path')
            .attr('stroke-width', 3)
            .attr('id', function(d, i) {
                return 'edgepath' + i;
            })
            .style('stroke', '#999')
            .style('stroke-opacity', '1.0')
            .attr('stroke-width', 2)
            .style('fill', 'none')
            .attr('marker-end', 'url(#resolved)');
        // .on('dblclick', d => this.onLinkonedblclick(d));

        const node = g
            .append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('r', 10)
            .attr('fill', '#aec7e8')
            // .attr('id', d => 'idotn' + d.id)
            .call(
                d3
                    .drag()
                    .on('start', dragstarted)
                    .on('drag', dragged)
                    .on('end', dragended)
            )
            .on('dblclick', d => this.onNodeclick(d));

        const svg_texts = this.svg
            .selectAll('text')
            .data(nodes)
            .enter()
            .append('text')
            .style('fill', 'black')
            .attr('dx', 20)
            .attr('dy', 8)
            .text(d => d.name);

        const edgelabels = this.svg
            .selectAll('.edgelabel')
            .data(links)
            .enter()
            .append('text')
            .style('pointer-events', 'none')
            .attr('font-size', 15)
            .attr('fill', '#000000');

        edgelabels
            .append('textPath')
            .attr('xlink:href', function(d, i) {
                return '#edgepath' + i;
            })
            .style('text-anchor', 'middle')
            .style('pointer-events', 'none')
            .attr('startOffset', '50%')
            .text(d => d.content);

        simulation.nodes(nodes).on('tick', () => {
            linkall.attr('d', function(d) {
                if (d.size % 2 !== 0 && d.linknum === 1) {
                    // 如果两个节点之间的连接线数量为奇数条，则设置编号为1的连接线为直线，其他连接线会均分在两边
                    return 'M' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
                }
                // 根据连接线编号值来动态确定该条椭圆弧线的长半轴和短半轴，当两者一致时绘制的是圆弧
                // 注意A属性后面的参数，前两个为长半轴和短半轴，第三个默认为0，第四个表示弧度大于180度则为1，小于则为0，这在绘制连接到相同节点的连接线时用到；第五个参数，0表示正角，1表示负角，即用来控制弧形凹凸的方向。本文正是结合编号的正负情况来控制该条连接线的凹凸方向，从而达到连接线对称的效果
                const curve = 1.5;
                const homogeneous = 1.2;
                const dx = d.target.x - d.source.x;
                const dy = d.target.y - d.source.y;
                let dr = (Math.sqrt(dx * dx + dy * dy) * (d.linknum + homogeneous)) / (curve * homogeneous);
                // 当节点编号为负数时，对弧形进行反向凹凸，达到对称效果
                if (d.linknum < 0) {
                    dr = (Math.sqrt(dx * dx + dy * dy) * (-1 * d.linknum + homogeneous)) / (curve * homogeneous);
                    return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,0 ' + d.target.x + ',' + d.target.y;
                }
                return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + d.target.x + ',' + d.target.y;
            });

            node.attr('cx', d => d.x).attr('cy', d => d.y);
            svg_texts.attr('x', d => d.x).attr('y', d => d.y);
        });

        simulation.force('link').links(links);

        simulation
            .force('center')
            .x(this.width / 2)
            .y(this.height / 2);

        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
    }

    onNodeclick(r) {}

    start() {
        this.synshow = true;
        this.dataService.startgame('name').subscribe(res => {
            this.synshow = false;
        });
    }

    searchResult() {}

    doLinkMap(links) {
        const linkGroup = {};
        // 对连接线进行统计和分组，不区分连接线的方向，只要属于同两个实体，即认为是同一组
        const linkmap = {};
        for (let i = 0; i < links.length; i++) {
            const key =
                links[i].source < links[i].target ? links[i].source + ':' + links[i].target : links[i].target + ':' + links[i].source;
            if (!linkmap.hasOwnProperty(key)) {
                linkmap[key] = 0;
            }
            linkmap[key] += 1;
            if (!linkGroup.hasOwnProperty(key)) {
                linkGroup[key] = [];
            }
            linkGroup[key].push(links[i]);
        }
        for (let i = 0; i < links.length; i++) {
            const key =
                links[i].source < links[i].target ? links[i].source + ':' + links[i].target : links[i].target + ':' + links[i].source;
            links[i].size = linkmap[key];
            // 同一组的关系进行编号
            const group = linkGroup[key];
            const keyPair = key.split(':');
            const type = 'noself'; // 标示该组关系是指向两个不同实体还是同一个实体
            // 给节点分配编号
            this.setLinkNumber(group, type);
        }
    }
    setLinkNumber(group, type) {
        if (group.length === 0) {
            return;
        }
        // 对该分组内的关系按照方向进行分类，此处根据连接的实体ASCII值大小分成两部分
        const linksA = [],
            linksB = [];
        for (let i = 0; i < group.length; i++) {
            const link = group[i];
            if (link.source < link.target) {
                linksA.push(link);
            } else {
                linksB.push(link);
            }
        }
        // 确定关系最大编号。为了使得连接两个实体的关系曲线呈现对称，根据关系数量奇偶性进行平分。
        // 特殊情况：当关系都是连接到同一个实体时，不平分
        let maxLinkNumber = 1;
        if (type === 'self') {
            maxLinkNumber = group.length;
        } else {
            maxLinkNumber = group.length % 2 === 0 ? group.length / 2 : (group.length + 1) / 2;
        }
        // 如果两个方向的关系数量一样多，直接分别设置编号即可
        if (linksA.length === linksB.length) {
            let startLinkNumber = 1;
            for (let i = 0; i < linksA.length; i++) {
                linksA[i].linknum = startLinkNumber++;
            }
            startLinkNumber = 1;
            for (let i = 0; i < linksB.length; i++) {
                linksB[i].linknum = startLinkNumber++;
            }
        } else {
            // 当两个方向的关系数量不对等时，先对数量少的那组关系从最大编号值进行逆序编号，然后在对另一组数量多的关系从编号1一直编号到最大编号，再对剩余关系进行负编号
            // 如果抛开负号，可以发现，最终所有关系的编号序列一定是对称的（对称是为了保证后续绘图时曲线的弯曲程度也是对称的)
            let biggerLinks, smallerLinks;
            if (linksA.length > linksB.length) {
                biggerLinks = linksA;
                smallerLinks = linksB;
            } else {
                biggerLinks = linksB;
                smallerLinks = linksA;
            }

            let startLinkNumber = maxLinkNumber;
            for (let i = 0; i < smallerLinks.length; i++) {
                smallerLinks[i].linknum = startLinkNumber--;
            }
            const tmpNumber = startLinkNumber;
            startLinkNumber = 1;
            let p = 0;
            while (startLinkNumber <= maxLinkNumber) {
                biggerLinks[p++].linknum = startLinkNumber++;
            }
            // 开始负编号
            startLinkNumber = 0 - tmpNumber;
            for (let i = p; i < biggerLinks.length; i++) {
                biggerLinks[i].linknum = startLinkNumber++;
            }
        }
    }
}
