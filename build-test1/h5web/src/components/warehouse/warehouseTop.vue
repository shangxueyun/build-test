<template>
	<div class="option_wrap">
		<div class="option">
			<span v-for="(item,index) in option" :class="{ active:optActive == index+1}" @click="clickActive(index)">{{item}}<i></i></span>
			<div class="clear"></div>
		</div>
		<div v-show="optActive == 1" class="option_screen">
			<div class="opt_con">
				<span v-for="item in screen">{{item}}</span>
			</div>
			<i @click="hiddenTab"></i>
		</div>
		<div v-show="optActive == 2" class="option_screen">
			<div class="opt_con">
				<span v-for="item in screen">{{item}}</span>
			</div>
			<i @click="hiddenTab"></i>
		</div>
		<div v-show="optActive == 3" class="option_screen">
			<div class="opt_con">
				<span v-for="item in screen">{{item}}</span>
			</div>
			<i @click="hiddenTab"></i>
		</div>
		<div v-show="optActive == 4" class="option_screen slide">
			<div class="opt_con">
				<div class="opt_cla">
					<p class="bt fl">棉花类型：</p>
					<div class="cla_btn fl">
						<span>锯齿细绒棉</span>
						<span>锯齿细绒棉</span>
						<span>机采棉</span>
						<span>机采棉</span>
					</div>
					<div class="clear"></div>
				</div>
				<div class="opt_cla">
					<p class="bt fl">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：</p>
					<div class="cla_btn fl">
						<span>2018</span>
						<span>2017</span>
						<span>2016</span>
						<span>2015</span>
						<span>2018</span>
						<span>2017</span>
						<span>2016</span>
						<span>2015</span>
					</div>
					<div class="clear"></div>
				</div>
				<div class="opt_slide">
					<p class="slide_bt fl">长度</p>
					<div class="block slide_block fl">
						<el-slider v-model="value" range :marks="marks" :min="26.0" :max="31.0" step='0.1' :show-tooltip="isSee">
						</el-slider>
					</div>
					<div class="clear"></div>
				</div>
				<div class="opt_slide">
					<p class="slide_bt fl">长度</p>
					<div class="block slide_block fl">
						<el-slider v-model="value2" range :marks="marks" :min="26.0" :max="31.0" step='0.1' :show-tooltip="isSee">
						</el-slider>
					</div>
					<div class="clear"></div>
				</div>
				<div class="opt_slide">
					<p class="slide_bt fl">长度</p>
					<div class="block slide_block fl">
						<el-slider v-model="value3" range :marks="marks" :min="26.0" :max="31.0" step='0.1' :show-tooltip="isSee">
						</el-slider>
					</div>
					<div class="clear"></div>
				</div>
				<div class="opt_slide">
					<p class="slide_bt fl">长度</p>
					<div class="block slide_block fl">
						<el-slider v-model="value4" range :marks="marks" :min="26.0" :max="31.0" step='0.1' :show-tooltip="isSee">
						</el-slider>
					</div>
					<div class="clear"></div>
				</div>
			</div>
			<div class="slide_click">
				<input class="chongzhi" type="button" value="点击重置">
				<input class="wancheng" type="button" value="完成">
			</div>
			<i @click="hiddenTab"></i>
		</div>
		<div v-show="optActive == 5" class="option_screen">
			<div class="opt_con">
				<span v-for="item in screen">{{item}}</span>
			</div>
			<i @click="hiddenTab"></i>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				option: ['类型', '颜色级', '存放地', '更多', '排序',],
				optActive:'',
				isSee:false,
				screen: ['全部', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试',
					'测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试',
					'测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试', '测试',
				],
				isShow: [false,false,false,false,false,],
				value: [26.0, 31.0],
				value2: [26.0, 31.0],
				value3: [26.0, 31.0],
				value4: [26.0, 31.0],
				marks: {
					26: '26',
					27: '27',
					28: '28',
					29: '29',
					30: '30',
					31: '31',
				},
				slide_btn:'',
			}
		},
		methods:{
			clickActive(index){
				if(this.optActive==index+1){
					this.optActive = 0 ;
				}else{
					this.optActive = index+1 ;
				};
				if(this.optActive==4&&this.isSee!=true){
					this.isSee=true;
				}
			},
			hiddenTab(){
				this.optActive = 0 ;
				this.isSee=false;
			}
		}
	}
</script>

<style lang="scss">
	.option_wrap {position:fixed;top: 1.9rem;
		.option {
			position: relative;
			z-index:9999;
			span {
				display: block;
				float: left;
				width: 1.5rem;
				text-align: center;
				background: #14bab4;
				height: 0.67rem;
				line-height: 0.67rem;
				font-size: 0.26rem;
				color: #fff;
				position: relative;
				cursor: pointer;
				i {
					display: inline-block;
					width: 0;
					height: 0;
					border: 0.07rem solid;
					border-color: #fff transparent transparent transparent;
					margin-left: 0.1rem;
					margin-bottom: -0.04rem;
				}
			}
			span.active{background: #1f9995;border-right: none;
				i{border-color: transparent transparent #fff transparent;margin-bottom: 0.02rem;}
				
			}
			
			span:after {
				display: block;
				content: '';
				position: absolute;
				right: 0;
				top: 0.17rem;
				width: 1px;
				height: 0.35rem;
				background: #57d1cd;
			}
			span.active:after{
				opacity: 0;
			}
		}

		.option_screen {
			.opt_con{
				background: #fff;
				width: 7.4rem;
				max-height: 4.8rem;
				padding-left: 0.1rem;
				overflow-y: scroll;
				padding-bottom: 0.5rem;
				padding-top: 0.2rem;
				span {
					display: inline-block;
					padding: 0.12rem 0.23rem;
					background: #f1f5f5;
					color: #222534;
					font-size: 0.24rem;
					border-radius: 0.03rem;
					margin: 0.14rem 0.14rem;
				}
			}
			i{display: block;content: '';position: fixed;top: 2.9rem;left: 0;right: 0;bottom: 0;background: #000;z-index: -5;opacity: 0.5;}
		}
		
		.slide {
			
			width: 7.2rem;
			.opt_con{width: 7.2rem;padding-left: 0.3rem;}
			.opt_cla {
				.bt {
					color: #999999;
					font-size: 0.24rem;
					width: 1.2rem;
					margin-top: 1px;
				}

				.cla_btn {
					width: 5.9rem;
					margin-bottom: 0.2rem;

					span {
						color: #333333;
						font-size: 0.24rem;
						background: none;
						margin: 0 0.2rem;
						padding: 0;
					}
				}
			}
			.slide_click{background: #fff;width: 7.5rem;padding: 0.5rem 0;text-align: center;z-index:9999;;position:relative;
				input{width: 3.25rem;height: 0.66rem;color: #ffffff;font-size: 0.26rem;border: 0;border-radius: 0.5rem;display: inline-block;margin: 0 0.16rem;}
				.chongzhi{background: #fd7320;}
				.wancheng{background: #14bab4;}
			}
		}
	
		.opt_slide {
			margin-top: 0.9rem;

			.slide_bt {
				font-size: 0.24rem;
				color: #999999;
				width: 0.5rem;
			}

			.slide_block {
				width: 5.5rem;
				margin-left: 0.5rem;
				margin-top: -0.1rem;

				.el-slider {
					width: 5.5rem;
				}
			}

			.el-slider__runway {
				height: 0.05rem;
			}

			.el-slider__bar {
				background-color: #14bab4;
				height: 0.05rem;
			}

			.el-slider__button {
				border: 0.03rem solid #14bab4;
				height: 0.24rem;
				width: 0.24rem;
			}

			.el-slider__button-wrapper {
				top: -17px;
			}
			
		}
		.opt_slide:nth-child(3){margin-top: 0.5rem !important;}
	}

	.el-tooltip__popper {
		// display: block !important;
		background: #14bab4 !important;
		font-size: 0.22rem !important;
		padding: 0.08rem 0.1rem !important;

		.popper__arrow {
			border-top-color: #14bab4 !important;
		}

		.popper__arrow::after {
			border-top-color: #14bab4 !important;
		}
	}

	.el-slider__stop {
		width: 1px !important;
		height: 0.05rem !important;
		background: #000 !important;
		margin-top: 0.05rem;
	}
	.el-slider__marks-text{font-size: 0.17rem !important;color: #000 !important;margin-top: 0.1rem !important;}
	.el-slider__runway{margin: 0.1rem 0 !important;}
</style>
