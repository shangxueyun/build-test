import request from '@/utils/request'

// 查询订单列表
export function listOrder(query) {
  return request({
    url: '/trd/order/list?' + query,
    method: 'get'
  })
}

// 查询订单详细
export function getOrder(orderID) {
  return request({
    url: '/trd/order/' + orderID,
    method: 'get'
  })
}

// 新增订单
export function addOrder(data) {
  return request({
    url: '/trd/order',
    method: 'post',
    data: data
  })
}

// 修改订单
export function updateOrder(data) {
  return request({
    url: '/trd/order',
    method: 'put',
    data: data
  })
}

// 删除订单
export function delOrder(orderID) {
  return request({
    url: '/trd/order/' + orderID,
    method: 'delete'
  })
}

// 导出订单
export function exportOrder(query) {
  return request({
    url: '/trd/order/export',
    method: 'get',
    params: query
  })
}

// 销售发货
export function orderDelivery(data) {
  return request({
    url: '/trd/order/delivery',
    method: 'post',
    data
  })
}

// 预览提货单
export function orderShowDelivery(data) {
  return request({
    url: '/trd/order/showDelivery',
    method: 'post',
    data
  })
}

// 文件查看
export function orderShowCheck(query) {
  return request({
    url: '/trd/order/check',
    method: 'get',
    params: query
  })
}