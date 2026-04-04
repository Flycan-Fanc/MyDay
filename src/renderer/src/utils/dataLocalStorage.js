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
    const syncState = store.state.syncAbout || {}
    const persistedVersion = Number(oldSyncMeta.dataVersion ?? 0)
    const stateLocalVersion = Number(syncState.localVersion ?? persistedVersion)
    const stateRemoteVersion = Number(syncState.remoteVersion ?? persistedVersion)
    const shouldPersistPendingVersion = ['pending', 'error', 'local_only'].includes(syncState.status)
    const nextVersion = shouldPersistPendingVersion
      ? Math.max(stateLocalVersion, stateRemoteVersion, persistedVersion)
      : persistedVersion
    const newDataHash = hashUtils.generateHash({ userId: user.userId, dataVersion: nextVersion })
    const newSyncMeta = { userId: user.userId, dataVersion: nextVersion, dataHash: newDataHash }
    localStorage.setItem('userSyncMeta', JSON.stringify(newSyncMeta))
    await window.api.electronStore.userStore.setUserSyncMeta(newSyncMeta)
    if (shouldPersistPendingVersion) {
      await store.dispatch('syncAbout/markPending', {
        localVersion: nextVersion,
        remoteVersion: stateRemoteVersion,
        detail: '\u5f85\u540c\u6b65',
      })
    } else {
      await store.dispatch('syncAbout/markSynced', {
        localVersion: nextVersion,
        remoteVersion: stateRemoteVersion,
        detail: '\u5df2\u540c\u6b65',
      })
    }
  } catch (err) {
    throw new Error(`数据本地存储失败:${err}`)
  }
}
