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
  getLimitAlumni: ({ commit }, payload) => {
    axios
      .get(
        `http://101.132.112.15:8080/alumni/page/${payload.pageNum}/${
          payload.pageSize
        }`
      )
      .then(data => {
        // console.log(data.data)
        let alumnis = data.data;
        commit("SET_LIMIT_ALUMNIS", { alumnis });
      })
      .catch(error => {
        console.log(error);
      });
  },
  searchAlumni: ({ commit }, payload) => {
    axios
      .post("http://101.132.112.15:8080/alumni/search", {
        name: payload.name,
        sex: payload.sex,
        birthday: payload.birthday,
        inSchoolDate: payload.inSchoolDate,
        outSchoolDate: payload.outSchoolDate,
        workingCity: payload.workingCity,
        workingUnit: payload.workingUnit,
        job: payload.job,
        phoneNum: payload.phoneNum,
        email: payload.email,
        wechat: payload.wechat
      })
      .then(data => {
        // alert("查询成功！")
        let alumnis = data.data;
        commit("SEARCH_ALUMNI", { alumnis });
        if (alumnis.length == 0) {
          alert("未能查到对应条件的记录。");
        }
      })
      .catch(function(error) {
        alert("查询出现错误！");
        console.log(error);
      });
  },
  addAlumni: ({ commit }, payload) => {
    axios
      .post("http://101.132.112.15:8080/alumni/insert", {
        name: payload.name,
        sex: payload.sex,
        birthday: payload.birthday,
        inSchoolDate: payload.inSchoolDate,
        outSchoolDate: payload.outSchoolDate,
        workingCity: payload.workingCity,
        workingUnit: payload.workingUnit,
        job: payload.job,
        phoneNum: payload.phoneNum,
        email: payload.email,
        wechat: payload.wechat
      })
      .then(function(response) {
        alert("新增记录成功！");
      })
      .catch(function(error) {
        alert("出现错误！");
        console.log(error);
      });
  },
  deleteAlumni: ({ commit }, id) => {
    axios
      .delete(`http://101.132.112.15:8080/alumni/delete/${id}`, {})
      .then(function(response) {
        commit("DELETE_ALUMNI", { id });
        return "success";
      })
      .catch(function(error) {
        alert("出现错误！");
        console.log(error);
      });
  },
  updateAlumni: ({ commit }, payload) => {
    axios
      .put(`http://101.132.112.15:8080/alumni/update/${payload.id}`, {
        name: payload.name,
        sex: payload.sex,
        birthday: payload.birthday,
        inSchoolDate: payload.inSchoolDate,
        outSchoolDate: payload.outSchoolDate,
        workingCity: payload.workingCity,
        workingUnit: payload.workingUnit,
        job: payload.job,
        phoneNum: payload.phoneNum,
        email: payload.email,
        wechat: payload.wechat
      })
      .then(function(response) {
        alert("修改记录成功");
        commit("UPDATE_ALUMNI", { payload });
      })
      .catch(function(error) {
        alert("出现错误！");
        console.log(error);
      });
  }
};
