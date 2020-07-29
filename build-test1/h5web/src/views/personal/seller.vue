<template>
	<div class="seller">
		<div class="topBack" style="left: 0;">
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>卖方信息</p>
		</div>
		<div class="addHeight"></div>
		<ul>
			<li>
				<p class="fl seller_bt">姓名</p>
				<p class="fr">{{orddet.sellUserName}}</p>
				<div class="clear"></div>
			</li>
			<li>
				<p class="fl seller_bt">手机号</p>
				<p class="fr">{{orddet.sellUserMobile}}</p>
				<div class="clear"></div>
			</li>
			<li>
				<p class="fl seller_bt">单位名称</p>
				<p class="fr company">{{orddet.sellMemberName}}</p>
				<div class="clear"></div>
			</li>
			<li>
				<p class="fl seller_bt">纳税人号</p>
				<p class="fr">{{orddet.sellMemberTaxCert}}</p>
				<div class="clear"></div>
			</li>
			<li>
				<p class="fl seller_bt">开户行</p>
				<p class="fr">{{orddet.sellMemberBank}}</p>
				<div class="clear"></div>
			</li>
			<li>
				<p class="fl seller_bt">银行账号</p>
				<p class="fr">{{orddet.sellMemberBankAccount}}</p>
				<div class="clear"></div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data:function(){
			return{
				orddet:'',
				loading:true,
			}
		},
		//获取商家详情
		beforeRouteEnter (to, from, next) {
		//beforeRouteEnter中this无效，所以能用vm
		        next(vm => {
		          var creator_ = to.params.id;//好的抓到id了
				  
		          vm.axios.post('/wx/trade/getOrder?orderID='+creator_).then((response)=>{
		            // vm.songlikelist = res.data.data;
					// console.log(response)
					vm.orddet=response.entity;
					vm.loading=false;
		          });
		        })
		      },
	}
</script>

<style lang="scss">
	.seller{background: #fff;width: 6.9rem;padding: 0.2rem 0.3rem 0.2rem 0.3rem;
		p{padding: 0.2rem;line-height: 0.3rem;}
		p.seller_bt{color: #999999;font-size: 0.24rem;}
		p.fr{color: #333;font-size: 0.28rem;max-width: 4rem;text-align: right;}
		p.company{font-size: 0.26rem;color: #090909;}
	}
</style>
