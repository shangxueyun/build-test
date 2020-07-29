import request from '@/utils/request'

// 查询表格列列表
export function listColumn(query) {
  return request({
    url: '/system/column/list',
    method: 'get',
    params: query
  })
}

// 新增参数配置
export function updateColumn(data) {
  return request({
    url: '/system/column/save',
    method: 'post',
    data: data
  })
}
