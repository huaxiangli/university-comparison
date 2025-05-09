import Mock from 'mockjs'
import compareData from './compareData.json'

Mock.setup({
  timeout: '200-600' // 模拟延迟
})

Mock.mock('/api/compare-data', 'get', () => {
  return Mock.mock({
    code: 200,
    message: 'success',
    data: {"test":123}
  })
})

console.log('MockJS已配置，拦截/api/compare-data') // 调试用
