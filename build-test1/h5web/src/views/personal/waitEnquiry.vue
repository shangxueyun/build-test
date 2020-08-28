<template>
	<div v-loading="loading">
    <template v-if="JumpComponent == 1">
      <internal-user></internal-user>
    </template>
    <template v-if="JumpComponent == 2">
      <external-user></external-user>
    </template>
	</div>
</template>




<script>
import { mapState } from 'vuex'
import ExternalUser from '@/components/waitEnquiryChildren/ExternalUser'
import InternalUser from '@/components/waitEnquiryChildren/InternalUser'
	export default {
		data: function() {
			return {
        JumpComponent: '', // 1 客户 2 棉联用户
        loading: true
			}
    },
    components: {
      ExternalUser,
      InternalUser
    },
    computed: mapState({
			// 全局用户信息
			userInfo: state => state.userInfo.userInfo
		}),
		created() {
      if (!this.userInfo.user) {
        this.$message({
          showClose: true,
          message: this.userInfo.message,
          type: 'error',
          duration: 1000,
          onClose: () => {
            this.loading = false
            this.$router.push({
              path: '/login'
            })
          }
        });
      } else {
        this.userInfo.permissionMenu.forEach(value => {
          if (value == 'WAIT_ENQUIRY')
          this.JumpComponent = 1
          else if (value == 'WAIT_ENQUIRY_PLATFORM')
          this.JumpComponent = 2
        });

        if (this.JumpComponent == '') {
          this.$message({
            showClose: true,
            message: '待询盘为买方功能，您没有权限',
            duration: 1000,
            type: 'error',
            onClose: () => {
              this.loading = false
              this.$router.push({
                path: '/personal'
              })
            }
          });
        }else
        this.loading = false
      }
		},
		mounted() {
			// this.checkedAll();
		}
	}
</script>

<style lang="scss">

</style>
