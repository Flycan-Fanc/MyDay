/**
 * @description: 计划store
 */

import Plan from '../../models/Plan'

import {nanoid} from 'nanoid'

const planApi = {
  // TODO:置顶的，正常的，完成的，每组按照什么顺序排序？
  sortPlanList(planList){
    let newPlanList = [];
    let topPlans = planList.filter(item=>item.isTop===1)
    let normalPlans = planList.filter(item=>item.isTop===0 && item.isDone===0)
    let donePlans = planList.filter(item=>item.isDone===1)
    return newPlanList = [...topPlans,...normalPlans,...donePlans]
  }
}

const planAbout = {
  namespaced:true,
  state:{
    planData:[
      {
        planId: 1,
        userId: 1,
        planContent: '制作活动策划书',
        planTags: [
          { tagId: 1, tagName: '#工作', color: '#ff0000' },
          { tagId: 2, tagName: '#学习', color: '#00ff00' },
          { tagId: 3, tagName: '#娱乐', color: '#0000ff' }
        ],
        isDone: 0,
        isTop: 0,
        startTime: '2023-04-01',
        endTime: '2023-04-05'
      },
      {
        planId: 2,
        userId: 1,
        planContent: '制作活动策划书',
        planTags: [
          { tagId: 1, tagName: '#工作', color: '#ff0000' },
          { tagId: 2, tagName: '#学习', color: '#00ff00' },
          { tagId: 3, tagName: '#娱乐', color: '#0000ff' }
        ],
        isDone: 0,
        isTop: 1,
        startTime: '2023-04-01',
        endTime: '2023-04-05'
      },
      {
        planId: 3,
        userId: 1,
        planContent: '制作活动策划书',
        planTags: [
          { tagId: 1, tagName: '#工作', color: '#ff0000' },
          { tagId: 2, tagName: '#学习', color: '#00ff00' },
          { tagId: 3, tagName: '#娱乐', color: '#0000ff' }
        ],
        isDone: 1,
        isTop: 0,
        startTime: '2023-04-01',
        endTime: '2023-04-05'
      },
      {
        planId: 4,
        userId: 1,
        planContent: '制作活动策划书',
        planTags: [
          { tagId: 1, tagName: '#工作', color: '#ff0000' },
          { tagId: 2, tagName: '#学习', color: '#00ff00' },
          { tagId: 3, tagName: '#娱乐', color: '#0000ff' }
        ],
        isDone: 1,
        isTop: 0,
        startTime: '2023-04-01',
        endTime: '2023-04-05'
      },
      {
        planId: 5,
        userId: 1,
        planContent: '制作活动策划书',
        planTags: [
          { tagId: 1, tagName: '#工作', color: '#ff0000' },
          { tagId: 2, tagName: '#学习', color: '#00ff00' },
          { tagId: 3, tagName: '#娱乐', color: '#0000ff' }
        ],
        isDone: 1,
        isTop: 0,
        startTime: '2023-04-01',
        endTime: '2023-04-05'
      },
      {
        planId: 6,
        userId: 1,
        planContent: '制作活动策划书',
        planTags: [
          { tagId: 1, tagName: '#工作', color: '#ff0000' },
          { tagId: 2, tagName: '#学习', color: '#00ff00' },
          { tagId: 3, tagName: '#娱乐', color: '#0000ff' }
        ],
        isDone: 1,
        isTop: 0,
        startTime: '2023-04-01',
        endTime: '2023-04-05'
      },
      {
        planId: 7,
        userId: 1,
        planContent: '制作活动策划书',
        planTags: [
          { tagId: 1, tagName: '#工作', color: '#ff0000' },
          { tagId: 2, tagName: '#学习', color: '#00ff00' },
          { tagId: 3, tagName: '#娱乐', color: '#0000ff' }
        ],
        isDone: 1,
        isTop: 0,
        startTime: '2023-04-01',
        endTime: '2023-04-05'
      },
      {
        planId: 8,
        userId: 1,
        planContent: '制作活动策划书',
        planTags: [
          { tagId: 1, tagName: '#工作', color: '#ff0000' },
          { tagId: 2, tagName: '#学习', color: '#00ff00' },
          { tagId: 3, tagName: '#娱乐', color: '#0000ff' }
        ],
        isDone: 1,
        isTop: 0,
        startTime: '2023-04-01',
        endTime: '2023-04-05'
      }
    ]
  },
  actions:{
    /**
     * 获取计划列表
     */
    fetchData(){
      // TODO: 从本地或者远程获取计划列表
    },
    /**
     * 存储计划列表到本地
     */
    saveDataLocal(){},
    /**
     * 存储计划列表到远程数据库
     */
    saveDataRemote(){},
    /**
     * 添加计划
     */
    addPlan(context,value){
      let planId = nanoid()
      // TODO:后续引入实际用户数据
      let userId = nanoid()
      let planContent = value
      let planTags = []
      let isDone = 0
      let isTop = 0
      // TODO:后续增加计划起止时间的功能
      let startTime = ''
      let endTime = ''
      let plan = new Plan(
        planId,userId,planContent,planTags,isDone,isTop,startTime,endTime
      );

      context.commit('addPlan',plan)
    },
    /**
     * 删除计划
     */
    deletePlan(context,value){
      let index = context.state.planData.findIndex(item=>item.planId === value)
      context.commit('deletePlan',index)
    },
    /**
     * 批量删除计划
     */
    deletePlanBatch(context,value){
      let newPlanList = context.state.planData.filter(item=>item.isDone === 0)
      context.commit('deletePlanBatch',newPlanList)
    },
    /**
     * 修改计划置顶状态
     */
    changeTopStatus(context,value){
      context.commit('changeTopStatus',value)
    },
    /**
     * 修改计划完成状态
     */
    changeDoneStatus(context,value){
      context.commit('changeDoneStatus',value)
    },
    /**
     * 编辑计划内容
     */
    editPlanContent(context,value){
      context.commit('editPlanContent',value)
    },
    /**
     * 编辑计划标签
     */
    editPlanTag(context,value){
      console.log('冬瓜！！！')
      context.commit('editPlanTag',value)
    },
    /**
     * 排序计划
     */
    sortPlan(){},
  },
  mutations:{
    /**
     * 设置计划列表
     */
    setData(){},
    /**
     * 存储计划列表到本地
     */
    saveDataLocal(){},
    /**
     * 存储计划列表到远程数据库
     */
    saveDataRemote(){},
    /**
     * 添加计划
     */
    addPlan(state,value){
      state.planData.unshift(value);
      // TODO:重新排序列表
      state.planData = planApi.sortPlanList(state.planData)
      console.log("sorted:"+JSON.stringify(state.planData))
    },
    /**
     * 删除计划
     */
    deletePlan(state,value){
      state.planData.splice(value,1)
    },
    /**
     * 批量删除计划
     */
    deletePlanBatch(state,value){
      state.planData = value;
    },
    /**
     * 修改计划置顶状态
     */
    changeTopStatus(state,value){
      state.planData.map(item=>{
        if(item.planId === value.planId){
          item.isTop = value.isTop
        }
      })
      console.log("state:"+value.isTop)
      // TODO:重新排序
      state.planData = planApi.sortPlanList(state.planData)
    },
    /**
     * 修改计划完成状态
     */
    changeDoneStatus(state,value){
      state.planData.map(item=>{
        if(item.planId === value.planId){
          item.isDone = value.isDone
        }
      })
      // TODO:置顶的，正常的，完成的，每组按照什么顺序排序？
      state.planData = planApi.sortPlanList(state.planData)
    },
    /**
     * 编辑计划内容
     */
    editPlanContent(state,value){
      state.planData.forEach(item=>{
        if(item.planId===value.planId){
          item.planContent = value.planContent
        }
      })
    },
    /**
     * 编辑计划标签
     */
    editPlanTag(state,value){
      console.log("editPlanTag:"+JSON.stringify(value))
      state.planData.forEach(item=>{
        if(item.planId === value.planId){
          // TODO:后续可以优化一下，只修改变化的标签部分
          item.planTags = value.selectedTag
        }
      })
      console.log("editPlanTag:"+JSON.stringify(state.planData.filter(item=>item.planId === value.planId)))
    },
    /**
     * 排序计划
     */
    sortPlan(){},
  },
  getters:{
    sortedPlanList(state){
      return planApi.sortPlanList(state.planData)
    }
  }
}

export default planAbout;
