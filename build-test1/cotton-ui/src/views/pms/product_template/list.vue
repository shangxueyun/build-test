<template>
  <div class="app-container" id="product_procurement">
    <el-form ref="queryForm" :model="queryParams" :rules="rules" size="small" label-width="100px">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="是否上下架" prop="status">
            <el-select v-model="queryParams.status" placeholder="请选择上下架" clearable :style="{width: '100%'}">
              <el-option
                v-for="(item, index) in publishOption"
                :key="index"
                :label="item.name"
                :value="item.value" >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="queryParams.productName" placeholder="请输入商品名称" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="模板编号" prop="productTemplateCode">
            <el-input v-model="queryParams.productTemplateCode" placeholder="请输入模板编号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="商品分类">
            <el-cascader :style="{width: '100%'}"
              v-model="Goods.productCategoryListCode"
              :options="goodsClassifyOptions"
              :props="cascaderprops"
              collapse-tags
              @change="goodsClassifyChange">
            </el-cascader>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="品牌" prop="brandName">
            <el-input v-model="queryParams.brandName" placeholder="请输入品牌" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="getList">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="ItemAdd">新增模板</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="BatchRemove">批量删除</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="getList('true')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
        v-loading="loading"
        :data="productListData"
        border
        ref="productList"
        size="mini"
        @selection-change="handleSelectionChangeatf"
      >
      <el-table-column type="selection" header-align="center" align="center" />

      <el-table-column label="模板编号" align="center" prop="productTemplateCode" min-width="100"></el-table-column>
      <el-table-column label="品牌" align="center" prop="brandName" header-align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="商品名称" align="center" class-name="productName" min-width="120" prop="productName" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="商品分类" align="center" min-width="80" prop="productCategoryName" :show-overflow-tooltip="true"/>
      <el-table-column label="发布状态" align="center" prop="status" width="150" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-text="已发"
            inactive-text="未发"
            @change="productSnchange($event, scope.row)"
            >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="商品属性" align="center" min-width="80" prop="attrText" :show-overflow-tooltip="true"/>
      <el-table-column label="更新时间" align="center" header-align="center" prop="updateTime" />
      <el-table-column label="操作" class-name="operation" align="center" width="150">
        <template slot-scope="scope">
          <el-button v-if="scope" size="text" style="cursor: pointer;" type="primary" icon="el-icon-edit" @click="ItemEdit(scope.row.code)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="page.pageNum"
      :limit.sync="page.pageSize"
      @pagination="getList"
    />


    <!-- 模板 -->
    <div v-if="TemplateCreateDis">
        <template-create ref="TemplateCreate" :template-title="TemplateCreateTitle" @templateClose="templateClose"></template-create>
    </div>
  </div>
</template>

<script>

import { ArrayRecursion, upArrayRecursion, turnFromdata, formatDate } from "@/utils";
import TemplateCreate from "./components/TemplateCreate";

export default {
  name: "product_template",
  components: {
    TemplateCreate
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      tableSelectOptionS: [],
      productListData: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      cascaderprops: { multiple: true },
      // 查询参数
      queryParams: {
        status: '',
        productName: '',
        productCategoryCodes: '',
        brandName: '',
        productTemplateCode: ''
      },
      publishOption: [
        { name: '是', value: 2 },
        { name: '否', value: 1 },
      ],
      TemplateCreateDis: false,
      TemplateCreateTitle: '',
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // publishStatus: [{ required: true, message: '上下架状态不能为空', trigger: 'blur' }],
        // publishStatus: [{ required: true, message: '上下架状态不能为空', trigger: 'blur' }],
        // publishStatus: [{ required: true, message: '上下架状态不能为空', trigger: 'blur' }],
        // publishStatus: [{ required: true, message: '上下架状态不能为空', trigger: 'blur' }],
      },
      goodsClassifyOptions: [],
      Goods: {
        productCategoryListCode:''
      },
      migoFuncdisplay: false,
      purchase_procurement_PopoutTitle: '',
      handleSelectionAction: null,
      keyId:''
    };
  },
  created() {
    // this.listCustomColumns();
    // this.listPurchaserOptions();
    // this.listMemberAccountRel();
  },
  activated(v,o) {
    // 搜索筛选条件
    // let productSearch = window.productSearchData
    // let productCategoryListCode = window.productCategoryListCode
    // if (productSearch) {
    //   productSearch = JSON.parse(productSearch)

    //   for (let i in productSearch.from)
    //   this.queryParams[i] = productSearch.from[i]

    //   if (this.queryParams.productCategoryListCode != '')
    //   this.Goods.productCategoryListCode = productCategoryListCode ? JSON.parse(productCategoryListCode) : []
      
    //   for (let o in productSearch.page)
    //   this.page[o] = productSearch.page[o]

    //   this.total = productSearch.total
    // }
    this.getList();
    this.goodsClassify()
    // window.productSearchData = ''
  },
  methods: {
    /** 查询采购单列表 */
    getList(flag) {

      let { pageNum,pageSize } = this.page
      // 请求参数重置
      if (flag == 'true') {
        for(let i in this.queryParams) {
          if (this.queryParams.hasOwnProperty(i)) {
            this.queryParams[i] = ''
          }
        }
        this.Goods.productCategoryListCode = ''
        // this.page.pageNum = 1
        // this.page.pageSize = 10
        window.productSearchData = ''
      }

      let that = this;
      this.loading = true;
      this.$http({
        url: `${this.$http.HostUrlYapi()}/pms/product_template/page`, // 环境取配置
        data:  Object.assign(this.page, this.queryParams),
        method: 'get'
      }).then( res => {
        this.loading = false
        let rertun = res
        res = res.data
        if (rertun.code == 200) {
          if (res.rows.length > 0) {
            res.rows.forEach((v, i) =>{
              if (v.status == 2)
              v.status = true
              else
              v.status = false
              let attrText = ''
              v.attrList.forEach((a) => {
                attrText += `${a.name}: ${a.value.search(',') > -1 ? a.value.replace(/,/g, ' ') : a.value} `
              })
              res.rows[i].attrText = attrText
              // 时间
              v.updateTime = formatDate(v.updateTime)
            })
            this.total = res.total
            this.productListData = []
            this.productListData = res.rows
          }
          else {
            this.productListData = []
            this.total = 0
          }
        }
        else
        this.msgError(res.msg)
      });
    },
    goodsClassify() {
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
            {value: 'code', label: 'name'}
          )
          this.goodsClassifyOptions = []
          this.goodsClassifyOptions = JSON.parse(res.data)
        }
        else
        this.msgError(res.msg)
      });
    },
    unloading() {
      this.loading = true
      this.$http({
        url: '/pms/product/update/publish_status',
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
            {label: 'code',value: 'name' }
          )
          this.goodsClassifyOptions = []
          this.goodsClassifyOptions = JSON.parse(res.data)
        }
        else
        this.msgError(res.msg)
      });
    },
    BatchRemove() {
      if (this.tableSelectOptionS.length == 0) {
        this.msgError('请选择一条数据')
        return false;
      }
      this.$confirm( '是否更新当前操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.loading = true
        this.$http({
          url: `${this.$http.HostUrlYapi()}/pms/product_template/delete`,
          data: turnFromdata({
            codes: this.tableSelectOptionS,
          }),
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST'
        }).then( res => {
          this.loading = false
          if (res.code) {
            this.getList()
            this.msgSuccess('操作成功!')
          }
          else
          this.msgError(res.msg)
        });
      }).catch(() => {
      
      });
    },
    handleSelectionChangeatf(row, obj){
      this.tableSelectOptionS = []
      let arr = []
      row.forEach((v, i) => {
        arr.push(v.code)
      })
      this.tableSelectOptionS = arr
    },
    goodsClassifyChange(row){
      let arr = []
      row.forEach((v, i) => {
        v.forEach(o => {
          arr.push(o.split(',')[0])
        })
      })
      arr = Array.from(new Set(arr))
      window.productCategoryListCode = JSON.stringify(row)
      this.queryParams.productCategoryCodes = arr.toString()
    },
    // 创件模板关闭
    templateClose() {
      this.TemplateCreateDis = false
      this.getList()
    },
    productSnchange(row, obj) {
      this.loading = true
      let { code } = obj
      this.$http({
        url: `${this.$http.HostUrlYapi()}/pms/product_template/status`,
        data: turnFromdata({
          code,
          status: row ? 2 : 1
        }),
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST'
      }).then( res => {
        this.loading = false
        if (res.code) {
          this.msgSuccess('操作成功!')
        }
        else
        this.msgError('请求数据错误!')
      });
    },
    ItemEdit(row) {
      this.TemplateCreateDis = true
      this.TemplateCreateTitle = '修改商品模板'
      this.$nextTick(() => {
        this.$refs.TemplateCreate.productDetail(row)
      })
    },
    ItemAdd(){
      this.TemplateCreateDis = true
      this.TemplateCreateTitle = '新增商品模板'
      this.$nextTick(() => {
        this.$refs.TemplateCreate.getList()
      })
    },
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
  #product_procurement .productName>div{
    white-space: pre;
  }
  // #purchase_procurement .pagination-container .el-pagination {
  //   width: 100%;
  //   text-align: center;
  // }
  // #purchase_procurement .el-button--mini {
  //     padding: 6px 6px;
  // }
</style>
<style>
.el-notification__content{
  text-align: left;
}
</style>
