<template>
	<div class="findPassword">
		
		<p class="res_title">找回登录密码</p>
		<div class="phone phone_res">
			<img class="fl" src="../assets/img/phone.png" alt="">
			<input class="phone_num" autocomplete="new-password" type="text" v-model="phoneNumber" placeholder="请输入手机号码">
			<input class="ver" type="button" name="" id="" @click="verify2()" value="发送验证码">
			<div class="clear"></div>
		</div>
		<div class="verify">
			<img class="fl" src="../assets/img/verify.png" alt="">
			<input v-model="verify" autocomplete="new-password" class="phone_num" type="text" placeholder="请输入验证码">
			<div class="clear"></div>
		</div>
		<div class="pass">
			<img class="fl" src="../assets/img/pass_icon.png" alt="">
			<input v-model="pass1" autocomplete="new-password" class="phone_num" type="password" placeholder="请输入密码">
			<div class="clear"></div>
		</div>
		<div class="pass">
			<img class="fl" src="../assets/img/pass_icon.png" alt="">
			<input v-model="pass2" autocomplete="new-password" class="phone_num" type="password" placeholder="请重复输入密码">
			<div class="clear"></div>
		</div>
		<!-- <div class="drag" ref="dragDiv">
			<div class="drag_bg"></div>
			<div class="drag_text">{{confirmWords}}</div>
			<div ref="moveDiv" @touchstart="mousedownFn($event)" :class="{'handler_ok_bg':confirmSuccess}" class="handler handler_bg"
			 style="position: absolute;top: 0px;left: 0px;"></div>
		</div> -->
		<input class="next_btn" type="button" @click="findpass()" value="确认并登录">
		<div class="bg"></div>
		<div class="sign_zz"></div>
	</div>

</template>

<script>
	export default {
		data:function(){
			return {
				phoneNumber:'',
				verify:'',
				pass1:'',
				pass2:'',
				buttonval:'发送验证码',
				disabledflag:false,
				openID:'',
			}
		},
		created() {
			localStorage.openID = '';
		},
		methods: {
			// 发送验证码
			verify2(){
				// if(localStorage.openID==''){
				// 	localStorage.openID = this.mobile;
				// }
				this.openID=this.phoneNumber;
				this.$http.post('/wx/reg/sendResetPasswordSMS?js_code='+this.openID+'&mobile='+this.phoneNumber).then((response) => {
					// // console.log(response);
					if(response.success){
						this.$message.success('已发送验证码');
					}else{
						this.$message.error(response.message);
					}
				})
			},
			// 修改密码
			findpass(){
				if(this.pass1===this.pass2){
					
					this.$http.post('/wx/reg/resetPassword?js_code='+this.openID+'&password='+this.pass1+'&verCode='+this.verify).then((response) => {
						// // console.log(response);
						if(response.success){
							this.$message({
							          message: '修改成功',
							          type: 'success',
									  onClose:() =>{
										this.$router.push({
											path: '/personal'
										})  
									  }
							});
							localStorage.openID=this.phoneNumber;
						}else{
							this.$message.error(response.message);
						}
					})
				}else{
					this.$message.error('两次输入密码不一致');
				}
				
			}
		},
		beforeRouteLeave(to,from,next) {
			this.$vnode.parent.componentInstance.cache = {};
			next();
		},
	}
</script>

<style lang="scss">
	.findPassword{padding-bottom: 1.5rem;}
	.phone_res{
		.phone_num{width: 4rem;}
		.ver{width: 2rem;height: 0.88rem;float: right;font-size: 0.28rem;color: #14bab4;text-align: center;cursor: pointer;border: none;background: none;}
	}
	.verify {
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
</style>
