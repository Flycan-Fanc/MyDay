import { nanoid } from 'nanoid'
import Tag from '../../models/Tag'
import store from '../store'

const tagAbout = {
  namespaced: true,
  state: {
    userTags: [],
    selectedTag: [],
    closeTag: [],
  },
  actions: {
    setData(context, value) {
      context.commit('setData', value)
    },
    addTag(context, value) {
      const tagId = nanoid()
      const userId = store.getters['userAbout/getUserId']
      const tagName = value.tagName
      const color = value.color
      const newTag = new Tag(tagId, userId, tagName, color)
      context.commit('addTag', newTag)
    },
    deleteTag(context, value) {
      const index = context.state.userTags.findIndex(item => item.tagId === value)
      context.commit('deleteTag', index)
    },
    editTagName(context, value) {
      const index = context.state.userTags.findIndex(item => item.tagId === value.tagId)
      context.commit('editTagName', { index, newTagName: value.tagName })
    },
    getTagList(context, value) {
      context.commit('getTagList', value)
    },
    addSelectedTag(context, value) {
      context.commit('addSelectedTag', value)
    },
    deleteSelectedTag(context, value) {
      const index = context.state.selectedTag.findIndex(item => item.tagId === value.tagId)
      context.commit('deleteSelectedTag', index)
    },
    clearSelectedTag(context) {
      context.commit('clearSelectedTag')
    },
    addCloseTag(context, value) {
      context.commit('addCloseTag', value)
    },
    clearCloseTag(context) {
      context.commit('clearCloseTag')
    },
    deleteSelectedTagByCloseTag(context) {
      context.commit('deleteSelectedTagByCloseTag')
    },
    resetData(context) {
      context.commit('resetData')
    },
  },
  mutations: {
    setData(state, value) {
      state.userTags = Array.isArray(value) ? value : []
    },
    addTag(state, value) {
      state.userTags.push(value)
    },
    deleteTag(state, value) {
      if (value >= 0) {
        state.userTags.splice(value, 1)
      }
    },
    editTagName(state, value) {
      if (value.index >= 0) {
        state.userTags[value.index].tagName = value.newTagName
      }
    },
    getTagList() {},
    addSelectedTag(state, value) {
      state.selectedTag = value
    },
    deleteSelectedTag(state, value) {
      if (value >= 0) {
        state.selectedTag.splice(value, 1)
      }
    },
    clearSelectedTag(state) {
      state.selectedTag = []
    },
    addCloseTag(state, value) {
      state.closeTag.push(value)
    },
    clearCloseTag(state) {
      state.closeTag = []
    },
    deleteSelectedTagByCloseTag(state) {
      const closeTagId = state.closeTag.map(item => item.tagId)
      state.selectedTag = state.selectedTag.filter(item => !closeTagId.includes(item.tagId))
    },
    resetData(state) {
      state.userTags = []
      state.selectedTag = []
      state.closeTag = []
    },
  },
  getters: {}
}

export default tagAbout
