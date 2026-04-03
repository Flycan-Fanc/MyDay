import Inspiration from '../../models/Inspiration'
import { stringUtils } from '../../utils/dataUtils'
import { nanoid } from 'nanoid'
import store from '../store'

async function persistInsData(state) {
  await window.api.electronStore.insStore.setIns(JSON.parse(JSON.stringify(state.insData)))
}

const insAbout = {
  namespaced: true,
  state: {
    insData: []
  },
  actions: {
    setData(context, value) {
      context.commit('setData', value)
    },
    saveDataLocal() {},
    saveDataRemote() {},
    addIns(context, value) {
      const insId = value.insId || nanoid()
      const userId = store.getters['userAbout/getUserId']
      const insTitle = value.insTitle
      const insContent = value.insContent
      const insDate = value.insDate
      const insTags = value.insTags || []
      const insCover = value.insCover
      const ins = new Inspiration(insId, userId, insTitle, insContent, insDate, insTags, insCover)
      context.commit('addIns', ins)
    },
    async deleteIns(context, value) {
      const index = context.state.insData.findIndex(item => item.insId === value)
      context.commit('deleteIns', index)
      await persistInsData(context.state)
    },
    async deleteInsBatch(context, value) {
      const newInsList = context.state.insData.filter(item => !value.includes(item.insId))
      context.commit('deleteInsBatch', newInsList)
      await persistInsData(context.state)
    },
    editIns(context, value) {
      const newIns = {
        insId: value.insId,
        userId: value.userId,
        insTitle: value.insTitle,
        insContent: value.insContent,
        insDate: value.insDate,
        insTags: value.insTags || [],
        insCover: value.insCover,
      }
      context.commit('editIns', newIns)
    },
    deleteInsTag(context, value) {
      context.commit('deleteInsTag', value)
    },
    resetData(context) {
      context.commit('resetData')
    },
  },
  mutations: {
    setData(state, value) {
      state.insData = Array.isArray(value) ? value : []
    },
    saveDataLocal() {},
    saveDataRemote() {},
    addIns(state, value) {
      if (state.insData.some(item => item.insId === value.insId)) {
        state.insData.forEach(item => {
          if (item.insId === value.insId) {
            item.insTitle = value.insTitle
            item.insContent = value.insContent
            item.insDate = value.insDate
            item.insTags = value.insTags || []
            item.insCover = value.insCover
          }
        })
      } else {
        state.insData.push(value)
      }
    },
    deleteIns(state, value) {
      if (value >= 0) {
        state.insData.splice(value, 1)
      }
    },
    deleteInsBatch(state, value) {
      state.insData = value
    },
    editIns(state, value) {
      state.insData = state.insData.map(item => item.insId === value.insId ? value : item)
    },
    deleteInsTag(state, value) {
      state.insData.forEach(ins => {
        ins.insTags = ins?.insTags.filter(tag => tag.tagId !== value) || []
      })
    },
    resetData(state) {
      state.insData = []
    },
  },
  getters: {
    insListByDate: (state) => (date) => {
      return state.insData.filter(item => item.insDate === date)
    },
    fuzzySearchInsList: (state) => (fuzzySearch) => {
      return state.insData.filter(item => stringUtils.isFuzzyMatch(item.insTitle, fuzzySearch))
    }
  }
}

export default insAbout
