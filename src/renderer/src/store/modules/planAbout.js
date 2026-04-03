import Plan from '../../models/Plan'
import { nanoid } from 'nanoid'
import { dayjs } from 'element-plus'
import store from '../store'

async function persistPlanData(state) {
  await window.api.electronStore.planStore.setPlan(JSON.parse(JSON.stringify(state.planData)))
}

const planApi = {
  sortPlanList(planList) {
    const topPlans = planList.filter(item => item.isTop === 1)
    const normalPlans = planList.filter(item => item.isTop === 0 && item.isDone === 0)
    const donePlans = planList.filter(item => item.isDone === 1)
    return [...topPlans, ...normalPlans, ...donePlans]
  }
}

const planAbout = {
  namespaced: true,
  state: {
    planData: []
  },
  actions: {
    setData(context, value) {
      context.commit('setData', value)
    },
    saveDataLocal() {},
    saveDataRemote() {},
    addPlan(context, value) {
      const planId = value.planId || nanoid()
      const userId = store.getters['userAbout/getUserId']
      const planContent = value.planInput
      const planTags = value.planTags || []
      const isDone = value.isDone ?? 0
      const isTop = value.isTop ?? 0
      const startTime = value.curDate || value.startTime || dayjs().format('YYYY-MM-DD')
      const endTime = value.endTime || ''
      const plan = new Plan(planId, userId, planContent, planTags, isDone, isTop, startTime, endTime)
      context.commit('addPlan', plan)
    },
    async deletePlan(context, value) {
      const index = context.state.planData.findIndex(item => item.planId === value)
      context.commit('deletePlan', index)
      await persistPlanData(context.state)
    },
    async deletePlanBatch(context, value) {
      let newPlanList = []
      if (value !== '') {
        newPlanList = context.state.planData.filter(item => !(item.isDone === 1 && item.startTime === value))
      } else {
        newPlanList = context.state.planData.filter(item => item.isDone === 0)
      }
      context.commit('deletePlanBatch', newPlanList)
      await persistPlanData(context.state)
    },
    changeTopStatus(context, value) {
      context.commit('changeTopStatus', value)
    },
    changeDoneStatus(context, value) {
      context.commit('changeDoneStatus', value)
    },
    editPlanContent(context, value) {
      context.commit('editPlanContent', value)
    },
    editPlanTag(context, value) {
      context.commit('editPlanTag', value)
    },
    deletePlanTag(context, value) {
      context.commit('deletePlanTag', value)
    },
    sortPlan() {},
    resetData(context) {
      context.commit('resetData')
    },
  },
  mutations: {
    setData(state, value) {
      state.planData = Array.isArray(value) ? value : []
    },
    saveDataLocal() {},
    saveDataRemote() {},
    addPlan(state, value) {
      state.planData.unshift(value)
      state.planData = planApi.sortPlanList(state.planData)
    },
    deletePlan(state, value) {
      if (value >= 0) {
        state.planData.splice(value, 1)
      }
    },
    deletePlanBatch(state, value) {
      state.planData = value
    },
    changeTopStatus(state, value) {
      state.planData.forEach(item => {
        if (item.planId === value.planId) {
          item.isTop = value.isTop
        }
      })
      state.planData = planApi.sortPlanList(state.planData)
    },
    changeDoneStatus(state, value) {
      state.planData.forEach(item => {
        if (item.planId === value.planId) {
          item.isDone = value.isDone
        }
      })
      state.planData = planApi.sortPlanList(state.planData)
    },
    editPlanContent(state, value) {
      state.planData.forEach(item => {
        if (item.planId === value.planId) {
          item.planContent = value.planContent
        }
      })
    },
    editPlanTag(state, value) {
      state.planData.forEach(item => {
        if (item.planId === value.planId) {
          item.planTags = value.selectedTag
        }
      })
    },
    deletePlanTag(state, value) {
      state.planData.forEach(plan => {
        plan.planTags = plan?.planTags.filter(tag => tag.tagId !== value) || []
      })
    },
    sortPlan() {},
    resetData(state) {
      state.planData = []
    },
  },
  getters: {
    sortedPlanList(state) {
      return planApi.sortPlanList(state.planData)
    },
    sortedPlanListByDate: (state) => (date) => {
      return planApi.sortPlanList(state.planData.filter(item => item.startTime === date))
    },
    getPlanNumByDate: (state) => (date) => {
      return planApi.sortPlanList(state.planData.filter(item => item.startTime === date)).length
    }
  }
}

export default planAbout
