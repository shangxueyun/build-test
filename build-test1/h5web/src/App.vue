<template>
	<div id="app">
		<div id="nav">
			<router-link to="/index">
				<img class="wei" src="./assets/icon/shouyeweidianji@2x.png" alt="">
				<img class="dian" src="./assets/icon/shouyedianji@2x.png" alt="">
				<p>首页</p>
			</router-link>
			<router-link to="/newsList">
				<img class="wei" src="./assets/img/mianhuaweidianji.png" alt="">
				<img class="dian" src="./assets/img/mianhuadianji.png" alt="">
				<p>棉花圈</p>
			</router-link>
			<router-link :to="'/warehouse'+'/'+'null'+'/'+'1'">
				<img class="wei" src="./assets/icon/ziyuankuweidianji@2x.png" alt="">
				<img class="dian" src="./assets/icon/ziyuankudianji@2x.png" alt="">
				<p>商城</p>
			</router-link>
			<router-link to="/personal/waitEnquiry" style="position: relative;">
				<span v-if="userInfo.user && UserEnquiries > 20" :UserEnquiries="UserEnquiries" class="enquiriesNum big">20+</span>
				<span v-if="userInfo.user && UserEnquiries <= 20" :UserEnquiries="UserEnquiries" class="enquiriesNum">{{ UserEnquiries }}</span>
				<img class="wei" src="./assets/img/dibugouwuche@2x.png" alt="">
				<img class="dian" src="./assets/img/dibugouwuchedianji@2x.png" alt="">
				<p>待询盘</p>
			</router-link>
			<router-link to="/personal">
				<img class="wei" src="./assets/icon/woweidianji@2x.png" alt="">
				<img class="dian" src="./assets/icon/wodianji@2x.png" alt="">
				<p>我的</p>
			</router-link>
		</div>
		<div id="nav2">
			<router-link :to="'/shop/shopDetails/'+this.$store.state.id_+'/'+'1'" id="shopdetails">
				<img class="wei" src="./assets/img/dibudianpu@2x.png" alt="">
				<img class="dian" src="./assets/img/dibudianpudianji@2x.png" alt="">
				<p>店铺</p>
			</router-link>
			<router-link to="/personal/waitEnquiry" style="position: relative;">
				<span :UserEnquiries="UserEnquiries" class="enquiriesNum">{{ UserEnquiries }}</span>
				<img class="wei" src="./assets/img/dibugouwuche@2x.png" alt="">
				<img class="dian" src="./assets/img/dibugouwuchedianji@2x.png" alt="">
				<p>购物车</p>
			</router-link >
			<router-link to="/personal">
				<img class="wei" src="./assets/icon/woweidianji@2x.png" alt="">
				<img class="dian" src="./assets/icon/wodianji@2x.png" alt="">
				<p>我的</p>
			</router-link>
		</div>
		<div class="fiexd_kefu" v-if="!$route.path.includes('points')">
				<a href="https://care60.live800.com/live800/chatClient/chatbox.jsp?companyID=80003104&configID=1383" v-if="kefu">
					<img src="./assets/img/kefu_icon.png" alt="">
				</a>
				<a href="javascript:;" v-if="!kefu" @click="kefuLogin">
					<img src="./assets/img/kefu_icon.png" alt="">
				</a>
		</div>
		<keep-alive>
		    <router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>



<script>
import { mapState } from 'vuex'
	export default {
		data: function() {
			return {
				openId: '',
				appId: 'wx768e12b1aafcb7a2',
				userInfo: '',
				kefu:true,
			}
		},
		computed: mapState({
			// 待询盘数量
			UserEnquiries: state => state.operatingInfo.operatingInfo.UserEnquiries ? state.operatingInfo.operatingInfo.UserEnquiries : 0,
			// 全局用户信息
			userInfoM: state => state.userInfo.userInfo
		}),
		beforeCreate () {
			// // // 加载项目代入user信息
			this.$store.dispatch('USER_INFO_GET')
			this.$store.dispatch('OPREATING_INFO_GET')
		},
		watch: {
			userInfoM (value) {
				this.userInfo = value
			}
		},
		methods: {
			getCodeApi(state) { //获取code  
				let appid
				let origin = window.location.origin
				let protocol = window.location.protocol || 'https:'
				if (process.env.NODE_ENV === 'production') { // 生产环境
					appid = 'wx768e12b1aafcb7a2'
				} else if (process.env.NODE_ENV === 'test') { // 开发测试环境
					appid = 'wx595c41d76974579c' //测试
				} else { // 本地开发环境
					appid = 'wx595c41d76974579c' //测试
				}
			
				// return Url
				// let appid
				// 判断测试正式
				if (!appid) {
					if (window.location.host.includes('mob.unioncotton.com'))
					appid = 'wx768e12b1aafcb7a2' //正式
					else
					appid = 'wx595c41d76974579c' //测试
				}
				let urlNow = encodeURIComponent(window.location.href);
				let scope = 'snsapi_userinfo'; //snsapi_userinfo   //静默授权 用户无感知	snsapi_base
				// let appid = 'wx768e12b1aafcb7a2';
				let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + urlNow +
					'&response_type=code&scope=' + scope + '&state=' + state + '#wechat_redirect';
				window.location.replace(url);
			},
			getUrlKey(name) { //获取url 参数
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1]
					.replace(/\+/g, '%20')) || null;
			},
			kefuLogin(){
				this.$message({
					message: '还未登录，请先登录后再联系客服',
					type: 'error',
					onClose: () => {
						this.$router.push({
							path: '/login'
						})
					}
				});
			}
		},
		created() { //返回值
			var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i) ;
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				if (parseInt(wechatInfo[1]) < 7) {
					alert("当前微信版本不支持，请前往微信设置进行更新操作");
					WeixinJSBridge.call('closeWindow');
				}
			}
			
			// alert(window.location.href);
				// var ua = window.navigator.userAgent.toLowerCase();
		  // 		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		            // if(localStorage.openID==''||!localStorage.openID){
						
		            	// let code = this.getUrlKey("code");
						// // alert(code);
		            	// if (code) {
		            	// 	this.$http.post('/wx/api/redirectUrl?code='+code+'').then((response) => {
		            	// 		if(response.entity.unionid){
		            	// 			localStorage.openID = response.entity.unionid;
						// 			localStorage.gzhOpenID = response.entity.openid;
						// 		}
						// 		// openid 换换取成功获取user信息
						// 		// 加载项目代入user信息
						// 		this.$store.dispatch('USER_INFO_GET')
						// 		this.$store.dispatch('OPREATING_INFO_GET')
								
						// 		this.$http.post('/wx/index_h5/isSubscribe').then((response) => {
						// 			if(response.data==1){
						// 				localStorage.qrShow=true;
						// 			}else{
						// 				localStorage.qrShow=false;
						// 			}
						// 		});
		            	// 		// localStorage.openID = '13800138000'
		            	// 	})
		            	// } else {	
		            	// 	this.getCodeApi("123");
		            	// }
		        // }else {
					// this.$http.post('/wx/index_h5/isSubscribe').then((response) => {
					// 	if(response.data==1){
					// 		localStorage.qrShow=true;
					// 	}else{
					// 		localStorage.qrShow=false;
					// 	}
					// 	
					// 	
					// });
		   //          return false;
		 		// }
			// 
		},
		mounted() {
			this.userInfo = this.userInfoM
			if (JSON.stringify(this.userInfo) == '{}')
				this.userInfo = JSON.parse(sessionStorage.getItem('userInfo')) ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
				
			if(localStorage.openID){
				this.kefu=true;
			}else{
				this.kefu=false;
			}
			// 百度分享
			var _hmt = _hmt || [];
			(function() {
				var hm = document.createElement("script");
				hm.src = "https://hm.baidu.com/hm.js?0f3beb4412d4bd901a796f17f4053b78";
				var s = document.getElementsByTagName("script")[0];
				s.parentNode.insertBefore(hm, s);
			})();

			let url = window.location.href;
			// 設置分享
			this.$http.post('/wx/api/share?url=' + (url.indexOf('/?') == '-1' ? url : encodeURIComponent(url))).then((response) => {
				// console.log(response);
				localStorage.setItem = ("temp", response);
				wx.config({
					debug: false,
					appId: response.appId,
					timestamp: response.timestamp,
					nonceStr: response.nonceStr,
					signature: response.signature,
					jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'hideAllNonBaseMenuItem', 'showMenuItems']
					// 功能列表，我们要使用JS-SDK的什么功能
				});
				wx.ready(function() {
					// 获取“分享给朋友”按钮点击状态及自定义分享内容接口
					wx.onMenuShareAppMessage({
						title: "棉联-棉花电商综合服务平台", // 分享标题
						desc: "交易0风险 成交有保障 棉纺全产业链服务 www.unioncotton.com", // 分享描述
						imgUrl: "https://mob.unioncotton.com/img/logo.png",
					});
					// wx.hideAllNonBaseMenuItem();
					wx.showMenuItems({
						menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
					});
					wx.onMenuShareTimeline({
						title: "棉联-棉花电商综合服务平台", // 分享标题
						desc: "交易0风险 成交有保障 棉纺全产业链服务 www.unioncotton.com", // 分享描述
						imgUrl: "https://mob.unioncotton.com/img/logo.png",
					});
				});
			})
		},
	}
</script>

<style lang="scss">
	body {
		max-width: 750px;
		margin: 0 auto !important;
	}

	@media (min-width: 320px) {
		html {
			font-size: 42.6667px;
		}
	}

	@media (min-width: 360px) {
		html {
			font-size: 48px;
		}
	}

	@media (min-width: 375px) {
		html {
			font-size: 50px;
		}
	}

	@media (min-width: 384px) {
		html {
			font-size: 51.2px;
		}
	}

	@media (min-width: 414px) {
		html {
			font-size: 55.2px;
		}
	}

	@media (min-width: 448px) {
		html {
			font-size: 59.7333px;
		}
	}

	@media (min-width: 480px) {
		html {
			font-size: 48px;
		}
	}

	@media (min-width: 512px) {
		html {
			font-size: 68.2667px;
		}
	}

	@media (min-width: 544px) {
		html {
			font-size: 72.5333px;
		}
	}

	@media (min-width: 576px) {
		html {
			font-size: 76.8px;
		}
	}

	@media (min-width: 608px) {
		html {
			font-size: 81.0667px;
		}
	}

	@media (min-width: 640px) {
		html {
			font-size: 85.3333px;
		}
	}

	@media (min-width: 750px) {
		html {
			font-size: 100px;
		}
	}

	.fl {
		float: left
	}

	.fr {
		float: right
	}

	.clear {
		clear: both
	}

	.wrap {
		padding: 0 0.2rem;
	}

	.por {
		position: relative;
	}

	.poa {
		position: absolute;
	}

	body {
		background: #f6f6f6;
		max-width: 768px;
		margin: 0 auto !important;
	}

	#nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background: #fff;
		height: 1rem;
		display: flex;
		max-width: 768px;
		margin: 0 auto !important;

		a {
			text-align: center;
			flex: 1;

			img {
				display: inline-block;
				height: 0.5rem;
				width: 0.5rem;
				margin-top: 5px;
			}

			img.dian {
				display: none;
			}

			img.wei {
				display: inline-block;
			}

			p {
				font-size: 0.3rem;
				height: 15px;
				line-height: 10px;
				color: #babebe;
			}
		}

		.router-link-active {
			img.dian {
				display: inline-block;
			}

			img.wei {
				display: none;
			}

			p {
				color: #14bab4;
			}
		}
	}

	#nav2 {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background: #fff;
		height: 1rem;
		display: none;
		max-width: 768px;
		margin: 0 auto !important;

		a {
			text-align: center;
			flex: 1;

			img {
				display: inline-block;
				height: 0.5rem;
				width: 0.5rem;
				margin-top: 5px;
			}

			img.dian {
				display: none;
			}

			img.wei {
				display: inline-block;
			}

			p {
				font-size: 0.3rem;
				height: 15px;
				line-height: 10px;
				color: #babebe;
			}
		}

		.router-link-active {
			img.dian {
				display: inline-block;
			}

			img.wei {
				display: none;
			}

			p {
				color: #14bab4;
			}
		}
	}

	.el-loading-parent--relative {
		height: 100vh;
	}

	label {
		line-height: 20px;
		display: inline-block;
		margin-left: 5px;
		margin-right: 15px;
		color: #777;
	}

	.radio_type {
		width: 0px;
		height: 0px;
		position: relative;
		margin-left: -13px;
	}

	.radio_type:before {
		content: '';
		width: 20px;
		height: 20px;
		border: 1px solid #7d7d7d;
		display: inline-block;
		border-radius: 50%;
		vertical-align: middle;

	}

	.radio_type:checked:before {
		content: '';
		width: 20px;
		height: 20px;
		border: 1px solid #fd6e20;
		background: #fd6e20;
		display: inline-block;
		border-radius: 50%;
		vertical-align: middle;

	}

	.radio_type:checked:after {
		content: '';
		width: 10px;
		height: 5px;
		border: 2px solid white;
		border-top: transparent;
		border-right: transparent;
		text-align: center;
		display: block;
		position: absolute;
		top: 6px;
		left: 5px;
		vertical-align: middle;
		transform: rotate(-45deg);
	}

	.radio_type:checked+label {
		color: #c59c5a;
	}

	.el-loading-mask {
		position: fixed !important;
		opacity: .8;
	}

	.search {
		width: 7.1rem;
		padding: 0 0.2rem;
		padding-top: 0.2rem;
		background: #fff;

		.search_left {
			width: 5.76rem;
			height: 0.66rem;
			background: #F2F2F2;

			i {
				width: 0.8rem;
				height: 0.66rem;
				text-align: center;

				img {
					width: 0.27rem;
					height: 0.27rem;
					margin-top: 0.195rem;
				}
			}

			.search_txt {
				width: 4.96rem;
				height: 0.66rem;
				font-size: 0.3rem;
				border: none;
				background: none;
				color: #666;
			}

		}

		.search_btn {
			width: 1.24rem;
			height: 0.66rem;
			border: none;
			background: #14BAB4;
			border-radius: 0.1rem;
			margin-left: 0.1rem;
			font-size: 0.24rem;
			color: #fff;
		}

	}
	.fiexd_kefu{
		a{position: fixed;width: 0.8rem;bottom: 1.5rem;right: 0.2rem;z-index:9999;
			img{width: 100%;}
		}
	}
	.enquiriesNum{
		position: absolute;
		top: 0;
		right: .4rem;
		width: 16px;
		height: 16px;
		line-height: 16px;
		border-radius: .35rem;
		background: red;
		color: #fff;
		font-size: .24rem;
	}
	.big{
		width: .4rem;
		height: .4rem;
		line-height: .4rem;
		border-radius: .4rem;
		font-size: .22rem;
	}
</style>

<style>
	/* // 日期禁用字体大小 */
	.layui-laydate .laydate-disabled {
		font-size: 0.24rem !important;
	}
</style>