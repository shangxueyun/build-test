<template>
	<div class="register">
		<p class="res_title">注册</p>
		<div class="pass qiyename">
			<img class="fl" src="../assets/img/qiyeIcon.png" alt="">
			<input class="phone_num" type="text" autocomplete="new-password" placeholder="请输入企业名称" v-model="inputTxt" @input="oncompany">
			<div class="company_list" v-show="flag">
				<ul>
					<li v-for="item in companyList" @click="select(item.memberID,item.corpName)">{{item.corpName}}</li>
				</ul>
			</div>
			<div class="clear"></div>
		</div>
		<div class="pass qiyeType">
			<img class="fl" src="../assets/img/qiyeTypeIcon.png" alt="">
			<select name="companyType" id="companyType" v-model="companyTypeVal">
				<option value="">请选择企业类型</option>
				<option v-for="(item,index) in companyType" :value="item.value">{{item.name}}</option>
			</select>
			<div class="company_list" v-show="flag">
				<ul>
					<li v-for="item in companyList" @click="select(item.memberID,item.corpName)">{{item.corpName}}</li>
				</ul>
			</div>
			<div class="clear"></div>
		</div>
		<div class="spinType pass" v-if="companyTypeVal=='1'" style="line-height: 1rem;margin-top: 0.2rem;">
			<span v-for="(item,index) in spinType">
				<input type="checkbox" :id="item.value" :value="item.value" v-model="spinTypeVal ">
				<label :for="item.value">{{item.name}}</label>
			</span>
		</div>
		<div class="name pass">
			<img class="fl" src="../assets/img/phone.png" alt="">
			<input class="phone_num" type="text" v-model="peoplename" placeholder="请输入联系人姓名">
			<div class="clear"></div>
		</div>
		<div class="phone phone_res">
			<img class="fl" src="../assets/img/phone.png" alt="">
			<input class="phone_num" type="text" autocomplete="new-password" placeholder="请输入手机号码" v-model="phoneNumber" maxlength="11" oninput="value=value.replace(/[^\d]/g,'')" autofocus max="11">
			<input class="ver" type="button" name="" id="" @click="verify" :value="buttonval">
			<div class="clear"></div>
		</div>
		
		<div class="verify">
			<img class="fl" src="../assets/img/verify.png" alt="">
			<input class="phone_num" type="text" v-model="vcode" autocomplete="new-password" placeholder="请输入验证码" maxlength="6" oninput="value=value.replace(/[^\d]/g,'')" max="6">
			<div class="clear"></div>
		</div>
		<div class="pass">
			<img class="fl" src="../assets/img/pass_icon.png" alt="">
			<input class="phone_num" type="password" autocomplete="new-password" v-model="password" placeholder="请输入密码">
			<div class="clear"></div>
		</div>
		
		<!-- <p class="res_p1">请前往PC端商城进行注册</p>
		<p class="res_p2">www.unioncotton.com</p> -->
		<!-- <div class="wb_link">
			<router-link to="/login">前往登录</router-link>
		</div> -->
		<!-- <div class="drag" ref="dragDiv">
			<div class="drag_bg"></div>
			<div class="drag_text">{{confirmWords}}</div>
			<div ref="moveDiv" @touchstart="mousedownFn($event)" :class="{'handler_ok_bg':confirmSuccess}" class="handler handler_bg"
			 style="position: absolute;top: 0px;left: 0px;"></div>
		</div> -->
		<input class="next_btn" type="button" value="注册" @click='register' style="margin-bottom: 1.5rem">
		<div class="bg"></div>
		<div class="sign_zz"></div>
	</div>
	

</template>

<script>
	export default {
		data:function(){
			return {
				buttonval:'发送验证码',
				phoneNumber:'',
				vcode:'',
				password:'',
				openID:'',
				inputTxt:'',
				memberID:'',
				companyList:'',
				flag:false,
				companyType:'',
				spinType:'',
				companyTypeVal:'',
				spinTypeVal:[],
				peoplename:'',
			}
		},
		created() {
			this.$http.get('/wx/bases/get_param?id=MEMBER_TYPE&group=MEMBER').then((response) => {
				var res =JSON.parse(response.data.paramValue);
				this.companyType = res;
				this.spinType =res[0].child;
				// if(response.success){
				// }else{
				// }
			})
		},
		mounted() {
			var _this = this;
			document.body.onclick = function(){
				_this.flag=false;
			}
		},
		methods: {
			oncompany(){
				if(this.inputTxt!=''){
					this.flag=true;
					this.memberID='';
					this.$http.post('/wx/bases/list/member?corpName='+this.inputTxt).then((response) => {
						// console.log(response);
						this.companyList=response.entity
					})
				}else{
					this.memberID='';
					this.flag=false;
				}
				
			},
			select(memberID,corpName){
				this.inputTxt=corpName;
				this.memberID=memberID;
				this.flag=false;
			},
			// 发送验证码
			verify(){
				if(localStorage.openID==''){
					localStorage.openID = this.phoneNumber;
				}
				this.$http.post('/wx/reg_h5/sendMessage?openID='+localStorage.openID+'&mobile='+this.phoneNumber).then((response) => {
					// // console.log(response);
					if(response.success){
						this.$message.success('已发送验证码');
					}else{
						this.$message.error(response.message);
					}
				})
			},
			// 注册
			register(){
				if(localStorage.openID==''||!localStorage.openID){
					localStorage.openID = this.phoneNumber;
				}
				let obj = {
					unionId: localStorage.openID,
					password: this.password,
					verCode: this.vcode,
					name: this.peoplename,
					mobile: this.phoneNumber,
					memberName: this.inputTxt,
					memberType: this.companyTypeVal,
					memberTypeChild: this.spinTypeVal
				}
				let form = new FormData()
				for (let i in obj) {
					form.append(i, obj[i])
				}
				if(this.companyTypeVal=='1'){
					this.$HttpRequest({
						url: '/wx/reg_h5/bindAccount',
						method: 'post',
						headers: {
							'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
						},
						data: form
					}).then(res => {
						if (res.code != 1000) {
							this.$message.error(res.message);
						} else {
							this.$message({
									  message: '注册成功,请等待审核',
									  type: 'success',
									  onClose:() =>{
										this.$router.push({
										path: '/loginpass'
									})  
								}	
							});
						}
					})
				} else {
					this.$HttpRequest({
						url: '/wx/reg_h5/bindAccount',
						method: 'post',
						headers: {
							'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
						},
						data: form
					}).then(res => {
						if (res.code != 1000) {
							this.$message.error(res.message);
						} else {
							this.$message({
									  message: '注册成功,请等待审核',
									  type: 'success',
									  onClose:() =>{
										this.$router.push({
										path: '/loginpass'
									})  
								}	
							});
						}
					})
				}
				
			},
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
	.register{margin-bottom: 1.5rem;}
	#companyType{
		margin-left: 0.2rem;
		border: none;
		width: 6rem;
		height: 0.65rem;
	}
	.qiyeType{
		img{margin-top: 0.15rem !important;}
	}
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
	.qiyename{position: relative;
		p{color: #333;font-size: 0.28rem;line-height: 0.88rem;width: 1.3rem;}
		.phone_num{width: 4rem !important;}
		.company_list{position: absolute;top: 0.9rem;max-height: 6rem;width: 6.6rem;overflow-y: scroll;background: #f3f3f3;z-index: 999;left: 0rem;
			li{padding-left: 0.5rem;line-height: 0.8rem;border-bottom: 1px solid #ccc;}
		}
	}
	.res_p1{text-align: center;color: #333;font-size: 0.3rem;margin-top: 1rem;}
	.res_p2{text-align: center;color: #14bab4;font-size: 0.26rem;}
</style>
