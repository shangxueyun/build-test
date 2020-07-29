<template>
	<div v-loading="loading">
		<div class="topBack" >
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>店铺列表</p>
		</div>
		<div class="addHeight"></div>
		<div class="search search_shop" style="top: 0.75rem;">
			<div class="search_left fl">
				<i class="fl">
					<img src="../../assets/img/sousuo.png" alt="">
				</i>
				<input class="fl search_txt" placeholder="请输入店铺名称" type="text" name="" id="" value="" v-model="corpName" />
				<div class="clear"></div>
			</div>
			<input class="fl search_btn" type="button" name="" id="" value="搜索" @click="onSearch()"/>
			<div class="clear"></div>
		</div>
		<img class="shop_topbanner" src="../../assets/img/shop_banner.jpg" alt="">
		<!-- <div class="shop_tab">
			<span :class="{'active':type==0}"  @click="switchShop(0)">轧花厂</span>
			<i></i>
			<span :class="{'active':type==1}"  @click="switchShop(1)">贸易商</span>
			<i></i>
			<span :class="{'active':type==2}"  @click="switchShop(2)">纺织厂</span>
			<div class="clear"></div>
		</div> -->
		<div>
			<!-- <div class="screen">
				<div class="screen_tit">地区</div>
				<div class="screen_btn">
					<ul>
						<li v-for="(item,index) in zizhi"><span :class="active1 == index ? 'active' : '' " @click='changeIt(index)'>{{item}}</span></li>
					</ul>
					<ul>
						<li v-for="(item,index) in neidi"><span :class="active2 == index ? 'active' : '' " @click='changeIt2(index)'>{{item}}</span></li>
					</ul>
				</div>

			</div> -->
			<div class="shop_list">
				<ul>
					<li class="shop_inx" v-for="item in shopList">
						<div class="shop_inx_wrap" @click="godetails(item)">
							<div class="shop_pic fl" v-if="item.member.picCorpLogo" :style="{backgroundImage: 'url(https://www.unioncotton.com/web/resources?p=publish&k=' + item.member.picCorpLogo + ')'}"></div>
							<div class="shop_pic fl" v-if="!item.member.picCorpLogo"></div>
							<div class="inx_right fl">
								<p class="inx_title">{{item.member.corpName}}</p>
								<p class="inx_pj">质量评价<span>100%</span>&nbsp&nbsp{{item.supplier.resourceDate.substring(5,7)}}月{{item.supplier.resourceDate.substring(8,11)}}日</p>
								<div>
									<p class="inx_num fl">国产棉<span>{{item.listingSize}}</span>批</p>
									<p class="inx_num fl">进口棉<span>{{item.importedListingSize}}</span>批</p>
									<div class="clear"></div>
								</div>
								<p class="inx_phone">联系人<span>{{item.sales[Object.keys(item.sales)[0]]}}</span><span>({{Object.keys(item.sales)[0]}})</span></p>
								<p class="inx_add">地址<span>{{item.member.address}}</span></p>
								<img v-if="item.supplier.star==2" class="inx_hot" src="../../assets/img/hot_icon.png" alt="">
							</div>
							<div class="clear"></div>
						</div>
					</li>
				</ul>
				<p class="more_btn">{{moreText}}</p>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		name: 'Index',
		data: function() {
			return {
				shopList: '',
				zizhi: ['新疆', '蒙古自治区', '昌吉回族自治州', '哈密', '克拉玛依市', '石河子', '塔城地区', '吐鲁番', '乌鲁木齐', '伊犁', '五家渠', '哈萨克自治州'],
				neidi: ['内地', '江苏', '安徽', '湖北', '湖南', '江西', '山东', '河南', '河北', '江西', '天津'],
				active1: -1,
				active2: -1,
				loading: true,
				type:0,
				totalPage: 0,
				pageCurrent:1,
				pageNum:1,
				moreText:'全部加载完成',
				pageflag:true,
				corpName:'',
			}
		},
		created() {
			//上拉执行
	         window.addEventListener('scroll', this.onScroll);
			 //加载列表
			 this.$http.post('/wx/shop/list').then((response) => {
			 	// console.log(response.entity);
			 	this.shopList = response.entity.list;
			 	this.totalPage = response.entity.totalPage;
			 	this.pageCurrent = response.entity.pageCurrent;
			 	if(response.entity.totalPage==1){
			 		this.moreText="全部加载完成"
			 	}else{
			 		this.moreText="下拉加载更多"
			 	}
			 	this.loading = false;
			 })
	    },
		mounted() {
			
		},
		methods: {
			// 搜索店铺
			onSearch(){
				this.loading = true;
				
				this.$http.post('/wx/shop/list?corpName='+this.corpName).then((response) => {
					window.scroll(0, 0);
					// console.log(response.entity);
					this.shopList = response.entity.list;
					this.totalPage = response.entity.totalPage;
					this.pageCurrent = response.entity.pageCurrent;
					if(response.entity.totalPage==1){
						this.moreText="全部加载完成"
					}else{
						this.moreText="下拉加载更多"
					}
					this.loading = false;
				})
			},
			// 上拉加载更多
			onScroll() {
				let innerHeight = document.querySelector('#app').clientHeight;
				let outerHeight = document.documentElement.clientHeight;
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				// console.log(innerHeight + " " + outerHeight + " " + scrollTop);
				 if (innerHeight < (outerHeight + scrollTop)) {
					if(this.pageCurrent<this.totalPage&&this.pageflag == true){
						this.pageflag=false;
						this.pageNum = this.pageNum+1;
						this.loading = true;
						this.$http.post('/wx/shop/list?pageNum='+this.pageNum+'&corpName='+this.corpName).then((response) => {
							let ListTest = response.entity.list;
							this.totalPage = response.entity.totalPage;
							this.pageCurrent = response.entity.pageCurrent;
							this.shopList = this.shopList.concat(ListTest);
							this.loading = false;
							this.pageflag=true;
						})
						this.moreText="下拉加载更多";
						
					}else if(this.pageCurrent>=this.totalPage){
						this.moreText="全部加载完成"
					}
					
				 }
			 },
			changeIt: function(index) {
				this.active1 = index;
			},
			changeIt2: function(index) {
				this.active2 = index;
			},
			// 前往详情
			godetails(item_) {
				this.$router.push({
					name: 'shopDetails',
					params: {
						id: item_.member.memberID,
						pid:'0',
					}
				});
			},
			switchShop(i){
				this.type=i;
			}
		}
	}
</script>

<style lang="scss">
	.search_shop{position: fixed;top: 0;width: 7.5rem;background: #f6f6f6;z-index: 999;}
	.more_btn{text-align: center;font-size: 0.3rem;padding: 0.2rem ;}
	.shop_topbanner {
		margin-top: 1rem;
		width: 100%;
		padding-top: 0.07rem;
		background: #fff;
	}

	.shop_tab {
		background: #fff;
		width: 100%;

		span {
			width: 2.49rem;
			display: block;
			float: left;
			text-align: center;
			padding: 0.24rem 0;
			color: #333333;
			font-size: 0.32rem;
			position: relative;
		}

		span:after {
			display: block;
			content: '';
			height: 4px;
			width: 1.8rem;
			background: #14bab4;
			opacity: 0;
			position: absolute;
			left: 0.3rem;
			bottom: 0;
		}

		span.active:after {
			opacity: 1;
		}

		i {
			width: 0.01rem;
			height: 0.3rem;
			background: #ccc;
			float: left;
			margin-top: 0.26rem;
		}

		;
	}

	.screen {
		background: #fff;

		.screen_tit {
			color: #999999;
			font-size: 0.3rem;
			padding: 0.1rem 0.2rem;
		}

		.screen_btn {
			padding-right: 0.2rem;
			padding-left: 0.2rem;
			padding-bottom: 0.25rem;

			ul {
				li {
					display: inline-block;
					margin: 0.05rem 0;
					margin-right: 0.2rem;
					text-align: justify;

					span {
						cursor: pointer;
						padding: 3px 5px;
						font-size: 0.28rem;
						border-radius: 2px;
						color: #666666;
					}

					span.active {
						background: #14bab4;
						color: #ffffff;
					}
				}
			}
		}
	}

	.shop_list {
		margin-bottom: 3rem;

		.shop_inx {
			margin-top: 0.22rem;
			background: #fff;
			position: relative;

			.shop_inx_wrap {
				display: block;
				padding: 0.2rem;

				.shop_pic {
					width: 2.4rem;
					height: 2.4rem;
					background-size: contain;
					background-position: center;
					background-repeat: no-repeat;
					background-image: url(../../assets/img/h5weishangchauntupian.png);
				}

				.inx_right {
					margin-left: 0.25rem;
					width: 4rem;

					.inx_title {
						color: #333333;
						font-size: 0.32rem;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}

					.inx_pj {
						color: #8a8a8a;
						font-size: 0.3rem;

						span {
							color: #fe8a51;
							margin-left: 0.1rem;
						}
					}

					.inx_num {
						color: #8a8a8a;
						font-size: 0.3rem;
						width:auto;
						margin-right: 0.3rem;
						span {
							color: #14bab4;
							margin-left: 0.05rem;
							margin-right: 0.05rem;
						}
					}

					.inx_phone {
						color: #8a8a8a;
						font-size: 0.3rem;

						img {
							width: 0.2rem;
							height: 0.2rem;
							margin: 0.16rem 0 0 0.1rem;
						}

						span {
							color: #333333;
							margin-left: 0.1rem;
						}
					}

					.inx_add {
						color: #8a8a8a;
						font-size: 0.3rem;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap
					}

					p {
						line-height: 0.5rem;

						width: 100%;



						span {
							margin-left: 0.1rem;
						}
					}

					.inx_hot {
						position: absolute;
						right: 0rem;
						top: 0rem;
						width: 0.87rem;
						height: 0.77rem;
					}
				}
			}

		}
	}
</style>
