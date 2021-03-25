<template>
  <div class="app-container" id="product_procurement">
    <el-form ref="queryForm" :model="queryParams" :rules="rules" size="small" label-width="82px">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-form-item label="是否上下架" prop="publishStatus">
            <el-select v-model="queryParams.publishStatus" placeholder="请选择上下架" clearable :style="{width: '100%'}">
              <el-option
                v-for="(item, index) in publishOption"
                :key="index"
                :label="item.name"
                :value="item.value" >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="3">
          <el-form-item label="审核状态" prop="verifyStatus">
            <el-select v-model="queryParams.verifyStatus" placeholder="请选择审核状态" clearable :style="{width: '100%'}">
              <el-option
                v-for="(item, index) in verifyOption"
                :key="index"
                :label="item.name"
                :value="item.value" >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="商品编号" prop="productSn">
            <el-input v-model="queryParams.productSn" placeholder="请输入商品编号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="3">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="queryParams.name" placeholder="请输入商品名称" clearable :style="{width: '100%'}">
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

        <el-col :span="3">
          <el-form-item label="供应商" prop="memberName">
            <el-input v-model="queryParams.memberName" placeholder="请输入供应商" clearable :style="{width: '100%'}">
            </el-input>
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
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="ItemAdd">新增商品</el-button>
        <!-- <el-button type="primary" icon="el-icon-plus" size="mini" @click="unloading">批量上下架</el-button> -->
        <el-button type="warning" icon="el-icon-user" size="mini" @click="BatchReview">批量审核</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="refreshTime">批量刷新上架</el-button>
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
    <!-- @select-all="selectAll"
    @select="handleSelectionChangeber"
    @selection-change="handleSelectionChangeatf"
    @expand-change="dataExpand" -->
      <el-table-column type="selection" header-align="center" align="center" />

      <el-table-column label="商品编号" align="center" prop="productSn" min-width="100"></el-table-column>
      <el-table-column label="供应商" align="center" prop="memberName" min-width="100"></el-table-column>
      <el-table-column label="商品名称" align="center" class-name="productName" min-width="160" prop="name" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="商品分类" align="center" min-width="80" prop="productCategoryName" :show-overflow-tooltip="true"/>
      <el-table-column label="品牌" align="center" prop="brandName" header-align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="仓库" align="center" min-width="120" prop="depotName" :show-overflow-tooltip="true"/>
      <el-table-column label="报价方式" align="center" header-align="center" prop="priceType">
        <template slot-scope="scope">
          <span v-if="scope.row.priceType == 'FIXED'">固定价</span>
          <span v-else-if="scope.row.priceType == 'ENQUIRY'">询价</span>
          <span v-else>{{ scope.row.priceType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" align="center" header-align="center" prop="price" >
        <template slot-scope="scope">
          <span v-if="scope.row.priceType == 'ENQUIRY'">-</span>
          <span v-else>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center" prop="verifyStatus" width="100" >
        <template slot-scope="scope">
          <span style="color: red" v-if="scope.row.verifyStatus == 0">待审核</span>
          <span v-if="scope.row.verifyStatus == 1">审核不通过</span>
          <span v-else-if="scope.row.verifyStatus == 2">审核通过</span>
        </template>
      </el-table-column>
      <el-table-column label="发布状态" align="center" prop="publishStatus" width="150" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.publishStatus"
            active-text="上架"
            inactive-text="下架"
            @change="productSnchange($event, scope.row)"
            >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="库存" align="center" header-align="center" prop="stock"/>
      <el-table-column label="更新时间" align="center" header-align="center" prop="updateTime" min-width="110" />
      <el-table-column label="操作" class-name="operation" align="center" width="240">
        <template slot-scope="scope">
          <el-button v-if="scope" size="text" style="cursor: pointer;" type="primary" icon="el-icon-edit" @click="ItemEdit(scope.row)">编辑</el-button>
          <el-button v-if="scope" size="text" style="cursor: pointer;" type="primary" icon="el-icon-s-order" @click="ItemEdit(scope.row, true)">复制</el-button>
          <el-button v-if="scope" size="text" style="cursor: pointer;" type="primary" icon="el-icon-s-order" @click="extractTemplates(scope.row)">提取模板</el-button>
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

    <el-dialog
      title="审核提示"
      v-if="Auditdialog"
     :visible.sync="Auditvisible"
      width="30%"
      top="35vh"
      center
      :before-close="AuditBeforeClose">
      <el-form style="padding: 0 42px;height: 28px;text-align: center;" :inline="true" :model="AuditForm" class="demo-form-inline">
        <el-form-item label="审核状态">
          <el-radio v-model="AuditForm.verifyStatus" label="1">审核不通过</el-radio>
          <el-radio v-model="AuditForm.verifyStatus" label="2">审核通过</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="AuditFormRight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { ArrayRecursion, upArrayRecursion } from "@/utils";

export default {
  name: "product",
  components: {
    //PurchaseOrderPopout
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
      purchaserOptions: [],
      accountMemberOption: [],
      cacheData: {
        member: {},
        user: {}
      },
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      cascaderprops: { multiple: true },
      // 查询参数
      queryParams: {
        publishStatus: '',
        verifyStatus: '',
        productSn: '',
        name: '',
        memberName: '',
        productCategoryListCode: '',
        brandName: '',
      },
      publishOption: [
        { name: '是', value: 1 },
        { name: '否', value: 0 },
      ],
      verifyOption: [
        { name: '审核通过', value: 2 },
        { name: '审核不通过', value: 1 },
      ],
      AuditForm: {
        verifyStatus: '0'
      },
      Auditvisible: true,
      Auditdialog: false,
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
    let productSearch = window.productSearchData
    let productCategoryListCode = window.productCategoryListCode
    if (productSearch) {
      productSearch = JSON.parse(productSearch)

      for (let i in productSearch.from)
      this.queryParams[i] = productSearch.from[i]

      if (this.queryParams.productCategoryListCode != '')
      this.Goods.productCategoryListCode = productCategoryListCode ? JSON.parse(productCategoryListCode) : []
      
      for (let o in productSearch.page)
      this.page[o] = productSearch.page[o]

      this.total = productSearch.total
    }
    this.getList();
    this.goodsClassify()
    window.productSearchData = ''
  },
  methods: {
    /** 查询采购单列表 */
    getList(flag) {

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
        url: '/pms/product/list_product_result',
        data: {
          search: JSON.stringify(this.queryParams),
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
        },
        method: 'get'
      }).then( res => {
        this.loading = false
        if (res.code == 200) {
          if (res.rows.length > 0) {
            res.rows.forEach((v, i) =>{
              if (v.publishStatus == 1)
              v.publishStatus = true
              else
              v.publishStatus = false
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
      this.affirmTwo('warning', '是否更新当前操作?', () => {
        this.loading = true
        this.$http({
          url: '/pms/product/update/delete_status',
          data: {
            codeList: this.tableSelectOptionS,
            deleteStatus: 1
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
      })
    },
    BatchReview() {
      if (this.tableSelectOptionS.length == 0) {
        this.msgError('请选择一条数据')
        return false;
      }
      this.Auditdialog = true
    },
    AuditBeforeClose() {
      this.Auditdialog = false
    },
    AuditFormRight() {
      this.$http({
        url: '/pms/product/update/verify_status',
        data: {
          codeList: this.tableSelectOptionS,
          verifyStatus: Number(this.AuditForm.verifyStatus)
        },
        method: 'POST'
      }).then( res => {
        this.loading = false
        if (res.code) {
          this.Auditdialog = false
          this.getList()
          this.msgSuccess('操作成功!')
        }
        else
        this.msgError(res.msg)
      });
    },
    extractTemplates(row) {
      let productCode = row.code
      this.affirmTwo('warning', '是否把这条数据提取为商品模板?', () => {
        this.loading = true
        this.$http({
          url: '/pms/product_template/template_extract',
          data: {
            productCode
          },
          method: 'get'
        }).then( res => {
          this.loading = false
          if (res.code == 200) {
            this.$notify({
              title: '添加成功',
              message: res.msg,
              type: 'success',
              duration: 5000
            });
          }
          else
          this.msgError(res.msg)
        });
      })
    },
    refreshTime() {
      if (this.tableSelectOptionS.length == 0) {
        this.msgError('请至少选择一条数据')
        return false;
      } else {
        this.affirmTwo('primary', '是否更新当前操作?', () => {
          this.$http({
            url: '/pms/product/update/update_time',
            data: {
              codeList: this.tableSelectOptionS
            },
            method: 'POST'
          }).then( res => {
            if (res.code == 200) {
              this.getList()
              this.msgSuccess('刷新成功!')
            }
            else
            this.msgError(res.msg)
          });
        })
      }
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
      this.queryParams.productCategoryListCode = arr
    },
    productSnchange(row, obj) {
      this.loading = true
      this.$http({
        url: '/pms/product/update/publish_status',
        data: {
          codeList: [obj.code],
          publishStatus: row ? 1 : 0
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
    ItemEdit(row, type) {
      if (type)
      this.$router.push({ path: '/product/AddEdit', query: { code: row.code, copy: true }});
      else {
        this.$router.push({ path: '/product/AddEdit', query: { code: row.code }});
      }

      let obj = {
        from: this.queryParams,
        page: this.page,
        total: this.total,
      }
      window.productSearchData = JSON.stringify(obj)
    },
    ItemAdd(){
      let obj = {
        from: this.queryParams,
        page: this.page,
        total: this.total,
      }
      window.productSearchData = JSON.stringify(obj)
      this.$router.push({ path: '/product/AddEdit' });
    },
    affirmTwo(type, msg, retFunc) {
      this.$confirm( msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: type ? type : 'warning'
      }).then(() => {
        retFunc()
      }).catch(() => {
      
      });
    }
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
#product_procurement .el-dialog {
  margin-top: 30vh !important;
}
.el-notification__content{
  text-align: left;
}
</style>
