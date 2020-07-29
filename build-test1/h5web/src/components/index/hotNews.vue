<template>
	<div class="hot_news">
		<img class="zixun fl" src="../../assets/icon/zixun.png" alt="">
		<p class="new_title fl">棉联资讯</p>
		<div class="news_wrap fl">
			<!-- <div class="swiper-container news">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="item in news">
						<p class="link" @click="godetails(item)">
							{{item.title}}ASDASDASDASDASDASDASD
						</p>
					</div>
				</div>
			</div> -->
			<swiper class="news" :options="swiperOption3" v-if="news!=''">
			    <div class="swiper-slide" v-for="item in news">
			    	<p class="link" @click="godetails(item)">
			    		{{item.title}}
			    	</p>
			    </div>
			</swiper>
		</div>
		
		<div class="clear"></div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				news: '',
				swiperOption3: {
				　　autoplay: {
				　　　　delay: 2000,
				　　　　disableOnInteraction: false // 手动切换之后继续自动轮播
				　　},
				　　loop: true,
				　　slidesPerView : 1,  
					speed:1000,
				    direction : 'vertical',
				},
			}
		},
		mounted() {
			
				this.$http.post('/wx/article/getArticleList?categoryID=1').then((response) => {
					this.news = response.entity.list;
					// console.log(response);
				});
			
		},
		methods:{
			godetails(item_) {
				this.$router.push({
					name: 'newsDetails',
					params: {
						id: item_.id
					}
				});
			}
		}

	}
</script>

<style lang="scss">
	.hot_news{background: #fff6f0;}
	.zixun {
		width: 0.32rem;
		height: 0.28rem;
		margin-left: 0.2rem;
		margin-top: 0.2rem;
	}

	.new_title {
		height: 0.7rem;
		font-size: 0.3rem;
		color: #333333;
		margin-left: 0.2rem;
		line-height: 0.7rem;
	}

	.news_wrap {
		.news {
			width: 5rem;
			height: 0.4rem;
			margin-left: 0.2rem;
			margin-top: 0.16rem;
			.swiper-slide {
				// height: 0.28rem;
				width: 5rem;
				overflow: hidden;
				.link {
					font-size: 0.3rem;
					width: 5rem;
					// height: 0.7rem;
					// line-height: 0.7rem;
					display: block;
					// margin-top: -0.08rem;
					color: #fe8a51;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					// line-height: 0.28rem;
				}
			}
		}
	}
</style>
