<template>
	<div class="updata">
		<div class="up_name">
			<p class="fl">企业名称</p>
			<input class="fl" type="text" value="" placeholder="请输入企业名称">
			<div class="clear"></div>
		</div>
		<div class="up_pho">
			<div class="pho_bt">
				<p class="p1">营业执照上传</p>
				<p class="p2">保证营业执照清晰可显示</p>
				<div class="clear"></div>
			</div>
			<div class="pic_up">
				<el-upload class="avatar-uploader fl" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
				 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<img class="sample fl" src="../assets/img/sample.jpg" alt="">
				<div class="clear"></div>
			</div>
		</div>
		<input class="baocun" @click="pathTo" type="button" value="保存">
	</div>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl: ''
			};
		},
		methods: {
			pathTo: function() {
				this.$router.push({
					path: '/index'
				})
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
		}
	}
</script>

<style lang="scss">
	.up_name {
		background: #fff;

		p {
			font-size: 0.28rem;
			color: #333333;
			line-height: 1rem;
			padding: 0 0.3rem;
		}

		input {
			height: 1rem;
			font-size: 0.26rem;
			color: #333;
			border: 0;
			padding: 0 0.1rem;
			width: 5rem;
		}
	}

	.up_pho {
		margin-top: 0.2rem;
		background: #fff;
		padding-top: 0.3rem;

		.pho_bt {
			padding-left: 0.3rem;

			.p1 {
				color: #333333;
				font-size: 0.28rem;
				display: inline-block;
			}

			.p2 {
				color: #666666;
				font-size: 0.20rem;
				display: inline-block;
				margin-left: 0.2rem;
			}
		}
	}

	.pic_up {
		padding-left: 0.3rem;
		margin-top: 0.25rem;
		padding-bottom: 0.2rem;

		.sample {
			width: 3.31rem;
			height: 2.17rem;
			margin-left: 0.25rem;
		}
	}

	.baocun {
		height: 0.8rem;
		width: 6.46rem;
		border: none;
		border-radius: 0.5rem;
		background: #14bab4;
		color: #fff;
		font-size: 0.28rem;
		margin-left: 0.52rem;
		margin-top: 0.55rem;
	}

	.avatar-uploader .el-upload {
		width: 3.31rem;
		height: 2.17rem;
		background: url(../assets/img/up_pic.jpg) no-repeat center center;
		background-size: cover;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 3.31rem;
		height: 2.17rem;
		display: block;
	}

	.el-icon-plus:before {
		display: none;
	}
</style>
