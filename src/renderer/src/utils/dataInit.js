import store from '../store/store'
import { tagAPI, planAPI, diaryAPI, insAPI, syncMetaAPI } from '../utils/api'
import { pictureInit } from './pictureInit'

function shouldFetchRemote(localValue, hasLocalSyncMeta) {
  if (hasLocalSyncMeta) {
    return false
  }

  return !Array.isArray(localValue) || localValue.length === 0
}

export async function dataInit(userData) {
  try {
    await window.api.electronStore.appStore.setUserStore(userData.userId)
    await window.api.electronStore.userStore.setUserInfo(userData)

    const userId = userData.userId
    await store.dispatch('userAbout/addUser', userData)

    let userSyncMeta = await window.api.electronStore.userStore.getUserSyncMeta()
    const hasLocalSyncMeta = !!userSyncMeta
    if (!userSyncMeta) {
      userSyncMeta = await syncMetaAPI.getSyncMeta(userData.userId)
    }
    localStorage.setItem('userSyncMeta', JSON.stringify(userSyncMeta))
    await store.dispatch('syncAbout/initialize', {
      localVersion: Number(userSyncMeta?.dataVersion ?? 0),
      remoteVersion: Number(userSyncMeta?.dataVersion ?? 0),
      hasRemote: !!userSyncMeta,
    })

    let userTag = await window.api.electronStore.tagStore.getTag()
    if (shouldFetchRemote(userTag, hasLocalSyncMeta)) {
      userTag = await tagAPI.getUserTagList(userId)
    }
    await store.dispatch('tagAbout/setData', userTag)

    let planList = await window.api.electronStore.planStore.getPlan()
    if (shouldFetchRemote(planList, hasLocalSyncMeta)) {
      planList = await planAPI.getUserPlanList(userId)
    }
    await store.dispatch('planAbout/setData', planList)

    let diaryList = await window.api.electronStore.diaryStore.getDiary()
    if (shouldFetchRemote(diaryList, hasLocalSyncMeta)) {
      diaryList = await diaryAPI.getUserDiaryList(userId)
    }
    await store.dispatch('diaryAbout/setData', diaryList)

    let insList = await window.api.electronStore.insStore.getIns()
    if (shouldFetchRemote(insList, hasLocalSyncMeta)) {
      insList = await insAPI.getUserInsList(userId)
    }
    await store.dispatch('insAbout/setData', insList)

    await pictureInit(userId, { trustLocalEmpty: hasLocalSyncMeta })
  } catch (err) {
    throw new Error('数据初始化失败')
  }
}
