/**
 * 数据初始化：用户数据加载
 */

import store from '../store/store'
import { tagAPI, planAPI, diaryAPI, insAPI } from '../utils/api'
import { getUserPlanList } from "./api/modules/plan";
import { getUserDiaryList } from "./api/modules/diary";
import { getUserInsList } from "./api/modules/inspiration";
import { pictureInit } from "./pictureInit";

export async function dataInit(userData) {
  try {
    // 0.初始化userStore
    await window.api.electronStore.appStore.setUserStore(userData.userId)

    // 将用户信息存储到userStore
    await window.api.electronStore.userStore.setUserInfo(userData)

    // 1.获取用户信息,存储在userAbout
    let userId = userData.userId
    await store.dispatch('userAbout/addUser',userData)

    // 2.获取tag，存储在tagAbout
    let userTag = await window.api.electronStore.tagStore.getTag()
    if(userTag.length===0) {
      userTag = await tagAPI.getUserTagList(userId)
    }
    await store.dispatch('tagAbout/setData',userTag)

    // 3.获取plan，存储在planAbout
    let planList = await window.api.electronStore.planStore.getPlan()
    if(planList.length===0) {
      planList = await planAPI.getUserPlanList(userId)
    }
    await store.dispatch('planAbout/setData',planList)

    // 4.获取diary，存储在diaryAbout
    let diaryList = await window.api.electronStore.diaryStore.getDiary()
    if(diaryList.length===0) {
      diaryList = await diaryAPI.getUserDiaryList(userId)
    }
    await store.dispatch('diaryAbout/setData',diaryList)

    // 5.获取ins，存储在insAbout
    let insList = await window.api.electronStore.insStore.getIns()
    if(insList.length===0) {
      insList = await insAPI.getUserInsList(userId)
    }
    await store.dispatch('insAbout/setData',insList)

    // 6.初始化图片基本数据
    await pictureInit(userId)
  } catch(err) {
    throw new Error('数据初始化失败')
  }
}
