import store from '../store/store'
import { userAPI, tagAPI, planAPI, diaryAPI, insAPI, syncMetaAPI } from '../utils/api'

export async function dataRemoteStorage() {
  try {
    const user = JSON.parse(JSON.stringify(store.state.userAbout.userData))
    if (!user?.userId) {
      return
    }

    await userAPI.updateUserInfo(user)

    const tag = JSON.parse(JSON.stringify(store.state.tagAbout.userTags))
    await Promise.all(tag.map(item => tagAPI.createTag(item)))

    const plan = JSON.parse(JSON.stringify(store.state.planAbout.planData))
    await Promise.all(plan.map(item => planAPI.createPlan(item)))

    const diary = JSON.parse(JSON.stringify(store.state.diaryAbout.diaryData))
    await Promise.all(diary.map(item => diaryAPI.createDiary(item)))

    const ins = JSON.parse(JSON.stringify(store.state.insAbout.insData))
    await Promise.all(ins.map(item => insAPI.createIns(item)))

    const syncMeta = await syncMetaAPI.updateSyncMeta(user.userId)
    const newSyncMeta = {
      userId: user.userId,
      dataVersion: syncMeta?.data_version,
      dataHash: syncMeta?.data_hash,
    }
    localStorage.setItem('userSyncMeta', JSON.stringify(newSyncMeta))
    await window.api.electronStore.userStore.setUserSyncMeta(newSyncMeta)

    ElMessage({
      type: 'success',
      message: '数据同步成功'
    })
  } catch (err) {
    ElMessage({
      type: 'error',
      message: '数据同步失败'
    })
    throw new Error(`数据远程同步失败:${err}`)
  }
}
