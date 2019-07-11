<template>
  <div class="upload">
    <h1>上传统计数据</h1>
    <div class="file-view">
      <b-form @submit.prevent="uploadDateAmount">
        <b-form-file
          v-model="dateAmountFile"
          :state="Boolean(dateAmountFile)"
          placeholder="选取日期-货运量统计文件..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>


      <b-form @submit.prevent="uploadTransportAmount">
        <b-form-file
          v-model="transportAmountFile"
          :state="Boolean(transportAmountFile)"
          placeholder="选取货运方式-货运量统计文件..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>


      <b-form @submit.prevent="uploadGoodsAmount">
        <b-form-file
          v-model="goodsAmountFile"
          :state="Boolean(goodsAmountFile)"
          placeholder="选取货运品类-货运量统计文件"
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>


      <b-form @submit.prevent="uploadOdAmount">
        <b-form-file
          v-model="odAmountFile"
          :state="Boolean(odAmountFile)"
          placeholder="选取OD区域-货运量统计文件..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <b-button type="submit" variant="primary">Submit</b-button>
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
    methods: {
        ...mapActions([
            'uploadDateAmountFile',
            'uploadTransportAmountFile',
            'uploadGoodsAmountFile',
            'uploadOdAmountFile',
        ]),
        uploadDateAmount(){
          alert("d")
          if(this.dateAmountFile){
            alert("dd3")
            this.uploadDateAmountFile(this.dateAmountFile);
          }
        },
        uploadTransportAmount(){
          if(!this.transportAmountFile == null && !this.transportAmountFile =='undefined'){
            this.uploadTransportAmountFile(this.transportAmountFile);
          }
        },
        uploadGoodsAmount(){
          if(!this.goodsAmountFile == null && !this.goodsAmountFile =='undefined'){
            this.uploadGoodsAmountFile(this.goodsAmountFile);
          }
        },
        uploadOdAmount(){
          if(!this.odAmountFile == null && !this.odAmountFile =='undefined'){
            this.uploadOdAmountFile(this.odAmountFile);
          }
        },
        changeChart(id) {
          
        }
    },
}
</script>

<style scoped>
.upload {
    margin-top: 120px;
   
    height: 480px;
    z-index: 999;
}
.file-view {
    margin-top: 60px;
    margin-left: 25%;
    margin-right: 25%;
}
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: 'f';
}
</style>


