/**
 * @description: 计划store
 */

import Plan from '../../models/Plan'

import {nanoid} from 'nanoid'

const planAbout = {
  namespaced:true,
  state:{
    planData:[
      {
        planId: 1,
        userId: 1,
        planContent: '制作活动策划书',
        planTags: [
          { tagId: 1, tagName: '#工作', tagColor: '#ff0000' },
          { tagId: 2, tagName: '#学习', tagColor: '#00ff00' },
          { tagId: 3, tagName: '#娱乐', tagColor: '#0000ff' }
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
          { tagId: 1, tagName: '#工作', tagColor: '#ff0000' },
          { tagId: 2, tagName: '#学习', tagColor: '#00ff00' },
          { tagId: 3, tagName: '#娱乐', tagColor: '#0000ff' }
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
          { tagId: 1, tagName: '#工作', tagColor: '#ff0000' },
          { tagId: 2, tagName: '#学习', tagColor: '#00ff00' },
          { tagId: 3, tagName: '#娱乐', tagColor: '#0000ff' }
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
          { tagId: 1, tagName: '#工作', tagColor: '#ff0000' },
          { tagId: 2, tagName: '#学习', tagColor: '#00ff00' },
          { tagId: 3, tagName: '#娱乐', tagColor: '#0000ff' }
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
          { tagId: 1, tagName: '#工作', tagColor: '#ff0000' },
          { tagId: 2, tagName: '#学习', tagColor: '#00ff00' },
          { tagId: 3, tagName: '#娱乐', tagColor: '#0000ff' }
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
          { tagId: 1, tagName: '#工作', tagColor: '#ff0000' },
          { tagId: 2, tagName: '#学习', tagColor: '#00ff00' },
          { tagId: 3, tagName: '#娱乐', tagColor: '#0000ff' }
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
          { tagId: 1, tagName: '#工作', tagColor: '#ff0000' },
          { tagId: 2, tagName: '#学习', tagColor: '#00ff00' },
          { tagId: 3, tagName: '#娱乐', tagColor: '#0000ff' }
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
          { tagId: 1, tagName: '#工作', tagColor: '#ff0000' },
          { tagId: 2, tagName: '#学习', tagColor: '#00ff00' },
          { tagId: 3, tagName: '#娱乐', tagColor: '#0000ff' }
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
    deletePlan(){},
    /**
     * 修改计划置顶状态
     */
    changeTopStatus(){},
    /**
     * 修改计划完成状态
     */
    changeDoneStatus(){},
    /**
     * 编辑计划标签
     */
    editPlanTag(){},
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
      state.planData.push(value);
    },
    /**
     * 删除计划
     */
    deletePlan(){},
    /**
     * 修改计划置顶状态
     */
    changeTopStatus(){},
    /**
     * 修改计划完成状态
     */
    changeDoneStatus(){},
    /**
     * 编辑计划标签
     */
    editPlanTag(){},
    /**
     * 排序计划
     */
    sortPlan(){},
  }
}

export default planAbout;
