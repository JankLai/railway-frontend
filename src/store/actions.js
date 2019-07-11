import axios from "axios";
export default {
  login: ({ commit }, payload) => {},
  //获取【日期_货运量】
  getDateAmount : ({commit}) => {
    axios.
      get("http://127.0.0.1:8080/charts/date")
      .then(data => {
        // console.log(data.data)
        let dateAmount = data.data;
        commit("SET_DATE_AMOUNT", { dateAmount });
      })
      .catch(error => {
        console.log(error);
      });
  },
  //获取【货物运输类别_货运量】
  getTransportAmount : ({commit}) => {
    axios.
      get("http://127.0.0.1:8080/charts/transport")
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
      get("http://127.0.0.1:8080/charts/goods")
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
      get("http://127.0.0.1:8080/charts/od")
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
    .post("http://127.0.0.1:8080/upload/1", formData,{
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
  uploadTransportAmountFile :({commit}, payload) => {
    var formData = new FormData()
    formData.append("file", payload)
    axios
    .post("http://127.0.0.1:8080/upload/2", formData,{
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
    .post("http://127.0.0.1:8080/upload/3", formData,{
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
    .post("http://127.0.0.1:8080/upload/4", formData,{
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
  getAllAlumni: ({ commit }) => {
    axios
      .get("http://101.132.112.15:8080/alumni/all")
      .then(data => {
        // console.log(data.data)
        let alumnis = data.data;
        commit("SET_ALUMNIS", { alumnis });
      })
      .catch(error => {
        console.log(error);
      });
  },


};
