<template>
  <el-dialog
    v-loading="PurchaseOrderPopoutdialog"
    id="purchaseOrderPopout"
    :title="titleText"
    width="60%"
    :append-to-body="true"
    :before-close="dialogFormVisible"
    :visible.sync="dialogFormVisibleTure"
    >
    <el-form ref="formParams" :model="formParams" :rules="rules" size="small">
      <el-form-item label="收货日期:" label-width="84px" prop="deliveryDate" :rules="rules.deliveryDate" style="float:left;width:50%">
        <el-date-picker
          style="width:100%"
          v-model="formParams.deliveryDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注:" label-width="200px" style="float:left;width:50%">
        <el-input
          placeholder="请输入内容"
          v-model="formParams.Notes"
          clearable>
        </el-input>
      </el-form-item>
      <br>
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
      <el-table v-loading="PurchaseOrdertableDatadialog" :data="tableData" @selection-change="handleSelectionChange" style="width: 100%" ref="tableDataRef" size="mini">
        <el-table-column type="selection" header-align="center" align="center" />
        <el-table-column label="批次号" align="center" header-align="center" prop="batchID" />
        <el-table-column label="仓库" align="center" header-align="center" prop="corpName"/>
        <el-table-column label="件数" align="center" prop="packnum"  min-width="92px">
          <template slot-scope="scope">
            <span>件数: &nbsp;{{ scope.row.packnum }}</span>
            <br>
            <span>已收: &nbsp;{{ scope.row.deliveryPacknum }}</span>
            <br>
            <span>未收: &nbsp;{{ ((((scope.row.packnum - scope.row.deliveryPacknum ) * 1000000).toFixed(0)) / 1000000).toFixed(0) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量" align="center" prop="amount"  min-width="110px">
          <template slot-scope="scope">
            <span>数量: &nbsp;{{ scope.row.amount }}</span>
            <br>
            <span>已收: &nbsp;{{ scope.row.deliveryAmount }}</span>
            <br>
            <span>未收: &nbsp;{{ ((((scope.row.amount - scope.row.deliveryAmount ) * 1000000).toFixed(4)) / 1000000).toFixed(4) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收货件数" align="center" header-align="center" prop="deliveryPacknum" >
          <template slot-scope="scope">
            <!-- newChargePacknum -->
            <input class="numberNum" type="number" @blur="newChargePacknumBlur(scope.$index, scope.row, $event)" @input="newChargePacknum(scope.$index, scope.row, $event)" :value="scope.row.newChargePacknum" :disabled="scope.row.packnum - scope.row.deliveryPacknum <= 0?true:false" :max="scope.row.packnum - scope.row.deliveryPacknum" :min="0" style="width: 100%;">
          </template>
        </el-table-column>
        <el-table-column label="收货数量" align="center" header-align="center" prop="deliveryAmount">
          <template slot-scope="scope">
            <!-- newChargeAmount -->
            <input class="numberNum" type="number" @blur="newChargeAmountBlur(scope.$index, scope.row, $event)" @input="newChargeAmount(scope.$index, scope.row, $event)" :value="scope.row.newChargeAmount" disabled :max="scope.row.amount - scope.row.deliveryAmount" :min="0" style="width: 100%;">
          </template>
        </el-table-column>
        <el-table-column label="价格（元/吨）" align="center" header-align="center" prop="price" />
        <el-table-column label="收货金额（元）" align="center" header-align="center" prop="deliveryAmount">
          <template slot-scope="scope">
            <!-- scope.row.deliveryPacknum * scope.row.deliveryAmount * scope.row.price -->
            <span>{{ scope.row.totalAmount }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="file_update" style="margin-top:10px">
      <el-form-item label="转货单:" label-width="128px">
        <file-update v-if="fileUpdate" :accept="FileTypeAccept" :ImgType="1" :updateFileType="1" @imgUploadInfo="imgUploadInfo" @RemoveFileDat="RemoveFileDat" :config="{}"></file-update>
      </el-form-item>
    </div>
    <div class="file_update" style="margin-top:10px">
      <el-form-item label="仓单注销清单:" label-width="128px">
        <file-update v-if="fileUpdate" :accept="FileTypeAccept" :ImgType="2" :updateFileType="1" @imgUploadInfo="imgUploadInfo" @RemoveFileDat="RemoveFileDat" :config="{}"></file-update>
      </el-form-item>
    </div>
    <div class="file_update" style="margin-top:10px">
      <el-form-item label="交易市场出库单:" label-width="128px">
        <file-update v-if="fileUpdate" :accept="FileTypeAccept" :ImgType="3" :updateFileType="1" @imgUploadInfo="imgUploadInfo" @RemoveFileDat="RemoveFileDat" :config="{}"></file-update>
      </el-form-item>
    </div>
    <div class="file_update" style="margin-top:10px">
      <el-form-item label="码单:" label-width="128px">
        <file-update v-if="fileUpdate" :accept="FileTypeAccept" :ImgType="4" :updateFileType="1" @imgUploadInfo="imgUploadInfo" @RemoveFileDat="RemoveFileDat" :config="{}"></file-update>
      </el-form-item>
    </div>
  </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible">取 消</el-button>
        <el-button type="primary" @click="PurchaseOrderPopoutSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { listBatch } from "@/api/trd/batch";
import { purchaseDelivery } from "@/api/trd/purchase";
import FileUpdate from '@/components/FileUpdate'

export default {
  name: 'PurchaseOrderPopout',
  components: {
    FileUpdate
  },
  data() {
    return {
      PurchaseOrderPopoutdialog: false,
      PurchaseOrdertableDatadialog: false,
      dialogFormVisibleTure: true,
      fileUpdate: false,
      warehouseValue: '',
      formParams: {
        deliveryDate: '',
        Notes: '',
      },
      tableData: [],
      rules: {
        deliveryDate: [{ required: true, message: '收货日期不能为空', trigger: 'blur' }],
        Notes: [{ required: true, message: '备注不能为空', trigger: 'blur' }],
        invoiceDataList: [{ required: true, message: '123154236sdfs', trigger: 'blur' }],
      },
      warehouseOptions: [
        { value: '类型1'},
        { value: '类型2'},
        { value: '类型3'},
      ],
      // 图片信息临时存储
      imgUploadInfoObj: {
        cargoTransfer: [],  
        warehouseReceiptCancellation: [],
        tradeFair: [],
        DETAILEDs : [],
      },
      tableList: [],
      warehouseList:[],
      //上传格式
      FileTypeAccept: [
        { file:".doc", type:"application/msword"},
        { file:".docx", type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
        { file:".xls", type:"application/vnd.ms-excel"},
        { file:".xlsx", type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
        { file:".gif", type:"image/gif"},
        { file:".gz", type:"application/x-gzip"},
        { file:".jpeg", type:"image/jpeg"},
        { file:".jpg", type:"image/jpeg"},
        { file:".pdf", type:"application/pdf"},
        { file:".png", type:"image/png"},
        { file:".tar", type:"application/x-tar"},
        { file:".tgz", type:"application/x-compressed"},
        { file:".zip", type:"application/x-zip-compressed"}, 
        { file:".rar", type:"application/x-rar-compressed"}, 
      ]
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
    this.dialogFormVisibleTure = true
    this.fileUpdate = true
  },
  methods: {
    DataGetList (key) {
      let keyValue
      if (this.keyId != '')
      keyValue = this.keyId
      else
      keyValue = key
      let that = this
      this.PurchaseOrdertableDatadialog = true
      listBatch(this.jsonToURL({pageNum: 1, pageSize: 100, purchaseID: key})).then(response => {
        this.tableData = []
        response.rows.forEach((v, i) => {
          response.rows[i].newChargePacknum = ((((response.rows[i].packnum - response.rows[i].deliveryPacknum) * 1000000).toFixed(0)) / 1000000).toFixed(0)
          response.rows[i].newChargeAmount = ((((response.rows[i].amount - response.rows[i].deliveryAmount) * 1000000).toFixed(4)) / 1000000).toFixed(4)
          response.rows[i].totalAmount = ((((response.rows[i].newChargeAmount * response.rows[i].price) * 1000000).toFixed(2)) / 1000000).toFixed(2)
        })
        this.tableData = response.rows
        // 下拉筛选暂存区
        this.warehouseList = response.rows
        this.warehouseOptions = []
        this.warehouseOptions = this.deteleObject(response.rows, 'corpName')
        this.PurchaseOrdertableDatadialog = false
      });
    },
    imgUploadInfo (row, type) {
      // 图片信息返回
      if (type == 1) {
        this.imgUploadInfoObj.cargoTransfer = row
      } else if (type == 2) {
        this.imgUploadInfoObj.warehouseReceiptCancellation = row
      } else if (type == 3) {
        this.imgUploadInfoObj.tradeFair = row
      } else if (type == 4) {
        this.imgUploadInfoObj.DETAILEDs = row
      }
    },
    RemoveFileDat (row, type) {
      // 图片信息返回
      if (type == 1) {
        this.imgUploadInfoObj.cargoTransfer = row
      } else if (type == 2) {
        this.imgUploadInfoObj.warehouseReceiptCancellation = row
      } else if (type == 3) {
        this.imgUploadInfoObj.tradeFair = row
      } else if (type == 4) {
        this.imgUploadInfoObj.DETAILEDs = row
      }
    },
    formDataFor(obj, file) {
      const formData = new FormData()
      for (const i in obj) {
        formData.append(i, obj[i])
      }
      formData.append('file', file)
      return formData
    },
    PurchaseOrderPopoutSubmit (Object) {
      let that = this
      this.$refs.formParams.validate(valid => {
        if (valid) {
          let NewtableList = []
          if (this.tableList.length == 0) {
            this.msgWarning('至少选择一条批次号数据')
            return
          } else {
            this.tableList.forEach((v,i)=>{
              v.amount = v.newChargeAmount
              v.packnum = v.newChargePacknum
              delete v.newChargePacknum
              delete v.newChargeAmount
              NewtableList.push(v)
            })
          }
          let arr = []
          for (let i in this.imgUploadInfoObj) {
            this.imgUploadInfoObj[i].forEach((v, i) => {
              let {width, height, fileBillType, size, name, file} = v
              arr.push({
                fileBusinessType: 1,
                fileBillType,
                uploadFileCode: file,
                name,
                width,
                height,
                size
              })
            })
          }
          this.interfaceParameters({
            purchaseID: this.keyId,
            // purchaseDeliveryStatus: 2, // 后台让加的
            deliveryDate: this.formParams.deliveryDate?this.formParams.deliveryDate:'',
            notes: this.formParams.Notes?this.formParams.Notes:'',
            detailList: JSON.parse(JSON.stringify(NewtableList)),
            fileList: arr
          })
        }
      })
    },
    interfaceParameters (Obj) {
      this.PurchaseOrderPopoutdialog = true
      purchaseDelivery(Obj).then(response => {
        this.PurchaseOrderPopoutdialog = false
        if (response.code === 200) {
          this.msgSuccess(response.msg);
          this.dialogFormVisible('true')
        } else {
          this.msgError(response.msg);
        }
      });
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
    handleSelectionChange (row) {
      this.tableList = JSON.parse(JSON.stringify(row))
    },
    // scope.row.deliveryPacknum * scope.row.deliveryAmount totalAmount newChargePacknum newChargeAmount
    newChargePacknum (index,row, ele) {
      let Obj = JSON.parse(JSON.stringify(this.tableData))
      Obj[index].newChargePacknum = ele.target.value
      // 算法
      let orderPacknumS = (((((Obj[index].amount / Obj[index].packnum) * Obj[index].newChargePacknum) * 1000000).toFixed(4)) / 1000000).toFixed(4)
      if ((Obj[index].amount - orderPacknumS) > Obj[index].amount) {
        orderPacknumS = Obj[index].amount
      }
      Obj[index].newChargeAmount = orderPacknumS
      Obj[index].totalAmount = ((((Obj[index].newChargeAmount * Obj[index].price) * 1000000).toFixed(2)) / 1000000).toFixed(2)
      this.tableData = Obj
      this.$set(this.tableData,index,Obj[index])
    },
    newChargeAmount (index,row, ele) {
      let Obj = JSON.parse(JSON.stringify(this.tableData))
      Obj[index].newChargeAmount = ele.target.value
      Obj[index].totalAmount = ((((Obj[index].newChargeAmount * Obj[index].price) * 1000000).toFixed(2)) / 1000000).toFixed(2)
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
      } else if (Obj[index].newChargePacknum > Obj[index].packnum) {
        Obj[index].newChargePacknum = Obj[index].packnum
        Obj[index].newChargeAmount = Obj[index].amount
      }
      Obj[index].totalAmount = ((((Obj[index].newChargeAmount * Obj[index].price) * 1000000).toFixed(4)) / 1000000).toFixed(2)
      this.tableData = Obj
      this.$set(this.tableData,index,Obj[index])
    },
    newChargeAmountBlur(index,row, ele){
      let Obj = JSON.parse(JSON.stringify(this.tableData))
      Obj[index].newChargeAmount = ele.target.value
      let orderPacknumS = (((((Obj[index].amount / Obj[index].packnum) * 1) * 1000000).toFixed(4)) / 1000000).toFixed(4)
      if (Obj[index].newChargeAmount <= 0) {
        Obj[index].newChargeAmount = orderPacknumS
      } else if (Obj[index].newChargePacknum == '') {
        Obj[index].newChargeAmount = orderPacknumS
      } else if (Obj[index].newChargeAmount > Obj[index].amount) {
        Obj[index].newChargeAmount = Obj[index].amount
      }
      Obj[index].totalAmount = ((((Obj[index].newChargeAmount * Obj[index].price) * 1000000).toFixed(4)) / 1000000).toFixed(2)
      this.tableData = Obj
      this.$set(this.tableData,index,Obj[index])
    },
    dialogFormVisible (str) {
      this.dialogFormVisibleTure = false
      if (str == 'true')
      this.$emit('purchaseOrderPopoutObjFunc', str)
      else
      this.$emit('purchaseOrderPopoutObjFunc',)
    }
  }
};
</script>
<style lang="less">
  #purchaseOrderPopout .avatar-orderDetailImgs-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  #purchaseOrderPopout .el-upload-list li:first-child{
    margin: 0;
  }
  #purchaseOrderPopout .el-upload-list{
    width: 100%;
  }
  #purchaseOrderPopout .el-upload-list--picture .el-upload-list__item{
    float: left;
    width: 80px;
    margin: 0 10px;
  }
  #purchaseOrderPopout .el-upload-list--picture .el-upload-list__item-name{
    display: none;
  }
  #purchaseOrderPopout .el-upload-dragger{
    width: 100px;
    height: 100px;
  }
  #purchaseOrderPopout {
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
