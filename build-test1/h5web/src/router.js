import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index/index.vue'
import Shop from './views/shop/shop.vue'
// import ShopList from '@/components/shop/shopList.vue'
import NewsDetails from './views/index/newsDetails.vue'//新闻详情
import NewsList from './views/index/newsList.vue'//新闻列表
import ShopDetails from './views/shop/shopDetails.vue'//店铺详情
import ShoppingCart from './views/shoppingCart/shoppingCart.vue'//购物车
import Personal from './views/personal/personal.vue'//个人中心
import Information from './views/personal/information.vue'//个人信息
import MyOrder from './views/personal/myOrder.vue'//我的订单
import MyOrderBuy from './views/personal/myOrderBuy.vue'//我的购买订单
import MyResource from './views/personal/myResource.vue'
import MyImport from './views/personal/myImport.vue'
import Customized from './views/personal/customized.vue'
import Edit from './views/personal/edit.vue'
import MyCustomized from './views/personal/myCustomized.vue'
import OrderDetail from './views/personal/orderDetail.vue'//订单详情
import OrderDetailBuy from './views/personal/orderDetailBuy.vue'//购买订单详情
import MyResDetails from './views/personal/myResDetails.vue'
import Seller from './views/personal/seller.vue'
import SellerBuy from './views/personal/sellerBuy.vue'
import Enquiry from './views/personal/enquiry.vue'
import WaitEnquiry from './views/personal/waitEnquiry.vue'
import MyEnquiry from './views/personal/myEnquiry.vue'
import SpotPrice from './views/personal/spotPrice.vue'
import UpData from './views/upData.vue'


import Register from './views/register.vue'
import Login from './views/login.vue'
import Loginpass from './views/loginpass.vue'
import FindPassword from './views/findPassword.vue'
import Verification from './views/verification.vue'
import Warehouse from './views/resource/warehouse.vue'
import ResDetails from './views/resource/resDetails.vue'
import QualityList from './views/resource/qualityList.vue'
import SearchList from './views/searchList.vue'



Vue.use(Router)

const routes = [
		{
			path: '/index',
			name: 'index',
			component: Index,
			alias: '/',
			meta: {keepAlive: false},
		},
		{
			path: '/shop',
			name: 'shop',
			component: Shop,
			meta: {keepAlive: false},
			// children: [{
			// 	path: 'shopList',
			// 	name: 'shopList',
			// 	component: ShopList,
			// 	alias: '/',
			// }, ]
		},
		{
			path: '/shop/shopDetails/:id/:pid',
			name: 'shopDetails',
			component: ShopDetails,
		},
		{
			path: '/newsList/newsDetails/:id/:status',
			name: 'newsDetails',
			component: NewsDetails,
		},
		{
			path: '/personal',
			name: 'personal',
			component: Personal,
			meta: { requiresAuth: true ,isUseCache: false},
			
		},
		{
			path: '/shoppingCart',
			name: 'shoppingCart',
			component: ShoppingCart,
			meta: { requiresAuth: true ,isUseCache: false}
		},
		{
			path: '/personal/information',
			name: 'information',
			component: Information,
			meta: { requiresAuth: true }
		},
		{
			path: '/upData',
			name: 'upData',
			component: UpData,
		},
		{
			path: '/personal/myOrder/:id',
			name: 'myOrder',
			component: MyOrder,
			meta: { requiresAuth: true }
		},
		{
			path: '/personal/enquiry/:id',
			name: 'enquiry',
			component: Enquiry,
			meta: { requiresAuth: true }
		},
		{
			path: '/personal/waitEnquiry',
			name: 'waitEnquiry',
			component: WaitEnquiry,
			meta: { requiresAuth: true ,isUseCache: false}
		},
		{
			path: '/personal/myEnquiry/:id',
			name: 'myEnquiry',
			component: MyEnquiry,
			meta: { requiresAuth: false }
		},
		{
			path: '/personal/spotPrice/:id',
			name: 'spotPrice',
			component: SpotPrice,
			meta: { requiresAuth: false }
		},
		{
			path: '/personal/myOrderBuy/:id',
			name: 'myOrderBuy',
			component: MyOrderBuy,
			meta: { requiresAuth: true }
		},
		{
			path: '/personal/myResource',
			name: 'myResource',
			component: MyResource,
			meta: { requiresAuth: true }
		},
		{
			path: '/personal/myImport/:id',
			name: 'myImport',
			component: MyImport,
			meta: { requiresAuth: true }
		},
		{
			path: '/personal/edit/:searchId',
			name: 'edit',
			component: Edit,
			meta: { requiresAuth: true }
		},
		{
			path: '/personal/customized',
			name: 'customized',
			component: Customized,
			meta: { requiresAuth: true }
		},
		{
			path: '/personal/myCustomized',
			name: 'myCustomized',
			component: MyCustomized,
			meta: { requiresAuth: true }
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
		},
		{
			path: '/loginpass',
			name: 'loginpass',
			component: Loginpass,
			meta: {keepAlive: true},
		},
		{
			path: '/findPassword',
			name: 'findPassword',
			component: FindPassword,
			meta: {keepAlive: true},
		},
		{
			path: '/verification/:id',
			name: 'verification',
			component: Verification,
			meta: {keepAlive: true},
		},
		{
			path: '/warehouse/:searchId/:listingType',
			name: 'warehouse',
			component: Warehouse,
			meta: {
			     keepAlive: false // 需要被缓存
			},
		},
		{
			path: '/newsList',
			name: 'newsList',
			component: NewsList,
			meta: {
			     keepAlive: true // 需要被缓存
			},
		},
		{
			path: '/warehouse/resDetails',
			name: 'resDetails',
			component: ResDetails,
		},
		{
			path: '/personal/myResDetails/:id',
			name: 'myResDetails',
			component: MyResDetails,
		},
		{
			path: '/warehouse/qualityList/:id',
			name: 'qualityList',
			component: QualityList,
		},
		{
			path: '/personal/orderDetail/:id',
			name: 'orderDetail',
			component: OrderDetail,
		},
		{
			path: '/personal/orderDetailBuy/:id',
			name: 'orderDetailBuy',
			component: OrderDetailBuy,
		},
		{
			path: '/personal/seller/:id',
			name: 'seller',
			component: Seller,
		},
		{
			path: '/personal/sellerBuy/:id',
			name: 'sellerBuy',
			component: SellerBuy,
		},
		{
			path: '/searchList',
			name: 'searchList',
			component: SearchList,
			meta: {keepAlive: true},
		},
	]
	// scrollBehavior (to, from, savedPosition) {
	//   return { x: 0, y: 0 }
	// };
const router = new Router({
	// mode: 'history',
	routes
})
router.beforeEach((to,from,next)=>{
	
	if(to.matched.some(record => record.meta.requiresAuth)){
		if(localStorage.openID==''){
			alert('您还没有登录，请先登录');
			next('/login');
		}else{
		  next();
		}
	}else{
		next();
	}
})

export default router

