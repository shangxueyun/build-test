<template>
  <div class="designatedArea" :id="'designatedArea' + listId">
    <!-- 城市父级循环不在点击范围 -->
    <nav class="designatedArea-class-1">
      <li @click="ActionClass2($event, '')">不限</li>
        <!-- id: 0,
        name: '不限',
        flag: true,
        filter: '',
        value: '' 

        code: "0"
        filter: "depositary"
        flag: false
        id: 50
        list: null
        name: "阿克苏"
        parentId: 1
        value: "阿克苏"
        -->
      <li class="active" @click="ActionClass2($event, 'southXinjiang')">南疆</li>
      <li @click="ActionClass2($event, 'northernXinjiang')">北疆</li>
      <li v-if="typeNum == 6" @click="ActionClass2($event, 'largUnit')">兵团</li>
      <li @click="ActionClass2($event, 'hinterland')">内地</li>
    </nav>
    <div class="designatedArea-class-2" id="southXinjiang" v-show="ActionClass2Dom == 1">
      <nav>
        <div class="originsCityDepositary" @click="originsCityDepositary($event, typeNum == 6 ? 'originsCity' : 'depositary', 1)">
          <input type="checkbox" value="1" ref="originsCityDepositaryChecked1">
          <span style="margin: 0;background: transparent;color: #fff;">全选</span>
        </div>
        <template v-for="(item,index) in listObj">
          <li v-if="item.parentId == 1" :key="index" :class="{'active':item.flag}" @click="addparamsList(item.filter,item.value,index,1)">{{item.name}}</li>
        </template>
      </nav>
    </div>
    <div class="designatedArea-class-2" id="northernXinjiang" v-show="ActionClass2Dom == 2">
      <nav>
        <div class="originsCityDepositary" @click="originsCityDepositary($event, typeNum == 6 ? 'originsCity' : 'depositary', 2)">
          <input type="checkbox" value="1" ref="originsCityDepositaryChecked2">
          <span style="margin: 0;background: transparent;color: #fff;">全选</span>
        </div>
        <template v-for="(item,index) in listObj">
          <li v-if="item.parentId == 2" :key="index" :class="{'active':item.flag}" @click="addparamsList(item.filter,item.value,index,2)">{{item.name}}</li>
        </template>
      </nav>
    </div>
    <div class="designatedArea-class-2" id="hinterland" v-show="ActionClass2Dom == 3">
      <nav>
        <div class="originsCityDepositary" @click="originsCityDepositary($event, typeNum == 6 ? 'originsCity' : 'depositary', 3)">
          <input type="checkbox" value="1" ref="originsCityDepositaryChecked3">
          <span style="margin: 0;background: transparent;color: #fff;">全选</span>
        </div>
        <template v-for="(item,index) in listObj">
          <li v-if="item.parentId == 3" :key="index" :class="{'active':item.flag}" @click="addparamsList(item.filter,item.value,index,3)">{{item.name}}</li>
        </template>
      </nav>
    </div>
    <div v-if="typeNum == 6" class="designatedArea-class-2" id="hinterland" v-show="ActionClass2Dom == 4">
      <nav>
        <div class="originsCityDepositary" @click="originsCityDepositary($event, typeNum == 6 ? 'originsCity' : 'depositary', 4)">
          <input type="checkbox" value="1" ref="originsCityDepositaryChecked4">
          <span style="margin: 0;background: transparent;color: #fff;">全选</span>
        </div>
        <template v-for="(item,index) in listObj">
          <li v-if="item.parentId == 4" :key="index" :class="{'active':item.flag}" @click="addparamsList(item.filter,item.value,index,4)">{{item.name}}</li>
        </template>
      </nav>
    </div>
    <!-- <span v-for="(item,index) in address_list" :key="index" :class="{'active':item.flag}" @click="addparams(item.filter,item.value,index,3)">{{item.name}}</span> -->
    <div v-if="typeNum != 6" class="checkboxsidings" style="margin-left:10px" ref="checkboxsidings"><input type="checkbox" name="sidings" @change="ActionClass2($event, '铁路专用线')" :checked="ActionClass1Checkbox" value="1"><span style="padding: 0 6px;margin: 0 0;background: transparent" @click="ActionClass2($event, '铁路专用线')"> 铁路专用线</span></div>
  </div>
</template>


<script>
export default {
  components: {

  },
  data () {
    return {
      // 切换type
      ActionClass2Dom: 1,
      ActionClass1Checkbox: false,
      listObj: null
    }
  },
  computed: {
  },
  beforeCreate(){

  },
  watch: {
    // fileType(New, worn) {
    //   this.fileType = New
    // }
  },
  props:{
    value: [String, Object, Array],
    listId: [String, Number],
    ResetFig: [String, Number],
    typeNum: [String, Number],
    paramsSidings: [String, Number],
    // addparamsCall: { // 回调数据方法
    //   type: Function
    // },
  },
  mounted () {
    
  },
  created() {
    this.listObj = this.value
    this.paramsSidings == 1 ? this.ActionClass1Checkbox = true : this.ActionClass1Checkbox = false
  },
  methods: {
      // 铁路
      updateParamsSidings (value) {
        if (value)
        this.ActionClass1Checkbox = true
        else
        this.ActionClass1Checkbox = false
      },
      // 重置回调
      ResetFuc (value) {
        if (value) {
          this.$refs.originsCityDepositaryChecked1.checked = false
          this.$refs.originsCityDepositaryChecked2.checked = false
          this.$refs.originsCityDepositaryChecked3.checked = false
          if (this.$refs.originsCityDepositaryChecked4)
          this.$refs.originsCityDepositaryChecked4.checked = false
        }
      },
      // 全选
      originsCityDepositary (ele, filter, parentId) {
        let first =  ele.currentTarget.firstElementChild
        let str = ''
        if (ele.target.localName == 'input') {
          if (first.checked)
            first.checked = true
            else
              first.checked = false
        } else {
          if (first.checked)
            first.checked = false
            else
              first.checked = true
        }

        this.listObj.forEach((v, i) => {
          if (v.parentId == parentId) {
            if (first.checked) {
              this.listObj[i].flag = true
              str += `${v.name},`
            } else {
              this.listObj[i].flag = false
            }
          }
        });

        this.$set(this.listObj)

        this.$emit('addparamsCall', filter, '', 0, parentId, str)
      },
      // 切换type ActionClass2
      ActionClass2 (ele, str, filter, value, index) {
        switch (str) {
          case 'southXinjiang':
            this.ActionClass2Dom = 1
            break;
          case 'northernXinjiang':
            this.ActionClass2Dom = 2
            break;
          case 'hinterland':
            this.ActionClass2Dom = 3
            break;
          case 'largUnit':
            this.ActionClass2Dom = 4
            break;
          case '':
            this.ActionClass2Dom = 0
            break;
        }
        // 铁路专员线切换修改
        let children = ele.target.parentElement.children
        // str == '铁路专用线' ? children = ele.target.parentElement.parentElement.children : children = ele.target.parentElement.children
        for(let i in children){
          if (children.hasOwnProperty(i)) {
            children[i].className = ''
          }
        }
        if (str == '') {
          ele.target.className = 'active_'

          this.listObj.forEach((v, i) => {
              if (v.flag) {
                this.listObj[i].flag = false
              }
          });
          this.$refs.originsCityDepositaryChecked1.checked = false
          this.$refs.originsCityDepositaryChecked2.checked = false
          this.$refs.originsCityDepositaryChecked3.checked = false
          if (this.$refs.originsCityDepositaryChecked4)
          this.$refs.originsCityDepositaryChecked4.checked = false
          this.$set(this.listObj)

          if (this.typeNum != 6)
          this.$emit('addparamsCall', 'depositary', '', 0, this.typeNum)
          else
          this.$emit('addparamsCall', 'originsCity', '', 0, this.typeNum)
        } else if (str == '铁路专用线') {
          // this.ActionClass2Dom = 0
          this.ActionClass1Checkbox ? this.ActionClass1Checkbox = false : this.ActionClass1Checkbox = true
          this.$emit('addparamsCall', 'sidings', this.ActionClass1Checkbox)
        }
        else
        ele.target.className = 'active'
      },
      addparamsList (filter, value, index,judge) {
		if(judge==1)
		  this.$refs.originsCityDepositaryChecked1.checked = false
		else if(judge==2)
			this.$refs.originsCityDepositaryChecked2.checked = false
		else if(judge==3)
			this.$refs.originsCityDepositaryChecked3.checked = false
		else if(judge==4)
			this.$refs.originsCityDepositaryChecked4.checked = false
        if (this.listObj[index].flag)
        this.listObj[index].flag = false
        else
        this.listObj[index].flag = true
        this.$emit('addparamsCall', filter, value, index, this.typeNum)
      }
  }
}
</script>

<style lang="scss" scoped>
  .designatedArea{
    width: 100%;
    padding: 6px 0;
    position: relative;
    .checkboxsidings{
      position: absolute;
      top: -.4rem;
      right: 0;
      input{
        height: .44rem;
      }
      span{
        float: right
      }
    }
    &-class-1{
      width: 100%;
      display: flex;
      line-height: 22px;
      padding: 0px .16rem;
      li{
        list-style: none;
        min-width: .92rem;
        line-height: 0.5rem;
        text-align: center;
        font-size: .3rem;
        border-radius: 4px 4px 0px 0px;
        background: #f4f4f4;
        margin: 0 .1rem;
      }
      .active{
        background: #14BAB4;
        color: #fff;
      }
      .active_{
        border-radius: 4px;
        background: #14BAB4;
        color: #fff;
      }
    }
    &-class-2{
      width: calc(100% - .18rem);
      padding: .1rem;
      background: #EFF8F8;
      nav{
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        li{
          list-style: none;
          line-height: .44rem;
          padding: 2px 6px;
          border-radius: 4px;
          margin: .04rem .04rem;
          font-size: .3rem;
        }
        .active{
          color: #14BAB4;
        }
      }
    }
    .originsCityDepositary{
      float: left;
      list-style: none;
      height: 0.4rem;
      line-height: 10px;
      padding: 2px 4px;
      border-radius: 4px;
      margin: 0.04rem 0.18rem;
      font-size: 0.3rem;
      background: #14BAB4;
      display: flex;
      input{
        height: 18px;
      }
      span{
        padding: 0.07rem !important;
      }
    }
  }
</style>