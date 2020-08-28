<template>
	<div class="personal" v-loading="loading">
		<div class="personal_top">
			<div class="head">
				<div class="head_w">
					<img src="../../assets/img/head.png" alt="">
				</div>
				<img class="vip" src="../../assets/img/vip.png" alt="">
			</div>
			<p class="name">{{user.userName}}</p>
			<p class="company">{{member.corpName}}</p>
		</div>
		<div class="auth">
			<a class="geren" v-if="geren" href="javascript:;" @click="applyUserCert()">
				<p class="fl p1">实名认证</p>
				<p class="fl p2">个人认证、企业认证、在线签约</p>
				<p class="fr p3">立即认证</p>
				<div class="clear"></div>
			</a>
			<a class="qiye" v-if="qiye" href="javascript:;" @click="applyMemberCert()">
				<p class="fl p1">企业认证</p>
				<p class="fl p2">在线签约、电子合同、在线支付</p>
				<p class="fr p3">立即认证</p>
				<div class="clear"></div>
			</a>
		</div>
		<div class="personal_bot">
			<p class="personal_bt" v-if="permissionMenu.WAIT_ENQUIRY || permissionMenu.BUY_ENQUIRY || permissionMenu.PURCHASE || permissionMenu.SEARCH_HISTORY">我是买方</p>
			<div class="per_linkT">
				<router-link v-if="permissionMenu.WAIT_ENQUIRY" to="/personal/waitEnquiry">
					<img src="../../assets/img/gouwuche@2x.png" alt="">
					<p>待询盘({{cartNum}})</p>
				</router-link>
				<router-link v-if="permissionMenu.BUY_ENQUIRY" to="/personal/myEnquiry/0">
					<img src="../../assets/img/caigou@2x.png" alt="">
					<p>采购询盘({{orderNum.purchaseSpotSaleCount+orderNum.spotSaleCount}})</p>
				</router-link>
				<!-- <router-link to="/personal/spotPrice/2">
					<img src="../../assets/img/yiqueren@2x.png" alt="">
					<p>点价管理({{orderNum.spotSaleCount}})</p>
				</router-link> -->
				<router-link v-if="permissionMenu.PURCHASE" to="/personal/myOrder/0">
					<img src="../../assets/img/daiqueren@2x.png" alt="">
					<p>采购订单({{myOrderNum.buyUnConfirm}})</p>
				</router-link>
				
				<!-- <router-link to="/personal/customized" style="margin-top: 0.7rem;">
					<img src="../../assets/img/tianjiaxuqiudingzhi@2x.png" alt="">
					<p>添加需求定制</p>
				</router-link> -->
				<router-link v-if="permissionMenu.SEARCH_HISTORY" to="/personal/myCustomized">
					<img src="../../assets/img/xuqiudingzhi@2x.png" alt="">
					<p>我的需求定制</p>
				</router-link>
			</div>
			<p class="personal_bt" v-if="permissionMenu.LISTING || permissionMenu.SELL_ENQUIRY || permissionMenu.ORDER">我是卖方</p>
			<div class="per_linkT">
				<router-link v-if="permissionMenu.LISTING" to="/personal/myResource">
					<img src="../../assets/img/guapaidan@2x.png" alt="">
					<p>我的报价({{resNum}})</p>
				</router-link>
				<!-- <router-link :to="'/personal/myImport'+'/'+ member.memberID">
					<img src="../../assets/img/jinkoumian.png" alt="">
					<p>线上交易({{orderNum.orderSpotSaleCount}})</p>
				</router-link> -->
				<router-link v-if="permissionMenu.SELL_ENQUIRY" to="/personal/enquiry/0">
					<img src="../../assets/img/kehuxunpan@2x.png" alt="">
					<p>线上交易<span v-if="!permissionMenu.SELL_ENQUIRY_ADMIN">({{orderNum.orderSpotSaleCount}})</span></p>
				</router-link>
				<!-- <router-link to="/personal/myOrderBuy/0" :class="{'mt7':memberID!=10000}">
					<img src="../../assets/img/daiqueren@2x.png" alt="">
					<p>销售订单({{myOrderNum.sellUnConfirm}})</p>
				</router-link> -->
				<router-link v-if="permissionMenu.ORDER" to="/personal/myOrderBuy/0">
					<img src="../../assets/img/daiqueren@2x.png" alt="">
					<p>销售订单({{myOrderNum.sellUnConfirm}})</p>
				</router-link>
				<!-- <router-link to="/personal/myOrder/7" style="margin-top: 0.7rem;">
					<img src="../../assets/img/yiqueren@2x.png" alt="">
					<p>已确认订单({{myOrderNum.sellConfirm}})</p>
				</router-link> -->
			</div>
			<div class="per_linkB">
				<router-link to="/personal/information">
					<img src="../../assets/img/xiaoxi@2x.png" alt="">
					<p>站内信息({{infNum}})</p>
				</router-link>
				<input class="tuichu" type="button" value="退出登录" @click="closeuser()">
			</div>
		</div>

		<!-- <div class="bg"></div> -->
	</div>

</template>

<script>
import { mapState,  } from 'vuex'
	export default {
		data: function() {
			return {
				member: '',
				memberID: '',
				user: '',
				myOrderNum: '',
				loading: false,
				cartNum: '',
				resNum: '',
				inpNum: '',
				infNum: '',
				geren:false,
				qiye:false,
				orderNum:'',
				// 现有部分权限设置
				permissionMenu: {
					WAIT_ENQUIRY: false, // 待询盘
					BUY_ENQUIRY: false, // 采购询盘
					SELL_ENQUIRY: false, // 线上交易
					SELL_ENQUIRY_ADMIN: false, // 子功能
					PURCHASE: false, // 采购订单
					SEARCH_HISTORY: false, // 我的需求定制
					LISTING: false, // 我的报价
					ORDER: false, // 销售订单					
				},

			}
		},
    	computed: mapState({
			// 全局用户信息
			userInfo: state => state.userInfo.userInfo
		}),
		created() {
      this.loading = true
			window.scroll(0, 0)
			// 获取进口棉数量
			this.$http.post('/wx/listing/statusStat?memberID=' + this.memberID).then((response) => {
				console.log(response);
				this.inpNum = response.data;
			});
			this.$http.post('/wx/spotSale/getSpotSaleCount').then((response) => {
				// console.log(response);
				this.orderNum=response.entity;
      });
			// 用户信息
	    if (!this.userInfo.user) {
        this.$message({
          showClose: true,
          message: this.userInfo.message,
          type: 'error',
          onClose: () => {
            this.loading = false
            this.$router.push({
              path: '/login'
            })
          }
        });
      } else {
        this.user = this.userInfo.user
        this.member = this.userInfo.member
        this.memberID = this.userInfo.member.memberID
        // 用户权限控制
        let permissionMenu = this.userInfo.permissionMenu
        Object.keys(this.permissionMenu).forEach((o, i)=>{
          for(let k of permissionMenu) {
            if (k.includes(o))
			this.permissionMenu[o] = true
			if (k.includes('SELL_ENQUIRY_PLATFORM'))
			this.permissionMenu['SELL_ENQUIRY_ADMIN'] = true
          }
        })
        this.loading = false
      }
		},
		mounted() {
			this.$http.post('/wx/member/cert/user/get').then((response) => {
				if(response.code==1000){
					if(response.entity["status"] == "DONE"){
						this.geren=false;
						this.$http.post('/wx//member/cert/member/get').then((response) => {
							if(response.code==1000){
								if(response.entity["status"] == "DONE"){
									this.qiye=false;
								}else{
									this.qiye=true;
								}
							}else{
								this.qiye=false;
							}
						});
					}else{
						this.geren=true;
					}
				}else{
					this.geren=false;
				}
			});
			
			//获取订单数量
			this.$http.post('/wx/trade/getOrderStatusStat').then((response) => {
				// console.log(response);
				this.myOrderNum = response.entity;
				// this.user = response.entity.user;
			});
			//获取购物车数量
			this.$http.post('/wx/trade/cartCount').then((response) => {
				// console.log(response);
				this.cartNum = response.entity;
			});
			//获取挂牌数量
			this.$http.post('/wx/trade/getListingCount').then((response) => {
				// console.log(response);
				this.resNum = response.entity;
			});


			//获取信息数量
			this.$http.post('/wx/user/getNoReadMessageCount?type=0').then((response) => {
				// console.log(response);
				this.infNum = response.entity;
			});

		},
		methods: {
			applyUserCert(){
				// axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
				this.$http.post('/wx/member/cert/user/apply').then((response) => {
					if (response.code == 1000 && response.entity != null) {
						if (response.entity["status"] == "DO") {
							window.open(response.entity["url"]);
						} else if (response.entity["status"] == "DONE") {
							window.location.reload();
						}
					} else {
						this.$message({
							message: response.message,
							type: 'error',
						});
					}
				});
			},
			applyMemberCert(){
				this.$http.post('/wx/member/cert/member/apply').then((response) => {
					if (response.code == 1000 && response.entity != null) {
						if (response.entity["status"] == "DO") {
							window.open(response.entity["url"]);
						} else if (response.entity["status"] == "DONE") {
							window.location.reload();
						}
					} else {
						this.$message({
							message: response.message,
							type: 'error',
						});
					}
				});
			},
			//前往采购订单详情
			goOrder(item_) {
				this.$router.push({
					name: 'myOrder',
					params: {
						id: item_
					}
				});
			},
			//退出
			closeuser() {
				var ua = window.navigator.userAgent.toLowerCase();
				        // if (ua.match(/MicroMessenger/i) == 'micromessenger') {
							//获取信息数量
							this.$http.post('/wx/user/logout').then((response) => {
								// console.log(response);
								if (response.success == true) {
                  // localStorage.openID = '';
                  this.$store.commit({
                    type: 'USER_INFO_SET',
                    userInfo: 'logout'
                  })
									this.$router.push({
										path: '/loginPass'
									})
								}
							});
				     //    } else {
				     //        //获取信息数量
				     //        this.$http.post('/wx/user/logout').then((response) => {
				     //        	// console.log(response);
				     //        	if (response.success == true) {
									// 
				     //        		localStorage.openID = '';
				     //        		this.$router.push({
				     //        			path: '/loginPass'
				     //        		})
				     //        	}
				     //        });
				     //    }
				
			},
			
		},
		
		
		
	}
</script>

<style lang="scss">
	.auth{margin-top: -0.35rem;
		.geren{display: block;width: 6.5rem;padding: 0 0.25rem;margin: 0 0.25rem;background: #14bab4;color: #fff;border-radius: 0.1rem;height: 0.7rem;line-height: 0.7rem;
			.p1{font-size: 0.32rem;height: 0.3rem;line-height: 0.3rem;margin: 0.2rem 0;border-right: 1px solid #fff;padding-right: 0.1rem;}
			.p2{margin-left: 0.1rem;font-size: 0.25rem;}
			.p3{background: #fd7320;height: 0.5rem;line-height: 0.5rem;margin: 0.1rem 0;padding: 0 0.1rem;border-radius: 0.1rem;font-size: .28rem;}
		}
		.qiye{display: block;width: 6.5rem;padding: 0 0.25rem;margin: 0 0.25rem;background: #14bab4;color: #fff;border-radius: 0.1rem;height: 0.7rem;line-height: 0.7rem;
			.p1{font-size: 0.32rem;height: 0.3rem;line-height: 0.3rem;margin: 0.2rem 0;border-right: 1px solid #fff;padding-right: 0.1rem;}
			.p2{margin-left: 0.1rem;font-size: 0.25rem;}
			.p3{background: #fd7320;height: 0.5rem;line-height: 0.5rem;margin: 0.1rem 0;padding: 0 0.1rem;border-radius: 0.1rem;font-size: .28rem;}
		}
		
	}
	.personal_bt {
		background: #fff;
		width: 7.2rem;
		padding: 0.3rem 0 0rem 0.3rem;
		color: #090909;
		font-size: 0.32rem;
	}

	.personal_top {
		background: url(../../assets/img/personal_bg.png) no-repeat center;
		background-size: cover;
		height: 3.2rem;
		text-align: center;
		padding-top: 0.7rem;

		.head {
			display: inline-block;
			width: 1rem;
			position: relative;

			.head_w {
				width: 1rem;
				height: 1rem;
				border-radius: 50%;
				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.vip {
				width: 0.34rem;
				height: 0.29rem;
				position: absolute;
				right: -0.1rem;
				bottom: 0;
			}
		}

		.name {
			color: #ffffff;
			font-size: 0.5rem;
			margin-top: 0.1rem;
		}

		.company {
			color: #eefffe;
			font-size: 0.3rem;
			margin-top: 0rem;
		}

		.order {
			margin-top: 0.4rem;

			span {
				width: 1.87rem;
				display: block;
				float: left;
				text-align: center;

				.order_name {
					font-size: 0.3rem;
					color: #eefffe;
				}

				.order_num {
					font-size: 0.46rem;
					color: #fff;
				}
			}
		}
	}

	.personal_bot {
		.per_linkT {
			margin-bottom: 0.2rem;
			background: #fff;
			padding: 0.3rem 0;

			a {
				display: inline-block;
				width: 2.48rem;
				text-align: center;

				img {
					width: 0.72rem;
				}

				p {
					color: #333333;
					font-size: 0.3rem;
					margin-top: 0.05rem;
				}
			}

			a:nth-last-child(1) {
				border-right: 0;
			}
		}

		.per_linkB {
			background: #fff;
			padding: 0.3rem 0;

			a {
				display: inline-block;
				width: 2.48rem;
				text-align: center;

				img {
					width: 0.72rem;
				}

				p {
					color: #333333;
					font-size: 0.3rem;
					margin-top: 0.05rem;
				}
			}

			a:nth-last-child(1) {
				border-right: 0;
			}
		}
	}

	.tuichu {
		width: 6.5rem;
		margin-left: 0.5rem;
		height: 0.8rem;
		border: none;
		font-size: 0.32rem;
		border-radius: 0.5rem;
		margin-top: 1rem;
		color: #fff;
		background: #fd7320;
		margin-bottom: 1.5rem;
	}

	.bg {
		background: #fff;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		z-index: -1;
	}
	.mt7{margin-top: 0.7rem;}
</style>
