import request from '@/utils/request'

// 查询会员列表
export function listMember(query) {
  return request({
    url: '/bas/member/list?' + query,
    method: 'get'
  })
}

// 查询会员详细
export function getMember(memberID) {
  return request({
    url: '/bas/member/' + memberID,
    method: 'get'
  })
}

// 新增会员
export function addMember(data) {
  return request({
    url: '/bas/member',
    method: 'post',
    data: data
  })
}

// 修改会员
export function updateMember(data) {
  return request({
    url: '/bas/member',
    method: 'put',
    data: data
  })
}

// 删除会员
export function delMember(memberID) {
  return request({
    url: '/bas/member/' + memberID,
    method: 'delete'
  })
}

// 导出会员
export function exportMember(query) {
  return request({
    url: '/bas/member/export',
    method: 'get',
    params: query
  })
}

// 根据会员账套查询会员列表
export function listMemberByAccountRel(query) {
  return request({
    url: '/bas/member/list_by_account_rel',
    method: 'get',
    params: query
  })
}
