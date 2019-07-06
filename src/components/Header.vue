<template>
  <div class="wrap">
    <header class="header">
      <h1>铁路大数据</h1>
      <div id="nav">      
        <router-link to="/charts"><i class="fas fa-chart-line"></i>图表</router-link>   |
        <router-link to="/search"><i class="fas fa-search"></i>搜索</router-link>   |
        <router-link to="/analyze"><i class="fas fa-pencil-alt"></i>分析</router-link>   |
        <router-link to="/about"><i class="fas fa-map-marker"></i>关于</router-link>   |  
      </div> 
  </header>
  </div>
  
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>

.wrap {
  background: linear-gradient(#1F4A99 ,#fff) ;
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
</style>


