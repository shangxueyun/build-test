<template>
	<router-link to='/searchList' class="search">
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
</template>

<script>
	export default {
		data:function () {
			return{
				name: 'Search',
				props: {
					titk: 666
				}
			}
		},
		
		
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
