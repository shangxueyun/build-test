// import Cookies from 'js-cookie'

let { parse, stringify } = window.JSON

const state = {
  // 局部操作信息 商城 店铺
  shoppingMallInfo: {},
  shopInfo: {}
}

const mutations = {
  pageDataReturn_SET: (state, responseObj) => {
    state[responseObj.key] = Object.assign(state[responseObj.key], responseObj[responseObj.key])
  }
}

const getters = {
  pageDataReturn_GET: (state) => (name) => {
    if (name)
    return state[name]
    else
    return state
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}