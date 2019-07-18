<template>
    <div class="chart">               
        <!--notMerge:数据不跟上一次的合并！！！-->
        <IEcharts :notMerge="true" v-if="isOd" class="echarts" :option="od" :loading="loading"></IEcharts>
        <button id="load" @click="fetch()">👉load👈</button>         
    </div>    
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
import IEcharts from 'vue-echarts-v3'
import 'echarts/lib/chart/bar'
import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/china.js';
import { convertData } from '../config/map';


// import {option} from '../config/map'


export default {
    name: 'mapp',
    
    data () {
        return {
            loading: false, //初始化为true,待actions获取完success后改为false
            isOd: true,
            od :{
                // backgroundColor: '#404a59',
                title: {
                    text: '各铁路站与A站的货物交流量',
                    // subtext: 'data from PM25.in',
                    // sublink: 'http://www.pm25.in',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter : function (value) {
                       return value.name+":"+value.value[2]+"吨"; 
                   }

                },
                bmap: {
                    center: [104.114129, 37.550339],
                    zoom: 5,
                    roam: true,
                    mapStyle: {
                        styleJson: [
                                {
                                    "featureType": "water",
                                    "elementType": "all",
                                    "stylers": {
                                        "color": "#044161"
                                    }
                                },
                                {
                                    "featureType": "land",
                                    "elementType": "all",
                                    "stylers": {
                                        "color": "#004981"
                                    }
                                },
                                {
                                    "featureType": "boundary",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#064f85"
                                    }
                                },
                                {
                                    "featureType": "railway",
                                    "elementType": "all",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                },
                                {
                                    "featureType": "highway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#004981"
                                    }
                                },
                                {
                                    "featureType": "highway",
                                    "elementType": "geometry.fill",
                                    "stylers": {
                                        "color": "#005b96",
                                        "lightness": 1
                                    }
                                },
                                {
                                    "featureType": "highway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                },
                                {
                                    "featureType": "arterial",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#004981"
                                    }
                                },
                                {
                                    "featureType": "arterial",
                                    "elementType": "geometry.fill",
                                    "stylers": {
                                        "color": "#00508b"
                                    }
                                },
                                {
                                    "featureType": "poi",
                                    "elementType": "all",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                },
                                {
                                    "featureType": "green",
                                    "elementType": "all",
                                    "stylers": {
                                        "color": "#056197",
                                        "visibility": "off"
                                    }
                                },
                                {
                                    "featureType": "subway",
                                    "elementType": "all",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                },
                                {
                                    "featureType": "manmade",
                                    "elementType": "all",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                },
                                {
                                    "featureType": "local",
                                    "elementType": "all",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                },
                                {
                                    "featureType": "arterial",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                },
                                {
                                    "featureType": "boundary",
                                    "elementType": "geometry.fill",
                                    "stylers": {
                                        "color": "#029fd4"
                                    }
                                },
                                {
                                    "featureType": "building",
                                    "elementType": "all",
                                    "stylers": {
                                        "color": "#1a5787"
                                    }
                                },
                                {
                                    "featureType": "label",
                                    "elementType": "all",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }
                        ]
                    }
                },
                series : [
                    {
                        name: '货运量',
                        type: 'scatter',
                        coordinateSystem: 'bmap',
                        data: [],//convertData(data),
                        symbolSize: function (val) {

                            return val[2] / 1000000;
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#ddb926'
                            }
                        }
                    },
                    {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'bmap',
                    data: [],
                    symbolSize: function (val) {
                        return val[2] / 1000000;
                    },
                    showEffectOn: 'emphasis',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                },
                    
                ]
            },
            convertData : function (data, geo) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geo[data[i].name]; //
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            }
            
        }
    },

    computed: {
        ...mapState([
            "data",
            "geoCoordMap",
            
        ])
    },
   
    components: {
        IEcharts
    },
    methods: {
        ...mapActions([
            'getData',
            "getGeoCoordMap",
            "setFooterText"
        ]),
        renderItem(params, api) {
            var coords = [
                [116.7,39.53],
                [103.73,36.03],
                [112.91,27.87],
                [120.65,28.01],
                [119.57,39.95]
            ];
            var points = [];
            for (var i = 0; i < coords.length; i++) {
                points.push(api.coord(coords[i]));
            }
            var color = api.visual('color');

            return {
                type: 'polygon',
                shape: {
                    points: echarts.graphic.clipPointsByRect(points, {
                        x: params.coordSys.x,
                        y: params.coordSys.y,
                        width: params.coordSys.width,
                        height: params.coordSys.height
                    })
                },
                style: api.style({
                    fill: color,
                    stroke: echarts.color.lift(color)
                })
            };
        },
        fetch(){

            this.od.series[0].data = this.convertData(this.data, this.geoCoordMap);
            let temp =  this.convertData(this.data, this.geoCoordMap);
            this.od.series[1].data = temp.sort(
                function (a, b) {
                        return b.value[2] - a.value[2];
             }).slice(0, 6)
 
        }   

        
    },
  
    mounted() {

        this.setFooterText("OD区域--货运量：起止点两地之间的货运量")
        this.getData();
        this.getGeoCoordMap();
      
        //初始时取数据

        //console.log("初始化百度地图脚本...");
        const AK = "K3Fl3vqp4K0f5dRV6WSx2R7QEWZTnAiN"//C5dae37ba0a97216555b8bf2b76bacfd";
        const BMap_URL = "https://api.map.baidu.com/api?v=2.0&ak="+ AK +"&s=1&callback=onBMapCallback";
        return new Promise((resolve, reject) => {
            // 如果已加载直接返回
            if(typeof BMap !== "undefined") {
                resolve(BMap);
                return true;
            }
            // 百度地图异步加载回调处理
            window.onBMapCallback = function () {
                console.log("百度地图脚本初始化成功...");
                resolve(BMap);
                // this.getData();
                // this.getGeoCoordMap();
                // this.od.bmap.series[0].data = convertData(this.data, this.geoCoordMap);
                // console.log(this.data, this.geoCoordMap)
            };

      
            // 插入script脚本
            let scriptNode = document.createElement("script");
            scriptNode.setAttribute("type", "text/javascript");
            scriptNode.setAttribute("src", BMap_URL);
            document.body.appendChild(scriptNode);


            

            
        });

        
    },
}
 
</script>

<style scoped>
.chart {
    height: 450px;
}
    
.echarts {
  
    height: 600px;
    margin-top: 120px;
    text-align: center;
}
.chart a {
  color: rgb(22, 46, 155);
  padding-right: 5px;
  text-decoration: none;
}
#graph-nav a.router-link-exact-active {
  color: rgb(182, 17, 66);
  font-size: 20px;
  font-weight: bold
}

#load{
    background: transparent;
    border: none;
    font-weight: bold
}
</style>
