import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import rem from '../src/common/js/rem.js'
import style from '../src/common/css/common.css'
import config from '../vue.config.js'
import element from '../src/plugins/element.js'
import axios from '../src/plugins/vue-axios.js'

import request from '@/utils/request.js'
// swiper
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
// vue-wechat-title
// import VueWechatTitle from 'vue-wechat-title'
// Vue.use(VueWechatTitle)
// 
Vue.config.productionTip = false;
// Vue.prototype.gethref = function (name,data){
// 	var startHref_= 'https://www.unioncotton.com/web';
// 	
// 	if (check()) {
// 		if(name=='index'){
// 			window.location.href=startHref_+'/index'
// 		}else if(name=='shop1'){
// 			window.location.href=startHref_+'/mall/shop'
// 		}else if(name=='shopDetails'){
// 			window.location.href=startHref_+'/mall/shop'
// 		}
// 	}
// 	function check() { 
// 	  var userAgentInfo=navigator.userAgent; 
// 	  var Agents =new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"); 
// 	  var flag=true; 
// 	  for(var v=0;v<Agents.length;v++) { 
// 	     if(userAgentInfo.indexOf(Agents[v])>0) { 
// 	       flag=false; 
// 	       break; 
// 	     } 
// 	   } 
// 	   return flag; 
// 	}
// }


// Vue.prototype.$ajax = axios;
Vue.prototype.$HttpRequest = request;

// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
new Vue({
	router,
	config,
	style,
	store,
	render: h => h(App)
}).$mount('#app')
