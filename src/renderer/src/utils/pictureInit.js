/**
 * 图片初始化：从远程加载图片基本数据
 */

import store from '../store/store'
import { pictureAPI } from '../utils/api'

export async function pictureInit(userId) {
  try {
    const res = await pictureAPI.getUserPictureList(userId)
    store.commit('pictureAbout/setData', res.data)
  } catch (err){
    throw new Error(`图片列表加载失败:${err}`)
  }
}
