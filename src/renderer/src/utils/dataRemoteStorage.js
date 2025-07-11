/**
 * 数据远程存储
 */

import store from '../store/store'
import { userAPI, tagAPI, planAPI, diaryAPI, insAPI, syncMetaAPI } from '../utils/api'
import * as syncMeta from "./api/modules/syncMeta";

// TODO: 后续前后端同步时用于有针对性地向后端同步数据
export async function dataRemoteStorage() {
  try {
    // 0. 从userAbout中获取userData，同步至服务器
    let user = JSON.parse(JSON.stringify(store.state.userAbout.userData))
    console.log("保存用户数据：", JSON.stringify(user))
    await userAPI.updateUserInfo(user)
    console.log('用户数据同步完毕')

    // 1. 从tagABout中获取tagList，同步至服务器
    let tag = JSON.parse(JSON.stringify(store.state.tagAbout.userTags))
    let tagPromises = tag.map(tag => tagAPI.createTag(tag))
    await Promise.all(tagPromises);
    console.log('标签数据同步完毕')

    // 2. 从planAbout中获取planList，同步至服务器
    let plan = JSON.parse(JSON.stringify(store.state.planAbout.planData))
    let planPromises = plan.map(plan => planAPI.createPlan(plan))
    await Promise.all(planPromises);
    console.log('计划数据同步完毕')

    // 3. 从diaryAbout中获取diaryList，同步至服务器
    let diary = JSON.parse(JSON.stringify(store.state.diaryAbout.diaryData))
    let diaryPromises = diary.map(diary => diaryAPI.createDiary(diary))
    await Promise.all(diaryPromises);
    console.log('日记数据同步完毕')

    // 4. 从insAbout中获取insList，同步至服务器
    let ins = JSON.parse(JSON.stringify(store.state.insAbout.insData))
    let insPromises = ins.map(ins => insAPI.createIns(ins))
    await Promise.all(insPromises);
    console.log('灵感数据同步完毕')

    // TODO：通知服务器更新用户同步元数据
    await syncMetaAPI.updateSyncMeta(user.userId)
    console.log('已通知服务器更新用户同步元')

    ElMessage({
      type: 'success',
      message: '数据同步成功'
    })
  } catch(err) {
    ElMessage({
      type: 'error',
      message: '数据同步失败'
    })
    throw new Error(`数据远程同步失败:${err}`)
  }

}
