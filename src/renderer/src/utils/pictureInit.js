import store from '../store/store'
import { pictureAPI } from '../utils/api'

export async function pictureInit(userId, options = {}) {
  const { preferRemote = false, trustLocalEmpty = false } = options

  try {
    const localPictures = await window.api.electronStore.pictureStore.getPicture()
    const normalizedLocalPictures = Array.isArray(localPictures) ? localPictures : []

    if (!preferRemote && (normalizedLocalPictures.length > 0 || trustLocalEmpty)) {
      store.commit('pictureAbout/setData', normalizedLocalPictures)
    }

    if (!preferRemote && trustLocalEmpty) {
      await window.api.electronStore.pictureStore.setPicture(normalizedLocalPictures)
      return
    }

    const res = await pictureAPI.getUserPictureList(userId)
    const remotePictures = Array.isArray(res.data) ? res.data : []

    if (preferRemote) {
      store.commit('pictureAbout/setData', remotePictures)
      await window.api.electronStore.pictureStore.setPicture(remotePictures)
      return
    }

    const pictureMap = new Map()

    normalizedLocalPictures.forEach((item) => {
      if (item?.pictureId) {
        pictureMap.set(String(item.pictureId), item)
      }
    })

    remotePictures.forEach((item) => {
      if (item?.pictureId && !pictureMap.has(String(item.pictureId))) {
        pictureMap.set(String(item.pictureId), item)
      }
    })

    const mergedPictures = Array.from(pictureMap.values())
    store.commit('pictureAbout/setData', mergedPictures)
    await window.api.electronStore.pictureStore.setPicture(mergedPictures)
  } catch (err) {
    throw new Error(`图片列表加载失败:${err}`)
  }
}
