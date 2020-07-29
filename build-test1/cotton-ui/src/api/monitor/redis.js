import request from '@/utils/request'

// 查询Redis详细
export function getInfo() {
  return request({
    url: '/monitor/redis/info',
    method: 'get'
  })
}

// 查询Redis Key个数
export function getKeysSize() {
  return request({
    url: '/monitor/redis/keysSize',
    method: 'get'
  })
}

// 查询Redis 内存信息
export function getMemoryInfo() {
  return request({
    url: '/monitor/redis/memoryInfo',
    method: 'get'
  })
}
