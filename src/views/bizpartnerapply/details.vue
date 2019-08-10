<template>
  <section>
        <el-row class="bgwhite" type="flex" justify="start">
            <img src="../../../static/img/detail.png" class="titleLogo-info"/>
            <span class="titleSpan">查看设备申请详情</span>
        </el-row>
        <!--会员资料信息管理新增、修改-->
        <el-row class="bgwhite blockMarginTop">
            <div class="top-size">
                基本信息
            </div>
            <el-form :model="params" :inline="true" class="demo-ruleForm-three" label-width="80px">
                <!-- 第一行是 style="margin-top:-2px;margin-bottom:0px -->
                <!-- 中间行是 style="margin-top:8px;margin-bottom:0px; -->
                <!-- 最后一行是 style="margin-top:8px;margin-bottom:6px; -->
                <el-form-item label="申请单号" style="margin-top:-2px;margin-bottom:0px;">
                    <el-input v-model="queryDetailParams.applyNo"  size="small" placeholder="" class="saveInput"
                        :disabled="true" clearable></el-input>
                </el-form-item>
                <el-form-item label="申请状态" style="margin-top:-2px;margin-bottom:0px;">
                    <el-input v-model="queryDetailParams.applyStatusName"  size="small" placeholder="" class="saveInput"
                        :disabled="true" clearable></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="收货人" style="margin-top:-2px;margin-bottom:0px;">
                    <el-input v-model="queryDetailParams.linkPerson"  size="small" placeholder="" class="saveInput"
                        :disabled="true" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号" style="margin-top:-2px;margin-bottom:0px;">
                    <el-input v-model="queryDetailParams.linkPhone"  size="small" placeholder="" class="saveInput"
                        :disabled="true" clearable></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="收货地址" style="margin-top:-2px;margin-bottom:0px;" >
                    <el-input v-model="queryDetailParams.detailAddress" maxlength="500" size="small" placeholder="" class="saveInput"
                        :disabled="true" clearable style="width:575px" ></el-input>
                </el-form-item>
            </el-form> 
        </el-row>
        <el-row class="bgwhite blockMarginTop">
            <div class="top-size">
                设备明细
            </div>
           <el-row style="margin-top:15px;">
                <el-col :span="24">
                    <!--表格-->
                    <el-table ref="table" :data="receiveData.deviceData" stripe border style="min-width:1024px;min-height:245px;" :max-height="245" :header-cell-style="rowClass" :cell-style="cellStyle">
                            <el-table-column prop="deviceTypeName" label="设备类型名称" :show-overflow-tooltip="true" min-width="8.3%"> 
                            </el-table-column>
                            <el-table-column prop="deviceNum" label="申请台数" :show-overflow-tooltip="true" min-width="8.4%">
                            </el-table-column>
                            <el-table-column prop="devicePrice" label="设备单价" :show-overflow-tooltip="true" min-width="7.4%">
                            </el-table-column>
                            <el-table-column prop="deviceAmount" label="设备总价" :show-overflow-tooltip="true" min-width="7.4%">
                            </el-table-column>
                            <el-table-column prop="deviceAmount" label="设备总价" :show-overflow-tooltip="true" min-width="7.4%">
                            </el-table-column>
                            <el-table-column prop="sendTotalNum" label="发货台数" :show-overflow-tooltip="true" min-width="7.4%">
                            </el-table-column>
                            <el-table-column label="操作" min-width="8%" align="center">
                                <template slot-scope="scope">
                                    <el-button @click="shipments(scope.row)"  type="text" size="small" v-show="queryDetailParams.applyStatus != 'N'">发货</el-button>
                                    <el-button  type="text" size="small">&nbsp;</el-button>
                                </template>
						    </el-table-column>
                            <div slot="empty">
								<div >
									<img src="../../../static/img/nodata.png"  width="150px" height="150px"/>
									<p style="font-size:24px;color:#606266;margin-top:0px;margin-left:20px;">暂无数据！</p>
								</div>
							</div>
                    </el-table>
                    <!--表格-->
                </el-col>
            </el-row>
        </el-row>
        <!-- 设备发货 -->
        <el-dialog title="设备发货" :visible.sync="outerVisible" :modal="true" append-to-body :width="'75%'"  :center="true">
            <!-- 添加设备页面 -->
            <el-dialog title="添加设备发货记录" :visible.sync="addVisible" append-to-body :width="'50%'" :center="true">
                <div style="margin-left:14%;">
                    <el-form :model="addApplyParams" :inline="true" :rules="rules" ref="form" class="demo-ruleForm-three" label-width="85px">
                        <!-- 第一行是 style="margin-top:-2px;margin-bottom:0px -->
                        <!-- 中间行是 style="margin-top:8px;margin-bottom:0px; -->
                        <!-- 最后一行是 style="margin-top:8px;margin-bottom:6px; -->
                        <el-form-item label="发货台数" prop="sendNum" style="margin-top:-2px;margin-bottom:20px;">
                            <el-input v-model="addApplyParams.sendNum" placeholder="请填写发货台数" :maxlength="11" @blur="compareNumber" style="width:225px;"  size="small" class="saveInput"
                                clearable></el-input>
                        </el-form-item>
                        <el-form-item label="快递单号" prop="deliveryNo" style="margin-top:-2px;margin-bottom:20px;">
                            <el-input v-model="addApplyParams.deliveryNo" placeholder="请填写快递单号" :maxlength="20" style="width:225px;"  size="small" minlength="10"  class="saveInput"
                                clearable></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="发货时间" prop="deliveryTime" style="margin-top:-2px;margin-bottom:20px;">
                            <el-date-picker v-model="addApplyParams.deliveryTime" type="datetime" placeholder="请选择日期时间" align="right" :picker-options="pickerOptions1" format="yyyy 年 MM 月 dd 日 HH:mm:ss" 
                        value-format="yyyy-MM-dd HH:mm:ss" style="font-size:12px;width:226px;"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="发货人" prop="deliveryPerson" style="margin-top:-2px;margin-bottom:20px;">
                            <el-input v-model="addApplyParams.deliveryPerson" placeholder="请填写发货人姓名" :maxlength="50" style="width:225px;"  size="small" class="saveInput"
                                clearable></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="备注说明" prop="detailAddress" style="margin-top:-2px;margin-bottom:0px;" >
                            <el-input v-model="addApplyParams.comment" maxlength="256" size="small" placeholder="请填写备注说明" class="saveInput"
                                clearable style="width:550px" ></el-input>
                        </el-form-item>
                    </el-form> 
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addCommit">提交</el-button>
                </div>
            </el-dialog>
            <!-- 签收设备页面 -->
            <el-dialog title="签收设备" :visible.sync="sendVisible" append-to-body :width="'50%'" :center="true">
                <el-form :model="updateSendParams" :inline="true" :rules="rules" ref="form1" class="demo-ruleForm-three" label-width="85px">
                        <!-- 第一行是 style="margin-top:-2px;margin-bottom:0px -->
                        <!-- 中间行是 style="margin-top:8px;margin-bottom:0px; -->
                        <!-- 最后一行是 style="margin-top:8px;margin-bottom:6px; -->
                        <el-form-item label="快递单号" prop="deliveryNo" style="margin-top:-2px;margin-bottom:20px;">
                            <el-input v-model="updateSendParams.deliveryNo" :disabled="true" :maxlength="20" style="width:225px;"  size="small" minlength="10" placeholder="请填写快递单号" class="saveInput"
                                clearable></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="发货时间" prop="deliveryTime" style="margin-top:-2px;margin-bottom:20px;">
                            <el-date-picker v-model="updateSendParams.deliveryTime" :disabled="true"  type="datetime" placeholder="请选择日期时间" align="right" :picker-options="pickerOptions1" format="yyyy 年 MM 月 dd 日 HH:mm:ss" 
                        value-format="yyyy-MM-dd HH:mm:ss" style="font-size:12px;width:226px;"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="发货人" prop="deliveryPerson" style="margin-top:-2px;margin-bottom:20px;">
                            <el-input v-model="updateSendParams.deliveryPerson" :disabled="true"  :maxlength="50" style="width:225px;"  size="small" placeholder="请填写发货人姓名" class="saveInput"
                                clearable></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="签收时间" prop="signingTime" style="margin-top:-2px;margin-bottom:20px;">
                            <el-date-picker v-model="updateSendParams.signingTime" type="datetime" placeholder="请选择日期时间" align="right" :picker-options="pickerOptions1" format="yyyy 年 MM 月 dd 日 HH:mm:ss" 
                        value-format="yyyy-MM-dd HH:mm:ss" style="font-size:12px;width:226px;"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="签收人" prop="signingPerson" style="margin-top:-2px;margin-bottom:20px;">
                            <el-input v-model="updateSendParams.signingPerson" :maxlength="50" style="width:225px;" placeholder="请填写签收人姓名" size="small" class="saveInput"
                                clearable></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="备注说明" prop="detailAddress" style="margin-top:-2px;margin-bottom:0px;" >
                            <el-input v-model="updateSendParams.comment" maxlength="256" size="small" placeholder="请填写备注说明" class="saveInput"
                                clearable style="width:550px" ></el-input>
                        </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                            <el-button @click=" sendVisible= false">取 消</el-button>
                            <el-button type="primary" @click="sendFun">签收</el-button>
                        </div>
            </el-dialog>
            <el-row class="bgwhite blockMarginTop">
                <el-row style="margin-top:15px;">
                    <el-row type="flex" justify="start" class="btnTable">
                        <el-button @click="addApply" :disabled="cache.isAddBtn" class="findButton" size="mini" type="primary">新增</el-button>
                        <!-- v-show="state.userBtnRole.insert" -->
                    </el-row>
                    <el-col :span="24">
                        <!--表格-->
                        <el-table ref="table" :data="receiveData.deviceDetailsDate" stripe border style="min-width:1024px;min-height:445px;" :max-height="445" :header-cell-style="rowClass" :cell-style="cellStyleSmall">
                                <el-table-column prop="deviceTypeName" label="设备类型名称" :show-overflow-tooltip="true" min-width="8.4%"> 
                                </el-table-column>
                                <el-table-column prop="sendNum" label="发货台数" :show-overflow-tooltip="true" min-width="9.2%">
                                </el-table-column>
                                <el-table-column prop="deliveryNo" label="快递单号" :show-overflow-tooltip="true" min-width="9.7%">
                                </el-table-column>
                                <el-table-column prop="deliveryTime" label="发货时间" :show-overflow-tooltip="true" min-width="8%">
                                </el-table-column>
                                <el-table-column prop="deliveryPerson" label="发货人" :show-overflow-tooltip="true" min-width="7%">
                                </el-table-column>
                                <el-table-column prop="signingTime" label="签收时间" :show-overflow-tooltip="true" min-width="7%">
                                </el-table-column>
                                <el-table-column prop="signingPerson" label="签收人" :show-overflow-tooltip="true" min-width="10%">
                                </el-table-column>
                                <el-table-column prop="comment" label="备注说明" :show-overflow-tooltip="true" min-width="8.4%">
                                </el-table-column>
                                <el-table-column label="操作" min-width="8%" align="center">
                                    <template slot-scope="scope">
                                        <el-button @click="updateSendDetail(scope.row)"  type="text" size="small" v-show="scope.row.signingPerson === null || scope.row.signingPerson ===''">签收</el-button>
                                        <el-button @click="delDetail(scope.row.applyDeviceSendCode,'是否删除？')"  type="text" size="small">删除</el-button>
                                        <el-button  type="text"  size="small">&nbsp;</el-button>
                                    </template>
                                </el-table-column>
                                <div slot="empty">
                                    <div >
                                        <img src="../../../static/img/nodata.png"  width="150px" height="150px"/>
                                        <p style="font-size:24px;color:#606266;margin-top:0px;margin-left:20px;">暂无数据！</p>
                                    </div>
                                </div>
                        </el-table>
                        <!--表格-->
                    </el-col>
                </el-row>
                <!-- 分页 -->
                <v-page :curPage="params.curPage" 
                        :pageSize="params.pageSize" 
                        :count="cache.count" 
                        :pageCount="cache.pageCount" 
                        @sizeChange="sizeChange"
                        @currChange="currChange"
                        class="floatLeft pageMarginTopToTable"
                        v-if="this.receiveData.deviceDetailsDate.length != 0">
                </v-page>
                <!-- 分页 -->
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">取 消</el-button>
                <el-button type="primary" @click="outerVisible = false">确定</el-button>
            </div>
        </el-dialog>
        <!-- </el-row> -->
        <el-row class="bgwhite blockMarginTop" style="padding:16px 10px;">
            <el-button @click="back" class="whiteButton findButtonMarginleft" size="mini">返回</el-button>
            <el-button  @click="auditApi" class="findButton" v-show="true" type="primary" size="mini">审核</el-button>
        </el-row>
    <common ref="common" v-show="false"></common>
  </section>
</template>
<script>
import page from "../common/page/page.vue";
export default {
    data() {
      return {
        outerVisible: false,//控制发货页面的显隐
        addVisible:false,//控制添加设备发货记录页面的显隐
        sendVisible:false,//控制签收设备页面的显隐
        receiveData: {
            deviceData:[],//设备申请单详情
            deviceDetailsDate:[],//设备申请单详情
        },
        pickerOptions1: {
          shortcuts: [
              {
                text: '今天',
                onClick(picker) {
                picker.$emit('pick', new Date());
                }
            },
          ]
        },
        //标识
        type:"",
        //请求参数
        params: {
            applyDeviceCode:"",//设备申请明细编码
            curPage: 1,// 当前页码
			pageSize: 5,// 每页条数
        },
        queryDetailParams: {
            applyCode:"",//设备申请编
            applyStatus:"",
        },
        auditParams: {
            applyCode:"",//设备申请编
        },
        addApplyParams: {
             sendNum:"",//发货台数
             deliveryNo:"",//快递单号
             deliveryTime:"",//发货时间
             deliveryPerson:"",//发货收人
             comment:"",//备注说明
        },
        updateSendParams:{
            applyDeviceSendCode:"",//记录编码
            deliveryNo:"",//快递单号
            deliveryTime:"",//发货时间
            deliveryPerson:"",//发货人
            signingTime:"",//签收时间
            signingPerson:"",//签收人
            comment:"",//备注说明
        },
        delSendParams:{
            applyDeviceSendCode:"",//设备申请发货记录编码
            applyDeviceCode:"",//设备申请明细编码
            applyCode:"",//设备申请编码
        },
        SendParams:{
            applyDeviceSendCode:"",
        },
        cache: {
            count: 0, // 总记录数
            pageCount: 5, // 总页数
            isAddBtn:true,//控制发货页面新增按钮
        },
        state: {
            userBtnRole: { // 当前用户按钮权限
                
            }	
        },
        //校验
        rules: {
           sendNum:[ {required: true, message: ' ', trigger: 'blur'}],
           deliveryNo:[ {required: true, message: '请填写快递单号!', trigger: 'blur'}],
           deliveryTime:[ {required: true, message: '请选择发货时间!', trigger: 'blur'}],
           deliveryPerson:[ {required: true, message: '请填写发货收人!', trigger: 'blur'}],
           signingTime:[ {required: true, message: '请选择签收时间!', trigger: 'blur'}],
           signingPerson:[ {required: true, message: '请填写签收人!', trigger: 'blur'}],
        }
      };
    },
    methods: {
        compareNumber() {
            var numReg = /^[0-9]+$/
            if (!numReg.test(this.addApplyParams.sendNum)) {
                this.$message.error('发货台数格式不正确！');
            }
        },
        //返回
        back() {
            this.$emit('back');
        },
        // 当前页发生变化是重新获取数据
        currChange(val){
            this.params.curPage = val
            this.$api.post('/bizPartnerApply/querySendDetail', this.params, r => {
                this.receiveData.deviceDetailsDate = r.body.data
                this.params.curPage = r.body.curPage
                this.params.pageSize = r.body.pageSize
                this.cache.count = r.body.count
				this.cache.pageCount = r.body.pageCount
            })
        },
        // 每页大小发生变化时，重新获取数据
        sizeChange(val){
            this.params.curPage = 1
            this.params.pageSize = val
            this.$api.post('/bizPartnerApply/querySendDetail', this.params, r => {
                this.receiveData.deviceDetailsDate = r.body.data
                this.params.curPage = r.body.curPage
                this.params.pageSize = r.body.pageSize
                this.cache.count = r.body.count
				this.cache.pageCount = r.body.pageCount
            })
        },
        //发货
        shipments(val) {
             this.cache.isAddBtn = false;
            if(val.deviceNum === val.sendTotalNum) {
                this.cache.isAddBtn = true;
            };
            this.params.applyDeviceCode = val.applyDeviceCode;
            this.$api.post('/bizPartnerApply/querySendDetail', this.params, r => {
                this.receiveData.deviceDetailsDate = r.body.data
                this.params.curPage = r.body.curPage
                this.params.pageSize = r.body.pageSize
                this.cache.count = r.body.count
				this.cache.pageCount = r.body.pageCount
            });
            this.outerVisible = true;
        },
        //添加发货记录
        addApply(){
            this.addVisible = true;
        },
        //提交添加发货记录
        addCommit(){
            if(this.queryDetailParams.applyCode === null || this.queryDetailParams.applyCode ===''
            ||this.params.applyDeviceCode === null || this.params.applyDeviceCode === '') {
                this.$notify({
                    title: '警告',
                    message: '该页面已超时请重新访问！',
                    type: 'warning'
                });
                this.back();
                return false;
            }
            var numReg = /^[0-9]+$/
            if (!numReg.test(this.addApplyParams.sendNum)) {
                this.$message.error('发货台数格式不正确！');
                return false;
            }
            this.addApplyParams.applyCode = this.queryDetailParams.applyCode;
            this.addApplyParams.applyDeviceCode = this.params.applyDeviceCode;
            
             this.$refs['form'].validate((valid) => {
                if(valid) {
                    this.$api.post('/bizPartnerApply/addSendDetail', this.addApplyParams, r => {
                        if(r.status=='200'){
                            this.addVisible = false;
                            this.outerVisible = false;
                            this.$message({
                            message: r.msg,
                            type: 'success'
                            });
                            this.detail(this.addApplyParams.applyCode);
                        }else{
                            this.$message.error(r.msg);
                        }
                    })
                 }else {
                     return false;
                 }
            });
        },
        //签收
        updateSendDetail(val) {
            this.updateSendParams = val;
            this.sendVisible = true;

        },
        //签收按钮
        sendFun() {
           if(this.queryDetailParams.applyCode === null || this.queryDetailParams.applyCode ===''
            ||this.params.applyDeviceCode === null || this.params.applyDeviceCode === '') {
                this.$notify({
                    title: '警告',
                    message: '该页面已超时请重新访问！',
                    type: 'warning'
                });
                this.back();
                return false;
            }
            this.$refs['form1'].validate((valid) => {
                if(valid) {
                    this.$api.post('/bizPartnerApply/updateSendDetail', this.updateSendParams, r => {
                        if(r.status=='200'){
                            this.sendVisible = false;
                            this.outerVisible = false;
                            this.$message({
                            message: r.msg,
                            type: 'success'
                            });
                            this.detail(this.queryDetailParams.applyCode);
                        }else{
                            this.$message.error(r.msg);
                        }
                    })
                 }else {
                     return false;
                 }
            });
        }, 
        //删除
        delDetail(applyDeviceSendCode,message){
            if(this.queryDetailParams.applyCode === null || this.queryDetailParams.applyCode ===''
            ||this.params.applyDeviceCode === null || this.params.applyDeviceCode === '' 
            || applyDeviceSendCode === null || applyDeviceSendCode === '') {
                this.$notify({
                    title: '警告',
                    message: '该页面已超时请重新访问！',
                    type: 'warning'
                });
                this.back();
                return false;
            }
            this.delSendParams.applyDeviceSendCode = applyDeviceSendCode;
            this.delSendParams.applyCode = this.queryDetailParams.applyCode;
            this.delSendParams.applyDeviceCode = this.params.applyDeviceCode;
            this.$confirm(message, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
					}).then(() => {
						this.$api.post('/bizPartnerApply/delSendDetail', this.delSendParams, r => {	
							if(r.status == '200') {
								this.sendVisible = false;
                                this.outerVisible = false;
                                this.detail(this.queryDetailParams.applyCode);
								this.$message({
									message: r.msg,
									type: 'success'
                                });
							} else {
								this.$message.error(r.msg);
							}
						})
					}).catch(() => {
						// 点击取消        
				});	
        },                    
        //审核
        auditApi() {
            this.auditParams.applyCode = this.queryDetailParams.applyCode;
            this.$api.post('/bizPartnerApply/audit', this.auditParams, r => {
                if(r.status=='200'){
                    this.back();
                    this.$message({
                    message: r.msg,
                    type: 'success'
                    });
                }else{
                    this.$message.error(r.msg);
                }
            })
        },
        //加载下拉
        loadInput(){
          	this.$api.post('/bizPartnerApply/detail', this.queryDetailParams, r => {
                    this.queryDetailParams = r.body;
                    this.receiveData.deviceData = this.queryDetailParams.deviceList;
            }) 
        },
        //详情查看 
        detail(val) {
            this.init();
            this.queryDetailParams.applyCode = val;
            this.loadInput();
        },
        init(){
            // 全局变量初始化
            this.$refs.common.init();
            this.state.userBtnRole = this.GLOBAL.userBtnRole;
        },
    },
    //初始化加载
    mounted() {
        
    },
    components: {
        'v-page': page
    },
}
</script>
<style scoped>
.el-form-item__error{
  padding-top: 0px !important;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

 .span-size{
     font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #212121;
 }
</style>
