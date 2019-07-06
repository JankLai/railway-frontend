<template>
  <footer class="footer">
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  
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
.footer a {
  color: #42b983;
}

ul {
  list-style: none;
  margin: 0
}
li {
  padding: 0 20px;
  display: inline-block;
  
}


  /* .header {
    background: #333;
    color: #fff;
    text-align: center;
    padding: 1.8% 0;
    margin-bottom: 0;
    position: fixed;
    top: 0;
    height: 110px;
    z-index: 1;
    width: 100%;
    color: #fdfdfd;
    
  }

  .header a {
    color: #fff;
    padding-right: 5px;
    text-decoration: none;
  } */
</style>
