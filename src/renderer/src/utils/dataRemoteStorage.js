import store from '../store/store'
import { userAPI, tagAPI, planAPI, diaryAPI, insAPI, syncMetaAPI } from '../utils/api'
import { dayjs } from 'element-plus'
import { getSyncMetaVersion, normalizeSyncMeta } from './syncMeta'

function normalizeDateValue(value) {
  if (!value) {
    return ''
  }
  const parsed = dayjs(value)
  return parsed.isValid() ? parsed.format('YYYY-MM-DD') : value
}

function normalizePlanPayload(value = {}) {
  return {
    ...value,
    planTags: Array.isArray(value.planTags) ? value.planTags : [],
    startTime: normalizeDateValue(value.startTime),
    endTime: normalizeDateValue(value.endTime),
  }
}

function normalizeDiaryPayload(value = {}) {
  return {
    ...value,
    diaryTags: Array.isArray(value.diaryTags) ? value.diaryTags : [],
    diaryDate: normalizeDateValue(value.diaryDate),
  }
}

function normalizeInsPayload(value = {}) {
  return {
    ...value,
    insTags: Array.isArray(value.insTags) ? value.insTags : [],
    insDate: normalizeDateValue(value.insDate),
  }
}

export async function dataRemoteStorage() {
  try {
    const user = JSON.parse(JSON.stringify(store.state.userAbout.userData))
    if (!user?.userId) {
      return
    }
    console.info('[dataRemoteStorage] start', { userId: user.userId })

    await store.dispatch('syncAbout/setSyncing', {
      localVersion: Number(store.state.syncAbout.localVersion ?? 0),
      remoteVersion: Number(store.state.syncAbout.remoteVersion ?? 0),
    })

    await userAPI.updateUserInfo(user)

    const tag = JSON.parse(JSON.stringify(store.state.tagAbout.userTags))
    await Promise.all(tag.map(item => tagAPI.createTag(item)))

    const plan = JSON.parse(JSON.stringify(store.state.planAbout.planData)).map(item => normalizePlanPayload(item))
    await Promise.all(plan.map(item => planAPI.createPlan(item)))

    const diary = JSON.parse(JSON.stringify(store.state.diaryAbout.diaryData)).map(item => normalizeDiaryPayload(item))
    await Promise.all(diary.map(item => diaryAPI.createDiary(item)))

    const ins = JSON.parse(JSON.stringify(store.state.insAbout.insData)).map(item => normalizeInsPayload(item))
    await Promise.all(ins.map(item => insAPI.createIns(item)))

    const syncMeta = normalizeSyncMeta(await syncMetaAPI.updateSyncMeta(user.userId))
    const currentLocalSyncMeta = normalizeSyncMeta(JSON.parse(localStorage.getItem('userSyncMeta'))) || {}
    const fallbackVersion = Number(
      currentLocalSyncMeta.dataVersion ??
      store.state.syncAbout.localVersion ??
      store.state.syncAbout.remoteVersion ??
      0
    )
    const resolvedVersion = getSyncMetaVersion(syncMeta, fallbackVersion)
    const newSyncMeta = {
      userId: user.userId,
      dataVersion: resolvedVersion,
      dataHash: syncMeta?.dataHash ?? currentLocalSyncMeta.dataHash,
    }
    localStorage.setItem('userSyncMeta', JSON.stringify(newSyncMeta))
    await window.api.electronStore.userStore.setUserSyncMeta(newSyncMeta)
    await store.dispatch('syncAbout/markSynced', {
      localVersion: resolvedVersion,
      remoteVersion: resolvedVersion,
      detail: '已同步',
    })
    console.info('[dataRemoteStorage] completed', { userId: user.userId, dataVersion: resolvedVersion })

    ElMessage({
      type: 'success',
      message: '数据同步成功'
    })
  } catch (err) {
    await store.dispatch('syncAbout/markError', {
      localVersion: Number(store.state.syncAbout.localVersion ?? 0),
      remoteVersion: Number(store.state.syncAbout.remoteVersion ?? 0),
      lastError: err?.message || '数据同步失败',
    })
    ElMessage({
      type: 'error',
      message: '数据同步失败'
    })
    throw new Error(`数据远程同步失败:${err}`)
  }
}
