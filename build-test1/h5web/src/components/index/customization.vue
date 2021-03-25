<template>
	<div class="cus_con">
		<p class="cus_title">需求定制</p>
		<template v-if="permissionMenu">
			<router-link to='/personal/customized'>
				<img class="cus_pic" src="../../assets/img/xuqiudingzhiBanner.png" alt="">
			</router-link>
		</template>
		<template v-else>
			<router-link to='/login'>
				<img class="cus_pic" src="../../assets/img/xuqiudingzhiBanner.png" alt="">
			</router-link>
		</template>
		<div class="cus_li">
			<ul>
				<li class="cus_inx" v-for="(item,index) in customization" @click="gowarehouse(item.searchID)" :key="index">
					<div class="cus_inx_t">
						<p class="cus_name fl">{{item.searchName}}</p>
						<p class="cus_lei fl">采摘类型
							<span v-if="item.listingIndex">点价</span>
							<span v-if="item.d28">双28</span>
							<span v-if="item.d29">双29</span>
							<i v-if="item.cottonSource">
								<template v-for="type in item.cottonSource.split(',')">
									<span v-if="type==='0'&&item.cottonSource" :key="type">新疆棉</span>
									<span v-if="type==='1'&&item.cottonSource" :key="type">地产棉</span>
									<span v-if="type==='2'&&item.cottonSource" :key="type">进口棉</span>
									<span v-if="type==='01'&&item.cottonSource" :key="type">新疆地方</span>
									<span v-if="type==='02'&&item.cottonSource" :key="type">新疆兵团</span>
								</template>
							</i>
							<i v-if="!item.cottonSource">
								<span>-</span>
							</i>
						</p>
						<p class="cus_add fl">存放地&nbsp;<span v-if="item.depositary">{{item.depositary}}</span><span v-if="item.depositary">{{item.depositary}}</span></p>
						<!-- <p class="fl" v-if="item.pubPrice" style="color: #fd7320;">&nbsp&nbsp最低&nbsp{{item.pubPrice}}</p> -->
						<div class="clear"></div>
					</div>
					<div class="cus_inx_c">
						<p class="fl cus_p" v-if="item.primaryColor">颜色级
							<template v-for="(type,index) in item.primaryColor.split(',')">
								<span v-if="type==='11'&&index==0&&item.primaryColor" :key="type">白棉1级</span>
								<span v-if="type==='21'&&index==0&&item.primaryColor" :key="type">白棉2级</span>
								<span v-if="type==='31'&&index==0&&item.primaryColor" :key="type">白棉3级</span>
								<span v-if="type==='41'&&index==0&&item.primaryColor" :key="type">白棉4级</span>
								<span v-if="type==='51'&&index==0&&item.primaryColor" :key="type">白棉5级</span>
								<span v-if="type==='12'&&index==0&&item.primaryColor" :key="type">淡点污棉1级</span>
								<span v-if="type==='22'&&index==0&&item.primaryColor" :key="type">淡点污棉2级</span>
								<span v-if="type==='32'&&index==0&&item.primaryColor" :key="type">淡点污棉3级</span>
								<span v-if="type==='13'&&index==0&&item.primaryColor" :key="type">淡黄染棉1级</span>
								<span v-if="type==='23'&&index==0&&item.primaryColor" :key="type">淡黄染棉2级</span>
								<span v-if="type==='33'&&index==0&&item.primaryColor" :key="type">淡黄染棉3级</span>
								<span v-if="type==='14'&&index==0&&item.primaryColor" :key="type">黄染棉1级</span>
								<span v-if="type==='24'&&index==0&&item.primaryColor" :key="type">黄染棉2级</span>
								<span v-if="type==='0'&&index==0&&item.primaryColor" :key="type">无</span>
							</template>
						</p>
						<p class="fl cus_p" v-if="!item.primaryColor">颜色级
							<span>-</span>
						</p>
						<p class="fl cus_p">长度<span>{{item.lengthMin}}-{{item.lengthMax}}</span></p>
						<p class="fl cus_p">强力<span>{{item.strongMin}}-{{item.strongMax}}</span></p>
						<p class="fl cus_p">马值<span>{{item.mikeMin}}-{{item.mikeMax}}</span></p>
						<p class="fl cus_p">回溯<span>{{item.moistureMin}}-{{item.moistureMax}}</span></p>
						<p class="fl cus_p">含杂<span>{{item.impurityMin}}-{{item.impurityMax}}</span></p>
						<p class="fl cus_p">整齐度<span>{{item.neatMin}}-{{item.neatMax}}</span></p>
						<div class="clear"></div>
					</div>
					<div class="cus_inx_b">
						<!-- <inpu type="button" value="资源"> -->
						
						<p class="edit fr" @click.stop="editTo(item.searchID)">编辑</p>
						<p class="delete fr" @click.stop="removeWarehouse(item.searchID,index)">删除</p>
						<p class="renNum fr">匹配到{{item.count}}批</p>
						<p class="goziyuan fl"><span class="tlt">最低价格:</span>{{item.minPrice}}元/吨<span v-if="!item.minPrice">-</span></p>
						<div class="clear"></div>
					</div>
					<div class=""></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
	export default{
		data:function(){
			return{
				customization:'',
				permissionMenu: null,
				userInfo: ''
			}
		},
		created() {
			window.scrollTo(0, 0);
			this.$http.post('/wx/index_h5/getSearch').then((response) => {
				// console.log(response);
				this.customization=response.entity;
				this.$emit('load',false)
				
			});
			this.userInfo = this.userInfoM
			if (JSON.stringify(this.userInfo) == '{}')
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo')) ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
			if (!this.userInfo.user) {
				this.permissionMenu = false
			} else {
				this.permissionMenu = true
			}
		},
		computed: mapState({
			// 全局用户信息
			userInfoM: state => state.userInfo.userInfo
		}),
		methods:{
			editTo(searchId_){
				this.$router.push({
					name: 'edit',
					params: {
						searchId: searchId_,
					}
				});
			},
			gowarehouse(searchId_){
				this.$router.push({
					name: 'warehouse',
					params: {
						searchId: searchId_,
						listingType:'1',
					}
				});
			},
			removeWarehouse(searchId_,index){
				this.$http.post('/wx//searchhistory/del?searchID='+searchId_).then((response) => {
					this.customization.splice(index,1)
						this.$message({
						    message: '删除成功',
						    type: 'success',
						});
				});
			},
			// hint(){
			// 	this.$message({
			// 	    message: '请前往PC端棉联商城进行删除',
			// 	    type: 'error',
			// 	});
			// }
		}
		
	}
</script>

<style lang="scss" scoped="scoped">
	.cus_con{padding-top: 0.2rem;background: #fff;margin-top: 0.2rem;padding-bottom: 0.01rem;
		.cus_title {
			background: #fff;
			font-size: 0.32rem;
			display: block;
			border-left: 3px solid #fe8a51;
			padding-left: 0.2rem;
			margin-bottom: 0.2rem;
			margin-left: 0.2rem;
		}
		.cus_pic{width: 100%;}
	}
	.cus_li{background: #f6f6f6;
		.cus_inx{border-bottom: 1px solid #cccccc;padding: 0.2rem 0.2rem;background: #fff;
			.cus_inx_t{
				p{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
				.cus_name{color: #14bab4;font-size: 0.28rem;max-width: 2.3rem;}
				.cus_lei{color: #999999;font-size: 0.28rem;margin-left: 0.2rem;max-width: 2.2rem;}
				.cus_add{color: #999999;font-size: 0.28rem;margin-left: 0.2rem;max-width: 2.2rem;}
			}
			.cus_inx_c{margin-top: 0.1rem;}
			.cus_inx_b{margin-top: 0.1rem;
				fr{display: block;padding: 0.01rem 0.06rem;border: none;}
				.edit{border: 1px solid #FD7320;color: #FD7320;padding: 0.02rem 0.07rem;}
				.delete{border: 1px solid #C7C7C7;color: #999;padding: 0.02rem 0.07rem;margin-right: 0.2rem;}
				.renNum{margin-right: 0.2rem;padding: 0.02rem 0.07rem;background: #FE8A51;border: 1px solid #FE8A51;color: #fff;}
				input.remove{margin-left: 0.2rem;margin-top: 0.05rem;width: 0.5rem;background:url(../../assets/img/shanchu.png) no-repeat center center;background-size: 0.28rem;border: none;color: #999999;}
				p.goziyuan{color: #fd7320;font-size: .28rem;
					.tlt{color: #999;}
				}
			}
			.cus_p{margin-right: 0.15rem;font-size: 0.28rem;color: #999999;
				span{margin-left: 0.1rem;color: #333;}
			}
		}
	}
	
</style>
