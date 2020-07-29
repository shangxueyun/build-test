<template>
	<div class="loginpass">
		
		<p class="res_title">欢迎登录棉联</p>
		<div class="sign_tab">
			<router-link class='fl' to='/login'>验证码登录</router-link>
			<router-link class='active fl' to='/loginpass'>密码登录</router-link>
			<div class="clear"></div>
		</div>
		<div class="phone">
			<img class="fl" src="../assets/img/phone.png" alt="">
			<input class="phone_num" type="text" placeholder="请输入手机号码" v-model="mobile" maxlength="11" oninput="value=value.replace(/[^\d]/g,'')" autofocus max="11">
			<div class="clear"></div>
		</div>
		<div class="pass">
			<img class="fl" src="../assets/img/pass_icon.png" alt="">
			<input class="phone_num" autocomplete="new-password" id="phon1" type="password" placeholder="请输入密码" v-model="password">
			<div class="clear"></div>
		</div>
		<!-- <div class="drag" ref="dragDiv">
			<div class="drag_bg"></div>
			<div class="drag_text">{{confirmWords}}</div>
			<div ref="moveDiv" @touchstart="mousedownFn($event)" :class="{'handler_ok_bg':confirmSuccess}" class="handler handler_bg"
			 style="position: absolute;top: 0px;left: 0px;"></div>
		</div> -->
		<input class="next_btn" @click="login()" type="button" value="登录">
		<div class="wb_link">
			<router-link to="/register">前往注册</router-link>
			<router-link to="/findPassword">找回密码</router-link>
		</div>
		<div class="bg"></div>
		<div class="sign_zz"></div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				mobile:'',
				password:'',
				openID:''	
			}
		},
		// created() {
		// 	sessionStorage.openID='';
		// 	if(sessionStorage.openID){
		// 		this.openID=sessionStorage.openID
		// 	}
		// },
		created() {
			// localStorage.openID = '';
			
		},
		methods: {
			//登录
			login(){
				// if(sessionStorage.openID){
				// 		this.openID=sessionStorage.openID
				// 	} else{
					
				// };
				if(localStorage.openID==''||!localStorage.openID){
					localStorage.openID = this.mobile;
				}
				// this.openID=this.mobile
				
				this.$http.post('/wx/reg_h5/passwordLogin?openID='+localStorage.openID+'&gzhOpenID='+localStorage.gzhOpenID+'&mobile='+this.mobile+'&password='+this.password).then((response) => {
					// alert(response)
					if(response.success){
						// localStorage.openID = this.mobile;
						this.$message({
						          message: '登录成功',
						          type: 'success',
								  onClose:() =>{
									this.$router.push({
										path: '/personal'
									})  
								  }
						});
						// localStorage.openID = this.mobile;
					}else{
						this.$message.error(response.message);
					}
					
					
				})
			}
		},
		beforeRouteLeave(to,from,next) {
			if(to.path!='/personal'){
				this.$vnode.parent.componentInstance.cache = {};
			}
			
			next();
		},
	}
</script>

<style lang="scss">
	.loginpass{padding-bottom: 1.5rem;}
	.sign_tab{margin-top: 0.65rem;
		a{width: 3rem;height: 0.72rem;display: block;background: #f0f1f1;color: #172f47;font-size: 0.28rem;text-align: center;line-height: 0.72rem;margin-left: 0.5rem;}
		a.active{background: #14bab4;color: #fff;}
	}
	.res_title {
		font-size: 0.5rem;
		color: #172f47;
		padding-left: 0.45rem;
		margin-top: 1.3rem;
	}

	.phone {
		width: 6.6rem;
		margin-left: 0.45rem;
		margin-top: 0.45rem;
		border-bottom: 1px solid #000;

		img {
			width: 0.26rem;
			height: 0.37rem;
			margin-top: 0.3rem;
		}

		.phone_num {
			border: none;
			color: #172f47;
			font-size: 0.28rem;
			height: 0.88rem;
			padding-left: 0.3rem;
			width: 5.5rem;
		}
	}
	.pass {
		width: 6.6rem;
		margin-left: 0.45rem;
		margin-top: 0.45rem;
		border-bottom: 1px solid #000;
	
		img {
			width: 0.32rem;
			height: 0.35rem;
			margin-top: 0.3rem;
		}
	
		.phone_num {
			border: none;
			color: #172f47;
			font-size: 0.28rem;
			height: 0.88rem;
			padding-left: 0.3rem;
			width: 5.5rem;
		}
	}

	.next_btn {
		width: 6.6rem;
		height: 0.8rem;
		background: #14bab4;
		color: #fff;
		font-size: 0.28rem;
		border: none;
		border-radius: 0.5rem;
		margin-left: 0.45rem;
		margin-top: 0.9rem;
	}

	.wb_link {
		text-align: center;
		margin-top: 0.3rem;

		p {
			color: #8797a9;
			font-size: 0.22rem;
		}

		a {
			color: #14bab4;margin: 0 0.5rem;
		}
	}

	.drag {
		position: relative;
		background-color: #e8e8e8;
		width: 87.5%;
		margin-left: 0.45rem;
		margin-top: 0.4rem;
		height: 0.9rem;
		line-height: 0.9rem;
		text-align: center;
		border-radius: 0.5rem;
	}

	.handler {
		width: 17.333%;
		height: 0.88rem;
		cursor: move;
		border-radius: 0.5rem;
	}

	.handler_bg {
		background: url(../assets/img/silde_btn.png) no-repeat center;
		background-size: 100% 100%;
	}

	.handler_ok_bg {
		background: url(../assets/img/silde_btn.png) no-repeat center;
		background-size: 100% 100%;
	}

	.drag_bg {
		background-color: #14bab4;
		height: 0.88rem;
		width: 0px;
		border-radius: 0.5rem;
		padding-left: 1rem;
	}

	.drag_text {
		position: absolute;
		font-size: 0.26rem;
		top: 0px;
		width: 100%;
		text-align: center;
		-moz-user-select: none;
		-webkit-user-select: none;
		user-select: none;
		-o-user-select: none;
		-ms-user-select: none;
		border-radius: 0.5rem;
	}
</style>
