import store from '../store/store'
import { pictureInit } from './pictureInit'
import { insAPI, diaryAPI, planAPI, tagAPI } from './api/index'
import * as syncMetaAPI from './api/modules/syncMeta'
import { hashUtils } from './dataUtils'

export async function dataRemoteFetch(userId, remoteSyncMeta = null, options = {}) {
  const { preferRemote = false } = options

  try {
    await store.dispatch('syncAbout/setSyncing', {
      localVersion: Number(store.state.syncAbout.localVersion ?? 0),
      remoteVersion: Number(remoteSyncMeta?.data_version ?? store.state.syncAbout.remoteVersion ?? 0),
    })

    const remoteUserTag = await tagAPI.getUserTagList(userId)
    await store.dispatch('tagAbout/setData', preferRemote ? remoteUserTag : [...remoteUserTag])

    const remotePlanList = await planAPI.getUserPlanList(userId)
    await store.dispatch('planAbout/setData', preferRemote ? remotePlanList : [...remotePlanList])

    const remoteDiaryList = await diaryAPI.getUserDiaryList(userId)
    await store.dispatch('diaryAbout/setData', preferRemote ? remoteDiaryList : [...remoteDiaryList])

    const remoteInsList = await insAPI.getUserInsList(userId)
    await store.dispatch('insAbout/setData', preferRemote ? remoteInsList : [...remoteInsList])

    await pictureInit(userId, { preferRemote })

    const latestRemoteSyncMeta = remoteSyncMeta || (await syncMetaAPI.getSyncMeta(userId))
    const newSyncMeta = {
      userId,
      dataVersion: latestRemoteSyncMeta?.data_version || 1,
      dataHash: latestRemoteSyncMeta?.data_hash || hashUtils.generateHash({ userId, dataVersion: 1 }),
    }
    localStorage.setItem('userSyncMeta', JSON.stringify(newSyncMeta))
    await window.api.electronStore.userStore.setUserSyncMeta(newSyncMeta)
    await store.dispatch('syncAbout/markSynced', {
      localVersion: Number(newSyncMeta.dataVersion ?? 0),
      remoteVersion: Number(newSyncMeta.dataVersion ?? 0),
      detail: '\u5df2\u540c\u6b65',
    })

    ElMessage({
      type: 'success',
      message: '数据获取成功',
    })
  } catch (err) {
    await store.dispatch('syncAbout/markError', {
      localVersion: Number(store.state.syncAbout.localVersion ?? 0),
      remoteVersion: Number(store.state.syncAbout.remoteVersion ?? 0),
      lastError: err?.message || '\u6570\u636e\u62c9\u53d6\u5931\u8d25',
    })
    ElMessage({
      type: 'error',
      message: '数据获取失败',
    })
    throw new Error('数据拉取失败')
  }
}
