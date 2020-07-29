<template>
	<div class="wuliu_bg">
		<div class="wrap wuliu">
			<p class="wuliu_title">物流线路</p>
			<div class="swiper-container logistics">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="item in logistics">
						
					</div>
					
				</div>
			</div>
			<swiper class='logistics' :options="swiperOption4" v-if="logistics!=''">
			　　<swiper-slide v-for="item in logistics">
					<div class="slide_wrap pos">
						<p class="line_start poa">起点</p>
						<p class="line_end poa">终点</p>
						<p class="line_money poa">费用<span>{{item.transportPrice}}</span></p>
						<p class="line_date poa">{{item.updateDate.substring(5,10)}}</p>
						<div class="con">
							<p class="start_add">{{item.startCity}}</p>
							<img src="../../assets/icon/wuliu.png" alt="">
							<p class="end_add">{{item.endCity}}</p>
						</div>
					</div>
				</swiper-slide>
			</swiper>
			<div class="list_bottom"></div>
			
		</div>
	</div>
	
</template>

<script>
	export default {	
		data:function(){
			return{
				logistics:'',
				swiperOption4: {
				　　autoplay: {
				　　　　delay: 3000,
				　　　　disableOnInteraction: false // 手动切换之后继续自动轮播
				　　},
				　　loop: true,
				　　slidesPerView : 3,  
					speed:1000,
				},
			}
		},
		
		mounted() {
			this.$http.post('/wx/index_h5/logistics').then((response) => {
				this.logistics = response.list;
				// // console.log(response);
				// setTimeout(function(){
				// 	new Swiper('.logistics', {
				// 		loop: true,
				// 		slidesPerView: 2.3,
				// 		slidesPerGroup: 1,
				// 	})
				// },0)
			});
			
		}
	}
</script>

<style lang="scss">
	.wuliu_bg{background: #fff;width: 7.5rem;}
	.wuliu{background: #fff;padding-top: 0.2rem;padding-top: 0.2rem;overflow: hidden;width: 7.1rem;padding-left: 0;padding-right: 0;margin: 0 0.2rem;}
	.wuliu_title {
		font-size: 0.32rem;
		display: block;
		border-left: 3px solid #f47c15;
		padding-left: 0.2rem;
		margin-bottom: 0.2rem;
	}

	.logistics {
		width: 9.5rem;
		.swiper-wrapper {
			.swiper-slide {padding-bottom: 2px;
				.slide_wrap {
					height: 1.74rem;
					background: #fff6f0;
					border: 1px solid #ffbe87;
					margin-right: 0.2rem;
					position: relative;
					.line_start{left: 0.1rem;top: 0.1rem;color: #999999;font-size: 0.28rem;}
					.line_end{right: 0.1rem;top: 0.1rem;color: #999999;font-size: 0.28rem;}
					.line_money{left: 0.1rem;bottom: 0.1rem;color: #999999;font-size: 0.28rem;
						span{color: #f47c15;margin-left: 0.1rem;}
					}
					.line_date{right: 0.1rem;bottom: 0.1rem;color: #999999;font-size: 0.28rem;}
					.con{text-align:center;padding-top: 0.6rem;
						p{font-size: 0.3rem;color: #333333;display: inline-block;width: 1rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
						img{width: 0.28rem;display: inline-block;padding-top: 0.15rem;margin: 0 0.2rem;}
						.start_add{
							
						}
						.end_add{}
					}
				}

			}
		}

	}
</style>
