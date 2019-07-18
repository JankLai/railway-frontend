import axios from 'axios';
import router from '../router';


// axios 配置
axios.defaults.timeout = 8000;


// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (sessionStorage.token) { //判断token是否存在
      config.headers.Authorization = sessionStorage.token;  //将token设置成请求头
    }
    else{
      
      router.push({path:'/login'})   
    }
    return config;
    
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errno === 999) {
      router.replace('/');
      console.log("token过期");
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (localStorage.token) {  // 获取当前的token是否存在
        console.log("token存在");
        next();
      } else {
        console.log("token不存在");
        next({
          path: '/login', // 将跳转的路由path作为参数，登录成功后跳转到该路由
          query: {redirect: to.fullPath}
        })
      }
    }
    else { // 如果不需要权限校验，直接进入路由界面
      next();
    }
  });
  
export default axios;
