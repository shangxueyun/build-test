<template>
	<div v-loading="loading" class="qualityList">
		<div class="topBack" >
			<img src="../../assets/img/back_icon.png" @click="$router.back(1)" alt="">
			<p>质量详情</p>
		</div>
		<div class="addHeight"></div>
		<table>
			<tr>
				<td>序号</td>
				<td>颜色级</td>
				<td>长度级</td>
				<td>轧工质量</td>
				<td>马克隆值</td>
				<td>马克隆档次</td>
				<td>马克隆值级</td>
				<td>Rd(%)</td>
				<td>+b</td>
				<td>长度(mm)</td>
				<td>长度整齐度(%)</td>
				<td>断裂比强度</td>
				
			</tr>
			<tr v-for="(item,index) in qualityList">
				<td>{{index+1}}</td>
				<td>{{item.colorLevel}}</td>
				<td>{{item.lengthLevel}}毫米</td>
				<td>{{item.quality}}</td>
				<td>{{item.mikeValue}}</td>
				<td>{{item.mikeGrade}}</td>
				<td>{{item.mikeLevel}}</td>
				<td>{{item.rd}}</td>
				<td>{{item.plusb}}</td>
				<td>{{item.lengthValue}}</td>
				<td>{{item.neatValue}}</td>
				<td>{{item.strongValue}}</td>
			</tr>
		</table>
		
	</div>
</template>

<script>
	export default{
		data:function(){
			return{
				batchID:'',
				loading:true,
				qualityList:'',
			}
		},
		mounted() {
			// this.$http.post('/wx/product/getCottonPack?type='+this.type).then((response) => {
			// 	this.informationList = response.entity.list;
			// 	this.loading=false;
			// 	// this.shopList = response.entity.list;
			// 	// this.loading= false;
			// })
			
		},
		//获取参数详情
		beforeRouteEnter (to, from, next) {
		//beforeRouteEnter中this无效，所以能用vm
		        next(vm => {
		          var batchID = to.params.id;//好的抓到id了
				  vm.batchID=batchID;
		          vm.axios.post('/wx/product/getCottonPack?batchID='+vm.batchID).then((response)=>{
		            // vm.songlikelist = res.data.data;
					vm.qualityList=response.entity;
					vm.loading=false;
					// console.log(response);
		          });
				  
		        })
		      },
	}
</script>

<style lang="scss">
	.qualityList{padding-bottom: 2rem;
		table{width:22rem;background: #fff;
			tr{
				td{padding: 0.2rem 0.3rem;border: 1px solid #e8ebed;text-align: center;color: #3a4040;font-size: 0.3rem;}
			}
			tr:nth-child(1){;
				td{padding: 0.2rem 0.3rem;border: 1px solid #e8ebed;text-align: center;background: #959595;color: #fff;font-size: 0.3rem;}
			}
		}
	}
</style>
