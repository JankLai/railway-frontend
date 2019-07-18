
import axios from "axios";

import router from '../router' 
// axios.defaults.baseURL = 'http:/127.0.0.1:8080'
axios.defaults.baseURL = 'http://101.132.112.15:8080'

export default {
  login: ({ commit }, payload) => {
    const params = new URLSearchParams();
    params.append('username', payload['username']);
    params.append('password', payload['password']);//this.$md5(payload['password'])
    axios
    .post("/user/login", params,{
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(function(response) {
      console.log(response)
      if(response.status == 200){
        window.sessionStorage['token'] = "Bearer "+response.data.token;
        window.sessionStorage['role'] = response.data.role.authority;
        let role = response.data.role.authority;
        if(role == "admin"){
          router.push({path:'/upload'})
          commit('SET_ROLE', '管理员')
        }      
        else {
          router.push({path:'/charts'})
          commit('SET_ROLE', '普通用户')
        }
          
        //登录页面设置管理员或普通用户      
      }       
      else
        alert("登录失败,请检查用户名及密码")
    })
    .catch(function(error) {
      alert("登录出现错误,请检查用户名及密码！");
      console.log(error);
    });
  },

  setRole : ({commit} , text) =>{
    commit('SET_ROLE' , text)
  },

  //获取【日期_货运量】
  getDateAmount : ({commit}) => {
    axios.
      get("/charts/date")
      .then(data => {
        // console.log(data.data)
        let dateAmount = data.data;
        for(var i = 0; i<dateAmount.length; i++) {
          var date = new Date(dateAmount[i]['date'])
          var mouthInt = parseInt(date.getMonth())+1 
          let dateString = date.getFullYear()+'-'+
          mouthInt+'-'+
          date.getDate()
          dateAmount[i]['date'] = dateString;       
        }
        commit("SET_DATE_AMOUNT", { dateAmount });
      })
      .catch(error => {
        console.log(error);
      });
  },
  //获取【货物运输类别_货运量】
  getTransportAmount : ({commit}) => {
    axios.
      get("/charts/transport")
      .then(data => {
        // console.log(data.data)
        let transportAmount = data.data;
        commit("SET_TRANSPORT_AMOUNT", { transportAmount });
      })
      .catch(error => {
        console.log(error);
      });
  },
  //获取【货物运输品类_货运量】
  getGoodsAmount : ({commit}) => {
    axios.
      get("/charts/goods")
      .then(data => {
        // console.log(data.data)
        let goodsAmount = data.data;
        commit("SET_GOODS_AMOUNT", { goodsAmount });
      })
      .catch(error => {
        console.log(error);
      });
  },
  //获取【OD区域_货运量】
  getOdAmount : ({commit}) => {
    axios.
      get("/charts/od")
      .then(data => {
        // console.log(data.data)
        let odAmount = data.data;
        commit("SET_OD_AMOUNT", { odAmount });
      })
      .catch(error => {
        console.log(error);
      });
  },
  uploadDateAmountFile :({commit}, payload) => {
    var formData = new FormData()
    formData.append("file", payload)
    axios
    .post("/upload/1", formData,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function(response) {
      console.log(response)
      if(response.status == 200)
        alert("文件上传成功！");
      else 
        alert("文件上传出了点问题")
    })
    .catch(function(error) {
      alert("文件上传出现错误！");
      console.log(error);
    });
  },
  uploadTransportAmountFile :({commit}, payload) => {
    var formData = new FormData()
    formData.append("file", payload)
    axios
    .post("/upload/2", formData,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function(response) {
      if(response.data['status'] == 'success')
        alert("文件上传成功！");
      else 
        alert("文件上传出了点问题")
    })
    .catch(function(error) {
      alert("文件上传出现错误！");
      console.log(error);
    });
  },
  uploadGoodsAmountFile :({commit}, payload) => {
    var formData = new FormData()
    formData.append("file", payload)
    axios
    .post("/upload/3", formData,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function(response) {
      if(response.data['status'] == 'success')
        alert("文件上传成功！");
      else 
        alert("文件上传出了点问题")
    })
    .catch(function(error) {
      alert("文件上传出现错误！");
      console.log(error);
    });
  },
  uploadOdAmountFile :({commit}, payload) => {
    var formData = new FormData()
    formData.append("file", payload)
    axios
    .post("/upload/4", formData,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function(response) {
      if(response.data['status'] == 'success')
        alert("文件上传成功！");
      else 
        alert("文件上传出了点问题")
    })
    .catch(function(error) {
      alert("文件上传出现错误！");
      console.log(error);
    });
  },
  //这里改改就好
  searchByDate :({commit}, payload) => {
    axios
      .post("/search/1", {
          date : payload.date
      })
      .then(function(response) {
        console.log(response)
        let searchResults = response.data;
        for(var i = 0; i<searchResults.length; i++) {
          var date = new Date(searchResults[i]['date'])
          var mouthInt = parseInt(date.getMonth())+1 
          let dateString = date.getFullYear()+'-'+
          mouthInt+'-'+
          date.getDate()
          searchResults[i]['date'] = dateString;       
        }
        commit("SEARCH", { searchResults });
        if (searchResults.length == 0) {
          alert("未能查到对应条件的记录。");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  searchByTransport :({commit}, payload) => {
    axios
      .post("/search/2", {
        transport : payload.transport
      })
      .then(function(response) {
        console.log(response)
        let searchResults = response.data;
        commit("SEARCH", { searchResults });
        if (searchResults.length == 0) {
          alert("未能查到对应条件的记录。");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  searchByGoods :({commit}, payload) => {
    axios
      .post("/search/3", {
        goods : payload.goods
      })
      .then(function(response) {
        console.log(response)
        let searchResults = response.data;
        commit("SEARCH", { searchResults });
        if (searchResults.length == 0) {
          alert("未能查到对应条件的记录。");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  searchByOD :({commit}, payload) => {
    axios
      .post("/search/4", {
        od : payload.od
      })
      .then(function(response) {
        console.log(response)
        let searchResults = response.data;
        commit("SEARCH", { searchResults });
        if (searchResults.length == 0) {
          alert("未能查到对应条件的记录。");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  //查询所有日期-货运量记录
  searchAllDate :({commit}) => {
    axios
      .get("/search/1")
      .then(function(response) {
        console.log(response)
        let searchResults = response.data;
        for(var i = 0; i<searchResults.length; i++) {
          var date = new Date(searchResults[i]['date'])
          var mouthInt = parseInt(date.getMonth())+1 
          let dateString = date.getFullYear()+'-'+
          mouthInt+'-'+
          date.getDate()
          searchResults[i]['date'] = dateString;       
        }
        commit("SEARCH", { searchResults });
        if (searchResults.length == 0) {
          alert("未能查到对应条件的记录。");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  //搜索所有货运方式-货运量记录
  searchAllTransport :({commit}) => {
    axios
      .get("/search/2")
      .then(function(response) {
        console.log(response)
        let searchResults = response.data;
        commit("SEARCH", { searchResults });
        if (searchResults.length == 0) {
          alert("未能查到对应条件的记录。");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  //查询所有货运品类-货运量记录
  searchAllGoods :({commit}) => {
    axios
      .get("/search/3")
      .then(function(response) {
        console.log(response)
        let searchResults = response.data;
        commit("SEARCH", { searchResults });
        if (searchResults.length == 0) {
          alert("未能查到对应条件的记录。");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  //查询所有OD区域-货运量记录
  searchAllOd :({commit}) => {
    axios
      .get("/search/4")
      .then(function(response) {
        console.log(response)
        let searchResults = response.data;
        commit("SEARCH", { searchResults });
        if (searchResults.length == 0) {
          alert("未能查到对应条件的记录。");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  deleteByDate: ({ commit }, id) => {
    axios
      .delete(`/delete/1/${id}`, {})
      .then(function(response) {
        commit("DELETE", { id });
        return "success";
      })
      .catch(function(error) {
        alert("出现错误！");
        console.log(error);
      });
  },
  deleteByTransport: ({ commit }, id) => {
    axios
      .delete(`/delete/2/${id}`, {})
      .then(function(response) {
        commit("DELETE", { id });
        return "success";
      })
      .catch(function(error) {
        alert("出现错误！");
        console.log(error);
      });
  },
  deleteByGoods: ({ commit }, id) => {
    axios
      .delete(`/delete/3/${id}`, {})
      .then(function(response) {
        commit("DELETE", { id });
        return "success";
      })
      .catch(function(error) {
        alert("出现错误！");
        console.log(error);
      });
  },
  deleteByOd: ({ commit }, id) => {
    axios
      .delete(`/delete/4/${id}`, {})
      .then(function(response) {
        commit("DELETE", { id });
        return "success";
      })
      .catch(function(error) {
        alert("出现错误！");
        console.log(error);
      });
  },

  updateByDate: ({ commit }, payload) => {
    axios
      .put('/update/1/', {
        id : payload.id,
        date: payload.date,
        amount : payload.amount
      })
      .then(function(response) {
        alert("修改记录成功");
        commit("UPDATE", { payload });
      })
      .catch(function(error) {
        alert("出现错误！");
        console.log(error);
      });
  },

  updateByTransport: ({ commit }, payload) => {
    axios
      .put('/update/2', {
        id : payload.id,
        transport: payload.transport,
        amount : payload.amount
      })
      .then(function(response) {
        alert("修改记录成功");
        commit("UPDATE", { payload });
      })
      .catch(function(error) {
        alert("出现错误！");
        console.log(error);
      });
  },

  updateByGoods: ({ commit }, payload) => {
    axios
      .put('/update/3', {
        id : payload.id,
        goods: payload.goods,
        amount : payload.amount
      })
      .then(function(response) {
        alert("修改记录成功");
        commit("UPDATE", { payload });
      })
      .catch(function(error) {
        alert("出现错误！");
        console.log(error);
      });
  },

  updateByOd: ({ commit }, payload) => {
    axios
      .put('/update/4', {
        id : payload.id,
        od: payload.od,
        amount : payload.amount
      })
      .then(function(response) {
        alert("修改记录成功");
        commit("UPDATE", { payload });
      })
      .catch(function(error) {
        alert("出现错误！");
        console.log(error);
      });
  },

  setFooterText: ({ commit }, text) => {
    commit("SET_FOOTER_TEXT", {text})
  },

  //获取地图数据
  getData : ({commit}) => {
    axios.
      get("/search/odAmount")
      .then(data => {
        // console.log(data.data)
        let odAmount = data.data;
        commit("SET_DATA", { odAmount });
      })
      .catch(error => {
        console.log(error);
      });
  },

  getGeoCoordMap : ({commit}) => {
    axios.
      get("/search/odLocation")
      .then(data => {
        // console.log(datSET_GEOCOORDMAPa.data)
        let odLocation = data.data;
        commit("SET_GEOCOORDMAP", { odLocation });
      })
      .catch(error => {
        console.log(error);
      });
  }



};
