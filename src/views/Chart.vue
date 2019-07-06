<template>
        <div class="chart">     
            <IEcharts class="echarts" :option="dataBar" :loading="loading"></IEcharts>                
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
</style>
