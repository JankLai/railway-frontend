<template>
  <div class="update-view-container">
    <b-form id="form" @submit.prevent="handleSubmit">
    <!--.prevent防止submit默认事件-->

      <b-form-group id="input-group-1" label="姓名:" 
        label-cols-sm="3" 
        label-align-sm="left" 
        label-for="input-1"
        label-class="input-group-1-label">
        <b-form-input 
          id="input-1"
          v-model="formData.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="性别:" 
        label-cols-sm="3" 
        label-align-sm="left" 
        label-for="input-2"
        label-class="input-group-2-label">
        <b-form-input 
          id="input-2"
          v-model="formData.sex"
          required
          placeholder="Enter sex"
        ></b-form-input>
      </b-form-group>


      <b-button type="submit" variant="primary">提交</b-button>
      <b-button type="reset" variant="danger">重置</b-button>
      
    </b-form>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'update',
  props : ['alumniId'],
  data() {
    return {
      formData : {
        name: '',
        sex: '',
      }
    }
  },
  mounted() {
    this.setForm()
  },
  computed: {
    ...mapState([
      'alumnis'
    ])
  },
  methods: {
    ...mapActions([
      'updateAlumni'
    ]),
    handleSubmit() {
      const {name , sex, birthday, inSchoolDate, outSchoolDate, workingCity, workingUnit, job, phoneNum, 
      email, wechat} = this.formData
      const payload = {   
        id: this.alumniId,
        name: name,
        sex: sex,
        birthday: birthday,
        inSchoolDate: inSchoolDate,
        outSchoolDate: outSchoolDate,
        workingCity: workingCity,
        workingUnit: workingUnit,
        job: job,
        phoneNum: phoneNum,
        email: email,
        wechat: wechat
      }
      this.updateAlumni(payload)
    },
    setForm(){
      this.formData = this.alumnis.find(item => item.id == this.alumniId)
    }
  },
}
</script>

<style scoped>
.h1 {
    align-content: center
}
#form {
  margin: 0 150px;
}
.btn {
  /* 两个值时，第一个值被匹配给 上和下, 第二个值被匹配给 左和右. */
  /* 四个值时，会依次按 上、右、下、左 的顺序匹配 (即顺时针顺序). */
  margin: 15px 70px;
}

</style>

