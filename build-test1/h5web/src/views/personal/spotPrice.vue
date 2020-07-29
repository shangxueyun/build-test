<template>
	<div v-loading="loading">
		
		<div class="topBack">
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>点价管理</p>
		</div>
		<div class="addHeight"></div>
		<div class="order_tab" style="top: 0.75rem;">
			<span :class="{'active':status==2}" @click="switchOrder(2)">交易中({{orderNum3}})</span>
			<span :class="{'active':status==3}" @click="switchOrder(3)">交易失败({{orderNum1}})</span>
			<span :class="{'active':status==4}" @click="switchOrder(4)">已成交({{orderNum2}})</span>
			<!-- <span :class="{'active':status==3}" @click="switchOrder(3)">待收货</span>
			<span :class="{'active':status==4}" @click="switchOrder(4)">待收票</span>
			<span :class="{'active':status==5}" @click="switchOrder(5)">已过期</span> -->
			<div class="clear"></div>
		</div>
		<div class="orderList">
			<ul>
				<li class="res_inx dian_inx" v-for="(item,index) in orderList">
					<div class="res_c" style="width: 100%;">
						<div class="res_top wrap">
							<!-- <p v-if="item.listingType==1" class="top_cla">自营</p> -->
							<p class="top_num">{{item.listing.batchID}}</p>
							<!-- <p class="top_grade">单位：元/吨</p> -->
							<p class="top_lei" style="margin-left: 0.8rem;">单位：元/吨</p>
							<p class="status_indx load fr" v-if="item.status==2">交易中</p>
							<p class="status_indx err fr" v-if="item.status==3">交易失败</p>
							<p class="status_indx success fr" v-if="item.status==4">已成交</p>
							<!-- <img style="width: 0.3rem;" class="fr" src="../../assets/img/shanchu.png" alt="" @click.stop="deleteinx(item.listID,index,item.status)"> -->
							<!-- <p class="top_date">{{item.listingDate.substring(5,11)}}</p> -->
							<div class="clear"></div>
						</div>
						<div class="res_con">
							<div>
								<span class="title" v-if="item.indexCode">{{item.indexCode}}</span>
								<span class="title" v-if="!item.indexCode">一口价</span></br>
								<!-- <span class="num" v-if="item.indexCode">{{item.listing.indexValue}}</span> -->
								<span class="num" v-if="!item.indexCode">{{item.price}}元/吨</span>
							</div><i></i>
							<div><span class="title">挂盘期货价</span></br><span v-if="item.indexCode" class="num">{{item.price}}</span><span v-if="!item.indexCode" class="num">-</span></div><i></i>
							<div>
								<span class="title">基差</span></br>
								<span v-if="item.indexCode" class="num">{{item.basisPrice}}</span>
								<span v-if="!item.indexCode" class="num">-</span>
							</div><i></i>
							<div v-if="item.status!=3"><span class="title">挂盘成交价</span></br><span class="num">{{item.price+item.basisPrice}}</span></div><i v-if="item.status!=3"></i>
							<div><span class="title">重量</span></br><span class="num">{{item.listing.pubWeight}}</span></div>
							<div class="clear"></div>
						</div>
						<div class="cang">
							<p>仓库：{{item.depotName}}</p>
							<!-- <p v-if="item.listing.listingType==1">棉联自营</p>
							<p v-if="item.listing.listingType==0">{{item.sellMemberName}}</p> -->
						</div>
						<div class="res_bot wrap" style="display: block;">
							<!-- <p class="zhishu fl" v-if="item.indexCode">{{item.indexCode}}<span v-if="item.basisPrice>=0">+</span>{{item.basisPrice}}</p> -->
							<!-- <p class="weight_one"><span>{{item.listing.pubPrice}}</span>元/吨</p> -->
							<!-- <p class="weight_two">公重<span>{{item.amount}}</span>吨</p>
							<p class="weight_tee">预计成交价：<span>{{parseInt(item.price)+parseInt(item.basisPrice)}}</span></p> -->
							<div class="clc_btn">
								<p class="fl" v-show="item.status==3||item.status==4">出价时间：{{timestampToTime(item.lastAccess).substring(5,16)}}</p><p class="fr" v-show="item.indexCode">挂牌有效期：{{item.listingValidity.substring(5,16)}}</p><div class="clear"></div>
							</div>
							<div class="clc_btn" v-if="item.status==2&&item.listing.listingType==1">
								<input type="button" value="重新出价" class="dianjiaBtn" @click="adddianjia(item,index)">
							</div>
							
							<div class="clear"></div>
						</div>
					</div>
				</li>

			</ul>
			<p v-if="!resshow" class="more_btn">{{moreText}}</p>
			<div v-if="resshow" class="noRes">
				<img src="../../assets/img/noRes.png" alt="">
				<p>您还没有提交询盘，请添加询盘</p>
			</div>
		</div>
		<div class="dianjia" v-show="dianjiaShow">
			<div class="dianjiaBg"></div>
			<div class="dianjiaCon">
				<p class="title">重新出价</p>
				<div class="dianjiaInx">
					<p class="dianjiaBt fl">批号：</p>
					<p class="batchID fl">{{batchID}}</p>
					<div class="clear"></div>
				</div>
				<div class="dianjiaInx">
					<p class="dianjiaBt fl">挂盘重量（包数）：</p>
					<p class="batchID fl">{{amount}}吨({{packNum}}包)</p>
					<div class="clear"></div>
				</div>
				<div class="dianjiaInx">
					<p class="dianjiaBt fl">挂盘合约：</p>
					<p class="batchID fl">{{indexCode}} 当前价 {{indexValue}}</p>
					<div class="clear"></div>
				</div>
				<div class="dianjiaInx" style="height: auto;">
					<p class="dianjiaBt fl">挂盘价：</p>
					<div class="guapan fl">
						<input type="radio" name="guapan" class="radio_type radio_type_chick fl" @change="priceType=0;guapanTishi=false;numTishi=true;" checked="checked">
						<input type="number" class="fl guapanNum" v-model="price" @input="price=parseInt(price)">
						<input type="radio" name="guapan" class="radio_type radio_type_chick fl" @change="priceType=1;guapanTishi=true;numTishi=false;">
						<p class="shijia fl">市价委托</p>
						<div class="clear"></div>
					</div>
					<div class="clear"></div>
					<p v-if="guapanTishi" style="font-size: 0.28rem;color: red;line-height: 0.4rem;">当市场波动剧烈、期货价格跳动较大时，市价成交将会存在较高的交易风险</p>
					<p v-if="numTishi" style="font-size: 0.28rem;color: red;line-height: 0.4rem;">挂盘价尾数必须为0或5</p>
				</div>
				<div class="dianjiaInx" style="display: none;">
					<p class="dianjiaBt fl">预估成交价：</p>
					<p class="batchID fl">{{price}}<span v-if="basisPrice>0">+</span>{{basisPrice}}={{parseInt(price)+parseInt(basisPrice)}}</p>
					<div class="clear"></div>
				</div>
				<div class="dianjiaInx">
					<div ><p class="dianjiaBt fl">挂牌有效期：</p><input type="text" class="date fl"  v-model="listingValidity" lay-key="1" id="dateList" placeholder="请选择日期"></div>
					<!-- <p class="dianjiaBt fl">挂牌有效期：</p><input type="date" class="data fl" v-model="listingValidity" :min="systemDate" :max="systemDateM"> -->
					<select class="fl" name="resTime" id="" v-model="resTime">
					    <option value="15:00:00">15:00</option>
					</select>
					<div class="clear"></div>
				</div>
				<div class="dianjiaInx">
					<p class="dianjiaBt fl">点价保证金：</p>
					<p class="Bond fl"><span style="color: red;margin-right: 0.1rem;font-size: 0.24rem;" v-if="!btnShow">(您的余额不足)</span>{{Bond}}</p>
					<div class="clear"></div>
				</div>
				<!-- <div class="bondtishi" v-if="bondtishi">
					<p>本次点价需要支付点价{{Bond}}元，请支付后再提交点价，付款账号如下：</p>
					<p>户名：上海棉联电子商务有限公司</p>
					<p>开户行：中国农业银行股份有限公司上海周浦镇支行</p>
					<p>账号：03418500040055094</p>
				</div> -->
				<div class="havebondtishi" v-if="havebondtishi" style="text-align: center;">
					<p>本次点价将扣除<span>{{Bond}}</span>元保证金</p>
				</div>
				<div class="clc_btn">
					<input type="button" class="edit" value="取消" @click="dianjiaShow=false">
					<input type="button" class="sure" value="保存" @click="saveRes()" v-if="btnShow">
					<input type="button" class="sure" value="保存" style="background: #ccc;" v-if="!btnShow">
				</div>
				<p style="margin-bottom: 0px;margin-top: 15px;font-size: 0.3rem;">历史记录</p>
				<div class="historyList" v-html="historyList"></div>
			</div>
		</div>
		<div class="dianjia dianjia2" v-show="dianjiaShow2">
			<div class="dianjiaBg"></div>
			<div class="dianjiaCon">
				<p class="title">重新出价</p>
				<div class="dianjiaInx fl">
					<p class="dianjiaBt fl">客户：</p>
					<p class="batchID fl">{{buyMemberName}}</p>
					<div class="clear"></div>
				</div>
				<div class="dianjiaInx fl">
					<p class="dianjiaBt fl">供应商：</p>
					<p class="batchID fl">{{sellMember}}</p>
					<div class="clear"></div>
				</div>
				<div class="dianjiaInx fl">
					<p class="dianjiaBt fl">批号：</p>
					<p class="batchID fl">{{batchID}}</p>
					<div class="clear"></div>
				</div>
				<div class="dianjiaInx fl">
					<p class="dianjiaBt fl">重量（包数）：</p>
					<p class="batchID fl">{{amount}}吨</p>
					<div class="clear"></div>
				</div>
				<div class="dianjiaInx fl">
					<p class="dianjiaBt fl">仓库：</p>
					<p class="batchID fl">{{resCang}}</p>
					<div class="clear"></div>
				</div>
				<div class="dianjiaInx fl">
					<p class="dianjiaBt fl">报价方式：</p>
					<p class="batchID fl" v-if="indexCode">{{indexCode}}</p>
					<p class="batchID fl" v-if="indexCode==''">一口价</p>
					<div class="clear"></div>
				</div>
				<div class="dianjiaInx fl">
					<p class="dianjiaBt fl">单价：</p>
					<p class="batchID fl">{{price}}元/吨</p>
					<div class="clear"></div>
				</div>
				<div class="dianjiaInx fl">
					<p class="dianjiaBt fl">成交总价：</p>
					<p class="batchID fl">{{allPrice}}元</p>
					<div class="clear"></div>
				</div>
				<div class="clear"></div>
				<!-- <div class="bondtishi" v-if="bondtishi">
					<p>本次点价需要支付点价{{Bond}}元，请支付后再提交点价，付款账号如下：</p>
					<p>户名：上海棉联电子商务有限公司</p>
					<p>开户行：中国农业银行股份有限公司上海周浦镇支行</p>
					<p>账号：03418500040055094</p>
				</div> -->
				<div class="clc_btn">
					<input type="button" class="edit" value="取消" @click="dianjiaShow2=false">
					<input type="button" class="sure" value="保存" @click="saveRes2()" v-if="btnShow">
					<input type="button" class="sure" value="保存" style="background: #ccc;" v-if="!btnShow">
				</div>
				<p style="margin-bottom: 0px;margin-top: 15px;font-size: 0.3rem;">历史记录</p>
				<div class="historyList" v-html="historyList"></div>
			</div>
		</div>
		<div class="deleteSure"  v-if="downPdf">
			<div class="deleteSure_bg"></div>
			<div class="deleteSure_con">
				<p>您还未与本公司签订点价协议</p>
				<div class="deleBot">
					<a class="close" href="javascript:;" @click="downPdf=false">取消</a>
					<a class="PDFLink" :href="linkHref">查看并下载点价协议</a>
				</div>
			</div>
		</div>
		<div class="deleteSure" v-if="deleteSure">
			<div class="deleteSure_bg"></div>
			<div class="deleteSure_con">
				<p>确定删除此询盘？</p>
				<div class="deleBot">
					<input type="button" value="取消" class="close" @click="deleteSure=false">
					<input type="button" value="确定" class="sure" @click="deleteThis(TopdetailsId,Topindex,Topstatus)">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import laydate from 'layui-laydate'
	export default {
		data: function() {
			return {
				date: null,
				laydate: window.laydate,
				status: 0,
				buySell: '',
				orderList: '',
				loading: true,
				totalPage: 0,
				pageCurrent: 1,
				pageNum: 1,
				moreText: '全部加载完成',
				pageflag: true,
				resshow: true,
				dianjiaShow: false,
				dianjiaShow2: false,
				buyMemberName:'',
				sellMember:'',
				resCang:'',
				allPrice:'',
				
				listID: '',
				batchID: '',
				amount: '',
				packNum: '',
				indexCode: '',
				indexValue:'',
				price: '',
				basisPrice: '',
				listingValidity: '',
				priceType: 0,
				orderNum1: '',
				orderNum2: '',
				orderNum3:'',
				TopdetailsId: '',
				Topindex: '',
				Topstatus: '',
				deleteSure: false,
				downPdf:false,
				systemDate:'',
				systemDateM:'',
				Bond:'正在获取点价保证金...',
				listInx:'',
				buyMember:'',
				buyUser:'',
				btnShow:true,
				guapanTishi:'',
				bondtishi:false,
				havebondtishi:false,
				resTime:'15:00:00',
				numTishi:true,
				linkHref:'',
				historyList:null,
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
			this.systemDate = date.year + '-' + date.month + '-'  + date.date;
			
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
				this.systemDateM = date.year + '-' + date.month + '-'  + date.date;
			//执行上拉
			window.addEventListener('scroll', this.onScroll1);
			this.$http.post('/wx/trade/mySpotSalePurchase?status=2').then((response) => {
				// console.log(response);
				this.orderNum3 = response.entity.page.totalRow;
			});
			this.$http.post('/wx/trade/mySpotSalePurchase?status=3').then((response) => {
				// console.log(response);
				this.orderNum1 = response.entity.page.totalRow;
			});
			this.$http.post('/wx/trade/mySpotSalePurchase?status=4').then((response) => {
				// console.log(response);
				this.orderNum2 = response.entity.page.totalRow;
			});
		},
		mounted() {
			this.$http.post('/wx/trade/list_my_spot_sale_purchase').then((response) => {
				console.log(response);
				// this.orderNum=response.entity;
			});
			
			
			this.$http.post('/wx/index_h5/getHoliday?breakDateMin=2019-01-01&breakDateMax=2099-01-01').then((response) => {
			            var addDay;
			            var happyDay;
			            var timeValue;
			            var timeValue2;
			            var nowDate = new Date();
			            var nowDate2 = new Date();
			            var timeFlag = false;
			            var date = {
			                year: nowDate.getFullYear(),
			                month: nowDate.getMonth() + 1,
			                date: nowDate.getDate(),
			            }
			            date.month = (date.month < 10) ? '0' + date.month : date.month = date.month;
			            date.date = (date.date < 10) ? '0' + date.date : date.date = date.date;
			            timeValue = date.year + '-' + date.month + '-'  + date.date;
			            if(nowDate2.getDay()==0){
			                addDay = 12;
			                nowDate2.setDate(nowDate2.getDate() + 5);
			            } else if(nowDate2.getDay()==1){
			                addDay = 11;
			                nowDate2.setDate(nowDate2.getDate() + 4);
			            } else if(nowDate2.getDay()==2){
			                addDay = 10;
			                nowDate2.setDate(nowDate2.getDate() + 3);
			            } else if(nowDate2.getDay()==3){
			                addDay = 9;
			                nowDate2.setDate(nowDate2.getDate() + 2);
			            } else if(nowDate2.getDay()==4){
			                addDay = 8;
			                nowDate2.setDate(nowDate2.getDate() + 1);
			            } else if(nowDate2.getDay()==5){
			                addDay = 7;
			                nowDate2.setDate(nowDate2.getDate() + 7);
			            } else if(nowDate2.getDay()==6){
			                addDay = 13;
			                nowDate2.setDate(nowDate2.getDate() + 6);
			            }
			            var date2 = {
			                year: nowDate2.getFullYear(),
			                month: nowDate2.getMonth() + 1,
			                date: nowDate2.getDate(),
			            }
			            date2.month = (date2.month < 10) ? '0' + date2.month : date2.month = date2.month;
			            date2.date = (date2.date < 10) ? '0' + date2.date : date2.date = date2.date;
			            timeValue2 = date2.year + '-' + date2.month + '-'  + date2.date;
						this.listingValidity = timeValue2;
			            happyDay=response.data;
			            for(const day in happyDay){
			                if(timeValue2==day){
			                    timeFlag = true;
			                }
			            }
			            if(timeFlag){
			                if(nowDate2.getDay()==0){
			                    nowDate2.setDate(nowDate2.getDate() + 12);
			                } else if(nowDate2.getDay()==1){
			                    nowDate2.setDate(nowDate2.getDate() + 11);
			                } else if(nowDate2.getDay()==2){
			                    nowDate2.setDate(nowDate2.getDate() + 10);
			                } else if(nowDate2.getDay()==3){
			                    nowDate2.setDate(nowDate2.getDate() + 9);
			                } else if(nowDate2.getDay()==4){
			                    nowDate2.setDate(nowDate2.getDate() + 8);
			                } else if(nowDate2.getDay()==5){
			                    nowDate2.setDate(nowDate2.getDate() + 7);
			                } else if(nowDate2.getDay()==6){
			                    nowDate2.setDate(nowDate2.getDate() + 13);
			                }
			                date2 = {
			                    year: nowDate2.getFullYear(),
			                    month: nowDate2.getMonth() + 1,
			                    date: nowDate2.getDate(),
			                }
			                date2.month = (date2.month < 10) ? '0' + date2.month : date2.month = date2.month;
			                date2.date = (date2.date < 10) ? '0' + date2.date : date2.date = date2.date;
			                timeValue2 = date2.year + '-' + date2.month + '-'  + date2.date;
							this.listingValidity = timeValue2;
							
			            }
						// console.log(timeValue2)
						
			            lay('#version').html('-v'+ laydate.v);
			            //执行一个laydate实例
			            // laydate.render({
			            //     elem: '#test2', //指定元素
			            //     min: 0,
			            //     max: addDay,
			            //     value:timeValue2,
			            //     mark: happyDay,
			            //     ready: function(date){
			            //         // $('.laydate-day-mark').parent().addClass('laydate-disabled');
			            //     },
			            //     change: function(){
			            //         // $('.laydate-day-mark').parent().addClass('laydate-disabled');
			            //     }
			            // })
						
						laydate.render({
						  elem: '#dateList',
						  min: 0,
						  max: addDay,
						  value:timeValue2,
						  mark: happyDay,
						  trigger: 'click',
						  position: 'fixed',
						  ready: function(date){
						          console.log(2)
						  },
						      // change: function(){
						      //   console.log(2)
						      // },
						})
						
			})
		},

		methods: {
			// 时间戳转换
			timestampToTime (cjsj) {
			        var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
					
			        var Y = date.getFullYear() + '/'
			        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/'
			        var D = (date.getDate()+1 < 10 ? '0'+(date.getDate()+1) : date.getDate()+1) + ' '
			        var h = date.getHours() + ':'
			        var m = date.getMinutes() + ':'
			        var s = date.getSeconds()
			        return Y+M+D+h+m+s
			    },
			//切换列表
			switchOrder(i) {
				this.status = i;
				this.loading = true;
				this.pageCurrent = 1;
				this.pageNum = 1;
				this.$http.post('/wx/trade/mySpotSalePurchase?status=' + this.status + '&buySell=1').then((response) => {
					this.$http.post('/wx/trade/mySpotSalePurchase?status=2').then((response) => {
						// console.log(response);
						this.orderNum3 = response.entity.page.totalRow;
					});
					this.$http.post('/wx/trade/mySpotSalePurchase?status=3').then((response) => {
						// console.log(response);
						this.orderNum1 = response.entity.page.totalRow;
					});
					this.$http.post('/wx/trade/mySpotSalePurchase?status=4').then((response) => {
						// console.log(response);
						this.orderNum2 = response.entity.page.totalRow;
					});
					this.orderList = response.entity.page.list;
					this.totalPage = response.entity.page.totalPage;
					if (response.entity.page.totalRow == 0) {
						this.resshow = true;
					} else {
						this.resshow = false;
					}
					// console.log(response);
					this.loading = false;
				})
			},
			//前往详情
			godetails(item_) {
				this.$router.push({
					name: 'orderDetail',
					params: {
						id: item_.orderID
					}
				});
			},
			//上拉加载更多
			onScroll1() {
				let innerHeight = document.querySelector('#app').clientHeight;
				let outerHeight = document.documentElement.clientHeight;
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				// console.log(innerHeight + " " + outerHeight + " " + scrollTop);
				if (innerHeight < (outerHeight + scrollTop + 100)) {

					if (this.pageCurrent < this.totalPage && this.pageflag == true) {
						this.pageflag = false;
						this.pageNum = this.pageNum + 1;
						this.loading = true;
						this.$http.post('/wx/trade/mySpotSalePurchase?status=' + this.status + '&page=' + this.pageNum + '&buySell=1').then(
							(response) => {
								// console.log(response);
								let ListTest = response.entity.page.list;
								this.totalPage = response.entity.page.totalPage;
								this.pageCurrent = response.entity.page.pageCurrent;
								this.orderList = this.orderList.concat(ListTest);
								this.loading = false;
								this.pageflag = true;
							})
						this.moreText = "下拉加载更多";

					} else if (this.pageCurrent >= this.totalPage) {
						this.moreText = "全部加载完成"
					}

				}
			},
			deleteinx(detailsId, index, status) {
				this.TopdetailsId = detailsId;
				this.Topindex = index;
				this.Topstatus = status;
				this.deleteSure = true;

			},
			deleteThis(detailsId, index, status) {
				this.$http.post('/wx/trade/editSpotSale?listID=' + detailsId + '&status=9').then(
					(response) => {
						if (response.success) {
							this.orderList.splice(index, 1);
							if (status == 0) {
								this.orderNum1 = this.orderNum1 - 1;
							} else {
								this.orderNum2 = this.orderNum2 - 1;
							}
							if (this.orderList.length == 0) {
								this.resshow = true;
							} else {
								this.resshow = false;
							}
							this.deleteSure = false;
							this.$message({
								showClose: true,
								message: '删除成功',
								type: 'success'
							});
						}

					})
			},
			adddianjia(item,index) {
				this.listInx=index;
				this.buyMemberName = item.buyMemberName;
				this.sellMember = item.sellMemberName;
				this.resCang = item.depotName;
				this.allPrice = item.amount*item.price;
				this.listID = item.listID;
				this.batchID = item.batchID;
				this.amount = item.amount;
				this.packNum = item.packNum;
				this.indexCode = item.indexCode;
				this.indexValue = item.listing.indexValue;
				this.price = item.price;
				this.basisPrice = item.basisPrice;
				this.buyMember = item.buyMember;
				this.buyUser = item.buyUser;
				
				// this.listingValidity=item.listingValidity;
				// this.dianjiaShow = true;
				this.$http.post('/wx/trade/getListingType?listID='+this.listID).then((response) => {
					if(response.entity==1){
						this.dianjiaShow = true;
						this.getHistory(this.listID);
						// this.$http.post('/wx/user/isAgreement?useriId='+this.buyUser).then((response) => {
						// 	if(response.entity.isAgreement==0){
						// 		this.downPdf=true;
						// 		this.linkHref = 'https://test.unioncotton.com/wx/trade/exportSpotAgreement?listID='+this.listID;
						// 	} else{
						// 		this.downPdf=false;
						// 		this.dianjiaShow = true;
						// 		
						// 	}
						// });
					}else if(response.entity==0){
						this.$message({
							showClose: true,
							message: '您好:此点价资源为店铺所属，请联系平台客服或者店铺业务人员，谢谢！',
							type: 'error'
						});
					}else if(response.entity==3){
						this.$message({
							showClose: true,
							message: '您好:此点价资源为店铺所属，请联系平台客服或者店铺业务人员，谢谢！',
							type: 'error'
						});
					}else if(response.entity==2){
						// this.$message({
						// 	showClose: true,
						// 	message: '您好:您选择的资源为一口价，如需操作，请联系平台客服或者与您对接的业务人员，谢谢！',
						// 	type: 'error'
						// });
						this.dianjiaShow = true;
						this.getHistory(this.listID);
					}
					
					
				});
				// this.$http.post('/wx/trade/queryPreInBalance?buyMember='+this.buyMember+'&spotId='+this.listID).then((response) => {
				// 	console.log(response);
				// 	this.Bond = response.entity.spotMoney;
				// 	let _entity = response.entity;
				// 	
				// 	if (_entity.preInBalance >= (_entity.spotMoney - _entity.buySpotMoney)) {
				// 		this.btnShow = true;
				// 		this.bondtishi = false;
				// 		this.havebondtishi = true;
				// 	} else{
				// 		this.btnShow = false;
				// 		this.bondtishi = true;
				// 		this.havebondtishi = false;
				// 	}
				// });
			},
			saveRes(index) {
				var num = index;
				if (this.listingValidity) {
					var price;
					if(this.priceType==0){
						price = this.price;
					}else{
						price = 0
					}
					this.$http.post('/wx/trade/editSpotSale?listID=' + this.listID + '&status=2' + '&priceType=' + this.priceType + '&listingValidity=' + this.listingValidity+' '+this.resTime+'&price=' + price).then(
						(response) => {
							console.log(response);
							if (response.success) {
								this.orderList[this.listInx].price = this.price;
								// this.orderNum1 = this.orderNum1 - 1;
								// this.orderNum2 = this.orderNum2 - 1;
								this.dianjiaShow = false;
								this.$message({
									showClose: true,
									message: '提交成功',
									type: 'success'
								});

							} else {
								this.$message({
									showClose: true,
									message: response.message,
									type: 'error'
								});
							}
						})
				} else {
					this.$message({
						showClose: true,
						message: '请选择挂牌有效期',
						type: 'error'
					});
				}

			},
			saveRes2() {
					this.$http.post('/wx/trade/editSpotSale?listID=' + this.listID + '&status=4').then(
						(response) => {
							console.log(response);
							if (response.success) {
								// this.orderNum1 = this.orderNum1 - 1;
								// this.orderNum2 = this.orderNum2 - 1;
								this.dianjiaShow2 = false;
								this.$message({
									showClose: true,
									message: '提交成功',
									type: 'success'
								});
			
							} else {
								this.$message({
									showClose: true,
									message: response.message,
									type: 'error'
								});
							}
						})
				
			},
			getHistory(listID) {
			        this.$http.post('/wx//trade/history?listID='+listID).then(
						(res) => {
			                var html_ = '';
			                var list_ = res.data.list;
			                var listData = res.data;
			
			                if(list_.length>0){
			                    for (var i=0;i<list_.length;i++){
			                        var listUpInx = list_[i];
			                        // console.log(list_[i].type);
			                        html_+='<p>';
			                        if(list_[i].type == '0' || list_[i].type == '2' || list_[i].type == '6'){
			                            html_+=list_[i].depotName;
			                        }
			                        if(list_[i].makeTime >0){
			                            html_+='('+this.formatDateTime(list_[i].makeTime)+')'
			                        }
			                        if(list_[i].type == '0'){
			                            html_+='提交询盘，询盘批次'+listData.batchID+',基差'+list_[i].basisPrice+'元/吨，仓库是'+list_[i].depotName+',询盘重量是'+list_[i].amount+'吨,件数是'+list_[i].packNum+'包。'
			
			                        }
			                        if(list_[i].type == '10'){
			                            html_+='询盘修改，'
			                            if(listUpInx.basisPrice!=null&&list_[i].basisPrice!=listUpInx.basisPrice){
			                                html_+= '基差由'+listUpInx.basisPrice+'元/吨 改为'+list_[i].basisPrice+'元/吨，'
			                            }else {
			                                html_+= '基差'+list_[i].basisPrice+'元/吨，'
			                            }
			                            if(listUpInx.depotName!=null&&list_[i].depotName!=listUpInx.depotName){
			                                html_+= '仓库由'+listUpInx.depotName+' 改为'+list_[i].depotName+'，'
			                            }else {
			                                html_+= '仓库'+list_[i].depotName+'，'
			                            }
			                            if(listUpInx.amount!=null&&list_[i].amount!=listUpInx.amount){
			                                html_+= '询盘重量由'+listUpInx.amount+'吨 改为'+list_[i].amount+'吨，'
			                            }else {
			                                html_+= '询盘重量'+list_[i].amount+'吨，'
			                            }
			                            if(listUpInx.packNum!=null&&list_[i].packNum!=listUpInx.packNum){
			                                html_+= '件数由'+listUpInx.packNum+'包 改为'+list_[i].packNum+'包，'
			                            }else {
			                                html_+= '件数'+list_[i].packNum+'包，'
			                            }
			                            if(listUpInx.notes!=null&&list_[i].notes!=listUpInx.notes){
			                                html_+= '询盘备注'+listUpInx.notes+'改为'+list_[i].notes+'，'
			                            }else {
			                                html_+= '询盘备注'+list_[i].notes+'，'
			                            }
			                        }
			                        if(list_[i].type == '1'){
			                            html_+='确认询盘，'
			                            if(listUpInx.basisPrice!=null&&list_[i].basisPrice!=listUpInx.basisPrice){
			                                html_+= '基差由'+listUpInx.basisPrice+'元/吨 改为'+list_[i].basisPrice+'元/吨，'
			                            }else {
			                                html_+= '基差'+list_[i].basisPrice+'元/吨，'
			                            }
			                            if(listUpInx.depotName!=null&&list_[i].depotName!=listUpInx.depotName){
			                                html_+= '仓库由'+listUpInx.depotName+' 改为'+list_[i].depotName+'，'
			                            }else {
			                                html_+= '仓库'+list_[i].depotName+'，'
			                            }
			                            if(listUpInx.amount!=null&&list_[i].amount!=listUpInx.amount){
			                                html_+= '询盘重量由'+listUpInx.amount+'吨 改为'+list_[i].amount+'吨，'
			                            }else {
			                                html_+= '询盘重量'+list_[i].amount+'吨，'
			                            }
			                            if(listUpInx.packNum!=null&&list_[i].packNum!=listUpInx.packNum){
			                                html_+= '件数由'+listUpInx.packNum+'包 改为'+list_[i].packNum+'包，'
			                            }else {
			                                html_+= '件数'+list_[i].packNum+'包，'
			                            }
			                            if(listUpInx.notes!=null&&list_[i].notes!=listUpInx.notes){
			                                html_+= '询盘备注'+listUpInx.notes+'改为'+list_[i].notes+'，'
			                            }else {
			                                html_+= '询盘备注'+list_[i].notes+'，'
			                            }
			                        }
			                        if(list_[i].type == '2'){
			                            if(list_[i].priceType == 1){
			                                html_+= '提交点价， 市价委托，挂盘期限:'+listData.listingValidity+'。'
			                            }else {
			                                html_+= '提交点价，出价'+list_[i].price+'元/吨，挂盘期限:'+listData.listingValidity+'。'
			                            }
			                        }
			                        if(list_[i].type == '3'){
			                            if(list_[i].handleType == '0'){
			                                html_+= '已挂盘，挂盘期货价'+list_[i].price+'元/吨。'
			                            }else if(list_[i].handleType == '1'){
			                                html_+= '竞价中，至少加价'+list_[i].addPrice+'元。'
			                            }else if(list_[i].handleType == '2'){
			                                html_+= '已成交，成交价为'+list_[i].price+'元/吨。'
			                            }else if(list_[i].handleType == '3'){
			                                html_+= '已售出，请挑选其他合适资源。'
			                            }else if(list_[i].handleType == '4'){
			                                html_+= '已撤销，请挑选其他合适资源。'
			                            }else if(list_[i].handleType == '5'){
			                                html_+= '竞价中，当前挂盘期货价'+list_[i].price+'元/吨，至少加价'+list_[i].addPrice+'元。'
			                            }
			                        }
			                        if(list_[i].type == '4'){
			                            html_+= '点价成功，挂盘期货价为'+list_[i].price+'元/吨。'
			                        }
			                        if(list_[i].type == '5'){
			                            html_+='点价失败，该批次'
			                            if(list_[i].handleType == '3'){
			                                html_+='已售出，请挑选其他合适资源。'
			                            } else if(list_[i].handleType == '4'){
			                                html_+='已撤销，请挑选其他合适资源。'
			                            }
			                        }
			                        if(list_[i].type == '6'){
			                            html_+= '客户点价金转入'+list_[i].price+'元。'
			                        }
			                        if(list_[i].type == '7'){
			                            html_+= '客户点价金返还'+list_[i].price+'元。'
			                        }
			                        if(list_[i].type == '8'){
			                            html_+= '供应商点价金转入'+list_[i].price+'元。'
			                        }
			                        if(list_[i].type == '9'){
			                            html_+= '供应商点价金返还'+list_[i].price+'元。'
			                        }
			                        if(list_[i].type == '11'){
			                            html_+= '一口价资源确认成单，确认价格'+list_[i].price+'元/吨。'
			                        }
			                        html_+='</p>';
			                    }
			                }else {
			                    html_='<p>暂无处理信息</p>';
			                }
			                this.historyList = html_;
			        });
			    },
				formatDateTime(inputTime) {
				        var date = new Date(inputTime);
				        var y = date.getFullYear();
				        var m = date.getMonth() + 1;
				        m = m < 10 ? ('0' + m) : m;
				        var d = date.getDate();
				        d = d < 10 ? ('0' + d) : d;
				        var h = date.getHours();
				        h = h < 10 ? ('0' + h) : h;
				        var minute = date.getMinutes();
				        var second = date.getSeconds();
				        minute = minute < 10 ? ('0' + minute) : minute;
				        second = second < 10 ? ('0' + second) : second;
				        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
				},
		},
		//加载列表
		beforeRouteEnter(to, from, next) {
			//beforeRouteEnter中this无效，所以能用vm
			next(vm => {
				var orderId = to.params.id; //好的抓到id了
				vm.status = orderId;
				vm.axios.post('/wx/trade/mySpotSalePurchase?status=' + orderId).then((response) => {
					// console.log(response)
					vm.orderList = response.entity.page.list;
					vm.totalPage = response.entity.page.totalPage;
					vm.pageCurrent = response.entity.page.pageCurrent;
					if (response.entity.page.totalRow == 0) {
						vm.resshow = true;
					} else {
						vm.resshow = false;
					}
					if (response.entity.page.totalPage == 1) {
						vm.moreText = "全部加载完成"
					} else {
						vm.moreText = "下拉加载更多"
					}
					vm.loading = false;
				});
			})
		},
	}
</script>

<style lang="scss">
	.dian_inx{
		.res_con{
			div{width: 1.2rem;}	
		} 
	}
	p.zhishu {
		color: #fd7320;
		font-weight: bold;
		text-align: right;
		font-size: 0.3rem;
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
			top: 1.5rem;
			background: #fff;
			left: 0;
			width: 6.5rem;
			left: 0.25rem;
			padding: 0.25rem;
			border-radius: 0.2rem;
			
			.title {
				text-align: left;
				height: 0.5rem;
				line-height: 0.5rem;
				background: #fff;
				border-bottom: 1px solid #eaeaea;
				font-size: 0.32rem;
			}

			.dianjiaInx {
				height: 0.8rem;
				line-height: 0.8rem;
				border-bottom: none;

				p {
					font-size: 0.3rem;
					color: #333;
				}

				p.dianjiaBt {color: #999999;}

				p.fr {
					color: #999;
				}

				.radio_type_chick {
					margin-left: 0.2rem;
					margin-top: 0.1rem;
				}

				.guapan {
					width: 5rem;
					input[type="radio"]{margin-top: 0.18rem;}
				}

				.guapanNum {
					margin-left: 0.5rem;
					width: 2rem;
					margin-top: 0.1rem;
					font-size: 0.3rem;
				}
				.shijia {
					margin-left: 0.9rem;
					margin-top: -0.23rem;
				}
				.guapanNum{
					background: none;
					border: 1px solid #e6e6e6;
					height: 0.55rem;
					margin-top: 0.1rem;
				}
				.data {
					background: none;
					border: 1px solid #e6e6e6;
					height: 0.55rem;
					width: 2.5rem;
					margin-top: 0.1rem;
				}
				select {
					margin-left: 0.1rem;
					background: none;
					border: 1px solid #e6e6e6;
					height: 0.57rem;
					width: 1.5rem;
					margin-top: 0.1rem;
					font-size: 0.3rem;
				}
			}
			.clc_btn{text-align: center;margin-top: 0.1rem;}
			.clc_btn>input {
				width: 2.8rem;
				border-radius: 1rem;
				font-size: 0.3rem;
			}
			.edit{background: #edf0f0;color: #999999;}
			.sure{background: #14bab4;}
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
				a {
					width: 2rem;
					height: 0.5rem;
					border: 0;
					color: #fff;
					display: inline-block;
					margin: 0 0.15rem;
					line-height: 0.5rem;
				}
				input.sure {
					background: #14bab4;
				}
				
				input.close {
					background: #fd7320;
				}
				a.PDFLink {
					background: #14bab4;
					width: 3rem;
				}
				
				a.close {
					width: 1.3rem;
					background: #fd7320;
				}
			}

			p {
				font-size: 0.3rem;
				text-align: center;
			}
			
		}
	}
	.dianjia2{
		.dianjiaInx{min-width: 3.2rem;}
	}
	.status_indx{margin-left: 0.5rem;margin-right: 0.1rem;}
	.status_indx.load{color: #fd7320;}
	.status_indx.err{color: red;}
	.status_indx.success{color: #14bab4;}
	.bondtishi p{color: red;font-size: 12px; margin-bottom: 0}
    .havebondtishi p{color: red;font-size: 12px; margin-bottom: 0}
	#dateList{width: 2.6rem;height: 0.53rem;border: 1px solid #ccc;margin-left: 0.1rem;margin-top: 0.1rem;padding-left: 0.1rem;font-size: 0.3rem;}
	.historyList{height: 2rem;overflow-y: scroll;width: auto;background: #e9e9e9;font-size:0.3rem;padding:0.2rem;
		p{margin-bottom: 0.1rem;}
	}
</style>
