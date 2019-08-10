<template>
	<section>
	</section>
</template>
<script>
import page from "../common/page/page.vue";
	export default {
		data() {
			return {
				params: {  
					curPage: 1,// 当前页码
					pageSize: 10,// 每页条数
					applyNo:'',// 申请单号
					applyTimeBegin:'',//申请日期：开始
					applyTimeEnd:'',//申请日期：结束
					modifyTimeBegin:'',//修改日期：开始
					modifyTimeEnd:'',//修改日期：结束
					partnerCode:'',//运营者编码
					operatorsCode:'',//运营者编码
					applyStatus: [],// 单据状态
					applyTimeBeginEnd:'',//申请日期
					modifyDateBeginEnd:'',//修改日期
				}
			}
		},
		methods: {
			// 获取表格数据
			getdata() {
				this.params.curPage = 1
				this.params.pageSize = 10
				var rep = /^[0-9]*$/
				if(rep.test(this.params.applyNo)){
					this.$api.post('/bizPartnerApply/list', this.params, r => {
					this.receiveData.tableData = r.body.data
					this.params.curPage = r.body.curPage
					this.params.pageSize = r.body.pageSize
					this.cache.count = r.body.count
					this.cache.pageCount = r.body.pageCount
					})
				}else{
					this.$message.error("申请单号填写不规范！")
				}
				
			},
		},
		// 创建时，加载表中数据
		mounted() {
			
		},
		components: {
			'v-page': page
		}
	};
</script>

<style scoped>

</style>