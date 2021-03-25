<template>
	<div v-loading="loading">
		<div class="topBack" >
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>店铺详情</p>
		</div>
		<div class="addHeight"></div>
		<shoptop :shopdet='shopdet'></shoptop>
		<!-- <div class="shop_zz">
			<div class="shopli_tab">
				<div class="shopli_tab_inx active">新疆棉</div><i></i>
				<div class="shopli_tab_inx">进口棉$</div><i></i>
				<div class="shopli_tab_inx">进口棉￥</div><i></i>
				<div class="shopli_tab_inx">地产棉</div>
				
				<div class="clear"></div>
			</div>
		</div> -->
		<div class="class_tab">
			<input class="fl" :class="{on:class_tab == 1}" @click="tab_switch(1)" type="button" :value='"国产棉("+totalRow+")"'>
			<input class="fl" :class="{on:class_tab == 2}" @click="tab_switch(2)" type="button" :value='"进口棉("+imptotalRow+")"'>
			<div class="clear"></div>
		</div>
		<div class="shop_bottom" id="shop_bottom" v-if="class_tab==1">
			<i class="shop_zz" v-if="shopzz" @click="hiddenTab"></i>
			<div class="option_wrap option2" id="option">
					<div class="option">
						<!-- <span class="fl" :class="{ active:optActive == 1}" @click="clickActive(1)">排序<i></i></span> -->
						<swiper class='search_tab fr'  :options="swiperOption_tab2">
							<span v-for="(item,index) in save_list" :key="index" :class="{ on:item.searchID == search_ID}" class="swiper-slide" @click="search_list(index,item.searchID)">{{item.searchName}}</span>
						</swiper>
						<!-- <span v-for="(item,index) in option" :class="{ active:optActive == index+1}" @click="clickActive(index)">{{item}}<i></i></span> -->
						<!-- <span class="fl yellow" :class="{ active:optActive == 2}" @click="clickActive(2)">筛选</span> -->
						<span class="fl active filter" v-if="optActive != 2" @click="clickActive(2)">筛选</span>
						<span class="fl active filter" v-if="optActive == 2" @click="clickActive(2)">筛选</span>
						<div class="clear"></div>
					</div>
					<!-- <div v-show="optActive == 1" class="option_screen">
						<div class="opt_con">
							<span v-for="(item,index) in lx_items_list" :class="{'active':item.flag}" @click="addparams(item.filter,item.value,index)">{{item.name}}</span>
						</div>
						<i @click="hiddenTab"></i>
					</div>
					<div v-show="optActive == 2" class="option_screen">
						<div class="opt_con">
							<span v-for="(item,index) in ysj_items_list" :class="{'active':item.flag}" @click="addparams(item.filter,item.value,index)">{{item.name}}</span>
						</div>
						<i @click="hiddenTab"></i>
					</div>
					<div v-show="optActive == 3" class="option_screen">
						<div class="opt_con">
							<span v-for="(item,index) in address_list" :class="{'active':item.flag}" @click="addparams(item.filter,item.value,index)">{{item.name}}</span>
						</div>
						<i @click="hiddenTab"></i>
					</div> -->
				</div>
				
				<div class="res_list">
					<ul>
						<li class="res_inx" v-for="(item,index) in warehouseList" :key="index">
							<!-- <div class="ins_l">
								
							</div> -->
							<div class="ins_r">
								<div class="res_top wrap">
									<input type="checkbox" class="checkID" style="margin-right: 10px;margin-top: 5px;" :value="item.listingID" @click="addlistingID()"/>
									<!-- <p v-if="item.listingType==1" class="top_cla">自营</p> -->
									<p class="top_num">{{item.batchID}}</p> 
									<p class="top_lei">{{item.cottonTypeName}}</p>
									<!-- <p class="top_grade">{{item.notes}}</p> -->
									<p class="weight_two" style="line-height:.48rem">{{item.packnum}}</p>
									<div class="clear"></div>
								</div>
								<div class="res_con" @click="godetails(item.batchID,item.listingID)">
									<div><span class="num">{{item.primaryColorName}}</span></div><i></i>
									<div><span class="title">长度</span><br><span class="num">{{item.lengthAvg}}</span></div><i></i>
									<div><span class="title">强力</span><br><span class="num">{{item.strongAvg}}</span></div><i></i>
									<div><span class="title">马值</span><br><span class="num">{{item.mikeAvg}}</span></div><i></i>
									<div><span class="title">含杂</span><br><span class="num">{{item.impurity}}</span></div><i></i>
									<div><span class="title">回潮</span><br><span class="num">{{item.moisture}}</span></div><i></i>
									<div><span class="title">整齐度</span><br><span class="num">{{item.neatAvg}}</span></div>
									<div class="clear"></div>
								</div>
								<div class="cang" @click="godetails(item.batchID,item.listingID)">
									<p class="" style="font-size: 0.28rem;">加工企业:{{item.factoryName}}</p>
									
									<p class="zhishu fr" v-if="item.indexCode">{{item.indexCode}}<span v-if="item.basis>=0">+</span>{{item.basis}}</p>
								</div>	
								<div class="cang" @click="godetails(item.batchID,item.listingID)" style="margin-bottom: 0.1rem;">
									<p style="font-size: 0.28rem;">仓库：{{item.depotName}}</p>
									<p class="weight_one fr"><span>{{item.pubPrice}}</span>元/吨</p>
								</div>	
								<div class="res_bot wrap" @click="godetails(item.batchID,item.listingID)">
									<div class="res_price">
										<!-- <p class="weight_two">公重<span>{{item.pubWeight}}</span> 吨</p> -->
										<p class="weight_two" v-if="item.amountType!=8">公重<span>{{item.pubWeight}}</span> 吨</p>
										<p class="weight_two" v-if="item.amountType==8">仓重<span>{{item.amount}}</span> 吨</p>
										<p class="top_date">{{item.listingDate.substring(5,11)}}</p>
									</div>
									
									<!-- <input class="res_btn" type="button" value="添加询盘" @click.stop="joinCart(item.listingID)"> -->
									<input class="res_btn" v-if="item.cartID==0&&item.status == 0" type="button" value="添加询盘" @click.stop="joinCart(item.listingID,item);">
									<input class="res_btn" v-if="item.cartID!=0&&item.status == 0" type="button" value="删除询盘" style="background: #14bab4;" @click.stop="removeCart(item.listingID,item);">
									<input class="res_btn" v-if="item.status != 0" type="button" value="添加询盘" style="background: #ccc;" @click.stop="">
									<!-- <div class="clear"></div> -->
								</div>
								<!-- <div class="cang">
									<p class="leixing1" v-if="item.listingType==1">棉联优选</p>
									<p class="leixing2" v-if="item.listingType==0">{{item.memberOwnerName}}</p>
								</div> -->
							</div>
							<div class="status">
								<img v-if="item.status != 0" src="../../assets/img/status1.png" alt="">
								<p v-if="item.status != 0">已售</p>
								<img v-if="item.status == 0&&item.inPointPrice && item.inPointPrice =='是'" src="../../assets/img/status2.png" alt="">
								<p v-if="item.status == 0&&item.inPointPrice && item.inPointPrice =='是'">点价中</p>
							</div>
						</li>
			
					</ul>
					
					<p v-if="!resshow" class="more_btn">{{moreText}}</p>
					<div v-if="resshow" class="noRes">
						<img src="../../assets/img/noRes.png" alt="">
						<p>别着急，商家资源准备中，马上上架</p>
					</div>
					<div class="saveName" v-if="save_show">
						<div class="saveName_bg"></div>
						<div class="saveName_con">
							<p>请为您定制的需求命名吧</p>
							<input type="text" id='save_txt' class="saveName_txt" v-model="saveName">
							<div class="save_b">
								<input type="button" class="saveName_sure" value="保存" @click="add_history">
								<input type="button" class="saveName_close" value="取消" @click="save_show=false;saveName ='';">
							</div>
						</div>
					</div>
					<div class="list_bottom"></div>
				</div>
			</div>
			<div class="shop_bottom2" id="shop_bottom2" v-if="class_tab==2">
				<i class="shop_zz" v-if="shopzz" @click="hiddenTab"></i>
				<div class="option_wrap option2" id="option">
						<div class="option">
							<div class='search_tab fl'></div>
							<span class="fr active" @click="clickActive(3)">筛选</span>
							<div class="clear"></div>
						</div>
						
						<div v-show="optActive == 3" class="option_screen slide">
							<div class="opt_con" @scroll="hidSee">
								<div>
									<p class="save_title">报价方式:</p>
									<span :class="{'active':currency_arr.includes(2)}" @click="addparams2(2,'currency')">美元</span>
									<span :class="{'active':currency_arr.includes(1)}" @click="addparams2(1,'currency')">人民币</span>
								</div>
								<div>
									<p class="save_title">产地:</p>
									<span v-for="(item,index) in country_list" :key="index" :class="{'active':origins_arr.includes(index)}" @click="addparams2(index,'origins')">{{item}}</span>	
								</div>
								<div>
									<p class="save_title">棉花等级:</p>
									<span v-for="(item,index) in grade_list" :key="index" :class="{'active':levle_arr.includes(index)}" @click="addparams2(index,'levle')">{{item}}</span>
								</div>
								<div>
									<p class="save_title">棉花长度:</p>
									<span :class="{'active':length_arr.includes('32')}" @click="addparams2('32','length')">32</span>
									<span :class="{'active':length_arr.includes('33')}" @click="addparams2('33','length')">33</span>
									<span :class="{'active':length_arr.includes('34')}" @click="addparams2('34','length')">34</span>
									<span :class="{'active':length_arr.includes('35')}" @click="addparams2('35','length')">35</span>
									<span :class="{'active':length_arr.includes('36')}" @click="addparams2('36','length')">36</span>
									<span :class="{'active':length_arr.includes('37')}" @click="addparams2('37','length')">37</span>
									<span :class="{'active':length_arr.includes('38')}" @click="addparams2('38','length')">38</span>
								</div>
								<div>
									<p class="save_title">马克隆值:</p>
									<span v-for="(item,index) in make_list" :key="index" :class="{'active':mike_arr.includes(index)}" @click="addparams2(index,'mike')">{{index}}[{{item[0]}}-{{item[1]}}]</span>
								</div>
								<div class="opt_slide">
									<p class="slide_bt fl">强力</p>
									<div class="block slide_block fl" @touchstart="showtool('show7')" @touchend="addparams2">
										<el-slider v-model="value7" range :min="250" :max="320" :marks="marks7" :format-tooltip="formatTooltip" :show-tooltip="isSee7">
										</el-slider>
									</div>
									<div class="clear"></div>
								</div>
								<div>
									<p class="save_title">交货地:</p>
									<span v-for="(item,index) in port_list" :key="index" :class="{'active':placeDelivery_arr.includes(item.portNameEN)}" @click="addparams2(item.portNameEN,'placeDelivery')">{{item.portNameCN}}</span>
								</div>
							</div>
							<div class="slide_click">
								<input class="wancheng" id="wancheng" type="button" value="确定筛选" @click="addparams('noshow')">
							</div>
							<i @click="hiddenTab"></i>
						</div>
				</div> 
				<div class="res_list">
					<ul>
						<li class="res_inx" v-for="item in importList" :key="item.importlistingID">
							<!-- <div class="ins_l">
								
							</div> -->
							<div class="ins_r">
								<div class="res_top wrap">
									<input type="checkbox" class="checkID2" style="margin-right: 0.2rem; float: left;margin-top: 0.1rem;" :value="item.importlistingID" @click="addlistingID2()"/>
									<p class="top_num" style="line-height: .4rem;overflow: hidden;">{{item.importlistingID}}</p>
									<p class="top_grade" style="width: 1.5rem;line-height: .4rem;">提单:{{item.billOfLoadingNo}}</p>
									<p class="top_date" style="max-width: 2rem;">{{item.depot}}</p>
									<div class="clear"></div>
								</div>
								<div class="res_con">
									<div><span class="title">年度</span><br><span class="num">{{item.year}}</span></div><i></i>
									<div><span class="title">产地</span><br><span class="num">{{item.originsName}}</span></div><i></i>
									<div><span class="title">等级</span><br><span class="num">{{item.levle}}</span></div><i></i>
									<div><span class="title">长度</span><br><span class="num">{{item.length}}</span></div><i></i>
									<div><span class="title">强力</span><br><span class="num">{{item.strong}}</span></div><i></i>
									<div><span class="title">马值</span><br><span class="num">{{item.mike}}</span></div>
									<div class="clear"></div>
								</div>
								<div class="cang">
									<p>卖家：{{shopdet.member.corpName}}</p><p class="zhishu" v-if="item.indexCode">{{item.indexCode}}<span v-if="item.price>=0">+</span>{{item.price}}</p>
								</div>
								<div class="res_bot wrap">
									<p class="weight_one" v-if="item.currency==1"><span>{{item.indexValue+item.price}}</span>元/吨</p>
									<p class="weight_one" v-if="item.currency==2"><span>{{item.indexValue+item.price}}</span>美分/磅</p>
									<input class="res_btn" type="button" value="我要下单"  @click="tellus(item.listingType,item.userOwner,item.userID)">
									<div class="clear"></div>
								</div>
								
							</div>
						</li>
							
					</ul>
					
					<p v-if="!resshow" class="more_btn">{{moreText}}</p>
					<div v-if="resshow" class="noRes">
						<img src="../../assets/img/noRes.png" alt="">
						<p>别着急，商家资源准备中，马上上架</p>
					</div>
					<div class="saveName" v-if="save_show">
						<div class="saveName_bg"></div>
						<div class="saveName_con">
							<p>请为您定制的需求命名吧</p>
							<input type="text" id='save_txt' class="saveName_txt" v-model="saveName">
							<div class="save_b">
								<input type="button" class="saveName_sure" value="保存" @click="add_history">
								<input type="button" class="saveName_close" value="取消" @click="save_show=false;saveName ='';">
							</div>
						</div>
					</div>
					<div class="list_bottom"></div>
				</div>
			</div>
			<div class="tell_admin" v-if="tell_admin">
				<div class="tell_bg"></div>
				<div class="tell_con">
					<p class="p1">请联系管理员</p>
					<p class="p2">{{username}} <a :href="'tel:'+userphone">{{userphone}}（点击拨打）</a></p>
					<input type="button" value="关闭" @click="tell_admin=false">
				</div>
			</div>
			<div class="share">
				<img class="share_show" src="../../assets/img/share_icon2.png" alt="" @click="shareIF=!shareIF">
				<!-- <input class="share_show" type="button" value="分享"> -->
				<div class="share_con" v-if="shareIF">
					<p>请输入分享标题</p>
					<input class="input_txt" type="text" v-model="share_title">
					<p>请输入分享内容</p>
					<textarea name="" id="" cols="30" rows="10" v-model="share_txt"></textarea>
					<div class="share_btn">
						<input class="sure fl" type="button" value="确定" @click="sure_share">
						<input class="close fr" type="button" value="取消" @click="shareIF=false">
						<div class="clear"></div>
					</div>
				</div>
				<div class="share_bg" v-if="shareIF"></div>
			</div>
			<div v-show="optActive == 2" class="option_screen slide"  ref="transition_right">
				<div class="opt_con" @scroll="hidSee">
					<div class="opt_botl">
						<p class="save_title" style="margin-top:0">类型:</p>
						<span v-for="(item,index) in lx_items_list" :key="index" :class="{'active':item.flag,'yellow':item.color=='yellow','green':item.color=='green'}" @click="addparams(item.filter,item.value,index,1)">{{item.name}}</span>	
					</div>
					<div class="opt_botl">
						<p class="save_title">颜色级:</p>
						<span v-for="(item,index) in ysj_items_list" :key="index" :class="{'active':item.flag}" @click="addparams(item.filter,item.value,index,2)">{{item.name}}</span>
					</div>
					<div class="opt_botl" style="padding: 0">
						<p class="save_title" style="margin-left: .18rem;">存放地:</p>
						<!-- 城市父级循环不在点击范围 -->
						<template v-if="address_list.length">
						<place-of-origin ref="placeOfOrigin" :ResetFig="ResetFig" :paramsSidings="paramsSidings" v-model="address_list" :type-num="3" @addparamsCall="addparamsCallplace"></place-of-origin>
						</template>
					</div>
					<div class="opt_botl" style="padding: 0">
						<p class="save_title" style="margin-left: .18rem;">产地:</p>
						<!-- 城市父级循环不在点击范围 -->
						<template v-if="yieldly_list.length">
						<place-of-origin ref="placeOfOrigin1" v-model="yieldly_list" :ResetFig="ResetFig" :type-num="6" @addparamsCall="addparamsCallplace"></place-of-origin>
						</template>
					</div>

					
					<div class="opt_cla opt_botl">
						<p class="bt fl">棉花类型：</p>
						<div class="cla_btn fl">
							<span v-for="(item,index) in mhlx_items_list" :key="index" :class="{'active':item.flag}" @click="addparams(item.filter,item.value,index,4)">{{item.name}}</span>
						</div>
						<div class="clear"></div>
					</div>
					<div class="opt_cla opt_botl">
						<p class="bt fl">年度：</p>
						<div class="cla_btn fl">
							<span v-for="(item,index) in Data_list"  :key="index" :class="{'active':item.flag}" @click="addparams(item.filter,item.value,index,5)">{{item.name}}</span>
						</div>
						<div class="clear"></div>
					</div>
					<div class="opt_slide">
						<p class="slide_bt fl">长度</p>
						<div class="block slide_block fl" @touchstart="showtool('show1')">
							<el-slider v-model="value" range :min="260" :max="330" :marks="marks" @change="addparams" :format-tooltip="formatTooltip"
								:show-tooltip="isSee1">
							</el-slider>
						</div>
						<div class="clear"></div>
					</div>
					<div class="opt_slide">
						<p class="slide_bt fl">强力</p>
						<div class="block slide_block fl" @touchstart="showtool('show2')">
							<el-slider v-model="value2" range :min="240" :max="330" :marks="marks2" @change="addparams" :format-tooltip="formatTooltip"
								:show-tooltip="isSee2">
							</el-slider>
						</div>
						<div class="clear"></div>
					</div>
					<div class="opt_slide">
						<p class="slide_bt fl">马值</p>
						<div class="block slide_block fl" @touchstart="showtool('show3')">
							<el-slider v-model="value3" range :min="30" :max="60" :marks="marks3" @change="addparams" :format-tooltip="formatTooltip"
								:show-tooltip="isSee3">
							</el-slider>
						</div>
						<div class="clear"></div>
					</div>
					<div class="opt_slide">
						<p class="slide_bt fl">含杂</p>
						<div class="block slide_block fl" @touchstart="showtool('show4')">
							<el-slider v-model="value4" range :min="0" :max="60" :marks="marks4" @change="addparams" :format-tooltip="formatTooltip"
								:show-tooltip="isSee4">
							</el-slider>
						</div>
						<div class="clear"></div>
					</div>
					<div class="opt_slide">
						<p class="slide_bt fl">回潮</p>
						<div class="block slide_block fl" @touchstart="showtool('show5')">
							<el-slider v-model="value5" range :min="40" :max="110" :marks="marks5" @change="addparams" :format-tooltip="formatTooltip"
								:show-tooltip="isSee5">
							</el-slider>
						</div>
						<div class="clear"></div>
					</div>
					<div class="opt_slide dan">
						<p class="slide_bt fl">整齐度</p>
						<div class="block slide_block fl" @touchstart="showtool('show6')">
							<el-slider v-model="value6" range :min="780" :max="900" :marks="marks6" @change="addparams" :format-tooltip="formatTooltip"
								:show-tooltip="isSee6">
							</el-slider>
						</div>
						<div class="clear"></div>
					</div>
					<!-- <div class="opt_slide">
						<p class="slide_bt fl">长度整齐度</p>
						<div class="block slide_block fl">
							<el-slider v-model="value6" range :min="77" :max="99" :show-tooltip="isSee">
							</el-slider>
						</div>
						<div class="clear"></div>
					</div> -->
				</div>
				<div class="slide_click" style="display: flex;">
					<!-- <input class="chongzhi" type="button" value="点击重置" @click="clearSelect"> -->
					<div class="reset" @click="resetclose">清空 <i></i></div>
					<input class="wancheng" id="wancheng" type="button" value="确定筛选" @click="addparams('noshow')">
					<input class="chongzhi" type="button" value="添加到需求定制" @click="save_top">
				</div>
				<i @click="hiddenTab"></i>
			</div>
			<div v-show="optActive == 1" class="option_screen">
				<div class="opt_con">
					<span v-for="(item,index) in order_items_list" :key="index" :class="{'active':item.flag}" @click="addparams(item.filter,item.value,index)">{{item.name}}</span>
				</div>
				<i @click="hiddenTab"></i>
			</div>
			<img class="goTop" @click="goTop" src="../../assets/img/goTop.png" alt="">
			<img class="share_zhi" v-if="share_zhiIF" @click="share_zhiIF=false" src="../../assets/img/share_zhi.png" alt="">
		</div>
</template>

<script>
  import shoptop from '@/components/shopdetails/shopTop.vue'
  import PlaceOfOrigin from '@/components/PlaceOfOrigin/index'
	export default {
		name: 'shopdetails',
		components: {
      shoptop,
      PlaceOfOrigin
		},
		data: function() {
			return {
				
				shopdet:'',
				class_tab:1,
				shopzz:false,
				tell_admin:false,
				option: ['类型', '颜色级', '存放地', '更多', '排序',],
				optActive:'',
				warehouseList:'',
				paramsSidings: null,
				ResetFig: 0,
				loading:true,
				ifAsc:true,
				asc:'desc',
				search_ID:'',
				isSee1:false,
				isSee2:false,
				isSee3:false,
				isSee4:false,
				isSee5:false,
				isSee6:false,
				isSee7:false,
				lx_items_list: [
					{ id: 0, name: '不限', flag: true, filter: '', value: '' },
					/*{ id: 1, name: '自营', flag: false, filter: 'listingType', value: 1 }, { id: 2, name: '非自营', flag: false, filter: 'listingType', value: 0 }, */
					{ id: 1, name: '棉联优选', flag: false, filter: 'listingType', value: 1 ,color:'green',},
					{ id: 2, name: '店铺资源', flag: false, filter: 'listingType', value: 0 ,color:'green',},
					{ id: 3,name:'固定价',flag:false,filter:'pricing',value:'true',color:'yellow',},
					{ id: 4, name: '点价', flag: false, filter: 'listingIndex',value: 'true',color:'yellow',},
				],
				ysj_items_list: [{ id: 0, name: '不限', flag: true, filter: '', value: '' }, { id: 1, name: '白棉1级', flag: false, filter: 'primaryColor', value: 11 }, { id: 2, name: '白棉2级', flag: false, filter: 'primaryColor', value: 21 }, { id: 3, name: '白棉3级', flag: false, filter: 'primaryColor', value: 31 }, { id: 4, name: '白棉4级', flag: false, filter: 'primaryColor', value: 41 }, { id: 5, name: '白棉5级', flag: false, filter: 'primaryColor', value: 51 }, { id: 6, name: '淡点污棉1级', flag: false, filter: 'primaryColor', value: 12 }, { id: 7, name: '淡点污棉2级', flag: false, filter: 'primaryColor', value: 22 }, { id: 8, name: '淡点污棉3级', flag: false, filter: 'primaryColor', value: 32 }, { id: 9, name: '淡黄染棉1级', flag: false, filter: 'primaryColor', value:13 }, { id: 10, name: '淡黄染棉2级', flag: false, filter: 'primaryColor', value:23 }, { id: 11, name: '淡黄染棉3级', flag: false, filter: 'primaryColor', value:33 }, { id: 12, name: '黄染棉1级', flag: false, filter: 'primaryColor', value:14 }, { id: 13, name: '黄染棉2级', flag: false, filter: 'primaryColor', value:24 }, {id: 14,name: '无',flag: false,filter: 'primaryColor',value: 0}],
			    mhlx_items_list: [{ id: 1, name: '手摘棉', flag: false, filter: 'packType', value:1 }, { id: 2, name: '机采棉', flag: false, filter: 'packType', value:2 }, { id: 3, name: '皮辊棉', flag: false, filter: 'cottonType', value:2 }, { id: 4, name: '长绒棉', flag: false, filter: 'cottonType', value:4 }],
				order_items_list: [{ id: 0, name: '默认排序', temp: '默认排序', flag: true, filter: '', value: '' }, { id: 1, name: '长度', temp: '长度', flag: false, filter: 'lengthAvg', value: 'desc' }, { id: 2, name: '强力', temp: '强力', flag: false, filter: 'strongAvg', value: 'desc' }, { id: 3, name: '含杂', temp: '含杂', flag: false, filter: 'impurity', value: 'desc' }, { id: 4, name: '回潮', temp: '回潮', flag: false, filter: 'moisture', value: 'desc' }, { id: 5, name: '价格', temp: '价格', flag: false, filter: 'price', value:'desc' }],
				importList:'',
				country_list:'',
				make_list:'',
				grade_list:'',
				port_list:'',
				
				currency_arr:[],
				origins_arr:[],
				levle_arr:[],
				length_arr:[],
				mike_arr:[],
				placeDelivery_arr:[],
				
				address_list:'',
				yieldly_list: '', // 产地
				Data_list:'',
				value: [260, 330],
				value2: [240, 330],
				value3: [30, 60],
				value4: [0, 60],
				value5: [40, 110],
				value6: [780, 900],
				// 进口棉强力
				value7: [250, 320],
				// value6: [77, 99],
				marks: {
					260: '26',
					280: '28',
					300: '30',
					320: '32',
					330: '33',
				},
				marks2: {
					240: '24',
					260: '26',
					280: '28',
					300: '30',
					320: '32',
					330: '33',
				},
				marks3: {
					30: '3',
					40: '4',
					50: '5',
					60: '6',
				},
				marks4: {
					0: '0',
					10: '1',
					20: '2',
					30: '3',
					40: '4',
					50: '5',
					60: '6',
				},
				marks5: {
					40: '4',
					60: '6',
					80: '8',
					100: '10',
					110: '11',
				},
				marks6: {
					780: '78',
					800: '80',
					820: '82',
					840: '84',
					860: '86',
					880: '88',
					900: '90',
				},
				
				resshow:true,
				creator_pid:'0',
				params:'',
				slide_btn:'',
				save_show:false,
				saveName:'', 
				save_list:'',
				save_setone:'',
				// 分享
				shareIF:false,
				share_zhiIF:false,
				share_title:'',
				share_txt:'',
				logoUrl:'',
				listId:'',
				listId2:'',
				historyID:'',
				
				// 筛选
				listingType:'',
				listingIndex:'',
				cottonSource:'',
				totalPage: 0,
				
				type:0,
				paramsBoth:'',
				paramsBoth2:'',
				swiperOption_tab2: {
				    speed:1000,
				　　loop: false,
					slidesPerView : 'auto',
				},
				
				// 分頁
				pageCurrent:1,
				pageNum:1,
				pageflag:true,
				pageCurrent2:1,
				pageNum2:1,
				pageflag2:true,
				moreText:'全部加载完成',
				totalRow:0,
				imptotalRow:0,
				// 进口棉联系人
				userId:'',
				userphone:'',
				username:'',
			}
		},
		//加载列表
		beforeRouteEnter(to, from, next) {
			//beforeRouteEnter中this无效，所以能用vm
			next(vm => {
				var creator_ = to.params.id;
				var creator_pid = to.params.pid;
				var historyID = vm.GetUrlParam("historyID");
				if(vm.GetUrlParam("historyID")){
					vm.historyID= vm.GetUrlParam("historyID");
				}else{
					vm.historyID='';
				}
				var ids='';
				var jkid;
				if(vm.GetUrlParam("ids")){ 
					ids = vm.GetUrlParam("ids").split(',');
				}else{
					ids = '';
				}
				if(vm.GetUrlParam("jkid")){
					jkid = vm.GetUrlParam("jkid").split(',');
				}else{
					jkid = '';
				}
				if(jkid!=''){
					vm.class_tab=2;
				}
				vm.membenId = to.params.id;
				vm.$nextTick(() => {
					// console.log(vm.GetUrlParam("ids").split(','));
					vm.axios.post('wx/searchhistory/getHistory?searchID=' + historyID).then((response) => {
						vm.save_setone = response.entity;
						if(historyID){
							vm.search_list(5,historyID);
						}
						
					});
				})
				
				
				var logoUrl;
				vm.axios.get('wx/shop/getMixListing?memberID=' + creator_).then((response) => {
					// console.log(response)
					vm.share_title = response.entity.title;
					vm.share_txt = response.entity.note;
					if(response.entity.logo){
						logoUrl = 'https://www.unioncotton.com/web/resources?p=publish&k=' + response.entity.logo;
					}else{
						logoUrl ="https://mob.unioncotton.com/img/logo.png"
					}
					vm.logoUrl = logoUrl;
					
					wx.ready(function() {
						// 获取“分享给朋友”按钮点击状态及自定义分享内容接口
						wx.onMenuShareAppMessage({
							title: vm.share_title, // 分享标题
							desc: vm.share_txt, // 分享描述
							imgUrl:vm.logoUrl,
							link:'https://mob.unioncotton.com/?code='+localStorage.openID+'&state=123#/shop/shopDetails/'+creator_+'/'+'1&historyID='+vm.historyID+'&ids='+ids+'&jkid='+jkid,
						});
						wx.onMenuShareTimeline({
							title: vm.share_title, // 分享标题
							desc: vm.share_txt, // 分享描述
							imgUrl:vm.logoUrl,
							link:'https://mob.unioncotton.com/?code='+localStorage.openID+'&state=123#/shop/shopDetails/'+creator_+'/'+'1&historyID='+vm.historyID+'&ids='+ids+'&jkid='+jkid,
						});
					});
					
				});
				
					vm.axios.post('wx/shop/detail?memberID=' + creator_ + '&order=price&asc=true&listingID='+ids).then((response) => {
						// vm.songlikelist = res.data.data;
						// console.log(response)
						vm.shopdet = response.entity;
						if(historyID==false){
							vm.warehouseList = response.entity.page.list;
							vm.totalPage = response.entity.page.totalPage;
							vm.pageCurrent = response.entity.page.pageCurrent;
							vm.title = response.entity.member.corpName;
							vm.totalRow = response.entity.page.totalRow;
							// 设置title
							document.title = response.entity.member.corpName
							if(response.entity.page.totalRow==0){
								
								vm.resshow=true;
							}else{
								vm.resshow=false;
							}
							if (response.entity.page.totalPage == 1) {
								vm.moreText = "全部加载完成"
							} else {
								vm.moreText = "下拉加载更多"
							}
							if(vm.importList.length!=0){
								vm.resshow=false;
							}
							vm.loading = false;
						}
					});
				
				
				vm.axios.post('wx/listing/importedList?memberID=' + creator_+'&ids='+jkid+'&status=0').then((response) => {
					vm.importList=response.entity.list;
					vm.totalPage2 = response.entity.totalPage;
					vm.pageCurrent2 = response.entity.pageCurrent;
					vm.imptotalRow = response.entity.totalRow;
					if(vm.importList.length!=0){
						vm.resshow=false;
					}
					if(response.entity.totalRow!=0&&vm.totalRow==0){
						vm.class_tab=2;
					}
				});
				if(creator_pid=='1'){
					document.getElementById('nav').style.display='none';
					document.getElementById('nav2').style.display='flex';
					vm.$store.state.id_=creator_;
				}else{
					document.getElementById('nav').style.display='flex';
					document.getElementById('nav2').style.display='none';
				};
			})
		},
		created() {
			
			this.$http.post('/wx/searchhistory/list').then((response) => {
				this.save_list = response.entity;
			})
			this.$http.post('/wx/index_h5/Country').then((response) => {
				this.country_list = response.data;
			})
			this.$http.post('/wx/index_h5/importedlevel').then((response) => {
				// console.log(response);
				this.grade_list = response.data;
			})
			this.$http.post('/wx/index_h5/importedMike').then((response) => {
				// console.log(response);
				this.make_list = response.data;
			})
			this.$http.post('/wx/index_h5/port?used=1').then((response) => {
				// console.log(response);
				this.port_list = response.data;
			})
		     window.addEventListener('scroll', this.onScroll);
			 window.scroll(0, 0);
		},
		mounted() {
			
			
			// 获取城市 存放地
			this.$http.get('/wx/bases/list_area?type=DEPOSITARY').then((response) => {
				let childArr = response.data
				let NewArr = []
				if(childArr.length > 0) {
				childArr.forEach((v, i)=>{
					v.list.forEach((o, k)=>{
					o.value = o.name
					o.flag = false
					o.filter = 'depositary'
					if (i == 0) {
						o.parentId = 1
						NewArr.push(o)
					} else if (i == 1) {
						o.parentId = 2
						NewArr.push(o)
					} else {
						o.parentId = 3
						NewArr.push(o)
					}
					})
				})
				}
				this.address_list = NewArr;
						this.address_list.unshift({
							id: 0,
							name: '不限',
							flag: true,
							filter: '',
							value: ''
				})
			});
			// 获取城市 产地
			this.$http.get('/wx/bases/list_area?type=ORIGINS').then((response) => {
				let childArr = response.data
				let NewArr = []
				if(childArr.length > 0) {
				childArr.forEach((v, i)=>{
						v.list.forEach((o, k)=>{
						if (o.code == '0') {
							o.value = o.name
							o.filter = 'factoryName'
						} else {
							o.value = o.code
							o.filter = 'originsCity'
						}
						o.flag = false
						if (i == 0) {
							o.parentId = 1
							NewArr.push(o)
						} else if (i == 1) {
							o.parentId = 2
							NewArr.push(o)
						} else if (i == 2){
							if (childArr.length > 3)
							o.parentId = 4
							else
							o.parentId = 3
							NewArr.push(o)
						} else if (i == 3) {
							o.parentId = 3
							NewArr.push(o)
						}
					})
				})
				}
				this.yieldly_list = NewArr;
				this.yieldly_list.unshift({
					id: 0,
					name: '不限',
					flag: true,
					filter: '',
					value: ''
				})
			});
			// 获取年份
			this.$http.post('/wx/bases/getListingData').then((response) => {
				this.Data_list = response.entity;
			});
		},
		beforeDestroy(){
			window.removeEventListener('scroll', this.onScroll);
				// 获取“分享给朋友”按钮点击状态及自定义分享内容接口
			// wx.ready(function() {
				wx.onMenuShareAppMessage({
					title: "棉联-棉花电商综合服务平台", // 分享标题
					desc: "交易0风险 成交有保障 棉纺全产业链服务 www.unioncotton.com", // 分享描述
					imgUrl:"https://mob.unioncotton.com/img/logo.png",
				});
				wx.onMenuShareTimeline({
					title: "棉联-棉花电商综合服务平台", // 分享标题
					desc: "交易0风险 成交有保障 棉纺全产业链服务 www.unioncotton.com", // 分享描述
					imgUrl:"https://mob.unioncotton.com/img/logo.png",
				});
			// });
			document.title = "棉联-棉花电商综合服务平台";
		},
		methods:{
			GetUrlParam(paraName) {
			  var url = document.location.toString();
			  var arrObj = url.split("?");
			
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				var arrNum = 2
			}else{
				var arrNum = 1				  
			}
			
			  if (arrObj.length > arrNum) {
				
				var arrPara = arrObj[arrNum].split("&");
			    var arr;
			
			    for (var i = 0; i < arrPara.length; i++) {
			      arr = arrPara[i].split("=");
			
			      if (arr != null && arr[0] == paraName) {
			        return arr[1];
			      }
			    }
			    return "";
			  }else if(arrObj.length <= arrNum){
				  var arrPara = arrObj[arrNum-1].split("&");
				  var arr;
				  			
				  for (var i = 0; i < arrPara.length; i++) {
				    arr = arrPara[i].split("=");
				  			
				    if (arr != null && arr[0] == paraName) {
				      return arr[1];
				    }
				  }
				  return "";
			  }
			  else {
			    return "";
			  }
			},
			tellus(listingType,userOwner,userID){
				if(listingType==0){
					this.userId=userOwner;
				}else if(listingType==1){
					this.userId=userID;
				}
				this.tell_admin=true;
				this.$http.post('/wx/index_h5/userInfo?userId='+this.userId).then((response) => {
					console.log(response);
					this.userphone=response.data.mobile;
					this.username=response.data.name;
				});
			},
			
			//选择分享资源
			addlistingID(){
				var check = document.getElementsByClassName('checkID');
				this.listId=[];
				this.historyID='';
				for(var i = 0;i<check.length;i++){
					if(check[i].checked){
						this.listId.push(check[i].value);
					}
				}
				wx.onMenuShareAppMessage({
					title: this.share_title, // 分享标题
					desc: this.share_txt, // 分享描述
					imgUrl:this.logoUrl,
					link:'https://mob.unioncotton.com/?code='+localStorage.openID+'&state=123#/shop/shopDetails/'+this.membenId+'/'+'1&historyID='+this.historyID+'&ids='+this.listId+'&jkid='+this.listId2,
				});
				wx.onMenuShareTimeline({
					title: this.share_title, // 分享标题
					desc: this.share_txt, // 分享描述
					imgUrl:this.logoUrl,
					link:'https://mob.unioncotton.com/?code='+localStorage.openID+'&state=123#/shop/shopDetails/'+this.membenId+'/'+'1&historyID='+this.historyID+'&ids='+this.listId+'&jkid='+this.listId2,
				});
				
			},
			//选择分享进口棉
			addlistingID2(){
				var check = document.getElementsByClassName('checkID2');
				this.listId2=[];
				for(var i = 0;i<check.length;i++){
					if(check[i].checked){
						this.listId2.push(check[i].value);
					}
				}
				wx.onMenuShareAppMessage({
					title: this.share_title, // 分享标题
					desc: this.share_txt, // 分享描述
					imgUrl:this.logoUrl,
					link:'https://mob.unioncotton.com/?code='+localStorage.openID+'&state=123#/shop/shopDetails/'+this.membenId+'/'+'1&historyID='+this.historyID+'&ids='+this.listId+'&jkid='+this.listId2,
				});
				wx.onMenuShareTimeline({
					title: this.share_title, // 分享标题
					desc: this.share_txt, // 分享描述
					imgUrl:this.logoUrl,
					link:'https://mob.unioncotton.com/?code='+localStorage.openID+'&state=123#/shop/shopDetails/'+this.membenId+'/'+'1&historyID='+this.historyID+'&ids='+this.listId+'&jkid='+this.listId2,
				});
				
			},
			// 分享
			sure_share(){
				this.shareIF=false;
				this.share_zhiIF=true;
				
				this.sure_share2();
				// });
			},
			sure_share2(){
				var ids = this.listId;
				var jkid = this.listId2;
				
				// wx.ready(function() {
					// 获取“分享给朋友”按钮点击状态及自定义分享内容接口
					wx.onMenuShareAppMessage({
						title: this.share_title, // 分享标题
						desc: this.share_txt, // 分享描述
						imgUrl:this.logoUrl,
						link:'https://mob.unioncotton.com/?code='+localStorage.openID+'&state=123#/shop/shopDetails/'+this.membenId+'/'+'1&historyID='+this.historyID+'&ids='+ids+'&jkid='+jkid,
					});
					wx.onMenuShareTimeline({
						title: this.share_title, // 分享标题
						desc: this.share_txt, // 分享描述
						imgUrl:this.logoUrl,
						link:'https://mob.unioncotton.com/?code='+localStorage.openID+'&state=123#/shop/shopDetails/'+this.membenId+'/'+'1&historyID='+this.historyID+'&ids='+ids+'&jkid='+jkid,
					});
			},
			// 显示需求定制
			save_top(){
				this.isSee1=false;
				this.isSee2=false;
				this.isSee3=false;
				this.isSee4=false;
				this.isSee5=false;
				this.isSee6=false;
				this.isSee7=false;
				if(!localStorage.openID){
					this.$message({
					    message: '还未登录，请先登录后再进行此操作',
					    type: 'error',
						onClose:() =>{
							this.$router.push({
							  	path: '/login'
							})  
						}
					});
				}else{
				  this.save_show=true;
				  this.optActive=0;
				  this.shopzz=false;
				}
			},
			// 添加到需求定制
			add_history(){
				
				if(this.saveName){
					let save_name = new URLSearchParams();
					save_name.append("searchName", this.saveName);
					this.$http.post('/wx/searchhistory/editor?'+this.params+'&'+save_name).then((response) => {
						// console.log(response);
						this.save_show=false;
						this.saveName ='';
						this.$http.post('/wx/searchhistory/list').then((response) => {
							console.log(response);
							this.save_list = response.entity;
							
						})
						this.$message({
						    message: '保存成功',
						    type: 'success',
						});
					})
				}else{
					this.$message({
					    message: '请输入定制名称',
					    type: 'error'
					});
				}
				
				
			},
			search_list(index,searchID){
				
				this.search_ID=searchID;
				this.historyID=searchID;
				this.loading=true;
				let params = new URLSearchParams();
				let save_inx;
				if(index==5){
					save_inx = this.save_setone;
					
				}else{
					save_inx = this.save_list[index];
				}
				// 放入参数
				if(save_inx.listingType){
					params.append("listingType", save_inx.listingType);
				};
				if(save_inx.listingIndex){
					params.append("listingIndex", save_inx.listingIndex);
				};
				if(save_inx.pricing){
					params.append("pricing", save_inx.pricing);
				};
				if(save_inx.cottonSource){
					params.append("cottonSource", save_inx.cottonSource);
				};
				if(save_inx.primaryColor){
					params.append("primaryColor", save_inx.primaryColor);
				};
				if(save_inx.depositary){
					params.append("depositary", save_inx.depositary);
				};
				// 产地2
				if (save_inx.factoryName) {
					params.append("factoryName", save_inx.factoryName);
				};
				// 产地
				if (save_inx.originsCity) {
					params.append("originsCity", save_inx.originsCity);
				};
				if(save_inx.cottonType){
					params.append("cottonType", save_inx.cottonType);
				};
				if(save_inx.packType){
					params.append("packType", save_inx.packType);
				};
				if(save_inx.cottonYear){
					params.append("cottonYear", save_inx.cottonYear);
				};
				
				this.paramsSidings = save_inx.sidings
				params.append("sidings", save_inx.sidings ? save_inx.sidings : '');

				if(save_inx.lengthMin){
					params.append("lengthMin", save_inx.lengthMin);
				}
				if(save_inx.lengthMax){
					params.append("lengthMax", save_inx.lengthMax);
				}
				if(save_inx.strongMin){
					params.append("strongMin", save_inx.strongMin);
				}
				if(save_inx.strongMax){
					params.append("strongMax", save_inx.strongMax);
				}
				if(save_inx.mikeMin){
					params.append("mikeMin", save_inx.mikeMin);
				}
				if(save_inx.mikeMax){
					params.append("mikeMax", save_inx.mikeMax);
				}
				if(save_inx.impurityMin){
					params.append("impurityMin", save_inx.impurityMin);
				}
				if(save_inx.impurityMax){
					params.append("impurityMax", save_inx.impurityMax);
					
				}
				if(save_inx.moistureMin){
					params.append("moistureMin", save_inx.moistureMin);
				}
				if(save_inx.moistureMax){
					params.append("moistureMax", save_inx.moistureMax);
				}
				if(save_inx.neatMin){
					params.append("neatMin", save_inx.neatMin);
				}
				if(save_inx.neatMax){
					params.append("neatMax", save_inx.neatMax);	
				}
				
				
				this.value=[260, 330]
				this.value2=[240, 330];
				this.value3=[30, 60];
				this.value4=[0, 60];
				this.value5=[40, 110];
        		this.value6=[780, 900];
				
				
				this.isSee=false;
				this.lx_items_list.forEach(function(i){
					i.flag=false;
				});
				if (this.address_list.length)
				this.address_list.forEach(function(i){
					i.flag=false;
				});
				// 产地
				if (this.yieldly_list.length) {
					this.yieldly_list.forEach(function(i){
						i.flag=false;
					});
					this.$nextTick(() => {
						this.$refs.placeOfOrigin.updateParamsSidings(save_inx.sidings)
					})
				}
				this.mhlx_items_list.forEach(function(i){
					i.flag=false;
				});
				if (this.Data_list.length)
				this.Data_list.forEach(function(i){
					i.flag=false;
				});
				

				this.ysj_items_list.forEach(function(i){
					i.flag=false;
				});
				// 反向选择
				for(var i=0;i<this.lx_items_list.length;i++){
					// 类型
					if(save_inx.listingIndex&&this.lx_items_list[i].filter=='listingIndex'){
						this.lx_items_list[i].flag=true;
					}
					if(save_inx.listingType==1&&this.lx_items_list[i].filter=='listingType'){
						this.lx_items_list[1].flag=true;
					}else if(save_inx.listingType==0&&this.lx_items_list[i].filter=='listingType'){
						this.lx_items_list[2].flag=true;
					}else if(save_inx.listingType==2&&this.lx_items_list[i].filter=='listingType'){
						this.lx_items_list[1].flag=true;
						this.lx_items_list[2].flag=true;
					}
					if(save_inx.pricing&&this.lx_items_list[i].filter=='pricing'){
						this.lx_items_list[i].flag=true;
					}
					if (save_inx.cottonSource)
					for(var x=0;x<save_inx.cottonSource.length;x++){
						if(this.lx_items_list[i].value==save_inx.cottonSource.split(',')[x]&&this.lx_items_list[i].filter=='cottonSource'){
							this.lx_items_list[i].flag=true;
						}
					}
					
				}
				// 颜色级
				for(var i=0;i<this.ysj_items_list.length;i++){
					if(save_inx.primaryColor){
						for(var x=0;x<save_inx.primaryColor.length;x++){
							if(this.ysj_items_list[i].value==save_inx.primaryColor.split(',')[x]){
								this.ysj_items_list[i].flag=true;
							}
						}
					}
					
				}
				// 存放地
				for(var i=0;i<this.address_list.length;i++){
					if(save_inx.depositary){
						for(var x=0;x<save_inx.depositary.length;x++){
							if(this.address_list[i].value==save_inx.depositary.split(',')[x]){
								this.address_list[i].flag=true;
							}
						}
					}
					
				}
				// 产地
				for(var i=0;i<this.yieldly_list.length;i++){
					if(save_inx.originsCity){
						for(var x=0;x<save_inx.originsCity.length;x++){
							if(this.yieldly_list[i].value==save_inx.originsCity.split(',')[x]){
								this.yieldly_list[i].flag=true;
							}
						}
					}
					
				}
				// 产地2
				for(var i=0;i<this.yieldly_list.length;i++){
					if(save_inx.originsCity){
						for(var x=0;x<save_inx.factoryName.length;x++){
							if(this.yieldly_list[i].value==save_inx.factoryName.split(',')[x]){
								this.yieldly_list[i].flag=true;
							}
						}
					}
					
				}
				// 棉花类型1
				for(var i=0;i<this.mhlx_items_list.length;i++){
					if(save_inx.cottonType){
						for(var x=0;x<save_inx.cottonType.length;x++){
							if(this.mhlx_items_list[i].value==save_inx.cottonType.split(',')[x] && this.mhlx_items_list[i].filter == 'cottonType'){
								this.mhlx_items_list[i].flag=true;
							}
						}
					}
					
				}
				// 棉花类型2
				for(var i=0;i<this.mhlx_items_list.length;i++){
					if(save_inx.packType){
						for(var x=0;x<save_inx.packType.length;x++){
							if(this.mhlx_items_list[i].value==save_inx.packType.split(',')[x] && this.mhlx_items_list[i].filter == 'packType'){
								this.mhlx_items_list[i].flag=true;
							}
						}
					}
					
				}
				// 年度
				for(var i=0;i<this.Data_list.length;i++){
					if(save_inx.cottonYear){
						for(var x=0;x<save_inx.cottonYear.length;x++){
							if(this.Data_list[i].value==save_inx.cottonYear.split(',')[x]){
								this.Data_list[i].flag=true;
							}
						}
					}
					
				}
				
				if(save_inx.lengthMin!=null&&save_inx.lengthMax!=null){
					this.value=[save_inx.lengthMin*10, save_inx.lengthMax*10];
				} else if(save_inx.lengthMin==null&&save_inx.lengthMax!=null){
					this.value=[260, save_inx.lengthMax*10];
				} else if(save_inx.lengthMin!=null&&save_inx.lengthMax==null){
					this.value=[save_inx.lengthMin*10, 330];
				} else if(save_inx.lengthMin==null&&save_inx.lengthMax==null){
					this.value=[260, 330];
				}
					
				if(save_inx.strongMin!=null&&save_inx.strongMax!=null){
					this.value2=[save_inx.strongMin*10, save_inx.strongMax*10];
				} else if(save_inx.strongMin==null&&save_inx.strongMax!=null){
					this.value2=[240, save_inx.strongMax*10];
				} else if(save_inx.strongMin!=null&&save_inx.strongMax==null){
					this.value2=[save_inx.strongMin*10, 330];
				} else if(save_inx.strongMin==null&&save_inx.strongMax==null){
					this.value2=[210, 330];
				}
				if(save_inx.mikeMin!=null&&save_inx.mikeMax!=null){
					this.value3=[save_inx.mikeMin*10, save_inx.mikeMax*10];
				} else if(save_inx.mikeMin==null&&save_inx.mikeMax!=null){
					this.value3=[30, save_inx.mikeMax*10];
				} else if(save_inx.mikeMin!=null&&save_inx.mikeMax==null){
					this.value3=[save_inx.mikeMin*10, 60];
				} else if(save_inx.mikeMin==null&&save_inx.mikeMax==null){
					this.value3=[30, 60];
				}
				if(save_inx.impurityMin!=null&&save_inx.impurityMax!=null){
					this.value4=[save_inx.impurityMin*10, save_inx.impurityMax*10];
				} else if(save_inx.impurityMin==null&&save_inx.impurityMax!=null){
					this.value4=[0, save_inx.impurityMax*10];
				} else if(save_inx.impurityMin!=null&&save_inx.impurityMax==null){
					this.value4=[save_inx.impurityMin*10, 60];
				} else if(save_inx.impurityMin==null&&save_inx.impurityMax==null){
					this.value4=[0, 60];
				}
				if(save_inx.moistureMin!=null&&save_inx.moistureMax!=null){
					this.value5=[save_inx.moistureMin*10, save_inx.moistureMax*10];
				} else if(save_inx.moistureMin==null&&save_inx.moistureMax!=null){
					this.value5=[40, save_inx.moistureMax*10];
				} else if(save_inx.moistureMin!=null&&save_inx.moistureMax==null){
					this.value5=[save_inx.moistureMin*10, 110];
				} else if(save_inx.moistureMin==null&&save_inx.moistureMax==null){
					this.value5=[40, 110];
				}
				if(save_inx.neatMin!=null&&save_inx.neatMax!=null){
					this.value6=[save_inx.neatMin*10, save_inx.neatMax*10];
				} else if(save_inx.neatMin==null&&save_inx.neatMax!=null){
					this.value6=[780, save_inx.neatMax*10];
				} else if(save_inx.neatMin!=null&&save_inx.neatMax==null){
					this.value6=[save_inx.neatMin*10, 900];
				} else if(save_inx.neatMin==null&&save_inx.neatMax==null){
					this.value6=[780, 900];
				}
				
				
				
				this.$http.post('wx/shop/detail?memberID=' + this.membenId+'&'+params + '&order=price&asc=true').then((response) => {
					this.warehouseList = response.entity.page.list;
					this.totalPage = response.entity.page.totalPage;
					this.pageCurrent =1;
					// console.log(response);
					this.loading=false;
					this.pagesize = response.entity.page.pageSize;
					this.pageNum=1;
					this.paramsBoth=params;
					if(response.entity.page.totalRow==0){
						this.resshow=true;
					}else{
						this.resshow=false;
					}
					let List_top = document.getElementById('shop_bottom');
					window.scrollTo({ 
					    top: List_top.offsetTop, 
					    behavior: "smooth" 
					});
				})
				this.sure_share2();
			},
			//滑块小标隐藏
			hidSee(){
				this.isSee1=false;
				this.isSee2=false;
				this.isSee3=false;
				this.isSee4=false;
				this.isSee5=false;
				this.isSee6=false;
				this.isSee7=false;
			},
			// 滑块数值设置
			formatTooltip(val) {
				return val / 10;
			},
			//重置
			resetclose () {
				this.value=[260, 330]
				this.value2=[240, 330];
				this.value3=[30, 60];
				this.value4=[0, 60];
				this.value5=[40, 110];
        		this.value6=[780, 900];
				this.isSee = false;
				this.mhlx_items_list.forEach(function(i) {
					i.flag = false;
				});
				this.Data_list.forEach(function(i) {
					i.flag = false;
				});
				this.address_list.forEach(function(i,index) {
					if(index==0){
						i.flag = true;
					}else{
						i.flag = false;
					}
				});
				this.yieldly_list.forEach(function(i,index) {
					if(index==0){
						i.flag = true;
					}else{
						i.flag = false;
					}
				});
				this.lx_items_list.forEach(function(i,index) {
					if(index==0){
						i.flag = true;
					}else{
						i.flag = false;
					}
				});
				this.ysj_items_list.forEach(function(i,index) {
					if(index==0){
						i.flag = true;
					}else{
						i.flag = false;
					}
				});
				this.mhlx_items_list.forEach(function(i,index){
					i.flag = false;
				});
				this.paramsSidings = 0
				this.$nextTick(() => {
					this.$refs.placeOfOrigin.updateParamsSidings(0)
					this.$refs.placeOfOrigin.ResetFuc(1)
					this.$refs.placeOfOrigin1.ResetFuc(1)
				})
				this.ResetFig = 1
				this.isSee1 = false;
				this.isSee2 = false;
				this.isSee3 = false;
				this.isSee4 = false;
				this.isSee5 = false;
				this.isSee6 = false;
				this.$http.post('/wx/listing/getListingFineList?&order=price&asc=true' ).then((response) => {
					this.warehouseList = response.entity.list;
					this.totalPage = response.entity.totalPage;
					this.pageCurrent = 1;
					// console.log(response);
					this.loading = false;
					this.pagesize = response.entity.pageSize;
					this.pageNum = 1;
					this.paramsBoth = '';
					if (response.entity.totalRow == 0) {
						this.resshow = true;
					} else {
						this.resshow = false;
					}
					window.scrollTo(0, 0);
				})
			},
			//上拉加载
			onScroll() {
				if(this.class_tab==1){
					var List_top = document.getElementById('shop_bottom');
				}else if(this.class_tab==2){
					var List_top = document.getElementById('shop_bottom2');
				}
				
				let innerHeight = document.querySelector('#app').clientHeight;
				let outerHeight = document.documentElement.clientHeight;
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				let scrollTop2 =List_top.offsetTop-scrollTop;
				if(scrollTop2<0){
					document.getElementById('option').classList.add('pos');
				}else{
					document.getElementById('option').classList.remove('pos');
				}
				
				// console.log(scrollTop2);
				// console.log(innerHeight + " " + outerHeight + " " + scrollTop);
				if(this.class_tab==1){
					if (innerHeight < (outerHeight + scrollTop+100)) {
						if(this.pageCurrent<this.totalPage&&this.pageflag == true){
							this.pageflag=false;
							this.pageNum = this.pageNum+1;
							this.loading = true;
							this.$http.post('wx/shop/detail?memberID=' + this.membenId+'&'+this.paramsBoth+'&page='+this.pageNum + '&order=price&asc=true').then((response) => {
								 let ListTest = response.entity.page.list;
								this.warehouseList = this.warehouseList.concat(ListTest);
								this.totalPage = response.entity.page.totalPage;
								this.pageCurrent = response.entity.page.pageCurrent;
								// console.log(response);
								this.loading=false;
								this.pageflag=true;
							})
							
							this.moreText="下拉加载更多";
						}else if(this.pageCurrent>=this.totalPage){
							this.moreText="全部加载完成";
						}			
					}
				}else if(this.class_tab==2){
					// console.log(outerHeight + scrollTop+100);
					if (innerHeight < (outerHeight + scrollTop+100)) {
						
						if(this.pageCurrent2<this.totalPage2&&this.pageflag2 == true){
							console.log('1');
							this.pageflag2=false;
							this.pageNum2 = this.pageNum2+1;
							this.loading = true;
							this.$http.post('wx/listing/importedList?memberID=' + this.membenId+'&'+this.paramsBoth2+'&pageNo='+this.pageNum2).then((response) => {
								 let ListTest = response.entity.list;
								this.importList = this.importList.concat(ListTest);
								this.totalPage2 = response.entity.totalPage;
								this.pageCurrent2 = response.entity.pageCurrent;
								console.log(response);
								this.loading=false;
								this.pageflag2=true;
							})
							
							this.moreText="下拉加载更多";
						}else if(this.pageCurrent2>=this.totalPage2){
							this.moreText="全部加载完成";
						}			
					}
				}
				 
			 },
			 //前往资源详情
			godetails(item_,listingID_){
				this.$router.push({
					name: 'resDetails',
					query: {
						id: item_,
						listingID: listingID_,
					}
				});
			},
			// 上拉设置  全站通用
			getScrollTop(){
			　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
			　　　　if(document.body){
			　　　　　　bodyScrollTop = document.body.scrollTop;
			　　　　}
			　　　　if(document.documentElement){
			　　　　　　documentScrollTop = document.documentElement.scrollTop;
			　　　　}
			　　　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
			　　　　return scrollTop;
			　　},
			 
			　　//可视窗口高度
			 
			　　getWindowHeight(){
			　　var windowHeight = 0;
			　　　　if(document.compatMode == "CSS1Compat"){
			　　　　　　windowHeight = document.documentElement.clientHeight;
			　　　　}
			　　　　else{
			　　　　　　windowHeight = document.body.clientHeight;
			　　　　}
			　　　　return windowHeight;
			　　},
			 
			　　//滚动条高度
			 
			　　getScrollHeight(){
			　　　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
			　　　　if(document.body){
			　　　　　　bodyScrollHeight = document.body.scrollHeight;
			　　　　}　　
			　　　　if(document.documentElement){
			　　　　　　documentScrollHeight = document.documentElement.scrollHeight;
			　　　　}
			　　　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
			　　　　return scrollHeight;
			　　},
			 
			 
			　　scrollFn(){
			　　　　if(this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()){
			　　　　　　// console.log('1');
			　　　　}
			　　},
			 
			　　destroyed() {
			　　　　window.removeEventListener('scroll', this.scrollFn); // 销毁监听
			　　},
			 
			// 加入购物车
			joinCart(id,item_){
				this.$http.post('/wx/trade/addCartItem?listingID='+id).then((response) => {
					// console.log(response);
					if(response.success){
						item_.cartID = 1;
						this.$message({
							showClose: true,
							message: '添加询盘成功',
							type: 'success'
						});
						this.getstore('添加询盘成功')
					}else{
						if(response.code!=9999){
							this.$message({
							          showClose: true,
							          message: response.message,
							          type: 'error'
							        });
						}else{
							this.$message({
							          showClose: true,
							          message: '还未登录，请先登录后再进行此操作',
							          type: 'error',
									  onClose:() =>{
									  	this.$router.push({
									  		path: '/login'
									  	})  
									  }
							        });
						}
					}
				});
			},
			removeCart(id,item_) {
				this.$http.post('/wx/trade/removeCartItemByList?listingIDs=' + id).then((response) => {
					// console.log(response);
					if (response.success) {
						item_.cartID = 0;
						this.$message({
							showClose: true,
							message: '删除询盘成功',
							type: 'success'
						});
						this.getstore()
					} else {
						if (response.code != 9999) {
							this.$message({
								showClose: true,
								message: response.message,
								type: 'error'
							});
						} else {
							this.$message({
								showClose: true,
								message: '还未登录，请先登录后再进行此操作',
								type: 'error',
								onClose: () => {
									this.$router.push({
										path: '/login'
									})
								}
							});
						}
					}
				});
			},
			goTop(){
				window.scrollTo({top: 0,behavior: "smooth"})
			},
			// 点击按钮
			clickActive(index){
				this.isSee1=false;
				this.isSee2=false;
				this.isSee3=false;
				this.isSee4=false;
				this.isSee5=false;
				this.isSee6=false;
				this.isSee7=false;
				if(this.optActive==index){
					this.optActive = 0 ;
					this.shopzz=false;
				}else{
					this.optActive = index;
					this.shopzz=true;
				};
				if(index==2){
					var List_top = document.getElementById('shop_bottom');
				}else if(index==3){
					var List_top = document.getElementById('shop_bottom2');
				}
				
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				if(List_top.offsetTop>scrollTop){
					window.scrollTo({
					    top: List_top.offsetTop, 
					    behavior: "smooth" 
					});
				}
				this.transitionRight()
			},
			// 切换tab
			hiddenTab(){
				
				this.optActive = 0 ;
				this.isSee1=false;
				this.isSee2=false;
				this.isSee3=false;
				this.isSee4=false;
				this.isSee5=false;
				this.isSee6=false;
				this.isSee7=false;
				this.shopzz=false;
				this.transitionRight(true)
			},
			transitionRight (type) {
				let that = this
				let time = window.setTimeout(()=>{
					if (type)
					that.$refs.transition_right.style.width = '0%'
					else
					that.$refs.transition_right.style.width = '80%'
					window.clearTimeout(time)
				}, 100)
			},
			// 显示滑块小标
			showtool(i){
				if(i=='show1'){
					this.isSee1=true;
				}
				if(i=='show2'){
					this.isSee2=true;
				}
				if(i=='show3'){
					this.isSee3=true;
				}
				if(i=='show4'){
					this.isSee4=true;
				}
				if(i=='show5'){
					this.isSee5=true;
				}
				if(i=='show6'){
					this.isSee6=true;
				}
				if(i=='show7'){
					this.isSee7=true;
				}
			},
			// 传参获取列表
			addparams(i, value, index, z, sumStr) {
				this.search_ID='';
				// 参数设置
				let listingType = new Array();
				let d28;
				let d29;
				let listingIndex;
				let pricing;
				let cottonSource = new Array();
				let primaryColor = new Array();
				let depositary = new Array();
				let originsCity  = new Array();
				let factoryName = []
				let cottonType = new Array();
				let packType = new Array();
				let sort;
				let asc;
				let cottonYear = new Array();
				let params = new URLSearchParams();
				// 小标隐藏
				if(i=='noshow'){
					this.optActive = 0 ;
					this.isSee=false;
					this.isSee1=false;
					this.isSee2=false;
					this.isSee3=false;
					this.isSee4=false;
					this.isSee5=false;
					this.shopzz=false;
					this.transitionRight(true)
				}
				
				
					// 判断按钮是否点击
					if(this.optActive==1){
						this.order_items_list[index].flag = true;
						this.order_items_list.forEach(function(i,num){
							if(num!=index){
								i.flag=false;
							}
						})
						
						if(this.ifAsc==true){
							this.asc='asc';
							this.ifAsc=!this.ifAsc;
						}else{
							this.asc='desc';
							this.ifAsc=!this.ifAsc;
						}
					}else if(this.optActive==2){
						
						
						if(z==1){
							// 類型
							this.lx_items_list[index].flag = !this.lx_items_list[index].flag;
							if(index==0){
								this.lx_items_list.forEach(function(i){
									i.flag=false;
								})
								this.lx_items_list[index].flag=true;
							}else{
								this.lx_items_list[0].flag=false;
							}
								
						}else if(z==2){
							// 顔色級
							this.ysj_items_list[index].flag = !this.ysj_items_list[index].flag;
							if(index==0){
								this.ysj_items_list.forEach(function(i){
									i.flag=false;
								})
								this.ysj_items_list[index].flag=true;
							}else{
								this.ysj_items_list[0].flag=false;
							}
						}else if(z==3){
							// 存放地
							this.address_list[index].flag = !this.address_list[index].flag;
							if(index==0){
								this.address_list.forEach(function(i){
									i.flag=false;
								})
								this.address_list[index].flag=true;
							}else{
								this.address_list[0].flag=false;
							}
						}else if(z==4){
							this.mhlx_items_list[index].flag = !this.mhlx_items_list[index].flag;
							
						}else if(z==5){
							this.Data_list[index].flag = !this.Data_list[index].flag;
							
						} else if (z == 6) {
							// 产地
							this.yieldly_list[index].flag = !this.yieldly_list[index].flag;
							if (index == 0) {
								this.yieldly_list.forEach(function(i) {
									i.flag = false;
								})
								this.yieldly_list[index].flag = true;
							} else {
								this.yieldly_list[0].flag = false;
							}
						}
						
					}
					
					
					
					//循环获取参数
						this.lx_items_list.forEach(function(i){
							if(i.filter=='listingType'&&i.flag==true){
								listingType.push(i.value)
							}else if(i.filter=='d28'&&i.flag==true){
								d28 = 1;
							}else if(i.filter=='d29'&&i.flag==true){
								d29 = 1;
							}else if(i.filter=='listingIndex'&&i.flag==true){
								listingIndex = i.flag;
							}else if(i.filter=='pricing'&&i.flag==true){
								pricing = i.flag;
							}else if(i.filter=='cottonSource'&&i.flag==true){
								cottonSource.push(i.value)
							}
						});
						this.ysj_items_list.forEach(function(i){
							if(i.filter=='primaryColor'&&i.flag==true){
								primaryColor.push(i.value)
							}
						});
						this.address_list.forEach(function(i){
							if(i.filter=='depositary'&&i.flag==true){
								depositary.push(i.value)
							}
						});
						// 产地
						this.yieldly_list.forEach(function(i) {
							if (i.filter == 'originsCity' && i.flag == true) {
								originsCity.push(i.value)
							}
						});
						// 产地2
						this.yieldly_list.forEach(function(i) {
							if (i.filter == 'factoryName' && i.flag == true) {
								factoryName.push(i.value)
							}
						});
						this.order_items_list.forEach(function(i){
							if(i.flag==true){
								sort=i.filter;
							}
						});
						this.mhlx_items_list.forEach(function(i){
							if(i.filter=='cottonType'&&i.flag==true){
								cottonType.push(i.value)
							}
						});
						this.mhlx_items_list.forEach(function(i){
							if(i.filter=='packType'&&i.flag==true){
								packType.push(i.value)
							}
						});
						this.Data_list.forEach(function(i){
							if(i.filter=='cottonYear'&&i.flag==true){
								cottonYear.push(i.value)
							}
						});
						// 数组转换成字符串
						let listingTypeText = listingType.join(",");
						let cottonSourceText = cottonSource.join(",");
						let primaryColorText = primaryColor.join(",");
						let depositaryText = depositary.join(",");
						let originsCityText = originsCity.join(",");
						let factoryNameText = factoryName.join(",");
						let cottonTypeText = cottonType.join(",");
						let packTypeText = packType.join(",");
						let cottonYearText = cottonYear.join(",");
						// 放入参数
						if(listingType.length){
							listingType.forEach((v, i) => {
								params.append("listingType", v);
							})
						};

						if(listingIndex){
							params.append("listingIndex", 1);
						};
						if(pricing){
							params.append("pricing", 1);
						};
						if(cottonSource.length){
							params.append("cottonSource", cottonSourceText);
						};
						if(primaryColor.length){
							params.append("primaryColor", primaryColorText);
						};
						if(depositary.length){
							params.append("depositary", depositaryText);
						};
						// 产地
						if (originsCity.length) {
							params.append("originsCity", originsCityText);
						};
						// 产地2
						if (factoryName.length) {
							params.append("factoryName", factoryNameText);
						};
						if(cottonType.length){
							params.append("cottonType", cottonTypeText);
						};
						if(packType.length){
							params.append("packType", packTypeText);
						};
						if(cottonYear.length){
							params.append("cottonYear", cottonYearText);
						};
						
						// if(sort){
						// 	params.append("order", sort);
						// 	params.append("asc", true);
						// }else{
						// 	params.append("order", "price");
						// 	params.append("asc", "asc");
						// }
						params.append("order", sort);
						params.append("asc", true);
						
						params.append("sidings", this.paramsSidings == 1 ? 1 : 0);
						if (this.value[0] != 260 || this.value[1] != 330) {
							params.append("lengthMin", this.value[0] / 10);
							params.append("lengthMax", this.value[1] / 10);
						}

						if (this.value2[0] != 240 || this.value2[1] != 330) {
							params.append("strongMin", this.value2[0] / 10);
							params.append("strongMax", this.value2[1] / 10);
						}

						if (this.value3[0] != 30 || this.value3[1] != 60) {
							params.append("mikeMin", this.value3[0] / 10);
							params.append("mikeMax", this.value3[1] / 10);
						}

						if (this.value4[0] != 0 || this.value4[1] != 60) {
							params.append("impurityMin", this.value4[0] / 10);
							params.append("impurityMax", this.value4[1] / 10);
						}

						if (this.value5[0] != 40 || this.value5[1] != 110) {
							params.append("moistureMin", this.value5[0] / 10);
							params.append("moistureMax", this.value5[1] / 10);
						}

						if (this.value6[0] != 780 || this.value6[1] != 900) {
							params.append("neatMin", this.value6[0] / 10);
							params.append("neatMax", this.value6[1] / 10);
						}
				// 
				// 		params.append("neatMin", this.value3[0]);
				// 		params.append("neatMax", this.value3[1]);
				// 
				this.params = params;
				this.cancelRequest();
				var that = this;
				//获取列表信息
				this.$http.post('wx/shop/detail?memberID=' + this.membenId+'&'+params,null,{
					cancelToken: new this.$http.CancelToken(function(c) {
					          that.source = c;
					        })
				}).then((response) => {
					this.warehouseList = response.entity.page.list;
					this.totalPage = response.entity.page.totalPage;
					this.pageCurrent =1;
					// console.log(response);
					this.loading=false;
					this.pagesize = response.entity.page.pageSize;
					this.pageNum=1;
					this.paramsBoth=params;
					if(this.class_tab==1){
						var List_top = document.getElementById('shop_bottom');
					}else if(this.class_tab==2){
						var List_top = document.getElementById('shop_bottom2');
					}
					window.scrollTo({ 
					    top: List_top.offsetTop, 
					    behavior: "smooth" 
					});
				})
			},
			cancelRequest(){
			     if(typeof this.source ==='function'){
			       this.source('终止请求')
			     }
			   },
			// 进口棉
			
			// tab切换
			tab_switch(index){
				this.class_tab=index;
				this.optActive=0;
				this.shopzz=false;
				if(index==1){
					if(this.warehouseList.length == 0){
						this.resshow=true
					}else{
						this.resshow=false
					}
					
				}
				if(index==2){
					if(this.importList.length == 0){
						this.resshow=true
					}else{
						this.resshow=false
					}
					
				}
			},
			
			addparams2(val,type){
				
				let params = new URLSearchParams();
				let List_top = document.getElementById('shop_bottom2');
				window.scrollTo({ 
				    top: List_top.offsetTop, 
				    behavior: "smooth" 
				});
				
				if(type=='currency'){
					if(this.currency_arr.indexOf(val)<0){
						this.currency_arr=[];
						this.currency_arr.push(val)
					}else{
						this.currency_arr.splice(this.currency_arr.indexOf(val),1)
					}
				}
				if(type=='origins'){
					if(this.origins_arr.indexOf(val)<0){
						this.origins_arr.push(val)
					}else{
						this.origins_arr.splice(this.origins_arr.indexOf(val),1)
					}
				}
				if(type=='levle'){
					if(this.levle_arr.indexOf(val)<0){
						this.levle_arr.push(val)
					}else{
						this.levle_arr.splice(this.levle_arr.indexOf(val),1)
					}
				}
				if(type=='length'){
					if(this.length_arr.indexOf(val)<0){
						this.length_arr.push(val)
					}else{
						this.length_arr.splice(this.length_arr.indexOf(val),1)
					}
				}
				if(type=='mike'){
					if(this.mike_arr.indexOf(val)<0){
						this.mike_arr.push(val)
					}else{
						this.mike_arr.splice(this.mike_arr.indexOf(val),1)
					}
				}
				if(type=='placeDelivery'){
					if(this.placeDelivery_arr.indexOf(val)<0){
						this.placeDelivery_arr.push(val)
					}else{
						this.placeDelivery_arr.splice(this.placeDelivery_arr.indexOf(val),1)
					}
				}
				params.append("currency", this.currency_arr);
				params.append("origins", this.origins_arr);
				params.append("levle", this.levle_arr);
				params.append("length", this.length_arr);
				params.append("mike", this.mike_arr);
				params.append("strongMin", this.value7[0]/10);
				params.append("strongMax", this.value7[1]/10);
				params.append("placeDelivery", this.placeDelivery_arr);
				
				this.paramsBoth2=params;
				this.$http.post('wx/listing/importedList?memberID=' + this.membenId+'&'+params + '&order=price&asc=true').then((response) => {
					this.importList=response.entity.list;
					this.totalPage2 = response.entity.totalPage;
					this.pageCurrent2 =1;
					// console.log(response);
					this.loading=false;
					this.pagesize2 = response.entity.pageSize;
					this.pageNum2=1;
				})
				
			},
			// 切换type ActionClass2
			addparamsCallplace (filter, value, index, typeNum, sumStr) {
				// 数据重复问题
				// 产地||存放地不走addparams内部逻辑
				// if (typeNum == 3)
				// typeNum = 1111
				// else if (typeNum == 6)
				typeNum = 1111
				if (filter == 'sidings') {
					value ? this.paramsSidings = 1 : this.paramsSidings = 0
				}
				this.addparams(filter, value, index, typeNum, sumStr)
			},
			// 添加询盘计数
			getstore (type) {
				// 获取
				let num = this.$store.getters.OPREATING_INFO_GET('UserEnquiries')
				// 修改
				type ? type = 1 : type = -1
				this.$store.commit({
					type: 'OPREATING_INFO_SET',
					UserEnquiries: ( num ? num : 0 ) + type
				})
				// 存储
				this.$store.dispatch('CLOSE_SESSIONSTORAGE')
			}
		}

	}
</script>

<style lang="scss">
	.tell_admin{
		.tell_bg{position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: #000;opacity: 0.4;z-index: 999;}
		.tell_con{width: 5rem;position: fixed;left: 1rem;background: #fff;padding: 0.25rem 0.25rem;top: 30%;z-index: 999;
			p{font-size: 0.32rem;}
			p.p1{margin-bottom: 0.3rem;}
			p.p2{color: #14bab4;
				a{color: #14bab4;}
			}
			input{display: block;width: 3rem;margin: 0 auto;margin-top: 0.4rem;height: 0.6rem;border: 0;background: #fd7320;color: #fff;border-radius: 0.1rem;}
		}
	}
	.class_tab{margin-bottom: 5px;
		input{width: 50%;height: 0.8rem;border: none;background: #14bab4;color: #fff;font-size: 0.3rem;}
		input.on{background: #fd7320;color: #fff;font-size: 0.3rem;}
	}
	
	
	.shop_bottom{position: relative;padding-top: 0.6rem;min-height: 12rem;
		i.shop_zz{position: absolute;height: 100%;left: 0;right: 0;top: 0;background: #000;opacity: 0.5;z-index: 99;}
	}
	.shop_bottom2{position: relative;padding-top: 0.6rem;min-height: 12rem;
		i.shop_zz{position: absolute;height: 100%;left: 0;right: 0;top: 0;background: #000;opacity: 0.5;}
		.search_tab{width: 6rem;}
	}
	.option2{
		position: absolute !important;top: 0 !important;z-index: 99;
		.option_screen i{display: none !important;}
	}
	.option2.pos{position: fixed !important;top: 0 !important;}
	.res_list {
		margin-top: 0.2rem;
	}

	
	
	.res_inx {
		display: flex;display: -webkit-flex;justify-content: space-between;
		box-shadow: 0 -3px 3px #f6f4f4;
		padding: 0.15rem 0;
		width: 7.1rem;
		margin: 0.2rem 0.2rem;
		position:relative;
		// .ins_l{
		// 	input{margin: 0.7rem 0.2rem;}
		// }
		.status{
			position: absolute;
			top: -0.05rem;
			right: 0.1rem;
			img{height: 0.5rem;}
			p{color: #fff;font-size: 0.28rem;position: absolute;top: 0;width: 100%;text-align: center;line-height: 0.5rem;}
		}
		.ins_r{
			width: 7.5rem;
			
		}
		.res_top {
			p {
				display: inline-block;
			}

			.top_cla {
				padding: 0.03rem 0.05rem;
				background: #14bab4;
				border-radius: 2px;
				color: #fff;
				font-size: 0.28rem;
				margin-right: 0.2rem;
			}

			.top_num {
				color: #14bab4;
				font-size: 0.3rem;
			}

			.top_grade {
				width:1.5rem;
				line-height: .2rem;
				// overflow: hidden;
    //             text-overflow:ellipsis;
    //             white-space: nowrap;
			}

			.top_lei {
				color: #333333;
				font-size: 0.28rem;
				margin-left: 0.25rem;
			}

			.top_date {
				color: #666666;
				font-size: 0.28rem;
				float: right;
				line-height: .4rem;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				
			}
			.weight_two{margin-left: 0.2rem;}
		}

		.res_con {display: flex;display: -webkit-flex;justify-content: space-between;
			div { 
				float: left;
				width: 1rem;
				text-align: center;
				margin: 0.05rem 0;

				.title {
					font-size: 0.28rem;
					color: #666666;
					line-height: 0.1rem;
				}

				.num {
					font-size: 0.3rem;
					color: #333333;
					line-height: 0.1rem;
				}
			}

			i {
				float: left;
				display: block;
				width: 1px;
				height: 0.32rem;
				background: #ccc;
				margin-top: 0.2rem;
			}
		}

		.cang {
			font-size: 0.3rem;
			color: #333333;
			margin: 0rem 0.2rem 0rem 0.2rem;
			// width: 6.7rem;
			display: block;
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			border:none;
			padding-bottom:0;
			p{display: inline-block;overflow: hidden;}
			p:nth-child(1){width: 60%;text-overflow:ellipsis;white-space: nowrap;}
			// p.zhishu{width: 35%;color: #fd7320;font-weight: bold;text-align: right;font-size: 0.3rem;text-align: right;margin-right: 0;margin-left: 0.2rem;}
			p.zhishu {
				width: 30%;
				color: #fd7320;
				font-weight: bold;
				text-align: right;
				margin-right: 0rem;
				font-size: 0.28rem;
			}
			.weight_one{
				font-weight: bold;
				font-size:0.28rem;
				color:#666;
				span{
					color: #fd7320;
					font-size:0.3rem;
				}
			}
		}

		.res_bot {
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			.res_price {
				display: flex;
				display: -webkit-flex;
				justify-content: flex-start;
			}
			.weight_one {
				color: #666666;
				font-size: 0.3rem;
				float: left;

				span {
					color: #fd7320;
					font-size: 0.32rem;
					font-weight: bold;
				}
			}

			.weight_two {
				color: #666666;
				font-size: 0.3rem;
				float: left;

				span {
					color: #333333;
					font-size: 0.3rem;
					font-weight: bold;
				}
			}

			.res_btn {
				float: right;
				width: 1.84rem;
				height: 0.58rem;
				background: #fd7320;
				font-size: 0.3rem;
				color: #fff;
				border: 0;
				border-radius: 1rem;
				margin-top: -0.1rem;
			}
			.top_date{
				font-size: 0.28rem;
				line-height: 0.5rem;
				margin-left: 0.1rem;
			}
		}
	}
	.noRes{width: 100%;text-align: center;margin-top: 1rem;
		img{width: 40%;}
		p{margin-top: 0.2rem;color: #666;font-size: 0.3rem;}
	}
	.list_bottom {
		height: 1.5rem;
	}
	.share{
		.share_show{
			position: fixed;bottom: 2.5rem;right: 2%;z-index: 9999;width: 0.88rem;
		}
		.share_con{position: fixed;background: #fff;z-index: 999999;width: 5.5rem;top: 2rem;left: 0.75rem;padding: 0.3rem 0.25rem;
			p{color: #333;font-size: 0.32rem;}
			.input_txt{width: 5rem;border: 1px solid #ccc;height: 0.6rem;padding: 0 0.25rem;margin-bottom: 0.2rem;font-size: 0.3rem;}
			textarea{width: 5rem;border: 1px solid #ccc;height: 1.5rem;padding: 0.1rem 0.25rem;font-size: 0.3rem;}
			.share_btn{margin-top: 0.3rem;
				input{width: 2rem;border: none;height: 0.6rem;font-size: 0.3rem;}
				.sure{background: #14bab4;color: #fff;}
			}
		}
		.share_bg{background: #000;opacity: 0.4;position: fixed;top: 0;left: 0;right: 0;bottom: 1rem;z-index: 9998;}
		
	}
	.goTop{position: fixed;bottom: 1.33rem;left: 0;width: 100%;z-index: 99999;width: 1.1rem;}
	.share_zhi{position: fixed;top: 0;left: 0;width: 100%;z-index: 99999;}
	#shop_bottom2 {
		.option_wrap{
			.opt_slide{margin-top: 0.4rem !important;margin-bottom: 0.5rem;}
		} 
	}
	.filter{
		width: auto !important;
		padding: 0px 0.14rem 0px 0.4rem !important;
		margin: 0px 0px .04rem !important;
		font-size: 0.26rem !important;
		border-radius: 0.08rem !important;
		line-height: 0.48rem !important;
		position: relative !important;
	}
	.filter:before{
		content: " ";
		position: absolute;
		top: .1rem;
		left: .08rem;
		width: .24rem;
		height: .24rem;
		background: url('../../assets/icon/filter.png') no-repeat;
		background-size: 100%;
	}
	.slide {

		position: fixed;
		top: 0;
		right: 0;
		width: 0%;
		height: 100%;
		z-index: 111111;
		background: #fff;

			.opt_con {
				width: 100%;
				padding-left: 0.3rem;
			}
			.opt_botl{border-bottom:1px solid #EAEAEA;padding: 0 .1rem;}
			.opt_cla {
				.bt {
					color: #999999;
					font-size: 0.3rem;
					width: 1.6rem;
					margin-top: 0.1rem;
					margin-left: 0.08rem;
				}

				.cla_btn {
					width: 5.9rem;
					margin-bottom: 0.2rem;

					span {
						display: inline-block;
						padding: 0.1rem 0.12rem;
						color: #222534;
						font-size: 0.28rem;
						border-radius: 0.1rem;
						margin: 0.1rem;
						background: #F4F4F4;
						padding-top: .07rem;
					}

					span.active {
						background: #14BAB4;
						color: #fff;
					}
				}
			}

			.slide_click {
				background: #fff;
				width: 100%;
				padding: 0.5rem 0;
				text-align: center;
				z-index: 9999;
				;
				position: relative;

				input {
					color: #ffffff;
					display: inline-block;
					border: 0;
					width: 32%;
					height: 50px;
					font-size: .3rem;
				}

				.chongzhi {
					width: 40%;
					background: #fd7320;
				}

				.wancheng {
					width: 35%;
					background: #14bab4;
				}
				.reset{
					width: 25%;
					color: #14BAB4;
					padding-left: 20px;
					background: #E9F6F6;
					position: relative;
					display: inline-block;
					line-height: 50px;
					font-size: 0.3rem;
					i{
						position: absolute;
						background: url('../../assets/icon/delete.png') no-repeat;
						background-size: 100%;
						width: 20px;
						height: 24px;
						top: 14px;
						left: 17%;
						z-index: 1;
					}
				}
			}
		}

		.slide {
			transition: width .3s;
			-moz-transition: width .3s;	/* Firefox 4 */
			-webkit-transition: width .3s;	/* Safari 和 Chrome */
			-o-transition: width .3s;	/* Opera */
		}
		.option_screen {
			.opt_con {
				background: #fff;
				width:100%;
				max-height: calc(100% - 2.2rem);
				padding-left: 0;
				overflow-y: scroll;
				overflow-x: hidden;
				padding-bottom: 0.5rem;
				padding-top: 0.2rem;

				span {
					display: inline-block;
					padding: 0.07rem 0.12rem;
					color: #222534;
					font-size: 0.28rem;
					border-radius: 0.1rem;
					margin: 0.1rem;
					background: #F4F4F4;
				}
				.yellow{background: #FFF3CF;color: #FAB500;font-weight: bold;}
				.green{background: #DBF5F3;color: #13B9B3;font-weight: bold;}
				span.active {
					background: #14BAB4;
					color: #fff;
				}

				.save_title {
					color: #999999;
					font-size: 0.28rem;
					width: 1.2rem;
					margin-top: 0.1rem;
					margin-left: .08rem;
				}
			}

			.opt_con::-webkit-scrollbar-track-piece {
				background-color: #ededed;
				border-left: 1px solid rgba(0, 0, 0, 0);
			}

			.opt_con::-webkit-scrollbar {
				width: 6px;
				height: 6px;
				-webkit-border-radius: 5px;
				-moz-border-radius: 5px;
				border-radius: 5px;
			}

			.opt_con::-webkit-scrollbar-thumb {
				background-color: #14bab4;
				background-clip: padding-box;
				-webkit-border-radius: 5px;
				-moz-border-radius: 5px;
				border-radius: 5px;
				min-height: 20px;
			}

			.opt_con::-webkit-scrollbar-thumb:hover {
				background-color: #14bab4;
				-webkit-border-radius: 5px;
				-moz-border-radius: 5px;
				border-radius: 5px;
			}

			i {
				display: block;
				content: '';
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: #000;
				z-index: -1;
				opacity: 0.5;
			}
		}


		.opt_slide {
			margin: 0 auto;
			margin-top: 0.9rem;
			width: calc(100% - .36rem);

			.slide_bt {
				font-size: 0.28rem;
				color: #999999;
				width: 0.85rem;
				float: left;
			}

			.slide_block {
				width: 77%;
				margin-left: 0.1rem;
				margin-top: -0.1rem;
				float: left;
				padding: 0.16rem 0;
				margin-left: 0.2rem;

				.el-slider {
					width: 100%;
				}
			}

			.el-slider__runway {
				height: 0.05rem;
			}

			.el-slider__bar {
				background-color: #14bab4;
				height: 0.05rem;
			}

			.el-slider__button {
				border: 0.03rem solid #14bab4;
				height: 0.24rem;
				width: 0.24rem;
			}

			.el-slider__button-wrapper {
				top: -17px;
			}

		}

		.opt_slide:nth-child(3) {
			margin-top: 0.5rem !important;
		}




	.search_tab {
		width: 84%;
		// background: #14bab4;
		// height: 0.55rem;
		line-height: 0.55rem;
		float: left !important;
		span {
			display: block;
			width: auto !important;
			padding: 0 10px;
		}
		.on{color: #fff !important;background: #14BAB4 !important;}
		.on:after{display: none !important;}
	}
	.saveName {
		.saveName_bg {
			background: #000;
			opacity: 0.5;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 995;
		}

		.saveName_con {
			background: #fff;
			width: 5.4rem;
			top: 2.5rem;
			position: fixed;
			top: 2rem;
			left: 0.75rem;
			padding: 0.5rem 0.3rem;
			z-index: 995;

			p {
				font-size: 0.3rem;
				color: #333;
			}

			.saveName_txt {
				width: 5.2rem;
				border: 1px solid #ccc;
				height: 0.5rem;
				padding: 0.1rem;
				margin-top: 0.2rem;
				font-size: 0.3rem;
			}

			.save_b {
				input {
					width: 2.4rem;
					height: 0.5rem;
					color: #fff;
					border: none;
					font-size: 0.3rem;
				}

				input.saveName_sure {
					background: #14BAB4;
					margin-right: 0.4rem;
					margin-left: 0.11rem;
					margin-top: 0.3rem;
				}

				input.saveName_close {
					background: #fd7320;
				}
			}
		}
	}

	.warehouse_tab {
		position: fixed;

		// top: 1.06rem;
		.ware_tab_inx {
			display: block;
			width: 1.875rem;
			height: 0.84rem;
			line-height: 0.84rem;
			float: left;
			text-align: center;
			background: #f4f7f7;
			color: #333333;
			font-size: 0.32rem;
			position: relative;
		}

		.ware_tab_inx:before {
			display: block;
			content: '';
			width: 1.04rem;
			height: 0.04rem;
			position: absolute;
			top: 1px;
			left: 0.417rem;
			background: #fd7320;
			opacity: 0;
		}

		.ware_tab_inx:after {
			display: block;
			content: '';
			width: 1px;
			height: 100%;
			position: absolute;
			top: 0px;
			right: 0;
			background: #dcdcdc;
		}

		.ware_tab_inx.active {
			background: #14bab4;
			color: #fff;
		}

		.ware_tab_inx.active:before {
			opacity: 1;
		}
	}

	.option_wrap {
		position: fixed;
		top: 1.06rem;
		background: #fff;
		z-index: 99;
		width: calc(100% - .2rem) !important;
		padding: .12rem;
		.swiper-notification{
			display: none !important;
		}
		.option {
			position: relative;
			z-index: 9999;

			span {
				display: block;
				float: left;
				width: 1.5rem;
				float: right;
				width: 1rem;
				text-align: center;
				height: 0.5rem;
				line-height: 0.5rem;
				font-size: 0.3rem;
				color: #656565;
				position: relative;
				cursor: pointer;
				margin:0rem 0.05rem;
				border:1px solid #E8E8E8;
				i {
					display: inline-block;
					width: 0;
					height: 0;
					border: 0.07rem solid;
					border-color: #fff transparent transparent transparent;
					margin-left: 0.1rem;
					margin-bottom: -0.04rem;
				}
			}

			span.active {
				background: #14BAB4 ;
				border-right: none;
				color:#fff;

				i {
					border-color: transparent transparent #fff transparent;
					margin-bottom: 0.02rem;
				}

			}

			.yellow {
				background: #fd7320;
			}

			.yellow.active {
				background: #f46610;
			}

			// span:after {
			// 	display: block;
			// 	content: '';
			// 	position: absolute;
			// 	right: 0;
			// 	top: 0.17rem;
			// 	width: 1px;
			// 	height: 0.35rem;
			// 	background: #57d1cd;
			// }

			span.fr:after {
				display: block;
				content: '';
				position: absolute;
				left: 0;
				top: 0.17rem;
				width: 1px;
				height: 0.35rem;
				background: none;
			}

			span.active:after {
				opacity: 0;
			}

		}

		.option_screen {
			.opt_con {
				background: #fff;
				width: 7.4rem;
				max-height: 4.8rem;
				padding-left: 0.1rem;
				overflow-y: scroll;
				padding-bottom: 0.5rem;
				padding-top: 0.2rem;

				span {
					display: inline-block;
					padding: 0.07rem 0.23rem;
					// background: #f1f5f5;
					color: #222534;
					font-size: 0.3rem;
					border-radius: 0.1rem;
					margin: 0.14rem 0.14rem;
				}
				.yellow{background: #FFF3CF;color: #FAB500;font-weight: bold;}
				.green{background: #DBF5F3;color: #13B9B3;font-weight: bold;}
				span.active {
					background: #14BAB4;
					color: #fff;
				}

				.save_title {
					color: #999999;
					font-size: 0.3rem;
					width: 1.2rem;
					margin-top: 0.1rem;
				}
			}

			.opt_con::-webkit-scrollbar-track-piece {
				background-color: #ededed;
				border-left: 1px solid rgba(0, 0, 0, 0);
			}

			.opt_con::-webkit-scrollbar {
				width: 6px;
				height: 6px;
				-webkit-border-radius: 5px;
				-moz-border-radius: 5px;
				border-radius: 5px;
			}

			.opt_con::-webkit-scrollbar-thumb {
				background-color: #14bab4;
				background-clip: padding-box;
				-webkit-border-radius: 5px;
				-moz-border-radius: 5px;
				border-radius: 5px;
				min-height: 28px;
				min-height: 20px;
			}

			.opt_con::-webkit-scrollbar-thumb:hover {
				background-color: #14bab4;
				-webkit-border-radius: 5px;
				-moz-border-radius: 5px;
				border-radius: 5px;
			}

			i {
				display: block;
				content: '';
				position: fixed;
				top: 2.9rem;
				left: 0;
				right: 0;
				bottom: 0;
				background: #000;
				z-index: -5;
				opacity: 0.5;
			}
		}
	}
</style>
<style >
.el-tooltip__popper.is-dark {
	z-index: 1011101  !important;
}
</style>