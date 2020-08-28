<template>
	<div class="ziyuan_wrap">
		<div class="ziyuan" v-if="ListShow">
			<p class="ziyuan_title">优质资源</p>
			<!-- <div class="res_tab">
				<router-link to='#'>新疆棉</router-link>
				<router-link to='##'>进口棉$</router-link>
				<router-link to='###'>进口棉￥</router-link>
				<router-link to='####'>地产棉</router-link>
				
				<div class="clear"></div>
			</div> -->
		</div>
		<div class="res_list this_res" v-if="ListShow">
			<ul>
				<li class="res_inx" v-for="item in resList" @click="godetails(item.batchID,item.listingID,item.listingType)" :key="item.batchID">
					<div class="res_c" style="width: 100%;">
						<div class="res_top wrap">
							<!-- <p v-if="item.listingType==1" class="top_cla">自营</p> -->
							<p class="top_num">{{item.batchID}}</p>
							<p class="top_grade">{{item.primaryColorName}}</p>
							
							
							<div class="clear"></div>
						</div>
						<div class="res_con">
							<div><span class="title">长度</span><br><span class="num">{{item.lengthAvg}}</span></div><i></i>
							<div><span class="title">强力</span><br><span class="num">{{item.strongAvg}}</span></div><i></i>
							<div><span class="title">马值</span><br><span class="num">{{item.mikeAvg}}</span></div><i></i>
							<div><span class="title">含杂</span><br><span class="num">{{item.impurity}}</span></div><i></i>
							<div><span class="title">回潮</span><br><span class="num">{{item.moisture}}</span></div><i></i>
							<div><span class="title">整齐度</span><br><span class="num">{{item.neatAvg}}</span></div>
							<div class="clear"></div>
						</div>
						<div class="cang">
							<p class="top_lei">{{item.cottonTypeName}}</p><p class="weight_one"><span>{{item.pubPrice}}</span>元/吨</p>
						</div>
						<div class="cang">
							<p>仓库：{{item.depotName}}</p><p class="zhishu" v-if="item.indexCode">{{item.indexCode}}<span v-if="item.basis>=0">+</span>{{item.basis}}</p>
						</div>
						<div class="res_bot wrap">
							<p class="weight_two">公重<span>{{item.pubWeight}}</span>吨</p>
							<p class="top_date">{{item.listingDate.substring(5,11)}}</p>
							<input class="res_btn" v-if="(item.cartID==null||item.cartID==0)&&item.status == 0" type="button" value="添加询盘" @click.stop="joinCart(item.listingID,item);">
							<input class="res_btn" v-if="item.cartID!=0&&item.cartID!=null&&item.status == 0" type="button" value="删除询盘" style="background: #14bab4;" @click.stop="removeCart(item.listingID,item);">
							<input class="res_btn" v-if="item.status != 0" type="button" value="添加询盘" style="background: #ccc;" @click.stop="">
							<!-- <div class="clear"></div> -->
						</div>
						
					</div>
					<div class="status">
						<img v-if="item.status != 0" src="../../assets/img/status1.png" alt="">
						<p v-if="item.status != 0">已售</p>
						<img v-if="item.status == 0&&item.inPointPrice && item.inPointPrice =='是' && !item.inPointPriceValue" src="../../assets/img/status2.png" alt="">
						<p v-if="item.status == 0&&item.inPointPrice && item.inPointPrice =='是' && !item.inPointPriceValue">点价中</p>
						<img v-if="item.status == 0&&item.inPointPrice && item.inPointPrice == '是' && item.inPointPriceValue" src="../../assets/img/status3.png" alt="">
						<p v-if="item.status == 0&&item.inPointPrice && item.inPointPrice == '是' && item.inPointPriceValue">点价中{{item.inPointPriceValue}}</p>
					</div>
				</li>

			</ul>
		</div>
		<div class="ziyuan" v-if="!ListShow">
			<p class="ziyuan_title">推荐资源</p>
			<!-- <div class="res_tab">
				<router-link to='#'>新疆棉</router-link>
				<router-link to='##'>进口棉$</router-link>
				<router-link to='###'>进口棉￥</router-link>
				<router-link to='####'>地产棉</router-link>
				
				<div class="clear"></div>
			</div> -->
		</div>
		<div class="res_list this_res" v-if="!ListShow">
			<ul>
				<template v-for="(item,index) in resList2" >
					<li class="res_inx" v-if="index<5" @click="godetails(item.batchID,item.listingID,item.listingType)" :key="item.batchID">
						<div class="res_c" style="width: 100%;">
							<div class="res_top wrap">
								<!-- <p v-if="item.listingType==1" class="top_cla">自营</p> -->
								<p class="top_num">{{item.batchID}}</p>
								<p class="top_grade">{{item.primaryColorName}}</p>
								
								
								<div class="clear"></div>
							</div>
							<div class="res_con">
								<div><span class="title">长度</span><br><span class="num">{{item.lengthAvg}}</span></div><i></i>
								<div><span class="title">强力</span><br><span class="num">{{item.strongAvg}}</span></div><i></i>
								<div><span class="title">马值</span><br><span class="num">{{item.mikeAvg}}</span></div><i></i>
								<div><span class="title">含杂</span><br><span class="num">{{item.impurity}}</span></div><i></i>
								<div><span class="title">回潮</span><br><span class="num">{{item.moisture}}</span></div><i></i>
								<div><span class="title">整齐度</span><br><span class="num">{{item.neatAvg}}</span></div>
								<div class="clear"></div>
							</div>
							<div class="cang">
								<p class="top_lei">{{item.cottonTypeName}}</p><p class="weight_one"><span>{{item.pubPrice}}</span>元/吨</p>
							</div>
							<div class="cang">
								<p>仓库：{{item.depotName}}</p><p class="zhishu" v-if="item.indexCode">{{item.indexCode}}<span v-if="item.basis>=0">+</span>{{item.basis}}</p>
							</div>
							<div class="res_bot wrap">
								<p class="weight_two">公重<span>{{item.pubWeight}}</span>吨</p>
								<p class="top_date">{{item.listingDate.substring(5,11)}}</p>
								<input class="res_btn" v-if="(item.cartID==null||item.cartID==0)&&item.status == 0" type="button" value="添加询盘" @click.stop="joinCart(item.listingID,item);">
								<input class="res_btn" v-if="item.cartID!=0&&item.cartID!=null&&item.status == 0" type="button" value="删除询盘" style="background: #14bab4;" @click.stop="removeCart(item.listingID,item);">
								<input class="res_btn" v-if="item.status != 0" type="button" value="添加询盘" style="background: #ccc;" @click.stop="">
								<!-- <div class="clear"></div> -->
							</div>
						</div>
						<div class="status">
							<img v-if="item.status != 0" src="../../assets/img/status1.png" alt="">
							<p v-if="item.status != 0">已售</p>
							<img v-if="item.status == 0&&item.inPointPrice && item.inPointPrice =='是' && !item.inPointPriceValue" src="../../assets/img/status2.png" alt="">
							<p v-if="item.status == 0&&item.inPointPrice && item.inPointPrice =='是' && !item.inPointPriceValue">点价中</p>
							<img v-if="item.status == 0&&item.inPointPrice && item.inPointPrice == '是' && item.inPointPriceValue" src="../../assets/img/status3.png" alt="">
							<p v-if="item.status == 0&&item.inPointPrice && item.inPointPrice == '是' && item.inPointPriceValue">点价中{{item.inPointPriceValue}}</p>
						</div>
					</li>
				</template>
			</ul>
		</div>
	</div>


</template>

<script>
	export default {
		data: function() {
			return {
				resList: '',
				resList2: '',
				resId:'',
				params:'3',
				ListShow:true,
			}
		},
		created() {
			this.$http.post('/wx/index_h5/getSearch').then((response) => {
				if(response.entity.length>0){
					var num = response.entity.length-1;
					this.ListShow=false;
					this.params = new URLSearchParams();
					var save_inx = response.entity[num];
					
					// 放入参数
					if (save_inx.listingType) {
						this.params.append("listingType", 1);
					};
					if (save_inx.d28) {
						this.params.append("d28", save_inx.d28);
					};
					if (save_inx.d29) {
						this.params.append("d29", save_inx.d29);
					};
					if (save_inx.listingIndex) {
						this.params.append("listingIndex", save_inx.listingIndex);
					};
					if (save_inx.cottonSource) {
						this.params.append("cottonSource", save_inx.cottonSource);
					};
					if (save_inx.primaryColor) {
						this.params.append("primaryColor", save_inx.primaryColor);
					};
					if (save_inx.depositary) {
						this.params.append("depositary", save_inx.depositary);
					};
					if (save_inx.cottonType) {
						this.params.append("cottonType", save_inx.cottonType);
					};
					if (save_inx.packType) {
						this.params.append("packType", save_inx.packType);
					};
					if (save_inx.cottonYear) {
						this.params.append("cottonYear", save_inx.cottonYear);
					};
					
					
					if(save_inx.lengthMin){
						this.params.append("lengthMin", save_inx.lengthMin);
					}
					if(save_inx.lengthMax){
						this.params.append("lengthMax", save_inx.lengthMax);
					}
					if(save_inx.strongMin){
						this.params.append("strongMin", save_inx.strongMin);
					}
					if(save_inx.strongMax){
						this.params.append("strongMax", save_inx.strongMax);
					}
					if(save_inx.mikeMin){
						this.params.append("mikeMin", save_inx.mikeMin);
					}
					if(save_inx.mikeMax){
						this.params.append("mikeMax", save_inx.mikeMax);
					}
					if(save_inx.impurityMin){
						this.params.append("impurityMin", save_inx.impurityMin);
					}
					if(save_inx.impurityMax){
						this.params.append("impurityMax", save_inx.impurityMax);
						
					}
					if(save_inx.moistureMin){
						this.params.append("moistureMin", save_inx.moistureMin);
					}
					if(save_inx.moistureMax){
						this.params.append("moistureMax", save_inx.moistureMax);
					}
					if(save_inx.neatMin){
						this.params.append("neatMin", save_inx.neatMin);
					}
					if(save_inx.neatMax){
						this.params.append("neatMax", save_inx.neatMax);	
					}
					
					
				}
				this.$http.post('/wx/listing/getListingList?'+this.params).then((response) => {
					this.resList2 = response.entity.list;
					if(response.entity.list){
						if(response.entity.list.length<=0){
							this.ListShow=true;
						}
					}
					
				});
				this.$emit('load',false)
			
			});
		},
		mounted() {
			this.$http.post('/wx/listing/getListingFineList?listingType = 1').then((response) => {
				this.resList = response.entity.list;
			});
			
		},
		methods: {
			joinCart(id,item_) {
				this.$http.post('/wx/trade/addCartItem?listingID=' + id).then((response) => {
					// console.log(response);
					if (response.success) {
						item_.cartID = 1;
						this.$message({
							showClose: true,
							message: '添加询盘成功',
							type: 'success'
						});
						this.getstore('添加询盘成功')
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
			godetails(item_, listingID_,listingType_) {
				this.$router.push({
					name: 'resDetails',
					query: {
						id: item_,
						listingID: listingID_,
						listingType: listingType_,
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
		}
	}
</script>

<style lang="scss">
	// .ziyuan_wrap{background: #fff;}
	.ziyuan {
		padding-top: 0.2rem;
		background: #fff;
		padding-bottom: 0.01rem;
	}

	.ziyuan_title {
		background: #fff;
		font-size: 0.32rem !important;
		display: block;
		border-left: 3px solid #14bab4;
		padding-left: 0.2rem;
		margin-bottom: 0.2rem;
		margin-left: 0.2rem;
	}

	.res_tab {
		width: 100%;
		box-shadow: 0 -3px 3px #fdfcfc;
		padding: 0.25rem 0;

		a {
			font-size: 0.32rem;
			color: #7c7c7c;
			display: block;
			float: left;
			width: 1.85rem;
			text-align: center;
			position: relative;
		}

		a:after {
			display: block;
			content: '';
			position: absolute;
			width: 1.1rem;
			height: 0.04rem;
			bottom: -0.1rem;
			background: #14bab4;
			left: 0.375rem;
			opacity: 0;
		}

		a.router-link-active {
			color: #14bab4;
		}

		a.router-link-active:after {
			opacity: 1;
		}

		i {
			display: block;
			float: left;
			height: 0.35rem;
			width: 1px;
			background: #dcdcdc;
		}

		;
	}

	.this_res>ul {
		background: none !important;
	}

	.this_res .res_inx {
		margin: 0.2rem 0.2rem !important;
	}

	.res_inx {
		display: block;
		box-shadow: 0 -3px 3px #f6f4f4;
		padding: 0.25rem 0;
		width: 7.1rem;
		margin: 0 0.2rem;
		background: #fff;
		position:relative;
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
				margin-right: 0.2rem;
			}

			.top_num {
				color: #14bab4;
				font-size: 0.3rem;
			}

			.top_grade {
				color: #333333;
				font-size: 0.26rem;
				margin-left: 0.25rem;
			}

			.top_lei {
				color: #333333;
				font-size: 0.28rem;
				margin-left: 0.25rem;
			}

			.top_date {
				color: #666666;
				font-size: 0.28rem;
				float: right;
			}
		}

		.res_con {
			div {
				float: left;
				width: 1.40rem;
				text-align: center;
				margin: 0.1rem 0;

				.title {
					font-size: 0.24rem;
					color: #666666;
				}

				.num {
					font-size: 0.3rem;
					color: #333333;
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

		.cang {
			font-size: 0.24rem;
			color: #333333;
			margin: 0.2rem;
			width: 6.7rem;
			border-bottom: 1px solid #f4f4f4;
			padding-bottom: 0.15rem;
			p{display: inline-block;overflow: hidden;}
			p:nth-child(1){width: 60%;text-overflow:ellipsis;white-space: nowrap;}
			p.zhishu{width: 35%;color: #fd7320;font-weight: bold;text-align: right;font-size: 0.26rem;}
		}

		.res_bot {
			.weight_one {
				color: #666666;
				font-size: 0.24rem;
				float: left;

				span {
					color: #fd7320;
					font-size: 0.3rem;
					font-weight: bold;
				}
			}

			.weight_two {
				color: #666666;
				font-size: 0.24rem;
				float: left;

				span {
					color: #333333;
					font-size: 0.3rem;
					font-weight: bold;
				}
			}

			.res_btn {
				float: right;
				width: 1.84rem;
				height: 0.58rem;
				background: #fd7320;
				font-size: 0.24rem;
				color: #fff;
				border: 0;
				border-radius: 1rem;
				margin-top: -0.1rem;
			}
		}
	}

	.list_bottom {
		height: 1.5rem;
	}
</style>
