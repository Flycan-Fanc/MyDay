/**
 * 数据本地存储
 */

import store from '../store/store'

export async function dataLocalStorage() {
  try {
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
  } catch(err) {
    throw new Error(`数据本地存储失败:${err}`)
  }
}
