<template>
	<div class="shulu">
		<p class="shuru_title">输入验证码</p>
		<p class="loding_ver">短信验证码已经发送至<span>{{verifNum}}</span></p>
		<input class="ver_num" type="text" maxlength="6" oninput="value=value.replace(/[^\d]/g,'')" autofocus max="6" v-model="verCode">
		<div class="ver_con">
			<span></span><span></span><span></span><span></span><span></span><span></span>
			<div class="clear"></div>
		</div>

		<p class="daoshu" @click="verify">{{count}}{{countTxt}}</p>
		<input class="reg" type="button" value="登录" @click="login">
		<div class="shuru_zz"></div>
		<div class="bg"></div>
		<div class="sign_zz"></div>
	</div>
</template>

<script>
	export default {
		data:function(){
			return{
				verifNum:'',
				openID:'',
				verCode:'',
				confirmSuccess:true,
				count:60,
				countTxt:'s后可重新发送',
				flag:false,
			}
			
		},
		
		methods:{
			// 验证码确认
			verify(){
				// if(sessionStorage.openID){
				// 	this.openID=sessionStorage.openID
				// }else{
				// 	this.openID=this.mobile
				// 	sessionStorage.openID=this.mobile
				// };		
				if(this.flag){
					this.count=60;
					this.flag=false;
					this.countTxt='s后可重新发送';
					setInterval(function(){
						if(this.count>0){
							 this.count--;
						}else{
							this.count="点击重新发送";
							this.flag=true;
							this.countTxt='';
						}
					},1000);
					if(localStorage.openID==''||!localStorage.openID){
						localStorage.openID = this.verifNum;
					}
					if(this.confirmSuccess){
						this.$http.post('/wx/reg_h5/sendLoginSMS?openID='+localStorage.openID+'&mobile='+this.verifNum).then((response) => {
							// console.log(response);
							if(response.success){
								this.$message({
								          message: '验证码已发送',
								          type: 'success',
								});
							}else{
								this.$message({
								          message: response.message,
								          type: 'error',
										  
								});
							}
							
							
						})
					}
				}
				
				
			},
			// 登录
			login(){
				if(!localStorage.openID){
					localStorage.openID = this.verifNum;
				}
				this.$http.post('/wx/reg_h5/verCodeLogin?openID='+localStorage.openID+'&gzhOpenID='+localStorage.gzhOpenID+'&mobile='+this.verifNum+'&verCode='+this.verCode).then((response) => {
					// console.log(response);
					// alert(localStorage.openID);
					if(response.success){
						// localStorage.openID = this.openID;
						this.$message({
						          message: '登录成功',
						          type: 'success',
								  onClose:() =>{
									this.$store.dispatch('USER_INFO_GET')
									this.$store.dispatch('OPREATING_INFO_GET')
									this.$router.push({
										path: '/personal'
									})  
								  }
						});
						// 
					}else{
						this.$message.error(response.message);
					}
				})
			}
			
		},
		// 接收上页手机号
		beforeRouteEnter (to, from, next) {
		//beforeRouteEnter中this无效，所以能用vm
		        next(vm => {
		          var verId = to.params.id;//好的抓到id了
				  vm.verifNum=verId;
				  vm.openID=verId;
				 var daoji = setInterval(function(){
					 if(vm.count>0){
						  vm.count--;
					 }else{
						 vm.count="点击重新发送";
						 vm.countTxt='';
						 vm.flag=true;
					 }
				 },1000)
		        })
		  },
		  beforeRouteLeave(to,from,next) {
		  	this.$vnode.parent.componentInstance.cache = {};
		  	next();
		  },
		
	}
</script>

<style lang="scss">
	.shulu {padding-bottom: 2.5rem;
		.shuru_title {
			font-size: 0.5rem;
			color: #172f47;
			padding-left: 0.45rem;
			margin-top: 1.3rem;
		}

		.loding_ver {
			color: #172f47;
			font-size: 0.22rem;
			padding-left: 0.45rem;
		}

		.ver_num {
			width: 6.8rem;
			background: none;
			margin-left: 0.7rem;
			display: block;
			margin-top: 1.1rem;
			letter-spacing: 0.82rem;
			border: none;
			overflow: hidden;
			color: #172f47;
			font-size: 0.5rem;
		}

		.ver_con {
			width: 6.6rem;
			margin-left: 0.45rem;
			;

			span {
				width: 0.88rem;
				height: 0rem;
				margin-right: 0.22rem;
				border-bottom: 1px solid #263d52;
				display: block;
				float: left;
			}
		}

		.daoshu {
			color: #8797a9;
			font-size: 0.22rem;
			margin-top: 0.3rem;
			margin-left: 0.45rem;
		}

		.reg {
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

		.shuru_zz {
			width: 0.5rem;
			height: 2rem;
			background: #fff;
			position: fixed;
			top: 3.2rem;
			right: 0;
		}
	}
</style>
