<template>
  <footer class="footer">
    <marquee width=800 scrollamount=4>🚝🚃🚃{{footer_text}}🚃🚃</marquee>
  </footer>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Footer',
  computed: {
    ...mapState([
      'footer_text'
    ])
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
    background: #333;
    text-align: center; 
    position: fixed;   
    z-index: 1;
    bottom: 0;
    left: 0;
    right: 0;
    color: #fdfdfd;
}
.footer p {
  margin : 0%;
  padding: 1px;
  color: #42b983;
}

</style>
