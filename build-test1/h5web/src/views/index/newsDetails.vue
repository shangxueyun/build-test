<template>
	<div>
		<div class="topBack" >
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p class="newDetTitle">{{newDetTitle}}</p>
		</div>
		<div class="addHeight"></div>
		<div class="wrap news_det" id='new_det' :class="derClass">
			
			<!-- <p class="news_title">[棉联点评]郑棉联期货持续弱势，储备棉成交率大幅下跌</p>
			<div class="det_con">
				<p class="news_cla">棉市点评</p>
				<p class="news_date">2018-08-06</p>
			</div>
			<p class="news_con">郑棉联期货持续弱势，储备棉成交率大幅下跌郑棉联期货持续弱势，储备棉成交率大幅下跌郑棉联期货持续弱势，储备棉成交率大幅下跌郑棉联期货持续弱势，储备棉成交率大幅下跌郑棉联期货持续弱势，储备棉成交率大幅下跌郑棉联期货持续弱势，储备棉成交率大幅下跌</p>
			<div class="bg"></div> -->

		</div>	
	</div>
	

</template>

<script>
	export default {
		data: function() {
			return {
				newDetTitle:'',
				share_title:'',
				share_txt:'',
				newsdet: '',
				derClass:'',
				imgUrl:'',
			}
		},
		updated() {
			window.scroll(0, 0);
		},
		// 根据ID获取详情
		beforeRouteEnter(to, from, next) {
			//beforeRouteEnter中this无效，所以能用vm
			next(vm => {
				var newsId = to.params.id;
				var newsStatus = to.params.status;
				vm.axios.post('wx/article/getArticle?id=' + newsId).then((response) => {
					// vm.songlikelist = res.data.data;
					let new_det = document.getElementById('new_det');
					
					vm.share_title=response.entity.title;
					vm.share_txt=response.entity.summary;
					if(response.entity.picImage!=''){
						vm.imgUrl = response.entity.picImage;
					}else{
						vm.imgUrl = 'https://mob.unioncotton.com/img/logo.png';
					}
					if(newsStatus==1){
						vm.newDetTitle = response.entity.title;
						new_det.innerHTML = response.entity.content;
						wx.ready(function() {
							// 获取“分享给朋友”按钮点击状态及自定义分享内容接口
							wx.onMenuShareAppMessage({
								title: vm.share_title, // 分享标题
								desc: vm.share_txt, // 分享描述
								imgUrl:vm.imgUrl,
								link:'https://mob.unioncotton.com/#/newsList/newsDetails/'+newsId+'/'+newsStatus,
							});
							wx.onMenuShareTimeline({
								title: vm.share_title, // 分享标题
								desc: vm.share_txt, // 分享描述
								imgUrl: vm.imgUrl,
								link:'https://mob.unioncotton.com/#/newsList/newsDetails/'+newsId+'/'+newsStatus,
							});
						});
					}else{
						vm.newDetTitle = '市场快讯';
						new_det.innerHTML = response.entity.summary;
						vm.derClass = "detpt";
						wx.ready(function() {
							// 获取“分享给朋友”按钮点击状态及自定义分享内容接口
							wx.onMenuShareAppMessage({
								title: '市场快讯', // 分享标题
								desc: vm.share_txt, // 分享描述
								imgUrl: vm.imgUrl,
								link:'https://mob.unioncotton.com/#/newsList/newsDetails/'+newsId+'/'+newsStatus,
							});
							wx.onMenuShareTimeline({
								title: '市场快讯', // 分享标题
								desc: vm.share_txt, // 分享描述
								imgUrl: vm.imgUrl,
								link:'https://mob.unioncotton.com/#/newsList/newsDetails/'+newsId+'/'+newsStatus,
							});
						});
					}
					
				});
				
			})
			
		},
		beforeDestroy(){
				// 获取“分享给朋友”按钮点击状态及自定义分享内容接口
			// wx.ready(function() {A
				wx.onMenuShareAppMessage({
					title: "棉联-棉花电商综合服务平台", // 分享标题
					desc: "交易0风险 成交有保障 棉纺全产业链服务 www.unioncotton.com", // 分享描述
					imgUrl:"https://mob.unioncotton.com/img/logo.png",
				});
				wx.onMenuShareTimeline({
					title: "棉联-棉花电商综合服务平台", // 分享标题
					desc: "交易0风险 成交有保障 棉纺全产业链服务 www.unioncotton.com", // 分享描述
					imgUrl:"https://mob.unioncotton.com/img/logo.png",
				});
			// });
			document.title = "棉联-棉花电商综合服务平台";
		},
	}
</script>

<style>
	body {
		width: 100% !important;
		padding: 0 !important;
	}

	#new_det {
		padding-bottom: 2rem;
		
	}
	.detpt{padding-top: 0.5rem;line-height: 0.5rem;}
	.newDetTitle{
		width: 6rem;
		margin: auto;
		text-align: center;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
</style>
