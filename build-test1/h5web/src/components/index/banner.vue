<template>
	
	<!-- <swiper class='banner' :options="swiperOption" v-if="Banner!=''">
		<swiper-slide class="swiper-slide" v-for="item in Banner" >
			<img :src="item.paramValue" alt="">
		</swiper-slide>
	　　<div class="swiper-pagination" slot="pagination"></div>
	</swiper> -->
	<swiper class='banner' :options="swiperOption" v-if="Banner!=''">
		<swiper-slide class="swiper-slide">
			<img src='../../assets/img/banner5.png' alt="">
		</swiper-slide>
		<!-- <swiper-slide class="swiper-slide">
			<img src='../../assets/img/img02.png' alt="">
		</swiper-slide> -->
	　　<div class="swiper-pagination" slot="pagination"></div>
	</swiper>
</template>

<script>
	export default {
		name: 'Banner',
		data: function() {
			return{
				Banner:'1',
				swiperOption: {
				　　pagination: {
				　　　　el: '.swiper-pagination',
				　　},
				　　autoplay: {
				　　　　delay: 3000,
					   disableOnInteraction: false // 手动切换之后继续自动轮播
				　　},
				    speed:1000,
				　　loop: true,
				},
			}
		},
		created() {
			// this.$http.post('/wx/index_h5/pic').then((response) => {
			// 	this.Banner = response.list;
			// 	// // console.log(response);
			// });
			
			
			
		}
	}
</script>

<style lang="scss">
	.banner {
		width: 100%;

		.swiper-slide {
			height: 2rem;
			width: 7.5rem;
			text-align: center;

			img {
				display: inline-block;
				width: 100%;
				margin: auto;
			}
		}
		
		.swiper-pagination-bullet{background: #fff;opacity: 0.5;}
		.swiper-pagination-bullet.swiper-pagination-bullet-active{opacity: 1;}
	}
</style>
