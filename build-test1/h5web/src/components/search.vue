<template>
<div>
	<div class="search" v-if="hostUlr">
		<div class="search_left fl">
			<i class="fl">
				<img src="../assets/img/sousuo.png" alt="">
			</i>
			<input class="fl search_txt" placeholder="请输入批次号" type="text" name="search" id="search" v-model="inputTxt" @input="keyInput()" autofocus="autofocus" />
			<div class="clear"></div>
		</div>
		<input class="fl search_btn" type="button" name="" @click="oninput" value="搜索" />
		<div class="clear"></div>
	</div>
	<router-link v-else to='/searchList' class="search">
		<div class="search_left fl">
			<i class="fl">
				<img src="../assets/icon/sousuo.png" alt="">
			</i>
			<input class="fl search_txt" placeholder="请输入批号" type="text" name="" value="" />
			<div class="clear"></div>
		</div>
		<input class="fl search_btn" type="button" name="" id="" value="搜索" />
		<div class="clear"></div>
	</router-link>
</div>
</template>

<script>
	export default {
		data:function () {
			return{
				name: 'Search',
				inputTxt: this.FinputTxt ? thisd.FinputTxt : ''
			}
		},
		props:{
			hostUlr: [String, Object, Array], // 判断依据
			FinputTxt: [String, Object, Array]
		},
		methods: {
			// 输入动态查询列表
			updateValue (value) {
				this.inputTxt = value
			},
			oninput() {
				var reg = /^[1-9]\d*$|^0$/; // 注意：故意限制了 0321 这种格式，如不需要，直接reg=/^\d+$/;
				this.$http.post('/wx/listing/searchBatch?k='+this.inputTxt).then((response) => {
					this.$emit('searchListData', response.entity, false, this.inputTxt)
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
			keyInput(){
				if (!this.inputTxt)
				this.$emit('searchListData', {}, true)
			}
		}
	}
</script>

<style lang="scss">
	.search {
		width: 7.1rem;
		padding: 0.2rem 0.2rem;
		background: none;
		display:block;

		.search_left {
			width: 5.76rem;
			height: 0.66rem;
			background: #fff;

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
				width: 4.96rem;
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
