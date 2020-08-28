// import Cookies from 'js-cookie'

  let { parse, stringify } = window.JSON

  const state = {
    // 局部操作信息
    operatingInfo: sessionStorage.getItem('operatingInfo') ? parse(sessionStorage.getItem('operatingInfo')) : 
    {
      // 按需添加
      UserEnquiries: null
    }
  }
  
  const mutations = {
    OPREATING_INFO_SET: (state, responseObj) => {
      state.operatingInfo = Object.assign(state.operatingInfo, responseObj)
    },
    CLOSE_SESSIONSTORAGE: (state, responseObj) => {
      sessionStorage.setItem('operatingInfo', stringify(responseObj))
    }
  }
  
  const getters = {
    OPREATING_INFO_GET: (state) => (name) => {
      return state.operatingInfo[name]
    }
  }
  
  const actions = {
    OPREATING_INFO_GET({ commit }) {
      //获取账户信息
			this._vm.$http.post('/wx/trade/cartCount').then((response) => {
        if (response.entity)
        response = response.entity
        else
        response = 0
        commit({
          type: 'CLOSE_SESSIONSTORAGE',
          UserEnquiries: response
        })
        commit({
          type: 'OPREATING_INFO_SET',
          UserEnquiries: response
        })
			});
  },
  }
  
  export default {
    state,
    getters,
    mutations,
    actions
  }