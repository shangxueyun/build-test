import request from '@/utils/request'

// 设置header

// 公用文件上传接口
export function uploadResourceFile(data) {
  return request({
    url: '/bas/staticResourceFile/uploadResourceFile',
    method: 'post',
    data
  })
}