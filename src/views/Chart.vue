<template>
        <div class="chart">               
            <!--notMerge:数据不跟上一次的合并！！！-->
            <IEcharts :notMerge="true" v-if="isBar" class="echarts" :option="dataBar" :loading="loading"></IEcharts>
            <IEcharts :notMerge="true" v-if="isPie" class="echarts" :option="dataPie" :loading="loading"></IEcharts>
            <!-- <IEcharts v:if="" class="echarts" :option="object" :loading="loading"></IEcharts>
            <IEcharts v:if="" class="echarts" :option="object" :loading="loading"></IEcharts> -->   
            <b-button-group>
                <b-button id='btn1' @click="changeChart('btn1')">时间</b-button>
                <b-button id='btn2' @click="changeChart('btn2')">货物运输类别</b-button>
                <b-button id='btn3' @click="changeChart('btn3')">货物运输品类</b-button>
                <b-button id='btn4' @click="changeChart('btn4')">OD区域</b-button>
            </b-button-group>
        </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import IEcharts from 'vue-echarts-v3'
import 'echarts/lib/chart/bar'


export default {
    name: 'chart',
    data () {
        return {
            loading: false, //初始化为true,待actions获取完success后改为false
            dataBar: {}, //日期  ===>尝试用 Large Scale Bar Chart
            dataPie: {},
            isBar:true,
            isPie:false
        }
    },
    computed: {
        ...mapState([
            "data",
            "values",
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
    mounted() {
        this.getDateAmount()
        this.getTransportAmount()
        this.getGoodsAmount()
        this.getOdAmount()
        this.dataBar = {
            title: {
                text: "柱状图"
            },
            tooltip: {},
            xAxis: {
                data: this.data
            },
            yAxis: {},
            series: [
                {
                name: "货运量",
                type: "bar",
                data: this.values
                }
            ],
            dataZoom: {
                realtime: true, //拖动滚动条时是否动态更新图表数据
                height: 25, //滚动条高度
                start: 0, //滚动条开始位置（共100等份）
                end: 10 //结束位置（共100等份） ,通过调参寻求最佳效果
            }
        };

        this.dataPie = {
            title: {
                text: "饼图",
                x: "center"
            },
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: "vertical",
                left: "left",
                data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
            },
            series: [
                {
                name: "访问来源",
                type: "pie",
                radius: "55%",
                center: ["50%", "60%"],
                data: [
                    { value: 335, name: "直接访问" },
                    { value: 310, name: "邮件营销" },
                    { value: 234, name: "联盟广告" },
                    { value: 135, name: "视频广告" },
                    { value: 1548, name: "搜索引擎" }
                ],
                itemStyle: {
                    emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                }
                }
            ]
        }
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
        ]),
        changeChart(id) {
            switch (id) {
                case 'btn1':  //时间
                    this.isBar=true,
                    this.isPie=false
                    break;
                case 'btn2':  //货物运输类别            
                    this.isBar=false,
                    this.isPie=true                
                    break;
                case 'btn3':  //货物运输品类
                    // this.dataBar.xAxis.data = this.goodsAmountX
                    // this.dataBar.yAxis.data = this.goodsAmountY
                    break;
                case 'btn4':  //OD区域
                    // this.dataBar.xAxis.data = this.odAmountX
                    // this.dataBar.yAxis.data = this.odAmountY
                    break;        
                default:
                    break;
            }
        }
    },
}
 
</script>

<style scoped>
.chart {
    height: 400px;
}

.echarts {
    width: 500px;
    height: 400px;
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

.btn {
    background-color: rgb(87, 148, 218);
    color: black;
    margin-left: 10px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  
}
#btn4 {
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
}
</style>
