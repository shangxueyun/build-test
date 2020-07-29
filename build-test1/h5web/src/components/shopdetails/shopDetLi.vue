<template>
	<div>
			<div class="shop_zz">
				<!-- <p class="ziyuan_title">优质资源</p> -->
				<div class="shopli_tab">
					<div class="shopli_tab_inx active">新疆棉</div><i></i>
					<div class="shopli_tab_inx">进口棉$</div><i></i>
					<div class="shopli_tab_inx">进口棉￥</div><i></i>
					<div class="shopli_tab_inx">地产棉</div>
					
					<div class="clear"></div>
				</div>
			</div>
			<div class="res_list">
				<ul>
					<li class="res_inx" v-for="item in List">
						<div class="res_top wrap">
							<p class="top_cla">自营</p>
							<p class="top_num">65180181015</p>
							<p class="top_grade">白棉2级</p>
							<p class="top_lei">锯齿收摘棉</p>
							<p class="top_date">2019-06-03</p>
							<div class="clear"></div>
						</div>
						<div class="res_con">
							<div><span class="title">长度</span></br><span class="num">29.4</span></div><i></i>
							<div><span class="title">强力</span></br><span class="num">29.4</span></div><i></i>
							<div><span class="title">马值</span></br><span class="num">29.4</span></div><i></i>
							<div><span class="title">含杂率</span></br><span class="num">29.4</span></div><i></i>
							<div><span class="title">回潮率</span></br><span class="num">29.4</span></div>
							<div class="clear"></div>
						</div>
						<div class="cang"><p>仓库：新疆中心现代物流股份有限公司</p></div>
						<div class="res_bot wrap">
							<p class="weight_one"><span>CF1909+280</span>/吨</p>
							<p class="weight_two">公重<span>42.257</span>吨</p>
							<input class="res_btn" type="button" value="加入购物车">
							<div class="clear"></div>
						</div>
					</li>
					
				</ul>
				<div class="list_bottom"></div>
			</div>
		</div>
</template>

<script>
	export default{
		data:function(){
			return{
				List:['1','2','3','4','5','6']
			}
		}
	}
</script>

<style lang="scss">
	.shop_zz{background: #fff;margin-top: 0.2rem;box-shadow: none;}
	
	.shopli_tab{
		width: 100%;
		// box-shadow: 0 -3px 3px #fdfcfc;
		padding: 0.25rem 0;
		.shopli_tab_inx{font-size: 0.26rem;color: #7c7c7c;display: block;float: left;width: 1.85rem;text-align: center;position: relative;}
		.shopli_tab_inx:after{display: block;content: '';position: absolute;width: 1.1rem;height: 0.04rem;bottom: -0.1rem;background: #14bab4;left: 0.375rem;opacity: 0;}
		.shopli_tab_inx.active{color: #14bab4;}
		.shopli_tab_inx.active:after{opacity: 1;}
		i{display: block;float: left;height: 0.35rem;width: 1px;background: #dcdcdc;};
	}
	.res_list>ul{background: #fff;}
	.res_inx {
		display: block;box-shadow: 0 -3px 3px #f6f4f4;padding: 0.25rem 0;width: 7.1rem;margin: 0 0.2rem;
		.res_top {
			p {
				display: inline-block;
			}
			.top_cla{padding: 0.03rem 0.05rem;background: #14bab4;border-radius: 2px;color: #fff;font-size: 0.22rem;}
			.top_num{color: #14bab4;font-size: 0.28rem;margin-left: 0.2rem;}
			.top_grade{color: #333333;font-size: 0.22rem;margin-left: 0.25rem;}
			.top_lei{color: #333333;font-size: 0.22rem;margin-left: 0.25rem;}
			.top_date{color: #666666;font-size: 0.22rem;float: right;}
		}
		.res_con{
			div{float: left;width: 1.40rem;text-align: center;margin: 0.1rem 0;
				.title{font-size: 0.22rem;color: #666666;}
				.num{font-size: 0.28rem;color: #333333;}
			}
			i{float: left;display: block;width: 1px;height: 0.32rem;background: #ccc;margin-top: 0.2rem;}
		}
		.cang{font-size: 0.22rem;color: #333333;margin: 0.2rem;width: 6.7rem;border-bottom:1px solid #f4f4f4;padding-bottom: 0.15rem;}
		.res_bot{
			.weight_one{color: #666666;font-size: 0.22rem;float: left;
				span{color: #fd7320;font-size: 0.28rem;font-weight: bold;}
			}
			.weight_two{color: #666666;font-size: 0.22rem;float: left;
				span{color: #333333;font-size: 0.28rem;font-weight: bold;}
			}
			.res_btn{float: right;width: 1.84rem;height: 0.58rem;background: #fd7320;font-size: 0.24rem;color: #fff;border: 0;border-radius: 1rem;margin-top: -0.1rem;}
		}
	}
	.list_bottom{height: 1.5rem;}
</style>
