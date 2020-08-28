<template>
	<div class="res_det" v-loading="loading">
		<div class="topBack" >
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>批号详情</p>
		</div>
		<div class="addHeight"></div>
		<div class="res_t" style="box-shadow:none">
			<div class="res_top wrap">
				<!-- <p class="top_cla">自营</p> -->
				<p class="top_num">{{res_det.batchID}}</p> 
				<p class="top_lei">{{res_det.cottonTypeName}}</p>
				<p class="top_grade">{{res_det.notes}}</p>
				<!-- <p class="top_date">2019-06-03</p> -->
				<a :href="imgSrc">
					<img class="addpic" src="../../assets/img/shengchegtupian.png" alt="">
				</a>
				<div class="clear"></div>
			</div>
			<div class="res_con">
				<div><span class="title">颜色级</span></br><span class="num">{{res_det.listingPrimaryColorName}}</span></div><i></i>
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
				<p class="p2 fr"><span v-if='res_det.indexCode'>{{res_det.indexCode}}</span><i v-if="res_det.price>=0&&res_det.indexCode">+</i>{{res_det.price}}</p>
				<div class="clear"></div>
			</div>
			<div class="mt">
				<!-- <p class="p3 fl">升贴水 485.00</p> -->
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
					<td class="bt">合计包数</td><td>{{res_det.packnum}}包</td>
					<td class="bt">质量标识</td><td>-</td>
				</tr>
				<tr>
					<td class="bt">合计毛重</td><td>{{res_det.grossWeight}}包</td>
					<td class="bt">平均回溯</td><td>{{res_det.moisture}}</td>
				</tr>
				<tr>
					<td class="bt">合计皮重</td><td>{{res_det.tareWeight}}kg</td>
					<td class="bt">平均含杂</td><td>{{res_det.impurity}}</td>
				</tr>
				<tr>
					<td class="bt">合计净重</td><td>{{res_det.netWeight}}</td>
					<td class="bt">合计公重</td><td>{{res_det.pubWeight}}</td>
				</tr>
			</table>
			<p class="tab_bt">主体颜色级：{{res_det.primaryColorName}}</p>
			<table>
				<tr>
					<td class="bt">白棉1级</td><td>{{res_det.colorBM01}}</td>
					<td class="bt">白棉2级</td><td>{{res_det.colorBM02}}</td>
				</tr>
				<tr>
					<td class="bt">白棉3级</td><td>{{res_det.colorBM03}}</td>
					<td class="bt">白棉4级</td><td>{{res_det.colorBM04}}</td>
				</tr>
				<tr>
					<td class="bt">白棉5级</td><td>{{res_det.colorBM05}}</td>
					<td class="bt"></td><td></td>
				</tr>
			</table>
			<p class="tab_bt">主体长度级：{{res_det.primaryLength}}</p>
			<table v-if="res_det.cottonType!=4">
				<tr>
					<td class="bt">25mm</td><td>{{res_det.length25 > 0 ? res_det.length25 :'-'}}</td>
					<td class="bt">26mm</td><td>{{res_det.length26 > 0 ? res_det.length26 :'-'}}</td>
				</tr>
				<tr>
					<td class="bt">27mm</td><td>{{res_det.length27 > 0 ? res_det.length27 :'-'}}</td>
					<td class="bt">28mm</td><td>{{res_det.length28 > 0 ? res_det.length28 :'-'}}</td>
				</tr>
				<tr>
					<td class="bt">29mm</td><td>{{res_det.length29 > 0 ? res_det.length29 :'-'}}</td>
					<td class="bt">30mm</td><td>{{res_det.length30 > 0 ? res_det.length30 :'-'}}</td>
				</tr>
				<tr>
					<td class="bt">31mm</td><td>{{res_det.length31 > 0 ? res_det.length31 :'-'}}</td>
					<td class="bt">32mm</td><td>{{res_det.length32 > 0 ? res_det.length32 :'-'}}</td>
				</tr>
			</table>
			<table v-if="res_det.cottonType==4">
				<tr>
					<td class="bt">33mm</td><td>{{res_det.length25 > 0 ? res_det.length25 :'-'}}</td>
					<td class="bt">34mm</td><td>{{res_det.length26 > 0 ? res_det.length26 :'-'}}</td>
				</tr>
				<tr>
					<td class="bt">35mm</td><td>{{res_det.length27 > 0 ? res_det.length27 :'-'}}</td>
					<td class="bt">36mm</td><td>{{res_det.length28 > 0 ? res_det.length28 :'-'}}</td>
				</tr>
				<tr>
					<td class="bt">37mm</td><td>{{res_det.length29 > 0 ? res_det.length29 :'-'}}</td>
					<td class="bt">38mm</td><td>{{res_det.length30 > 0 ? res_det.length30 :'-'}}</td>
				</tr>
				<tr>
					<td class="bt">39mm</td><td>{{res_det.length31 > 0 ? res_det.length31 :'-'}}</td>
					<td class="bt">40mm</td><td>{{res_det.length32 > 0 ? res_det.length32 :'-'}}</td>
				</tr>
			</table>
			<p class="tab_bt">马克隆主体级：{{res_det.primaryMike}}</p>
			<table>
				<tr>
					<td class="bt">C1</td><td>{{res_det.mikeC1}}</td>
					<td class="bt">B1</td><td>{{res_det.mikeB1}}</td>
				</tr>
				<tr>
					<td class="bt">A</td><td>{{res_det.mikeA}}</td>
					<td class="bt">B2</td><td>{{res_det.mikeB2}}</td>
				</tr>
				<tr>
					<td class="bt">C2</td><td>{{res_det.mikeC2}}</td>
					<td class="bt"></td><td></td>
				</tr>
			</table>
			<p class="tab_bt">长度整齐度（%）</p>
			<table>
				<tr>
					<td class="bt">最小值</td><td>{{res_det.neatMin}}</td>
					<td class="bt">最大值</td><td>{{res_det.neatMax}}</td>
				</tr>
				<tr>
					<td class="bt">平均值</td><td>{{res_det.neatAvg}}</td>
					<td class="bt"></td><td></td>
				</tr>
			</table>
			<p class="tab_bt">断裂比强度（CN/tex）</p>
			<table>
				<tr>
					<td class="bt">最小值</td><td>{{res_det.strongMin}}</td>
					<td class="bt">最大值</td><td>{{res_det.strongMax}}</td>
				</tr>
				<tr>
					<td class="bt">平均值</td><td>{{res_det.strongAvg}}</td>
					<td class="bt"></td><td></td>
				</tr>
			</table>
		</div>
		<div class="join_cart" v-if="btnShow">
			<!-- <input type="button" value="添加询盘" @click="joinCart(res_det.listingID)"> -->
			<input class="res_btn" v-if="(res_det.cartID==null||res_det.cartID==0)&&res_det.status == 0" type="button" value="添加询盘" @click.stop="joinCart(res_det.listingID,res_det);">
			<input class="res_btn" v-if="res_det.cartID!=0&&res_det.cartID!=null&&res_det.status == 0" type="button" value="删除询盘" style="background: #14bab4;" @click.stop="removeCart(res_det.listingID,res_det);">
			<input class="res_btn" v-if="res_det.status != 0" type="button" value="添加询盘" style="background: #ccc;" @click.stop="">
		</div>
	</div>

</template>

<script>
	export default {
		data: function() {
			return {
				batchID:'',
				res_det:'',
				loading:true,
				imgSrc:'',
				btnShow:true,
			}
		},
		updated() {
		        window.scroll(0, 0);
		 },
		methods:{
			// 加入购物车
			joinCart(id,item_){
				this.$http.post('/wx/trade/addCartItem?listingID='+id).then((response) => {
					// console.log(response);
					if(response.success){
						item_.cartID = 1;
						this.$message({
						          showClose: true,
						          message: '添加询盘成功',
						          type: 'success'
								});
								this.getstore('添加询盘成功')
					}else{
						this.$message({
						          showClose: true,
						          message: response.message,
						          type: 'error'
						        });
					}
				});
			},
			removeCart(id,item_) {
				this.$http.post('/wx/trade/removeCartItemByList?listingIDs=' + id).then((response) => {
					// console.log(response);
					if (response.success) {
						item_.cartID = 0;
						this.$message({
							showClose: true,
							message: '删除询盘成功',
							type: 'success'
						});
						this.getstore()
					} else {
						if (response.code != 9999) {
							this.$message({
								showClose: true,
								message: response.message,
								type: 'error'
							});
						} else {
							this.$message({
								showClose: true,
								message: '还未登录，请先登录后再进行此操作',
								type: 'error',
								onClose: () => {
									this.$router.push({
										path: '/login'
									})
								}
							});
						}
					}
				});
			},
			//前往参数列表
			godetails(item_){
				this.$router.push({
					name: 'qualityList',
					params: {
						id: item_
					}
				});
			},
			getstore (type) {
				// 获取
				let num = this.$store.getters.OPREATING_INFO_GET('UserEnquiries')
				// 修改
				type ? type = 1 : type = -1
				this.$store.commit({
					type: 'OPREATING_INFO_SET',
					UserEnquiries: ( num ? num : 0 ) + type
				})
				// 存储
				this.$store.dispatch('OPREATING_INFO_SET_LOA')
			}
		},
		//获取资订单详情
		beforeRouteEnter (to, from, next) {
		//beforeRouteEnter中this无效，所以能用vm
		        next(vm => {
		          var batchID = to.query.id;//好的抓到id了
				  var listingID = to.query.listingID;
				  var listingType =to.query.listingType;
				  if(to.query.listingHref){
					  var listingHref =to.query.listingHref;
					  if(listingHref=1){
						  vm.btnShow=false;
					  }
				  }
				  
				  vm.batchID=batchID;
				  
		          vm.axios.post('/wx/product/getCottonBatch?batchID='+vm.batchID +"&listingID="+listingID).then((response)=>{
		            // vm.songlikelist = res.data.data;
					vm.res_det=response.entity;
					vm.imgSrc='https://mob.unioncotton.com/wx/product/printPng?batchID='+vm.batchID
					vm.loading=false;
					console.log(response);
		          });
				  
		        })
		      },
	}
</script>

<style lang="scss">
	.topBack{
		height: 0.75rem;background: #14bab4;text-align: center;position: fixed;top: 0;width: 7.5rem;z-index: 99;
		img{position: absolute;left: 0.2rem;top: 0.17rem;width: 0.4rem;height: 0.4rem;}
		p{color: #fff;font-size: 0.32rem;line-height: 0.75rem;}
		}
		.addHeight{height: 0.75rem;}
	.res_table_con{background: #fff;padding-bottom: 2rem;
		.tab_bt{color: #333333;font-size: 0.3rem;width: 7.1rem;line-height: 0.58rem;margin-left: 0.1rem;padding-left: 0.2rem;position: relative;}
		.tab_bt:before{display: block;content: '';width: 1px;background: #999;position: absolute;height: 100%;left: 0;top: 0;}
		.tab_bt:after{display: block;content: '';width: 1px;background: #999;position: absolute;height: 100%;right: 0;top: 0;}
		table{border: 1px solid #999999;width: 7.3rem;margin-left: 0.1rem;
			tr{border: 1px solid #999999;
				td{border: 1px solid #999999;width: 25%;text-align: center;font-size: 0.3rem;line-height: 0.58rem;color: #0a0a0a;}
				td.bt{color: #666666;}
			}
		}
	}
	.join_cart{
		height: 1.04rem;border-top: 1px solid #eeeeee;position: fixed;bottom: 0;width: 7.5rem;left: auto !important;right: auto !important;background: #fff;z-index: 999;
		input{width: 6.9rem;height: 0.8rem;border-radius: 1rem;border: 0;background: #fd7320;color: #fff;font-size: 0.32rem;margin-left: 0.3rem;margin-top: 0.12rem;}
	}
	 
	
	.res_det {position: relative;
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
					font-size: 0.3rem;
				}

				.top_num {
					color: #14bab4;
					font-size: 0.3rem;
					margin-left: 0rem;
				}

				.top_grade {
					width: 2rem;
					color: #333333;
					font-size: 0.3rem;
					margin-left: 0.25rem;
					line-height: .32rem;
				    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
				}

				.top_lei {
					color: #333333;
					font-size: 0.3rem;
					margin-left: 0.25rem;
				}

				.top_date {
					color: #666666;
					font-size: 0.3rem;
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
					width: 1.2rem!important;
					text-align: center;
					margin: 0.1rem 0;

					.title {
						font-size: 0.3rem;
						color: #666666;
						margin-left: 0;
					}

					.num {
						font-size: 0.3rem;
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
				font-size: 0.3rem;
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
				font-size: 0.3rem;
			}

			.p2 {
				color: #fd7320;
				font-size: 0.44rem;
				margin-top: -0.15rem;
			}

			.p3 {
				color: #14bab4;
				font-size: 0.3rem;
			}

			.p4 {
				color: #666666;
				font-size: 0.3rem;
				margin-top: -0.15rem;

				span {
					color: #333333;
					font-size: 0.38rem;
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
				font-size: 0.32rem;
				color: #333333;
				padding: 0.25rem 0;

				span {
					font-size: 0.3rem;
					color: #14bab4;
					float: right;
				}
			}
		}
	}
</style>
