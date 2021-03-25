<template>
  <el-dialog
    v-loading="SalesOrderPopoutdialog"
    id="SalesOrderPopout"
    width="60%"
    :title="titleText"
    :append-to-body="true"
    :before-close="dialogFormVisible"
    :visible.sync="dialogFormVisibleTure"
    >
    <el-form ref="formParams" :model="formParams" :rules="rules" size="small">
      <el-form-item label="销售单号:" label-width="84px" style="float:left;width:30%">
        <el-input
          placeholder="请输入内容"
          v-model="formParams.orderID"
          disabled
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="货权转移:" label-width="84px" prop="deliveryType" :rules="rules.deliveryType" style="float:left;width:30%">
        <el-select v-model="formParams.deliveryType" placeholder="请选择">
          <el-option
            v-for="item in deliveryTypeOptions"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发货日期:" label-width="84px" prop="deliveryDate" :rules="rules.deliveryDate" style="float:left;width:30%">
        <el-date-picker
          style="width:100%"
          v-model="formParams.deliveryDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <br>
      <div class="form_content">
        <div class="head_ul">
          <nav>
            <li :class="formParams.templateID == 20?'action':''" @click="templateIDSwitch(20)">转给买方</li>
            <li :class="formParams.templateID == 22?'action':''" @click="templateIDSwitch(22)">委托提货</li>
            <li :class="formParams.templateID == 21?'action':''" @click="templateIDSwitch(21)">个人提货</li>
          </nav>
        </div>
        <div class="content">
          <div v-if="formParams.templateID == 20">
            <el-form-item label="收货公司:" label-width="84px" prop="receive" :rules="rules.receive" style="width:50%">
              <el-input
                placeholder="请输入内容"
                v-model="formParams.receive"
                clearable>
              </el-input>
            </el-form-item>
          </div>
          <div v-if="formParams.templateID == 22">
            <el-form-item label="受委托公司:" label-width="100px" prop="deliveryProxy" :rules="rules.deliveryProxy" style="width:50%">
              <el-input
                placeholder="请输入内容"
                v-model="formParams.deliveryProxy"
                clearable>
              </el-input>
            </el-form-item>
          </div>
          <div v-if="formParams.templateID == 21">
            <el-form-item label="提货人姓名:" label-width="140px" prop="driverName" :rules="rules.driverName" style="float:left;width:48%">
              <el-input
                placeholder="请输入内容"
                v-model="formParams.driverName"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="提货人身份证号:" label-width="140px" prop="driverIdNumber" :rules="rules.driverIdNumber" style="float:left;width:48%">
              <el-input
                placeholder="请输入内容"
                v-model="formParams.driverIdNumber"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="提货人电话:" label-width="140px" prop="driverPhone" :rules="rules.driverPhone" style="float:left;width:48%">
              <el-input
                placeholder="请输入内容"
                v-model="formParams.driverPhone"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="提货车号信息:" label-width="140px" prop="truckNumber" :rules="rules.truckNumber" style="float:left;width:48%">
              <el-input
                placeholder="请输入内容"
                v-model="formParams.truckNumber"
                clearable>
              </el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <div class="select_div" style="clear: both;margin-top: 10px;">
      <el-select v-model="warehouseValue" clearable @change="warehouseChange" placeholder="请选择仓库">
        <el-option
          v-for="item in warehouseOptions"
          :key="item.corpName"
          :label="item.corpName"
          :value="item.corpName">
        </el-option>
      </el-select>
    </div>
    <div class="table_content">
      <el-table v-loading="SalesOrdertableDatadialog" :data="tableData" @selection-change="handleSelectionChange" style="width: 100%" ref="tableDataRef" size="mini">
        <el-table-column type="selection" header-align="center" align="center" />
        <el-table-column label="批次号" align="center" header-align="center" prop="batchID" />
        <el-table-column label="仓库" align="center" header-align="center" prop="corpName"/>
        <!-- <el-table-column label="件数" align="center" prop="orderPacknum" min-width="92px">
          <template slot-scope="scope">
            <span>件数: &nbsp;{{ scope.row.orderPacknum }}</span>
            <br>
            <span>已收: &nbsp;{{ scope.row.orderDeliveryPacknum }}</span>
            <br>
            <span>未收: &nbsp;{{ ((((scope.row.orderPacknum - scope.row.orderDeliveryPacknum ) * 1000000).toFixed(0)) / 1000000).toFixed(0) }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="数量" align="center" prop="orderAmount"  min-width="110px">
          <template slot-scope="scope">
            <span>数量: &nbsp;{{ scope.row.orderAmount }}</span>
            <br>
            <span>已收: &nbsp;{{ scope.row.orderDeliveryAmount }}</span>
            <br>
            <span>未收: &nbsp;{{ ((((scope.row.orderAmount - scope.row.orderDeliveryAmount ) * 1000000).toFixed(4)) / 1000000).toFixed(4) }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="可发货" align="center" prop="orderAvailAmount"  min-width="110px">
          <template slot-scope="scope">
            <span>件数: &nbsp;{{ scope.row.orderAvailPacknum }}</span>
            <br>
            <span>数量: &nbsp;{{ ((((scope.row.orderAvailAmount ) * 1000000).toFixed(4)) / 1000000).toFixed(4) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发货件数" align="center" header-align="center" prop="deliveryPacknum" >
          <template slot-scope="scope">
            <!-- newChargePacknum -->
            <input class="numberNum" type="number" @blur="newChargePacknumBlur(scope.$index, scope.row, $event)" @input="newChargePacknum(scope.$index, scope.row, $event)" :value="scope.row.newChargePacknum" :disabled="scope.row.orderAvailPacknum <= 0?true:false" :max="scope.row.orderAvailPacknum" :min="0" style="width: 100%;">
          </template>
        </el-table-column>
        <el-table-column label="发货数量" align="center" header-align="center" prop="deliveryAmount">
          <template slot-scope="scope">
            <!-- newChargeAmount -->
            <input class="numberNum" disabled type="number" @blur="newChargeAmountBlur(scope.$index, scope.row, $event)" @input="newChargeAmount($event, scope.row)" :value="scope.row.newChargeAmount" :max="scope.row.orderAvailAmount" :min="0" style="width: 100%;">
          </template>
        </el-table-column>
        <el-table-column label="价格（元/吨）" align="center" header-align="center" prop="price" />
        <el-table-column label="发货金额（元）" align="center" header-align="center" prop="deliveryAmount">
          <template slot-scope="scope">
            <!-- scope.row.deliveryPacknum * scope.row.deliveryAmount * scope.row.price -->
            <span>{{ scope.row.totalAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" header-align="center" prop="deliveryAmount">
          <template slot-scope="scope">
            <el-button type="primary" @click="FileInfo(scope.row)" >查看</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="orderShowDelivery">预览发货单</el-button>
        <el-button @click="dialogFormVisible">取 消</el-button>
        <el-button type="primary" @click="PurchaseOrderPopoutSubmit">确 定</el-button>
    </div>
    <div id="FileInfo" v-if="FileInfoDis" v-loading="FileInfoDisdialog">
      <div class="content">
        <h3>文件查看</h3>
        <span class="cosle" @click="FileInfoDis = false;FileInfoData = []">X</span>
        <div class="table">
          <el-table
            :data="FileInfoData"
            height="300px"
            style="width: 100%">
            <el-table-column prop="fileBilType" label="文件类别" header-align="center" align="center">
              <template slot-scope="scope">
                <!-- 1-----货转单 2-----仓单注销清单 3-----交易市场出库单 4-----码单 -->
                <span v-if="scope.row.fileBilType == '1'">货转单</span>
                <span v-if="scope.row.fileBilType == '2'">仓单注销清单</span>
                <span v-if="scope.row.fileBilType == '3'">交易市场出库单</span>
                <span v-if="scope.row.fileBilType == '4'">码单</span>
              </template>
            </el-table-column>
            <el-table-column prop="originalName" label="货转文件" header-align="center" align="center">
              <template slot-scope="scope">
                <!-- scope.row.storePath availAmount -->
                <a 
                :href="
                `${originHost}/cotton-admin-app/common/resources?Authorization_=${Authorization}&p=${scope.row.storePath.split('/')[1]}&k=${scope.row.storePath.split('/')[scope.row.storePath.split('/').length - 3]}/${scope.row.storePath.split('/')[scope.row.storePath.split('/').length - 2]}/${scope.row.storePath.split('/')[scope.row.storePath.split('/').length - 1]}`"
                target="_blank" >{{ scope.row.originalName }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="上传日期" header-align="center" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime.replace(/T/g, ' ').substr(0, scope.row.createTime.replace(/T/g, ' ').indexOf('.00')) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createName" label="上传人" header-align="center" align="center">
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="pageNum"
            :limit.sync="pageSize"
            @pagination="FileInfo"
          />
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { listBatch } from "@/api/trd/batch";
import { orderDelivery, orderShowDelivery, orderShowCheck } from "@/api/trd/order";
import FileUpdate from '@/components/FileUpdate'

export default {
  name: 'SalesOrderPopout',
  components: {
    FileUpdate
  },
  data() {
    return {
      SalesOrderPopoutdialog: false,
      SalesOrdertableDatadialog: false,
      dialogFormVisibleTure: true,
      fileUpdate: false,
      originHost: window.location.origin,
      Authorization: window.sessionStorage.getItem('Authorization'),
      warehouseValue: '',
      formParams: {
        orderID: 'MLX2005210001',
        deliveryType: null,
        deliveryDate: '',
        receive: '',
        deliveryProxy: '',
        driverName: '',
        driverIdNumber: '',
        driverPhone: '',
        truckNumber: '',
        templateID: 20,
      },
      total: 0,
      pageNum: 1,
      pageSize: 10,
      FileInfoDis: false,
      FileInfoDisdialog: false,
      purchaseDetailID: null,
      // 货权转移数据
      deliveryTypeOptions: [
        { id:1, value: '是'},
        { id:0, value: '否'},
      ],
      tableData: [],
      tableList: [],
      FileInfoData: [],
      rules: {
        deliveryType: [{ required: true, message: '请选择货权转移', trigger: 'blur' }],
        deliveryDate: [{ required: true, message: '请选择发货日期', trigger: 'blur' }],
        receive: [{ required: true, message: '请输入收货公司', trigger: 'blur' }],
        deliveryProxy: [{ required: true, message: '请输入委托公司', trigger: 'blur' }],
        driverName: [{ required: true, message: '请输入提货人姓名', trigger: 'blur' }],
        driverIdNumber: [{ required: true, message: '请输入提货人身份证号', trigger: 'blur' }],
        driverPhone: [{ required: true, message: '请输入提货人电话', trigger: 'blur' }],
        truckNumber: [{ required: true, message: '请输入提货车号信息', trigger: 'blur' }],
      },
      previewFrom: false,
      // 仓库模糊
      warehouseOptions: [],
      warehouseList: [],
    };
  },
  props: {
    titleText: {
      type: String,
      default: ''
    },
    // infoData: {
    //   type: Object,
    //   default: {}
    // },
    keyId: {
      type: String,
      default: ''
    }
  },
  created() {
    this.formParams.orderID = this.keyId
    this.dialogFormVisibleTure = true
  },
  methods: {
    DataGetList (key, name) {
      let keyValue
      if (this.keyId != '')
      keyValue = this.keyId
      else
      keyValue = key
      this.formParams.receive = name
      let that = this
      this.SalesOrdertableDatadialog = true
      listBatch(this.jsonToURL({pageNum: 1, pageSize: 100, orderID: keyValue})).then(response => {
        this.tableData = []
        response.rows.forEach((v, i) => {
          response.rows[i].newChargePacknum = ((((response.rows[i].orderAvailPacknum) * 1000000).toFixed(4)) / 1000000).toFixed(0)
          response.rows[i].newChargeAmount = ((((response.rows[i].orderAvailAmount) * 1000000).toFixed(4)) / 1000000).toFixed(4)
          response.rows[i].totalAmount = ((((response.rows[i].newChargeAmount * response.rows[i].price) * 1000000).toFixed(4)) / 1000000).toFixed(2)
        })
        this.tableData = response.rows
        // 下拉筛选暂存区
        this.warehouseList = response.rows
        this.warehouseOptions = []
        this.warehouseOptions = this.deteleObject(response.rows, 'corpName')
        this.SalesOrdertableDatadialog = false
      });
    },
    FileInfo (row) {
      let obj
      if (row.page){
        obj = {
          page: row.page,
          pageSize: row.limit,
          purchaseDetailID: this.purchaseDetailID
        }
      } else {
        let purchaseDetailID = row.purchaseDetailID
        this.purchaseDetailID = purchaseDetailID
        obj = {
          purchaseDetailID
        }
      }
      this.FileInfoDis = true
      this.SalesOrdertableDatadialog = true
      let that = this
      orderShowCheck(obj).then(response => {
        that.SalesOrdertableDatadialog = false
        if (response.code === 200) {
          that.FileInfoData = []
          that.FileInfoData = response.rows
          that.total = response.total
        } else {
          that.msgError(response.msg);
        }
      });
    },
    templateIDSwitch (num) {
      this.formParams.templateID = num;
      this.$refs.formParams.clearValidate()
    },
    formDataFor(obj, file) {
      const formData = new FormData()
      for (const i in obj) {
        formData.append(i, obj[i])
      }
      formData.append('file', file)
      return formData
    },
    warehouseChange (row) {
      if (row) {
        let arr = []
        this.warehouseList.forEach((v,i) => {
          if (v.corpName == row) {
            arr.push(v)
          }
        })
        this.tableData = JSON.parse(JSON.stringify(arr))
      } else {
        this.DataGetList(this.keyId, this.formParams.receive)
      }
    },
    PurchaseOrderPopoutSubmit (Object) {
      this.formValidate(this.interfaceParameters)
    },
    formValidate (func) {
      let that = this
      this.$refs.formParams.validate(valid => {
        if (valid) {
          let NewtableList = []
          if (this.tableList.length == 0) {
            this.msgWarning('至少选择一条批次号数据')
            return
          } else {
            this.tableList.forEach((v,i)=>{
              var objnew = JSON.parse(JSON.stringify(v))
              objnew.amount = objnew.newChargeAmount
              objnew.packnum = objnew.newChargePacknum
              delete objnew.newChargePacknum
              delete objnew.newChargeAmount
              NewtableList.push(objnew)
            })
          }
          func(this.ParametersLIstObj(this.formParams, NewtableList))
        }
      })
    },
    interfaceParameters (Obj) {
      if (!this.previewFrom) {
        this.msgError('请先提交预览')
        return
      }
      this.SalesOrderPopoutdialog = true
      orderDelivery(Obj).then(response => {
        this.SalesOrderPopoutdialog = false
        if (response.code === 200) {
          this.msgSuccess(response.msg);
          this.dialogFormVisible('true')
        } else {
          this.msgError(response.msg);
        }
      });
    },
    ParametersLIstObj (form, list) {
      let obj
      let { orderID, deliveryDate, deliveryType, templateID } = form
      deliveryDate = deliveryDate?deliveryDate:''
      obj = {
        orderID,
        deliveryType,
        deliveryDate,
        templateID
      }
      if (form.templateID == 20) {
        let { receive } = form
        obj.receive = receive
      } else if (form.templateID == 22) {
        let { deliveryProxy } = form
        deliveryProxy?deliveryProxy:''
        obj.deliveryProxy = deliveryProxy
      } else if (form.templateID == 21){
        let { driverName,  driverIdNumber, driverPhone, truckNumber } = form
        driverName?driverName:''
        driverIdNumber?driverIdNumber:''
        driverPhone?driverPhone:''
        truckNumber?truckNumber:''
        obj.driverName = driverName
        obj.driverIdNumber = driverIdNumber
        obj.driverPhone = driverPhone
        obj.truckNumber = truckNumber
      }
      obj.detailList = JSON.parse(JSON.stringify(list))
      return obj
    },
    orderShowDelivery () {
      this.formValidate(this.interfaceorderShowDelivery)
    },
    interfaceorderShowDelivery (Obj) {
      this.SalesOrderPopoutdialog = true
      orderShowDelivery(Obj).then(response => {
        this.SalesOrderPopoutdialog = false
        if (response.code === 200) {
          this.msgSuccess(response.msg);
          this.previewFrom = true
          let aEle = document.createElement('a')
          aEle.setAttribute('id','HERFS')
          aEle.setAttribute('target','_blank')
          aEle.setAttribute('href',`${window.location.origin}/cotton-admin-app/trd/order/resources?Authorization_=${this.Authorization}&key=${response.data}`)
          document.body.append(aEle)
          setTimeout(() => {
            document.getElementById('HERFS').click()
            document.getElementById('HERFS').remove()
          }, 200)
        } else {
          this.msgError(response.msg);
        }
      });
    },
    handleSelectionChange (row) {
      this.tableList = JSON.parse(JSON.stringify(row))
    },
    newChargePacknum (index,row, ele) {
      let Obj = JSON.parse(JSON.stringify(this.tableData))
      Obj[index].newChargePacknum = ele.target.value
      // 算法
      let orderPacknumS = (((((Obj[index].orderAmount / Obj[index].orderPacknum) * Obj[index].newChargePacknum) * 1000000).toFixed(4)) / 1000000).toFixed(4)
      if ((Obj[index].orderAmount - orderPacknumS) > Obj[index].orderAmount) {
        orderPacknumS = Obj[index].orderAmount
      }
      Obj[index].newChargeAmount = orderPacknumS
      Obj[index].totalAmount = ((((Obj[index].newChargeAmount * Obj[index].price) * 1000000).toFixed(4)) / 1000000).toFixed(2)
      this.tableData = Obj
      this.$set(this.tableData,index,Obj[index])
    },
    newChargeAmount (index,row, ele) {
      let Obj = JSON.parse(JSON.stringify(this.tableData))
      Obj[index].newChargeAmount = ele.target.value

      Obj[index].totalAmount = ((((Obj[index].newChargeAmount * Obj[index].price) * 1000000).toFixed(4)) / 1000000).toFixed(2)
      this.tableData = Obj
      this.$set(this.tableData,index,Obj[index])
    },
    newChargePacknumBlur(index,row, ele){
      let Obj = JSON.parse(JSON.stringify(this.tableData))
      Obj[index].newChargePacknum = ele.target.value
      if (Obj[index].newChargePacknum <= 0) {
        Obj[index].newChargePacknum = '1'
      } else if (Obj[index].newChargePacknum == '') {
        Obj[index].newChargePacknum = '1'
      } else if (Obj[index].newChargePacknum > Obj[index].orderPacknum) {
        Obj[index].newChargePacknum = Obj[index].orderPacknum
        Obj[index].newChargeAmount = Obj[index].orderAmount
      }
      Obj[index].totalAmount = ((((Obj[index].newChargeAmount * Obj[index].price) * 1000000).toFixed(4)) / 1000000).toFixed(2)
      this.tableData = Obj
      this.$set(this.tableData,index,Obj[index])
    },
    newChargeAmountBlur(index,row, ele){
      let Obj = JSON.parse(JSON.stringify(this.tableData))
      Obj[index].newChargeAmount = ele.target.value
      let orderPacknumS = (((((Obj[index].orderAmount / Obj[index].orderPacknum) * 1) * 1000000).toFixed(4)) / 1000000).toFixed(4)
      if (Obj[index].newChargeAmount <= 0) {
        Obj[index].newChargeAmount = orderPacknumS
      } else if (Obj[index].newChargePacknum == '') {
        Obj[index].newChargeAmount = orderPacknumS
      } else if (Obj[index].newChargeAmount > Obj[index].orderAmount) {
        Obj[index].newChargeAmount = Obj[index].orderAmount
      }
      Obj[index].totalAmount = ((((Obj[index].newChargeAmount * Obj[index].price) * 1000000).toFixed(4)) / 1000000).toFixed(2)
      this.tableData = Obj
      this.$set(this.tableData,index,Obj[index])
    },
    dialogFormVisible (str) {
      this.dialogFormVisibleTure = false
      if (str == 'true')
      this.$emit('SalesOrderPopoutObjFunc', str)
      else 
      this.$emit('SalesOrderPopoutObjFunc',)
    }
  }
};
</script>
<style lang="less">
  #SalesOrderPopout {
    .avatar-orderDetailImgs-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .el-upload-list li:first-child{
      margin: 0;
    }
    .el-upload-list--picture .el-upload-list__item{
      float: left;
      width: 80px;
      margin: 0 10px;
    }
    .el-upload-dragger{
      width: 100px;
      height: 100px;
    }
    .el-upload-list--picture .el-upload-list__item-name{
      display: none;
    }
    .form_content{
      clear: both;
      width: 100%;
      height: 200px;
      .head_ul{
        width: 100%;
        height: 30px;
        li{
          list-style: none;
          float: left;
          line-height: 30px;
          padding: 0 18px;
          cursor: pointer;
        }
        .action{
          border: 1px solid #e4e4e4;
          border-bottom: none;
          color: #3C9DFF;
        }
      }
      .content{
        clear: both;
        width: 100%;
        height: 170px;
        padding: 36px;
        border: 1px solid #e4e4e4;
      }
    }
    #FileInfo{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding-top: 10%;
      background: rgba(0, 0, 0, 0.25);
      z-index: 11;
      .content{
        width: 44%;
        margin: 0 auto;
        background: #fff;
        padding: 20px;
        border-radius: 4px;
        position: relative;
        h3{
          border-bottom: 1px solid #ccc;
          padding-bottom: 14px;
        }
        .cosle{
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
        }
      }
    }
    .table_content{
      .numberNum{
        width: 100%;
        line-height: 24px;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        text-indent: 4px;
        outline: none;
      }
    }
    // 测试需要
    .el-dialog__body {
      max-height: 600px;
      overflow-y: scroll;
    }
  }
</style>
