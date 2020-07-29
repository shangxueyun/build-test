<template>
	<div style="padding-bottom: 3rem;" v-loading="loading">
		<div class="topBack">
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>采购询盘</p>
		</div>
		<div class="addHeight"></div>
		<div class="search2">
			<div class="search_left fl">
				<i class="fl">
					<img src="../../assets/icon/sousuo.png" alt="">
				</i>
				<input class="fl search_txt" placeholder="请输入批号" type="text" name="" value="" v-model="searchTxt"/>
				<div class="clear"></div>
			</div>
			<input class="fl search_btn" type="button" name="" id="" value="搜索" @click="getsearch()" />
			<div class="clear"></div>
		</div>
		<div class="enq_tab" style="top: 0.75rem;">
			<span @click="switchOrder(0)" :class="{'active':statu==0}">待核实<i>{{statusCount.initial}}</i></span>
			<span @click="switchOrder(1)" :class="{'active':statu==1}">已核实<i>{{statusCount.confirm}}</i></span>
			<span @click="switchOrder(2)" :class="{'active':statu==2}">待回复<i>{{statusCount.waitReply}}</i></span>
			<span @click="switchOrder(3)" :class="{'active':statu==3}">挂盘中<i>{{statusCount.spotting}}</i></span>
			<span @click="switchOrder(4)" :class="{'active':statu==4}">竞价中<i>{{statusCount.bid}}</i></span>
			<span @click="switchOrder(7)" :class="{'active':statu==7}">已成交<i>{{statusCount.success}}</i></span>
			<!-- <span :class="{'active':status==3}" @click="switchOrder(3)">待收货</span>
				<span :class="{'active':status==4}" @click="switchOrder(4)">待收票</span>
				<span :class="{'active':status==5}" @click="switchOrder(5)">已过期</span> -->
			<div class="clear"></div>
		</div>
		
		<!-- <div style="height: auto;padding: 0.1rem 0;border: 1px solid #000;margin-top: 0.1rem;" v-for="item in enqList">
			
		</div> -->
		<div class="shopLi" v-for="(item,index) in enqList">
			<div class="shopLiTop" @click="showHide(index)">
				<div class="shopLiImg fl" :style="{backgroundImage: 'url(https://test.unioncotton.com/#/api/resources?p=publish&k=' + item.picCorpLogo + ')'}"></div>
				<div class="shopLiTxt fl">
					<div class="shopTltle">
						<div class="shopWarp">
							<p class="shopName" style="max-width: 4.2rem;">{{item.corpNameFull}}</p>
							<span class="resNum">{{item.list.length}}批</span>
						</div>
					</div>
					<div class="shopPhone">
						<p style="max-width: 3rem;" v-if='item.contactsMap'>联系人:{{item.contactsMap[Object.keys(item.contactsMap)[0]]}}</p>
						<p style="margin-left: 0.2rem;" v-if='item.contactsMap'>电话:{{Object.keys(item.contactsMap)[0]}}</p>
					</div>
				</div>
				<img class="xundown" v-show='showArr.indexOf(index)!=-1' src="../../assets/img/xundown.png" alt="">
				<img class="xundown" v-show='showArr.indexOf(index)==-1' src="../../assets/img/xunup.png" alt="">
				<div class="clear"></div>
			</div>
			<div class="shopBot" v-show='showArr.indexOf(index)==-1' v-if="forFlag">
				<ListChildInx v-for="(itemLi,key) in item.list" v-model="item.list" :key="key" :purchasing="1" :listKey="key"
				 @inputValueListChild="inputValueListChild" :listStatus="statu" :disableTime="disableTime"></ListChildInx>
			</div>

		</div>
		<div v-if="enqList==''" class="noRes">
			<img src="../../assets/img/noRes.png" alt="">
			<p>当前状态采购询盘为空</p>
		</div>
		<div class="enqButton" v-show="statu==1&&enqList.length>0">
			<input type="button" value="确认提交" @click="sureUpList()">
		</div>
		<div class="enqButton" v-show="statu==3&&enqList.length>0">
			<input type="button" value="确认操作" @click="sureUpList()">
		</div>
		<div class="enqButton" v-show="statu==4&&enqList.length>0">
			<input type="button" value="提交确认" @click="sureUpList()">
		</div>
		<div class="top_view" v-if="viewShow">
			<div class="viewBg"></div>
			<div class="viewCon">
				<p class="view_tlt">确认提交当前选择询盘？</p>
				<div>
					<input type="button" value="取消" class="close" @click="viewShow = !viewShow">
					<input type="button" value="确定" class="sure" v-show="statu==1" @click="editLis1()">
					<input type="button" value="确定" class="sure" v-show="statu==3" @click="editLis2()">
					<input type="button" value="确定" class="sure" v-show="statu==4" @click="editLis3()">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ListChildInx from '@/components/ListChild/index'
	import qs from 'qs'
	// import laydate from 'layui-laydate'

	export default {
		components: {
			ListChildInx
		},
		data: function() {
			return {
				searchTxt:'',
				enqList: '',
				listChildData: '',
				disableTime: '',
				active: false,
				showArr: [],
				statu: 0,
				dataarr: [],
				dataVal: [],
				forFlag: false,
				dataList:[],
				loading:true, 
				statusCount:'',
				systemDate:'',
				systemDateM:'',
				viewShow:false,
			}
		},

		created() {
			let nowDate = new Date();
			let addDay;
			let date = {
				year: nowDate.getFullYear(),
				month: nowDate.getMonth() + 1,
				date: nowDate.getDate(),
			}
			date.month = (date.month < 10) ? '0' + date.month : date.month = date.month;
			date.date = (date.date < 10) ? '0' + date.date : date.date = date.date;
			this.systemDateM = date.year + '-' + date.month + '-'  + date.date;
			
			    if(nowDate.getDay()==0){
			        addDay=5;
			    } else if(nowDate.getDay()==1){
			        addDay=4;
			    } else if(nowDate.getDay()==2){
			        addDay=3;
			    } else if(nowDate.getDay()==3){
			        addDay=2;
			    } else if(nowDate.getDay()==4){
			        addDay=1;
			    } else if(nowDate.getDay()==5){
			        addDay=0;
			    } else if(nowDate.getDay()==6){
			        addDay=6;
			    }
			    date.date = date.date+addDay;
			    nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0); //得到本月最后一天
			    if(date.date>nowDate.getDate()){
			        date.date = date.date-nowDate.getDate();
			        date.date = (date.date < 10) ? '0' + date.date : date.date = date.date;
			        date.month = parseInt(date.month)+1;
			        date.month = (date.month < 10) ? '0' + date.month : date.month = date.month;
			        console.log(date.month);
			    }
			    if (parseInt(date.month)>12) {
			        date.month=parseInt(date.month)-12;
			        date.month = (date.month < 10) ? '0' + date.month : date.month = date.month;
			        date.year=date.year+1;
			    }
				this.systemDate = date.year + '-' + date.month + '-'  + date.date;
			this.$http.post('/wx/index_h5/getHoliday?breakDateMin=2019-01-01&breakDateMax=2099-01-01').then((response) => {
				this.disableTime = response.data
			})
		},
		mounted() {

		},
		methods: {
			timestampToTime (cjsj) {
			        var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
					
			        var Y = date.getFullYear() + '-'
			        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
			        var D = date.getDate() + ' '
			        var h = date.getHours() + ':'
			        var m = date.getMinutes() + ':'
			        var s = date.getSeconds()
			        return Y+M+D+h+m+s
			},
			getsearch(){
				var status = this.statu;
				this.forFlag = false;
				this.loading = true;
				this.$http.post('/wx/spotSale/mySpotSalePurchase?status=' + status + '&search='+this.searchTxt).then((response) => {
					this.dataVal = [];
					this.dataList = [];
					this.showArr.splice(0, this.showArr.length);
					this.enqList = response.entity.list;
					this.forFlag = true;
					for(var i=0;i<response.entity.list.length;i++){
						for(var z=0;z<response.entity.list[i].list.length;z++){
							var data_;
							if(response.entity.list[i].list[z].listingValidity==null){
								data_ = this.systemDate
							}else{
								data_ = this.timestampToTime(response.entity.list[i].list[z].listingValidity).substring(0, 10)
							}
							var objInx = {
								listID:response.entity.list[i].list[z].listID,
								batchID:response.entity.list[i].list[z].batchID,
								depotID:response.entity.list[i].list[z].depotID,
								depotName:response.entity.list[i].list[z].depotName,
								amount:response.entity.list[i].list[z].amount,
								packNum:response.entity.list[i].list[z].packNum,
								basisPrice:response.entity.list[i].list[z].basisPrice,
								type:response.entity.list[i].list[z].type,
								price:response.entity.list[i].list[z].price,
								notes:response.entity.list[i].list[z].notes,
								listingValidity:data_ +' 15:00:00',
								flag:false,
							}
							this.dataList.push(objInx);
						}
					}
					this.loading = false;
				})
			},
			showHide(index) {
				if (this.showArr.indexOf(index) == -1) {
					this.showArr.push(index)
				} else {
					this.showArr.splice(this.showArr.indexOf(index), 1);
				}
			},
			sureUpList(){
				this.data_ = [];
				for (var i = 0; i < this.dataList.length; i++) {
					if (this.dataList[i]['flag'] == true) {
						this.data_.push(this.dataList[i])
					}
				}
				if(this.data_.length<1){
					this.$message({
						message: '请选择询盘批次',
						type: 'error',
					});
					return
				}
				this.viewShow = true;
			},
			//确认提交
			editLis1() {
				this.$HttpRequest({
					url: '/wx/spotSale/submit_hanging_dish',
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
					},
					method: 'post',
					data: this.data_
				}).then(res => {
					this.viewShow = false;
					if(res.success){
						for (var i = 0; i < this.enqList.length; i++) {
							for (var z = 0; z < this.enqList[i].list.length; z++) {
								for (var x = 0; x < this.data_.length; x++) {
									if(this.data_[x].listID==this.enqList[i].list[z].listID){
										this.enqList[i].list.splice(z, 1);
										this.statusCount.confirm--;
									}
								}
								if(this.enqList[i].list.length<1){
									this.enqList.splice(i, 1)
								}
							}
						}
						for (var i = 0; i < this.dataList.length; i++) {
								for (var x = 0; x < this.data_.length; x++) {
									if(this.data_[x].listID==this.dataList[i].listID){
										this.dataList.splice(i, 1);
									}
								}
						}
						this.$message({
							message: '提交成功',
							type: 'success',
						});
					}else{
						this.$message({
							message: res.message,
							type: 'error',
						});
					}
				})
			},
			//确认操作
			editLis2() {
				this.$HttpRequest({
					url: '/wx/spotSale/modify_hanging_dish',
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
					},
					method: 'post',
					data: this.data_
				}).then(res => {
					this.viewShow = false;
					if(res.success){
						for (var i = 0; i < this.enqList.length; i++) {
							for (var z = 0; z < this.enqList[i].list.length; z++) {
								for (var x = 0; x < this.data_.length; x++) {
									if(this.data_[x].listID==this.enqList[i].list[z].listID){
										this.enqList[i].list.splice(z, 1);
									}
								}
								if(this.enqList[i].list.length<1){
									this.enqList.splice(i, 1)
									this.statusCount.spotting--;
								}
							}
						}
						for (var i = 0; i < this.dataList.length; i++) {
								for (var x = 0; x < this.data_.length; x++) {
									if(this.data_[x].listID==this.dataList[i].listID){
										this.dataList.splice(i, 1);
									}
								}
						}
						this.$message({
							message: '提交成功',
							type: 'success',
						});
					}else{
						this.$message({
							message: res.message,
							type: 'error',
						});
					}
				})
			},
			//确认竞价
			editLis3() {
				this.$HttpRequest({
					url: '/wx/spotSale/submit_bidding',
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
					},
					method: 'post',
					data: this.data_
				}).then(res => {
					this.viewShow = false;
					if(res.success){
						for (var i = 0; i < this.enqList.length; i++) {
							for (var z = 0; z < this.enqList[i].list.length; z++) {
								for (var x = 0; x < this.data_.length; x++) {
									if(this.data_[x].listID==this.enqList[i].list[z].listID){
										this.enqList[i].list.splice(z, 1);
										this.statusCount.bid--;
									}
								}
								if(this.enqList[i].list.length<1){
									this.enqList.splice(i, 1)
								}
							}
						}
						for (var i = 0; i < this.dataList.length; i++) {
								for (var x = 0; x < this.data_.length; x++) {
									if(this.data_[x].listID==this.dataList[i].listID){
										this.dataList.splice(i, 1);
									}
								}
						}
						this.$message({
							message: '提交成功',
							type: 'success',
						});
					}else{
						this.$message({
							message: res.message,
							type: 'error',
						});
					}
				})
			},
			//确认操作
			editLis4() {
				this.$HttpRequest({
					url: '/wx/spotSale/submit_revoke',
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
					},
					method: 'post',
					data: this.data_
				}).then(res => {
					this.viewShow = false;
					if(res.success){
						for (var i = 0; i < this.enqList.length; i++) {
							for (var z = 0; z < this.enqList[i].list.length; z++) {
								for (var x = 0; x < this.data_.length; x++) {
									if(this.data_[x].listID==this.enqList[i].list[z].listID){
										this.enqList[i].list.splice(z, 1);
									}
								}
								if(this.enqList[i].list.length<1){
									this.enqList.splice(i, 1)
								}
							}
						}
						for (var i = 0; i < this.dataList.length; i++) {
								for (var x = 0; x < this.data_.length; x++) {
									if(this.data_[x].listID==this.dataList[i].listID){
										this.dataList.splice(i, 1);
									}
								}
						}
						this.$message({
							message: '提交成功',
							type: 'success',
						});
					}else{
						this.$message({
							message: res.message,
							type: 'error',
						});
					}
				})
			},
			//切换列表
			switchOrder(ind) {
				
				var status = ind;
				this.forFlag = false;
				this.loading = true;
				this.$http.post('/wx/spotSale/mySpotSalePurchase?status=' + status + '&buySell=1').then((response) => {
					this.statu = ind;
					console.log(ind)
					this.dataVal = [];
					this.dataList = [];
					this.showArr.splice(0, this.showArr.length);
					this.enqList = response.entity.list;
					this.statusCount = response.entity.statusCount;
					this.forFlag = true;
					for(var i=0;i<response.entity.list.length;i++){
						for(var z=0;z<response.entity.list[i].list.length;z++){
							var data_;
							if(response.entity.list[i].list[z].listingValidity==null){
								console.log(1)
								data_ = this.systemDate
							}else{
								data_ = this.timestampToTime(response.entity.list[i].list[z].listingValidity).substring(0, 10)
							}
							var objInx = {
								listID:response.entity.list[i].list[z].listID,
								batchID:response.entity.list[i].list[z].batchID,
								depotID:response.entity.list[i].list[z].depotID,
								depotName:response.entity.list[i].list[z].depotName,
								amount:response.entity.list[i].list[z].amount,
								packNum:response.entity.list[i].list[z].packNum,
								basisPrice:response.entity.list[i].list[z].basisPrice,
								type:response.entity.list[i].list[z].type,
								price:response.entity.list[i].list[z].price,
								notes:response.entity.list[i].list[z].notes,
								listingValidity:data_ +' 15:00:00',
								flag:false,
							}
							this.dataList.push(objInx);
						}
					}
					this.loading = false;
				})
			},
			inputValueListChild(key, value, listID, flag, batchID) {
				console.log(key, value, listID, flag);
				if(key =='listingValidity'){
					value = value + ' 15:00:00'
				}
				for (var i = 0; i < this.dataList.length; i++) {
					if (this.dataList[i]['listID'] == listID) {	
						this.dataList[i][key] = value;
						this.dataList[i]['flag'] = flag;
					}
				}
			},
		},
		//加载列表
		beforeRouteEnter(to, from, next) {
			//beforeRouteEnter中this无效，所以能用vm
			next(vm => {
				var orderId = to.params.id; //好的抓到id了
				vm.status = orderId;
				vm.loading = true;
				vm.axios.post('/wx/spotSale/mySpotSalePurchase?status=' + orderId).then((response) => {
					// console.log(response)
					vm.dataList = [];
					vm.enqList = response.entity.list;
					vm.statusCount = response.entity.statusCount;
					vm.forFlag = true
					vm.loading = false;
					for(var i=0;i<response.entity.list.length;i++){
						for(var z=0;z<response.entity.list[i].list.length;z++){
							var data_;
							if(response.entity.list[i].list[z].listingValidity==null){
								data_ = vm.systemDate
							}else{
								data_ = vm.timestampToTime(response.entity.list[i].list[z].listingValidity).substring(0, 10)
							}
							var objInx = {
								listID:response.entity.list[i].list[z].listID,
								batchID:response.entity.list[i].list[z].batchID,
								depotID:response.entity.list[i].list[z].depotID,
								depotName:response.entity.list[i].list[z].depotName,
								amount:response.entity.list[i].list[z].amount,
								packNum:response.entity.list[i].list[z].packNum,
								basisPrice:response.entity.list[i].list[z].basisPrice,
								type:response.entity.list[i].list[z].type,
								price:response.entity.list[i].list[z].price,
								listingValidity:data_,
								notes:response.entity.list[i].list[z].notes,
								// bidType:response.entity.list[i].list[z].bidType,
								// bidMinPrice:response.entity.list[i].list[z].bidMinPrice,
							}
							vm.dataList.push(objInx);
						}
					}
					vm.loading = false;
				});
			})
		},
	}
</script>

<style lang="scss">
	.top_view{
		.viewBg{position: fixed;top: 0;left: 0;bottom: 0;right: 0;background: #000000;opacity: 0.3;z-index: 99;}
		.viewCon{position: fixed;top: 30%;width: 5.6rem;background: #fff;margin: 0 auto;z-index: 99;left: 50%;margin-left: -2.8rem;padding: 0.3rem 0;text-align: center;
		input{width: 2rem;height: 0.7rem;border: none;color: #fff;font-size: 0.28rem;margin: 0.4rem 0.2rem 0 0.2rem;}
			.close{background: #009688;}
			.sure{background: #FF5722;}
		}
	}
	.enq_tab{
		height: 0.75rem;
		line-height: 0.75rem;
		span{width: 1.23rem;display: block;float: left;text-align: center;font-size: 0.3rem;color: #666666;position: relative;
			i{display: block;position: absolute;right: -0.1rem;top: 0;background: red; color:#fff;height: 0.35rem;width: 0.35rem;border-radius: 100px;line-height: 0.35rem;font-size: 0.24rem;}
		}
		span.active{color: #14BAB4;}
		span::after{content: '';display: block;width: 0.6rem;height: 0.05rem;background: #14BAB4;position: absolute;left: 0.31rem;display: none;z-index: 999;}
		span.active::after{display: block;}
		
	}
	.enqButton {
		width: 7.5rem;
		height: 1rem;
		background: rgba(234, 247, 247, 1);
		box-shadow: 0px -3px 6px 0px rgba(1, 17, 32, 0.14);
		position: fixed;
		bottom: 1rem;
		text-align: center;

		input {
			width: 7rem;
			height: 0.74rem;
			background: rgba(20, 186, 180, 1);
			border-radius: 4px;
			color: #fff;
			font-size: 0.32rem;
			border: none;
			margin-top: 0.13rem;
		}
	}
	.enqButton2{
		input {
			width: 3.4rem;
			margin: 0.13rem 0.1rem 0 0.1rem;
		}
		.close{
			background: red;
		}
	}
	.shopLi {
		margin-bottom: 0.2rem;
	}

	.shopLiTop {
		background: #fff;
		padding: 0.2rem;
		position: relative;
		.xundown{
			position: absolute;
			top: 0.55rem;
			right: 0.4rem;
			width: 0.28rem;
		}
		.shopLiImg {
			width: 0.94rem;
			height: 0.94rem;
			background-size: cover;
			background-color: #ccc;

		}

		.shopLiTxt {
			margin-left: 0.2rem;

			p {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.shopName {
				color: #333;
				font-size: 0.3rem;
			}

			.shopPhone {
				color: #666666;
				font-size: 0.29rem;

				p {
					display: inline-block;
					font-size: 0.28rem;
				}
			}

			.shopTltle {
				.shopWarp {
					position: relative;
					display: inline-block;

					.resNum {
						position: absolute;
						right: -0.9rem;
						top: 0;
						display: block;
						background: #FF874B;
						color: #fff;
						padding: 0rem 0.05rem;
					}
				}
			}
		}

	}


	p.zhishu {
		color: #fd7320;
		font-weight: bold;
		text-align: right;
		font-size: 0.32rem;
		line-height: 0.51rem;
		margin-right: 0.2rem;
	}

	p.weight_tee {
		text-align: right;
		font-size: 0.3rem;
		line-height: 0.51rem;
		margin-right: 0.2rem;

		span {
			color: #14bab4;
		}
	}

	input.dianjiaBtn {
		border: none;
		color: #fff;
		background: #14bab4;
		width: 3rem;
		height: 0.5rem;
		margin-top: 0.1rem;
		margin-left: auto;
		margin-right: auto;
		display: block;
	}

	.dianjia {
		.dianjiaBg {
			background: url(../../assets/icon/tanchu_bg.png) repeat 100% 100%;
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
		}

		.dianjiaCon {
			position: fixed;
			top: 2rem;
			background: #fff;
			left: 0;
			width: 6.5rem;
			left: 0.25rem;
			padding: 0.25rem;

			.title {
				text-align: center;
				height: 0.5rem;
				line-height: 0.5rem;
				background: #e6e0e0;
			}

			.dianjiaInx {
				height: 0.65rem;
				line-height: 0.65rem;
				border-bottom: 1px solid #ccc;

				p {
					font-size: 0.3rem;
					color: #333;
				}

				p.dianjiaBt {}

				p.fr {
					color: #999;
				}

				.radio_type_chick {
					margin-left: 0.4rem;
					margin-top: 0.1rem;
				}

				.guapan {
					width: 5rem;
				}

				.guapanNum {
					margin-left: 0.5rem;
					width: 2rem;
					margin-top: 0.1rem;
				}

				.shijia {
					margin-left: 0.9rem;
					margin-top: -0.1rem;
				}

				.data {
					background: none;
					border: none;
					height: 0.65rem;
				}
			}

			.clc_btn>input {
				width: 2.9rem;
			}
		}
	}

	.deleteSure {
		.deleteSure_bg {
			background: #000;
			opacity: 0.3;
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
		}

		.deleteSure_con {
			background: #fff;
			padding: 0.3rem 0.2rem;
			position: fixed;
			top: 25%;
			width: 5rem;
			left: 50%;
			margin-left: -2.7rem;

			.deleBot {
				text-align: center;
				margin-top: 0.4rem;

				input {
					width: 2rem;
					height: 0.5rem;
					border: 0;
					color: #fff;
					display: inline-block;
					margin: 0 0.2rem;
				}

				input.sure {
					background: #14bab4;
				}

				input.close {
					background: #fd7320;
				}
			}

			p {
				font-size: 0.3rem;
				text-align: center;
			}

		}
	}

	.bondtishi p {
		color: red;
		font-size: 12px;
		margin-bottom: 0
	}

	.havebondtishi p {
		color: red;
		font-size: 12px;
		margin-bottom: 0
	}
	.search2 {
		width: 7.1rem;
		padding: 0.2rem 0.2rem;
		background: #fff;
		display:block;
	
		.search_left {
			width: 5.76rem;
			height: 0.66rem;
			background: #F2F2F2;
	
			i {
				width: 0.8rem;
				height: 0.66rem;
				text-align: center;
	
				img {
					width: 0.27rem;
					height: 0.27rem;
					margin-top: 0.195rem;
				}
			}
	
			.search_txt {
				width: 4.9rem;
				height: 0.66rem;
				font-size: 0.3rem;
				border: none;
				background: none;
				color: #666;
			}
	
		}
	
		.search_btn {
			width: 1.24rem;
			height: 0.66rem;
			border: none;
			background: #14BAB4;
			border-radius: 0.1rem;
			margin-left: 0.1rem;
			font-size: 0.3rem;
			color: #fff;
		}
	
	}
	
</style>
