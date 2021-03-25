<template>
	<div class="pointsMall" v-loading="loading">
        <!-- head -->
        <header-top :title="returnText"></header-top>
        <div class="header_top">
            <div class="head_top">
                <nav>
                    <!-- <li class="xian">
                        <p>全部积分</p>
                        <p class="weight">{{ 
                            integralInfo.inactiveIntegral + 
                            integralInfo.activatedIntegral + 
                            integralInfo.todoIntegral +
                            integralInfo.convertibleIntegral +
                            integralInfo.applyingIntegral +
                            integralInfo.usedIntegral 
                            }}</p>
                    </li> -->
                    <li class="xian">
                        <p>未激活</p>
                        <p class="weight">{{ integralInfo.inactiveIntegral }}</p>
                    </li>
                    <li class="xian">
                        <p>已激活</p>
                        <p class="weight">{{ integralInfo.activatedIntegral }}</p>
                    </li>
                    <li>
                        <p>可兑换</p>
                        <p class="weight">{{ integralInfo.convertibleIntegral }}</p>
                    </li>
                </nav>
            </div>
            <div class="footer_bottom">
                <router-link class="button info" to="/pointsMall/pointsMallInfo">积分明细</router-link>
                <div class="button" @click="integralUseConvertible">积分兑换</div>
            </div>
        </div>
        <div class="list_content">
            <div class="list_div" v-for="(item, index) in configurationlistData" :key="index">
                <i v-if="item.taskType == 'WEIXIN_BIND'" :style="`background: url(${ imagesList.pointsMall_binding }) no-repeat;background-size: 100% 100%;`"></i> <!-- 微信绑定 -->
                <i v-if="item.taskType == 'SIGN_IN'" :style="`background: url(${ imagesList.pointsMall_checkin }) no-repeat;background-size: 100% 100%;`"></i> <!-- 签到 -->
                <i v-if="item.taskType == 'SPOTSALE_FIRST' || item.taskType == 'SPOTSALE_DAY'" :style="`background: url(${ imagesList.pointsMall_inquiry }) no-repeat;background-size: 100% 100%;`"></i> <!-- 询盘 -->
                <i v-if="item.taskType == 'REGISTER_AUDIT'" :style="`background: url(${ imagesList.pointsMall_recommend }) no-repeat;background-size: 100% 100%;`"></i> <!-- 推荐好友注册棉联账号 -->
                <i v-if="item.taskType == 'INVITE_FRIENDS'" :style="`background: url(${ imagesList.pointsMall_register }) no-repeat;background-size: 100% 100%;`"></i> <!-- 注册完成审核通过 -->
                <i v-if="item.taskType == 'TRADE_FIRST' || item.taskType == 'TRADE_ORDER_SPOTSALE'" :style="`background: url(${ imagesList.pointsMall_transaction }) no-repeat;background-size: 100% 100%;`"></i> <!-- 交易 -->
                <span>
                    {{ item.taskName }}
                </span>
                <span class="color">
                    {{ item.taskSubtitle }}
                </span>
                <!-- <div v-if="item.done == 0" class="button">做任务</div>
                <div v-else class="button done">已完成</div> -->
            </div>
        </div>
	</div>
</template>

<script>
import { mapState  } from 'vuex'
import HeaderTop from '@/components/HeaderTop/index'
	export default {
		data () {
			return {
                loading: false,
                returnText: '我的积分',
                integralInfo: {},
                configurationlistData: [],
                imagesList: {
                    pointsMall_binding: require('@/assets/icon/pointsMall_binding.png'),
                    pointsMall_checkin: require('@/assets/icon/pointsMall_checkin.png'),
                    pointsMall_inquiry: require('@/assets/icon/pointsMall_inquiry.png'),
                    pointsMall_recommend: require('@/assets/icon/pointsMall_recommend.png'),
                    pointsMall_register: require('@/assets/icon/pointsMall_register.png'),
                    pointsMall_transaction: require('@/assets/icon/pointsMall_transaction.png'),
                }
            }
        },
        components: {
            HeaderTop
        },
    	computed: mapState({
			// 全局用户信息
			userInfoM: state => state.userInfo.userInfo
        }),
        props:{
            value: [String, Object, Array]
        },
		created() {
            // 获取积分信息
            this.loading = true
            this.$http.post('/wx/integral/user').then((response) => {
                // console.log(response);
                if (response.data)
                this.integralInfo = response.data
            });
            // 获取配置列表
            this.$HttpRequest({
                url: '/wx/integral/list_integral_task',
                data: {
                    page: 1,
                    pageSize: 100
                },
                method: 'post'
            }).then(res => {
                this.loading = false
                if (res.data)
                this.configurationlistData = res.data.list
            })
		},
		mounted() {

		},
		methods: {
            integralUseConvertible () {
                this.$message('即将上线，敬请期待...');
            }
		},
	}
</script>

<style lang="scss">
    .pointsMall {
        width: calc(100%);
        .header_top{
            width: calc(100% - .56rem);
            padding: 0.24rem 0.28rem;
            max-height: 100%;
            position: relative;
            background: #fff;
            .head_top{
                width: 100%;
                background: url('~@/assets/icon/pointsMall_header.png') no-repeat;
                height: 2.44rem;
                background-size: 100% 100%;
                box-shadow: 0px .08rem .2rem 0px rgba(102, 102, 102, .5);
                border-radius: .28rem;
                nav{
                    width: calc(100% - .2rem);
                    display: flex;
                    padding: 0 .1rem;
                    li{
                        list-style: none;
                        width: 33.3%;
                        height: 1.4rem;
                        line-height: .68rem;
                        padding: .52rem 0px;
                        text-align: center;
                        color: #fff;
                        p{
                            list-style: none;
                            font-size: 0.26rem;
                        }
                        .weight{
                            font-size: 0.4rem;
                            font-weight: bolder;
                        }
                    }
                    .xian{
                        width: 33.3%;
                        position: relative;
                    }
                    .xian::before{
                        content: " ";
                        position: absolute;
                        width: 1px;
                        height: .88rem;
                        background: #97D2D2;
                        top: .72rem;
                        right: 0;
                    }
                }
            }
            .footer_bottom{
                width: calc(100% - .4rem);
                padding: 0 .2rem;
                height: .84rem;
                margin-top: .32rem;
                .button{
                    width: 3rem;
                    height: 100%;
                    background-image: linear-gradient(90deg,#F58634 26%,#FD5E20 100%);
                    float: right;
                    text-align: center;
                    line-height: 0.84rem;
                    color: #fff;
                    font-size: .32rem;
                    border-radius: 100px;
                }
                .info{
                    background-image: linear-gradient(90deg,#14B9B4 26%,#1790D2 100%);
                    float: left;
                }
            }
        }
        .list_content{
            width: calc(100% - .56rem);
            padding: 0.24rem 0.28rem;
            max-height: 100%;
            position: relative;
            background: #fff;
            margin-top: .2rem;
            padding-bottom: 1rem;
            .list_div{
                width: 100%;
                height: 1rem;
                line-height: 1rem;
                border-bottom: 1px solid #ECECEC;
                i{
                    display: block;
                    float: left;
                    width: .64rem;
                    height: .64rem;
                    background-size: 100% 100%;
                    margin: .18rem 0;
                    margin-right: .2rem;
                }
                span{
                    font-size: 0.3rem;
                }
                .color{
                    margin-left: .2rem;
                    color: #FE8A51;
                }
                .button{
                    background: #FE8A51;
                    width: 1.28rem;
                    height: .56rem;
                    margin: .2rem 0;
                    color: #fff;
                    text-align: center;
                    line-height: .56rem;
                    border-radius: .06rem;
                    float: right;
                }
                .done{
                    background: #fff;
                    color: #14B7B5;
                    padding-left: .2rem;
                    width: 1.08rem;
                    position: relative;
                }
                .done::before{
                    content: ' ';
                    position: absolute;
                    top: .12rem;
                    left: -.12rem;
                    width: .32rem;
                    height: .32rem;
                    background: url('~@/assets/icon/right.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
            .list_div:last-child{
                border: none;
            }
        }
    }
</style>
