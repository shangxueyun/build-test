<template>
	<div v-loading="loading">
		<div class="topBack" >
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>销售订单</p>
		</div>
		<div class="addHeight"></div>
		<div class="order_tab">
			<span :class="{'active':status==0}" @click="switchOrder(0)">全部</span>
			<span :class="{'active':status==1}" @click="switchOrder(1)">待确认</span>
			<span :class="{'active':status==7}" @click="switchOrder(7)">已确认</span>
			<!-- <span :class="{'active':status==3}" @click="switchOrder(3)">待收货</span>
			<span :class="{'active':status==4}" @click="switchOrder(4)">待收票</span>
			<span :class="{'active':status==5}" @click="switchOrder(5)">已过期</span> -->
			<div class="clear"></div>
		</div>
		<div class="orderList">
			<ul>
				<li class="order_inx" v-for="(item,index) in orderList" @click="godetails(item)">
					<div class="ordder_top">
						<!-- <p v-if="item.listingType==1" class="ziying fl">自营</p> -->
						<p class="ord_num fl">订单编号：{{item.orderID}}</p>
						<p class="ord_sta fr">
							<span v-if="item.status == 0">待确认</span>
							<span v-if="item.status == 1">执行中</span>
							<span v-if="item.status == 2">已关闭</span>
							<span v-if="item.status == 3">已关闭</span>
							<span v-if="item.status == 4">已完成</span>
							<span v-if="item.status == 5">已完成</span>
							<span v-if="item.status == 6">已完成</span>
							<span v-if="item.status == 7">已完成</span>
							<span v-if="item.status == 8">已完成</span>
							<span v-if="item.status == 9">已作废</span>
							<img src="../../assets/icon/right_icon.png" alt="">
						</p>
						<div class="clear"></div>
					</div>
					<table class="order_con">
						<tr class="bt">
							<td>批次</td>
							<td>数量(吨)</td>
							<td>价格(元/吨)</td>
						</tr>
						<tr v-for="items in item.list">
							<td>{{items.batchID}}</td>
							<td>{{items.amount}}</td>
							<td>{{items.price}}</td>
						</tr>
					</table>
					<div class="order_bot">
						<p class="ord_data fl">{{item.createDate}} {{item.createTime}}</p>
						<p class="ord_price fr">合计：<span>￥{{item.moneySum}}</span></p>
						<div class="clear"></div>
					</div>
				</li>
			</ul>
			<p v-if="!resshow" class="more_btn">{{moreText}}</p>
			<div v-if="resshow" class="noRes">
				<img src="../../assets/img/noRes.png" alt="">
				<p>未找到相关订单，请前往下单</p>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				status: 0,
				buySell: '',
				orderList: '',
				loading: true,
				totalPage: 0,
				pageCurrent: 1,
				pageNum: 1,
				moreText: '下拉加载更多',
				pageflag: true,
				resshow:true,
			}
		},
		created() {
			//执行上拉
			window.addEventListener('scroll', this.onScroll1);
		},
		mounted() {

			// this.$http.post('/wx/trade/getOrderList?status='+this.status+'&buySell=2').then((response) => {
			// 	console.log(response);
			// 	this.totalPage = response.entity.totalPage;
			// 	this.pageCurrent = response.entity.pageCurrent;
			// 	if(response.entity.totalPage==1){
			// 		this.moreText="全部加载完成"
			// 	}else{
			// 		this.moreText="下拉加载更多"
			// 	}
			// })
		},

		methods: {
			//切换列表
			switchOrder(i) {
				this.status = i;
				this.loading = true;
				this.pageCurrent =1;
				this.pageNum =1;
				this.$http.post('/wx/trade/getOrderList?status=' + this.status + '&buySell=2').then((response) => {
					this.orderList = response.entity.list;
					this.totalPage = response.entity.totalPage;
					if(response.entity.totalRow==0){
						this.resshow=true;
					}else{
						this.resshow=false;
					}
					// console.log(response);
					this.loading = false;
				})
			},
			//前往详情
			godetails(item_) {
				this.$router.push({
					name: 'orderDetailBuy',
					params: {
						id: item_.orderID
					}
				});
			},
			//上拉加载更多
			onScroll1() {
				let innerHeight = document.querySelector('#app').clientHeight;
				let outerHeight = document.documentElement.clientHeight;
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				// console.log(innerHeight + " " + outerHeight + " " + scrollTop);
				if (innerHeight < (outerHeight + scrollTop+100)) {

					if (this.pageCurrent < this.totalPage && this.pageflag == true) {
						this.pageflag = false;
						this.pageNum = this.pageNum + 1;
						this.loading = true;
						this.$http.post('/wx/trade/getOrderList?status=' + this.status + '&pageCurrent=' + this.pageNum + '&buySell=2').then(
							(response) => {
								// console.log(response);
								let ListTest = response.entity.list;
								this.totalPage = response.entity.totalPage;
								this.pageCurrent = response.entity.pageCurrent;
								this.orderList = this.orderList.concat(ListTest);
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
		//加载列表
		beforeRouteEnter(to, from, next) {
			//beforeRouteEnter中this无效，所以能用vm
			next(vm => {
				var orderId = to.params.id; //好的抓到id了
				vm.status = orderId;
				vm.axios.post('/wx/trade/getOrderList?status=' + orderId + '&buySell=2').then((response) => {
					// console.log(response)
					vm.orderList = response.entity.list;
					vm.totalPage = response.entity.totalPage;
					vm.pageCurrent = response.entity.pageCurrent;
					if(response.entity.totalRow==0){
						vm.resshow=true;
					}else{
						vm.resshow=false;
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
	}
</script>

<style lang="scss">
</style>
