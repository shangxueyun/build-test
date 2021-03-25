<template>
	<div v-loading="loading">
    <template v-if="JumpComponent == 1">
      <internal-user :status="RouteStatus" :permissionMenu="JumpComponent"></internal-user>
    </template>
    <template v-if="JumpComponent == 2">
      <external-user :status="RouteStatus" :permissionMenu="JumpComponent"></external-user>
    </template>
	</div>
</template>




<script>
import { mapState } from 'vuex'
import ExternalUser from '@/components/myEnquiryChildren/ExternalUser'
import InternalUser from '@/components/myEnquiryChildren/InternalUser'
	export default {
		data: function() {
			return {
        JumpComponent: '', // 1 客户 2 棉联用户
        RouteStatus: null,
        userInfo: '',
        loading: true
			}
    },
    components: {
      ExternalUser,
      InternalUser
    },
    computed: {
      // 全局用户信息
      userInfoM: {
        get() {
          return this.$store.state.userInfo.userInfo
        },
        set(val) {}
      }
		},
		created() {
      this.userInfo = this.userInfoM
      if (JSON.stringify(this.userInfo) == '{}')
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo')) ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
      if (JSON.stringify(this.userInfo) == '{}') {
        this.$HttpRequest({url: '/wx/user/userInfo',method: 'post'}).then(res => {
          if (res.code != 9999 && res.entity) {
            let { user, member, permissionMenu } = res.entity
            res = { user, member, permissionMenu }
          }
          this.afterUser(res)
        })
      } else {
        this.afterUser(this.userInfo)
      }
		},
		mounted() {
			// this.checkedAll();
    },
    methods: {
      afterUser (obj) {
        this.userInfo = obj
        if (!this.userInfo.user) {
          this.$message({
            showClose: true,
            message: this.userInfo.message,
            type: 'error',
            onClose: () => {
              this.$router.push({
                path: '/login'
              })
            }
          });
        } else {
          this.RouteStatus = this.$route.params.id
          this.userInfo.permissionMenu.forEach(value => {
            if (value == 'BUY_ENQUIRY')
            this.JumpComponent = 1
            else if (value == 'BUY_ENQUIRY_PLATFORM')
            this.JumpComponent = 2
          });
        }
        this.loading = false
      }
    }
    // //加载列表
		// beforeRouteEnter(to, from, next) {
    //   //beforeRouteEnter中this无效，所以能用vm
    //   // debugger
		// 	// next(vm => {
    //   //   debugger
    //   //   vm.RouteStatus = to.params.id; //好的抓到id了
    //   //   console.log(vm.RouteStatus)
    //   // })
    // }
	}
</script>

<style lang="scss">

</style>
