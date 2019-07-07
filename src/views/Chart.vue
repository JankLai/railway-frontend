<template>
        <div class="chart">     
            
            <IEcharts class="echarts" :option="dataBar" :loading="loading"></IEcharts>     
            <b-button-group>
                <b-button id='btn1' @click="changeChart('btn1')">时间</b-button>
                <b-button id='btn2' @click="changeChart('btn2')">货物运输类别</b-button>
                <b-button id='btn3' @click="changeChart('btn3')">货物运输品类</b-button>
                <b-button id='btn4' @click="changeChart('btn4')">OD区域</b-button>
            </b-button-group>
            <!-- <div id="graph-nav">      
                <router-link to="/date">时间</router-link>  |
                <router-link to="/transport">货物运输类别</router-link>   |
                <router-link to="/sort">货物运输品类</router-link>   |
                <router-link to="/od">OD区域</router-link>   |  
            </div>             -->
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
            loading: false, //初始化为true,待actions获取完success后改为true
            dataBar: {} //日期  ===>尝试用 Large Scale Bar Chart
        }
    },
    computed: {
        ...mapState([
            "data",
            "values"
        ])
    },
    mounted() {
        this.dataBar = {
                title: {
                    text: '柱状图'
                },
                tooltip: {},
                xAxis: {
                    data: this.data
                },
                yAxis: {},
                series: [{
                    name: '货运量',
                    type: 'bar',
                    data: this.values
                }],
                dataZoom:{
                    realtime:true, //拖动滚动条时是否动态更新图表数据
                    height:25,//滚动条高度
                    start:0,//滚动条开始位置（共100等份）
                    end:10//结束位置（共100等份） ,通过调参寻求最佳效果
                }  

            }
    },
    components: {
        IEcharts
    },
    methods: {
        changeChart(id) {
            switch (id) {
                case 'btn1':  //时间
                    
                    break;
                case 'btn2':  //货物运输类别
                    
                    break;
                case 'btn3':  //货物运输品类
                    
                    break;
                case 'btn4':  //OD区域
                    
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
