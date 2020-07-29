<template>

	<div class="index_wrap">
		<Search></Search>
		<Banner></Banner>
		<HotNews></HotNews>
		<IndexMenu></IndexMenu>
		<Recommend></Recommend>
		<DealNews></DealNews>
		<Customization></Customization>
		<ResourceList></ResourceList>
		<IndexLogistics></IndexLogistics>
		<div class="qrCode" v-if="qrShow">
			<div class="qrCode_bg"></div>
			<div class="qrCode_con">
				<img class="qrClose" src="../../assets/img/qrClose.png" alt="" @click="qrCode()">
				<img class="qrImg" src="../../assets/img/index_qrcode.png" alt="">
				<div class="qrWeek">
					<input type="checkbox" value=""  v-model="qrSure" id="qrWeek"><label for="qrWeek">近7天不再弹出此提示</label>
				</div>
				
			</div>
		</div>
	</div>
	
</template>

<script>
	import Search from '@/components/search.vue'
	import Banner from '@/components/index/banner.vue'
	import IndexMenu from '@/components/index/indexMenu.vue'
	import HotNews from '@/components/index/hotNews.vue'
	import DealNews from '@/components/index/dealNews.vue'
	import Recommend from '@/components/index/recommend.vue'
	import Customization from '@/components/index/customization.vue'
	import IndexLogistics from '@/components/index/indexLogistics.vue'
	import ResourceList from '@/components/index/resourceList.vue'
	export default {
		name: 'Index',
		data: function() {
			return {
				sessionID: '',
				userID: '',
				myurl: 'https://mob.unioncotton.com',
				openId: '',
				code: '',
				imgUrl:'',
				qrShow:false,
				qrSure:false,
				
			}
		},
		components: {
			Search,
			Banner,
			IndexMenu,
			HotNews,
			DealNews,
			IndexLogistics,
			ResourceList,
			Customization,
			Recommend,
		},
		created() {
		},
		mounted() {
			
				if(localStorage.qrShow==true){
					this.qrShow=true;
				}else{
					this.qrShow=false;
				}
			window.scroll(0, 0);
			//判断微信或其他浏览器进行获取ID
		// 	function GetQueryString(name) {
		// 		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		// 		var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
		// 		if (r != null) return unescape(r[2]);
		// 		return null;
		// 	}
		
		// 	var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象


		// 	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		// 		if (localStorage.openID == '') {
		// 			if (GetQueryString("code") != null) {
		// 				this.code = GetQueryString("code");
		// 				// alert(GetQueryString("redirect_uri"));
		// 				this.$http.post('/wx/api/redirectUrl?code=' + this.code).then((response) => {
		// 					if (response.unionid) {
		// 						localStorage.openID = response.unionid;
		// 					}
		// 				});

		// 			} else {
		// 				this.$http.post('/wx/api/getOauthPageUrl?redirectUrl=' + this.myurl + '&state=1').then((response) => {
		// 					// alert(response.entity)
		// 					// window.location.href = response.entity

		// 				});
		// 			}
		// 		}

		// 		// this.$http.post('/wx/api/redirectUrl?code='+this.code).then((response) => {
		// 		// 			 // console.log(response);
		// 		// });
		// 	}
			// document.getElementById('nav').style.display = "box";
		},
		methods:{
			qrCode(){
				if(this.qrSure==true){
					this.qrShow=false;
					this.$http.post('/wx/index_h5/updateQrCodeEndTime').then((response) => {
						
					});
				} else {
					this.qrShow=false;
				}
			}
		},
	}
</script>

<style lang="scss">
	.loading_pic {
		width: 7.5rem;
		position: fixed;
		left: 50%;
		margin-left: -3.75rem;
		z-index: 99999;
		top: 0;
		height: 100%;
		background-image: url(../../assets/img/loading.png);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	.qrCode{
		.qrCode_bg{
			background: #000000;
			opacity: 0.3;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 999;
		}
		
		.qrCode_con{
			position: fixed;
			top: 10%;
			width: 6.5rem;
			left: 0.5rem;
			z-index: 9999;
			.qrClose{
				width: 0.6rem;
				position: absolute;
				top: 13%;
				right: 0rem;
				z-index: 9999;
			}
			.qrImg{
				width: 100%;
			}
			.qrWeek{
				position: absolute;
				bottom: 0.3rem;
				left: 1.8rem;
				input{width: 0.22rem;height: 0.22rem;margin-top: 2px;background: #fff;border: none;position: relative;}
				input[type="checkbox"]::before {
				                content: "";
				                position: absolute;
				                top: 0;
				                left: 0;
				                background: #fff;
				                width: 100%;
				                height: 100%;
				                border: 1px solid #d9d9d9;
				                border-radius: 4px;
				            }
				input[type="checkbox"]:checked::before {
				                content: "\2713";
				                background-color: #fff;
				                position: absolute;
				                top: 0;
				                left: 0;
				                width: 100%;
				                border: 1px solid #7D7D7D;
				                border-radius:4px;
				                color: #7D7D7D;
				                font-size: 0.14rem;
				                font-weight: bold;
				                line-height: 0.2rem;
				                text-align: center;
				            }
				label{line-height: 0.2rem;margin-left: 5px;color: #fff;font-size: 0.16rem;letter-spacing: 1px}
					
			}
		}
	}
</style>
