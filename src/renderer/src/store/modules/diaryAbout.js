/**
 * @description: 日记store
 */

import Diary from '../../models/Diary'

import {stringUtils} from '../../utils/dataUtils'
import {nanoid} from 'nanoid'

const diaryApi = {}

const diaryAbout = {
  namespaced:true,
  state:{
    diaryData:[
      {
        diaryId: 1,
        userId: 1,
        diaryTitle: "周末登山日记",
        diaryContent: "今天和朋友们一起攀登了云雾山，沿途风景如画...",
        diaryDate: "2025-04-14",
        diaryTags: [
          { tagId: 1, userId: 1, tagName: "旅行", color: "#4CAF50" },
          { tagId: 2, userId: 1, tagName: "健康", color: "#8BC34A" }
        ]
      },
      {
        diaryId: 2,
        userId: 1,
        diaryTitle: "项目会议记录",
        diaryContent: "与团队讨论了新功能开发计划，明确了分工...",
        diaryDate: "2025-04-13",
        diaryTags: [
          { tagId: 1, userId: 2, tagName: "工作", color: "#2196F3" }
        ]
      },
      {
        diaryId: 3,
        userId: 1,
        diaryTitle: "家庭聚餐日",
        diaryContent: "全家一起做了火锅，弟弟带来了他钓的鱼...",
        diaryDate: "2023-01-22",
        diaryTags: [
          { tagId: 1, userId: 3, tagName: "家庭", color: "#FF9800" },
          { tagId: 2, userId: 3, tagName: "美食", color: "#F44336" }
        ]
      },
      {
        diaryId: 4,
        userId: 1,
        diaryTitle: '学习React笔记',
        diaryContent: '今天学习了组件生命周期，整理了核心概念...',
        diaryDate: '2022-11-10',
        diaryTags: [ [Object] ]
      },
      {
        diaryId: 5,
        userId: 1,
        diaryTitle: '烘焙初体验',
        diaryContent: '第一次尝试做戚风蛋糕，虽然塌了但味道不错...',
        diaryDate: '2021-07-19',
        diaryTags: [ [Object], [Object] ]
      },
      {
        diaryId: 6,
        userId: 1,
        diaryTitle: '健身房打卡',
        diaryContent: '坚持锻炼的第三周，终于能完成标准引体向上了！',
        diaryDate: '2020-12-05',
        diaryTags: [ [Object] ]
      },
      {
        diaryId: 7,
        userId: 1,
        diaryTitle: '京都旅行回忆',
        diaryContent: '翻看去年在清水寺的照片，樱花季真的太美了...',
        diaryDate: '2023-03-28',
        diaryTags: [ [Object], [Object] ]
      },
      {
        diaryId: 8,
        userId: 1,
        diaryTitle: '季度工作总结',
        diaryContent: '完成了客户交付的KPI，团队获得表彰...',
        diaryDate: '2022-08-30',
        diaryTags: [ [Object], [Object] ]
      },
      {
        diaryId: 9,
        userId: 1,
        diaryTitle: '亲子游乐园日',
        diaryContent: '带女儿去了新开的主题乐园，她最爱旋转木马...',
        diaryDate: '2021-04-17',
        diaryTags: [ [Object], [Object] ]
      },
      {
        diaryId: 10,
        userId: 1,
        diaryTitle: '深夜读书时光',
        diaryContent: '读完《百年孤独》，被魔幻现实主义深深震撼...',
        diaryDate: '2025-04-13',
        diaryTags: [ [Object], [Object] ]
      }
    ]
  },
  actions:{
    /**
     * 获取日记列表
     */
    fetchData(){
      // TODO: 从本地或者远程获取计划列表
    },
    /**
     * 存储日记列表到本地
     */
    saveDataLocal(){},
    /**
     * 存储日记列表到远程数据库
     */
    saveDataRemote(){},
    /**
     * 添加日记
     */
    addDiary(context,value){
      let diaryId = value.diaryId || nanoid()
      // TODO:后续引入用户实际数据
      let userId = value.userId
      let diaryTitle = value.diaryTitle
      let diaryContent = value.diaryContent
      let diaryDate = value.diaryDate
      let diaryTags = value.diaryTags || []
      let diary = new Diary(
        diaryId,userId,diaryTitle,diaryContent,diaryDate,diaryTags
      );
      context.commit('addDiary',diary)
    },
    /**
     * 删除日记
     */
    deleteDiary(context,value){
      let index = context.state.diaryData.findIndex(item => item.diaryId === value)
      context.commit('deleteDiary',index)
    },
    /**
     * 批量删除日记
     */
    deleteDiaryBatch(context,value){
      let newDiaryList = context.state.diaryData.filter(item => !value.includes(item.diaryId))
      context.commit('deleteDiaryBatch',newDiaryList)
    },
    /**
     * 编辑日记
     */
    editDiary(context,value){
      let newDiary = {}
      newDiary.diaryId = value.diaryId
      newDiary.userId = value.userId
      newDiary.diaryTitle = value.diaryTitle
      newDiary.diaryContent = value.diaryContent
      newDiary.diaryDate = value.diaryDate
      newDiary.diaryTags = value.diaryTags || []
      context.commit('addDiary',newDiary)
    },
  },
  mutations:{
    /**
     * 获取日记列表
     */
    fetchData(){
      // TODO: 从本地或者远程获取计划列表
    },
    /**
     * 存储日记列表到本地
     */
    saveDataLocal(){},
    /**
     * 存储日记列表到远程数据库
     */
    saveDataRemote(){},
    /**
     * 添加日记
     */
    addDiary(state,value){
      if(state.diaryData.some(item => item.diaryId === value.diaryId)){
        state.diaryData.forEach(item => {
          if(item.diaryId === value.diaryId){
            item.diaryTitle = value.diaryTitle
            item.diaryContent = value.diaryContent
            item.diaryDate = value.diaryDate
          }
        })
      } else {
        state.diaryData.push(value)
      }
      console.log('改了吧？'+JSON.stringify(state.diaryData[0]))
    },
    /**
     * 删除日记
     */
    deleteDiary(state,value){
      state.diaryData.splice(value,1)
    },
    /**
     * 批量删除日记
     */
    deleteDiaryBatch(state,value){
      state.diaryData = value
    },
    /**
     * 编辑日记
     */
    editDiary(state,value){
      state.diaryData.forEach(item => {
        if(item.diaryId === value.diaryId){
          item = value
        }
      })
    },
  },
  getters:{
    /**
     * 获取指定日期日记列表
     */
    diaryListByDate: (state)=>(date)=>{
      return state.diaryData.filter(item => item.diaryDate === date)
    },
    /**
     * 获取模糊搜索的列表
     * @param state
     * @returns {function(*): *}
     */
    fuzzySearchDiaryList:(state)=>(fuzzySearch)=>{
      return state.diaryData.filter(item=> stringUtils.isFuzzyMatch(item.diaryTitle,fuzzySearch))
    }
  }
}

export default diaryAbout;
