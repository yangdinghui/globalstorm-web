<template>
    <section>
        <!-- 面包屑导航信息 start-->
        <el-row class="breadcrumbCss">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <template v-for="(item,index) in this.GLOBAL.breadvrumbData" v-if="!item.hidden">
                    <el-breadcrumb-item v-if="index!=1" :key="index" :to="{ path: item.menuWebPageUrl }"><span @click="deleteItem(index,item.funcID)">{{item.titleText}}</span></el-breadcrumb-item>
                    <el-breadcrumb-item v-if="index==1" :key="index"><span @click="deleteItem(index,item.funcID)">{{item.titleText}}</span></el-breadcrumb-item>
                </template>
            </el-breadcrumb>
        </el-row>
        <!-- 面包屑导航信息 end-->
        <!--合作者管理-管理页面 -->
        <el-row v-show="cache.tableShow">
            <v-table ref="table"  @add="add" @update="update"  @detail="detail"></v-table>
        </el-row>
        <!--合作者管理-编辑页面 -->
        <el-row v-show="cache.formShow" >
            <v-form  ref="child"  @back="back"></v-form>
        </el-row>
    </section>
</template>

<script>
    import details from './details.vue';
    import table from './table.vue';
    export default {
        data () {
            return {
                cache: {
                    formShow: false,
                    tableShow: false
                }
            };
        },
        methods: {
            // 删除面包屑
            deleteItem(index,path){
                if(index===0){
                    this.$emit('showWelcomePage',path);
                    this.GLOBAL.breadvrumbData =this.GLOBAL.breadvrumbData.slice(0,1)
                }
                if(index===2){
                    this.tableShowFun()
                }
            },
            // 展示管理页面
            tableShowFun() {
                this.cache.formShow= false;
                this.cache.tableShow= true;
                this.$refs.table.init();
            },
            // 展示编辑页面
            formShowFun() {
                this.cache.formShow= true;
                this.cache.tableShow= false;
            },
            // 调用编辑页面修改方法
            update(val) {
                this.formShowFun();
                this.$refs.child.update(val);
            },
            // 调用编辑页面展示详情方法
            detail(val){
                this.formShowFun();
                this.$refs.child.detail(val);
            },
            add(){
                 this.formShowFun();
                this.$refs.child.add();
            },
            // 返回管理页面
            back() {
                this.tableShowFun();
            },
            // 初始化-展示管理页面
            init(){
                this.tableShowFun();
            }
        }, 
        mounted() {
            this.init();
        },
        components: {
        'v-table': table,
        'v-form': details
        }
    };
</script>