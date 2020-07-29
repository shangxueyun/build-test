<template>
	<div v-loading="loading">
		<div class="topBack" >
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>我的进口棉</p>
		</div>
		<div class="addHeight"></div>
		<div class="order_tab myres_tab" style="top: 0.75rem;">
			<span :class="{'active':status==-1}" @click="switchOrder(-1)">全部</span>
			<span :class="{'active':status==3}" @click="switchOrder(3)">待售</span>
			<span :class="{'active':status==0}" @click="switchOrder(0)">在售</span>
			<span :class="{'active':status==4}" @click="switchOrder(4)">洽谈中</span>
			<span :class="{'active':status==2}" @click="switchOrder(2)">已售</span>
			<span :class="{'active':status==8}" @click="switchOrder(8)">过期</span>
			<div class="clear"></div>
		</div>
		<div class="myres_top" style="top: 1.75rem;">
			<div class="fl myres_all">
				<input id='quanxuan2' class="radio_type quanxuan" type="checkbox" name="type" v-model='checked' @click='checkedAll' />
				<label for="quanxuan2">全选</label>
			</div>
			<div class="fr myres_ope">
				<input type="button" class="shanchu fr" value="删除" @click="ChangeState(9)">
				<input type="button" class="xiajia fr" value="下架" @click="ChangeState(3)">
				<input type="button" class="shangjia fr" value="上架" @click="ChangeState(0)">
				<input type="button" class="shouchu fr" value="售出" @click="ChangeState(2)">
				<input type="button" class="qiatan fr" value="洽谈" @click="ChangeState(4)">
			</div>
			<div class="clear"></div>
		</div>
		<div class="resourceList">
			<ul>
				<li class="myres_inx" v-for="item in resourceList">
					<div class="myres_l">
						<input class="radio_type radio_type_chick" type="checkbox" name="type" v-model='checkList' :value="item.importlistingID" />
					</div>
					<div class="myres_r" @click="godetails(item.batchID,item.importlistingID,item.listingType)">
						<div class="myres_t">
							<p class="top_num">报价号：{{item.importlistingID}}</p>
							<!-- <p v-if="item.status==-1" class="top_sta">状态：<span>正常</span></p> -->
							<p v-if="item.status==3" class="top_sta">状态：<span>待售</span></p>
							<p v-if="item.status==0" class="top_sta">状态：<span>在售</span></p>
							<p v-if="item.status==4" class="top_sta">状态：<span>洽谈</span></p>
							<p v-if="item.status==2" class="top_sta">状态：<span>已售</span></p>
							<p v-if="item.status==8" class="top_sta">状态：<span>过期</span></p>
							<div class="clear"></div>
						</div>
						<!-- <div class="myres_c">
							<p class="myres_cang">所在仓库：<span>{{item.depotName}}</span></p>
						</div> -->
						<div class="myres_b">
							<p class="myres_weight1">重量：<span>{{item.weight}}吨</span></p>
							<p class="myres_weight2">挂牌价：<span v-if='item.indexCode'>{{item.indexCode}}+</span><span v-if="item.currency==1">{{item.price}}元/吨</span><span v-if="item.currency==2">{{item.price}}美分/磅</span></p>
							<div class="clear"></div>
						</div>
						<div class="myres_data">
							<p class="data1">挂牌日期：<span>{{timestampToTime (item.listingTime).substring(0, 10)}}</span></p>
							<p class="data2">有效期：<span>{{item.validDay}}天</span></p>
							<div class="clear"></div>
						</div>
					</div>
					<div class="clear"></div>

				</li>
			</ul>
			<p v-if="!resshow" class="more_btn">{{moreText}}</p>
			<div v-if="resshow" class="noRes">
				<img src="../../assets/img/noRes.png" alt="">
				<p>未找到挂牌信息，请先挂牌</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				loading: true,
				checked: false, //全选框
				checkList: [],
				resourceList: '',
				totalPage: 0,
				pageCurrent: 1,
				pageNum: 1,
				moreText: '下拉加载更多',
				pageflag: true,
				status: -1,
				resshow: true,
				detId:'',
			}
		},
		//获取详情
		beforeRouteEnter(to, from, next) {
			next(vm => {
				var creator_ = to.params.id; //好的抓到id了
				vm.detId = to.params.id;
				//获取详情
				vm.axios.post('/wx/listing/importedList?memberID=' + creator_).then((response) => {
					// console.log(response);
					vm.resourceList = response.entity.list;
					vm.totalPage = response.entity.totalPage;
					vm.pageCurrent = response.entity.pageCurrent;
					if (response.entity.totalRow == 0) {
						vm.resshow = true;
					} else {
						vm.resshow = false;
					}
					if (response.entity.totalPage == 1) {
						vm.moreText = "全部加载完成"
					} else {
						vm.moreText = "下拉加载更多"
					}
					vm.loading = false;
				});
			})
		},
		created() {
			//执行上拉
			window.addEventListener('scroll', this.onScroll);
		},
		mounted() {

			// //获取详情
			// this.$http.post('/wx/trade/getListingList').then((response) => {
			// 	// console.log(response);
			// 	this.resourceList = response.entity.list;
			// 	this.totalPage = response.entity.totalPage;
			// 	this.pageCurrent = response.entity.pageCurrent;
			// 	if(response.entity.totalRow==0){
			// 		this.resshow=true;
			// 	}else{
			// 		this.resshow=false;
			// 	}
			// 	if(response.entity.totalPage==1){
			// 		this.moreText="全部加载完成"
			// 	}else{
			// 		this.moreText="下拉加载更多"
			// 	}
			// 	this.loading=false;
			// });
		},
		methods: {
			
			timestampToTime (cjsj) {
			        var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			        var Y = date.getFullYear() + '-'
			        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
			        var D = date.getDate() + ' '
			        var h = date.getHours() + ':'
			        var m = date.getMinutes() + ':'
			        var s = date.getSeconds()
			        return Y+M+D+h+m+s
			},
			
			switchOrder(i) {
				window.scroll(0, 0);
				this.status = i;
				this.loading = true;
				this.pageCurrent = 1;
				this.pageNum = 1;
				this.$http.post('/wx/listing/importedList?memberID=' + this.detId+'&status='+this.status).then((response) => {
					this.resourceList = response.entity.list;
					this.totalPage = response.entity.totalPage;
					if (response.entity.totalRow == 0) {
						this.resshow = true;
					} else {
						this.resshow = false;
					}
					// console.log(response);
					this.loading = false;
				})
			},
			// 执行状态操作
			ChangeState(state) {
				let params = new URLSearchParams();
				let resID = new Array();
				let resList = document.getElementsByClassName("radio_type_chick");

				for (var i = 0; i < resList.length; i++) {
					if (resList[i].checked == true) {
						resID.push(resList[i].value);
					}

				}
				let resIDText = resID.join(",");
				params.append("ids", resIDText);
				// console.log(params)
				if (params.get("listingIDs") != '') {
					this.$http.post('/wx//listing/changeListing?' + params + '&status=' + state).then((response) => {
						for (var i = 0; i < resID.length; i++) {
							for (var z = 0; z < this.resourceList.length; z++) {
								if (resID[i] == this.resourceList[z].listingID) {
									this.resourceList[z].status = state;
								}
							}
						}
						this.$message({
							showClose: true,
							message: '状态修改成功',
							type: 'success'
						});
						this.checked = false;
						this.checkList = [];
					});
				} else {
					this.$message({
						message: "请选择挂牌单进行操作",
						type: 'error',

					});
				}

			},
			//前往详情
			godetails(item_, listingID_, listingType_) {
				this.$router.push({
					name: 'resDetails',
					query: {
						id: item_,
						listingID: listingID_,
						listingType: listingType_,
					}
				});
			},
			// 全选
			checkedAll: function() {
				var _this = this;
				if (_this.checked) { //实现反选
					_this.checkList = [];
				} else { //实现全选
					_this.checkList = [];
					if (this.resourceList) {
						this.resourceList.forEach(function(item, index) {
							_this.checkList.push(item.importlistingID);
						});
					}
				}

			},

			//上拉加载更多
			onScroll() {
				let innerHeight = document.querySelector('#app').clientHeight;
				let outerHeight = document.documentElement.clientHeight;
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				// console.log(innerHeight + " " + outerHeight + " " + scrollTop);
				if (innerHeight < (outerHeight + scrollTop + 30)) {
					if (this.pageNum < this.totalPage && this.pageflag == true) {

						this.pageflag = false;
						this.pageNum = this.pageNum + 1;
						this.loading = true;
						this.$http.post('/wx/listing/importedList?memberID='+ this.detId +'&pageNo=' + this.pageNum + '&status=' + this.status).then((response) => {
							// console.log(response)
							let ListTest = response.entity.list;
							this.totalPage = response.entity.totalPage;
							this.pageCurrent = response.entity.pageCurrent;
							this.resourceList = this.resourceList.concat(ListTest);
							this.loading = false;
							this.pageflag = true;
						})
						this.moreText = "下拉加载更多";

					} else if (this.pageCurrent >= this.totalPage) {
						this.moreText = "全部加载完成"
					}

				}
			},
		},
		watch: {
			'checkList': {
				handler: function(val, oldVal) {
					if (val.length === this.resourceList.length) {
						this.checked = true;
					} else {
						this.checked = false;
					}

				},
				deep: true
			}
		},
	}
</script>

<style lang="scss">

</style>
