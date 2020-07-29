<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :rules="rules" size="mini" label-width="140px">
      <el-row gutter="10">
        <el-col :span="6">
          <el-form-item label="批次号" prop="batchID">
            <el-input v-model="queryParams.batchID" type="textarea" placeholder="请输入批次号"
                      :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="销售单号" prop="orderID">
            <el-input v-model="queryParams.orderID" placeholder="请输入采购单号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="销货单位" prop="buyMemberName">
            <el-input placeholder="请输入供应商" v-model="queryParams.buyMemberName" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="业务员" prop="sellUser">
            <el-select v-model="queryParams.sellUser" placeholder="请选择业务员" multiple filterable clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in purchaserOptions" :key="index" :label="item.name"
                         :value="item.userID" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="销售收款" prop="orderReceiptStatus">
            <el-select v-model="queryParams.orderReceiptStatus" placeholder="请选择销售收款" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in receiptStatusOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="销售货转" prop="orderDeliveryStatus">
            <el-select v-model="queryParams.orderDeliveryStatus" placeholder="请选择销售货转" clearable
                       :style="{width: '100%'}">
              <el-option v-for="(item, index) in deliveryStatusOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="销售开票" prop="orderInvoiceStatus">
            <el-select v-model="queryParams.orderInvoiceStatus" placeholder="请选择销售开票" clearable
                       :style="{width: '100%'}">
              <el-option v-for="(item, index) in invoiceStatusOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="采购单号" prop="purchaseID">
            <el-input v-model="queryParams.purchaseID" placeholder="请输入销售单号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="供应商" prop="sellMemberName">
            <el-input v-model="queryParams.sellMemberName" placeholder="请输入供应商" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="采购员" prop="buyUser">
            <el-select v-model="queryParams.buyUser" placeholder="请选择采购员" multiple filterable clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in purchaserOptions" :key="index" :label="item.name"
                         :value="item.userID" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="采购付款" prop="payStatus">
            <el-select v-model="queryParams.payStatus" placeholder="请选择采购付款" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in payStatusOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="采购货转" prop="purchaseDeliveryStatus">
            <el-select v-model="queryParams.purchaseDeliveryStatus" placeholder="请选择采购货转" clearable
                       :style="{width: '100%'}">
              <el-option v-for="(item, index) in deliveryStatusOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="采购发票" prop="invoiceStatus">
            <el-select v-model="queryParams.invoiceStatus" placeholder="请选择采购发票" clearable
                       :style="{width: '100%'}">
              <el-option v-for="(item, index) in invoiceStatusOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['system:order:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['system:order:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['system:order:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['system:order:export']"-->
<!--        >导出</el-button>-->
<!--      </el-col>-->

      <el-popover placement="bottom" width="300" trigger="click">
        <el-col :span="12" v-for="(data,key) in showDivColumns" :key="key">
          <el-checkbox v-model="data.isShow" v-bind:disabled="data.disabled" :key="data.code" @change="changeColumnShow(data)">{{ data.name }}</el-checkbox>
        </el-col>
        <el-button slot="reference" size="mini" type="primary" icon="el-icon-setting" class="setting">列配置</el-button>
      </el-popover>
    </el-row>

    <el-table v-loading="loading" :data="batchList" size="mini" border @selection-change="handleSelectionChange" highlight-current-row="true">
      <el-table-column type="selection" width="40" align="center" />

      <el-table-column label="批次号" align="center" width="100" prop="batchID" v-if="showDivColumns.show_batchID.isShow"/>
      <el-table-column label="品类" align="center" width="90" prop="purchaseKind" :formatter="purchaseKindFormat" v-if="showDivColumns.show_purchaseKind.isShow"/>
      <el-table-column label="采购单号" align="center" width="110" prop="purchaseID"  v-if="showDivColumns.show_purchaseID.isShow"/>
      <el-table-column label="供应商" align="center" width="200" prop="sellMemberName" show-overflow-tooltip="true" v-if="showDivColumns.show_sellMemberName.isShow"/>
      <el-table-column label="采购账套" align="center" width="200" prop="accountMemberName" show-overflow-tooltip="true" v-if="showDivColumns.show_accountMemberName.isShow"/>
      <el-table-column label="采购员" align="center" width="80" prop="buyUserName" show-overflow-tooltip="true" v-if="showDivColumns.show_buyUserName.isShow"/>
      <el-table-column label="采购日期" align="center" width="135" prop="purchaseDate" :formatter="purchaseDateFormat" show-overflow-tooltip="true" v-if="showDivColumns.show_purchaseDate.isShow"/>
      <el-table-column label="采购重量" align="center" width="80" prop="amount"  v-if="showDivColumns.show_amount.isShow"/>
      <el-table-column label="采购单价" align="center" width="90" prop="price"  v-if="showDivColumns.show_price.isShow"/>
      <el-table-column label="采购金额" align="center" width="90" prop="money"  v-if="showDivColumns.show_money.isShow"/>
      <el-table-column label="融资" align="center" width="60" prop="needLoan" :formatter="needLoanFormat" v-if="showDivColumns.show_needLoan.isShow"/>
      <el-table-column label="已支付" align="center" width="90" prop="paidMoney"  v-if="showDivColumns.show_paidMoney.isShow"/>
      <el-table-column label="余款" align="center" width="100" :formatter="spareMoneyFormat" v-if="showDivColumns.show_spareMoneyFormat.isShow"/>
      <el-table-column label="余款支付日" align="center" width="90" prop="lastPaymentDate"  v-if="showDivColumns.show_lastPaymentDate.isShow"/>
      <el-table-column label="采购货转" align="center" width="80" :formatter="purchaseDeliveryStatusFormat" v-if="showDivColumns.show_purchaseDeliveryStatus.isShow"/>
      <el-table-column label="采购发票" align="center" width="100" prop="invoiceMoney" v-if="showDivColumns.show_invoiceMoney.isShow"/>

      <el-table-column label="销售单号" align="center" width="130" prop="orderID"  show-overflow-tooltip="true" v-if="showDivColumns.show_orderID.isShow"/>
      <el-table-column label="销货单位" align="center" width="200" prop="buyMemberName" show-overflow-tooltip="true" v-if="showDivColumns.show_buyMemberName.isShow"/>
      <el-table-column label="销售账套" align="center" width="200" prop="orderAccountMemberName" show-overflow-tooltip="true" v-if="showDivColumns.show_orderAccountMemberName.isShow"/>
      <el-table-column label="业务员" align="center" width="90" prop="sellUserName"  v-if="showDivColumns.show_sellUserName.isShow"/>
      <el-table-column label="销售日期" align="center" width="135" prop="orderDate" :formatter="orderDateFormat" v-if="showDivColumns.show_orderDate.isShow"/>
      <el-table-column label="确认日期" align="center" width="135" prop="orderConfirmTime" :formatter="confirmTimeFormat" v-if="showDivColumns.show_orderConfirmTime.isShow"/>
      <el-table-column label="销售重量" align="center" width="90" prop="orderAmount"  v-if="showDivColumns.show_orderAmount.isShow"/>
      <el-table-column label="销售单价" align="center" width="90" prop="orderPrice"  v-if="showDivColumns.show_orderPrice.isShow"/>
      <el-table-column label="销售金额" align="center" width="90" prop="orderMoney"  v-if="showDivColumns.show_orderMoney.isShow"/>
      <el-table-column label="销售定金" align="center" width="90" prop="orderDepositRates" :formatter="depositRatesFormat"  v-if="showDivColumns.show_orderDepositRates.isShow"/>
      <el-table-column label="融资" align="center" width="50" prop="orderNeedLoan"  :formatter="orderNeedLoanFormat" v-if="showDivColumns.show_orderNeedLoan.isShow"/>
      <el-table-column label="结算金额" align="center" width="90" prop="orderSettleMoney" v-if="showDivColumns.show_orderSettleMoney.isShow"/>
      <el-table-column label="已收款" align="center" width="90" prop="orderPayConfirmed" v-if="showDivColumns.show_orderPayConfirmed.isShow"/>
      <el-table-column label="应收款" align="center" width="90" :formatter="receiveMoneyFormat"  v-if="showDivColumns.show_receiveMoney.isShow"/>
      <el-table-column label="余款最后支付日期" align="center" width="130" prop="orderLastPaymentDate"  v-if="showDivColumns.show_orderLastPaymentDate.isShow"/>
      <el-table-column label="销售货转" align="center" width="80" :formatter="orderDeliveryStatusFormat" v-if="showDivColumns.show_orderDeliveryStatus.isShow"/>
      <el-table-column label="销售发票" align="center" width="90" prop="orderInvoiceMoney"  v-if="showDivColumns.show_orderInvoiceMoney.isShow"/>


<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['system:order:edit']"-->
<!--          >修改</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['system:order:remove']"-->
<!--          >删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import store from "@/store";
import { listBatch } from "@/api/trd/batch";
import { listMemberByAccountRel, getMember, listMember } from "@/api/bas/member";
import { listUser, getUser } from "@/api/bas/user";
import { listColumn, updateColumn } from "@/api/system/column";

export default {
  name: "Batch",
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
      // 订单表格数据
      batchList: [],
      cacheData: {
        member: {},
        user: {}
      },
      showDivColumns: {
        show_batchID: { isShow: true },
        show_purchaseKind: { isShow: true },
        show_purchaseID: { isShow: true },
        show_sellMemberName: { isShow: true },
        show_accountMemberName: { isShow: true },
        show_buyUserName: { isShow: true },
        show_purchaseDate: { isShow: true },
        show_amount: { isShow: true },
        show_price: { isShow: true },
        show_money: { isShow: true },
        show_needLoan: { isShow: true },
        show_paidMoney: { isShow: true },
        show_spareMoneyFormat: { isShow: true },
        show_lastPaymentDate: { isShow: true },
        show_purchaseDeliveryStatus: { isShow: true },
        show_invoiceMoney: { isShow: true },
        show_orderID: { isShow: true },
        show_buyMemberName: { isShow: true },
        show_orderAccountMemberName: { isShow: true },
        show_sellUserName: { isShow: true },
        show_orderDate: { isShow: true },
        show_orderConfirmTime: { isShow: true },
        show_orderAmount: { isShow: true },
        show_orderPrice: { isShow: true },
        show_orderMoney: { isShow: true },
        show_orderDepositRates: { isShow: true },
        show_orderNeedLoan: { isShow: true },
        show_orderSettleMoney: { isShow: true },
        show_orderPayConfirmed: { isShow: true },
        show_receiveMoney: { isShow: true },
        show_orderLastPaymentDate: { isShow: true },
        show_orderDeliveryStatus: { isShow: true },
        show_orderInvoiceMoney: { isShow: true }
      },
      purchaserOptions: [],
      accountMemberOption: [],
      payStatusOptions: [{
        "label": "未付款",
        "value": 1
      }, {
        "label": "部分付款",
        "value": 2
      }, {
        "label": "已付款",
        "value": 3
      }],
      deliveryStatusOptions: [{
        "label": "未货转",
        "value": 1
      }, {
        "label": "部分货转",
        "value": 2
      }, {
        "label": "已货转",
        "value": 3
      }],
      receiptStatusOptions: [{
        "label": "未收款",
        "value": 1
      }, {
        "label": "部分收款",
        "value": 2
      }, {
        "label": "已收款",
        "value": 3
      }],
      invoiceStatusOptions: [{
        "label": "未开票",
        "value": 1
      }, {
        "label": "部分开票",
        "value": 2
      }, {
        "label": "已开票",
        "value": 3
      }],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        batchID: undefined,
        orderID: undefined,
        sellUser: undefined,
        invoiceStatus: undefined,
        purchaseID: undefined,
        sellMemberName: undefined,
        buyUser: undefined,
        buyMemberName: undefined,
        payStatus: undefined,
        orderReceiptStatus: undefined,
        orderInvoiceStatus: undefined,
        orderDeliveryStatus: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    // 预先加载列字段
    this.listCustomColumns();
    this.getList();
    this.listPurchaserOptions();
    this.listMemberAccountRel();
  },
  methods: {
    /** 查询订单列表 */
    getList() {
      let that = this;
      this.loading = true;

      let param = this.cloneJSON(this.queryParams);
      console.log(param)

      param["batchIdList"] = this.splitTextarea(param["batchID"]);
      param["buyUserList"] = param["buyUser"] || "";
      param["sellUserList"] = param["sellUser"] || "";

      param["batchID"] = "";
      param["buyUser"] = "";
      param["sellUser"] = "";

      listBatch(this.jsonToURL(param)).then(response => {
        this.batchList = response.rows;
        this.total = response.total;
        this.loading = false;

        that.setUserMemberName();
      });
    },
    /** 查询表格自定义列 */
    listCustomColumns() {
      this.loading = true;
      let that = this;
      listColumn({ code: "erp_batch_list" }).then(response => {
        if (response.total != 0) {

          response.rows.forEach(function (data) {
            that.$set(that.showDivColumns, data["code"], {
              "code": data["code"],
              "name": data["name"],
              "prop": data["prop"],
              "isShow": !!data["isShow"],
              "disabled": !!data["isReadonly"]
            });
          });
        }

        that.loading = false;
      });
    },
    /** 查询业务员列表 */
    listPurchaserOptions() {
      listUser(this.jsonToURL({ memberID: store.getters.memberID, statusListStr: '0,2,3' })).then(response => {
        this.purchaserOptions = response.rows;
      });
    },
    /** 查询会员账套列表 */
    listMemberAccountRel() {
      listMemberByAccountRel(null).then(response => {
        this.accountMemberOption = response.rows;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.orderID)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 修改表格自定义列显示/隐藏 */
    changeColumnShow(data) {
      this.loading = true;
      let that = this;
      updateColumn({ tableCode: "erp_batch_list", name: data["name"], code: data["code"], isShow: data["isShow"] ? 1 : 0 }).then(response => {
        if (response.code === 200) {
          that.msgSuccess("设置成功");
        } else {
          that.msgError(response.msg);
        }
        this.loading = false;
      });
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加订单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const orderID = row.orderID || this.ids
      getOrder(orderID).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改订单";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.orderID != undefined) {
            updateOrder(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addOrder(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const orderIDs = row.orderID || this.ids;
      this.$confirm('是否确认删除订单编号为"' + orderIDs + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delOrder(orderIDs);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有订单数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportOrder(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
    orderDateFormat(row, column) {
      return (row.orderDate || "") + " " + (row.orderTime || "");
    },
    confirmTimeFormat(row, column) {
      return this.parseTime(row.orderConfirmTime);
    },
    depositRatesFormat(row, column) {
      if (row.orderNeedLoan == 0) {
        return this.arithmeticMultiply(row.orderMoney, row.orderDepositRates);
      } else if (row.orderNeedLoan == 1) {
        return this.arithmeticMultiply(this.arithmeticAdd(row.orderMoney, row.orderLoanCost), row.orderDepositRates);
      }
      return 0;
    },
    purchaseKindFormat(row, column) {
      var result = "";
      if (row.purchaseKind == 1) {
        result = "非公检";
      } else {
        result = "公检棉";
      }

      if (row.purchaseID != null && row.purchaseID != "") {
        result += "(采)";
      } else if (row.orderID != null && row.orderID != "") {
        result += "(销)";
      } else if (row.bundleNo != null && row.bundleNo != "") {
        result += "(拍)";
      }

      return result;
    },
    spareMoneyFormat(row, column) {
        return this.arithmeticSubtract(row.money, row.paidMoney);
    },
    needLoanFormat(row, column) {

      if (row.needLoan == 1) {
        return "是";
      }
      if (row.needLoan == 0) {
        return "否";
      }

      return "-";
    },
    orderNeedLoanFormat(row, column) {

      if (row.orderNeedLoan == 1) {
        return "是";
      }
      if (row.orderNeedLoan == 0) {
        return "否";
      }

      return "-";
    },
    purchaseDateFormat(row, column) {
      return (row.purchaseDate || "") + " " + (row.purchaseTime || "");
    },
    receiveMoneyFormat(row, column) {
      if (row.orderNeedLoan == 0) {
        return this.arithmeticSubtract(row.orderMoney, row.orderPayConfirmed);
      } else if (row.orderNeedLoan == 1) {
        return this.arithmeticSubtract(this.arithmeticAdd(row.orderMoney, row.orderLoanCost), row.orderPayConfirmed);
      }
    },
    purchaseDeliveryStatusFormat(row,column) {
        if (row.deliveryAmount == 0) {
          return "未货转";
        }
        if (row.deliveryAmount >= 0 && row.deliveryAmount < row.amount) {
          return "部分货转";
        }
        if (row.deliveryAmount >= row.amount) {
          return "已货转";
        }
    },
    orderDeliveryStatusFormat(row,column) {
      if (row.orderDeliveryAmount == 0) {
        return "未货转";
      }
      if (row.orderDeliveryAmount >= 0 && row.orderDeliveryAmount < row.orderAmount) {
        return "部分货转";
      }
      if (row.orderDeliveryAmount >= row.orderAmount) {
        return "已货转";
      }
    },
    setUserMemberName() {
      var userIdList = [];
      var that = this;
      var memberIdList = [];
      Object.keys(this.batchList).forEach(function (idx) {
        if (!!that.batchList[idx]["accountMember"] && !that.cacheData["member"][that.batchList[idx]["accountMember"]] && memberIdList.indexOf(that.batchList[idx]["accountMember"]) == -1) {
          memberIdList.push(that.batchList[idx]["accountMember"]);
        }
        if (!!that.batchList[idx]["buyUser"] && !that.cacheData["user"][that.batchList[idx]["buyUser"]] && userIdList.indexOf(that.batchList[idx]["buyUser"]) == -1) {
          userIdList.push(that.batchList[idx]["buyUser"]);
        }
        if (!!that.batchList[idx]["sellUser"] && !that.cacheData["user"][that.batchList[idx]["sellUser"]] && userIdList.indexOf(that.batchList[idx]["sellUser"]) == -1) {
          userIdList.push(that.batchList[idx]["sellUser"]);
        }
        if (!!that.batchList[idx]["buyMember"] && !that.cacheData["member"][that.batchList[idx]["buyMember"]] && memberIdList.indexOf(that.batchList[idx]["buyMember"]) == -1) {
          memberIdList.push(that.batchList[idx]["buyMember"]);
        }
        if (!!that.batchList[idx]["orderAccountMember"] && !that.cacheData["member"][that.batchList[idx]["orderAccountMember"]] && memberIdList.indexOf(that.batchList[idx]["orderAccountMember"]) == -1) {
          memberIdList.push(that.batchList[idx]["orderAccountMember"]);
        }
      });

      if (memberIdList.length > 0) {
        listMember(this.jsonToURL({memberIdList: memberIdList})).then(response => {
          if (response.rows != null && response.rows.length > 0) {
            Object.keys(response.rows).forEach(function (idx) {
              that.cacheData["member"][response.rows[idx]["memberID"]] = response.rows[idx];
            })

            Object.keys(this.batchList).forEach(function (idx) {
              var cacheMember = that.cacheData["member"][that.batchList[idx]["accountMember"]];
              var cacheBuyMember = that.cacheData["member"][that.batchList[idx]["buyMember"]];
              var cacheOrderMember = that.cacheData["member"][that.batchList[idx]["orderAccountMember"]];
              that.$set(that.batchList[idx], "accountMemberName", cacheMember.corpNameFull || "");
              that.$set(that.batchList[idx], "buyMemberName", cacheBuyMember.corpNameFull || "");
              that.$set(that.batchList[idx], "orderAccountMemberName", cacheOrderMember.corpNameFull || "");
            })
          }
        });
      } else {
        Object.keys(this.batchList).forEach(function (idx) {
          var cacheMember = that.cacheData["member"][that.batchList[idx]["accountMember"]];
          var cacheBuyMember = that.cacheData["member"][that.batchList[idx]["buyMember"]];
          var cacheOrderMember = that.cacheData["member"][that.batchList[idx]["orderAccountMember"]];
          that.$set(that.batchList[idx], "accountMemberName", cacheMember.corpNameFull || "");
          that.$set(that.batchList[idx], "buyMemberName", cacheBuyMember.corpNameFull || "");
          that.$set(that.batchList[idx], "orderAccountMemberName", cacheOrderMember.corpNameFull || "");
        })
      }

      if (userIdList.length > 0) {
        listUser(this.jsonToURL({userIdList: userIdList})).then(response => {
          if (response.rows != null && response.rows.length > 0) {
            Object.keys(response.rows).forEach(function (idx) {
              that.cacheData["user"][response.rows[idx]["userID"]] = response.rows[idx];
            })

            Object.keys(this.batchList).forEach(function (idx) {
              var cacheBuyUser = that.cacheData["user"][that.batchList[idx]["buyUser"]];
              var cacheUser = that.cacheData["user"][that.batchList[idx]["sellUser"]];
              if (cacheBuyUser) {
                that.$set(that.batchList[idx], "buyUserName", cacheBuyUser.name || "");
              }
              if (cacheUser) {
                that.$set(that.batchList[idx], "sellUserName", cacheUser.name || "");
              }
            })
          }
        });
      } else {
        Object.keys(this.batchList).forEach(function (idx) {
          var cacheBuyUser = that.cacheData["user"][that.batchList[idx]["buyUser"]];
          var cacheUser = that.cacheData["user"][that.batchList[idx]["sellUser"]];
          if (cacheBuyUser) {
            that.$set(that.batchList[idx], "buyUserName", cacheBuyUser.name || "");
          }
          if (cacheUser) {
            that.$set(that.batchList[idx], "sellUserName", cacheUser.name || "");
          }
        })
      }
    }
  }
};
</script>
