/**
 * 数据本地存储
 */

import store from '../store/store'
import {hashUtils} from './dataUtils'

export async function dataLocalStorage() {
  try {
    // 0. 从userAbout中获取userData，存储在userStore
    let user = JSON.parse(JSON.stringify(store.state.userAbout.userData))
    console.log("保存用户数据：", JSON.stringify(user))
    await window.api.electronStore.userStore.setUserInfo(user)

    // 1. 从tagABout中获取tagList，存储在tagStore
    let tag = JSON.parse(JSON.stringify(store.state.tagAbout.userTags))
    await window.api.electronStore.tagStore.setTag(tag)

    // 2. 从planAbout中获取planList，存储在planStore
    let plan = JSON.parse(JSON.stringify(store.state.planAbout.planData))
    await window.api.electronStore.planStore.setPlan(plan)

    // 3. 从diaryAbout中获取diaryList，存储在diaryStore
    let diary = JSON.parse(JSON.stringify(store.state.diaryAbout.diaryData))
    await window.api.electronStore.diaryStore.setDiary(diary)

    // 4. 从insAbout中获取insList，存储在insStore
    let ins = JSON.parse(JSON.stringify(store.state.insAbout.insData))
    await window.api.electronStore.insStore.setIns(ins)

    // 更新本地用户同步元数据
    let oldSyncMeta = JSON.parse(localStorage.getItem('userSyncMeta'))
    let newDataHash = hashUtils.generateHash({userId: user.userId, dataVersion: oldSyncMeta.dataVersion + 1})
    let newSyncMeta = {userId: user.userId, dataVersion: oldSyncMeta.dataVersion + 1, dataHash: newDataHash}
    localStorage.setItem('userSyncMeta',JSON.stringify(newSyncMeta))
    await window.api.electronStore.userStore.setUserSyncMeta(newSyncMeta)
  } catch(err) {
    throw new Error(`数据本地存储失败:${err}`)
  }
}
