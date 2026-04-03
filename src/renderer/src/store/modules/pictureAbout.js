import { imageUtils } from '../../utils/dataUtils'

function normalizePicture(picture) {
  if (!picture) {
    return picture
  }

  return {
    ...picture,
    pictureId: picture.pictureId ? String(picture.pictureId) : picture.pictureId,
    userId: picture.userId ? String(picture.userId) : picture.userId,
    diaryId: picture.diaryId ? String(picture.diaryId) : picture.diaryId,
    insId: picture.insId ? String(picture.insId) : picture.insId,
    isAvatar: picture.isAvatar === true || picture.isAvatar === 1 || picture.isAvatar === '1',
    isCover: picture.isCover === true || picture.isCover === 1 || picture.isCover === '1',
  }
}

function toMarkdownImageList(data) {
  const items = data.map(item => ({
    miniurl: imageUtils.getLocalImageUrl(item),
    _name: item.pictureName,
    pictureId: item.pictureId,
  }))

  if (items.length === 0) {
    return null
  }

  items.unshift({ miniurl: 'no img at pos 0', _name: 'null' })
  return items
}

const pictureAbout = {
  namespaced: true,
  state: {
    pictureData: []
  },
  actions: {
    setData(context, value) {
      context.commit('setData', value)
    },
    saveDataLocal() {},
    saveDataRemote() {},
    addPicture(context, value) {
      context.commit('addPicture', value)
    },
    deletePicture(context, value) {
      context.commit('deletePicture', value)
    },
    deletePictureBatch(context, value) {
      context.commit('deletePictureBatch', value)
    },
  },
  mutations: {
    setData(state, value) {
      state.pictureData = Array.isArray(value) ? value.map(normalizePicture) : []
    },
    saveDataLocal() {},
    saveDataRemote() {},
    addPicture(state, value) {
      const normalizedValue = normalizePicture(value)
      if (normalizedValue.isCover === true && normalizedValue.insId) {
        state.pictureData = state.pictureData.filter(
          item => !(item.insId === normalizedValue.insId && item.isCover === true && item.pictureId !== normalizedValue.pictureId)
        )
      }
      const existingIndex = state.pictureData.findIndex(item => item.pictureId === normalizedValue.pictureId)
      if (existingIndex >= 0) {
        state.pictureData.splice(existingIndex, 1, normalizedValue)
      } else {
        state.pictureData.push(normalizedValue)
      }
    },
    deletePicture(state, value) {
      state.pictureData = state.pictureData.filter(item => item.pictureId !== value)
    },
    deletePictureBatch(state, value) {
      state.pictureData = state.pictureData.filter(item => !value.includes(item.pictureId))
    },
  },
  getters: {
    fetchDiaryImage: (state) => (id) => {
      return toMarkdownImageList(state.pictureData.filter(item => item.diaryId === String(id) && item.isCover !== true))
    },
    fetchInsImage: (state) => (id) => {
      return toMarkdownImageList(state.pictureData.filter(item => item.insId === String(id) && item.isCover !== true))
    },
    fetchInsCoverPicture: (state) => (id) => {
      return [...state.pictureData]
        .reverse()
        .find(item => item.insId === String(id) && item.isCover === true) || null
    },
    fetchInsCover: (state) => (id) => {
      const cover = [...state.pictureData]
        .reverse()
        .find(item => item.insId === String(id) && item.isCover === true)
      return cover ? imageUtils.getLocalImageUrl(cover) : ''
    },
    fetchPictureById: (state) => (pictureId) => {
      return state.pictureData.find(item => item.pictureId === String(pictureId)) || null
    },
  }
}

export default pictureAbout
