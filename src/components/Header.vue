<template>
  <div class="wrap">
    <header class="header">
      <h1>铁路大数据</h1>
      <button id='exit' title='退出登录' @click="exit()">⛔</button>
      <div id="nav">      
        <router-link to="/charts"><i class="fas fa-chart-line"></i>图表</router-link>   |
        <router-link to="/search"><i class="fas fa-search"></i>搜索</router-link>    |
        <router-link to="/upload"> 📂</router-link>   |
        <router-link to="/analyze"><i class="fas fa-pencil-alt"></i>分析</router-link>   |
        <!-- <router-link to="/about"><i class="fas fa-map-marker"></i>关于</router-link>   | -->
        <router-link to="/map">货运量地图</router-link>
      </div> 
      <p>当前登录角色 : 
        <span> {{ this.role }}</span>
      </p>

  </header>
  </div>
  
</template>

<script>
import {mapState, mapActions} from 'vuex'
import router from '../router'
export default {
  name: "Header",
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      'role'
    ])
  },
  mounted() {
    if(sessionStorage.getItem("role") == "admin"){
      this.role = "管理员"
    }
    else if(sessionStorage.getItem("role") == "user"){
      this.role = "普通用户"
    }
  },
  methods: {
    ...mapActions([
      'setRole'
    ]),
    exit(){
      router.replace('/');
      this.setRole('未登录')
      sessionStorage.removeItem("role")
    }
  },
 
  
}
</script>

<style scoped>

.wrap {
  background: linear-gradient(#1F4A99 ,#fff) ;
  height: 19%;
  color: antiquewhite;
  text-align: center;
  margin-bottom: 0;
  position: fixed;
  top: 0;
  z-index: 1;
  left : 0;
  right : 0;
}

.header {
  background: url('../assets/train.png') center ;
  height: 120px;
  color: antiquewhite;
  text-align: center;
  margin-bottom: 0;
  position: fixed;
  top: 0;
  z-index: 1;
  left : 0;
  right : 0;
}

.header a {
  color: #fff;
  padding-right: 5px;
  text-decoration: none;
}

.header p {
  color: #fff;
  padding-right: 5px;
  text-decoration: none;
  float: right;
  color: black;
  font-weight: bold
}
span {
  color: #fff;
  padding-right: 5px;
  text-decoration: none;
  float: right;
  color: rgb(50, 39, 206);
  font-weight: bold
}

#exit {
  background: transparent;
  border: none;
  float: right;
}
</style>


