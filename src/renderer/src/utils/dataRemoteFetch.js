import store from "../store/store";
import { pictureInit } from "./pictureInit";
import { insAPI, diaryAPI, planAPI, tagAPI } from "./api/index";

import { hashUtils } from "./dataUtils";


export async function dataRemoteFetch(userId) {
  try {
    // 1.获取tag，存储在tagAbout
    let remoteUserTag = await tagAPI.getUserTagList(userId)
    let localUserTag = store.state.tagAbout.userTags
    let mergedTag = []
    remoteUserTag.forEach(tag => {
      if(!localUserTag.some(item=> item.tagId === tag.tagId)) {
        mergedTag.push(tag)
      }
    })
    mergedTag = [...mergedTag, ...localUserTag]
    await store.dispatch('tagAbout/setData',mergedTag)

    // 2.获取plan，存储在planAbout
    let remotePlanList = await planAPI.getUserPlanList(userId)
    let localPlanList = store.state.planAbout.planData
    let mergedPlanList = []
    remotePlanList.forEach(plan => {
      if(!localPlanList.some(item=> item.planId === plan.planId)) {
        mergedPlanList.push(plan)
      }
    })
    mergedPlanList = [...mergedPlanList, ...localPlanList]
    await store.dispatch('planAbout/setData',mergedPlanList)

    // 3.获取diary，存储在diaryAbout
    let remoteDiaryList = await diaryAPI.getUserDiaryList(userId)
    let localDiaryList = store.state.diaryAbout.diaryData
    let mergedDiaryList = []
    remoteDiaryList.forEach(diary => {
      if(!localDiaryList.some(item=> item.diaryId === diary.diaryId)) {
        mergedDiaryList.push(diary)
      }
    })
    mergedDiaryList = [...mergedDiaryList, ...localDiaryList]
    await store.dispatch('diaryAbout/setData',mergedDiaryList)

    // 4.获取ins，存储在insAbout
    let remoteInsList = await insAPI.getUserInsList(userId)
    let localInsList = store.state.insAbout.insData
    let mergedInsList = []
    remoteInsList.forEach(ins => {
      if(!localInsList.some(item=> item.insId === ins.insId)) {
        mergedInsList.push(ins)
      }
    })
    mergedInsList = [...mergedInsList, ...localInsList]
    await store.dispatch('insAbout/setData',mergedInsList)

    // 5.更新图片基本数据
    await pictureInit(userId)

    // 更新本地用户同步元数据
    let oldSyncMeta = JSON.parse(localStorage.getItem('userSyncMeta'))
    let newDataHash = hashUtils.generateHash({userId, dataVersion: oldSyncMeta.dataVersion + 1})
    let newSyncMeta = {userId, dataVersion: oldSyncMeta.dataVersion + 1, dataHash: newDataHash}
    localStorage.setItem('userSyncMeta',JSON.stringify(newSyncMeta))
    await window.api.electronStore.userStore.setUserSyncMeta(newSyncMeta)
    ElMessage({
      type: 'success',
      message: '数据获取成功'
    })
  } catch(err) {
    ElMessage({
      type: 'error',
      message: '数据获取失败'
    })
    throw new Error('数据拉取失败')
  }
}
