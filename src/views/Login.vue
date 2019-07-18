<template>
  <div id="bg" class="bg">
    <div class="login" @keyup.13="doLogin">
      <div class="form-horizontal login">
        <div class="logo">LOGIN</div>
        <div class="form-group input-group input-group-lg ">
          <!-- <span class="input-group-addon"><i class="fa fa-user" aria-hidden="true"></i></span> -->
          <input type="text" class=" form-control" placeholder="username" v-model="userInfo.username">
        </div>
        <div class="form-group input-group input-group-lg">
          <!-- <span class="input-group-addon"><i class="fa fa-key" aria-hidden="true"></i></span> -->
          <input type="password" class=" form-control" placeholder="password" v-model="userInfo.password">
        </div>
        <div class="form-group">
          <button class="form-control" @click="doLogin">登 录</button>
          <!--<button class="btn btn-default btn-sm form-control login-btn" @click="doLogin">登 录</button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8080'
export default {
  name: 'login',
  data () {
    return {
      userInfo :{
          username : 'user',
          password : 'user',
      },
      show : false,
    }
  },
  methods : {
    ...mapActions([
            'login',
            'getDateAmount',
            'getTransportAmount',
            'getGoodsAmount',
            'getOdAmount',
        ]),
      doLogin (){
          if (this.username == ''){
              alert('用户名不能为空');
              return false
          }
          if (this.password == ''){
              alert('密码名不能为空');
              return false
          }
          this.login(this.userInfo);
          
          // axios.post('/authentication/form',JSON.stringify(this.userInfo))
          //     .then(res => {
          //         console.log(res)
          //         if(res.status == 200){
          //             this.$store.commit('setToken',res.data);
          //             localStorage.userName = this.userInfo.userName;
          //             localStorage.token_expire = res.data.expire;
          //             localStorage.token = res.data.token;
          //             this.$notify({
          //                 title : '提示信息',
          //                 message : '登录成功',
          //                 type : 'success'
          //             });
          //             this.$router.push({path:'/upload'})
          //         }else {
          //             this.$notify({
          //                 title : '提示信息',
          //                 message : '账号或密码错误',
          //                 type : 'error'
          //             });
          //         }
          //     })
          //     .catch(err => {
          //         console.log(err)
          //     })
      }
  },
  mounted (){

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*.bg {*/
    /*!*background-color: aqua;*!*/
    /*background-image: url("../assets/bj.jpg");*/
    /*background-size:100% 100%*/
  /*}*/
  .login {
    /* position:absolute;
    top: 50%;
    left: 50%; */
    margin-top: 10%;
    margin-left: 20%;
    margin-right: 20%;

    height: 480px;
    
  }
  .login-btn {
    background-color: whitesmoke;
  }
  .logo {
    font-family: "DejaVu Sans Mono";
    color: lightblue;
    font-size: 60px;
  }
</style>