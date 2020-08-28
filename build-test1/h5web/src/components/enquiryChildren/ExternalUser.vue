<template>
	<div style="padding-bottom: 3rem;" v-loading="loading">
		<div class="topBack">
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>客户询盘</p>
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
		<div class="shopLi" v-for="(item,index) in enqList" :key="index">
			<div class="shopLiTop" @click="showHide(index)">
				<div class="shopLiImg fl" :style="{backgroundImage: 'url(https://mob.unioncotton.com/#/api/resources?p=publish&k=' + item.picCorpLogo + ')'}"></div>
				<div class="shopLiTxt fl">
					<div class="shopTltle">
						<div class="shopWarp">
							<p class="shopName" style="max-width: 4.2rem;">{{item.corpNameFull}}</p>
							<span class="resNum">{{item.list.length}}批</span>
						</div>
					</div>
					<!-- <div class="shopPhone">
						<p style="max-width: 3rem;" v-if='item.contactsMap'>联系人:{{item.contactsMap[Object.keys(item.contactsMap)[0]]}}</p>
						<p style="margin-left: 0.2rem;" v-if='item.contactsMap'>电话:{{Object.keys(item.contactsMap)[0]}}</p>
					</div> -->
				</div>
				<img class="xundown" v-show='showArr.indexOf(index)!=-1' src="../../assets/img/xundown.png" alt="">
				<img class="xundown" v-show='showArr.indexOf(index)==-1' src="../../assets/img/xunup.png" alt="">
				<div class="clear"></div>
			</div>
			<div class="shopBot" v-show='showArr.indexOf(index)==-1' v-if="forFlag">
				<ListChildInx
					v-for="(itemLi,key) in item.list"
					v-model="item.list"
					:key="itemLi.listID"
					:purchasing="2"
					:listKey="key"
					@inputValueListChild="inputValueListChild"
					:listStatus="Number(statu)"
					:disableTime="disableTime"
					:permissionMenu="permissionMenu"
				></ListChildInx>
			</div>

		</div>
		<div v-if="enqList==''" class="noRes">
			<img src="../../assets/img/noRes.png" alt="">
			<p>当前状态销售询盘为空</p>
		</div>
		<div class="enqButton" v-show="statu==0&&enqList.length>0">
			<input type="button" value="确认询盘信息" @click="sureUpList()">
		</div>
		<div class="enqButton" v-show="statu==1&&enqList.length>0">
			<input type="button" value="发送备注信息" @click="sureUpList()">
		</div>
		<div class="enqButton" v-show="statu==2&&enqList.length>0">
			<input type="button" value="回复询盘" @click="sureUpList()">
		</div>
		<div class="enqButton" v-show="statu==3&&enqList.length>0">
			<input type="button" value="确认保存" @click="sureUpList()">
		</div>
		<div class="top_view" v-if="viewShow">
			<div class="viewBg"></div>
			<div class="viewCon">
				<p class="view_tlt">确认提交当前选择询盘？</p>
				<div>
					<input type="button" value="取消" class="close" @click="viewShow = !viewShow">
					<input type="button" value="确定" class="sure" v-show="statu==0" @click="editLis1()">
					<input type="button" value="确定" class="sure" v-show="statu==1" @click="editLis2()">
					<input type="button" value="确定" class="sure" v-show="statu==2" @click="editLis3()">
					<input type="button" value="确定" class="sure" v-show="statu==3" @click="editLis4()">
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
				viewShow:false,
				data_:[],
				
			}
		},

		created() {
			this.$http.post('/wx/index_h5/getHoliday?breakDateMin=2019-01-01&breakDateMax=2099-01-01').then((response) => {
				this.disableTime = response.data
			})
		},
		props:{
			status: [String, Number],
			permissionMenu: [String, Number],
		},
		mounted() {
			this.switchOrder(this.status)
		},
		methods: {
			getNumber(){
				this.$http.post('/wx/admin/spotSale/mySpotSaleOrder?status=' + this.statu+'&pageSize=1000').then((response) => {
					this.statusCount = response.entity.statusCount;
				})
			},
			getsearch(){
				var status = this.statu;
				this.forFlag = false;
				this.loading = true;
				this.$http.post('/wx/admin/spotSale/mySpotSaleOrder?status=' + status + '&search='+this.searchTxt+'&pageSize=1000').then((response) => {
					this.dataVal = [];
					this.dataList = [];
					this.showArr.splice(0, this.showArr.length);
					this.enqList = response.entity.list;
					this.forFlag = true;
					for(var i=0;i<response.entity.list.length;i++){
						for(var z=0;z<response.entity.list[i].list.length;z++){
							var data_;
							if(response.entity.list[i].list[z].listingValidity==null){
								data_ = ''
							}else{
								data_ = this.timestampToTime(response.entity.list[i].list[z].listingValidity).substring(0, 10)+' 15:00:00'
							}
							var objInx = {
								listID:response.entity.list[i].list[z].listID,
								batchID:response.entity.list[i].list[z].batchID,
								depotID:response.entity.list[i].list[z].depotID,
								depotName:response.entity.list[i].list[z].depotName,
								amount:response.entity.list[i].list[z].amount,
								packNum:response.entity.list[i].list[z].packNum,
								supBasisPrice:response.entity.list[i].list[z].supBasisPrice,
								platePrice: response.entity.list[i].list[z].platePrice ? response.entity.list[i].list[z].platePrice : response.entity.list[i].list[z].price,
								type:response.entity.list[i].list[z].type,
								price:response.entity.list[i].list[z].price,
								notes:response.entity.list[i].list[z].notes,
								listingValidity:data_,
								flag:false,
							}
							this.dataList.push(objInx);
						}
					}
					this.loading = false;
				})
			},
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
			//确认询盘信息
			editLis1() {
				this.$HttpRequest({
					url: '/wx/admin/spotSale/confirm',
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
					},
					method: 'post',
					data: this.data_
				}).then(res => {
					this.viewShow = false;
					if(res.success){
						this.getNumber();
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
			//发送备注信息
			editLis2() {
				this.$HttpRequest({
					url: '/wx/admin/spotSale/send_notes',
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
					},
					method: 'post',
					data: this.data_
				}).then(res => {
					this.viewShow = false;
					if(res.success){
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
			//回复询盘
			editLis3() {
				this.$HttpRequest({
					url: '/wx/admin/spotSale/submit_replay',
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
					},
					method: 'post',
					data: this.data_
				}).then(res => {
					this.viewShow = false;
					if(res.success){
						this.getNumber();
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
			//确认保存
			editLis4() {
				debugger
				this.$HttpRequest({
					url: '/wx/admin/spotSale/save_hanging_dish',
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
					},
					method: 'post',
					data: this.data_
				}).then(res => {
					this.viewShow = false;
					if(res.success){
						this.getNumber();
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
				this.$http.post('/wx/admin/spotSale/mySpotSaleOrder?status=' + status+'&pageSize=1000').then((response) => {
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
								data_ = ''
							}else{
								data_ = this.timestampToTime(response.entity.list[i].list[z].listingValidity).substring(0, 10)+' 15:00:00'
							}
							var objInx = {
								listID:response.entity.list[i].list[z].listID,
								batchID:response.entity.list[i].list[z].batchID,
								depotID:response.entity.list[i].list[z].depotID,
								depotName:response.entity.list[i].list[z].depotName,
								amount:response.entity.list[i].list[z].amount,
								packNum:response.entity.list[i].list[z].packNum,
								supBasisPrice:response.entity.list[i].list[z].supBasisPrice,
								platePrice: response.entity.list[i].list[z].platePrice ? response.entity.list[i].list[z].platePrice : response.entity.list[i].list[z].price,
								type:response.entity.list[i].list[z].type,
								price:response.entity.list[i].list[z].price,
								notes:response.entity.list[i].list[z].notes,
								listingValidity:data_,
								flag:false,
							}
							this.dataList.push(objInx);
						}
					}
					this.loading = false;
				})
			},
			inputValueListChild(key, value, listID, flag, batchID) {
				for (var i = 0; i < this.dataList.length; i++) {
					if (this.dataList[i]['listID'] == listID) {
						console.log(key, value, listID, flag);
						this.dataList[i][key] = value;
						this.dataList[i]['flag'] = flag;
						console.log(this.dataList);
					}
				}
			},
		}
	}
</script>
