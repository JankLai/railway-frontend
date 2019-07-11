<template>
  <div id="app">
    <Header />
      <b-container>
        <router-view />    
      </b-container>  
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';


export default {
  name:"app",
  components: {
    Header,
    Footer
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(rgb(80, 170, 250),#fff)
}
#nav a.router-link-exact-active {
  color: darkred;
  font-size: 20px;
  font-weight: bold;
  transition: 0.6s ease-in;
}
</style>
