<template>
	<div class="myCustomized">
		<div class="topBack" >
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>我的定制需求</p>
		</div>
		<div class="addHeight"></div>
		<Customization v-loading="loading" @load="loadingFlag"></Customization>
	</div>
</template>

<script>
	import Customization from '@/components/index/customization.vue'
	export default{
		
		components: {
			Customization,
		},
		data:function(){
			return{
				loading:true,
			}
		},
		methods:{
			loadingFlag(data){
				this.loading = data;
				console.log(this.loading)
			}
		}
	}
	
</script>

<style lang="scss">
	.myCustomized{padding-bottom: 2rem;
		.cus_con{padding-top: 0 !important;}
		.cus_title{display: none !important;}
	}
	
</style>
