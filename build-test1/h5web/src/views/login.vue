<template>
	<div class="login">
		<p class="res_title">欢迎登录棉联</p>
		<div class="sign_tab">
			<router-link class='active fl' to='/login'>验证码登录</router-link>
			<router-link class='fl' to='/loginpass'>密码登录</router-link>
			<div class="clear"></div>
		</div>
		<div class="phone">
			<img class="fl" src="../assets/img/phone.png" alt="">
			<input class="phone_num" type="text" id="phone" placeholder="请输入手机号码" v-model="mobile" maxlength="11" oninput="value=value.replace(/[^\d]/g,'')"
			 autofocus max="11" @input="isPhone">
			<div class="clear"></div>
		</div>
		<div class="login_inf">
			<input type="button" value="发送验证码" @click="verify()">
		</div>
		<!-- <div class="drag" ref="dragDiv">
			<div class="drag_bg"></div>
			<div class="drag_text">{{confirmWords}}</div>
			<div ref="moveDiv" @touchend="verify" @touchstart="mousedownFn($event)" :class="{'handler_ok_bg':confirmSuccess}" class="handler handler_bg"
			 style="position: absolute;top: 0px;left: 0px;"></div>
			 <div class="darg_zz" @touchstart="isPhoneboth" v-if="flag"></div>
		</div> -->
		<!-- <input class="next_btn" @click="pathTo" type="button" value="下一步"> -->
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
				beginClientX: 0,
				/*距离屏幕左端距离*/
				mouseMoveStata: false,
				/*触发拖动状态  判断*/
				maxwidth: '',
				/*拖动最大宽度，依据滑块宽度算出来的*/
				confirmWords: '拖动滑块获取验证码',
				/*滑块文字*/
				confirmSuccess: false,
				/*,验证成功判断*/

				mobile: '',
				openID: '',
				success: false,
				flag: true,

			}
		},
		created() {
			// localStorage.openID = '';
		},
		methods: {
			// 判断电话号码是否完整
			isPhone() {
				let phone = document.getElementById('phone').value;
				if (phone.length == 11) {
					this.flag = false;
				} else {
					this.flag = true;
				}
			},
			isPhoneboth() {
				this.$message({
					message: '请输入完整手机号',
					type: 'error',
				});
			},
			//发送验证码
			verify() {
				this.openID = this.mobile;
				if (localStorage.openID==''||!localStorage.openID) {
					localStorage.openID = this.mobile;
				}
				this.$http.post('/wx/reg_h5/sendLoginSMS?openID=' + localStorage.openID + '&mobile=' + this.mobile).then((response) => {
					// console.log(response);
					if (response.success) {
						// this.success=response.success;
						// this.confirmWords = '验证通过';
						// this.$message({
						//           message: '验证码已发送',
						//           type: 'success',
						// 		  onClose:() =>{
						// 		  	 
						// 		  }
						// });
						this.$router.push({
							path: '/verification/' + this.mobile
						})
					} else {
						this.success = response.success;
						this.$message({
							message: response.message,
							type: 'error',

						});
						this.confirmSuccess = false;
						this.confirmWords = '验证未通过,重新验证';
						// document.getElementsByClassName('drag_text')[0].style.color = '#000'
						// this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
						// document.getElementsByTagName('html')[0].addEventListener('touchmove', this.mouseMoveFn);
						// document.getElementsByTagName('html')[0].addEventListener('touchend', this.moseUpFn);
						// document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
						// document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';

					}

				})

			},

			// pathTo: function() {
			// 	
			// },
			mousedownFn: function(e) {
				if (!this.confirmSuccess) {
					e.preventDefault && e.preventDefault(); //阻止文字选中等 浏览器默认事件
					this.mouseMoveStata = true;
					this.beginClientX = e.changedTouches[0].clientX;
				}
			}, //mousedoen 事件
			successFunction() {
				this.confirmSuccess = true
				this.confirmWords = '正在验证';

				if (window.addEventListener) {
					document.getElementsByTagName('html')[0].removeEventListener('touchmove', this.mouseMoveFn);
					document.getElementsByTagName('html')[0].removeEventListener('touchend', this.moseUpFn);
				} else {
					document.getElementsByTagName('html')[0].removeEventListener('touchend', () => {});
				}
				document.getElementsByClassName('drag_text')[0].style.color = '#fff'
				document.getElementsByClassName('handler')[0].style.left = this.maxwidth + 'px';
				document.getElementsByClassName('drag_bg')[0].style.width = this.maxwidth + 'px';
			}, //验证成功函数
			mouseMoveFn(e) {
				if (this.mouseMoveStata) {
					let width = e.changedTouches[0].clientX - this.beginClientX;
					if (width > 0 && width <= this.maxwidth) {
						document.getElementsByClassName('handler')[0].style.left = width + 'px';
						document.getElementsByClassName('drag_bg')[0].style.width = width + 'px';
					} else if (width > this.maxwidth) {
						this.successFunction();
					}
				}

			}, //mousemove事件
			moseUpFn(e) {
				this.mouseMoveStata = false;
				var width = e.changedTouches[0].clientX - this.beginClientX;
				if (width < this.maxwidth) {
					document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
					document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
				}

			} //mouseup事件
		},
		beforeRouteLeave(to,from,next) {
			if(to.path=='/personal'){
				this.$vnode.parent.componentInstance.cache = {};
			}
			next();
		},
		// mounted() {
		// 	this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
		// 	document.getElementsByTagName('html')[0].addEventListener('touchmove', this.mouseMoveFn);
		// 	document.getElementsByTagName('html')[0].addEventListener('touchend', this.moseUpFn);
		// }
	}
</script>

<style lang="scss">
	.login {
		padding-bottom: 1.5rem;
	}

	.sign_zz {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1.2rem;
		background: #fff;
		z-index: 9999;
	}


	.sign_tab {
		margin-top: 0.65rem;

		a {
			width: 3rem;
			height: 0.72rem;
			display: block;
			background: #f0f1f1;
			color: #172f47;
			font-size: 0.28rem;
			text-align: center;
			line-height: 0.72rem;
			margin-left: 0.5rem;
		}

		a.active {
			background: #14bab4;
			color: #fff;
		}
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
			width: 6rem;
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
			color: #14bab4;
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

	.darg_zz {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 999999;
		height: 100%;
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

	.login_inf {
		input {
			width: 6.7rem;
			margin-left: 0.4rem;
			border: none;
			margin-top: 0.5rem;
			padding: 0.2rem 0rem;
			border-radius: 0.5rem;
			background: #14bab4;
			color: #fff;
		}
	}
</style>
