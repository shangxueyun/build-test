<template>
	<div v-loading="loading">
		<div class="deal wrap">
			<p class="deal_title">交易动态</p>
			<div class="deal_top">
				<p class="name">批号</p>
				<p class="weight">重量</p>
				<p class="state">交易状态</p>
				<p class="deal_data">时间</p>
				<div class="clear"></div>
			</div>
			<swiper class='deal_slide swiper-no-swiping' :options="swiperOption6" v-if="tradeStatusList!=''">
			　　<swiper-slide v-for="item in tradeStatusList">
						<p class="name">{{item.batchID}}</p>
						<p class="weight">{{item.amount}}t</p>
						<p class="state">{{item.tradeStatus}}</p>
						<p class="deal_data">{{item.tradeDate.substring(5,10)}}</p>
						<div class="clear"></div>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script>
	export default{
		data: function() {
			return{
				tradeStatusList:'',
				loading:true,
				swiperOption6: {
				　　autoplay: {
				　　　　delay: 3000,
				　　　　disableOnInteraction: false // 手动切换之后继续自动轮播
				　　},
				　　loop: true,
				　　slidesPerView : 4,  
					speed:1000,
				    direction : 'vertical',
				},
			}
		},
		mounted() {
			this.$http.post('/wx/purchase/tradeStatusList').then((response) => {
				this.tradeStatusList = response.list;
				// // console.log(response);
				this.loading=false;
			});
		}
	}
</script>

<style lang="scss">
	.deal{background: #fff;padding-top: 0.2rem;
		.deal_title {
			font-size: 0.32rem;
			display: block;
			border-left: 3px solid #14bab4;
			padding-left: 0.2rem;
			margin-bottom: 0.2rem;
		}
		.deal_top{
			width: 100%;background: #e7f8f7;padding: 0.15rem 0;
			p{float: left;color: #14bab4;font-size: 0.3rem;}
			.name{width: 1.7rem;padding-left: 0.3rem;}
			.weight{width: 1.8rem;text-align: center;}
			.state{width: 1.7rem;text-align: center;}
			.deal_data{width: 1.3rem;text-align: right;}
		}
		
		
		.deal_slide{
			height: 2.4rem;margin-top: 0.2rem;
			.swiper-slide{font-size: 0.4rem;
				p{float: left;color: #14bab4;font-size: 0.3rem;display: block;min-height: 0.1rem;}
				.name{width: 1.9rem;padding-left: 0.1rem;}
				.weight{width: 1.8rem;text-align: center;}
				.state{width: 1.7rem;text-align: center;}
				.deal_data{width: 1.3rem;text-align: right;}
			}
		}
	}
	
</style>
