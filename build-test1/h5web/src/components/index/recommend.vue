<template>
	<div class="recommend wrap" v-loading="loading">
		<p class="reco_title">推荐供应商</p>
		
		<swiper class='reco swiper-no-swiping' :options="swiperOption2" v-if="recoList!=''">
		　　<li class="reco_inx swiper-slide" v-for="item in recoList" @click="godetails(item.memberID)">
				<div class="reco_top">
					<div class="reco_bt fl">{{item.supplierName}}</div>
					<div class="reco_num fr">平均价格(元/吨)</div>
					<div class="clear"></div>
				</div>
				<div>
					<div class="reco_sj fl">
						<p class="p1 fl">可售批数:<span>{{item.listingCount}}</span></p>
						<p class="p2 fl">可售重量：<span>{{item.pubWeight}}</span></p>
						<div class="clear"></div>
					</div>
					<p class="reco_price fr">{{item.priceAvg}}</p>
					<div class="clear"></div>
				</div>
			</li>
		</swiper>
		
	</div>
</template>

<script>
	export default{
		data:function(){
			return{
				recoList:'',
				loading:true,
				swiperOption2: {
				　　autoplay: {
				　　　　delay: 3000,
				　　　　disableOnInteraction: false // 手动切换之后继续自动轮播
				　　},
				　　loop: true,
				　　slidesPerView : 3,  
					speed:1000,
				    direction : 'vertical',
				},
			}
		},
		mounted() {
			this.$http.get('/wx/index_h5/getShop').then((response) => {
				// console.log(response);
				this.recoList = response.entity;
				this.loading=false;
			});
		},
		methods:{
			godetails(item_) {
				this.$router.push({
					name: 'shopDetails',
					params: {
						id: item_,
						pid:0,
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.reco{width: 6.7rem;height: 3.5rem;}
	.recommend{background: #fff;padding-top: 0.2rem;
		.reco_title {
			font-size: 0.32rem;
			display: block;
			border-left: 3px solid #fe8a51;
			padding-left: 0.2rem;
			margin-bottom: 0.2rem;
		}
		.reco_inx{width: 6.7rem;height: 2rem;box-shadow: 0 -0.05rem 0.05rem 0.02rem #f9f9f9;
		    .reco_top{margin-bottom: 0.05rem;margin-top: 0.1rem;}
			.reco_bt{color: #333333;font-size: 0.3rem;width: 4.5rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
			.reco_num{color: #999999;font-size: 0.28rem;margin-top: 0.06rem;}
			.reco_sj{color: #999999;font-size: 0.28rem;margin-top:0.05rem;
				.p2{margin-left: 0.2rem;}
				span{color: #14bab4;}
			}
			.reco_price{color: #fe8a51;font-size: 0.32rem;}
		}
	}
</style>
