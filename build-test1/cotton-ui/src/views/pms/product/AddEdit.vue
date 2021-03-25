<template>
  <div v-loading="loading" class="product_add-container" ref="product_add" style="padding: 20px 8%;height: 800px;width: 58%;margin: 0 auto;overflow-y: scroll;overflow-x: hidden;">
    <el-form ref="Global" :model="Global" :rules="Goodsrules" size="small" label-width="178px">
      <el-form-item label="商品分类">
        <el-cascader :style="{width: '100%'}"
          v-model="Goods.productCategoryCode"
          ref="cascadergoodsClassify"
          :options="goodsClassifyOptions"
          :disabled="EditCode ? true : false"
          clearable
          @change="goodsClassifyChange">
        </el-cascader>
      </el-form-item>

      <el-form-item label="供应商" prop="memberName">
        <el-select
          :style="{width: '100%'}"
          v-model="Global.memberName"
          :multiple="false"
          filterable
          remote
          reserve-keyword
          placeholder="请输入供应商"
          @change="valueChange('memberName', Global.memberName)"
          :remote-method="memberNameremoteMethod"
          :loading="memberNameloading">
          <el-option
            v-for="item in memberNameOptions"
            :key="item.memberID"
            :label="item.corpNameFull"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="仓库" prop="depotName">
        <el-select
          v-model="Global.depotName"
          :style="{width: '100%'}"
          :multiple="false"
          filterable
          remote
          reserve-keyword
          placeholder="请输入仓库"
          @change="valueChange('depotName', Global.depotName)"
          :remote-method="depotNameremoteMethod"
          :loading="depotNameloading">
          <el-option
            v-for="item in depotNameOptions"
            :key="item.depotID"
            :label="item.corpNameFull"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称" prop="name">
        <el-input 
          v-model="Global.name"
          placeholder="请输入商品名称"
          clearable
          :disabled="GlobalNameRuleReg ? true : false"
          maxlength="18"
          :style="{width: '100%'}">
        </el-input>
      </el-form-item>

      <el-form-item label="品牌" prop="brandName">
        <el-select
          v-model="Global.brandCode"
          v-if="brandNameBle == 'SELECT' || brandNameBle != 'TEXT'"
          placeholder="请选择品牌"
          @change="brandChange"
          clearable
          filterable
          :style="{width: '100%'}">
          <el-option
            v-for="(item, index) in brandOption"
            :key="index"
            :label="item.brandName"
            :value="item.brandCode">
          </el-option>
        </el-select>
        <el-input
          v-else-if="brandNameBle == 'TEXT'"
          placeholder="请输入品牌"
          @input="brandChange"
          v-model="Global.brandName"
          clearable
          :style="{width: '100%'}">
        </el-input>
      </el-form-item>

      <el-form-item v-for="(item, index) in DomInputSelectData" :key="index" :label="item.name" :error="item.data.valid.regeBle ? item.data.valid.regexText : ''" :show-message="item.data.valid.regeBle" :required="item.data.valid.required">
        <!--  -->
        <el-select
          v-if="item.inputType == 1"
          :multiple="item.selectType == 2"
          v-model="item.eidtInput"
          @change="DomInputSelectDatafunc($event, item, item.data.valid.required)"
          clearable
          @clear="DomInputSelectDatafunc($event, item, item.data.valid.required)"
          :style="{width: '100%'}">
          <el-option
            v-for="items in (item.inputList.split(','))"
            :key="items"
            :label="items"
            :value="items">
          </el-option>
        </el-select>
        <!--  -->
        <el-select
          v-model="item.eidtInput"
          v-if="item.inputType == 2"
          filterable
          :multiple="item.selectType == 2"
          :name="item.code"
          allow-create
          default-first-option
          placeholder="请输入选择"
          @change="DomInputSelectDatafunc($event, item, item.data.valid.required)"
          clearable
          @clear="DomInputSelectDatafunc($event, item, item.data.valid.required)"
          :style="{width: '100%'}">
          <el-option
            v-for="items in (item.inputList.split(','))"
            :key="items"
            :label="items"
            :value="items">
          </el-option>
        </el-select>
        <!--  -->
        <el-input
          v-if="item.inputType == 0"
          v-model="item.eidtInput" 
          clearable
          @clear="DomInputSelectDatafunc($event, item, item.data.valid.required)"
          @blur="DomInputSelectDatafunc($event, item, item.data.valid.required)"
          :style="{width: '100%'}">
        </el-input>
        <!-- <input type="text"  v-if="item.inputType == 0" v-model="item.eidtInput" > -->
      </el-form-item>

      <el-form-item label="提货方式" prop="deliveryMode">
        <el-select
          v-model="Global.deliveryMode"
          placeholder="请选择提货方式"
          clearable
          :style="{width: '100%'}">   
          <el-option
            v-for="(item, index) in deliveryModeOption"
            :key="index"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="报价方式" prop="priceType">
        <el-select
          v-model="Global.priceType"
          placeholder="请选择报价方式"
          clearable
          @change="priceTypeChange"
          :style="{width: '100%'}">
          <el-option
            v-for="(item, index) in priceTypeOption"
            :key="index"
            :label="item.dictLabel"
            :value="item.dictValue">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="priceTypeDom" label="价格" prop="price">
        <el-input 
          v-model="Global.price"
          :disabled="!Global.priceType"
          placeholder="请输入价格"
          :maxlength="5"
          type="number"
          clearable
          :style="{width: '100%'}">
        </el-input>
      </el-form-item>

      <!-- <el-form-item label="产品货号">
        <el-input 
          v-model="Global.productSn"
          placeholder="请输入产品货号"
          clearable
          :style="{width: '100%'}">
        </el-input>
      </el-form-item> -->

      <el-form-item label="发布状态">
        <el-switch
          v-model="Goods.productSnflg"
          active-text="上架"
          inactive-text="下架"
          @change="productSnchange"
          >
        </el-switch>
      </el-form-item>

      <el-form-item label="排序">
        <el-input 
          v-model="Global.sort"
          placeholder="请输入排序"
          type="number"
          clearable
          @blur="sortValidate(Global.sort)"
          :style="{width: '100%'}">
        </el-input>
      </el-form-item>

      <el-form-item label="库存" prop="stock">
        <el-input 
          v-model="Global.stock"
          placeholder="请输入库存"
          clearable
          type="number"
          :style="{width: '100%'}">
        </el-input>
      </el-form-item>

      <!-- <el-form-item label="数量" prop="weight">
        <el-input 
          v-model="Global.weight"
          placeholder="请输入数量"
          clearable
          type="number"
          :style="{width: '100%'}">
        </el-input>
      </el-form-item> -->

      <el-form-item label="商品图">
        <img-upload v-if="imgUploadFld" @imgUploadInfo="imgUploadInfo" :disabled="updateImgDisabled" @imgUploadInfoDel="imgUploadInfoDel" :config="updateImgConfig" :imgData="Global.pic"></img-upload>
      </el-form-item>

      <el-form-item label="备注">
        <el-input
          v-model="Global.note"
          type="textarea"
          placeholder="请输入备注"
          :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}">
        </el-input>
      </el-form-item>


      <el-form-item size="large">
        <el-button type="primary" v-if="EditCode && $route.query.copy" @click="GoodsCreate">立即复制</el-button>
        <el-button type="primary" v-if="EditCode && !$route.query.copy" @click="GoodsCreate">立即修改</el-button>
        <el-button type="primary" v-if="!EditCode && !$route.query.copy" @click="GoodsCreate">立即创建</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ArrayRecursion, upArrayRecursion, productNameRuleReg } from "@/utils";
import ImgUpload from '@/components/ImgUpload'
//import PurchaseOrderPopout from "./PurchaseOrderPopout/index";
export default {
  name: "productAddEdit",
  components: {
    //PurchaseOrderPopout
    ImgUpload
  },
  data() {
    var stockValidate = (rule, value, callback) => {
      if (value !== '') {
        if (Number(value).toString().includes('.') || Number(value).toString().includes('-')) {
          callback(new Error('库存不能小数和负数.'))
        } else {
          callback()
        }
      } else { callback(new Error('库存不能为空')) }
    }
    var priceValidate = (rule, value, callback) => {
      if (value !== '') {
        if (parseInt(Number(value)) .toString().length <= 5) {
          if (Number(value).toString().includes('.')) {
            callback(new Error('价格不能小数'))
          } else {
            callback()
          }
        } else {
          if (parseInt(Number(value)) .toString().length == 6) {
            if (Number(value).toString().includes('.')) {
              callback(new Error('价格不能小数'))
            } else {
              if (Number(value).toString().includes('-')) {
                callback()
              } else {
                callback(new Error('请输入小于五位整数的价格'))
              }
            }
          } else {
            callback(new Error('请输入小于五位整数的价格'))
          }
        }
      } else { callback(new Error('价格不能为空')) }
    }
    return {
      // 遮罩层
      loading: true,
      EditCode: '',
      // 选中数组
      Global: {
        name:'',
        brandName: '',
        brandCode: '',
        depotName: '', // 仓库名
        memberName: '', // 供应商
        memberCode: '',
        depotCode: '', // 仓库id
        deliveryMode: '',
        priceType:'',
        price:'',
        pic:"",
        attrList:[],
        productCategoryCode: '',
        productCategoryName: '',
        publishStatus: '',
        note:'',
        sort: '',
        stock: '',
        unit: '',
        weight: '',
        expiredTime: '',
      },
      GoodsCreateFL: true,
      // 基础数据
      Goods: {
        productCategoryCode: [],
        attrList:{},
        priceType: '',
        productSnflg: false
      },
      priceTypeOption: [],
      deliveryModeOption: [
        { name: '短途送到', value: 'SHORT_SENT' },
        { name: '仓库自提', value: 'TAKE_HEIR' },
      ],
      brandOption: [],
      Goodsrules: {
        productCategoryCode: [{ required: true, message: '商品分类不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
        priceType: [{ required: true, message: '报价方式不能为空', trigger: 'blur' }],
        price: [{ required: true, validator: priceValidate, trigger: 'blur' }],
        weight: [{ required: true, message: '数量不能为空', trigger: 'blur' }],
        stock: [{ required: true, validator: stockValidate, trigger: 'blur' }],
        unit: [{ required: true, message: '单位不能为空', trigger: 'blur' }],
        expiredTime: [{ required: true, message: '过期时间不能为空', trigger: 'blur' }],
        pic: [{ required: true, message: '商品图不能为空', trigger: 'blur' }],
        brandName: [{ required: true, message: '品牌不能为空', trigger: 'blur' }],
        depotName: [{ required: true, message: '仓库不能为空', trigger: 'blur' }],
        deliveryMode: [{ required: true, message: '提货方式不能为空', trigger: 'blur' }],
        memberName: [{ required: true, message: '提货方式不能为空', trigger: 'blur' }],
      },
      goodsClassifyOptions: [],
      DomInputSelectData: [],
      depotNameloading: false,
      memberNameloading: false,
      depotNameOptions: [],
      memberNameOptions: [],
      brandNameBle: '',
      GlobalNameRuleRegSols: {
        basic: [],
        attrList: []
      },
      priceTypeDom: true,
      // 图片上传组件数据
      imgUploadFld: false,
      // 全局reg
      GlobalNameRuleReg: true,
      updateImgConfig:{
        refs: 'updateImg',
        styleCss: {
          width: '27%',
          float: 'left'
        },
        styleCssIocn: {
          width: '355px',
          height: '220px',
          lineHeight: '220px'
        },
        spanStylecss: {
          width: '50%',
        },
        showFileList: true,
        autoUpload: true,
        imgSizeW: '1300',
        imgSizeH: '300',
        imageSize: '文件大小不能超过3MB'
      },
      imgDataListcon: [],
      updateImgDisabled:false
    };
  },
  created() {
    // this.EditCode = this.$route.query.code
    // if (this.EditCode) {
    //   this.productDetail(this.EditCode)
    // } else {
    //   this.getList();
    // }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews.toString()
    },
    key() {
      return this.$route.path
    }
  },
  watch: {
    cachedViews(res, o) {
      return this.$store.state.tagsView.cachedViews.toString()
    }
  },
  mounted() {

  },
  created(v,o) {
    this.EditCode = this.$route.query.code
    if (this.EditCode) {
      this.productDetail(this.EditCode)
    } else {
      this.getList();
    }
  },
  methods: {
    // 如果code为真需要查询详情接口
    productDetail (code) {
      this.loading = true
      this.$http({
        url: '/pms/product/detail',
        data: {
          code: code
        },
        method: 'get'
      }).then( res => {
        this.loading = false
        if (res.data) {
            // 数据清空处理填数据
            for(let o in res.data) {
              if (res.data.hasOwnProperty(o)) {
                for(let i in this.Global) {
                  if (this.Global.hasOwnProperty(i)) {
                    if (o == i) {
                      if (o == 'attrList') {
                        res.data[o].forEach((v, i) => {
                          res.data[o][i] = {
                            productAttributeCode: res.data[o][i].productAttributeCode,
                            value: res.data[o][i].value,
                          }
                        })
                        this.Global[i] = res.data[o]
                      }
                      else if (o == 'publishStatus') {
                        if (res.data[o] == 0)
                        this.Global[i] = false
                        else
                        this.Global[i] = true
                        this.Goods.productSnflg = this.Global[i]
                      } else if (o == 'priceType' && res.data[o] == 'ENQUIRY') {
                        this.priceTypeDom = false
                        this.Global[i] = res.data[o]
                      }else
                      this.Global[i] = res.data[o]
                    }
                  }
                }
              }
            }
            // 图片回显
            if (this.Global.pic)
            this.Global.pic.split(',').forEach((v) => {
              this.imgDataListcon.push({
                url: v
              })
            })
            this.getList(this.Global)
        }  
        else
        this.msgError('请求数据错误!')
      });
    },
    // 商品分类数据
    getList(row) {
      this.loading = true
      this.$http({
        url: '/pms/product_category/tree',
        data: {
          parentCode: '0'
        },
        method: 'get'
      }).then( res => {
        this.loading = false
        let arr
        if (res.data) {
          // 递归修改参数
          res.data = ArrayRecursion(
            res.data,
            {value: 'code', label: 'name'},
          )
          this.goodsClassifyOptions = []
          this.goodsClassifyOptions = JSON.parse(res.data)
          // 编辑处理
          if (row) {
            let that = this
            let value = upArrayRecursion(row.productCategoryCode, that.goodsClassifyOptions, ['code','name'], 'children', upArrayRecursion)
            that.Goods.productCategoryCode = value
            that.goodsClassifyChange(value, row)
          }
          this.imgUploadFld = true
        }
        else
        this.msgError('请求数据错误!')
      });
    },
    // 选择分类查动态数据
    goodsClassifyChange(row, eidtobj) {
      let row0 = (row[row.length - 1]).split(',')[0],
      row1 = (row[row.length - 1]).split(',')[1]
      // 数据清空处理
      if (!eidtobj) {
        this.Global.attrList = []
        for(let i in this.Global) {
          if (this.Global.hasOwnProperty(i) && i != 'attrList' &&  i != 'pic' && i != 'deliveryMode' && i != 'stock' && i != 'publishStatus') {
            this.Global[i] = ''
          }
        }
      }
      // 分类数据
      this.Global.productCategoryCode = row0
      this.Global.productCategoryName = row1
      // 增加品牌数据获取
      // 获取品牌列表
      this.brandList(row0)
      // 商品分类点击存储
      this.Goods.goodsClassify = row[row.length - 1]
      this.loading = true
      this.$http({
        url: '/pms/product_attribute/list',
        data: {
          productCategoryCode: row0
        },
        method: 'get'
      }).then( res => {
        this.loading = false
        let arr
        if (res.rows) {
          res.rows.forEach((v, i) => {
            v.eidtInput = ''
            v.data.valid.regeBle = false // 校验标识
          });
          this.DomInputSelectData = []
          if (eidtobj) {
            res.rows.forEach((o, i) => {
              eidtobj.attrList.forEach((v, i) => {
                if (v.productAttributeCode == o.code) {
                  if (o.selectType == 2) {
                    o.eidtInput = v.value.split(',')
                  } else {
                    o.eidtInput = v.value
                  }
                }
              })
            });
          }
          this.DomInputSelectData = res.rows
          // 获取配置数据
          this.GetConfigData(row0)
        }
        else
        this.msgError('请求数据错误!')
      });
    },
    // 全局配置
    GetConfigData (code) {
      this.loading = true
      this.$http({
        url: '/pms/product_category/get_product_edit_config',
        data: {
          code
        },
        method: 'get'
      }).then( res => {
        this.loading = false
        if (res.code == 200) {
          let data = res.data
          // 品牌配置
          if (data.fields)
          this.brandNameBle = data.fields.brandName.fieldType
          else
          this.brandNameBle = 'null'
          // 规则配置
          this.GlobalNameRuleReg = data.productNameRule ? data.productNameRule : ''
          // GlobalNameRuleRegSols        basic: [], attrList: []
          for (let i in this.Global) {
            if (this.Global.hasOwnProperty(i) && i != 'attrList') {
              var reg = new RegExp(`\\b(${i})\\b`)
              if (reg.test(this.GlobalNameRuleReg)) {
                this.GlobalNameRuleRegSols.basic.push(i)
              }
            }
          }
          
          this.DomInputSelectData.forEach((v, i) => {
            for(let o in v) {
              if (v.hasOwnProperty(o)) {
                if (o == 'code') {
                  var reg = new RegExp(`\\b(${v[o]})\\b`)
                  if (reg.test(this.GlobalNameRuleReg)) {
                    this.GlobalNameRuleRegSols.attrList.push(v[o])
                  }
                }
              }
            }
          })
          // 报价方式数据配置
          this.priceTypeOption = []
          this.priceTypeOption = data.priceTypeList ? data.priceTypeList : []
        }
        else
        this.msgError('请求数据错误!')
      });
    },
    brandList (code) {
      this.loading = true
      this.$http({
        url: '/pms/product_category/list_brand',
        data: {
          code
        },
        method: 'get'
      }).then( res => {
        this.loading = false
        if (res.data) {
          if (res.data.length) {
            this.brandOption = res.data
          }
          else {
            this.brandOption = []
          }
        }
        else
        this.msgError('请求数据错误!')
      });
    },
    brandChange(row) {
      let name
      this.brandOption.forEach((v, i) => {
        if (v.brandCode == row)
        name = v.brandName
      })
      if (name == undefined)
      this.Global.brandName = row
      else
      this.Global.brandName = name
      let that = this
      this.GlobalNameRuleRegSols.basic.forEach(key => {
        if (key == 'brandName') {
          if (that.GlobalNameRuleReg)
          that.Global.name = productNameRuleReg(that.Global, that.GlobalNameRuleReg)
        }
      })
    },
    // 所有动态数据修改
    DomInputSelectDatafunc(value, row, reg){
      // 属性配置
      if (typeof row.eidtInput === 'string')
      value = row.eidtInput
      else
      {
        value = row.eidtInput.toString()
      }

      // let arr = JSON.parse(JSON.stringify(this.Global.attrList))
      // // 
      let flag
      this.Global.attrList.forEach((v, i) => {
        if (v.productAttributeCode == row.code)
        flag = i // 拿到下标
      })

      if (reg) {
        if (row.data.valid.regex) {
          let RegTest = new RegExp(eval(row.data.valid.regex))
          if (!RegTest.test(value)) {
            row.data.valid.regeBle = true // 显示校验错误
            if (this.Global.attrList.length == 0) {
              return false;
            } else {
              this.Global.attrList.slice(flag,1)
              let that = this
              this.GlobalNameRuleRegSols.attrList.forEach(key => {
                if (key == row.code) {
                  if (that.GlobalNameRuleReg)
                  that.Global.name = productNameRuleReg(that.Global, that.GlobalNameRuleReg)
                }
              })
              return false;
            }
          } else {
            row.data.valid.regeBle = false
          }
        } 
      } else {
        if (row.eidtInput != '') {
          if (row.data.valid.regex) {
            let RegTest = new RegExp(eval(row.data.valid.regex))
            if (!RegTest.test(value)) {
              row.data.valid.regeBle = true // 显示校验错误
              if (this.Global.attrList.length == 0) {
                return false;
              } else {
                this.Global.attrList.slice(flag,1)
                let that = this
                this.GlobalNameRuleRegSols.attrList.forEach(key => {
                  if (key == row.code) {
                    if (that.GlobalNameRuleReg)
                    that.Global.name = productNameRuleReg(that.Global, that.GlobalNameRuleReg)
                  }
                })
                return false;
              }
            } else {
              row.data.valid.regeBle = false
            }
          } 
        } else {
          row.data.valid.regeBle = false
        }
      }
      // 进行校验

      if (this.Global.attrList.length == 0) {
        this.Global.attrList.push({
          productAttributeCode: row.code,
          value
        })
      } else {
        if (flag != undefined) {
          this.Global.attrList[flag].value = value
        } else {
          this.Global.attrList.push({
            productAttributeCode: row.code,
            value
          })
        }
      }

      let that = this
      this.GlobalNameRuleRegSols.attrList.forEach(key => {
        if (key == row.code) {
          if (that.GlobalNameRuleReg)
          that.Global.name = productNameRuleReg(that.Global, that.GlobalNameRuleReg)
        }
      })
    },
    sortValidate(value) {
      if (Number(value) >= 0) {
        // callback()
      } else {
        this.msgError('排序不能小于0');
        this.Global.sort = ''
      }
    },
    priceTypeChange(row) {
      if (row == 'ENQUIRY')
      this.priceTypeDom = false
      else
      this.priceTypeDom = true
    },
    clearDataObj() {
      for(let i in this.Global) {
        if (this.Global.hasOwnProperty(i) && i != 'attrList') {
          this.Global[i] = ''
        } else if (this.Global.hasOwnProperty(i) && i == 'attrList') {
          this.Global[i] = []
        }
      }
    },
    // 提交
    GoodsCreate(){
      let that = this
      this.$refs['Global'].validate((valid) => {
        if (valid) {
          if (this.Global.productCategoryCode == '') {
            this.msgError('商品分类不能为空');
            return false;
          }

          let flagV, str = '', fi = 0, regeBle
          this.DomInputSelectData.forEach((v, i) => {
            if (v.data.valid.required) {
              str += `${v.name}、`
              fi++
              if (v.eidtInput == '')
              flagV = v
            }

            if (v.data.valid.regeBle) {
              regeBle = `${v.name}${v.data.valid.regexText}`
            }
          })

          // 属性正则拦截
          if (regeBle != undefined) {
            this.msgError(regeBle);
            return false;
          }

          if (this.Global.attrList.length < fi)
          flagV = fi

          if (flagV != undefined) {
            this.msgWarning(str + '字段不能为空.');
            return false;
          }

          let copy = this.$route.query.copy
          let url
          if (copy) {
            url = '/pms/product/create'
          } else {
            if (that.EditCode) {
              that.Global.code = that.EditCode
              url = '/pms/product/update'
            }
            else
            url = '/pms/product/create'            
          }


          if (that.GoodsCreateFL) {
            that.GoodsCreateFL = false
          } else {
            return false;
          }
          if (that.Global.publishStatus)
          that.Global.publishStatus = 1
          else
          that.Global.publishStatus = 0
          that.loading = true
          that.$http({
            url: url,
            data: this.Global,
            method: 'POST'
          }).then( res => {
            this.GoodsCreateFL = true
            this.loading = false
            if (res.code == 200) {
              this.close()
            }
            else
            this.msgError(res.msg)
          });
        }
      })
    },
    close(){
      this.$router.push({ path: '/pms/product' });
    },
    productSnchange(row){
      if (row)
      this.Global.publishStatus = 1
      else
      this.Global.publishStatus = 0
    },
    imgUploadInfoDel(row) {
      let str
      this.imgDataListcon.forEach((v, i) => {
        if (row.url == v.url)
        str = i
      })
      this.imgDataListcon.splice(str, 1)
      str = ''
      this.imgDataListcon.forEach((v, i) => {
        str += `${v.url},`
      })
      let strarr = str.split(',')
      strarr.pop()
      this.Global.pic = strarr.toString()
    },
    imgUploadInfo (row) {
      // 图片信息返回
      this.loading = true
      let file = new FormData()
      file.append('file', row.file)
      this.$http({
        url: '/common/upload_public',
        header:{
          'Content-Type': 'multipart/form-data'
        },
        data: file,
        method: 'POST'
      }).then( res => {
        this.loading = false
        if (res.code == 200) {
          row.url = res.url
          this.imgDataListcon.push(row)
          let str = ''
          // if (this.imgDataListcon.length == 5) {
          //   this.updateImgDisabled = true
          //   this.msgInfo('温馨提示: 商品图做多上传五张图片.')
          // }
          this.imgDataListcon.forEach((v) => {
            str += `${v.url},`
          })
          let strarr = str.split(',')
          strarr.pop()
          this.Global.pic = strarr.toString()
        }
        else
        this.msgError('请求数据错误!')
      });
    },
    // 模糊搜索复用
    Method(query, Options, loading, url, id, name) {
      if (query !== '') {
        this[loading] = true
        this.$http({
          url: url,
          data: {
            corpNameFull: query,
            pageNum: 1,
            pageSize: 10,
          },
          method: 'get'
        }).then( res => {
          this[loading] = false
          if (res.code == 200) {
            if (res.rows.length) {
              res.rows.forEach((v, i) => {
                v.value = `${v[id]},${v[name]}`
              })
              this[Options] = res.rows
            } else {
              this[Options] = []
            }
          }
          else
          this.msgError(res.msg)
        });
      } else {
        this[Options] = [];
      }
    },
    // 仓库strat
    depotNameremoteMethod(query) {
      this.Method(query, 'depotNameOptions', 'depotNameloading', '/bas/common/depot/list', 'depotID', 'corpNameFull')
    },
    valueChange(type, value) {
      let arr = value.split(',')
      // 类型存值
      if (type == 'depotName') {
        this.Global.depotName = arr[1]
        this.Global.depotCode = arr[0]
      } else {
        this.Global.memberName = arr[1]
        this.Global.memberCode = arr[0]
      }
    },
    // end
    // 供应商strat
    memberNameremoteMethod(query) {
      this.Method(query, 'memberNameOptions', 'memberNameloading', '/bas/common/supplier/list', 'memberID', 'corpNameFull')
    },
    // end
  }
};
</script>
<style lang="less">
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .DisabledSelection .cell .el-checkbox__inner {
    display: none;
    position: relative;
  }
  .DisabledSelection .cell:before {
    content: "";
    position: absolute;
    right: 11px;
  }
  // #purchase_procurement .pagination-container .el-pagination {
  //   width: 100%;
  //   text-align: center;
  // }
  // #purchase_procurement .el-button--mini {
  //     padding: 6px 6px;
  // }
</style>
