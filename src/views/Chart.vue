<template>
    <div class="chart">               
        <!--notMerge:数据不跟上一次的合并！！！-->
        <IEcharts :notMerge="true" v-if="boiler" class="echarts" :option="empty" :loading="loading"></IEcharts>
        <IEcharts :notMerge="true" v-if="isDate" class="echarts" :option="date" :loading="loading"></IEcharts>
        <IEcharts :notMerge="true" v-if="isTransport" class="echarts" :option="transport" :loading="loading"></IEcharts>
        <IEcharts :notMerge="true" v-if="isGoods" class="echarts" :option="goods" :loading="loading"></IEcharts>
        <IEcharts :notMerge="true" v-if="isOd" class="echarts" :option="od" :loading="loading"></IEcharts>
        <!-- <IEcharts v:if="" class="echarts" :option="object" :loading="loading"></IEcharts>
        <IEcharts v:if="" class="echarts" :option="object" :loading="loading"></IEcharts> -->       
        <b-button-group>
            <b-button id='btn1' @click="changeChart('btn1')">日期</b-button>
            <b-button id='btn2' @click="changeChart('btn2')">货物运输类别</b-button>
            <b-button id='btn3' @click="changeChart('btn3')">货物运输品类</b-button>
        </b-button-group>      
    </div>    
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
import IEcharts from 'vue-echarts-v3'
import 'echarts/lib/chart/bar'
import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/china.js';


import {option} from '../config/map'


export default {
    name: 'chart',
    
    data () {
        return {
            loading: false, //初始化为true,待actions获取完success后改为false
            empty : {},
            date: {
                // backgroundColor : '#4facfe',
                title: {
                    text: "日期——货运量走势",
                    x: "center"
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: false
                        },
                        saveAsImage: {
                            pixelRatio: 5
                        }
                    }
                },

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: "{b} : {c}吨"
                },
                xAxis: {
                    type: 'category',
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [],
                    type: 'line',
                    smooth: true
                }]
               
            }, //日期  ===>尝试用 Large Scale Bar Chart
            //  date: {

            transport: {
                title: {
                    text: "货运方式",
                    x: "center"
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: false
                        },
                        saveAsImage: {
                            pixelRatio: 5
                        }
                    }
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c}吨 ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    left: 20,
                    data: []
                },
                series: [
                    {
                        name: "货运量",
                        type: "pie",
                        radius: "75%",
                        center: ["50%", "55%"],
                        data: [
                    
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        },
                        avoidLabelOverlap: false,
                        //标签
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                formatter: '{b} {d}%',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比

                            textStyle : {                   
                                align : 'center',
                                baseline : 'middle',
                                fontFamily : '微软雅黑',
                                fontSize : 10,
                               
                            }
                            },
                        },
                    }
                ]
            },
            goods: {
                title: {
                    text: "货运品类",
                    x: "center"
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: false
                        },
                        saveAsImage: {
                            pixelRatio: 5
                        }
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c}吨 ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:[]
                },
                series: [
                    {
                        name:'货运量',
                        type:'pie',
                        radius: ['55%', '80%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[]
                    }
                ]
            },
            od: option,
            boiler : true,
            isDate:false,
            isTransport:false,
            isGoods:false,
            isOd:false,
            
        }
    },
    computed: {
        ...mapState([
            "data",
            "values",
            "dateAmount",
            "test",
            //日期_货运量X轴
            "dateAmountX",
            //日期_货运量Y轴  以下
            "dateAmountY",
            "transportAmountX",
            "transportAmountY",
            "goodsAmountX",
            "goodsAmountY",
            "odAmountX",
            "odAmountY",
            
        ])
    },
   
    components: {
        IEcharts
    },
    methods: {
        ...mapActions([
            'getDateAmount',
            'getTransportAmount',
            'getGoodsAmount',
            'getOdAmount',
            "setFooterText"
        ]),
        changeChart(id) {
            this.loading = false
            this.boiler =  false
            switch (id) {
                case 'btn1':  //时间
                    this.setFooterText("日期——货运量") 
                    this.date.xAxis.data = this.dateAmountX
                    this.date.series[0].data = this.dateAmountY
                    this.isDate = true
                    this.isTransport = false
                    this.isGoods = false;
                    this.isOd = false;
                    
                    break;
                case 'btn2':  //货运方式类别   
                    this.setFooterText("货运方式——货运量")        
                    this.isDate = false
                    this.isTransport = true
                    this.isGoods = false;
                    this.isOd = false;  
                    
                    if(this.transport.legend.data.length == 0){
                        this.transport.legend.data = this.transportAmountX
                        for(var i = 0; i<this.transportAmountX.length; i++) {
                            this.transport.series[0].data.push({
                                value: this.transportAmountY[i], 
                                name: this.transportAmountX[i]
                            })
                        } 
                    }
                              
                    break;
                case 'btn3':  //货运品类
                    this.setFooterText("货运品类——货运量")  
                    this.isDate = false
                    this.isTransport = false
                    this.isGoods = true;
                    this.isOd = false;

                    

                    if(this.goods.legend.data.length == 0){
                        this.goods.legend.data = this.goodsAmountX
                        for(var i = 0; i<this.goodsAmountX.length; i++) {
                            this.goods.series[0].data.push({
                                value: this.goodsAmountY[i], 
                                name: this.goodsAmountX[i]
                            })
                        } 
                    }
                      
                    break;
                case 'btn4':  //OD区域
                    this.isDate = false
                    this.isTransport = false
                    this.isGoods = false;
                    this.isOd = true;

                    this.getOdAmount()

                    this.setFooterText("OD区域——货运量")    
                    // this.date.xAxis.data = this.odAmountX
                    // this.date.yAxis.data = this.odAmountY
                    break;        
                default:
                    break;
            }
        },
        
    },
    mounted() {


        this.setFooterText("点击按钮查看对应报表")

        //初始时取数据
        if(this.dateAmountX.length == 0)
            this.getDateAmount()
        if(this.transportAmountX.length == 0)
            this.getTransportAmount()
        if(this.goodsAmountX.length == 0)
            this.getGoodsAmount()
 
        
       
        this.date.xAxis.data = this.dateAmountX;
        this.date.series[0].data = this.dateAmountY;

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
    height: 400px;
}

.echarts {
    width: 500px;
    height: 450px;
    margin-top: 10.5%;
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

.btn {
    background-color: rgb(87, 148, 218);
    color: black;
    margin-left: 10px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  
}
#btn3 {
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
}
.hide{
	opacity: 0;
}

</style>
