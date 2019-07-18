<template>
    <div class="chart">               
        <!--notMerge:数据不跟上一次的合并！！！-->
        <IEcharts :notMerge="true" v-if="isOd" class="echarts" :option="od" :loading="loading"></IEcharts>
        <!-- <IEcharts v:if="" class="echarts" :option="object" :loading="loading"></IEcharts>
        <IEcharts v:if="" class="echarts" :option="object" :loading="loading"></IEcharts> -->            
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
        
            od: option,
            isOd: true,
            
        }
    },

    computed: {
        ...mapState([
            "odAmountX",
            "odAmountY",
            
        ])
    },
   
    components: {
        IEcharts
    },
    methods: {
        ...mapActions([
            'getOdAmount',
            "setFooterText"
        ]),
        
    },
    mounted() {

        this.setFooterText("OD区域--货运量：起止点两地之间的货运量")

        //初始时取数据
        if(this.odAmountX.length == 0)
            this.getOdAmount()
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
    height: 450px;
}
    
.echarts {
  
    height: 600px;
    margin-top: 10.7%;
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
.hide{
	opacity: 0;
}

</style>
