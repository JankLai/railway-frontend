<template>
  <div class="upload">
    <!-- <h1>上传统计数据</h1> -->
    <div class="file-view">
      <b-form @submit.prevent="uploadDateAmount">
        <b-form-file
          v-model="dateAmountFile"
          :state="Boolean(dateAmountFile)"
          placeholder="选取日期-货运量统计文件..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <b-button type="submit" variant="primary">上传</b-button>
      </b-form>


      <b-form @submit.prevent="uploadTransportAmount">
        <b-form-file
          v-model="transportAmountFile"
          :state="Boolean(transportAmountFile)"
          placeholder="选取货运方式-货运量统计文件..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <b-button type="submit" variant="primary">上传</b-button>
      </b-form>


      <b-form @submit.prevent="uploadGoodsAmount">
        <b-form-file
          v-model="goodsAmountFile"
          :state="Boolean(goodsAmountFile)"
          placeholder="选取货运品类-货运量统计文件"
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <b-button type="submit" variant="primary">上传</b-button>
      </b-form>


      <b-form @submit.prevent="uploadOdAmount">
        <b-form-file
          v-model="odAmountFile"
          :state="Boolean(odAmountFile)"
          placeholder="选取OD区域-货运量统计文件..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <b-button type="submit" variant="primary">上传</b-button>
      </b-form>   
    </div>
    
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    name: "upload",
    data() {
      return {
        dateAmountFile : null,
        transportAmountFile : null,
        goodsAmountFile : null,
        odAmountFile : null
      }
    },
    mounted() {
      this.setFooterText("管理员上传统计文件")
    },
    methods: {
        ...mapActions([
            'uploadDateAmountFile',
            'uploadTransportAmountFile',
            'uploadGoodsAmountFile',
            'uploadOdAmountFile',
            'setFooterText'
        ]),
        uploadDateAmount(){
          if(sessionStorage.getItem("role") !== "admin"){
            this.$bvModal.msgBoxOk('只有管理员才能上传统计文件', {
              title: '',
              size: 'sm',
              buttonSize: 'xl',
              okVariant: 'success',
              headerClass: 'p-2 border-bottom-0',
              footerClass: 'p-2 border-top-0',
              centered: true
            })
            .then(value => {                    
            })
            .catch(err => {
            }) 
          }
          else if(this.dateAmountFile){
            this.uploadDateAmountFile(this.dateAmountFile);
            
          }
        },
        uploadTransportAmount(){
          if(sessionStorage.getItem("role") !== "admin"){
            this.$bvModal.msgBoxOk('只有管理员才能上传统计文件', {
              title: '',
              size: 'sm',
              buttonSize: 'xl',
              okVariant: 'success',
              headerClass: 'p-2 border-bottom-0',
              footerClass: 'p-2 border-top-0',
              centered: true
            })
            .then(value => {                    
            })
            .catch(err => {
            }) 
          }
          else if(this.transportAmountFile){
            this.uploadTransportAmountFile(this.transportAmountFile);
          }
        },
        uploadGoodsAmount(){
          if(sessionStorage.getItem("role") !== "admin"){
            this.$bvModal.msgBoxOk('只有管理员才能上传统计文件', {
              title: '',
              size: 'sm',
              buttonSize: 'xl',
              okVariant: 'success',
              headerClass: 'p-2 border-bottom-0',
              footerClass: 'p-2 border-top-0',
              centered: true
            })
            .then(value => {                    
            })
            .catch(err => {
            }) 
          }
          else if(this.goodsAmountFile){
            this.uploadGoodsAmountFile(this.goodsAmountFile);
          }
        },
        uploadOdAmount(){
          if(sessionStorage.getItem("role") !== "admin"){
            this.$bvModal.msgBoxOk('只有管理员才能上传统计文件', {
              title: '',
              size: 'sm',
              buttonSize: 'xl',
              okVariant: 'success',
              headerClass: 'p-2 border-bottom-0',
              footerClass: 'p-2 border-top-0',
              centered: true
            })
            .then(value => {                    
            })
            .catch(err => {
            }) 
          }
          else if(this.odAmountFile){
            this.uploadOdAmountFile(this.odAmountFile);
          }
        },
        
    },
}
</script>

<style scoped>
.upload {
    margin-top: 10.7%;
    height: 480px;
    z-index: 999;
}
.file-view {
    padding-top: 70px;
    margin-left: 30%;
    margin-right: 30%;
}
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: 'f';
}
.btn {
  margin : 6px 0px;
}
</style>


