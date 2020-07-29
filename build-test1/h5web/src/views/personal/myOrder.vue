<template>
	<div v-loading="loading">
		<div class="topBack" >
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>采购订单</p>
		</div>
		<div class="addHeight"></div>
		<div class="order_tab" style="top: 0.75rem;">
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
				<template v-for="(item, key) in listChildData">
					<list-child
					v-model="listChildData" :key="key" :purchasing="1" :listKey="key" @inputValueListChild="inputValueListChild" :listStatus="1"></list-child>
				</template>
			</div>
		</div>

	</div>
</template>

<script>
import ListChild from '@/components/ListChild/index'
	export default {
		components : {
			ListChild
		},
		data: function() {
			return {
				status: 0,
				buySell: '',
				orderList: '',
				loading: true,
				totalPage: 0,
				pageCurrent: 1,
				pageNum: 1,
				moreText: '全部加载完成',
				pageflag: true,
				resshow:true,
				listChildData:[{
					listID:1231,
					batchID:'65111191104',
					makeTime: 1595309353916,
					depotId: '123131',
					depotName: '新疆汇锦物流有限公司',
					amount: '42.222',
					packNum: '186',
					indexCode: 'CF2005',
					price: '154870',
					basisPrice: '538',
					notes: '[图片][图片][图片][图片][图片][图片][图片][图片][图片][图片]',
					confirmTime: '确认时间',
					bidOffered: 1,
					bidType: 1,
					lastPriceTime: 1595309353916,
				},
				{
					listID:123122,
					batchID:'65111191104',
					makeTime: 1595309353916,
					depotId: '548',
					depotName: '新疆汇锦物流有限公司',
					amount: '42.56',
					packNum: '186',
					indexCode: 'CF2005',
					price: '154870',
					basisPrice: '538',
					notes: '这是备注',
					confirmTime: '确认时间',
					listingValidity: 1595309353916,
				}],
			}
		},

		created() {
			//执行上拉
			window.addEventListener('scroll', this.onScroll1);
		},
		mounted() {

			// this.$http.post('/wx/trade/getOrderList?status='+this.status+'&buySell=1').then((response) => {
			// 	
			// })
		},

		methods: {
			inputValueListChild (key, value, listID) {
				
				
			},
			//切换列表
			switchOrder(i) {
				this.status = i;
				this.loading = true;
				this.pageCurrent =1;
				this.pageNum =1;
				this.$http.post('/wx/trade/getOrderList?status=' + this.status + '&buySell=1').then((response) => {
					
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
					name: 'orderDetail',
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
						this.$http.post('/wx/trade/getOrderList?status=' + this.status + '&pageCurrent=' + this.pageNum + '&buySell=1').then(
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
				vm.axios.post('/wx/trade/getOrderList?status=' + orderId + '&buySell=1').then((response) => {
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
	.order_tab {
		background: #ededed;

		span {
			display: block;
			float: left;
			width: 2.5rem;
			text-align: center;
			padding: 0.3rem 0;
			position: relative;
			font-size: 0.3rem;
		}

		span:after {
			display: block;
			content: '';
			width: 0.5rem;
			height: 0.06rem;
			border-radius: 0.05rem;
			background: #14bab4;
			position: absolute;
			left: 1rem;
			bottom: 0.05rem;
			opacity: 0;
		}

		span.active {
			color: #14bab4;
		}

		span.active:after {
			opacity: 1;
		}
	}

	.orderList {
		padding-bottom: 4rem;

		.order_inx {
			background: #fff;
			width: 7.1rem;
			padding: 0.2rem 0.2rem;
			margin-bottom: 0.2rem;

			.ordder_top {
				margin-bottom: 0.2rem;

				.ziying {
					display: block;
					padding: 0.03rem 0.1rem;
					background: #14bab4;
					color: #fff;
					font-size: 0.22rem;
				}

				.ord_num {
					color: #333333;
					font-size: 0.28rem;
					margin-left: 0.2rem;
				}

				.ord_sta {
					font-size: 0.26rem;

					img {
						height: 0.24rem;
						margin-top: 0.07rem;
						margin-left: 0.1rem;
					}
				}
			}

			.order_con {
				tr {
					width: 100%;

					td {
						width: 2.1rem;
						border: 1px solid #ececec;
						padding: 0.2rem 0.2rem;
						font-size: 0.26rem;
						color: #333333;
					}

					td:nth-child(1) {
						text-align: left;
					}

					td:nth-child(2) {
						text-align: center;
					}

					td:nth-child(3) {
						text-align: right;
					}
				}

				tr:nth-child(1) {
					background: #f7f7f7;

					td {
						color: #999999;
					}
				}
			}

			.order_bot {
				margin-top: 0.2rem;

				.ord_data {
					color: #999999;
					font-size: 0.24rem;
				}

				.ord_price {
					color: #999999;
					font-size: 0.24rem;

					span {
						color: #fd7320;
						font-size: 0.28rem;
					}
				}
			}
		}
	}
</style>
