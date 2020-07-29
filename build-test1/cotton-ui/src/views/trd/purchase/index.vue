<template>
  <div class="app-container" id="purchase_procurement">
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
          <el-form-item label="采购日期" prop="purchaseDate">
            <el-date-picker type="daterange" v-model="queryParams.purchaseDate" format="yyyy-MM-dd"
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
          <el-form-item label="供应商" prop="sellMemberName">
            <el-input v-model="queryParams.sellMemberName" placeholder="请输入供应商" clearable :style="{width: '100%'}">
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
          <el-form-item label="采购单号" prop="purchaseID">
            <el-input v-model="queryParams.purchaseID" placeholder="请输入采购单号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="销售单号" prop="orderID">
            <el-input v-model="queryParams.orderID" placeholder="请输入销售单号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="销货单位" prop="orderBuyMemberName">
            <el-input placeholder="请输入销货单位" v-model="queryParams.orderBuyMemberName" clearable :style="{width: '100%'}">
            </el-input>
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
          <el-form-item label="业务员" prop="salesman">
            <el-select v-model="queryParams.salesman" placeholder="请选择业务员" multiple filterable clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in purchaserOptions" :key="index" :label="item.name"
                         :value="item.userID" :disabled="item.disabled"></el-option>
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
          <el-form-item label="采购货转" prop="deliveryStatus">
            <el-select v-model="queryParams.deliveryStatus" placeholder="请选择采购货转" clearable
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

<!--        <el-col :span="6">-->
<!--          <el-form-item label="业务员" prop="">-->
<!--            <el-select v-model="null" placeholder="请选择业务员"  :disabled='true' clearable :style="{width: '100%'}">-->
<!--              <el-option v-for="(item, index) in null" :key="index" :label="item.label"-->
<!--                         :value="item.value" :disabled="item.disabled"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <el-form-item label="采购付款" prop="">-->
<!--            <el-select v-model="null" placeholder="请选择采购付款" :disabled='true' clearable :style="{width: '100%'}">-->
<!--              <el-option v-for="(item, index) in null" :key="index" :label="item.label"-->
<!--                         :value="item.value" :disabled="item.disabled"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <el-form-item label="采购货转" prop="field125">-->
<!--            <el-select v-model="null" placeholder="请选择采购货转"  :disabled='true' clearable :style="{width: '100%'}">-->
<!--              <el-option v-for="(item, index) in null" :key="index" :label="item.label"-->
<!--                         :value="item.value" :disabled="item.disabled"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <el-form-item label="采购发票" prop="field127">-->
<!--            <el-input v-model="null" placeholder="请输入采购发票"  :disabled='true' clearable :style="{width: '100%'}">-->
<!--            </el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
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
<!--          v-hasPermi="['system:purchase:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['system:purchase:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['system:purchase:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['system:purchase:export']"-->
<!--        >导出</el-button>-->
<!--      </el-col>-->


      <el-popover placement="bottom" width="300" trigger="click">
        <el-col :span="12" v-for="(data,key) in showDivColumns" :key="key">
          <el-checkbox v-model="data.isShow" v-bind:disabled="data.disabled" :key="data.code" @change="changeColumnShow(data)">{{ data.name }}</el-checkbox>
        </el-col>
        <el-button slot="reference" size="mini" type="primary" icon="el-icon-setting" class="setting">列配置</el-button>
      </el-popover>
    </el-row>

    <el-table v-loading="loading" :data="purchaseList" border @select-all="selectAll" @select="handleSelectionChangeber" ref="purchaseList" @selection-change="handleSelectionChangeatf" size="mini" @expand-change="dataExpand">
      <el-table-column type="selection" header-align="center" align="center" />

      <el-table-column type="expand" prop="children" width="50">
        <template slot-scope="scope">
          <el-table :data="scope.row.children" :header-cell-class-name="cellClass" ref="childrenTable" size="mini">

            <el-table-column label="批次号" align="center" header-align="center" prop="batchID" />
            <el-table-column label="品类" align="center" header-align="center" prop="purchaseKind" :formatter="purchaseKindFormat"/>
            <el-table-column label="采购重量" align="center" header-align="center" prop="amount" />
            <el-table-column label="采购单价" align="center" header-align="center" prop="price" />
            <el-table-column label="采购金额" align="center" header-align="center" prop="money" />
            <el-table-column label="融资" align="center" header-align="center" prop="needLoan" :formatter="needLoanFormat"/>
            <el-table-column label="已支付" align="center" header-align="center" prop="paidMoney" />
            <el-table-column label="余款" align="center" header-align="center" :formatter="spareMoneyFormat"/>
            <el-table-column label="余款支付日" align="center" header-align="center" prop="lastPaymentDate" />
            <el-table-column label="采购货转" align="center" header-align="center" :formatter="purchaseDeliveryStatusFormat"/>
            <el-table-column label="采购发票" align="center" header-align="center" prop="invoiceMoney"/>

            <el-table-column label="销售单号" align="center" header-align="center" prop="orderID" />
            <el-table-column label="销货单位" align="center" header-align="center" prop="buyMemberName"/>
            <el-table-column label="销售账套" align="center" header-align="center" prop="orderAccountMemberName"/>
            <el-table-column label="业务员" align="center" header-align="center" prop="sellUserName" />
            <el-table-column label="销售重量" align="center" header-align="center" prop="orderAmount" />
            <el-table-column label="销售单价" align="center" header-align="center" prop="orderPrice" />
            <el-table-column label="销售金额" align="center" header-align="center" prop="orderMoney" />
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

      <el-table-column label="公司账套" align="center" min-width="120" prop="accountMemberName" :show-overflow-tooltip="true" v-if="showDivColumns.show_accountMemberName.isShow"/>
      <el-table-column label="采购单号" align="center" header-align="center" prop="purchaseID"  v-if="showDivColumns.show_purchaseID.isShow"/>
      <el-table-column label="外部单号" align="center" header-align="center" prop="billCode" :show-overflow-tooltip="true" v-if="showDivColumns.show_billCode.isShow"/>
      <el-table-column label="品类" align="center" header-align="center" prop="purchaseKind" :formatter="purchaseKindFormat"  v-if="showDivColumns.show_purchaseKind.isShow"/>
      <el-table-column label="供应商" align="center" header-align="center" prop="sellMemberName" :show-overflow-tooltip="true" v-if="showDivColumns.show_sellMemberName.isShow"/>
      <el-table-column label="采购员" align="center" header-align="center" prop="buyUserName"  :show-overflow-tooltip="true" v-if="showDivColumns.show_buyUserName.isShow"/>
      <el-table-column label="采购日期" align="center" header-align="center" prop="purchaseDate" :formatter="purchaseDateFormat" v-if="showDivColumns.show_purchaseDate.isShow"/>
      <el-table-column label="采购重量" align="center" header-align="center" prop="amount"  v-if="showDivColumns.show_amount.isShow"/>
      <el-table-column label="采购单价" align="center" header-align="center" prop="price"  v-if="showDivColumns.show_price.isShow"/>
      <el-table-column label="采购金额" align="center" header-align="center" prop="money"  v-if="showDivColumns.show_money.isShow"/>
      <el-table-column label="融资" align="center" header-align="center" prop="needLoan" :formatter="needLoanFormat" v-if="showDivColumns.show_needLoan.isShow"/>
      <el-table-column label="已支付" align="center" header-align="center" prop="paidMoney"  v-if="showDivColumns.show_paidMoney.isShow"/>
      <el-table-column label="余款" align="center" header-align="center" :formatter="spareMoneyFormat" v-if="showDivColumns.show_spareMoney.isShow"/>
      <el-table-column label="余款最后支付日" align="center" header-align="center" prop="lastPaymentDate"  v-if="showDivColumns.show_lastPaymentDate.isShow"/>
      <el-table-column label="收货数量" align="center" header-align="center" prop="deliveryAmount" :show-overflow-tooltip="true"  v-if="showDivColumns.show_deliveryAmount.isShow"/>
      <el-table-column label="收票金额" align="center" header-align="center" prop="invoiceMoney"  v-if="showDivColumns.show_invoiceMoney.isShow"/>
      <el-table-column label="操作" class-name="fixedStyle" align="center" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button size="mini" style="cursor: pointer;" v-if="scope.row.amount - scope.row.deliveryAmount" type="primary" @click="migoFunc(scope.row)" icon="el-icon-plus">采购收货</el-button>
        </template>
      </el-table-column>

<!--      <el-table-column label="${comment}" align="center" prop="templateID" />-->
<!--      <el-table-column label="${comment}" align="center" prop="orderID" />-->
<!--      <el-table-column label="${comment}" align="center" prop="bundleNo" />-->

<!--      <el-table-column label="${comment}" align="center" prop="sellMember" />-->
<!--      <el-table-column label="${comment}" align="center" prop="sellUser" />-->

<!--      <el-table-column label="${comment}" align="center" prop="sellDept" />-->
<!--      <el-table-column label="${comment}" align="center" prop="buyMember" />-->

<!--      <el-table-column label="${comment}" align="center" prop="buyMemberName" />-->
<!--      <el-table-column label="${comment}" align="center" prop="buyDept" />-->

<!--      <el-table-column label="${comment}" align="center" prop="deliveryMode" />-->
<!--      <el-table-column label="${comment}" align="center" prop="outDepotPayer" />-->
<!--      <el-table-column label="${comment}" align="center" prop="advanceFee" />-->
<!--      <el-table-column label="${comment}" align="center" prop="costFee" />-->
<!--      <el-table-column label="${comment}" align="center" prop="deposit" />-->
<!--      <el-table-column label="${comment}" align="center" prop="penaltyRates" />-->
<!--      <el-table-column label="${comment}" align="center" prop="taxRate" />-->
<!--      <el-table-column label="${comment}" align="center" prop="lastDepositDate" />-->

<!--      <el-table-column label="${comment}" align="center" prop="lastDeliveryDate" />-->
<!--      <el-table-column label="${comment}" align="center" prop="settlement" />-->
<!--      <el-table-column label="${comment}" align="center" prop="specialTerm" />-->

<!--      <el-table-column label="${comment}" align="center" prop="price" />-->
<!--      <el-table-column label="${comment}" align="center" prop="money" />-->
<!--      <el-table-column label="${comment}" align="center" prop="pictureContract" />-->
<!--      <el-table-column label="${comment}" align="center" prop="contractUploadTime" />-->
<!--      <el-table-column label="${comment}" align="center" prop="contractUploader" />-->


<!--      <el-table-column label="${comment}" align="center" prop="invoiceAmount" />-->

<!--      <el-table-column label="${comment}" align="center" prop="deliveryMoney" />-->
<!--      <el-table-column label="${comment}" align="center" prop="returnAmount" />-->
<!--      <el-table-column label="${comment}" align="center" prop="returnMoney" />-->
<!--      <el-table-column label="融资" align="center" prop="loanType" :formatter="loanTypeFormat"/>-->
<!--      <el-table-column label="${comment}" align="center" prop="loanID" />-->
<!--      <el-table-column label="${comment}" align="center" prop="loanMoney" />-->
<!--      <el-table-column label="${comment}" align="center" prop="loanCost" />-->
<!--      <el-table-column label="${comment}" align="center" prop="expiryDate" />-->
<!--      <el-table-column label="${comment}" align="center" prop="lastAccess" />-->
<!--      <el-table-column label="${comment}" align="center" prop="maker" />-->
<!--      <el-table-column label="${comment}" align="center" prop="makeTime" />-->
<!--      <el-table-column label="${comment}" align="center" prop="confirmer" />-->
<!--      <el-table-column label="${comment}" align="center" prop="confirmTime" />-->
<!--      <el-table-column label="${comment}" align="center" prop="revoker" />-->
<!--      <el-table-column label="${comment}" align="center" prop="revokeTime" />-->
<!--      <el-table-column label="${comment}" align="center" prop="status" />-->
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['system:purchase:edit']"-->
<!--          >修改</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['system:purchase:remove']"-->
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


    <!-- 采购收货弹框 -->
    <div id="purchase_procurement_Popout" v-if="migoFuncdisplay">
      <purchase-order-popout ref="purchaseOrderPopoutDom" :keyId="keyId" :titleText="purchase_procurement_PopoutTitle" @purchaseOrderPopoutObjFunc="purchaseOrderPopoutObjFunc"></purchase-order-popout>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { listPurchase, getPurchase, delPurchase, addPurchase, updatePurchase, exportPurchase } from "@/api/trd/purchase";
import { listMemberByAccountRel, listMember } from "@/api/bas/member";
import { listUser, getUser } from "@/api/bas/user";
import { listBatch } from "@/api/trd/batch";
import { listColumn, updateColumn } from "@/api/system/column";
import PurchaseOrderPopout from "./PurchaseOrderPopout/index";

export default {
  name: "Purchase",
  components: {
    PurchaseOrderPopout
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
      // 采购单表格数据
      purchaseList: [],
      showDivColumns: {
        show_accountMemberName: { isShow: true },
        show_purchaseID: { isShow: true },
        show_billCode: { isShow: true },
        show_purchaseKind: { isShow: true },
        show_sellMemberName: { isShow: true },
        show_buyUserName: { isShow: true },
        show_purchaseDate: { isShow: true },
        show_amount: { isShow: true },
        show_price: { isShow: true },
        show_money: { isShow: true },
        show_needLoan: { isShow: true },
        show_paidMoney: { isShow: true },
        show_spareMoney: { isShow: true },
        show_lastPaymentDate: { isShow: true },
        show_deliveryAmount: { isShow: true },
        show_invoiceMoney: { isShow: true }
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
      invoiceStatusOptions: [{
        "label": "未收票",
        "value": 1
      }, {
        "label": "部分收票",
        "value": 2
      }, {
        "label": "已收票",
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
      cacheData: {
        member: {},
        user: {}
      },
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        batchID: undefined,
        purchaser: undefined,
        salesman: undefined,
        orderBuyMemberName: undefined,

        purchaseKind: undefined,
        templateID: undefined,
        orderID: undefined,
        bundleNo: undefined,
        billCode: undefined,
        sellMember: undefined,
        sellUser: undefined,
        sellMemberName: undefined,
        sellDept: undefined,
        buyMember: undefined,
        buyUser: undefined,
        buyMemberName: undefined,
        buyDept: undefined,
        loanType: undefined,
        deliveryMode: undefined,
        outDepotPayer: undefined,
        advanceFee: undefined,
        costFee: undefined,
        deposit: undefined,
        penaltyRates: undefined,
        taxRate: undefined,
        lastDepositDate: undefined,
        lastPaymentDate: undefined,
        lastDeliveryDate: undefined,
        settlement: undefined,
        specialTerm: undefined,
        amount: undefined,
        price: undefined,
        money: undefined,
        purchaseDate: undefined,
        purchaseTime: undefined,
        pictureContract: undefined,
        contractUploadTime: undefined,
        contractUploader: undefined,
        paidMoney: undefined,
        deliveryAmount: undefined,
        invoiceAmount: undefined,
        invoiceMoney: undefined,
        deliveryMoney: undefined,
        returnAmount: undefined,
        returnMoney: undefined,
        needLoan: undefined,
        loanID: undefined,
        loanMoney: undefined,
        loanCost: undefined,
        expiryDate: undefined,
        lastAccess: undefined,
        maker: undefined,
        makeTime: undefined,
        confirmer: undefined,
        confirmTime: undefined,
        revoker: undefined,
        revokeTime: undefined,
        status: undefined,
        accountMember: undefined,
        discountPrice: undefined,
        discountMoney: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      migoFuncdisplay: false,
      purchase_procurement_PopoutTitle: '',
      handleSelectionAction: null,
      keyId:''
    };
  },
  created() {
    this.listCustomColumns();
    this.getList();
    this.listPurchaserOptions();
    this.listMemberAccountRel();
  },
  methods: {
    /** 查询采购单列表 */
    getList() {
      let that = this;
      this.loading = true;

      // 拆解查询条件
      this.addDateRangeAndAlias(this.queryParams, this.queryParams.purchaseDate, "purchaseDate");
      this.addDateRangeAndAlias(this.queryParams, this.queryParams.lastPaymentDate, "lastPaymentDate");

      let param = this.cloneJSON(this.queryParams);

      console.log(param)

      param["batchIdList"] = this.splitTextarea(param["batchID"]);
      param["accountMemberList"] = param["accountMember"] || "";
      param["salesmanList"] = param["salesman"] || "";
      param["buyUserList"] = param["purchaser"] || "";
      param["purchaseDate"] = "";
      param["lastPaymentDate"] = "";
      param["accountMember"] = "";
      param["purchaser"] = "";
      param["batchID"] = "";

      listPurchase(this.jsonToURL(param)).then(response => {
        this.purchaseList = response.rows;
        this.total = response.total;

        Object.keys(this.purchaseList).forEach(function (idx) {
          that.purchaseList[idx]["children"] = [];
        });

        that.setUserMemberName();
        this.loading = false;
      });
    },
    /** 查询表格自定义列 */
    listCustomColumns() {
      this.loading = true;
      let that = this;
      listColumn({ code: "erp_purchase_list" }).then(response => {
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
    /** 查询采购员列表 */
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
    selectAll(){
      this.$refs.purchaseList.clearSelection()
    },
    // 多选框选中数据
    handleSelectionChangeatf(selection) {
      if (selection.length > 2)
        this.$refs.purchaseList.clearSelection()
        else {
          if (selection.length > 0) {
            this.ids = selection.map(item => item.purchaseID)
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
      updateColumn({ tableCode: "erp_purchase_list", name: data["name"], code: data["code"], isShow: data["isShow"] ? 1 : 0 }).then(response => {
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
      this.title = "添加采购单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const purchaseID = row.purchaseID || this.ids
      getPurchase(purchaseID).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改采购单";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.purchaseID != undefined) {
            updatePurchase(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addPurchase(this.form).then(response => {
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
      const purchaseIDs = row.purchaseID || this.ids;
      this.$confirm('是否确认删除采购单编号为"' + purchaseIDs + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPurchase(purchaseIDs);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有采购单数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportPurchase(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },

    /** 格式化字段  **/
    purchaseKindFormat(row, column) {
      var result = "";
      if (row.purchaseKind == 1) {
        result = "非公检";
      } else {
        result = "公检棉";
      }

      if (row.orderID != null && row.orderID != "") {
        result += "(销)";
      } else if (row.bundleNo != null && row.bundleNo != "") {
        result += "(拍)";
      }

      return result;
    },
    purchaseDateFormat(row, column) {
      return (row.purchaseDate || "") + " " + (row.purchaseTime || "");
    },
    loanTypeFormat(row, column) {

      if (row.loanType == 1) {
        return "采购质押";
      }
      if (row.loanType == 2) {
        return "采购融资";
      }

      return "-";
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
    spareMoneyFormat(row, column) {
      return this.arithmeticSubtract(row.money, row.paidMoney);
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
      Object.keys(this.purchaseList).forEach(function (idx) {
        if (!!that.purchaseList[idx]["accountMember"] && !that.cacheData["member"][that.purchaseList[idx]["accountMember"]] && memberIdList.indexOf(that.purchaseList[idx]["accountMember"]) == -1) {
          memberIdList.push(that.purchaseList[idx]["accountMember"]);
        }
        if (!!that.purchaseList[idx]["buyUser"] && !that.cacheData["user"][that.purchaseList[idx]["buyUser"]] && userIdList.indexOf(that.purchaseList[idx]["buyUser"]) == -1) {
          userIdList.push(that.purchaseList[idx]["buyUser"]);
        }
      });

      if (memberIdList.length > 0) {
        listMember(this.jsonToURL({memberIdList: memberIdList})).then(response => {
          if (response.rows != null && response.rows.length > 0) {
            Object.keys(response.rows).forEach(function (idx) {
              that.cacheData["member"][response.rows[idx]["memberID"]] = response.rows[idx];
            })

            Object.keys(this.purchaseList).forEach(function (idx) {
              var cacheMember = that.cacheData["member"][that.purchaseList[idx]["accountMember"]];
              if (cacheMember) that.$set(that.purchaseList[idx], "accountMemberName", cacheMember.corpNameFull || "");
            })
          }
        });
      } else {
        Object.keys(this.purchaseList).forEach(function (idx) {
          var cacheMember = that.cacheData["member"][that.purchaseList[idx]["accountMember"]];
          if (cacheMember) that.$set(that.purchaseList[idx], "accountMemberName", cacheMember.corpNameFull || "");
        })
      }

      if (userIdList.length > 0) {
        listUser(this.jsonToURL({userIdList: userIdList})).then(response => {
          if (response.rows != null && response.rows.length > 0) {
            Object.keys(response.rows).forEach(function (idx) {
              that.cacheData["user"][response.rows[idx]["userID"]] = response.rows[idx];
            })

            Object.keys(this.purchaseList).forEach(function (idx) {
              var cacheBuyUser = that.cacheData["user"][that.purchaseList[idx]["buyUser"]];
              if (cacheBuyUser) that.$set(that.purchaseList[idx], "buyUserName", cacheBuyUser.name || "");
            })
          }
        });
      } else {
        Object.keys(this.purchaseList).forEach(function (idx) {
          var cacheBuyUser = that.cacheData["user"][that.purchaseList[idx]["buyUser"]];
          if (cacheBuyUser) that.$set(that.purchaseList[idx], "buyUserName", cacheBuyUser.name || "");
        })
      }
    },
    cellClass(row) {
      if (row.columnIndex == 0) {
        return 'DisabledSelection';
      }
    },
    dataExpand(row, expandedRows) {
      let that = this;
      if (row["loaded"]) {
        return;
      }
      if (row.children.length != 0) {
        return;
      }
      row["loaded"] = true;

      listBatch(this.jsonToURL({pageNum: 1, pageSize: 100, purchaseID: row["purchaseID"]})).then(response => {
        Object.keys(response.rows).forEach(function (idx) {
          row.children.push(response.rows[idx] || []);
        })

        that.setBatchUserMemberName(row.children);
      });

      console.log(row);
      // this.$refs.subTableData.toggleRowExpansion(row);
    },
    setBatchUserMemberName(batchList) {
      let userIdList = [];
      let that = this;
      let memberIdList = [];
      Object.keys(batchList).forEach(function (idx) {
        if (!!batchList[idx]["sellUser"] && !that.cacheData["user"][batchList[idx]["sellUser"]] && userIdList.indexOf(batchList[idx]["sellUser"]) == -1) {
          userIdList.push(batchList[idx]["sellUser"]);
        }
        if (!!batchList[idx]["buyMember"] && !that.cacheData["member"][batchList[idx]["buyMember"]] && memberIdList.indexOf(batchList[idx]["buyMember"]) == -1) {
          memberIdList.push(batchList[idx]["buyMember"]);
        }
        if (!!batchList[idx]["orderAccountMember"] && !that.cacheData["member"][batchList[idx]["orderAccountMember"]] && memberIdList.indexOf(batchList[idx]["orderAccountMember"]) == -1) {
          memberIdList.push(batchList[idx]["orderAccountMember"]);
        }
      });

      if (memberIdList.length > 0) {
        listMember(this.jsonToURL({memberIdList: memberIdList})).then(response => {
          if (response.rows != null && response.rows.length > 0) {
            Object.keys(response.rows).forEach(function (idx) {
              that.cacheData["member"][response.rows[idx]["memberID"]] = response.rows[idx];
            })

            Object.keys(batchList).forEach(function (idx) {
              var cacheBuyMember = that.cacheData["member"][batchList[idx]["buyMember"]];
              var cacheOrderMember = that.cacheData["member"][batchList[idx]["orderAccountMember"]];
              that.$set(batchList[idx], "buyMemberName", cacheBuyMember.corpNameFull || "");
              that.$set(batchList[idx], "orderAccountMemberName", cacheOrderMember.corpNameFull || "");
            })
          }
        });
      } else {
        Object.keys(batchList).forEach(function (idx) {
          var cacheBuyMember = that.cacheData["member"][batchList[idx]["buyMember"]];
          var cacheOrderMember = that.cacheData["member"][batchList[idx]["orderAccountMember"]];
          if (cacheBuyMember) {
            that.$set(batchList[idx], "buyMemberName", cacheBuyMember.corpNameFull || "");
            that.$set(batchList[idx], "orderAccountMemberName", cacheOrderMember.corpNameFull || "");            
          }
        })
      }

      if (userIdList.length > 0) {
        listUser(this.jsonToURL({userIdList: userIdList})).then(response => {
          if (response.rows != null && response.rows.length > 0) {
            Object.keys(response.rows).forEach(function (idx) {
              that.cacheData["user"][response.rows[idx]["userID"]] = response.rows[idx];
            })

            Object.keys(batchList).forEach(function (idx) {
              var cacheUser = that.cacheData["user"][batchList[idx]["sellUser"]];
              if (cacheUser) {
                that.$set(batchList[idx], "sellUserName", cacheUser.name || "");
              }
            })
          }
        });
      } else {
        Object.keys(batchList).forEach(function (idx) {
          var cacheUser = that.cacheData["user"][batchList[idx]["sellUser"]];
          if (cacheUser) {
            that.$set(batchList[idx], "sellUserName", cacheUser.name || "");
          }
        })
      }
    },
    migoFunc (row) {
      this.migoFuncdisplay = true
      this.keyId = row.purchaseID
      this.purchase_procurement_PopoutTitle = '采购收货'
      let obj = row
      this.$nextTick((e)=>{
        this.$refs.purchaseOrderPopoutDom.DataGetList(obj.purchaseID);
      })
    },
    purchaseOrderPopoutObjFunc (row) {
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
  #purchase_procurement .el-table__expanded-cell[class*=cell] {
    padding: 0px;
}
  // #purchase_procurement .pagination-container .el-pagination {
  //   width: 100%;
  //   text-align: center;
  // }
  // #purchase_procurement .el-button--mini {
  //     padding: 6px 6px;
  // }
</style>
