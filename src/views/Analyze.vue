<template>
  <div class="analyze">
    <!-- <h1></h1> -->
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: "analyze",
    methods: {
      ...mapActions([
        'setFooterText'
      ])
    },
    mounted() {
      this.setFooterText("对未来7天每天A站的货物发送量进行预测")
    },
}
</script>

<style scoped>
.analyze {
    margin-top: 10.7%;
    height: 480px;
}
</style>
