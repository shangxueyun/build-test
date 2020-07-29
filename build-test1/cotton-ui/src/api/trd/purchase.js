import request from '@/utils/request'

// 查询采购单列表
export function listPurchase(query) {
  return request({
    url: '/trd/purchase/list?' + query,
    method: 'get',
  })
}

// 查询采购单详细
export function getPurchase(purchaseID) {
  return request({
    url: '/trd/purchase/' + purchaseID,
    method: 'get'
  })
}

// 新增采购单
export function addPurchase(data) {
  return request({
    url: '/trd/purchase',
    method: 'post',
    data: data
  })
}

// 修改采购单
export function updatePurchase(data) {
  return request({
    url: '/trd/purchase',
    method: 'put',
    data: data
  })
}

// 删除采购单
export function delPurchase(purchaseID) {
  return request({
    url: '/trd/purchase/' + purchaseID,
    method: 'delete'
  })
}

// 导出采购单
export function exportPurchase(query) {
  return request({
    url: '/trd/purchase/export',
    method: 'get',
    params: query
  })
}

// 采购单收货提交
export function purchaseDelivery(data) {
  return request({
    url: '/trd/purchase/delivery',
    method: 'post',
    data: data
  })
}
