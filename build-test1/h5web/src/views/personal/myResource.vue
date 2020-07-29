<template>
	<div v-loading="loading">
		<div class="topBack" >
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>我的国产棉</p>
		</div>
		<div class="addHeight"></div>
		<div class="order_tab myres_tab" style="top: 0.75rem;">
			<span :class="{'active':status==0}" @click="switchOrder(0)">全部</span>
			<span :class="{'active':status==3}" @click="switchOrder(3)">待售</span>
			<span :class="{'active':status==1}" @click="switchOrder(1)">在售</span>
			<span :class="{'active':status==4}" @click="switchOrder(4)">洽谈中</span>
			<span :class="{'active':status==2}" @click="switchOrder(2)">已售</span>
			<span :class="{'active':status==8}" @click="switchOrder(8)">过期</span>
			<div class="clear"></div>
		</div>
		<div class="myres_top" style="top: 1.75rem;">
			<div class="fl myres_all">
				<input id='quanxuan2' class="radio_type quanxuan" type="checkbox" name="type" v-model='checked' @click='checkedAll'/>
				<label for="quanxuan2">全选</label>
			</div>
			<div class="fr myres_ope">
				<input type="button" class="shanchu fr" value="删除" @click="ChangeState(9)">
				<input type="button" class="xiajia fr" value="下架" @click="ChangeState(3)">
				<input type="button" class="shangjia fr" value="上架" @click="ChangeState(0)">
				<input type="button" class="shouchu fr" value="售出" @click="ChangeState(1)">
				<input type="button" class="qiatan fr" value="洽谈" @click="ChangeState(4)">
			</div>
			<div class="clear"></div>
		</div>
		<div class="resourceList">
			<ul>
				<li class="myres_inx" v-for="item in resourceList">
					<div class="myres_l">
						<input  class="radio_type radio_type_chick" type="checkbox" name="type" v-model='checkList' :value="item.listingID"/>
					</div>
					<div class="myres_r" @click="godetails(item.batchID,item.listingID,item.listingType)">
						<div class="myres_t">
							<p class="top_num">{{item.batchID}}</p>
							<p v-if="item.status==0" class="top_sta">状态：<span>正常</span></p>
							<p v-if="item.status==1" class="top_sta">状态：<span>锁定</span></p>
							<p v-if="item.status==2" class="top_sta">状态：<span>售出</span></p>
							<p v-if="item.status==3" class="top_sta">状态：<span>待售</span></p>
							<p v-if="item.status==4" class="top_sta">状态：<span>洽谈</span></p>
							<p v-if="item.status==8" class="top_sta">状态：<span>过期</span></p>
							<p v-if="item.status==9" class="top_sta">状态：<span>撤销</span></p>
							<div class="clear"></div>
						</div>
						<div class="myres_c">
							<p class="myres_cang">所在仓库：<span>{{item.depotName}}</span></p>
						</div>
						<div class="myres_b">
							<p class="myres_weight1">重量：<span>{{item.pubWeight}}(公)</span></p>
							<p class="myres_weight2">挂牌价：<span v-if='item.indexCode'>{{item.indexCode}}+</span><span>{{item.price}}元/吨</span></p>
							<div class="clear"></div>
						</div>
						<div class="myres_data">
							<p class="data1">挂牌日期：<span>{{item.listingDate}}</span></p>
							<p class="data2">有效期：<span>{{item.validDay}}天</span></p>
							<div class="clear"></div>
						</div>
					</div>
					<div class="clear"></div>
					
				</li>
			</ul>
			<p v-if="!resshow" class="more_btn">{{moreText}}</p>
			<div v-if="resshow" class="noRes">
				<img src="../../assets/img/noRes.png" alt="">
				<p>未找到挂牌信息，请先挂牌</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data:function(){
			return{
				loading: true,
				checked: false, //全选框
				checkList: [],
				resourceList:'',
				totalPage: 0,
				pageCurrent:1,
				pageNum:1,
				moreText:'下拉加载更多',
				pageflag:true,
				status:0,
				resshow:true,
			}
		},
		created() {
			//执行上拉
		     window.addEventListener('scroll', this.onScroll);
		},
		mounted() {
			
			//获取详情
			this.$http.post('/wx/trade/getListingList').then((response) => {
				// console.log(response);
				this.resourceList = response.entity.list;
				this.totalPage = response.entity.totalPage;
				this.pageCurrent = response.entity.pageCurrent;
				if(response.entity.totalRow==0){
					this.resshow=true;
				}else{
					this.resshow=false;
				}
				if(response.entity.totalPage==1){
					this.moreText="全部加载完成"
				}else{
					this.moreText="下拉加载更多"
				}
				this.loading=false;
			});
		},
		methods:{
			switchOrder(i) {
				 window.scroll(0, 0);
				this.status = i;
				this.loading = true;
				this.pageCurrent =1;
				this.pageNum =1;
				this.$http.post('/wx/trade/getListingList?status=' + this.status).then((response) => {
					this.resourceList = response.entity.list;
					this.totalPage = response.entity.totalPage;
					if(response.entity.totalRow==0){
						this.resshow=true;
					}else{
						this.resshow=false;
					}
					// console.log(response);
					this.loading = false;
				})
			},
			// 执行状态操作
			ChangeState(state){
				let params = new URLSearchParams();
				let resID = new Array();
				let resList = document.getElementsByClassName("radio_type_chick");
				
				for(var i=0;i<resList.length;i++){
					if(resList[i].checked==true){
						resID.push(resList[i].value);
					}
					
				}
				let resIDText = resID.join(",");
				params.append("listingIDs", resIDText);
				// console.log(params)
				if(params.get("listingIDs")!=''){
					this.$http.post('/wx/listing/changeStatus?'+params+'&status='+state).then((response) => {
						for(var i=0;i<resID.length;i++){
							for(var z=0; z<this.resourceList.length;z++){
								if(resID[i]==this.resourceList[z].listingID){
									this.resourceList[z].status=state;
								}
							}
						}
						this.$message({
							showClose: true,
							message: '状态修改成功',
							type: 'success'
						});
						this.checked = false;
						this.checkList = [];
					});
				}else{
					this.$message({
					    message: "请选择挂牌单进行操作",
					    type: 'error',
							  
					});
				}
				
			},
			//前往详情
			godetails(item_,listingID_,listingType_){
				this.$router.push({
					name: 'resDetails',
					query: {
						id: item_,
						listingID: listingID_,
						listingType:listingType_,
					}
				});
			},
			// 全选
			checkedAll: function() {
			        var _this = this;
			        if (_this.checked) { //实现反选
			            _this.checkList = [];
			        } else { //实现全选
			            _this.checkList = [];
						if(this.resourceList){
							this.resourceList.forEach(function(item, index) {
							    _this.checkList.push(item.listingID);
							});
						}
			        }
					
			},
			
			//上拉加载更多
			onScroll() {
				let innerHeight = document.querySelector('#app').clientHeight;
				let outerHeight = document.documentElement.clientHeight;
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				// console.log(innerHeight + " " + outerHeight + " " + scrollTop);
				 if (innerHeight < (outerHeight + scrollTop+30)) {
					if(this.pageNum<this.totalPage&&this.pageflag == true){
						
						this.pageflag=false;
						this.pageNum = this.pageNum+1;
						this.loading = true;
						this.$http.post('/wx/trade/getListingList?pageNum='+this.pageNum+'&status='+this.status).then((response) => {
							// console.log(response)
							let ListTest = response.entity.list;
							this.totalPage = response.entity.totalPage;
							this.pageCurrent = response.entity.pageCurrent;
							this.resourceList = this.resourceList.concat(ListTest);
							this.loading = false;
							this.pageflag=true;
						})
						this.moreText="下拉加载更多";
						
					}else if(this.pageCurrent>=this.totalPage){
						this.moreText="全部加载完成"
					}
					
				 }
			 },
		},
		watch: {
		    'checkList': {
		        handler: function(val, oldVal) {
		            if (val.length === this.resourceList.length) {
		                this.checked = true;
		            } else {
		                this.checked = false;
		            }
					
		        },
		        deep: true
		    }
		},
	}
</script>

<style lang="scss">
	.myres_tab{position: fixed;top: 0;z-index: 999;width: 7.5rem;
		span{width: 1.25rem !important;}
		span:after{left: 0.375rem !important;}
	}
	.myres_top{position: fixed;top: 1rem;background: #f6f6f6;z-index: 99;width: 6.75rem;
		padding: 0.3rem 0.2rem 0.3rem 0.45rem;
		input{display: block;}
		label{margin-left: 0.5rem;display: block;margin-top: 0.02rem;font-size: 0.3rem;}
		.myres_all{margin-top: 0.1rem;}
		.myres_ope{
			input{height: 0.56rem;padding: 0 0.15rem;margin-left: 0.1rem;color: #fff;font-size: 0.3rem;background: #fe8a51;border: 1px solid #fe8a51;}
			input.shanchu{color: #fe8a51;background: none;border: 1px solid #fe8a51;}
		}
	}
	
	
	.resourceList{padding: 0rem 0 3rem 0;margin-top:2.2rem;
		.myres_inx{background: #fff;margin-bottom: 0.2rem;padding: 0.2rem 0rem;display: flex;display: -webkit-flex;justify-content: space-between;
			.myres_l{width: 1.3rem;
				input{margin-left: 0.45rem;margin-top: 1rem;}
			}
			.myres_r{width: 6rem;
				p{line-height: 0.5rem;}
				.myres_t{display: flex;display: -webkit-flex;justify-content: flex-start;
					.top_num{color: #090909;font-size: 0.3rem;}
					.top_sta{color: #999999;font-size: 0.3rem;margin-left: 0.2rem;
						span{color: #333;}
					}
				}
				.myres_c{display: flex;display: -webkit-flex;justify-content: flex-start;
					.myres_cang{color: #999;font-size: 0.3rem;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						span{color: #090909;}
					}
				}
				.myres_b{
					.myres_weight1{color: #999;font-size: 0.3rem;display: block;width: 100%;
						span{color: #14bab4;}
					}
					.myres_weight2{color: #999;font-size: 0.3rem;display: block;width: 100%;
						span{color: #fe8a51;}
					}
				}
				.myres_data{display: flex;display: -webkit-flex;justify-content: flex-start;
					p{color: #999;font-size: 0.3rem;
						span{color: #333;}
					}
					p.data2{margin-left: 0.2rem;}
				}
			}
		}
	
		
		.res_bot{
			.youxiao{color: #333;font-size: 0.3rem;
				span{color: #14bab4;margin: 0 0.1rem;}
				span.state2{color: #ccc;}
			}
		}
	}
</style>
