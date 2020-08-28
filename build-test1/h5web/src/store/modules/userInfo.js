// import vue from 'vue'

let { parse, stringify } = window.JSON

const state = {
  // 全局userinfo对象
  userInfo: sessionStorage.getItem('userInfo') ? parse(sessionStorage.getItem('userInfo')) : {}
}

const mutations = {
  USER_INFO_SET: (state, responseObj) => {
    state.userInfo = responseObj.userInfo
    if (responseObj.userInfo == 'logout')
    sessionStorage.setItem('userInfo', '')
  },
  CLOSE_SESSIONSTORAGE_user: (state, obj) => {
    sessionStorage.setItem('userInfo', stringify(obj.userInfo))
  }
}

const getters = {
  USER_INFO_GET: (state) => (name) => {
    return state.userInfo[name]
  }
}

const actions = {
  USER_INFO_GET({ commit }) {
      //获取账户信息
			this._vm.$http.post('/wx/user/userInfo').then((response) => {
        if (response.code != 9999 && response.entity) {
          let { user, member, permissionMenu } = response.entity
          response = { user, member, permissionMenu }
        }
        commit({
          type: 'CLOSE_SESSIONSTORAGE_user',
          userInfo: response
        })
        commit({
          type: 'USER_INFO_SET',
          userInfo: response
        })
			});
  },
  // async USER_INFO_GET ({ commit, state, rootState }) {
  //   debugger
  //   const region = rootState.common.region
  //   const videoId = state.mId
  //   // console.log('context=>', context)
  //   const { data } = await this._vm.$http.post('/wx/user/userInfo')
  //   // commit('SET_MEDIAINFO', data)
  //   if (data.code != 9999||data.entity !=null ) {
  //     commit({
  //       type: 'CLOSE_SESSIONSTORAGE_user',
  //       userInfo:data.entity
  //     })
  //   } else
  //   commit({
  //     type: 'CLOSE_SESSIONSTORAGE_user',
  //     userInfo:data
  //   })
  // },
  // 数据接口测试
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}