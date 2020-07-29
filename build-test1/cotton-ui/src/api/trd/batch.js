import request from '@/utils/request'

// 查询订单列表
export function listBatch(query) {
  return request({
    url: '/trd/purchase/batch_list?' + query,
    method: 'get'
  })
}
