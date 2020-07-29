<template>
	<div class="newsList" v-loading="loading">
		<div class="topBack" >
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>棉花圈</p>
		</div>
		<div class="addHeight"></div>
		<div class="newsTab">
			<span class="table_inx fl" :class="{ on:tabActive == index}" v-for="(item,index) in newsTab" @click="getList(item.id,index)">{{item.name}}</span>
			<div class="clear"></div>
		</div>
		<div class="new_li">
			<ul>
				<li v-if="tabActive==2" class="new_inx" v-for="(item,index) in newsList" @click="godetails(item,0)">
					<p>{{item.summary}}</p>
					<span class="fr">{{item.publishDate}} {{item.publishTime}}</span>
					<div class="clear"></div>
				</li>
				<li v-if="tabActive!=2" class="new_inx" v-for="(item,index) in newsList" @click="godetails(item,1)">
					<p>{{item.title}}</p>
					<span class="fr">{{item.publishDate}} {{item.publishTime}}</span>
					<div class="clear"></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		data:function(){
			return{
				newsTab:'',
				newsList:'',
				tabActive:0,
				parentID:2,
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
			this.$http.post('/wx/article/getCategoryList').then((response) => {
				this.newsTab=response.entity;
			})
			this.$http.post('/wx/article/getArticleList?categoryID='+this.parentID).then((response) => {
				this.newsList=response.entity.list;
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
				
				
			})
		},
		methods:{
			godetails(item_,status) {
				this.$router.push({
					name: 'newsDetails',
					params: {
						id: item_.id,
						status:status,
					}
				});
			},
			getList(ID,index){
				this.loading = true;
				window.scroll(0, 0);
				this.tabActive=index;
				this.parentID=ID;
				this.$http.post('/wx/article/getArticleList?categoryID='+this.parentID).then((response) => {
					this.pageNum=1;
					this.newsList=response.entity.list;
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
						this.$http.post('/wx/article/getArticleList?categoryID='+this.parentID + '&pageNum=' + this.pageNum).then((response) => {
							// console.log(response)
							let ListTest = response.entity.list;
							this.newsList=this.newsList.concat(ListTest);
							this.totalPage = response.entity.totalPage;
							this.pageCurrent = response.entity.pageCurrent;
							this.loading = false;
							this.pageflag = true;
						})
						this.moreText = "下拉加载更多";
			
					} else if (this.pageCurrent >= this.totalPage) {
						this.moreText = "全部加载完成"
					}
			
				}
			},
		}
	}
</script>

<style lang="scss">
	.newsTab{padding: 0 0.05rem;background-color: #ededed;position: fixed;width: auto;top: 0.75rem;
		.table_inx{display: block;width: 1.85rem;text-align: center;font-size: 0.3rem;height: 0.75rem;line-height: 0.75rem;position: relative;}
		.table_inx::after{content: '';display: block;position: absolute;width: 0.7rem;left: 50%;margin-left: -0.35rem;height: 0.05rem;bottom: 0;}
		.table_inx.on{color: #14bab4;}
		.table_inx.on::after{background-color: #14bab4;}
	}
	.new_li{padding-top: 0.75rem;
		.new_inx{background: #fff;margin-bottom: 0.2rem;padding: 0.2rem 0.2rem 0.2rem 0.2rem;
			p{margin-bottom: 0.2rem;line-height: 0.5rem;font-size: 0.3rem;height: 1rem;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;}
			span{font-size: 0.28rem;}
		}
		
	}
</style>rem
