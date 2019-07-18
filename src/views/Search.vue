<template>
        <div class="search">
            <b-form id="form" @submit.prevent="handleSubmit">
                <b-input-group>
                    <b-dropdown id="drop" slot="prepend" text="搜索条件" variant="info">
                        <b-dropdown-item class="b-dropdown-item" @click="drop('date')">日期</b-dropdown-item>
                        <b-dropdown-item class="b-dropdown-item" @click="drop('transport')">货运方式</b-dropdown-item>
                        <b-dropdown-item class="b-dropdown-item" @click="drop('goods')">货运品类</b-dropdown-item>
                        <b-dropdown-item class="b-dropdown-item" @click="drop('od')">OD区域</b-dropdown-item>
                    </b-dropdown>

                    <b-form-input id="input" :placeholder=this.msg v-model="text"></b-form-input>

                    <b-button id="single" type="submit" variant="primary">搜索单个</b-button>
                    <b-button id="all" @click="searchAll()" variant="danger">搜索所有</b-button>
                </b-input-group>
            </b-form>

            <b-table  id="table" striped hover small :items="searchResults" 
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"> 
                <template slot="删除"  slot-scope="row">
                    <button class="myDeleteBtn" @click="deleteOne(row.item.id)">X</button>
                </template> 
            </b-table> 
           
        </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    name: 'Search',
    data() {
        return {
            sortBy : 'date',
            sortDesc : false,
            input : "date",
            text : "",
            msg : "请在此输入日期（格式：2016-06-01）",
            payload : {},
            id : 0,
            fields:[
                { key: 'id', sortable: false },
                { key: 'date', label: '日期', sortable: true },
                { key: 'amount', label: '货运量(吨)', sortable: true },
                { key: '删除', sortable: false },
            ],
        }
    },
    
    computed: {
        ...mapState([
          "searchResults",
           
        ])
    },
    mounted() {
        this.setFooterText("根据条件搜索")    
    },
    methods: {
        ...mapActions([
            'searchByDate',
            'searchByTransport',
            'searchByGoods',
            'searchByOD',

            'searchAllDate',
            'searchAllTransport',
            'searchAllGoods',
            'searchAllOd',   

            'deleteByDate',
            'deleteByTransport',
            'deleteByGoods',
            'deleteByOd',   

            'setFooterText'
        ]), 
        drop(selected) {
            this.input = selected;
            switch (selected) {
                case 'date':
                    this.msg= "请在此输入日期（格式：2016-06-01）"
                    this.setFooterText("当前搜索条件：日期")                 
                    break;
                case 'transport':
                    this.msg= "请在此输入货运方式（整车/集装箱）"
                    this.setFooterText("当前搜索条件：货运方式")  
                    break;
                case 'goods':
                    this.msg= "请在此输入货运品类（如：其它货物）"
                    this.setFooterText("当前搜索条件：货运品类")  
                    break;
                case 'od':
                    this.msg= "请在此输入OD区域（如：渡口）"
                    this.setFooterText("当前搜索条件：OD区域")  
                    break;        
                default:
                    break;
            }
        },
        handleSubmit() {
            
            switch (this.input) {
                case 'date':
                    this.payload ={
                        date : this.text
                    };
                    this.searchByDate(this.payload);
                    this.fields[1]['key'] = 'date'
                    this.fields[1]['label'] = '日期'
                    break;
                case 'transport':
                    this.payload ={
                        transport : this.text
                    };
                    this.searchByTransport(this.payload);
                    this.fields[1]['key'] = 'transport'
                    this.fields[1]['label'] = '货运方式'
                    break;
                case 'goods':
                    this.payload ={
                        goods : this.text
                    };
                    this.searchByGoods(this.payload);
                    this.fields[1]['key'] = 'goods'
                    this.fields[1]['label'] = '货运品类'
                    break;
                case 'od':
                    this.payload ={
                        od : this.text
                    };
                    this.searchByOD(this.payload);
                    this.fields[1]['key'] = 'od'
                    this.fields[1]['label'] = 'OD区域'
                    break;
                    
                default:
                    break;
            }
            
            this.text=""
        },
        update(id) {
            this.id = id;
            this.$bvModal.show('update',{title: 'Please Confirm'+this.id});
        },
        deleteOne(id) {
            if(sessionStorage.getItem("role") !== "admin"){
                this.$bvModal.msgBoxOk('只有管理员才能删除记录', {
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
            else {  
                this.$bvModal.msgBoxConfirm("您确定删除id为"+id+"的记录吗?", {
                    title: '请确认',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: '确定',
                    cancelTitle: '不了',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                .then(value => {
                    if(value === true){
                        switch (this.input) {
                            case 'date':
                                this.deleteByDate(id)
                                    .then(()=>{          
                                        this.$bvModal.msgBoxOk('数据已成功删除', {
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
                                    }) 
                                break;
                            case 'transport':
                                this.deleteByTransport(id)
                                    .then(()=>{          
                                        this.$bvModal.msgBoxOk('数据已成功删除', {
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
                                    }) 
                                break;
                            case 'goods':
                                this.deleteByGoods(id)
                                    .then(()=>{          
                                        this.$bvModal.msgBoxOk('数据已成功删除', {
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
                                    }) 
                                break;
                            case 'od':
                                this.deleteByOd(id)
                                    .then(()=>{          
                                        this.$bvModal.msgBoxOk('数据已成功删除', {
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
                                    }) 
                                break;
                        
                            default:
                                break;
                        }
                        
                    }
                    
                })
                .catch(err => {
                    // An error occurred
                })
            }
        },
        searchAll() {
            switch (this.input) {
                case 'date':
                    this.searchAllDate()
                    this.fields[1]['key'] = 'date'
                    this.fields[1]['label'] = '日期'
                    break;
                case 'transport':
                    this.searchAllTransport()
                    this.fields[1]['key'] = 'transport'
                    this.fields[1]['label'] = '货运方式'
                    break;
                case 'goods':
                    this.searchAllGoods()
                    this.fields[1]['key'] = 'goods'
                    this.fields[1]['label'] = '货运品类'
                    break;
                case 'od':
                    this.searchAllOd()
                    this.fields[1]['key'] = 'od'
                    this.fields[1]['label'] = 'OD区域'
                    break;
                default:
                    break;
            }
        }
    },
}
</script>


<style scoped>
/* .search{
    margin-top: 120px;
    height: 480px;
} */
#drop {
    z-index: 0;  
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    color: black
}
#form {
    margin-top: 10.7%;;
    margin-left: 250px; 
}
#table {
    margin-top: 100px; 
}

#input {
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    text-align: center;
    width : 90px;
    
}
.myUpdateBtn {
    /* background: url("../assets/logo.png"); */
    background: #48d410;
    color: #fff;
    border: none;
    padding: 5px 9px;
    cursor: pointer;
    float: right;
}

.myDeleteBtn {
    background: #f33d3d;
    color: #fff;
    border: none;
    padding: 4px 10px;
    border-radius: 50%;
    cursor: pointer;

}

.myUpdateBtn:hover {
    transform: translateY(0) scale(1.3);
}

.myDeleteBtn:hover {
    transform: translateY(0) scale(1.5);
}
.b-dropdown-item {
    z-index: 1;
    background-color: rgb(163, 130, 58);
    margin: 1px
}
.b-dropdown-item:hover {
    z-index: 1;
    background-color: rgb(194, 192, 94);
    margin: 1px
}
#single {
    width: 100px;
    background-color: rgb(224, 224, 12);
    color: black;
    margin-left: 10px;
    border-radius: 30px;
}
#all {
    width: 100px;
    background-color: rgb(224, 224, 12);
    border-radius: 30px;
    color: black;
    margin-right: 230px;
}
</style>    