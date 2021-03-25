<template>
  <div class="app-container" id="intention_procurement">
    <el-form ref="queryForm" :model="queryParams" :rules="rules" size="small" label-width="140px">
      <el-row :gutter="10">

        <el-col :span="4">
          <el-form-item label="采购公司名称" prop="purchaseMember">
            <el-input v-model="queryParams.purchaseMember" placeholder="请输入采购公司名称" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="商品编号" prop="productSn">
            <el-input v-model="queryParams.productSn" placeholder="请输入商品编号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="采购人员名称" prop="purchaseUser">
            <el-input v-model="queryParams.purchaseUser" placeholder="请输入采购人员名称" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="商品名称" prop="productName">
            <el-input v-model="queryParams.productName" placeholder="请输入商品名称" clearable :style="{width: '100%'}">
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
          <el-form-item label="处理状态" prop="status">
            <el-select
              :style="{width: '100%'}"
              v-model="queryParams.status"
              clearable
              placeholder="请选择状态"
              >
              <el-option
                v-for="item in StatusOptionSA"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="getList">搜索</el-button>
        <!-- <el-button type="primary" icon="el-icon-plus" size="mini" @click="ItemAdd">新增商品</el-button> -->
        <el-button type="warning" icon="el-icon-user" size="mini" @click="ModifiSubmit">批量状态修改</el-button>
        <!-- <el-button type="danger" icon="el-icon-delete" size="mini" @click="BatchRemove">批量删除</el-button> -->
        <el-button icon="el-icon-refresh" size="mini" @click="getList('true')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
        v-loading="loading"
        :data="productintentionData"
        border
        ref="productList"
        size="mini"
        @selection-change="handleSelectionChangeatf"
    >
      <el-table-column type="selection" header-align="center" align="center" />

      <!-- <el-table-column label="CODE" align="center" min-width="50" prop="code" width="100"></el-table-column> -->
      <el-table-column label="商品编号" align="center" header-align="center" prop="productCode" >
        <template slot-scope="scope">
          {{ scope.row.pmsProductResult ? scope.row.pmsProductResult.productSn : '' }}
        </template>
      </el-table-column>
      <el-table-column label="采购公司名称" align="center" min-width="120" prop="purchaseMember" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="采购公司编号" align="center" min-width="80" prop="purchaseMemberCode" :show-overflow-tooltip="true"/>
      <el-table-column label="采购人员" align="center" header-align="center" prop="purchaseUser"></el-table-column>
      <el-table-column label="采购人员编号" align="center" header-align="center" prop="purchaseUserCode"/>
      <el-table-column label="采购手机号" align="center" header-align="center" prop="mobile" />
      <el-table-column label="商品名称" align="center" class-name="productName" :show-overflow-tooltip="true" min-width="120" header-align="center" prop="productName" />
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
      <el-table-column label="采购数量" align="center" header-align="center" prop="purchaseAmount" >
      </el-table-column>
      <el-table-column label="处理状态" align="center" header-align="center" prop="statusStr" >
      </el-table-column>
      <el-table-column label="提交时间" align="center" header-align="center" prop="createTime" />
      <el-table-column label="处理时间" align="center" header-align="center" prop="updateTime" />
      <!-- <el-table-column label="操作" align="center" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button v-if="scope" size="text" style="cursor: pointer;" type="primary" icon="el-icon-edit" @click="ItemEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <el-dialog
      title="状态修改"
     :visible.sync="Auditdialog"
      width="30%"
      top="35vh"
      :before-close="AuditBeforeClose">
      <el-form label-width="90px" ref="AuditForms" style="padding: 0 42px;height: 174px;text-align: center;" :inline="true" :model="AuditForm" :rules="AuditFormrules" class="demo-form-inline">
        <el-form-item label="处理状态" prop="status">
          <el-select
            :style="{width: '100%'}"
            v-model="AuditForm.status"
            placeholder="请选择状态"
            >
            <el-option
              v-for="item in StatusOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            v-model="AuditForm.description"
            type="textarea"
            placeholder="请输入备注"
            :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="AuditFormRight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { ArrayRecursion, upArrayRecursion, formatDate } from "@/utils";

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
      productintentionData: [],
      // 查询参数
      queryParams: {
        purchaseMember: '',
        purchaseUser: '',
        productName: '',
        productSn: '',
        status: '',
        productCategoryListCode: [],
        pageNum: 1,
        pageSize: 10,

      },
      cascaderprops: { multiple: true },
      Goods: {
        productCategoryListCode:''
      },
      publishOption: [
        { name: '是', value: 1 },
        { name: '否', value: 0 },
      ],
      StatusOptions: [
        { name: '已跟进', value: 1 },
        { name: '已制单', value: 2 },
        { name: '已作废', value: 3 },
      ],
      StatusOptionSA: [
        { name: '未处理', value: 0 },
        { name: '已跟进', value: 1 },
        { name: '已制单', value: 2 },
        { name: '已作废', value: 3 },
      ],
      AuditForm: {
        status: '',
        description: ''
      },
      Auditvisible: true,
      Auditdialog: false,
      // 表单参数
      form: {},
      // 表单校验
      AuditFormrules: {
        status: [{ required: true, message: '请选择处理状态', trigger: 'blur' }],
        // publishStatus: [{ required: true, message: '上下架状态不能为空', trigger: 'blur' }],
        // publishStatus: [{ required: true, message: '上下架状态不能为空', trigger: 'blur' }],
        // publishStatus: [{ required: true, message: '上下架状态不能为空', trigger: 'blur' }],
      },
      rules: {},
      goodsClassifyOptions: [],
      Goods: {
        productCategoryCode:''
      },
      migoFuncdisplay: false,
      purchase_procurement_PopoutTitle: '',
      handleSelectionAction: null,
      keyId:''
    };
  },
  created() {
    // this.listCustomColumns();
    this.getList();
    // this.listPurchaserOptions();
    // this.listMemberAccountRel();
  },
  methods: {
    /** 查询采购单列表 */
    getList(flag) {
      // 请求参数重置
      let from = this.queryParams
      if (flag == 'true') {
        for(let i in from) {
          if (from.hasOwnProperty(i)) {
            from[i] = ''
          }
        }
        from.pageNum = 1
        from.pageSize = 10
        this.Goods.productCategoryListCode = ''
      }
      let that = this;
      this.loading = true;
      this.$http({
        url: '/pms/product_purchase_intention/list',
        data: from,
        method: 'get'
      }).then( res => {
        this.loading = false
        if (res.code == 200) {
          if (res.rows.length > 0) {
            this.total = res.total
            this.productintentionData = []
            // res.rows.forEach((v, i) => {
            //   debugger
            //   v.createTime = v.createTime.replace(/-/g, '/')
            //   v.createTime = formatDate(v.createTime)
            // })
            this.productintentionData = res.rows
          }else {
            this.total = 0
            this.productintentionData = []
          }
          this.goodsClassify()
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
    BatchRemove() {
      if (this.tableSelectOptionS.length == 0) {
        this.msgError('请选择一条数据')
        return false;
      }
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
          this.getList()
          this.msgSuccess('操作成功!')
        }
        else
        this.msgError(res.msg)
      });
    },
    ModifiSubmit() {
      if (this.tableSelectOptionS.length == 0) {
        this.msgError('请选择一条数据')
        return false;
      }
      this.Auditdialog = true
    },
    AuditBeforeClose() {
      this.Auditdialog = false
      Object.keys(this.AuditForm).forEach(key => this.AuditForm[key] = '');
    },
    AuditFormRight() {
      this.$refs.AuditForms.validate( value => {
        if (value) {
          this.loading = true
          this.$http({
            url: '/pms/product_purchase_intention/update_status',
            data: {
              codeList: this.tableSelectOptionS,
              status: Number(this.AuditForm.status),
              description: this.AuditForm.description,
            },
            method: 'POST'
          }).then( res => {
            this.loading = false
            if (res.code) {
              this.Auditdialog = false
              this.getList()
              this.msgSuccess('操作成功!')
              this.AuditBeforeClose()
            }
            else
            this.msgError(res.msg)
          });
        }
      })
    },
    ItemEdit(row) {
      this.$router.push({ path: '/product/AddEdit', query: { code: row.code }});
    },
    ItemAdd(){
        this.$router.push({ path: '/product/AddEdit' });
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
  #intention_procurement .productName>div{
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
