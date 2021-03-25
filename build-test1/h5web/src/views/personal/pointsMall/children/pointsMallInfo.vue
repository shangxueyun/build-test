<template>
	<div class="pointsMallInfo" ref="pointsMallInfo" v-loading="loading">
        <!-- head -->
        <header-top :title="returnText"></header-top>
        <div class="header_swi">
            <nav>
                <template v-for="(item, index) in typeD">
                    <li :key="index" :class="item.flag ? 'action' : ''">
                        <a @click="switchRecord($event, index, item)" href="javascript:;">{{ item.content }}</a>
                    </li>
                </template>
            </nav>
        </div>
        <div class="content">
            <nav>
                <li v-for="(item, index) in listData" :key="index">
                    <span class="left">
                        <template v-if="item.descrption">{{ item.descrption }}</template>
                        <template v-else>{{ item.taskName }}</template>
                        <!-- {{ item.taskName }} -->
                        <br />
                        <font color="#9A9A9A" style="font-size:.26rem">{{ item.createTime }}</font>
                    </span>
                    <span class="right">
                        <font v-if="item.status == 'EXPIRED'" color="#9A9A9A">{{ item.integral }}</font>
                        <font v-else color="#FE8A52">+ {{ item.integral }}</font>
                        <br />
                        <template v-if="item.status == 'INACTIVE'"><font color="#9A9A9A">未激活</font></template>
                        <template v-if="item.status == 'ACTIVATED'">已激活</template>
                        <template v-if="item.status == 'CONVERTIBLE'">可兑换</template>
                        <template v-if="item.status == 'TODO'">待确认</template>
                        <template v-if="item.status == 'CANCEL'"><font color="#9A9A9A" style="text-decoration: line-through;">已作废</font></template>
                    </span>
                    <s style="clear: both;"></s>
                </li>
                <p style="text-align: center;color:#9A9A9A;">{{ moreText }}</p>
            </nav>
        </div>
	</div>
</template>

<script>
import { mapState  } from 'vuex'
import HeaderTop from '@/components/HeaderTop/index'
import { formatDate } from '@/utils'
	export default {
		data () {
			return {
                loading: false,
                returnText: '积分明细',
                moreText: '全部加载完成',
                typeD: [{content:'积分收入', statusList:['INACTIVE','ACTIVATED','TODO','CONVERTIBLE','EXPIRED'], flag: true},{content:'兑换记录',  statusList:'convertible', flag: false},{content:'已过期积分', statusList:['EXPIRED'], flag: false}],
                listData: [
                    // {
                    //     "code": "xxxxxxxx1",
                    //     "userCode": "99542178",
                    //     "memberCode": "43531703",
                    //     "integral": 100,
                    //     "type": "GET",
                    //     "taskCode": "",
                    //     "taskName": "每日打卡",
                    //     "taskType": "",
                    //     "objType": "",
                    //     "objCode": "",
                    //     "status": "",
                    //     "expireTime": "",
                    //     "activatedTime": "",
                    //     "convertibleTime": "",
                    //     "cancelTime": "",
                    //     "exceptionStatus": 0,
                    //     "exceptionNotes": "",
                    //     "dataAttr": "",
                    //     "description": ""
                    // }
                ],
                pageCurrent: 1,
                totalPage: 1,
                pageSize: 10,
                pageflag: false,
                switchRecordIndex: {},
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
            this.switchRecordIndex = {
                index: 0,
                item: this.typeD[0]
            }
            this.switchRecord(true, 0, this.typeD[0])
            window.addEventListener('scroll', this.onScroll);
		},
		mounted() {

		},
		methods: {
            switchRecord (row, index, item) {
                let rowObj = this.typeD
                this.typeD.forEach((v, i) => {
                    if (i == index) {
                        v.flag = true
                    } else {
                        v.flag = false
                    }
                })
                this.switchRecordIndex = {
                    index: index,
                    item
                }
                // 切换重置
                if (typeof row === 'object') {
                    this.pageCurrent = 1
                    this.pageSize = 10
                    this.totalPage = 1
                    this.listData = []
                }
                this.getListType({
                    page: this.pageCurrent,
                    pageSize: this.pageSize,
                    statusList: this.switchRecordIndex.item.statusList,
                }, index)
            },
            getListType (params, index) {
                let http
                if (index == 0 || index == 2)
                http = '/wx/integral/list_integral_detail'
                else {
                    this.moreText = "即将上线，敬请期待...";
                    this.listData = []
                    return false
                }

                this.loading = true
                // 获取列表
                this.$HttpRequest({
                    url: '/wx/integral/list_integral_detail',
                    data: params,
                    method: 'post'
                }).then(res => {
                    this.loading = false
                    if (res.data.list) {
                        // 一层扁平化无递归
                        // [1,23,[1,23],[1231,11]].flatMap(x => x)
                        // 多层递归扁平化
                        // function steamroller3(arr){
                        //     return arr.reduce((prev,next)=>{
                        //         return prev.concat(Array.isArray(next)?steamroller3(next):next)
                        //     },[])
                        // }
                        res.data.list.forEach(x => { 
                            if (typeof x.createTime === 'number')
                            x.createTime = formatDate(x.createTime, true)
                            this.listData.push(x)
                         })

                        this.pageCurrent = res.data.pageCurrent
                        this.totalPage = res.data.totalPage
                        this.pageSize = res.data.pageSize
                        if (this.totalPage > this.pageCurrent)
                        this.moreText = "下拉加载更多";
                        else
                        this.moreText = "全部加载完成";
                    } else
                    this.moreText = "全部加载完成";
                })
            },
            onScroll () {
				let innerHeight = document.body.clientHeight;
				let outerHeight = document.documentElement.clientHeight;
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                let Height = outerHeight + scrollTop
                this.pageflag = false;
				if (innerHeight == Height) {
                    this.pageflag = true
					if (this.pageCurrent < this.totalPage && this.pageflag) {
						this.pageflag = false;
						this.pageCurrent = this.pageCurrent + 1;
                        this.getListType({
                            page: this.pageCurrent,
                            pageSize: this.pageSize,
                            statusList: this.switchRecordIndex.item.statusList,
                        }, this.switchRecordIndex.index)
					}

				}
            }
        },
        beforeRouteLeave(to, form, next) {
			// 离开需要卸载滚动事件监听
			window.removeEventListener("scroll", this.onScroll, false);
			next()
		}
	}
</script>

<style lang="scss">
//     background-image: linear-gradient(90deg,#20BBB6 -5%,#2499D6 100%);
// }
    .pointsMallInfo {
        width: calc(100%);
        .header_swi{
            width: calc(100% - .4rem);
            padding: 0 .2rem;
            position: fixed;
            left: 0;
            background: #F6F6F6;
            nav{
                width: 100%;
                li{
                    list-style: none;
                    float: left;
                    width: 33.3%;
                    text-align: center;
                    line-height: .96rem;
                    font-size: .3rem;
                    color: #343434;
                    a{
                        color: #343434;
                        height: .96rem;
                        display: inline-block;
                    }
                }
                .action{
                    a{
                        color: #14BAB4;
                        border-bottom: .06rem solid #14BAB4;
                    }
                }
            }
        }
        .content{
            width: 100%;
            clear: both;
            background: #fff;
            padding: .22rem 0;
            margin-top: 1rem;
            padding-bottom: 1.2rem;
            nav{
                padding: 0 .3rem;
                li{
                    list-style: none;
                    min-height: 1rem;
                    padding-top: 8px;
                    border-bottom: 1px solid #ECECEC;
                    display: flex;
                    span{
                        color: #333
                    }
                    .left{
                        display: inline-block;
                        width: 70%;
                    }
                    .right{
                        display: inline-block;
                        width: 30%;
                        text-align: right;
                    }
                }
                li:first-child{
                    padding: 0;
                }
                li:nth-last-child(2){
                    border: 0;
                }
            }
        }
    }
</style>
