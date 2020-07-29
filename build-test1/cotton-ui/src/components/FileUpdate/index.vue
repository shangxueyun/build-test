<template>
  <div>
    <el-upload
      class="avatar-uploader"
      date-value="orderDetailData"
      action="#"
      drag
      :show-file-list="true"
      :auto-upload="false"
      :file-list="DetailImgs"
      list-type="picture"
      :on-change="handlePreview"
      :on-remove="handleRemove"
      >
      <i class="el-icon-plus avatar-orderDetailImgs-icon" />
    </el-upload>
  </div>
</template>

<script>
import { uploadResourceFile } from "@/api/global/updateFile";

export default {
  data() {
    return {
      listImg: {
        imageUrl: '',
        imageName: '',
      },
      DetailImgs: [],
      FileTypeData: []
    }
  },
  props: {
    config: {
      type: Object,
      default: {}
    },
    imgData: {
      type: String,
      default: ''
    },
    //类型fileBillType 1-----货转单 2-----仓单注销清单 3-----交易市场出库单 4-----码单
    ImgType: {
      type: Number,
      default: 0
    },
    // 上传文件类型文件
    updateFileType: {
      type: Number,
      default: 0
    },
    // 
    listImgTextDis:{
      type: Boolean,
      default: true
    },
    accept: {
      type: Array,
      required: false,
      default: []
    },
  },
  computed: {
  },
  watch: {
    fileType(New, worn) {
      this.fileType = New
    }
  },
  created() {
    if (this.imgData) {
      let url
      if (this.disabled) {
        url = this.imgData.substr(0,this.imgData.lastIndexOf('/'))
      } else {
        url = this.imgData
      }
      this.listImg = {
        imageName: this.imgData.substr(0, this.imgData.lastIndexOf('.')),
        imageUrl: url
      }
      this.fileType = 'image'
    }
  },
  methods: {
    // 回显数据处理
    BeforeAvatarUpload(file) {
      let type
      let size
      let fileTypes = file.type
      if (fileTypes.indexOf('video') >=0 ) {
        this.fileType = 'video'
        type = new RegExp('video', "g")
      } else if (fileTypes.indexOf('image') >=0 ) {
        this.fileType = 'image'
        type = new RegExp('image', "g")
      } else {
        this.$message.error(this.$i18n.t('message.PleaseFileType'))
        return false
      }
      if (fileTypes.indexOf('image') >=0) {
        size = 307200
      } else {
        size = 419430400
      }
      if (!type.test(fileTypes)) {
        this.$message.error(this.$i18n.t('message.Uploadformat'))
      } else if (file.size > size) {
        if (fileTypes.indexOf('image') >=0) {
          this.$message.error(this.$i18n.t('message.Uploadsize'))
        } else {
          this.$message.error(this.$i18n.t('message.UploadXLSXsize'))
        }
      } else {
        let uid = file.uid
        // 去除多余
        delete file.uid
        if (fileTypes.indexOf('image') >=0) {
          this.ImgDocument(file, file.size, uid)
        } else {
          this.ImgDocument(file, file.size, uid, fileTypes)
        }
      }
      return false
    },
    handlePreview(file, fileList) {
      // 图片物理填充
      fileList.forEach((v,i) => {
        if (v.raw.name.includes('zip') || v.raw.name.includes('rar')) {
          v.url = require('@/assets/image/zip.png')
        } else if (v.raw.name.includes('doc')) {
          v.url = require('@/assets/image/doc.png')
        } else if (v.raw.name.includes('xls')) {
          v.url = require('@/assets/image/xls.png')
        } else if (v.raw.name.includes('pdf')) {
          v.url = require('@/assets/image/pdf.png')
        }
      })
      const fileDoc = file.raw
      let regStr = file.name.substr(file.name.lastIndexOf('.'))
      let arr = [...this.accept]
      let ble
      arr.forEach((v,i)=>{
        if (v.file == regStr || fileDoc.type == v.type) {
          ble = true
        }
      })
      if (ble) {
        // 去除多余
        delete fileDoc.uid
        // 判断
        // let imgNum = 0
        // this.FileTypeData.forEach((v,i) => {
        //   if (v.file.type.includes('image'))
        //   imgNum ++
        // })
        if (fileDoc.size > 10240000) {
          fileList.pop()
          this.$message.error('文件过大!请从新选择')
        } else {
          this.ImgDocument(fileDoc, 'FileTypeData', fileDoc.size, fileDoc.type)
        }
      } else {
        fileList.pop()
        this.$message.error('不支持该文件类型!')
      }

      return true
    },
    handleRemove(file, fileList) {
      const arr = this.FileTypeData
      let valueflg
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].uid === file.uid) {
          valueflg = i
          continue
        }
      }
      arr.splice(valueflg, 1)
      this.FileTypeData = arr
      this.$emit('RemoveFileDat', arr, this.ImgType)
    },
    // 图片信息获取
    ImgDocument(file, key, size, type) {
      const reader = new FileReader()
      let fileBillType = this.ImgType?this.ImgType:file.name.substr(file.name.lastIndexOf('.') + 1, file.name.length)
      window.FlgImgsFile = null
      window.$vue = this
      window.FlgImgsFile = {
        size,
        fileBillType,
        name : file.name,
        file,
        imageUrl: URL.createObjectURL(file)
      }
      reader.onload = function(evt) {
        if (/image/g.test(type)) {
          const img = new Image()
          img.src = evt.target.result
          img.onload = function(e) {
            window.FlgImgsFile.width = e.target.width
            window.FlgImgsFile.height = e.target.height
            // 返回图片信息
            window.$vue.AiliUpdateFileApi(window.FlgImgsFile, key)
            // if (window.$vue.config.imgSizeH == '') {
            //   // 返回图片信息
            //   window.$vue.listImg = window.FlgImgsFile
            //   window.$vue.$emit('imgUploadInfo', window.FlgImgsFile)
            // } else {
            //   if (e.target.height > window.$vue.config.imgSizeH || e.target.width > window.$vue.config.imgSizeW) {
            //     // 尺寸错误
            //     window.$vue.$message.error(window.$vue.$i18n.t('message.pictureSize'))
            //     return false
            //   }
            //   // 返回图片信息
            //   window.$vue.listImg = window.FlgImgsFile
            //   window.$vue.$emit('imgUploadInfo', window.FlgImgsFile)
            // }
          }
        } else {
          window.$vue.AiliUpdateFileApi(window.FlgImgsFile, key)
        }
      }
      reader.readAsDataURL(file)
    },
    // 获取文件信息之后请求图片接口
    AiliUpdateFileApi (obj = {}, name = '') {
      let formDataFile = new FormData
      formDataFile.append('uploadFile', obj.file)
      formDataFile.append('fileBusinessType', this.updateFileType)
      uploadResourceFile(formDataFile).then(response => {
        if (response.code == 200) {
          window.FlgImgsFile.file = response.data
          window.$vue[name].push(window.FlgImgsFile)
          window.$vue.$emit('imgUploadInfo', window.$vue[name], window.$vue.ImgType)
        } else {
          this.msgError(response.msg);
        }
      });
    }
  }
}
</script>

<style>

</style>
<style>
  .v-modal{
    z-index: 2000 !important;
  }
</style>