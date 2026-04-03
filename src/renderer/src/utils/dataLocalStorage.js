import store from '../store/store'
import { hashUtils } from './dataUtils'

export async function dataLocalStorage() {
  try {
    const user = JSON.parse(JSON.stringify(store.state.userAbout.userData))
    if (!user?.userId) {
      return
    }

    await window.api.electronStore.userStore.setUserInfo(user)

    const tag = JSON.parse(JSON.stringify(store.state.tagAbout.userTags))
    await window.api.electronStore.tagStore.setTag(tag)

    const plan = JSON.parse(JSON.stringify(store.state.planAbout.planData))
    await window.api.electronStore.planStore.setPlan(plan)

    const diary = JSON.parse(JSON.stringify(store.state.diaryAbout.diaryData))
    await window.api.electronStore.diaryStore.setDiary(diary)

    const ins = JSON.parse(JSON.stringify(store.state.insAbout.insData))
    await window.api.electronStore.insStore.setIns(ins)

    const picture = JSON.parse(JSON.stringify(store.state.pictureAbout.pictureData))
    await window.api.electronStore.pictureStore.setPicture(picture)

    const oldSyncMeta = JSON.parse(localStorage.getItem('userSyncMeta')) || { dataVersion: 0 }
    const nextVersion = oldSyncMeta.dataVersion + 1
    const newDataHash = hashUtils.generateHash({ userId: user.userId, dataVersion: nextVersion })
    const newSyncMeta = { userId: user.userId, dataVersion: nextVersion, dataHash: newDataHash }
    localStorage.setItem('userSyncMeta', JSON.stringify(newSyncMeta))
    await window.api.electronStore.userStore.setUserSyncMeta(newSyncMeta)
  } catch (err) {
    throw new Error(`数据本地存储失败:${err}`)
  }
}
