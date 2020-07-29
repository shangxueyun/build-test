<template>
  <div class="app-container" id="sales_order">
    <el-form ref="queryForm" :model="queryParams" :rules="rules" size="small" label-width="140px">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="账套" prop="accountMember">
            <el-select v-model="queryParams.accountMember" placeholder="请选择账套" multiple filterable clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in accountMemberOption" :key="index" :label="item.corpNameFull"
                         :value="item.memberID" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单日期" prop="orderDate">
            <el-date-picker type="daterange" v-model="queryParams.orderDate" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd" :style="{width: '100%'}" start-placeholder="开始日期"
                            end-placeholder="结束日期" range-separator="至" clearable></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="余款最后支付日期" prop="lastPaymentDate">
            <el-date-picker type="daterange" v-model="queryParams.lastPaymentDate" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd" :style="{width: '100%'}" start-placeholder="开始日期"
                            end-placeholder="结束日期" range-separator="至" clearable></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="销货单位" prop="sellMemberName">
            <el-input placeholder="请输入销货单位" v-model="queryParams.sellMemberName" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>

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
          <el-form-item label="采购单号" prop="purchaseID">
            <el-input v-model="queryParams.purchaseID" placeholder="请输入销售单号" clearable :style="{width: '100%'}">
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
          <el-form-item label="采购员" prop="purchaser">
            <el-select v-model="queryParams.purchaser" placeholder="请选择采购员" multiple filterable clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in purchaserOptions" :key="index" :label="item.name"
                         :value="item.userID" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="销售收款" prop="receiptStatus">
            <el-select v-model="queryParams.receiptStatus" placeholder="请选择销售收款" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in receiptStatusOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="销售发货" prop="deliveryStatus">
            <el-select v-model="queryParams.deliveryStatus" placeholder="请选择销售发货" clearable
              :style="{width: '100%'}">
              <el-option v-for="(item, index) in deliveryStatusOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="销售开票" prop="invoiceStatus">
            <el-select v-model="queryParams.invoiceStatus" placeholder="请选择销售开票" clearable
              :style="{width: '100%'}">
              <el-option v-for="(item, index) in invoiceStatusOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="采购货转" prop="purchaseDeliveryStatus">
            <el-select v-model="queryParams.purchaseDeliveryStatus" placeholder="请选择采购货转" clearable
                       :style="{width: '100%'}">
              <el-option v-for="(item, index) in purchaseDeliveryStatusOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="采购发票" prop="purchaseInvoiceStatus">
            <el-select v-model="queryParams.purchaseInvoiceStatus" placeholder="请选择采购发票" clearable
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

    <el-table v-loading="loading" :data="orderList" border @select-all="selectAll" @select="handleSelectionChangeber" ref="purchaseList" @selection-change="handleSelectionChangeatf"  @expand-change="dataExpand" size="mini">
      <el-table-column type="selection" header-align="center" align="center" />

      <el-table-column type="expand" prop="children" class-name="children_padding" width="50">
        <template slot-scope="scope">
          <el-table :data="scope.row.children" size="mini" :header-cell-class-name="cellClass">
            <el-table-column label="批次号" align="center" header-align="center" prop="batchID" />
            <el-table-column label="销售重量" align="center" header-align="center" prop="orderAmount" />
            <el-table-column label="销售单价" align="center" header-align="center" prop="orderPrice" />
            <el-table-column label="销售金额" align="center" header-align="center" prop="orderMoney" />
            <el-table-column label="销售定金" align="center" header-align="center" prop="orderDepositRates" :formatter="depositRatesFormat" />
            <el-table-column label="结算金额" align="center" header-align="center" prop="orderSettleMoney"/>
            <el-table-column label="已收款" align="center" header-align="center" prop="orderPayConfirmed"/>
            <el-table-column label="应收款" align="center" header-align="center" :formatter="orderReceiveMoneyFormat" />
            <el-table-column label="销售货转" align="center" header-align="center" :formatter="orderDeliveryStatusFormat"/>
            <el-table-column label="收货确认" align="center" header-align="center" prop=""/>
            <el-table-column label="销售发票" align="center" header-align="center" prop="orderInvoiceMoney" />
            <el-table-column label="采购员" align="center" header-align="center" prop="buyUserName" />
            <el-table-column label="采购日期" align="center" header-align="center" prop="purchaseDate" :formatter="purchaseDateFormat"/>
            <el-table-column label="采购重量" align="center" header-align="center" prop="amount" />
            <el-table-column label="采购货转" align="center" header-align="center" prop="purchaseDeliveryStatusFormat"/>
            <el-table-column label="采购发票" align="center" header-align="center" prop="invoiceMoney"/>
          </el-table>
        </template>

<!--        <template slot-scope="scope">-->
<!--          <el-button size="mini" type="text" icon="el-icon-edit">费用</el-button>-->
<!--          <el-button size="mini" type="text" icon="el-icon-edit">预收款转入</el-button>-->
<!--          <el-button size="mini" type="text" icon="el-icon-edit">合同款转出</el-button>-->
<!--          <el-button size="mini" type="text" icon="el-icon-edit">销售发货</el-button>-->
<!--          <el-button size="mini" type="text" icon="el-icon-edit">申请开票</el-button>-->
<!--          <el-button size="mini" type="text" icon="el-icon-edit">修改订单</el-button>-->
<!--          <el-button size="mini" type="text" icon="el-icon-edit">取消订单</el-button>-->
<!--        </template>-->
      </el-table-column>

      <el-table-column label="订单日期" align="center" prop="orderDate" width="135" :formatter="orderDateFormat" v-if="showDivColumns.show_orderDate.isShow"/>
      <el-table-column label="确认日期" align="center" prop="confirmTime" width="135" :formatter="confirmTimeFormat" v-if="showDivColumns.show_confirmTime.isShow"/>
      <el-table-column label="销售单号" align="center" prop="orderID" width="120"  v-if="showDivColumns.show_orderID.isShow"/>
      <el-table-column label="销货单位" align="center" prop="sellMemberName" width="170" :show-overflow-tooltip="true" v-if="showDivColumns.show_sellMemberName.isShow"/>
      <el-table-column label="品类" align="center" width="60" prop="orderKind" :formatter="orderKindFormat" v-if="showDivColumns.show_orderKind.isShow"/>
      <el-table-column label="融资" align="center" width="50" prop="needLoan"  :formatter="needLoanFormat" v-if="showDivColumns.show_needLoan.isShow"/>
      <el-table-column label="销售重量" align="center" width="80" prop="amount" :show-overflow-tooltip="true" v-if="showDivColumns.show_amount.isShow"/>
      <el-table-column label="订单金额" align="center" width="100" prop="money"  v-if="showDivColumns.show_money.isShow"/>
      <el-table-column label="已收款" align="center" width="100" prop="payConfirmed" v-if="showDivColumns.show_payConfirmed.isShow"/>
      <el-table-column label="应收款" align="center" width="100" :formatter="receiveMoneyFormat"  v-if="showDivColumns.show_receiveMoney.isShow"/>
      <el-table-column label="余款最后支付日期" align="center" width="130" prop="lastPaymentDate"  v-if="showDivColumns.show_lastPaymentDate.isShow"/>
      <el-table-column label="发货日期" align="center" width="90" prop="lastDeliveryDate"  v-if="showDivColumns.show_lastDeliveryDate.isShow"/>
      <el-table-column label="已发货" align="center" width="80" prop="deliveryAmount"  v-if="showDivColumns.show_deliveryAmount.isShow"/>
      <el-table-column label="已发货金额" align="center" width="100" prop="deliveryMoney" v-if="showDivColumns.show_deliveryMoney.isShow"/>
      <el-table-column label="开票重量" align="center" width="100" prop="invoiceAmount"  v-if="showDivColumns.show_invoiceAmount.isShow"/>
      <el-table-column label="开票金额" align="center" width="100" prop="invoiceMoney"  v-if="showDivColumns.show_invoiceMoney.isShow"/>
      <el-table-column label="销售账套" align="center" width="200" prop="accountMemberName" :show-overflow-tooltip="true" v-if="showDivColumns.show_accountMemberName.isShow"/>
      <el-table-column label="业务员" align="center" prop="sellUserName" width="100"  v-if="showDivColumns.show_sellUserName.isShow"/>
      <el-table-column label="操作" class-name="fixedStyle" align="center" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button size="mini" style="cursor: pointer;" type="primary" @click="migoFunc(scope.row)" icon="el-icon-plus">销售发货</el-button>
        </template>
      </el-table-column>
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

    <!-- 销售发货弹框 -->
    <div id="sales_order_Popout" v-if="migoFuncdisplay">
      <sales-order-popout ref="purchaseOrderPopoutDom" :keyId="keyId" :titleText="sales_order_PopoutTitle" @SalesOrderPopoutObjFunc="SalesOrderPopoutObjFunc"></sales-order-popout>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { listOrder, getOrder, delOrder, addOrder, updateOrder, exportOrder } from "@/api/trd/order";
import { listMemberByAccountRel, listMember } from "@/api/bas/member";
import { listUser, getUser } from "@/api/bas/user";
import { listBatch } from "@/api/trd/batch";
import { listColumn, updateColumn } from "@/api/system/column";
import SalesOrderPopout from "./SalesOrderPopout/index";

export default {
  name: "Order",
  components: {
    SalesOrderPopout
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
      // 订单表格数据
      orderList: [],
      showDivColumns: {
        show_orderDate: { isShow: true },
        show_confirmTime: { isShow: true },
        show_orderID: { isShow: true },
        show_sellMemberName: { isShow: true },
        show_orderKind: { isShow: true },
        show_needLoan: { isShow: true },
        show_amount: { isShow: true },
        show_money: { isShow: true },
        show_payConfirmed: { isShow: true },
        show_receiveMoney: { isShow: true },
        show_lastPaymentDate: { isShow: true },
        show_lastDeliveryDate: { isShow: true },
        show_deliveryAmount: { isShow: true },
        show_deliveryMoney: { isShow: true },
        show_invoiceAmount: { isShow: true },
        show_invoiceMoney: { isShow: true },
        show_accountMemberName: { isShow: true },
        show_sellUserName: { isShow: true }
      },
      cacheData: {
        member: {},
        user: {}
      },
      purchaserOptions: [],
      accountMemberOption: [],
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
      purchaseDeliveryStatusOptions: [{
        "label": "未货转",
        "value": 1
      }, {
        "label": "部分货转",
        "value": 2
      }, {
        "label": "已货转",
        "value": 3
      }],
      deliveryStatusOptions: [{
        "label": "未发货",
        "value": 1
      }, {
        "label": "部分发货",
        "value": 2
      }, {
        "label": "已发货",
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
        bundleNo: undefined,
        lastAccess: undefined,
        confirmTime: undefined,
        confirmer: undefined,
        makeTime: undefined,
        maker: undefined,
        revokeTime: undefined,
        revoker: undefined,
        status: undefined,
        receiptStatus: undefined,
        deliveryStatus: undefined,
        invoiceStatus: undefined,
        purchaseDeliveryStatus: undefined,
        purchaseInvoiceStatus: undefined,
        payStatus: undefined,
        advanceFee: undefined,
        amount: undefined,
        buyMember: undefined,
        buyUser: undefined,
        buyMemberName: undefined,
        buyDept: undefined,
        contractConfirmUser: undefined,
        contractUploadTime: undefined,
        contractUploader: undefined,
        costFee: undefined,
        subsidyType: undefined,
        subsidyVal: undefined,
        deliveryAmount: undefined,
        deliveryMoney: undefined,
        deliveryConfirmed: undefined,
        returnAmount: undefined,
        returnMoney: undefined,
        deliveryMode: undefined,
        deposit: undefined,
        penaltyRates: undefined,
        taxRate: undefined,
        invoiceAmount: undefined,
        invoiceConfirmed: undefined,
        invoiceMoney: undefined,
        payFeeMoney: undefined,
        invoiceFeeMoney: undefined,
        lastDepositDate: undefined,
        lastPaymentDate: undefined,
        lastDeliveryDate: undefined,
        settlement: undefined,
        loanMoney: undefined,
        loanCost: undefined,
        money: undefined,
        outDepotPayer: undefined,
        needLoan: undefined,
        orderDate: undefined,
        orderTime: undefined,
        paidMoney: undefined,
        payConfirmed: undefined,
        pictureContract: undefined,
        pictureDeliveryConfirmed: undefined,
        price: undefined,
        sellMember: undefined,
        sellUser: undefined,
        sellMemberName: undefined,
        sellDept: undefined,
        specialTerm: undefined,
        orderType: undefined,
        orderKind: undefined,
        templateID: undefined,
        notes: undefined,
        refuseReason: undefined,
        loanID: undefined,
        expiryDate: undefined,
        purchaseID: undefined,
        accountMember: undefined,
        latestDeliveryDate: undefined,
        depositRates: undefined,
        paymentTime: undefined,
        deliveryTime: undefined,
        bindingOrderID: undefined,
        orderSort: undefined,
        performance: undefined,
        commission: undefined,
        unloadAdress: undefined,
        shipped: undefined,
        perProcess: undefined,
        comProcess: undefined,
        personalReward: undefined,
        areaReward: undefined,
        resource: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      migoFuncdisplay: false,
      sales_order_PopoutTitle: '',
      keyId: ''
    };
  },
  created() {
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

      // 拆解查询条件
      this.addDateRangeAndAlias(this.queryParams, this.queryParams.orderDate, "orderDate");
      this.addDateRangeAndAlias(this.queryParams, this.queryParams.lastPaymentDate, "lastPaymentDate");

      let param = this.cloneJSON(this.queryParams);
      console.log(param)

      param["batchIdList"] = this.splitTextarea(param["batchID"]);
      param["accountMemberList"] = param["accountMember"] || "";
      param["purchaserList"] = param["purchaser"] || "";
      param["sellUserList"] = param["sellUser"] || "";
      param["orderDate"] = "";
      param["lastPaymentDate"] = "";
      param["accountMember"] = "";
      param["buyUser"] = "";
      param["sellUser"] = "";
      param["batchID"] = "";

      listOrder(this.jsonToURL(param)).then(response => {
        this.total = response.total;
        Object.keys(response.rows).forEach(function (idx) {
          response.rows[idx]["children"] = [];
        });
        this.orderList = [];
        this.orderList = response.rows;
        this.setUserMemberName();
        this.loading = false;
      });
    },
    /** 查询表格自定义列 */
    listCustomColumns() {
      this.loading = true;
      let that = this;
      listColumn({ code: "erp_order_list" }).then(response => {
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
        orderID: undefined,
        bundleNo: undefined,
        lastAccess: undefined,
        confirmTime: undefined,
        confirmer: undefined,
        makeTime: undefined,
        maker: undefined,
        revokeTime: undefined,
        revoker: undefined,
        status: "0",
        advanceFee: undefined,
        amount: undefined,
        buyMember: undefined,
        buyUser: undefined,
        buyMemberName: undefined,
        buyDept: undefined,
        contractConfirmUser: undefined,
        contractUploadTime: undefined,
        contractUploader: undefined,
        costFee: undefined,
        subsidyType: undefined,
        subsidyVal: undefined,
        deliveryAmount: undefined,
        deliveryMoney: undefined,
        deliveryConfirmed: undefined,
        returnAmount: undefined,
        returnMoney: undefined,
        deliveryMode: undefined,
        deposit: undefined,
        penaltyRates: undefined,
        taxRate: undefined,
        invoiceAmount: undefined,
        invoiceConfirmed: undefined,
        invoiceMoney: undefined,
        payFeeMoney: undefined,
        invoiceFeeMoney: undefined,
        lastDepositDate: undefined,
        lastPaymentDate: undefined,
        lastDeliveryDate: undefined,
        settlement: undefined,
        loanMoney: undefined,
        loanCost: undefined,
        money: undefined,
        outDepotPayer: undefined,
        needLoan: undefined,
        orderDate: undefined,
        orderTime: undefined,
        paidMoney: undefined,
        payConfirmed: undefined,
        pictureContract: undefined,
        pictureDeliveryConfirmed: undefined,
        price: undefined,
        sellMember: undefined,
        sellUser: undefined,
        sellMemberName: undefined,
        sellDept: undefined,
        specialTerm: undefined,
        orderType: undefined,
        orderKind: undefined,
        templateID: undefined,
        notes: undefined,
        refuseReason: undefined,
        loanID: undefined,
        expiryDate: undefined,
        purchaseID: undefined,
        accountMember: undefined,
        latestDeliveryDate: undefined,
        depositRates: undefined,
        paymentTime: undefined,
        deliveryTime: undefined,
        bindingOrderID: undefined,
        orderSort: undefined,
        performance: undefined,
        commission: undefined,
        unloadAdress: undefined,
        shipped: undefined,
        perProcess: undefined,
        comProcess: undefined,
        personalReward: undefined,
        areaReward: undefined,
        resource: undefined
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
    selectAll(){
      this.$refs.purchaseList.clearSelection()
    },
    // 多选框选中数据
    handleSelectionChangeatf(selection) {
      if (selection.length > 2)
        this.$refs.purchaseList.clearSelection()
        else {
          if (selection.length > 0) {
            this.ids = selection.map(item => item.orderID)
            this.single = selection.length!=1
            this.multiple = !selection.length
          }
          this.$refs.purchaseList.toggleRowSelection(this.handleSelectionAction, true)
        }
    },
    handleSelectionChangeber(o, row) {
      this.handleSelectionAction = row
      this.$refs.purchaseList.clearSelection()
    },
    /** 修改表格自定义列显示/隐藏 */
    changeColumnShow(data) {
      this.loading = true;
      let that = this;
      updateColumn({ tableCode: "erp_order_list", name: data["name"], code: data["code"], isShow: data["isShow"] ? 1 : 0 }).then(response => {
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
      return this.parseTime(row.confirmTime);
    },
    orderKindFormat(row, column) {
      var result = "";
      if (row.orderKind == 1) {
        result = "非公检";
      } else {
        result = "公检棉";
      }

      if (row.purchaseID != null && row.purchaseID != "") {
        result += "(采)";
      }

      return result;
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

      if (row.needLoan == 1) {
        return "是";
      }
      if (row.needLoan == 0) {
        return "否";
      }

      return "-";
    },
    orderReceiveMoneyFormat(row, column) {
      if (row.orderNeedLoan == 0) {
        return this.arithmeticSubtract(row.orderMoney, row.orderPayConfirmed);
      } else if (row.orderNeedLoan == 1) {
        return this.arithmeticSubtract(this.arithmeticAdd(row.orderMoney, row.orderLoanCost), row.orderPayConfirmed);
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
    receiveMoneyFormat(row, column) {
      if (row.needLoan == 0) {
        return row.money - row.payConfirmed;
      } else if (row.needLoan == 1) {
        return row.money + row.loanCost - row.payConfirmed;
      }
    },
    depositRatesFormat(row, column) {
      if (row.orderNeedLoan == 0) {
        return this.arithmeticMultiply(row.orderMoney, row.orderDepositRates);
      } else if (row.orderNeedLoan == 1) {
        return this.arithmeticMultiply(this.arithmeticAdd(row.orderMoney, row.orderLoanCost), row.orderDepositRates);
      }
      return 0;
    },
    purchaseDateFormat(row, column) {
      return (row.purchaseDate || "") + " " + (row.purchaseTime || "");
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
    setUserMemberName() {
      var that = this;
      var userIdList = [];
      var memberIdList = [];
      Object.keys(this.orderList).forEach(function (idx) {
        if (!!that.orderList[idx]["accountMember"] && !that.cacheData["member"][that.orderList[idx]["accountMember"]] && memberIdList.indexOf(that.orderList[idx]["accountMember"]) == -1) {
          memberIdList.push(that.orderList[idx]["accountMember"]);
        }
        if (!!that.orderList[idx]["sellUser"] && !that.cacheData["user"][that.orderList[idx]["sellUser"]] && userIdList.indexOf(that.orderList[idx]["sellUser"]) == -1) {
          userIdList.push(that.orderList[idx]["sellUser"]);
        }
      });

      if (memberIdList.length > 0) {
        listMember(this.jsonToURL({memberIdList: memberIdList})).then(response => {
          if (response.rows != null && response.rows.length > 0) {
            Object.keys(response.rows).forEach(function (idx) {
              that.cacheData["member"][response.rows[idx]["memberID"]] = response.rows[idx];
            })

            Object.keys(this.orderList).forEach(function (idx) {
              var cacheMember = that.cacheData["member"][that.orderList[idx]["accountMember"]];
              if (cacheMember) that.$set(that.orderList[idx], "accountMemberName", cacheMember.corpNameFull || "");
            })
          }
        });
      } else {
        Object.keys(this.orderList).forEach(function (idx) {
          var cacheMember = that.cacheData["member"][that.orderList[idx]["accountMember"]];
          if (cacheMember) that.$set(that.orderList[idx], "accountMemberName", cacheMember.corpNameFull || "");
        })
      }

      if (userIdList.length > 0) {
        listUser(this.jsonToURL({userIdList: userIdList})).then(response => {
          if (response.rows != null && response.rows.length > 0) {
            Object.keys(response.rows).forEach(function (idx) {
              that.cacheData["user"][response.rows[idx]["userID"]] = response.rows[idx];
            })

            Object.keys(this.orderList).forEach(function (idx) {
              var cacheUser = that.cacheData["user"][that.orderList[idx]["sellUser"]];
              if (cacheUser) that.$set(that.orderList[idx], "sellUserName", cacheUser.name || "");
            })
          }
        });
      } else {
        Object.keys(this.orderList).forEach(function (idx) {
          var cacheUser = that.cacheData["user"][that.orderList[idx]["sellUser"]];
          if (cacheUser) that.$set(that.orderList[idx], "sellUserName", cacheUser.name || "");
        })
      }
    },
    cellClass(row) {
      if (row.columnIndex == 0) {
        return 'DisabledSelection';
      }
    },
    dataExpand(row, expandedRows) {
      if (row["loaded"]) {
        return;
      }
      if (row.children.length != 0) {
        return;
      }
      row["loaded"] = true;
      let that = this;

      listBatch(this.jsonToURL({pageNum: 1, pageSize: 100, orderID: row["orderID"]})).then(response => {
        Object.keys(response.rows).forEach(function (idx) {
          row.children.push(response.rows[idx] || []);
        })

        that.setBatchUserMemberName(row.children);
      });

      console.log(row);
      // this.$refs.subTableData.toggleRowExpansion(row);
    },
    setBatchUserMemberName(batchList) {
      var userIdList = [];
      var that = this;
      Object.keys(batchList).forEach(function (idx) {
        if (!!batchList[idx]["buyUser"] && !that.cacheData["user"][batchList[idx]["buyUser"]] && userIdList.indexOf(batchList[idx]["buyUser"]) == -1) {
          userIdList.push(batchList[idx]["buyUser"]);
        }
      });

      if (userIdList.length > 0) {
        listUser(this.jsonToURL({userIdList: userIdList})).then(response => {
          if (response.rows != null && response.rows.length > 0) {
            Object.keys(response.rows).forEach(function (idx) {
              that.cacheData["user"][response.rows[idx]["userID"]] = response.rows[idx];
            })

            Object.keys(batchList).forEach(function (idx) {
              var cacheBuyUser = that.cacheData["user"][batchList[idx]["buyUser"]];
              if (cacheBuyUser) {
                that.$set(batchList[idx], "buyUserName", cacheBuyUser.name || "");
              }
            })
          }
        });
      } else {
        Object.keys(batchList).forEach(function (idx) {
          var cacheBuyUser = that.cacheData["user"][batchList[idx]["buyUser"]];
          if (cacheBuyUser) {
            that.$set(batchList[idx], "buyUserName", cacheBuyUser.name || "");
          }
        })
      }
    },
    migoFunc (row) {
      this.migoFuncdisplay = true
      this.keyId = row.orderID
      this.sales_order_PopoutTitle = '销售发货'
      let obj = row
      this.$nextTick((e)=>{
        this.$refs.purchaseOrderPopoutDom.DataGetList(obj.orderID, obj.buyMemberName);
      })
    },
    SalesOrderPopoutObjFunc (row) {
      this.migoFuncdisplay = false
      if (row == 'true') 
      this.getList()
    },
    migoFuncDisabled (row) {

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
  #sales_order .el-table__expanded-cell[class*=cell] {
    padding: 0px 0px;
  }
  // #sales_order .pagination-container .el-pagination {
  //   width: 100%;
  //   text-align: center;
  // }
  // #sales_order .el-button--mini {
  //     padding: 6px 6px;
  // }
  #sales_order .fixedStyle{
    background: #F8F8F9;
    div{
      padding-bottom: 5px;
    }
  }
</style>