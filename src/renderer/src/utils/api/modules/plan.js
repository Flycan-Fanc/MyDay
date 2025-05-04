/**
 * 计划接口
 */

import httpClient from "../httpClient";

// 创建计划
export const createPlan = (planData) => {
  return httpClient.post('/plan', { ...planData })
}

// 获取单个计划
export const getPlan = (planId) => {
  return httpClient.get(`/plan/${planId}`)
}

// 获取用户计划列表
export const getUserPlanList = (userId) => {
  return httpClient.get(`/plan/list/${userId}`)
}

// 修改计划
export const updatePlan = (planData) => {
  return httpClient.post('/plan/update', { ...planData })
}

// 删除计划
export const deletePlan = (planId) => {
  return httpClient.delete(`/plan/${planId}`)
}

