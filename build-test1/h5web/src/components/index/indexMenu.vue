<template>
	<div class="index_menu" id="IndexMenu">
		<div class="menu_index">
			<router-link to="/shop">
				<img src="../../assets/img/dianpu.png" alt="">
				<p>店铺</p>
			</router-link>
		</div>
		<div class="menu_index">
			<router-link :to="'/warehouse'+'/'+'null'+'/'+'1'">
				<img src="../../assets/icon/shangcheng.png" alt="">
				<p>商城</p>
			</router-link>
		</div>
		<div class="menu_index">
			<a href="https://care60.live800.com/live800/chatClient/chatbox.jsp?companyID=80003104&configID=1383" v-if="kefu">
				<img src="../../assets/img/kefu_icon.png" alt="">
				<p>客服</p>
			</a>
			<a href="javascript:;" v-if="!kefu" @click="kefuLogin">
				<img src="../../assets/img/kefu_icon.png" alt="">
				<p>客服</p>
			</a>
		</div>
		<div class="menu_index">
			<router-link to="/personal/waitEnquiry">
				<img src="../../assets/img/gouwuche.png" alt="">
				<p>待询盘</p>
			</router-link>
		</div>
		<div class="menu_index">
			<router-link to="/personal">
				<img src="../../assets/img/yonghuzhongxin.png" alt="">
				<p>用户中心</p>
			</router-link>
		</div>
		
	</div>
</template>

<script>
export default{
	data:function(){
		return{
			Menu:[
				{icon:'../../assets/icon/IndexMenu3.png'}
			],
			kefu:true,
		}
	},
	created() {
		if(localStorage.openID){
			this.kefu=true;
		}else{
			this.kefu=false;
		}
	},
	methods:{
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
	}
	
}

</script>

<style lang="scss">
	.index_menu{
		text-align: center;
		padding-top: 0.35rem;
		padding-bottom: 0.35rem;
		background: #fff;
		.menu_index{
			display:inline-block;
			width: 20%;
			img{width: 0.89rem;height: 0.89rem}
			
			}
			p{font-size: 0.3rem;margin-top: 0.17rem;color: #333}
	}
</style>
