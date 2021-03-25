<template>
  <div class="avatar-uploader__" style="position: relative;">
    <el-upload
      v-if="!config.showFileList"
      :ref="config.refs"
      class="avatar-uploader"
      date-value="listImg"
      :style="config.styleCss"
      action="#"
      accept="image/*"
      :show-file-list="config.showFileList"
      :auto-upload="config.autoUpload"
      :before-upload="BeforeAvatarUpload"
      >
        <img :style="`width:${config.imgSizeW}px;height:${config.imgSizeH}px`" v-if="listImg.imageUrl && fileType == 'image'" :src="listImg.imageUrl" class="avatar">
        <video controls="controls" :style="`width:${config.imgSizeW}px;height:${config.imgSizeH}px`" v-if="listImg.imageUrl && fileType == 'video'" :src="listImg.imageUrl" class="avatar"></video>
        <a controls="controls" target="_baock" :style="`width:${config.imgSizeW}px;height:${config.imgSizeH}px;border:1px solid #ccc`" v-if="listImg.imageUrl && fileType != 'video' && fileType != 'image'" class="avatar">Some files cannot be displayed</a>
        <i v-if="!listImg.imageUrl" :style="config.styleCssIocn" class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
    <el-upload
      style="float: left;width: 100%"
      :disabled="disabled"
      v-if="config.showFileList"
      class="avatar-uploader"
      date-value="DetailData"
      action="#"
      accept="image/*"
      :show-file-list="true"
      :auto-upload="false"
      :file-list="DetailImgs"
      list-type="picture"
      :on-change="BeforeAvatarUpload"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus avatar-orderDetailImgs-icon" style="width: 140px;height: 130px;line-height: 130px;"/>
      <div slot="tip" style="line-height: 10px;"></div>
    </el-upload>
    <div class="listImgText" v-if="config.showFileList" :style="`height: 128px;line-height: 60px;margin-left: 150px;position: absolute;`">
      <nav>
        <li v-if="!listImgTextDis && listImg.imageUrl && fileType != 'video' && fileType != 'image'"><a style="color:#1682e6" :href="listImg.imageUrl" target="_baock" >click view</a></li>
        <li v-if="listImgTextDis">文件规格：{{ config.imgSizeW + '*' + config.imgSizeH }}</li>
        <li v-if="listImgTextDis">文件大小：{{ config.imageSize }}</li>
      </nav>
    </div>
    <div class="listImgText" v-if="!config.showFileList" :style="`height: ${config.imgSizeH}px;line-height: ${config.imgSizeH/2}px;margin-left: ${config.imgSizeW}px;`">
      <nav>
        <li v-if="!listImgTextDis && listImg.imageUrl && fileType != 'video' && fileType != 'image'"><a style="color:#1682e6" :href="listImg.imageUrl" target="_baock" >click view</a></li>
        <li v-if="listImgTextDis">图片大小：{{ config.imgSizeW + '*' + config.imgSizeH }}</li>
        <li v-if="listImgTextDis">图片名称：<span :style="config.spanStylecss">{{ listImg.imageName }}</span></li>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listImg: {
        imageUrl: '',
        imageName: '',
      },
      loseDataImg: [],
      DetailImgs: [],
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
    disabled: {
      type: Boolean,
      default: false
    },
    // 
    listImgTextDis:{
      type: Boolean,
      default: true
    },
    fileType: {
      type: String,
      required: false,
      default: 'image'
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
      let arr = this.imgData.split(',')
      arr.forEach((v, i) => {
        let str = v.substr(0, v.lastIndexOf('.'))
        this.DetailImgs.push({
          name: str,
          url: v
        })
      })
      this.fileType = 'image'
    }
  },
  methods: {
    BeforeAvatarUpload(file,fileList) {
      file = file.raw
      let type
      let size
      let fileTypes = file.type
      if (fileTypes.indexOf('image') >=0 ) {
        this.fileType = 'image'
        type = new RegExp('image', "g")
      } else {
        this.msgError('文件格式不正确')
        fileList.pop()
        return false;
      }
      if (fileTypes.indexOf('image') >=0) {
        size = 307200
      } else {
        size = 419430400
      }

      if (fileList.length > 5) {
        this.msgError('只容许上传5个文件')
        fileList.pop()
        return false;
      }

      if (!type.test(fileTypes)) {
        this.msgError('文件格式不正确')
        fileList.pop()
        return false;
      } else if (file.size > size) {
        if (fileTypes.indexOf('image') >=0) {
          this.msgError('文件大小不正确')
          fileList.pop()
          return false;
        } else {
          this.msgError('文件大小不正确')
          fileList.pop()
          return false;
        }
      } else {
        let uid = file.uid
        if (fileTypes.indexOf('image') >=0) {
          this.ImgDocument(file, file.size, uid)
        } else {
          this.ImgDocument(file, file.size, uid, fileTypes)
        }
      }
    },
    handleRemove(file, fileList) {
      this.$emit('imgUploadInfoDel', file)
    },
    // 图片信息获取
    ImgDocument(file, size, uid, type) {
      const reader = new FileReader()
      window.FlgImgsFile = null
      window.$vue = this
      window.FlgImgsFile = {
        url: '',
        size: size,
        uid,
        type: file.name.substr(file.name.lastIndexOf('.') + 1, file.name.length),
        width: '',
        height: '',
        file: file,
        imageName: file.name,
        imageUrl: URL.createObjectURL(file)
      }
      reader.onload = function(evt) {
        if (type) {
          // 返回图片信息
          window.$vue.listImg = window.FlgImgsFile
          window.$vue.$emit('imgUploadInfo', window.FlgImgsFile)
        } else {
          const img = new Image()
          img.src = evt.target.result
          img.onload = function(e) {
            window.FlgImgsFile.width = e.target.width
            window.FlgImgsFile.height = e.target.height
            if (window.$vue.config.imgSizeH == '') {
              // 返回图片信息
              window.$vue.listImg = window.FlgImgsFile
              window.$vue.$emit('imgUploadInfo', window.FlgImgsFile)
            } else {
              if (e.target.height > window.$vue.config.imgSizeH || e.target.width > window.$vue.config.imgSizeW) {
                // 尺寸错误
                // window.$vue.$message.error(window.$vue.msgError('文件尺寸错误'))
                // return false
              }
              // 返回图片信息
              window.$vue.listImg = window.FlgImgsFile
              window.$vue.$emit('imgUploadInfo', window.FlgImgsFile)
            }
          }          
        }
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style>
avatar-uploader__{}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.listImgText li span{
  display: block;
  float: right;
  color:#46a6ff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<style>
  .v-modal{
    z-index: 2000 !important;
  }
  .el-upload-list--picture .el-upload-list__item{
    float: left;
    width: 48%;
    margin-right: 10px;
  }
</style>