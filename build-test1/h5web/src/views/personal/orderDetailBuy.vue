<template>
	<div class="order_det" v-loading="loading">
		<div class="topBack" >
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>资源详情</p>
		</div>
		<div class="addHeight"></div>
		<div v-if="orddet.status == 0" class="ord_top">
			<img src="../../assets/img/daiqueren.png" alt="">
			<p class="">待确认</p>
		</div>
		<div v-if="orddet.status == 1" class="ord_top">
			<img src="../../assets/img/daifukuan.png" alt="">
			<p class="">执行中</p>
		</div>
		<div v-if="orddet.status == 2" class="ord_top">
			<img src="../../assets/img/yizuofei.png" alt="">
			<p class="">已关闭</p>
		</div>
		<div v-if="orddet.status == 3" class="ord_top">
			<img src="../../assets/img/yizuofei.png" alt="">
			<p class="">已关闭</p>
		</div>
		<div v-if="orddet.status == 4" class="ord_top">
			<img src="../../assets/img/daishouhuo.png" alt="">
			<p class="">已完成</p>
		</div>
		<div v-if="orddet.status == 5" class="ord_top">
			<img src="../../assets/img/daishouhuo.png" alt="">
			<p class="">已完成</p>
		</div>
		<div v-if="orddet.status == 6" class="ord_top">
			<img src="../../assets/img/daishouhuo.png" alt="">
			<p class="">已完成</p>
		</div>
		<div v-if="orddet.status == 7" class="ord_top">
			<img src="../../assets/img/daishouhuo.png" alt="">
			<p class="">已完成</p>
		</div>
		<div v-if="orddet.status == 8" class="ord_top">
			<img src="../../assets/img/daishouhuo.png" alt="">
			<p class="">已完成</p>
		</div>
		<div v-if="orddet.status == 8" class="ord_top">
			<img src="../../assets/img/yizuofei.png" alt="">
			<p class="">已作废</p>
		</div>
		
		
		<div class="ord_con">
			<table class="order_con">
				<tr class="bt">
					<td>批次</td><td>数量(吨)</td><td>价格(元/吨)</td>
				</tr>
				<tr v-for="item in orddet.list">
					<td>{{item.batchID}}</td><td>{{item.amount}}</td><td>{{item.price}}</td>
				</tr>
			</table>
			<!-- <div class="order_tongji">
				<p>长度<span>{{orddet.lengthAvg}}</span></p>
				<p>强力<span>{{orddet.strongAvg}}</span></p>
				<p>马值<span>{{orddet.mikeAvg}}</span></p>
			</div> -->
			<div class="tongji">
				<div class="tongji_inx">
					<p class="bt fl">{{orddet.deliveryName}}</p>
					<p class="fr songhuo">合计：<span>￥{{orddet.moneySum}}</span></p>
					<div class="clear"></div>
				</div>
				<div class="tongji_inx">
					<p class="bt fl">融资金额</p>
					<p class="fr jine">￥{{orddet.loanMoneyFormat}}</p>
					<div class="clear"></div>
				</div>
				<div class="tongji_inx" @click="godetails()">
					<p class="bt fl">联系买家</p>
					<p class="fr maijia"><img src="../../assets/img/right_icon.png" alt=""></p>
					<div class="clear"></div>
				</div>
			</div>
		</div>
		<div class="ord_bot">
			<p class="course_bt">订单执行过程</p>
			<ul>
				<li class="course" v-for="item in orddetList">
					<i class="dian fl"></i>
					<p class="data fl">{{item.procDate}}</p>
					<p class="price fl">{{item.money}}元</p>
					<p v-if="item.status == 0" class="sta fr">订单创建</p>
					<p v-if="item.status == 1" class="sta fr">订单确认</p>
					<p v-if="item.status == 2" class="sta fr">买家支付</p>
					<p v-if="item.status == 3" class="sta fr">卖家发货</p>
					<p v-if="item.status == 4" class="sta fr">卖家开票</p>
					<p v-if="item.status == 5" class="sta fr">订单关闭</p>
					<div class="clear"></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		data:function(){
			return{
				orddet:'',
				loading:true,
				detId:'',
				orddetList:'',
			}
		},
		methods:{
			//前往详情信息
			godetails() {
				this.$router.push({
					name: 'sellerBuy',
					params: {
						id: this.detId
					}
				});
			},
		},
		updated() {
		        window.scroll(0, 0);
		    },
			//获取订单详情
		beforeRouteEnter (to, from, next) {
		//beforeRouteEnter中this无效，所以能用vm
		        next(vm => {
		          var creator_ = to.params.id;//好的抓到id了
				  vm.detId=to.params.id;
		          vm.axios.post('/wx/trade/getOrder?orderID='+creator_).then((response)=>{
		            // vm.songlikelist = res.data.data;
					// console.log(response)
					vm.orddet=response.entity;
					vm.loading=false;
		          });
				  vm.axios.post('/wx/trade/getOrderProgress?orderID='+creator_+'&buySell=1').then((response)=>{
		            // vm.songlikelist = res.data.data;
					// console.log(response)
					vm.orddetList=response.entity;
		          });
		        })
		      },
	}
</script>

<style lang="scss">
	.ord_top{background: #fff;text-align: center;padding: 0.48rem 0;
		img{height: 0.75rem;}
		p{font-size: 0.3rem;color: #090909;margin-top: 0.15rem;}
	}
	.ord_con{background: #fff;padding: 0.2rem 0.3rem 0 0.3rem;width: 6.9rem;margin-top: 0.2rem;
		.order_con{
			tr{
				width: 100%;
				td{
					width: 2.1rem;border: 1px solid #ececec;padding: 0.2rem 0.2rem;font-size: 0.26rem;color: #333333;
				}
				td:nth-child(1){text-align: left;}
				td:nth-child(2){text-align: center;}
				td:nth-child(3){text-align: right;}
			}
			tr:nth-child(1){
				background: #f7f7f7;
				td{color: #999999;}
			}
		}
		.order_tongji{border: 1px solid #ececec;	border-top: none;
			p{display: inline-block;font-size: 0.24rem;color: #999999;margin-left: 0.2rem;
				span{color: #333333;margin-left: 0.1rem;line-height: 0.75rem;}
			}
		}
		.tongji{
			.tongji_inx{border-bottom: 1px solid #ececec;
				p{line-height: 0.8rem;}
				p.songhuo{color: #999999;font-size: 0.24rem;
					span{font-size: 0.34rem;color: #fd7320;}
				}
				p.jine{color: #fd7320;font-size: 0.26rem;}
				.maijia img{height: 0.23rem;margin-top: 0.3rem;}
			}
			.tongji_inx:nth-last-child(1){border-bottom: none;}
		}
	}
	
	.ord_bot{background: #fff;margin-top: 0.2rem;width: 6.9rem;padding: 0.2rem 0.3rem;padding-bottom: 2rem;
		.course_bt{color: #333333;font-size: 0.26rem;line-height: 0.7rem;}
		.course{padding: 0.1rem 0;
			.dian{display: block;width: 0.1rem;height: 0.1rem;background: #e9e9e9;border-radius: 0.1rem;margin-top: 0.13rem;}
			.data{font-size: 0.24rem;color: #999999;margin-left: 0.3rem;}
			.price{font-size: 0.24rem;color: #999999;margin-left: 0.3rem;}
			.sta{font-size: 0.24rem;color: #999999;}
		}
		.course:nth-child(1){
			.dian{background: #15a966;}
		}
	}
</style>
