import Diary from '../../models/Diary'
import { stringUtils } from '../../utils/dataUtils'
import { nanoid } from 'nanoid'
import store from '../store'

async function persistDiaryData(state) {
  await window.api.electronStore.diaryStore.setDiary(JSON.parse(JSON.stringify(state.diaryData)))
}

const diaryAbout = {
  namespaced: true,
  state: {
    diaryData: []
  },
  actions: {
    setData(context, value) {
      context.commit('setData', value)
    },
    saveDataLocal() {},
    saveDataRemote() {},
    addDiary(context, value) {
      const diaryId = value.diaryId || nanoid()
      const userId = store.getters['userAbout/getUserId']
      const diaryTitle = value.diaryTitle
      const diaryContent = value.diaryContent
      const diaryDate = value.diaryDate
      const diaryTags = value.diaryTags || []
      const diary = new Diary(diaryId, userId, diaryTitle, diaryContent, diaryDate, diaryTags)
      context.commit('addDiary', diary)
    },
    async deleteDiary(context, value) {
      const index = context.state.diaryData.findIndex(item => item.diaryId === value)
      context.commit('deleteDiary', index)
      await persistDiaryData(context.state)
    },
    async deleteDiaryBatch(context, value) {
      const newDiaryList = context.state.diaryData.filter(item => !value.includes(item.diaryId))
      context.commit('deleteDiaryBatch', newDiaryList)
      await persistDiaryData(context.state)
    },
    editDiary(context, value) {
      const newDiary = {
        diaryId: value.diaryId,
        userId: value.userId,
        diaryTitle: value.diaryTitle,
        diaryContent: value.diaryContent,
        diaryDate: value.diaryDate,
        diaryTags: value.diaryTags || [],
      }
      context.commit('addDiary', newDiary)
    },
    resetData(context) {
      context.commit('resetData')
    },
  },
  mutations: {
    setData(state, value) {
      state.diaryData = Array.isArray(value) ? value : []
    },
    saveDataLocal() {},
    saveDataRemote() {},
    addDiary(state, value) {
      if (state.diaryData.some(item => item.diaryId === value.diaryId)) {
        state.diaryData.forEach(item => {
          if (item.diaryId === value.diaryId) {
            item.diaryTitle = value.diaryTitle
            item.diaryContent = value.diaryContent
            item.diaryDate = value.diaryDate
            item.diaryTags = value.diaryTags || []
          }
        })
      } else {
        state.diaryData.push(value)
      }
    },
    deleteDiary(state, value) {
      if (value >= 0) {
        state.diaryData.splice(value, 1)
      }
    },
    deleteDiaryBatch(state, value) {
      state.diaryData = value
    },
    editDiary(state, value) {
      state.diaryData = state.diaryData.map(item => item.diaryId === value.diaryId ? value : item)
    },
    resetData(state) {
      state.diaryData = []
    },
  },
  getters: {
    diaryListByDate: (state) => (date) => {
      return state.diaryData.filter(item => item.diaryDate === date)
    },
    fuzzySearchDiaryList: (state) => (fuzzySearch) => {
      return state.diaryData.filter(item => stringUtils.isFuzzyMatch(item.diaryTitle, fuzzySearch))
    }
  }
}

export default diaryAbout
