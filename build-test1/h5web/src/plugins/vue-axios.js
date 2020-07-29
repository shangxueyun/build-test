import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios)


axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

// 
	// 
	let param = new URLSearchParams();
	// param.append("sessionID", sessionStorage.sessionID);
	// param.append("userID", 10001);
	// param.append("open_id", sessionStorage.openID);
	
	// param.append("mobile", "13800138000");
	// param.append("password", "admin");
	param.append("open_id", localStorage.openID);
	// alert(param);
	
	// 
	config.data = param;
	// alert(userID);
	// console.log(config);
	//config.body
	if (localStorage.openID)
	config.headers = {
		openID: localStorage.openID
	}

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
//在这里你可以判断后台返回数据携带的请求码
if (response.status === 200) {
return response.data
} else {
// 非200请求抱错
throw Error(response.data.msg || '服务异常')
}
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });