import request from '@/utils/request'

// 查询用户列表
export function listUser(query) {
  return request({
    url: '/bas/user/list?' + query,
    method: 'get'
  })
}

// 查询用户详细
export function getUser(userID) {
  return request({
    url: '/bas/user/' + userID,
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/bas/user',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/bas/user',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(userID) {
  return request({
    url: '/bas/user/' + userID,
    method: 'delete'
  })
}

// 导出用户
export function exportUser(query) {
  return request({
    url: '/bas/user/export',
    method: 'get',
    params: query
  })
}
