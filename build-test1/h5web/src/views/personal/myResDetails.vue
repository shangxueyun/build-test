<template>
	<div class="res_det" v-loading="loading">
		<div class="topBack" >
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>资源详情</p>
		</div>
		<div class="addHeight"></div>
		<div class="res_t">
			<div class="res_top wrap">
				<!-- <p class="top_cla">自营</p> -->
				<p class="top_num">{{res_det.batchID}}</p>
				<p class="top_grade">{{res_det.primaryColorName}}</p>
				<p class="top_lei">{{res_det.cottonTypeName}}</p>
				<!-- <p class="top_date">2019-06-03</p> -->
				<a :href="imgSrc">
					<img class="addpic" src="../../assets/img/shengchegtupian.png" alt="">
				</a>

				<div class="clear"></div>
			</div>
			<div class="res_con">
				<div><span class="title">长度</span></br><span class="num">{{res_det.lengthAvg}}</span></div><i></i>
				<div><span class="title">强力</span></br><span class="num">{{res_det.strongAvg}}</span></div><i></i>
				<div><span class="title">马值</span></br><span class="num">{{res_det.mikeAvg}}</span></div><i></i>
				<div><span class="title">含杂率</span></br><span class="num">{{res_det.impurity}}</span></div><i></i>
				<div><span class="title">回潮率</span></br><span class="num">{{res_det.moisture}}</span></div>
				<div class="clear"></div>
			</div>
		</div>
		<div class="res_c">
			<p>加工企业：<span>{{res_det.factoryName}}</span></p>
			<p>产&nbsp;&nbsp;&nbsp;地：<span>{{res_det.origins}}</span></p>
			<p>仓&nbsp;&nbsp;&nbsp;库：<span>{{res_det.depotName}}</span></p>
			<!-- <p>卖&nbsp;&nbsp;&nbsp;家：<span>农五师八十六团加工厂</span></p>
			<p>条&nbsp;&nbsp;&nbsp;款：<span>出库费由卖家承担（卖家可自己编辑）</span></p>
			<p>联系人：<span>{{res_det.userName}}<img src="@/assets/img/inf.png" alt=""></span></p> -->
		</div>
		<div class="price">
			<div>
				<p class="p1 fl">价格（元/吨）</p>
				<p class="p2 fr">{{res_det.price}}</p>
				<div class="clear"></div>
			</div>
			<div class="mt">
				<p class="p3 fl">升贴水 485.00</p>
				<p class="p4 fr">公重<span>{{res_det.amount}}</span>吨</p>
				<div class="clear"></div>
			</div>
		</div>
		<div class="res_table">
			<p class="bt">棉花批次信息汇总表<span @click="godetails(batchID)">查看质量详情</span></p>
		</div>
		<div class="res_table_con">
			<table>
				<tr>
					<td class="bt">合计包数</td>
					<td>{{res_det.packnum}}包</td>
					<td class="bt">质量标识</td>
					<td>-</td>
				</tr>
				<tr>
					<td class="bt">合计毛重</td>
					<td>{{res_det.grossWeight}}包</td>
					<td class="bt">平均回溯</td>
					<td>{{res_det.moisture}}</td>
				</tr>
				<tr>
					<td class="bt">合计皮重</td>
					<td>{{res_det.tareWeight}}kg</td>
					<td class="bt">平均含杂</td>
					<td>{{res_det.impurity}}</td>
				</tr>
				<tr>
					<td class="bt">合计净重</td>
					<td>{{res_det.netWeight}}</td>
					<td class="bt">合计公重</td>
					<td>{{res_det.pubWeight}}</td>
				</tr>
			</table>
			<p class="tab_bt">主体颜色级：{{res_det.primaryColorName}}</p>
			<table>
				<tr>
					<td class="bt">白棉1级</td>
					<td>{{res_det.colorBM01}}</td>
					<td class="bt">白棉2级</td>
					<td>{{res_det.colorBM02}}</td>
				</tr>
				<tr>
					<td class="bt">白棉3级</td>
					<td>{{res_det.colorBM03}}</td>
					<td class="bt">白棉4级</td>
					<td>{{res_det.colorBM04}}</td>
				</tr>
				<tr>
					<td class="bt">白棉5级</td>
					<td>{{res_det.colorBM05}}</td>
					<td class="bt"></td>
					<td></td>
				</tr>
			</table>
			<p class="tab_bt">主体长度级：{{res_det.primaryLength}}</p>
			<table>
				<tr>
					<td class="bt">28mm</td>
					<td>{{res_det.length25 > 0 ? res_det.length25 :'-'}}</td>
					<td class="bt">29mm</td>
					<td>{{res_det.length26 > 0 ? res_det.length26 :'-'}}</td>
				</tr>
				<tr>
					<td class="bt">30mm</td>
					<td>{{res_det.length27 > 0 ? res_det.length27 :'-'}}</td>
					<td class="bt">31mm</td>
					<td>{{res_det.length28 > 0 ? res_det.length28 :'-'}}</td>
				</tr>
				<tr>
					<td class="bt">32mm</td>
					<td>{{res_det.length29 > 0 ? res_det.length29 :'-'}}</td>
					<td class="bt">33mm</td>
					<td>{{res_det.length30 > 0 ? res_det.length30 :'-'}}</td>
				</tr>
				<tr>
					<td class="bt">34mm</td>
					<td>{{res_det.length31 > 0 ? res_det.length31 :'-'}}</td>
					<td class="bt">35mm</td>
					<td>{{res_det.length32 > 0 ? res_det.length32 :'-'}}</td>
				</tr>
			</table>
			<p class="tab_bt">马克隆长度级：{{res_det.primaryMike}}</p>
			<table>
				<tr>
					<td class="bt">C1</td>
					<td>{{res_det.mikeC1}}</td>
					<td class="bt">B1</td>
					<td>{{res_det.mikeB1}}</td>
				</tr>
				<tr>
					<td class="bt">A</td>
					<td>{{res_det.mikeA}}</td>
					<td class="bt">B2</td>
					<td>{{res_det.mikeB2}}</td>
				</tr>
				<tr>
					<td class="bt">C2</td>
					<td>{{res_det.mikeC2}}</td>
					<td class="bt"></td>
					<td></td>
				</tr>
			</table>
			<p class="tab_bt">长度整齐度（%）</p>
			<table>
				<tr>
					<td class="bt">最小值</td>
					<td>{{res_det.neatMin}}</td>
					<td class="bt">最大值</td>
					<td>{{res_det.neatMax}}</td>
				</tr>
				<tr>
					<td class="bt">平均值</td>
					<td>{{res_det.neatAvg}}</td>
					<td class="bt"></td>
					<td></td>
				</tr>
			</table>
			<p class="tab_bt">断裂比强度（CN/tex）</p>
			<table>
				<tr>
					<td class="bt">最小值</td>
					<td>{{res_det.strongMin}}</td>
					<td class="bt">最大值</td>
					<td>{{res_det.strongMax}}</td>
				</tr>
				<tr>
					<td class="bt">平均值</td>
					<td>{{res_det.strongAvg}}</td>
					<td class="bt"></td>
					<td></td>
				</tr>
			</table>
		</div>
		<!-- <div class="join_cart">
			<input type="button" value="加入购物车" @click="joinCart(res_det.listingID)">
		</div> -->
	</div>

</template>

<script>
	export default {
		data: function() {
			return {
				batchID: '',
				res_det: '',
				loading: true,
				imgSrc: '',
			}
		},
		updated() {
			window.scroll(0, 0);
		},
		methods: {
			// joinCart(id){
			// 	this.$http.post('/wx/trade/addCartItem?listingID='+id).then((response) => {
			// 		// console.log(response);
			// 		if(response.success){
			// 			this.$message({
			// 			          showClose: true,
			// 			          message: '加入购物车成功',
			// 			          type: 'success'
			// 			        });
			// 		}else{
			// 			this.$message({
			// 			          showClose: true,
			// 			          message: '加入购物车失败',
			// 			          type: 'error'
			// 			        });
			// 		}
			// 	});
			// },
			godetails(item_) {
				//前往详情
				this.$router.push({
					name: 'qualityList',
					params: {
						id: item_
					}
				});
			},
			downPic(batchID) {
				//注意请求的时候要加上{responseType:'blob'}参数
				// axios.get('/url', {
				// responseType: 'arraybuffer'
				// }).then(response => {
				// return 'data:image/png;base64,' + btoa(
				// new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
				// )
				// }).then(data => {
				// this.img = data
				// })
				// 
				// 	this.$router.push({
				// 		path: 'http://192.168.1.11:8883/wx/product/printPng?batchID'+batchID
				// 	})  
				// this.$http.post('/wx/product/printPng?batchID='+batchID,{responseType: 'arraybuffer'}).then((response) => {
				// 	
				// 	
				// 	// this.imgSrc= 'data:image/png;base64,' + new Uint8Array(response)
				// 	
				// 		  // var alink = document.createElement("a");
				// 		  // alink.href = this.imgSrc;
				// 		  // alink.download = "pic"; //图片名
				// 		  // alink.click();
				// });
			}
		},
		// 获取详情
		beforeRouteEnter(to, from, next) {
			//beforeRouteEnter中this无效，所以能用vm
			next(vm => {
				var batchID = to.params.id; //好的抓到id了
				vm.batchID = batchID;
				vm.axios.post('/wx/product/getCottonBatch?batchID=' + vm.batchID).then((response) => {
					// vm.songlikelist = res.data.data;
					vm.res_det = response.entity;
					vm.imgSrc = 'https://mob.unioncotton.com/wx/product/printPng?batchID=' + batchID
					vm.loading = false;
					// console.log(response);
				});

			})
		},
	}
</script>

<style lang="scss">
	.res_table_con {
		background: #fff;
		padding-bottom: 2rem;

		.tab_bt {
			color: #333333;
			font-size: 0.22rem;
			width: 7.1rem;
			line-height: 0.58rem;
			margin-left: 0.1rem;
			padding-left: 0.2rem;
			position: relative;
		}

		.tab_bt:before {
			display: block;
			content: '';
			width: 1px;
			background: #999;
			position: absolute;
			height: 100%;
			left: 0;
			top: 0;
		}

		.tab_bt:after {
			display: block;
			content: '';
			width: 1px;
			background: #999;
			position: absolute;
			height: 100%;
			right: 0;
			top: 0;
		}

		table {
			border: 1px solid #999999;
			width: 7.3rem;
			margin-left: 0.1rem;

			tr {
				border: 1px solid #999999;

				td {
					border: 1px solid #999999;
					width: 25%;
					text-align: center;
					font-size: 0.22rem;
					line-height: 0.58rem;
					color: #0a0a0a;
				}

				td.bt {
					color: #666666;
				}
			}
		}
	}

	.join_cart {
		height: 1.04rem;
		border-top: 1px solid #eeeeee;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		z-index: 999;

		input {
			width: 6.9rem;
			height: 0.8rem;
			border-radius: 1rem;
			border: 0;
			background: #fd7320;
			color: #fff;
			font-size: 0.3rem;
			margin-left: 0.3rem;
			margin-top: 0.12rem;
		}
	}



	.res_det {
		.res_t {
			display: block;
			box-shadow: 0 -3px 3px #f6f4f4;
			padding: 0.25rem 0.1rem;
			width: 7.3rem;
			border-bottom: 1px solid #dcdcdc;
			background: #fff;
			position: relative;

			.res_top {

				p {
					display: inline-block;
				}

				.top_cla {
					padding: 0.03rem 0.05rem;
					background: #14bab4;
					border-radius: 2px;
					color: #fff;
					font-size: 0.22rem;
				}

				.top_num {
					color: #14bab4;
					font-size: 0.28rem;
					margin-left: 0.2rem;
				}

				.top_grade {
					color: #333333;
					font-size: 0.22rem;
					margin-left: 0.25rem;
				}

				.top_lei {
					color: #333333;
					font-size: 0.22rem;
					margin-left: 0.25rem;
				}

				.top_date {
					color: #666666;
					font-size: 0.22rem;
					float: right;
				}

				.addpic {
					position: absolute;
					width: 1.36rem;
					height: 0.62rem;
					right: 0;
					top: 0.1rem;
				}
			}

			.res_con {
				div {
					float: left;
					width: 1.43rem;
					text-align: center;
					margin: 0.1rem 0;

					.title {
						font-size: 0.22rem;
						color: #666666;
						margin-left: 0;
					}

					.num {
						font-size: 0.28rem;
						color: #333333;
						font-weight: bold;
					}
				}

				i {
					float: left;
					display: block;
					width: 1px;
					height: 0.32rem;
					background: #ccc;
					margin-top: 0.2rem;
				}
			}
		}

		.res_c {
			padding: 0.25rem 0.3rem;
			width: 6.9rem;
			background: #fff;

			p {
				color: #666666;
				font-size: 0.24rem;
				line-height: 0.55rem;

				span {
					color: #333333;

					img {
						width: 0.26rem;
						height: 0.26rem;
						margin-top: 0.14rem;
						margin-left: 0.08rem;
					}
				}
			}
		}

		.price {
			margin-top: 0.2rem;
			background: #fff;
			padding: 0.25rem;

			.p1 {
				color: #666666;
				font-size: 0.26rem;
			}

			.p2 {
				color: #fd7320;
				font-size: 0.4rem;
				margin-top: -0.15rem;
			}

			.p3 {
				color: #14bab4;
				font-size: 0.26rem;
			}

			.p4 {
				color: #666666;
				font-size: 0.24rem;
				margin-top: -0.15rem;

				span {
					color: #333333;
					font-size: 0.34rem;
				}
			}

			.mt {
				margin-top: 0.13rem;
			}
		}

		.res_table {
			background: #fff;
			margin-top: 0.2rem;
			padding: 0 0.2rem;

			.bt {
				font-size: 0.28rem;
				color: #333333;
				padding: 0.25rem 0;

				span {
					font-size: 0.26rem;
					color: #14bab4;
					float: right;
				}
			}
		}
	}
</style>
