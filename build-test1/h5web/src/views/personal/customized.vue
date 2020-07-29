<template>
	<div class="customized option_wrap" v-loading="loading">
		<div class="topBack" >
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>添加定制需求</p>
		</div>
		<div class="addHeight"></div>
		<div class="option_screen">
			<div class="opt_con" @scroll="hidSee">
				<div>
					<p class="save_title">类型:</p>
					<span v-for="(item,index) in lx_items_list" :class="{'active':item.flag}" @click="addparams(item.filter,item.value,index,1)">{{item.name}}</span>
				</div>
				<div>
					<p class="save_title">颜色级:</p>
					<span v-for="(item,index) in ysj_items_list" :class="{'active':item.flag}" @click="addparams(item.filter,item.value,index,2)">{{item.name}}</span>
				</div>
				<div>
					<p class="save_title">存放地:</p>
					<span v-for="(item,index) in address_list" :class="{'active':item.flag}" @click="addparams(item.filter,item.value,index,3)">{{item.name}}</span>
				</div>
			
				<div class="opt_cla">
					<p class="bt fl">棉花类型：</p>
					<div class="cla_btn fl">
						<span v-for="(item,index) in mhlx_items_list" :class="{'active':item.flag}" @click="addparams(item.filter,item.value,index,4)">{{item.name}}</span>
					</div>
					<div class="clear"></div>
				</div>
				<div class="opt_cla">
					<p class="bt fl">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：</p>
					<div class="cla_btn fl">
						<span v-for="(item,index) in Data_list" :class="{'active':item.flag}" @click="addparams(item.filter,item.value,index,5)">{{item.name}}</span>
					</div>
					<div class="clear"></div>
				</div>
				<div class="opt_slide">
					<p class="slide_bt fl">长度</p>
					<div class="block slide_block fl" @touchstart="showtool('show1')" @touchend="addparams">
						<el-slider v-model="value" range :min="250" :max="400" :marks="marks" :format-tooltip="formatTooltip"
						 :show-tooltip="isSee1">
						</el-slider>
					</div>
					<div class="clear"></div>
				</div>
				<div class="opt_slide">
					<p class="slide_bt fl">强力</p>
					<div class="block slide_block fl" @touchstart="showtool('show2')" @touchend="addparams">
						<el-slider v-model="value2" range :min="210" :max="400" :marks="marks2" :format-tooltip="formatTooltip"
						 :show-tooltip="isSee2">
						</el-slider>
					</div>
					<div class="clear"></div>
				</div>
				<div class="opt_slide">
					<p class="slide_bt fl">马值</p>
					<div class="block slide_block fl" @touchstart="showtool('show3')" @touchend="addparams">
						<el-slider v-model="value3" range :min="20" :max="65" :marks="marks3" :format-tooltip="formatTooltip"
						 :show-tooltip="isSee3">
						</el-slider>
					</div>
					<div class="clear"></div>
				</div>
				<div class="opt_slide">
					<p class="slide_bt fl">含杂</p>
					<div class="block slide_block fl" @touchstart="showtool('show4')" @touchend="addparams">
						<el-slider v-model="value4" range :min="0" :max="60" :marks="marks4" :format-tooltip="formatTooltip"
						 :show-tooltip="isSee4">
						</el-slider>
					</div>
					<div class="clear"></div>
				</div>
				<div class="opt_slide">
					<p class="slide_bt fl">回潮</p>
					<div class="block slide_block fl" @touchstart="showtool('show5')" @touchend="addparams">
						<el-slider v-model="value5" range :min="0" :max="150" :marks="marks5" :format-tooltip="formatTooltip"
						 :show-tooltip="isSee5">
						</el-slider>
					</div>
					<div class="clear"></div>
				</div>
				<div class="opt_slide dan">
					<p class="slide_bt fl">整齐度</p>
					<div class="block slide_block fl" @touchstart="showtool('show6')" @touchend="addparams">
						<el-slider v-model="value6" range :min="700" :max="1000" :marks="marks6" :format-tooltip="formatTooltip"
						 :show-tooltip="isSee6">
						</el-slider>
					</div>
					<div class="clear"></div>
				</div>
				<!-- <div class="opt_slide">
					<p class="slide_bt fl">长度整齐度</p>
					<div class="block slide_block fl">
						<el-slider v-model="value6" range :min="77" :max="99" :show-tooltip="isSee">
						</el-slider>
					</div>
					<div class="clear"></div>
				</div> -->
			</div>
			<div class="slide_click">
				<input class="wancheng" id="wancheng" type="button" value="确定筛选" @click="addparams('noshow')" v-show="false">
				<input class="chongzhi" type="button" value="点击重置" @click="clearSelect">
				<input class="wancheng" type="button" value="添加到定制需求" @click="save_top">
			</div>
		</div>
		<div class="saveName" v-if="save_show">
			<div class="saveName_bg"></div>
			<div class="saveName_con">
				<p>请为您定制的需求命名吧</p>
				<input type="text" id='save_txt' class="saveName_txt" v-model="saveName">
				<div class="save_b">
					<input type="button" class="saveName_sure" value="保存" @click="add_history">
					<input type="button" class="saveName_close" value="取消" @click="save_show=false;saveName ='';">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data:function(){
			return{
				customizedList:'',
				optActive: '',
				warehouseList: '',
				loading: true,
				ifAsc: true,
				asc: 'desc',
				isSee1: false,
				isSee2: false,
				isSee3: false,
				isSee4: false,
				isSee5: false,
				isSee6: false,
				lx_items_list: [{
						id: 0,
						name: '不限',
						flag: true,
						filter: '',
						value: ''
					}, /* { id: 1, name: '自营', flag: false, filter: 'listingType', value: 1 }, { id: 2, name: '非自营', flag: false, filter: 'listingType', value: 0 },*/
					{
						id: 3,
						name: '点价资源',
						flag: false,
						filter: 'listingIndex',
						value: 'true'
					}, {
						id: 4,
						name: '双28',
						flag: false,
						filter: 'd28',
						value: 1
					}, {
						id: 5,
						name: '双29',
						flag: false,
						filter: 'd29',
						value: 1
					}, {
						id: 6,
						name: '新疆棉',
						flag: false,
						filter: 'cottonSource',
						value: 0
					}, {
						id: 7,
						name: '地产棉',
						flag: false,
						filter: 'cottonSource',
						value: 1
					}, {
						id: 8,
						name: '进口棉',
						flag: false,
						filter: 'cottonSource',
						value: 2
					}, {
						id: 9,
						name: '新疆地方',
						flag: false,
						filter: 'cottonSource',
						value: '01'
					}, {
						id: 10,
						name: '新疆兵团',
						flag: false,
						filter: 'cottonSource',
						value: '02'
					}
				],
				ysj_items_list: [{
					id: 0,
					name: '不限',
					flag: true,
					filter: '',
					value: ''
				}, {
					id: 1,
					name: '白棉1级',
					flag: false,
					filter: 'primaryColor',
					value: 11
				}, {
					id: 2,
					name: '白棉2级',
					flag: false,
					filter: 'primaryColor',
					value: 21
				}, {
					id: 3,
					name: '白棉3级',
					flag: false,
					filter: 'primaryColor',
					value: 31
				}, {
					id: 4,
					name: '白棉4级',
					flag: false,
					filter: 'primaryColor',
					value: 41
				}, {
					id: 5,
					name: '白棉5级',
					flag: false,
					filter: 'primaryColor',
					value: 51
				}, {
					id: 6,
					name: '淡点污棉1级',
					flag: false,
					filter: 'primaryColor',
					value: 12
				}, {
					id: 7,
					name: '淡点污棉2级',
					flag: false,
					filter: 'primaryColor',
					value: 22
				}, {
					id: 8,
					name: '淡点污棉3级',
					flag: false,
					filter: 'primaryColor',
					value: 32
				}, {
					id: 9,
					name: '淡黄染棉1级',
					flag: false,
					filter: 'primaryColor',
					value: 13
				}, {
					id: 10,
					name: '淡黄染棉2级',
					flag: false,
					filter: 'primaryColor',
					value: 23
				}, {
					id: 11,
					name: '淡黄染棉3级',
					flag: false,
					filter: 'primaryColor',
					value: 33
				}, {
					id: 12,
					name: '黄染棉1级',
					flag: false,
					filter: 'primaryColor',
					value: 14
				}, {
					id: 13,
					name: '黄染棉2级',
					flag: false,
					filter: 'primaryColor',
					value: 24
				}],
				mhlx_items_list: [{
					id: 1,
					name: '手摘棉',
					flag: false,
					filter: 'packType',
					value: 1
				}, {
					id: 2,
					name: '机采棉',
					flag: false,
					filter: 'packType',
					value: 2
				}, {
					id: 3,
					name: '皮辊棉',
					flag: false,
					filter: 'cottonType',
					value: 2
				}, {
					id: 4,
					name: '长绒棉',
					flag: false,
					filter: 'cottonType',
					value: 4
				}],
				order_items_list: [{
					id: 0,
					name: '默认排序',
					temp: '默认排序',
					flag: true,
					filter: '',
					value: ''
				}, {
					id: 1,
					name: '长度',
					temp: '长度',
					flag: false,
					filter: 'lengthAvg',
					value: 'desc'
				}, {
					id: 2,
					name: '强力',
					temp: '强力',
					flag: false,
					filter: 'strongAvg',
					value: 'desc'
				}, {
					id: 3,
					name: '含杂',
					temp: '含杂',
					flag: false,
					filter: 'impurity',
					value: 'desc'
				}, {
					id: 4,
					name: '回潮',
					temp: '回潮',
					flag: false,
					filter: 'moisture',
					value: 'desc'
				}, {
					id: 5,
					name: '价格',
					temp: '价格',
					flag: false,
					filter: 'price',
					value: 'desc'
				}],
				address_list: '',
				Data_list: '',
				value: [250, 400],
				value2: [210, 400],
				value3: [20, 65],
				value4: [0, 60],
				value5: [0, 150],
				value6: [700, 1000],
				// value6: [77, 99],
				marks: {
					250: '25',
					280: '28',
					310: '31',
					340: '34',
					370: '37',
					400: '40',
				},
				marks2: {
					210: '21',
					240: '24',
					270: '27',
					300: '30',
					330: '33',
					360: '36',
					390: '39',
					400: '40',
				},
				marks3: {
					20: '2',
					30: '3',
					40: '4',
					50: '5',
					65: '6.5',
				},
				marks4: {
					0: '0',
					10: '1',
					20: '2',
					30: '3',
					40: '4',
					50: '5',
					60: '6',
				},
				marks5: {
					0: '0',
					30: '3',
					60: '6',
					90: '9',
					120: '12',
					150: '15',
				},
				marks6: {
					700: '70',
					800: '80',
					900: '90',
					1000: '100',
				},
				params: '',
				resshow: true,
				
				slide_btn: '',
				save_show: false,
				saveName: '',
				save_list: '',
				
				
				
				
				paramsBoth: '',
				swiperOption_tab: {
					speed: 1000,
					loop: true,
					slidesPerView: 'auto',
				},
			}
		},
		created() {
			window.scroll(0, 0);
			this.$http.get('/wx/shop/getMixListing').then((response) => {
				this.share_txt = response.entity.note;
				
			});
			
			// 获取城市
			this.$http.post('/wx/bases/getListingCity').then((response) => {
				this.address_list = response.entity;
				this.address_list.unshift({
					id: 0,
					name: '不限',
					flag: true,
					filter: '',
					value: ''
				})
				// console.log(this.address_list);
			});
			// 获取年份
			this.$http.post('/wx/bases/getListingData').then((response) => {
				this.Data_list = response.entity;
				// // console.log(response);
				this.loading = false;
			});
		},
		methods: {
			// 确定分享
			sure_share() {
				this.shareIF = false;
				this.share_zhiIF = true;
				// wx.ready(function() {
				// 获取“分享给朋友”按钮点击状态及自定义分享内容接口
				wx.onMenuShareAppMessage({
					title: this.share_title, // 分享标题
					desc: this.share_txt, // 分享描述
					imgUrl: "https://mob.unioncotton.com/img/logo.png",
				});
				wx.onMenuShareTimeline({
					title: this.share_title, // 分享标题
					desc: this.share_txt, // 分享描述
					imgUrl: "https://mob.unioncotton.com/img/logo.png",
				});
				// });
			},
		
			save_top() {
				this.isSee1=false;
				this.isSee2=false;
				this.isSee3=false;
				this.isSee4=false;
				this.isSee5=false;
				this.isSee6=false;
				if (!localStorage.openID) {
					this.$message({
						message: '还未登录，请先登录后再进行此操作',
						type: 'error',
						onClose: () => {
							this.$router.push({
								path: '/login'
							})
						}
					});
				} else {
					this.save_show = true;
					this.optActive = 0;
				}
			},
			// 添加到需求定制
			add_history() {
				if (this.saveName) {
					let save_name = new URLSearchParams();
					save_name.append("searchName", this.saveName);
					this.$http.post('/wx/searchhistory/editor?' + this.params + '&' + save_name).then((response) => {
						// console.log(response);
						this.save_show = false;
						this.saveName = '';
						this.$http.post('/wx/searchhistory/list').then((response) => {
							// console.log(response);
							this.save_list = response.entity;
						})
						this.$message({
							message: '保存成功',
							type: 'success',
							onClose: () => {
								this.$router.push({
									name: 'myCustomized',
								});
							}
						});
					})
				} else {
					this.$message({
						message: '请输入定制名称',
						type: 'error'
					});
				}
		
		
			},
			search_list(index) {
				this.loading = true;
				let params = new URLSearchParams();
				let save_inx = this.save_list[index];
				// 放入参数
				if (save_inx.listingType) {
					params.append("listingType", save_inx.listingType);
				};
				if (save_inx.d28) {
					params.append("d28", save_inx.d28);
				};
				if (save_inx.d29) {
					params.append("d29", save_inx.d29);
				};
				if (save_inx.listingIndex) {
					params.append("listingIndex", save_inx.listingIndex);
				};
				if (save_inx.cottonSource) {
					params.append("cottonSource", save_inx.cottonSource);
				};
				if (save_inx.primaryColor) {
					params.append("primaryColor", save_inx.primaryColor);
				};
				if (save_inx.depositary) {
					params.append("depositary", save_inx.depositary);
				};
				if (save_inx.cottonType) {
					params.append("cottonType", save_inx.cottonType);
				};
				if (save_inx.packType) {
					params.append("packType", save_inx.packType);
				};
				if (save_inx.cottonYear) {
					params.append("cottonYear", save_inx.cottonYear);
				};
		
		
				params.append("lengthMin", save_inx.lengthMin);
				params.append("lengthMax", save_inx.lengthMax);
		
				params.append("strongMin", save_inx.strongMin);
				params.append("strongMax", save_inx.strongMax);
		
				params.append("mikeMin", save_inx.mikeMin);
				params.append("mikeMax", save_inx.mikeMax);
		
				params.append("impurityMin", save_inx.impurityMin);
				params.append("impurityMax", save_inx.impurityMax);
		
				params.append("moistureMin", save_inx.moistureMin);
				params.append("moistureMax", save_inx.moistureMax);
		
				params.append("neatMin", save_inx.neatMin);
				params.append("neatMax", save_inx.neatMax);
		
				this.$http.post('/wx/listing/getListingList?' + params).then((response) => {
					this.warehouseList = response.entity.list;
					this.totalPage = response.entity.totalPage;
					this.pageCurrent = 1;
					// console.log(response);
					this.loading = false;
					this.pagesize = response.entity.pageSize;
					this.pageNum = 1;
					this.paramsBoth = params;
					if (response.entity.totalRow == 0) {
						this.resshow = true;
					} else {
						this.resshow = false;
					}
					window.scrollTo(0, 0);
				})
			},
		
		
		
			//滑块小标隐藏
			hidSee() {
				this.isSee1 = false;
				this.isSee2 = false;
				this.isSee3 = false;
				this.isSee4 = false;
				this.isSee5 = false;
				this.isSee6 = false;
			},
			// 滑块数值设置
			formatTooltip(val) {
				return val / 10;
			},
			//重置
			clearSelect() {
				this.value = [250, 400];
				this.value2 = [210, 400];
				this.value3 = [20, 65];
				this.value4 = [0, 60];
				this.value5 = [0, 150];
				this.value6 = [700, 1000];
				this.isSee = false;
				this.mhlx_items_list.forEach(function(i) {
					i.flag = false;
				});
				this.Data_list.forEach(function(i) {
					i.flag = false;
				});
				this.address_list.forEach(function(i,index) {
					if(index==0){
						i.flag = true;
					}else{
						i.flag = false;
					}
				});
				this.lx_items_list.forEach(function(i,index) {
					if(index==0){
						i.flag = true;
					}else{
						i.flag = false;
					}
				});
				this.ysj_items_list.forEach(function(i,index) {
					if(index==0){
						i.flag = true;
					}else{
						i.flag = false;
					}
				});
				document.getElementById("wancheng").click('show');
			},
			//上拉加载
			onScroll() {
				let innerHeight = document.querySelector('#app').clientHeight;
				let outerHeight = document.documentElement.clientHeight;
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				// console.log(innerHeight + " " + outerHeight + " " + scrollTop);
				if (innerHeight < (outerHeight + scrollTop)) {
					if (this.pageCurrent < this.totalPage && this.pageflag == true) {
						this.pageflag = false;
						this.pageNum = this.pageNum + 1;
						this.loading = true;
						// this.$http.post('/wx/shop/list?pageNum='+this.pageNum).then((response) => {
						// 	let ListTest = response.entity.list;
						// 	this.shopList = this.shopList.concat(ListTest);
						// 	this.loading = false;
						// 	this.pageflag=true;
						// })
		
						this.$http.post('/wx/listing/getListingList?' + this.paramsBoth + '&pageNum=' + this.pageNum).then((response) => {
							let ListTest = response.entity.list;
							this.warehouseList = this.warehouseList.concat(ListTest);
							this.totalPage = response.entity.totalPage;
							this.pageCurrent = response.entity.pageCurrent;
							// console.log(response);
							this.loading = false;
							this.pageflag = true;
						})
		
						this.moreText = "下拉加载更多";
		
					} else if (this.pageCurrent >= this.totalPage) {
						this.moreText = "全部加载完成";
					}
		
				}
			},
			//前往资源详情
			godetails(item_, listingID_) {
				this.$router.push({
					name: 'resDetails',
					params: {
						id: item_,
						listingID: listingID_,
						listingType: 1,
					}
				});
			},
			// 上拉设置  全站通用
			getScrollTop() {
				var scrollTop = 0,
					bodyScrollTop = 0,
					documentScrollTop = 0;
				if (document.body) {
					bodyScrollTop = document.body.scrollTop;
				}
				if (document.documentElement) {
					documentScrollTop = document.documentElement.scrollTop;
				}
				scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
				return scrollTop;
			},
		
			//可视窗口高度
		
			getWindowHeight() {
				var windowHeight = 0;
				if (document.compatMode == "CSS1Compat") {
					windowHeight = document.documentElement.clientHeight;
				} else {
					windowHeight = document.body.clientHeight;
				}
				return windowHeight;
			},
		
			//滚动条高度
		
			getScrollHeight() {
				var scrollHeight = 0,
					bodyScrollHeight = 0,
					documentScrollHeight = 0;
				if (document.body) {
					bodyScrollHeight = document.body.scrollHeight;
				}
				if (document.documentElement) {
					documentScrollHeight = document.documentElement.scrollHeight;
				}
				scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
				return scrollHeight;
			},
		
		
			scrollFn() {
				if (this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()) {
					// console.log('1');
				}
			},
		
			destroyed() {
				window.removeEventListener('scroll', this.scrollFn); // 销毁监听
			},
		
			// 加入购物车
			joinCart(id) {
				this.$http.post('/wx/trade/addCartItem?listingID=' + id).then((response) => {
					// console.log(response);
					if (response.success) {
						this.$message({
							showClose: true,
							message: '加入购物车成功',
							type: 'success'
						});
					} else {
						if (response.code != 9999) {
							this.$message({
								showClose: true,
								message: response.message,
								type: 'error'
							});
						} else {
							this.$message({
								showClose: true,
								message: '还未登录，请先登录后再进行此操作',
								type: 'error',
								onClose: () => {
									this.$router.push({
										path: '/login'
									})
								}
							});
						}
					}
				});
			},
			// 点击按钮
			clickActive(index) {
				this.isSee1 = false;
				this.isSee2 = false;
				this.isSee3 = false;
				this.isSee4 = false;
				this.isSee5 = false;
				this.isSee6 = false;
				if (this.optActive == index) {
					this.optActive = 0;
				} else {
					this.optActive = index;
				};
		
			},
			// 隐藏tab
			hiddenTab() {
				this.optActive = 0;
				this.isSee1 = false;
				this.isSee2 = false;
				this.isSee3 = false;
				this.isSee4 = false;
				this.isSee5 = false;
				this.isSee6 = false;
			},
			// 显示滑块小标
			showtool(i) {
				if (i == 'show1') {
					this.isSee1 = true;
				}
				if (i == 'show2') {
					this.isSee2 = true;
				}
				if (i == 'show3') {
					this.isSee3 = true;
				}
				if (i == 'show4') {
					this.isSee4 = true;
				}
				if (i == 'show5') {
					this.isSee5 = true;
				}
				if (i == 'show6') {
					this.isSee6 = true;
				}
			},
			// 传参获取列表
			addparams(i, value, index, z) {
				// 参数设置
				
				let listingType = new Array();
				let d28;
				let d29;
				let listingIndex;
				let cottonSource = new Array();
				let primaryColor = new Array();
				let depositary = new Array();
				let cottonType = new Array();
				let packType = new Array();
				let sort;
				let asc;
				let cottonYear = new Array();
				let params = new URLSearchParams();
				// 小标隐藏
				if (i == 'noshow') {
					this.optActive = 0;
					this.isSee = false;
					this.isSee1 = false;
					this.isSee2 = false;
					this.isSee3 = false;
					this.isSee4 = false;
					this.isSee5 = false;
					this.isSee6 = false;
				}
		
				
					if (z == 1) {
						// 類型
						this.lx_items_list[index].flag = !this.lx_items_list[index].flag;
						if (index == 0) {
							this.lx_items_list.forEach(function(i) {
								i.flag = false;
							})
							this.lx_items_list[index].flag = true;
						} else {
							this.lx_items_list[0].flag = false;
						}
		
					} else if (z == 2) {
						// 顔色級
						this.ysj_items_list[index].flag = !this.ysj_items_list[index].flag;
						if (index == 0) {
							this.ysj_items_list.forEach(function(i) {
								i.flag = false;
							})
							this.ysj_items_list[index].flag = true;
						} else {
							this.ysj_items_list[0].flag = false;
						}
					} else if (z == 3) {
						// 存放地
						this.address_list[index].flag = !this.address_list[index].flag;
						if (index == 0) {
							this.address_list.forEach(function(i) {
								i.flag = false;
							})
							this.address_list[index].flag = true;
						} else {
							this.address_list[0].flag = false;
						}
					} else if (z == 4) {
						this.mhlx_items_list[index].flag = !this.mhlx_items_list[index].flag;
		
					} else if (z == 5) {
						this.Data_list[index].flag = !this.Data_list[index].flag;
		
					}
		
		
		
		
				//循环获取参数
				this.lx_items_list.forEach(function(i) {
					if (i.filter == 'listingType' && i.flag == true) {
						listingType.push(i.value)
					} else if (i.filter == 'd28' && i.flag == true) {
						d28 = 1;
					} else if (i.filter == 'd29' && i.flag == true) {
						d29 = 1;
					} else if (i.filter == 'listingIndex' && i.flag == true) {
						listingIndex = i.flag;
					} else if (i.filter == 'cottonSource' && i.flag == true) {
						cottonSource.push(i.value)
					}
				});
				
				this.ysj_items_list.forEach(function(i) {
					if (i.filter == 'primaryColor' && i.flag == true) {
						primaryColor.push(i.value)
					}
				});
				this.address_list.forEach(function(i) {
					if (i.filter == 'depositary' && i.flag == true) {
						depositary.push(i.value)
					}
				});
				this.order_items_list.forEach(function(i) {
					if (i.flag == true) {
						sort = i.filter;
					}
				});
				this.mhlx_items_list.forEach(function(i) {
					if (i.filter == 'cottonType' && i.flag == true) {
						cottonType.push(i.value)
					}
				});
				this.mhlx_items_list.forEach(function(i) {
					if (i.filter == 'packType' && i.flag == true) {
						packType.push(i.value)
					}
				});
				this.Data_list.forEach(function(i) {
					if (i.filter == 'cottonYear' && i.flag == true) {
						cottonYear.push(i.value)
					}
				});
				// 数组转换成字符串
				let listingTypeText = listingType.join(",");
				let cottonSourceText = cottonSource.join(",");
				let primaryColorText = primaryColor.join(",");
				let depositaryText = depositary.join(",");
				let cottonTypeText = cottonType.join(",");
				let packTypeText = packType.join(",");
				let cottonYearText = cottonYear.join(",");
		
				// 放入参数
				if (listingType) {
					params.append("listingType", -1);
				};
				if (d28) {
					params.append("d28", 1);
				};
				if (d29) {
					params.append("d29", 1);
				};
				if (listingIndex) {
					params.append("listingIndex", 2);
				};
				if (cottonSource) {
					params.append("cottonSource", cottonSourceText);
				};
				if (primaryColor) {
					params.append("primaryColor", primaryColorText);
				};
				if (depositary) {
					params.append("depositary", depositaryText);
				};
				if (cottonType) {
					params.append("cottonType", cottonTypeText);
				};
				if (packType) {
					params.append("packType", packTypeText);
				};
				if (cottonYear) {
					params.append("cottonYear", cottonYearText);
				};
		
				if (sort) {
					params.append("order", sort);
					params.append("asc", this.asc);
				}
				params.append("lengthMin", this.value[0] / 10);
				params.append("lengthMax", this.value[1] / 10);
		
				params.append("strongMin", this.value2[0] / 10);
				params.append("strongMax", this.value2[1] / 10);
		
				params.append("mikeMin", this.value3[0] / 10);
				params.append("mikeMax", this.value3[1] / 10);
		
				params.append("impurityMin", this.value4[0] / 10);
				params.append("impurityMax", this.value4[1] / 10);
		
				params.append("moistureMin", this.value5[0] / 10);
				params.append("moistureMax", this.value5[1] / 10);
		
				params.append("neatMin", this.value6[0] / 10);
				params.append("neatMax", this.value6[1] / 10);
				// 
				this.params = params;
			}
		}
	}
</script>H

<style lang="scss">
	.customized{position: relative !important;top: 0 !important;padding-bottom: 2rem;
		.opt_con{max-height: 100rem !important;overflow: auto !important;width: 7.0rem !important;margin: 0.2rem 0.2rem 0.2rem 0.2rem;
			.opt_cla{
				p{font-size: 0.3rem;color: #999999;}
			}
		}
		.slide_click {
			background: #fff;
			width: 7.5rem;
			padding: 0.5rem 0 2rem 0;
			text-align: center;
			z-index: 9999;
			position: relative;
		
			input {
				width: 3.25rem;
				height: 0.66rem;
				color: #ffffff;
				font-size: 0.26rem;
				border: 0;
				border-radius: 0.5rem;
				display: inline-block;
				margin: 0 0.16rem;
			}
		
			.chongzhi {
				background: #fd7320;
			}
		
			.wancheng {
				background: #14bab4;
			}
		}
	}
	.el-slider__button-wrapper{z-index: 1 !important;}
	.el-tooltip__popper.is-dark{z-index: 100 !important;}
	.option_wrap{
		.dan{
			.el-slider__button-wrapper:nth-child(3){display: none !important;}
		}
	}
</style>
