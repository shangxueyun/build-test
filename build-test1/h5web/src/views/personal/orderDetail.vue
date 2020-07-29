<template>
	<div class="order_det" v-loading="loading">
		<div class="topBack">
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>资源详情</p>
		</div>
		<div class="addHeight"></div>
		<a href="https://care60.live800.com/live800/chatClient/chatbox.jsp?companyID=80003104&configID=1383" class="linkKefu">
			如果您需要帮助请联系在线客服<img src="../../assets/img/kefu.png" alt="">
		</a>


		<div class="ord_con">
			<ul class="ord_li">
				<li v-for="(item,index) in orddet.list">
					<div @click="clickItem(index)">
						<div class="fl">
							<p class="bt">{{item.batchID}}</p>
							<p class="shuju">（长度 <span>30.1</span>/马值 <span>4.0</span>/强力 <span>27.8</span>）</p>
						</div>
						<img :class="{up:index==limit}" class="fr downIcon" src="../../assets/img/down_icon.png" alt="">
						<div class="clear"></div>
					</div>

					<div class="listDown" v-show="index==limit">
						<div class="down_inx">
							<p class="tit fl" style="color: #ffd440;">年份/包数:</p>
							<p class="num fr">{{item.cottonYear}}/{{item.packnum}}</p>
							<div class="clear"></div>
						</div>
						<div class="down_inx">
							<p class="tit fl">数量:</p>
							<p class="num fr">{{item.amount}}吨(公)</p>
							<div class="clear"></div>
						</div>
						<div class="down_inx">
							<p class="tit fl">单价:</p>
							<p class="num fr">{{item.price}}元/吨</p>
							<div class="clear"></div>
						</div>
						<div class="down_inx">
							<p class="tit fl">金额:</p>
							<p class="num fr" style="color: #fe8a51;">￥{{item.money}}</p>
							<div class="clear"></div>
						</div>
					</div>
				</li>
				<!-- <li v-for="item in orddet.list">
					<div class="fl"><p class="bt">{{item.batchID}}</p><p class="shuju">（长度 <span>30.1</span>/马值 <span>4.0</span>/强力 <span>27.8</span>）</p></div>
					<img class="fr downIcon" src="../../assets/img/down_icon.png" alt="">
					<div class="clear"></div>
				</li> -->
			</ul>
			<!-- <table class="order_con">
				<tr class="bt">
					<td>批次</td><td>数量(吨)</td><td>价格(元/吨)</td>
				</tr>
				<tr v-for="item in orddet.list">
					<td>{{item.batchID}}</td><td>{{item.amount}}</td><td>{{item.price}}</td>
				</tr>
			</table> -->
			<!-- <div class="order_tongji">
				<p>长度<span>{{orddet.lengthAvg}}</span></p>
				<p>强力<span>{{orddet.strongAvg}}</span></p>
				<p>马值<span>{{orddet.mikeAvg}}</span></p>
			</div> -->

		</div>
		<div class="ord_con" style="margin-top: 0.2rem;">
			<div class="tongji">
				<!-- <div class="tongji_inx">
					<p class="bt fl">{{orddet.deliveryName}}</p>
					<p class="fr songhuo">合计：<span>￥{{orddet.moneySum}}</span></p>
					<div class="clear"></div>
				</div> -->
				<div class="tongji_inx">
					<p class="bt fl">订单总金额：</p>
					<p class="fr jine" style="color: #fd7320 !important;font-size: 0.34rem;">￥{{orddet.money}}</p>
					<div class="clear"></div>
				</div>
				<div class="tongji_inx">
					<p class="bt fl">订单总重量： </p>
					<p class="fr jine" style="color: #fd7320 !important;font-size: 0.34rem;">{{orddet.amount}}吨</p>
					<div class="clear"></div>
				</div>
				<div class="tongji_inx">
					<p class="bt fl">定金最后支付日期：</p>
					<p class="fr jine">{{orddet.lastDepositDate}}</p>
					<div class="clear"></div>
				</div>
				<div class="tongji_inx">
					<p class="bt fl">定金金额：</p>
					<p class="fr jine">￥{{orddet.deposit}}</p>
					<div class="clear"></div>
				</div>
				<div class="tongji_inx">
					<p class="bt fl">余款最后支付日期：</p>
					<p class="fr jine">{{orddet.lastPaymentDate}}</p>
					<div class="clear"></div>
				</div>
				<!-- <div class="tongji_inx">
					<p class="bt fl">仓储费结算日：</p>
					<p class="fr jine">￥{{orddet.loanMoneyFormat}}</p>
					<div class="clear"></div>
				</div> -->
				<div class="tongji_inx">
					<p class="bt fl">提货方式：</p>
					<p class="fr jine" v-if="orddet.deliveryMode==10001">需方自提</p>
					<p class="fr jine" v-if="orddet.deliveryMode==10002">供方送货</p>
					<div class="clear"></div>
				</div>
				<div class="tongji_inx">
					<p class="bt fl">订单创建时间：</p>
					<p class="fr jine">{{orddet.createDate}} {{orddet.createTime}}</p>
					<div class="clear"></div>
				</div>
			</div>
		</div>
		<div class="ord_con" style="margin-top: 0.2rem;">
			<div class="tongji_inx" style="padding: 0.18rem 0;" @click="godetails()">
				<p class="bt fl">联系卖家</p>
				<p class="fr maijia"><img src="../../assets/img/right_icon.png" alt=""></p>
				<div class="clear"></div>
			</div>
		</div>
		
		<div class="ord_bot">
			<p class="course_bt">订单执行过程</p>
			<ul>
				<li class="course" v-for="item in orddetList">
					<i class="dian fl"></i>
					<p class="data fl">{{item.procDate}}</p>
					<p class="price fl">{{item.money}}元</p>
					<p v-if="item.type == 0" class="sta fl">订单创建</p>
					<p v-if="item.type == 1" class="sta fl">订单确认</p>
					<p v-if="item.type == 2" class="sta fl">买家支付</p>
					<p v-if="item.type == 3" class="sta fl">卖家发货</p>
					<p v-if="item.type == 4" class="sta fl">卖家开票</p>
					<p v-if="item.type == 5" class="sta fl">订单关闭</p>
					<input v-if="item.type == 4" class="fr" type="button" value="发票跟踪" @click="logistic(item.id)">
					<div class="clear"></div>
				</li>
			</ul>
		</div>
		<div class="logistics" v-if="logistics">
			<div class="logistics_bg" @click="closeLog()"></div>
			<div class="logistics_con">
				<div class="logi_top">
					<p class="title fl">发票跟踪</p>
					<img class="logi_close fr" src="../../assets/img/logi_close.png" alt="" @click="closeLog()">
					<div class="clear"></div>
				</div>
				<div class="logi_con">
					<p class="p1">发票已寄出</p>
					<p class="p2">快递单号：6228480323305592</p>
				</div>
				<div class="logi_list" id="logi_list">
					<i class="logi_line" id="logi_line"></i>
					<ul>
						<li v-for="(item,index) in logiList">
							<i :class="{'one':index==0}" class="ic fl"></i>
							<!-- <i class="ic fl"></i> -->
							<div class="address fl">
								<p :class="{'one':index==0}" class="p1">{{item.context}}</p>
								<p class="p2">{{item.time}}</p>
							</div>
							<div class="clear"></div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				orddet: '',
				loading: true,
				detId: '',
				orddetList: '',
				logistics: false,
				logiList: '',
				limit: -1,
			}
		},
		methods: {
			clickItem(index) {
				if (index == this.limit) {
					this.limit = -1
				} else {
					this.limit = index;
				}
			},
			// 转换时间戳
			timestampToTime(cjsj) {
				var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000

				var Y = date.getFullYear() + '/'
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
				var D = date.getDate() + ' '
				var h = date.getHours() + ':'
				var m = date.getMinutes() + ':'
				var s = date.getSeconds()
				return Y + M + D + h + m + s
			},
			// 前往详情信息
			godetails() {
				this.$router.push({
					name: 'seller',
					params: {
						id: this.detId
					}
				});
			},
			logistic(id){
				this.logistics=!this.logistics;
				this.$http.post('/wx/trade/getExpress?id='+id).then((response) => {
					this.logiList = response.entity[0].data
					setTimeout(function() {
						var height = document.getElementById("logi_list").scrollHeight;
						document.getElementById("logi_line").style.height=height+'px';
					}, 10);
					
				});
			},
			closeLog(){
				this.logistics=false;
				this.logiList=''
			},
		},
		updated() {
			window.scroll(0, 0);
		},
		
		//获取详情
		beforeRouteEnter(to, from, next) {
			//beforeRouteEnter中this无效，所以能用vm
			next(vm => {
				var creator_ = to.params.id; //好的抓到id了
				vm.detId = to.params.id;
				vm.axios.post('/wx/trade/getOrder?orderID=' + creator_).then((response) => {
					// vm.songlikelist = res.data.data;
					// console.log(response)
					vm.orddet = response.entity;
					vm.loading = false;
				});
				vm.axios.post('/wx/trade/getOrderProgress?orderID=' + creator_ + '&buySell=1').then((response) => {
					// vm.songlikelist = res.data.data;
					// console.log(response)
					vm.orddetList = response.entity;
				});
			})
		},
	}
</script>

<style lang="scss">
	.ord_top {
		background: #fff;
		text-align: center;
		padding: 0.48rem 0;

		img {
			height: 0.75rem;
		}

		p {
			font-size: 0.3rem;
			color: #090909;
			margin-top: 0.15rem;
		}
	}

	.ord_con {
		background: #fff;
		padding: 0rem 0.3rem 0 0.3rem !important;
		width: 6.9rem;
		margin-top: 0.2rem;

		.ord_li {
			li {
				border-bottom: 1px solid #ececec;
			}

			p {
				display: inline-block;
			}

			.bt {
				font-size: 0.28rem;
				height: 0.8rem;
				line-height: 0.8rem;
			}

			.shuju {
				font-size: 0.26rem;
				color: #999999;
				height: 0.8rem;
				line-height: 0.8rem;

				span {
					color: #000;
				}
			}

			.downIcon {
				width: 0.3rem;
				margin-top: 0.35rem;
			}
			.downIcon.up {
				transform:rotate(180deg);
				-ms-transform:rotate(180deg); 	/* IE 9 */
				-moz-transform:rotate(180deg); 	/* Firefox */
				-webkit-transform:rotate(180deg); /* Safari 和 Chrome */
				-o-transform:rotate(180deg); 	/* Opera */
			}
			.listDown {
				line-height: 0.6rem;

				.tit {
					color: #999999;
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

		.order_tongji {
			border: 1px solid #ececec;
			border-top: none;

			p {
				display: inline-block;
				font-size: 0.24rem;
				color: #999999;
				margin-left: 0.2rem;

				span {
					color: #333333;
					margin-left: 0.1rem;
					line-height: 0.75rem;
				}
			}
		}

		.tongji {
			.tongji_inx {
				border: none !important;

				.bt {
					color: #999999;
				}

				p {
					line-height: 0.6rem !important;
				}

				p.songhuo {
					color: #999999;
					font-size: 0.24rem;

					span {
						font-size: 0.34rem;
						color: #000000 !important;
					}
				}

				p.jine {
					font-size: 0.26rem;
					color: #000 !important;
				}

				.maijia img {
					height: 0.2rem;
					margin-top: 0.4rem;
				}
			}

			.tongji_inx:nth-last-child(1) {
				border-bottom: none;
			}
		}
	}

	.ord_bot {
		background: #fff;
		margin-top: 0.2rem;
		width: 6.9rem;
		padding: 0.2rem 0.3rem;
		padding-bottom: 2rem;

		.course_bt {
			color: #333333;
			font-size: 0.26rem;
			line-height: 0.7rem;
		}

		.course {
			padding: 0.1rem 0;

			.dian {
				display: block;
				width: 0.1rem;
				height: 0.1rem;
				background: #e9e9e9;
				border-radius: 0.1rem;
				margin-top: 0.13rem;
			}

			.data {
				font-size: 0.24rem;
				color: #999999;
				margin-left: 0.3rem;
			}

			.price {
				font-size: 0.24rem;
				color: #999999;
				margin-left: 0.3rem;
			}

			.sta {
				font-size: 0.24rem;
				color: #999999;
				margin-left: 0.3rem;
			}

			input {
				color: #ffffff;
				background: #fd7320;
				border: none;
				padding: 0.02rem 0.08rem;
				font-size: 0.24rem;
			}
		}

		.course:nth-child(1) {
			.dian {
				background: #15a966;
			}
		}
	}

	.linkKefu {
		display: block;
		background: #ffd440;
		text-align: center;
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.26rem;
		color: #000;
		img {
			width: 0.4rem;
			margin-top: 0.2rem;
			margin-left: 0.1rem;
		}
	}

	.logistics {
		.logistics_bg {
			position: fixed;
			background: #000;
			opacity: 0.3;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
		}

		.logistics_con {
			background: #fff;
			position: fixed;
			left: 0.5rem;
			right: 0.5rem;
			top: 2rem;
			border-radius: 0.15rem;
			padding: 0.2rem 0.25rem;

			.logi_top {
				border-bottom: 1px solid #eaeaea;
				padding: 0.1rem 0 0.25rem 0;

				.title {
					font-size: 0.26rem;
				}
				.logi_close{width: 0.34rem;margin-top: 0.06rem;}
			}

			.logi_con {
				text-align: center;
				padding: 0.2rem;

				.p1 {
					color: #14bab4;
					font-size: 0.3rem;
				}

				.p2 {
					color: #666666;
					font-size: 0.26rem;
				}
			}

			.logi_list {
				position: relative;
				height: 6rem;
				overflow-y: scroll;
				.logi_line{
					width: 1px;background: #dddddd;position: absolute;top: 0.1rem;left: 0.1rem;z-index: -1;
				}
				li {
					margin-bottom: 0.4rem;

					.ic {
						display: block;
						width: 0.2rem;
						height: 0.2rem;
						border-radius: 50%;
						background: #dddddd;
						margin-top: 0.1rem;
					}
					.ic.one{
						background-image: url(../../assets/img/ic.png);background-size: cover;
					}
					.address {
						display: block;
						width: 5.5rem;
						margin-left: 0.2rem;
						.p1{font-size: 0.24rem;color: #888888;}
						.p2{font-size: 0.24rem;color: #aaaaaa;}
						.p1.one{color: #fe8a51;}
					}
				}
			}
		}
	}
</style>
