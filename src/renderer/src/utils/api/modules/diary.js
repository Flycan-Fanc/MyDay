/**
 * 日记接口
 */

import httpClient from "../httpClient";

// 创建日记
export const createDiary = (diaryData) => {
  return httpClient.post('/diary/create',{...diaryData})
}

// 获取单个日记
export const getDiary = (diaryId) => {
  return httpClient.get(`/diary/${diaryId}`)
}

// 获取用户日记列表
export const getUserDiaryList = (userId) => {
  return httpClient.get(`/diary/list/${userId}`)
}

// 修改日记
export const updateDiary = (diaryData) => {
  return httpClient.post('/diary/update',{...diaryData})
}

// 删除日记
export const deleteDiary = (diaryId) => {
  return httpClient.delete(`/diary/${diaryId}`)
}
