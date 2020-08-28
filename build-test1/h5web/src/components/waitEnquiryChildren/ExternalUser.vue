<template>
	<div v-loading="loading">
		<div class="topBack" >
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>待询盘</p>
		</div>
		<div class="addHeight"></div>
		<div class="cart_list" v-if="!resshow">
			<ul v-for="(item,ind) in cartList" :key="ind">
				<!-- <p class="cart_bt" v-if="item[0].listingType==1">棉联自营</p>
				<p class="cart_bt" v-if="item[0].listingType==0">店铺资源</p> -->
				<li class="cart_inx" v-for="(list,index) in cartList[ind]" :value="list.listingID" :key="index">
					<div class="cart_l">
						<input class="radio_type radio_type_chick" type="checkbox" name="type" :checked="!list.flag" :data-batchID="list.batchID" :data-memberID="list.memberID"
						 :data-price='list.price' :data-basis="list.basis" :data-pubweight='list.pubWeight' :value="list.listingID" :data-index="list.indexCode"
						 @change="parice($event, ind, index, list)" />
					</div>
					<div class="cart_r" @click="godetails(list.batchID,list.listingID,list.listingType)">
						<div class="res_top wrap">
							<!-- <p v-if="list.listingType==1" class="top_cla">自营</p> -->
							<div>
								<p class="top_num" style="position: relative;">{{list.batchID}} <span v-if="list.listingType == 1" class="icon_you"></span></p>
								<p class="top_grade">{{list.primaryColorName}}</p>
								<p class="top_lei">{{list.cottonTypeName}}</p>
							</div>
							<p class="top_date">{{list.listingDate.substring(5,11)}}</p>
						</div>
						<div class="res_con">
							<div><span class="title">长度</span><br><span class="num">{{list.lengthAvg}}</span></div><i></i>
							<div><span class="title">强力</span><br><span class="num">{{list.strongAvg}}</span></div><i></i>
							<div><span class="title">马值</span><br><span class="num">{{list.mikeAvg}}</span></div><i></i>
							<div><span class="title">含杂率</span><br><span class="num">{{list.impurity}}</span></div><i></i>
							<div><span class="title">回潮率</span><br><span class="num">{{list.moisture}}</span></div>
						</div>
						<div class="cang">
							<p>仓库：{{list.depotName}}</p>
						</div>
						<div class="res_bot wrap">
							<div class="res_price">
								<p class="zhishu" v-if="list.indexCode">{{list.indexCode}}<span v-if="list.basis>=0">+</span>{{list.basis}}</p>
								<p class="weight_one"><span>{{list.pubPrice}}</span>元/吨</p>
								<p class="weight_two">公重<span>{{list.pubWeight}}</span>吨</p>
							</div>
							<!-- <input class="res_btn" type="button" value="加入购物车"> -->
							<!-- <img class="shanchu" src="../../assets/img/shanchu.png" @click.stop="cartRemove(list.listingID,index,ind,list.indexCode,list.price,list.pubWeight)" alt=""> -->
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div v-if="resshow" class="noRes">
			<img src="../../assets/img/noRes.png" alt="">
			<p>空空如也，快去挑选资源吧！</p>
			<!-- <router-link to="/warehouse">前往资源库>></router-link> -->
		</div>
		<div class="removeSure" v-if="remoreSure">
			<div class="removeSure_bg"></div>
			<div class="removeSure_con">
				<p>是否删除选择的项目</p>
				<div>
					<input class="sure fl" type="button" value="确定" @click="bothRemove()">
					<input class="close fl" type="button" value="取消" @click="remoreSure=false">
					<div class="clear"></div>
				</div>
			</div>
		</div>
		<div class="list_bottom"></div>
		<div class="calculate">
			<input id='quanxuan' class="radio_type quanxuan" type="checkbox" name="type" :checked='checked' @change='checkedAll' />
			<label for="quanxuan">全选</label>
			<input class="tijiao" type="button" value="提交询盘" @click="upOrder" v-show="upFlag">
			<input class="tijiao" type="button" value="提交询盘" style="background: #ccc;" v-show="!upFlag">
			<div class="shanchu" @click="remoreSure=true">
				<img src="../../assets/img/shanchu_icon.png" alt="">
			</div>
			<p class="zongji">总计:<span>{{cartweight.toFixed(3)}}吨</span></p>
		</div>
		<div class="tanchu" v-show="tanchuShow">
			<div class="tanchu_con">
				<div class="select">
					<p class="bt">是否融资：</p>
					<el-switch class="select_tab" v-model="select1" active-text="是" inactive-text="否">
					</el-switch>
				</div>
				<div class="select">
					<p class="bt">取货方式：</p>
					<el-radio-group v-model="radio" class="select_inp">
						<el-radio v-for="(item,index) in way" :label="index" :key="item.deliveryTypeName">{{item.deliveryTypeName}}</el-radio>
					</el-radio-group>
				</div>
				<div class="sure_btn">
					<input type="button" class="close fl" value="取消下单" @click="tanchuShow=false">
					<input type="button" class="sure fl" value="确认下单" @click="upOrder">
					<div class="clear"></div>
				</div>
			</div>
			<div class="tanchu_bg"></div>
		</div>
		<p id="newParice" @click="parice('yes')" style="display: none;"></p>
		<div class="generationCustomer" v-if="generationCustomer" v-loading="generationCustomerSubmitLdg">
			<div class="content">
				<h3>请选择客户联系人</h3>
				<span class="close" @click="CleargenerationCustomer">X</span>
				<div class="info">
					<input type="text" name="companyName" id="companyName" @input="companyNameSearch"/>
					<div class="companyInfo" v-loading="companyInfoloading">
						<nav>
							<template v-if="parentVol">
								<li v-for="(item) in parentData" :key="item.memberID" @click="clickUserInfo(item.userList)">
									<span style="margin: 0">{{ item.corpNameFull }}</span>
								</li>
							</template>
							<template v-if="ChildrenVol">
								<li v-for="(item) in ChildrenData" :key="item.userID">
									<input type="radio" :ref="'ChildrenCheckbox' + item.userID" name="companyInfoUserID" @change="ChildrenCheckboxAdd($event, item)"/>
									<span @click="ChildrenCheckboxAddspan($event, item)">{{ item.name }}&nbsp;&nbsp;{{ item.mobile }}</span>
								</li>
							</template>
						</nav>
					</div>
				</div>
				<div class="info_submit">
					<div class="button" @click="generationCustomerSubmit">确认提交</div>
				</div>
			</div>
		</div>
	</div>
 

</template>




<script>
//  棉联
// 
	export default {
		data: function() {
			return {
				cartList: [],
				loading: true,
				checked: false, //全选框
				checkList: [],
				cartPrice: 0,
				cartweight: 0,
				CFprice: [],
				List: '',
				listingIds: {},
				way: '',
				resshow:true,
				select1: false,
				radio: 0,
				tanchuShow: false,
				remoreSure:false,
				upFlag:true,
				viewListData: {
					batchIDs: '',
					listingIDs: ''
				},
				generationCustomerSubmitLdg: false,
				generationCustomer: false, // 代客户询盘
				companyInfoloading: false,
				parentVol: false,
				ChildrenVol: false,
				companyNameSearchData: [
					{
						memberName: '上海棉联',
						memberID: 1001,
						list: [
							{
							userID: 2001,
							name: '张三',
							mobile: '15245678895'
						},
												{
							userID: 2002,
							name: '李四',
							mobile: '15245678895'
						},
												{
							userID: 2003,
							name: '000',
							mobile: '15245678895'
						},
						]
					},
					{
						memberName: '上海棉联二号',
						memberID: 1001,
						list: [
							{
							userID: 2001,
							name: '张三2',
							mobile: '15245678895'
						},
												{
							userID: 2002,
							name: '李四2',
							mobile: '15245678895'
						},
												{
							userID: 2003,
							name: '0002',
							mobile: '15245678895'
						},
						]
					},
				], // 测试数据
				parentData: [],
				ChildrenData: [],
				// 
				ChildrenCheckboxData: {}
			}
		},
		created() {
			// this.checked = false;
		},
		mounted() {
			window.scroll(0, 0);
			// 获取购物车列表
			this.$http.post('/wx/trade/listCartItem').then((response) => {
				// console.log(response);
				for (let i = 0; i < response.entity.length; i++) {
					this.cartList.push(response.entity[i].list);
				}
				if(this.cartList.length==0){
					this.resshow=true;
				}else{
					this.resshow=false;
				}
				this.loading = false;
				
				if (!this.resshow) {
					this.checked = true
				}

				// 获取指数最新价格
				this.$http.post('/wx/trade/indexCode').then((response) => {
					this.CFprice = response.entity;
					
					// // console.log(this.CFprice);
					
				});
				// 收货列表
				this.$http.post('/wx/bases/getDeliveryTypeList').then((response) => {
					// console.log(response);
					
					this.way = response.entity;
					// this.checked = true;
					// this.checkedAll();
					// this.checked = true;
					// 
					
					
				});

				this.$nextTick(function () {
					this.List = document.getElementsByClassName("radio_type_chick");
					let zongWeight = 0;
					var zongprice2 = 0;
					var zongpriceof2 = 0;
					for (var num = 0; num < this.List.length; num++) {
						zongWeight = zongWeight + parseFloat(this.List[num].getAttribute('data-pubWeight'));
						zongprice2 = zongprice2 + parseInt(this.List[num].getAttribute('data-price'));
						for (var prop in this.CFprice) {
							if (this.List[num].dataset.index == prop) {
								zongprice2 = zongprice2 + this.CFprice[prop]
							}
						}
						zongpriceof2 = zongprice2 * Number(this.List[num].getAttribute('data-pubweight'));
					}
					let _that = this
					if (this.cartList) {
						this.cartList.forEach(function(item, index) {
							item.forEach(function(it, ind) {
								_that.checkList.push(it.listingID);
								_that.cartList[index][ind].flag = false
							})
						});
					}
					this.cartweight = zongWeight;
					this.cartPrice = zongpriceof2;
				})
				
			});
			
			
			this.List = document.getElementsByClassName("radio_type_chick");
			// this.checkedAll();
		},

		methods: {
			// 前往资源详情
			godetails(item_,listingID_,listingType_){
				this.$router.push({
					name: 'resDetails',
					query: {
						id: item_,
						listingID: listingID_,
						listingType:listingType_,
						listingHref:1,
					}
				});
			},
			companyNameSearch (ele, value) {
				console.log(ele.target.value)
				this.companyInfoloading = true
				this.$HttpRequest({
					url: '/wx/bases/list_user_group',
					data: {
						"pageSize": 20,
						"pageNum": 1,
						"memberName": ele.target.value
					},
					method: 'post'
				}).then(res => {
					this.companyInfoloading = false
					if (res.code == 1000) {
						if (res.entity) {
							// res.entity = this.companyNameSearchData
							this.parentData = []
							this.ChildrenData = [] 
							this.ChildrenCheckboxData = {}
							this.parentData = res.entity
							this.ChildrenVol = false
							this.parentVol = true						
						} else {
							this.parentData = []
							this.ChildrenVol = false
							this.parentVol = false	
						}
					}
				})
			},
			clickUserInfo (row) {
				this.ChildrenData = [] 
				this.ChildrenCheckboxData = {}
				if (row) {
					this.parentData = []
					this.ChildrenData = JSON.parse(JSON.stringify(row))
					this.ChildrenVol = true
					this.parentVol = false
				} else {
					this.ChildrenVol = false
					this.parentVol = true
				}
			},
			ChildrenCheckboxAdd (ele, row) {
				this.ChildrenCheckboxData = row
			},
			ChildrenCheckboxAddspan (ele, row) {
				this.$refs['ChildrenCheckbox' + row.userID][0].checked = true
				this.ChildrenCheckboxAdd(this.$refs['ChildrenCheckbox' + row.userID][0], row)
			},
			generationCustomerSubmit () {
				if (this.ChildrenCheckboxData.userID) {
					this.generationCustomerSubmitLdg = true
					// 数据过滤
					this.ChildrenCheckboxData = {
						buyMemberID: this.ChildrenCheckboxData.memberID,
						buyUserID: this.ChildrenCheckboxData.userID
					}
					this.$HttpRequest({
						url: '/wx/admin/spotSale/createSpotSale',
						data: Object.assign(this.ChildrenCheckboxData, this.viewListData),
						method: 'post'
					}).then(res => {
						this.generationCustomerSubmitLdg = false
						if (res.code == 1000) {
							this.checked = false
							let lengthS = this.List.length - this.viewListData.listingIDs.split(',').length
							this.getstore(this.viewListData.listingIDs.split(',').length)
							this.checkList = []
							this.$message({
								message: '提交成功',
								type: 'success',
								duration: 1000,
								onClose: () => {
									this.$router.push({
										name: 'myEnquiry',
										params: {
											id: 0
										}
									});
								}
							});
						} else {
							this.$message({
								showClose: true,
								duration: 1000,
								message: res.message,
								type: 'error'
							});
						}
						this.generationCustomer =  false
						this.parentVol =  false
						this.ChildrenVol = false
					})
				} else {
					this.$message({
						showClose: true,
						duration: 1000,
						message: '请选择用户',
						type: 'error'
					});
				}
			},
			CleargenerationCustomer () {
				this.generationCustomer =  false
				this.parentData = []
				this.ChildrenData = [] 
				this.parentVol =  false
				this.ChildrenVol = false
			},
			bothRemove(){
				this.remoreSure=false;
				if(this.checkList.length>0){
					this.$http.post('/wx/trade/removeCartItemByList?listingIDs=' + this.checkList).then((response) => {
						for(var x=0;x<this.checkList.length;x++){
							// alert(this.cartList)
							for(var i=0;i<this.cartList.length;i++){
								for(var z=0;z<this.cartList[i].length;z++){
									// alert(this.checkList[x]);
									if(this.checkList[x]==this.cartList[i][z].listingID){
										this.cartList[i].splice(z, 1);
									}
								}
								if(this.cartList[i].length<1){
									this.cartList.splice(i, 1)
								}
							}
						}
						if(this.cartList.length==0){
									this.resshow=true;
								}else{
									this.resshow=false;
								}
						this.$message({
							showClose: true,
							message: '删除成功',
							type: 'success'
						});
						this.checked = false
						let length = this.List.length - this.checkList.length
						this.getstore(this.checkList.length)
						this.checkList = []
					}).then(()=>{
					   // document.getElementById('newParice').click();
					});
				}else{
					this.$message({
						showClose: true,
						message: '请选择要删除的批次',
						type: 'error'
					});
				}
				
			},
			// 购物车删除
			// cartRemove(id, index, ind) {
			// 	this.$http.post('/wx/trade/removeCartItem?listingID=' + id).then((response) => {
			// 		// let cartListli = document.getElementsByClassName("cart_inx");
			// 		// this.List = document.getElementsByClassName("radio_type_chick");
			// 		
			// 		// // console.log(response);
			// 		// var clc=document.getElementById('newParice');
			// 		let thisCfprice =0;
			// 		this.cartList[ind].splice(index, 1)
			// 		if(this.cartList[ind].length==0){
			// 			this.cartList.splice(ind, 1);
			// 		}
			// 		for(var i = 0;i<this.checkList.length;i++){
			// 			if(id==this.checkList[i]){
			// 				this.checkList.splice(i, 1)
			// 			}
			// 		}
			// 		
			// 		if(this.cartList.length==0){
			// 			this.resshow=true;
			// 		}else{
			// 			this.resshow=false;
			// 		}
			// 		this.$message({
			// 			showClose: true,
			// 			message: '删除成功',
			// 			type: 'success'
			// 		});
			// 	}).then(()=>{
			// 	   document.getElementById('newParice').click();
			// 	});
			// 	
			// },
			// 全选
			checkedAll: function(ele) {
				if (ele)
				this.checked = ele.target.checked 
				this.List = document.getElementsByClassName("radio_type_chick");
				let zongWeight = 0;
				var zongprice2 = 0;
				var zongpriceof2 = 0;
				for (var num = 0; num < this.List.length; num++) {
					zongWeight = zongWeight + parseFloat(this.List[num].getAttribute('data-pubWeight'));
					zongprice2 = zongprice2 + parseInt(this.List[num].getAttribute('data-price'));
					for (var prop in this.CFprice) {
						if (this.List[num].dataset.index == prop) {
							zongprice2 = zongprice2 + this.CFprice[prop]
						}
					}
					zongpriceof2 = zongprice2 * Number(this.List[num].getAttribute('data-pubweight'));
				}

				let _that = this
				if (this.checked) { //实现反选
					this.checkList = [];
					this.cartList.forEach(function(item, index) {
						item.forEach(function(it, ind) {
							_that.checkList.push(it.listingID);
							_that.cartList[index][ind].flag = false
						})
					});
					this.cartweight = zongWeight;
					this.cartPrice = zongpriceof2;
				} else { //实现全选
					this.checkList = [];
					this.cartweight = 0;
					this.cartPrice = 0;
					if (this.cartList) {
						this.cartList.forEach(function(item, index) {
							item.forEach(function(it, ind) {
								_that.cartList[index][ind].flag = true
							})
						});
					}
				}
			},
			// 计算总计
			parice(ele, ind, index, list) {
				if (ind != undefined)
				this.cartList[ind][index].flag = !ele.target.checked
				this.List = document.getElementsByClassName("radio_type_chick");
				let checkedArr = []
				// console.log(this.List);
				let zongWeight = 0;
				let zongprice = 0;
				let zongpriceof = 0;
				for (var num = 0; num < this.List.length; num++) {
					if (this.List[num].checked == true) {
						zongWeight = zongWeight + parseFloat(this.List[num].getAttribute('data-pubWeight'));
						zongprice = zongprice + parseInt(this.List[num].getAttribute('data-price'));
						for (var prop in this.CFprice) {
							if (this.List[num].dataset.index == prop) {
								zongprice = zongprice + this.CFprice[prop];
							}
				
						}
						zongpriceof = zongprice * Number(this.List[num].getAttribute('data-pubweight'));
						checkedArr.push(this.List[num].checked)
					}
				}
				this.cartPrice = zongpriceof;
				this.cartweight = zongWeight;
				// console.log(this.checkList, checkedArr)
				if (this.List.length == checkedArr.length) {
					this.checked = true;
				} else {
					this.checked = false;
				}
				let _that = this
				this.checkList = []
				this.cartList.forEach(function(item, index) {
					item.forEach(function(it, ind) {
						if (!_that.cartList[index][ind].flag)
						_that.checkList.push(it.listingID);
					})
				});

				console.log(this.checkList, checkedArr)
				
			},
			// 下单
			upOrder() {
				this.List = document.getElementsByClassName("radio_type_chick");
				var listingIds = new Array();
				var batchID = [];
				var indexCodes = new Array();
				var basisPrices = new Array();
				var prices = new Array();
				for (var num = 0; num < this.List.length; num++) {
					if (this.List[num].checked == true) {
						batchID.push(this.List[num].getAttribute('data-batchID'));
						listingIds.push(this.List[num].value);
						indexCodes.push(this.List[num].getAttribute('data-index'));
						basisPrices.push(this.List[num].getAttribute('data-basis'));
						prices.push(this.List[num].getAttribute('data-price'));

					}
				}
				this.generationCustomer = true
				// 				viewListData: {
				// 	batchIDs: '',
				// 	listingIDs: ''
				// },
				this.viewListData = {
					batchIDs: batchID.toString(),
					listingIDs: listingIds.toString(),
				}

				this.tanchuShow = false
			},
			getstore (type) {
				// 获取
				let num = this.$store.getters.OPREATING_INFO_GET('UserEnquiries')
				// 修改
				this.$store.commit({
					type: 'OPREATING_INFO_SET',
					UserEnquiries: ( num ? num : 0 ) - type
				})
				// 存储
				this.$store.dispatch('OPREATING_INFO_SET_LOA')
			}
		},
		watch: {
			// 'checkList': {
			// 	handler: function(val, oldVal) {
			// 		var cartListlength = null;
			// 		this.cartList.forEach(function(item, index) {
			// 			cartListlength = cartListlength + item.length;
			// 		})
			// 		if (val.length === cartListlength) {
			// 			this.checked = true;
			// 		} else {
			// 			this.checked = false;
			// 		}
			// 	},
			// 	deep: true
			// }
		},

	}
</script>

<style lang="scss">
	.noRes a{color: #14bab4;font-size: 0.3rem;margin-top: 0.2rem;display: inline-block;}
	.cart_title {
		font-size: 0.32rem;
		padding: 0.2rem 0.2rem 0.1rem 0.2rem;
	}
	.cart_list{padding-top: 0.2rem;
		.cart_bt{padding-left: 0.2rem;margin-bottom: 0.15rem;margin-top: 0.1rem;border-bottom: 1px solid #ccc;padding-bottom: 0.1rem;width: 6.9rem;margin-left: 0.2rem;color: #666;font-size: 0.28rem;}
	}
	.cart_list>ul {
		display: block;
		margin-bottom: 0.2rem;
		border-bottom: 0px dashed #ccc;
	}

	.cart_inx {display: flex;display: -webkit-flex;justify-content: space-between;
		width: 7.5rem;
		margin-bottom: 0.2rem;

		.cart_l {
			width: 0.7rem;
			padding-top: 0.9rem;
			text-align: center;
		}

		.cart_r {
			width: 6.5rem;
			background: #fff;
			padding: 0.2rem 0;
			margin-right: 0.2rem;
			border-radius: 0.1rem;
		}

		.res_top {display: flex;display: -webkit-flex;justify-content: space-between;
			p {
				display: inline-block;
			}
			.icon_you{
				position: absolute;
				top: .08rem;
				right: -.28rem;
				width: .24rem;
				height: .24rem;
				background: url('../../assets/icon/you.png') no-repeat;
				background-size: 100%;
			}
			.top_cla {
				padding: 0.03rem 0.05rem;
				background: #14bab4;
				border-radius: 2px;
				color: #fff;
				font-size: 0.28rem;
				margin-right: 0.1rem;
			}

			.top_num {
				color: #14bab4;
				font-size: 0.28rem;
			}

			.top_grade {
				color: #333333;
				font-size: 0.28rem;
				margin-left: 0.4rem;
			}

			.top_lei {
				color: #333333;
				font-size: 0.28rem;
				margin-left: 0.15rem;
			}

			.top_date {
				color: #666666;
				font-size: 0.28rem;
				margin-top: 0.05rem;
			}
		}

		.res_con {display: flex;display: -webkit-flex;justify-content: space-between;
			div {
				width: 1.25rem;
				text-align: center;
				margin: 0.1rem 0;

				.title {
					font-size: 0.3rem;
					color: #666666;
				}

				.num {
					font-size: 0.3rem;
					color: #333333;
				}
			}

			i {
				float: left;
				display: block;
				width: 1px;
				height: 0.32rem;
				background: #ccc;
				margin-top: 0.2rem;
			}
		}

		.cang {
			font-size: 0.28rem;
			color: #333333;
			margin: 0rem 0.2rem 0.1rem 0.2rem;
			width: 6rem;
			border-bottom: 1px solid #f4f4f4;
			padding-bottom: 0.1rem;
			p{display: inline-block;overflow: hidden;}
			p{width: 2.9rem !important;text-overflow:ellipsis;white-space: nowrap;display: inline-block;}
			p:nth-child(1){margin-right: 0.2rem;}
			p.zhishu{width: 40%;color: #fd7320;font-weight: bold;text-align: right;font-size: 0.3rem;}
		}

		.res_bot {display: flex;display: -webkit-flex;justify-content: space-between;
			p.zhishu{color: #fd7320;font-weight: bold;text-align: right;font-size: 0.3rem;line-height: 0.51rem;margin-right: 0.2rem;}
			.res_price{display: flex;display: -webkit-flex;justify-content: flex-start;}
			.weight_one {
				color: #666666;
				font-size: 0.26rem;

				span {
					color: #fd7320;
					font-size: 0.32rem;
				}
			}

			.weight_two {
				color: #666666;
				font-size: 0.28rem;
				margin-left: 0.2rem;

				span {
					color: #333333;
					font-size: 0.32rem;
				}
			}

			// .res_btn{float: right;width: 1.84rem;height: 0.58rem;background: #fd7320;font-size: 0.24rem;color: #fff;border: 0;border-radius: 1rem;margin-top: -0.1rem;}
			.shanchu {
				width: 0.2rem;
				height: 0.23rem;
				float: right;
				padding: 0.1rem 0.2rem;
			}
		}
	}

	.list_bottom {
		height: 1.5rem;
	}
	.removeSure{
		.removeSure_bg{background: #000;opacity: 0.5;position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: 999999;}
		.removeSure_con{background: #fff;width: 5.5rem;padding: 0.5rem 0.25rem;position: fixed;z-index: 999999;margin-left: 0.75rem;top: 3.5rem;
			p{color: #333;font-size: 0.28rem;margin-bottom: 0.2rem;}
			input{border: none;width: 2.5rem;margin: 0 0.125rem;height: 0.6rem;}
			input.sure{background: #fd6e20;color: #fff;}
		}
	}
	.calculate {
		position: fixed;
		bottom: 0;
		width: 7.5rem;
		z-index: 99999;
		height: 1.15rem;
		background: #fff;

		.quanxuan {
			float: left;
			margin-left: 0.2rem;
			margin-top: 0.4rem;
		}

		.tijiao {
			float: right;
			width: 2.1rem;
			background: #fd6e20;
			font-size: 0.32rem;
			height: 100%;
			border: 0;
			color: #fff;
		}
		.shanchu{
			float: right;
			background: #dadada;
			height: 0.8rem;
			padding-top: 0.35rem;
			width: 1rem;text-align: center;
			img{width: 0.32rem;}
		}
		.zongji {
			float: right;
			font-size: 0.3rem;
			color: #333;
			margin-top: 0.35rem;
			margin-right: 0.15rem;

			span {
				color: #fd6e20;
				font-size: 0.34rem;
			}
		}

		label {
			display: block;
			float: left;
			margin-left: 0.5rem;
			margin-top: 0.41rem;
		}
	}

	.tanchu {
		.tanchu_con {
			background: #fff;
			width: 6.5rem;
			position: fixed;
			margin-left: 0.5rem;
			top: 25%;
			z-index: 999999;
			padding-top: 0.5rem;
			padding-bottom: 0.5rem;

			.select {
				width: 5.5rem;
				margin-left: 0.5rem;
				margin-bottom: 0.5rem;

				.bt {
					font-size: 0.32rem;
					margin-top: 0.13rem;
					margin-left: 0.5rem;
				}

				.select_tab {
					margin-top: 0.2rem;
					margin-left: 0.5rem;
					font-size: 0.3rem;
					margin-left: 1.8rem;
				}

				.el-switch.is-checked .el-switch__core {
					background-color: #14bab4;
					border-color: #14bab4;
				}

				.el-switch__label.is-active {
					color: #14bab4;
				}

				.select_inp {
					margin-top: 0.3rem;
					margin-left: 0.7rem;
				}

				.el-radio__input.is-checked .el-radio__inner {
					background-color: #14bab4;
					border-color: #14bab4;
				}

				.el-radio__input.is-checked+.el-radio__label {
					color: #14bab4;
				}
			}

			.sure_btn {
				margin-left: 1rem;

				input {
					width: 2rem;
					padding: 0.2rem 0;
					border: none;
					border-radius: 0.07rem;
					margin-right: 0.5rem;
					color: #333;
					font-size: 0.3rem;
				}

				input.sure {
					background: #fd6e20;
					color: #fff;
				}
			}
		}

		.tanchu_bg {
			background: url(../../assets/img/tanchu_bg.png) repeat 100% 100%;
			position: fixed;
			z-index: 99999;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}
	.generationCustomer{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		padding-top: 2rem;
		background: rgba(51, 51, 51, .1);
		z-index: 111111;
		.content{
			width: 82%;
			height: auto;
			margin: 0 auto;
			padding: .34rem;
			background: #fff;
			border-radius: .1rem;
			position: relative;
			h3{
				font-size: 0.32rem;
				padding: 0px 0px 0.2rem 0;
				font-weight: bold;
				border-bottom: 1px solid #EAEAEA;
			}
			.info{
				width: 100%;
				#companyName{
					width: calc(100% - 2px);
					border: 1px solid #ccc;
					margin: .24rem 0;
					height: .72rem;
					font-size: .35rem;
					text-indent: .1rem;
					background: #fff;
					border-radius: 4px;
					color: #333;
				}
				.companyInfo{
					width: 92%;
					height: 3.2rem;
					margin: 0 auto;
					overflow-y: scroll;
					li{
						list-style: none;
						border-bottom: 1px solid #E1E3E3;
						display: flex;
						input{
							height: .72rem;
							width: .36rem;
						}
						span{
							width: 100%;
							line-height: .72rem;
							margin-left: 0.4rem;
							font-size: .28rem;
						}
					}
				}
			}
			.info_submit{
				width: 100%;
				text-align: center;
				.button{
					width: 2.2rem;
					line-height: 0.74rem;
					margin: 0 auto;
					margin: 0.28rem auto;
					background: #13B9B3;
					color: #fff;
					font-size: .32rem;
					border-radius: .4rem;
					margin-bottom: 0;
				}
			}
			.close{
				position: absolute;
				top: .1rem;
				right: .1rem;
				width: .36rem;
				height: .36rem;
				border-radius: .18rem;
				color: #777;
				font-size: .3rem;
				text-align: center;
				line-height: .36rem;
			}
		}
	}
</style>
