<template>
	<div v-loading="loading">
		<div class="topBack" >
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>站内消息</p>
		</div>
		<div class="addHeight"></div>
		<div class="inf_tab">
			<div class="inf_tab_inx" :class="{'active':type==0}" @click="switchInf(0)">全部消息</div>
			<div class="inf_tab_inx" :class="{'active':type==1}" @click="switchInf(1)">系统消息</div>
			<div class="inf_tab_inx" :class="{'active':type==2}" @click="switchInf(2)">交易通知</div>
			<div class="clear"></div>
		</div>

		<div class="inf_list">
			<ul>
				<li v-for="(item,index) in informationList" @click="open(item.content,index,item.listID)">
					<leftSlider @msg-from-child="getMsgFromChild(item,index)">
						<div class="inf_inx">
							<div class="dian fl" :class="{'red':item.isRead==1}"></div>
							<div class="inf_con fl">
								<div class="con_top">
									<p v-if="item.msgType==1" class="inf_bt fl">系統消息</p>
									<p v-if="item.msgType==2" class="inf_bt fl">交易通知</p>
									<p class="inf_date fr"><span>{{item.msgDate}}</span>&nbsp;<span>{{item.msgTime}}</span></p>
									<div class="clear"></div>
								</div>
								<p class="inf_jj">{{item.content}}</p>
							</div>
							<div class="clear"></div>
						</div>
					</leftSlider>
				</li>
			</ul>
			<p v-if="!resshow" class="more_btn">{{moreText}}</p>
			<div v-if="resshow" class="noRes">
				<img src="../../assets/img/noRes.png" alt="">
				<p>未找到信息。</p>
			</div>
		</div>

	</div>

</template>

<script>
	import leftSlider from '@/components/information/informationList.vue'
	export default {
		components: {
			leftSlider
		},
		data() {
			return {
				type: 0,
				informationList: [],
				loading: true,
				totalPage: 0,
				pageCurrent: 1,
				pageNum: 1,
				moreText: '下拉加载更多',
				pageflag: true,
				resshow:true,
			}
		},
		created() {
			window.scroll(0, 0);
			//执行上拉事件
			window.addEventListener('scroll', this.onScroll);
		},
		mounted() {
			// 获取列表
			this.$http.post('/wx/user/getMessageList?type=' + this.type).then((response) => {
				this.informationList = response.entity.list;
				this.totalPage = response.entity.totalPage;
				this.pageCurrent = response.entity.pageCurrent;
				if(response.entity.totalRow==0){
					this.resshow=true;
				}else{
					this.resshow=false;
				}
				if (response.entity.totalPage == 1) {
					this.moreText = "全部加载完成"
				} else {
					this.moreText = "下拉加载更多"
				}
				this.loading = false;
				// console.log(response)
				// this.shopList = response.entity.list;
				// this.loading= false;
			})

		},
		methods: {
			//删除
			getMsgFromChild(v, index) {

				this.$http.post('wx/user/removeMessage?messageID=' + v.listID).then((response) => {
					this.informationList.splice(index, 1);
					if(this.informationList.length==0){
						this.resshow=true;
					}else{
						this.resshow=false;
					}
					this.$message({
						showClose: true,
						message: '删除成功',
						type: 'success'
					});
				})
			},
			// 切换列表
			switchInf(i) {
				 window.scroll(0, 0);
				this.type = i;
				this.loading = true;
				this.pageNum = 1;
				this.pageCurrent =1;
				this.$http.post('/wx/user/getMessageList?type=' + this.type+ '&pageNum=' + this.pageNum).then((response) => {
					// console.log(response)
					this.informationList = response.entity.list;
					this.totalPage = response.entity.totalPage;
					if(response.entity.totalRow==0){
						this.resshow=true;
					}else{
						this.resshow=false;
					}
					if (response.entity.totalPage == 1) {
						this.moreText = "全部加载完成"
					} else {
						this.moreText = "下拉加载更多"
					}
					this.loading = false;
					// this.shopList = response.entity.list;
					// this.loading= false;
				})
			},
			// 上拉加載更多
			onScroll() {
				let innerHeight = document.querySelector('#app').clientHeight;
				let outerHeight = document.documentElement.clientHeight;
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				// console.log(innerHeight + " " + outerHeight + " " + scrollTop);
				if (innerHeight < (outerHeight + scrollTop+100)) {
					if (this.pageCurrent < this.totalPage && this.pageflag == true) {
						this.pageflag = false;
						this.pageNum = this.pageNum + 1;
						this.loading = true;
						this.$http.post('/wx/user/getMessageList?type=' + this.type + '&pageNum=' + this.pageNum).then((response) => {
							// console.log(response)
							
							let ListTest = response.entity.list;
							this.totalPage = response.entity.totalPage;
							this.pageCurrent = response.entity.pageCurrent;
							this.informationList = this.informationList.concat(ListTest);
							this.loading = false;
							this.pageflag = true;
						})
						this.moreText = "下拉加载更多";

					} else if (this.pageCurrent >= this.totalPage) {
						this.moreText = "全部加载完成"
					}

				}
			},
			//打开弹窗
			open(TXT, index, ID) {
				this.$alert(TXT, '消息详情', {
					confirmButtonText: '确定',
					callback: action => {
						this.informationList[index].isRead = 1;
						this.$http.post('wx/user/markMessage?messageID=' + ID).then((response) => {

						})
					}
				});
			}
		}

	}
</script>

<style lang="scss">
	.inf_tab {
		background: #fff;
		// box-shadow: 5px 5px 3px #e8e8e8;
		position: fixed;
		z-index: 999;

		.inf_tab_inx {
			display: block;
			float: left;
			width: 2.5rem;
			height: 1.1rem;
			line-height: 1.1rem;
			text-align: center;
			font-size: 0.3rem;
			color: #333333;
			position: relative;
		}

		.inf_tab_inx:after {
			display: block;
			content: '';
			height: 0.06rem;
			border-radius: 0.03rem;
			width: 0.5rem;
			background: #14bab4;
			position: absolute;
			bottom: 0;
			left: 1rem;
			opacity: 0;
		}

		.inf_tab_inx.active {
			color: #14bab4;
		}

		.inf_tab_inx.active:after {
			opacity: 1;
		}
	}

	.inf_list {
		padding-top: 1.3rem;
		padding-bottom: 3rem;

		.inf_inx {
			background: #fff;
			padding: 0.3rem 0;
			height: 0.85rem;

			.dian {
				height: 0.11rem;
				width: 0.11rem;
				border-radius: 50%;
				margin: 0.2rem 0.2rem 0 0.2rem;
				background: #14bab4;
			}

			.dian.red {
				background: #fd7320;
			}

			.inf_con {
				.con_top {
					.inf_bt {
						color: #222222;
						font-size: 0.32rem;
					}

					.inf_date {
						color: #999999;
						font-size: 0.28rem;
						margin-top: 0.07rem;
					}
				}

				.inf_jj {
					width: 6.4rem;
					text-overflow: ellipsis;
					;
					margin-top: 0.15rem;
					color: #666666;
					font-size: 0.3rem;
					overflow: hidden;
					white-space: nowrap;
				}
			}
		}

	}

	.el-message-box {
		width: 90% !important;
	}
</style>
