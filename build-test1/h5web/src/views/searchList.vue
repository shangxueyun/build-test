<template>
	<div class="searchList" v-loading="loading">
		<div class="search">
			<div class="search_left fl">
				<i class="fl">
					<img src="../assets/img/sousuo.png" alt="">
				</i>
				<input class="fl search_txt" placeholder="请输入批次号" type="text" name="search" id="search" v-model="inputTxt" autofocus="autofocus" />
				<div class="clear"></div>
			</div>
			<input class="fl search_btn" type="button" name="" @click="oninput" value="搜索" />
			<div class="clear"></div>
		</div>
		<div class="search_num" v-if="ishow==1">
			<ul>
				<li class="list_inx" v-for="item in numList" @click="godetails(item.batchID,item.listingID)" :key="item.listingID">
					<p class="id">{{item.batchID}}</p>
					<p class="pihao">批号</p>
				</li>
			</ul>
		</div>
		<!-- <div class="search_str" v-if="ishow==2">
			<ul>
				<li class="list_inx" v-for="item in strList" @click="godetails(item.id)">
					<p class="id">{{item.name}}</p>
					<p class="pihao">批号</p>
				</li>
			</ul>
		</div> -->
		<!-- <div class="bg"></div> -->
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				inputTxt:null,
				loading:false,
				numList:'',
				strList:'',
				ishow:1,
			}
		},
		mounted() {
			var txt_=document.getElementById('search')
			setTimeout(txt_.focus(),500);
		},
		methods: {
			// 输入动态查询列表
			oninput() {
				var reg = /^[1-9]\d*$|^0$/; // 注意：故意限制了 0321 这种格式，如不需要，直接reg=/^\d+$/;
				this.$http.post('/wx/listing/searchBatch?k='+this.inputTxt).then((response) => {
					this.numList = response.entity;
					this.loading=false;
					console.log(response)
					this.ishow=1;
				})
				if (reg.test(this.inputTxt) == true) {
					// this.$http.post('/wx/product/getCottonBatchList?batchID='+this.inputTxt).then((response) => {
					// 	this.numList = response.entity;
					// 	this.loading=false;
					// 	console.log(response)
					// 	this.ishow=1;
					// })
				} else {
					
					// this.$http.post('/wx/bases/getDFList?name='+this.inputTxt).then((response) => {
					// 	this.strList = response.list;
					// 	this.loading=false;
					// 	// console.log(response)
					// 	this.ishow=2;
					// })
				}
			},
			// 前往详情
			godetails(item_,listingID){
				this.$router.push({
					name: 'resDetails',
					query: {
						id: item_,
						listingID:listingID,
						listingType: '',
					}
				});
			},
			// godetails(item_){
			// 	this.$router.push({
			// 		name: 'warehouse',
			// 		params: {
			// 			id: item_
			// 		}
			// 	});
			// },
		}
	}
</script>

<style lang="scss" scoped>
	.search{background: none;
		.search_left{background: #fff;}
	}
  .search_num{position: fixed;left: 0;bottom: 0;right: 0;top:1rem;background:#fff;max-height: 75%;overflow-y: scroll;width: 7.1rem;left: 0.2rem;
	.list_inx{border-bottom: 1px solid #ccc;padding: 0.07rem 0.5rem;
		.id{color: #333;font-size: 0.28rem;}
		.pihao{color: #333;font-size: 0.24rem;}
	}
  }
  .search_str{position: fixed;left: 0;bottom: 0;right: 0;top:1rem;background:#fff;max-height: 75%;overflow-y: scroll;width: 7.1rem;left: 0.2rem;
  	.list_inx{border-bottom: 1px solid #ccc;padding: 0.07rem 0.5rem;
  		.id{color: #333;font-size: 0.28rem;}
  		.pihao{color: #333;font-size: 0.24rem;}
  	}
  }
</style>
