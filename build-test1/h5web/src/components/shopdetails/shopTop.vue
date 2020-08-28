<template>
	<div class="shop_det" v-if="shopdet!=''">
		<div class="shop_det_top">
			<swiper class='shop_banner' :options="swiperOption5">
			　　<swiper-slide v-for="(item,index) in shopdet.member.storeImgs" :key='index'>
					<img :src="'https://www.unioncotton.com/web/resources?p=publish&k=' + item" alt="">
				</swiper-slide>
			　　<div class="swiper-pagination2" slot="pagination"></div>
			　　<div class="swiper-button-prev" slot="button-prev"></div>
			　　<div class="swiper-button-next" slot="button-next"></div>
			</swiper>
			<div class="shopdet_title">
				<p>{{shopdet.member.corpName}}</p>
			</div>
		</div>
		
		<!-- <div class="shop_pj">
			<p class="shop_name fl">{{shopdet.member.corpName}}</p>
			<div class="shop_right fr">
				<p>综合评价</p>
				<div class="start">
					<img src="../../assets/icon/start.png" alt="">
					<img src="../../assets/icon/start.png" alt="">
					<img src="../../assets/icon/start.png" alt="">
					<img src="../../assets/icon/start.png" alt="">
				</div>
			</div>
			<div class="clear"></div>
		</div> -->
		<div class="shop_con">
			<table class="shop_xx" style="table-layout:fixed;word-break:break-all;">
				<!-- <tr>
					<td class="tit"><img src="../../assets/icon/zhuyingchanpin@2x.png" alt="">
						<p>主营产品</p>
					</td>
					<td class="det">
						<p>{{shopdet.supplier.mainProducts}}</p>
					</td>
				</tr> -->
				<tr>
					<td class="tit">
						<p>联系方式</p>
					</td>
					<td class="det">
						<p v-for="(val,key) in shopdet.sales">{{val}}:<a :href="'tel:' + key">{{key}}</a></p>
					</td>
				</tr>
				<tr>
					<td class="tit2">
						<p>条款</p>
					</td>
					<td class="clauseList">
						<p v-for="(item,key) in this.clause">{{key + 1}}.{{item.content}}</p>
					</td>
				</tr>
				<!-- <tr>
					<td class="tit"><img src="../../assets/icon/lianxidianhua@2x.png" alt="">
						<p>联系电话</p>
					</td>
					<td class="det">
						
					</td>
				</tr> -->
				<!-- <tr>
					<td class="tit"><img src="../../assets/img/dizhi@2x.png" alt="">
						<p>详细地址</p>
					</td>
					<td class="det">
						<p>{{shopdet.member.address}}</p>
					</td>
				</tr> -->
			</table>
		</div>

	</div>

</template>

<script>
	export default {
		name: 'Banner',
		props: ['shopdet'],
		data:function () { 
			return{
				// shopdet:'',
				swiperOption5: {
				　　pagination: {
				　　　　el: '.swiper-pagination2',
				　　},
				　　autoplay: {
				　　　　delay: 2000,
					   disableOnInteraction: false // 手动切换之后继续自动轮播
				　　},
					navigation: {
				　　　　nextEl: '.swiper-button-next',
				　　　　prevEl: '.swiper-button-prev'
				　　},
				    speed:500,
				　　loop: true,
				},
				clause:'',
			}
		},
		mounted() {
			console.log(this.shopdet.membe)
		},
		watch: {
	            shopdet: function(newVal){
					this.$http.get('/wx/member/terms/preview/content?parentType=XSTK_RMB&orgCode='+newVal.member.memberID +'&pageIndex=1&pageSize=1000').then((response) => {
						this.clause = response.data.list;
					})
	            }
	    },
	}
</script>

<style lang="scss">
	.swiper-pagination2{position: absolute;bottom: 1.1rem !important;z-index: 999;text-align: center;}
	.shop_det_top{position: relative;}
	.shop_banner {
		width: 100%;
		height: 4.45rem;
		background-image: url(../../assets/img/h5weishangchuantupianbig.png);
		background-size: cover;
		background-position: center;
		.swiper-slide {
			img {
				width: 100%;
				height: 4.45rem;
			}
		}

		.swiper-pagination-bullet {
			background: #fff;
			opacity: 0.5;
		}

		.swiper-pagination-bullet.swiper-pagination-bullet-active {
			opacity: 1;
		}

		.swiper-button-prev {
			background: url(../../assets/icon/left_btn.png) no-repeat center;
			background-size: cover;
			width: 0.35rem;
			height: 0.5rem;
			left: 0;
		}

		.swiper-button-next {
			background: url(../../assets/icon/right_btn.png) no-repeat center;
			background-size: cover;
			width: 0.35rem;
			height: 0.5rem;
			right: 0;
		}
	}
	.shopdet_title{background: url(../../assets/img/shopdet_title.png) repeat 100% 100%;position: absolute;left: 0;right: 0;bottom: 0;height: 1rem;line-height: 1rem;z-index: 9;padding: 0 0.3rem;
		p{font-size: 0.4rem;color: #fff;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
	}
	.shop_pj {
		background: url(../../assets/img/shop_bj.jpg) no-repeat center;
		height: 1.4rem;
		background-size: cover;

		.shop_name {
			width: 4.4rem;
			font-size: 0.36rem;
			color: #fff;
			margin-left: 0.25rem;
			padding-top: 0.15rem;
		}

		.shop_right {
			width: 2.1rem;
			text-align: center;
			padding-top: 0.22rem;

			p {
				font-size: 0.28rem;
				color: #e94124;
			}

			.start {
				text-align: center;
				margin-top: 0.14rem;

				img {
					display: inline-block;
					width: 0.32rem;
					height: 0.32rem;
					margin: 0 0.05rem;
				}
			}
		}
	}

	.shop_con {
		background: #fff;

		.shop_xx {
			width: 7.5rem;

			tr {
				border-bottom: 1px solid #f1f1f1;
			}

			tr:nth-last-child(1) {
				border-bottom: 0;
			}

			td {
				padding: 0.25rem 0;
				font-size: 0.24rem;
				color: #333333;
			}

			.tit {
				text-align: center;
				width: 20%;

				img {
					display: inline-block;
					width: 0.36rem;
					margin-right: 0.1rem;
				}

				p {
					display: inline-block;
					padding: 0.05rem 0.09rem;
					// width: 1.1rem;
					// text-align: left;
					background: #D7F6F4;
					color: #13B9B3;
				}
				
			}
			.tit2 {
				text-align: center;
				width: 20%;
				p {
					display: inline-block;
					padding: 0.05rem 0.09rem;
					// width: 1.1rem;
					// text-align: left;
					background: #FBEFE9;
					color: #FF7937;
				}
			}
			.det {
				p{margin: 0.1rem;width: 46%;float: left;}
				a{color: #333;border-radius: 0.2rem;display: inline-block;background: #E5E5E5;padding: 0 0.1rem;margin-left: 0.1rem;}
			}
			.clauseList{
				p{margin: 0.1rem;width: 96%;float: left;font-size: 0.28rem;}
			}
		}
	}
</style>
