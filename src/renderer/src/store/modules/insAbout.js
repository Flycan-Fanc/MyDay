/**
 * @description: 灵感store
 */

import Inspiration from '../../models/Inspiration'

import {nanoid} from 'nanoid'
import Diary from "../../models/Diary";

const insApi = {
  // 判断origin是否包含target的全部字符
  isFuzzyMatch: function(origin,target){
    if (target === "") return true; // 空目标字符串直接返回 true
    // 将 target 的每个字符转义后，用 ".*" 连接，生成正则表达式
    const pattern = target
      .split("")
      .map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) // 转义正则特殊字符
      .join(".*");
    const regex = new RegExp(pattern); // 构建正则表达式
    return regex.test(origin); // 测试是否匹配
  },
}

const insAbout = {
  namespaced:true,
  state:{
    insData:[
      {
        "insId": 1,
        "userId": 3,
        "insTitle": "灵感标题1",
        "insContent": "这是灵感内容1...",
        "insDate": "2023-05-15T00:00:00.000Z",
        "insTags": [
          { "tagId": 1, "userId": 3, "tagName": "技术", "color": "#ff5733" },
          { "tagId": 2, "userId": 3, "tagName": "设计", "color": "#33ff57" }
        ],
        "insCover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACt..."
      },
      {
        "insId": 2,
        "userId": 5,
        "insTitle": "灵感标题2",
        "insContent": "这是灵感内容2...",
        "insDate": "2023-07-22T00:00:00.000Z",
        "insTags": [
          { "tagId": 3, "userId": 5, "tagName": "旅行", "color": "#3357ff" }
        ],
        "insCover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACt..."
      },
      {
        "insId": 3,
        "userId": 2,
        "insTitle": "灵感标题3",
        "insContent": "这是灵感内容3...",
        "insDate": "2023-02-10T00:00:00.000Z",
        "insTags": [
          { "tagId": 4, "userId": 2, "tagName": "美食", "color": "#ff33a1" },
          { "tagId": 5, "userId": 2, "tagName": "艺术", "color": "#a133ff" },
          { "tagId": 6, "userId": 2, "tagName": "编程", "color": "#33ffa1" }
        ],
        "insCover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACt..."
      },
      {
        "insId": 4,
        "userId": 1,
        "insTitle": "灵感标题4",
        "insContent": "这是灵感内容4...",
        "insDate": "2023-09-05T00:00:00.000Z",
        "insTags": [
          { "tagId": 7, "userId": 1, "tagName": "生活", "color": "#ffd733" },
          { "tagId": 8, "userId": 1, "tagName": "科技", "color": "#33d7ff" }
        ],
        "insCover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACt..."
      },
      {
        "insId": 5,
        "userId": 4,
        "insTitle": "灵感标题5",
        "insContent": "这是灵感内容5...",
        "insDate": "2023-11-18T00:00:00.000Z",
        "insTags": [
          { "tagId": 9, "userId": 4, "tagName": "摄影", "color": "#33ff57" },
          { "tagId": 10, "userId": 4, "tagName": "自然", "color": "#ff5733" }
        ],
        "insCover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACt..."
      },
      {
        "insId": 6,
        "userId": 3,
        "insTitle": "灵感标题6",
        "insContent": "这是灵感内容6...",
        "insDate": "2023-04-30T00:00:00.000Z",
        "insTags": [
          { "tagId": 11, "userId": 3, "tagName": "音乐", "color": "#a133ff" },
          { "tagId": 12, "userId": 3, "tagName": "电影", "color": "#33a1ff" },
          { "tagId": 13, "userId": 3, "tagName": "阅读", "color": "#ff33a1" }
        ],
        "insCover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACt..."
      },
      {
        "insId": 7,
        "userId": 5,
        "insTitle": "灵感标题7",
        "insContent": "这是灵感内容7...",
        "insDate": "2023-08-14T00:00:00.000Z",
        "insTags": [
          { "tagId": 14, "userId": 5, "tagName": "运动", "color": "#33d7ff" }
        ],
        "insCover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACt..."
      },
      {
        "insId": 8,
        "userId": 2,
        "insTitle": "灵感标题8",
        "insContent": "这是灵感内容8...",
        "insDate": "2023-01-25T00:00:00.000Z",
        "insTags": [
          { "tagId": 15, "userId": 2, "tagName": "健康", "color": "#ffd733" },
          { "tagId": 16, "userId": 2, "tagName": "教育", "color": "#d733ff" }
        ],
        "insCover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACt..."
      },
      {
        "insId": 9,
        "userId": 1,
        "insTitle": "灵感标题9",
        "insContent": "这是灵感内容9...",
        "insDate": "2023-06-09T00:00:00.000Z",
        "insTags": [
          { "tagId": 17, "userId": 1, "tagName": "科技", "color": "#33ffa1" }
        ],
        "insCover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACt..."
      },
      {
        "insId": 10,
        "userId": 4,
        "insTitle": "灵感标题10",
        "insContent": "这是灵感内容10...",
        "insDate": "2023-12-01T00:00:00.000Z",
        "insTags": [
          { "tagId": 18, "userId": 4, "tagName": "旅行", "color": "#3357ff" },
          { "tagId": 19, "userId": 4, "tagName": "美食", "color": "#ff5733" },
          { "tagId": 20, "userId": 4, "tagName": "艺术", "color": "#33ff57" }
        ],
        "insCover": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACt..."
      }
    ]
  },
  actions:{
    /**
     * 获取灵感列表
     */
    fetchData(){
      // TODO: 从本地或者远程获取计划列表
    },
    /**
     * 存储灵感列表到本地
     */
    saveDataLocal(){},
    /**
     * 存储灵感列表到远程数据库
     */
    saveDataRemote(){},
    /**
     * 添加灵感
     */
    addIns(context,value){
      let insId = value.insId || nanoid()
      // TODO:后续引入用户实际数据
      let userId = value.userId || 1
      let insTitle = value.insTitle
      let insContent = value.insContent
      let insDate = value.insDate
      let insTags = value.insTags || []
      let insCover = value.insCover
      let ins = new Inspiration(
        insId,userId,insTitle,insContent,insDate,insTags,insCover
      );
      context.commit('addIns',ins)
    },
    /**
     * 删除灵感
     */
    deleteIns(context,value){
      let index = context.state.insData.findIndex(item => item.insId === value)
      context.commit('deleteIns',index)
    },
    /**
     * 批量删除灵感
     */
    deleteInsBatch(context,value){
      let newInsList = context.state.insData.filter(item => !value.includes(item.insId))
      context.commit('deleteInsBatch',newInsList)
    },
    /**
     * 编辑灵感
     */
    editIns(context,value){
      let newIns = {}
      newIns.insId = value.insId
      newIns.insTitle = value.insTitle
      newIns.insContent = value.insContent
      newIns.insDate = value.insDate
      newIns.insTags = value.insTags || []
      newIns.insCover = value.insCover
      context.commit('editIns',newIns)
    },
  },
  mutations:{
    /**
     * 获取灵感列表
     */
    fetchData(){
      // TODO: 从本地或者远程获取计划列表
    },
    /**
     * 存储灵感列表到本地
     */
    saveDataLocal(){},
    /**
     * 存储灵感列表到远程数据库
     */
    saveDataRemote(){},
    /**
     * 添加灵感
     */
    addIns(state,value){
      if(state.insData.some(item=>item.insId === value.insId)){
        state.insData.forEach(item => {
          if(item.insId === value.insId){
            item.insTitle = value.insTitle
            item.insContent = value.insContent
            item.insDate = value.insDate
            item.insTags = value.insTags
            item.insCover = value.insCover
          }
        })
      } else {
        state.insData.push(value)
      }
    },
    /**
     * 删除灵感
     */
    deleteIns(state,value){
      state.insData.splice(value,1)
    },
    /**
     * 批量删除灵感
     */
    deleteInsBatch(state,value){
      state.insData = value
    },
    /**
     * 编辑灵感
     */
    editIns(state,value){
      state.insData.forEach(item => {
        if(item.insId === value.insId){
          item = value
        }
      })
    },
  },
  getters:{
    /**
     * 获取指定日期灵感列表
     */
    insListByDate: (state)=>(date)=>{
      return state.insData.filter(item => item.insDate === date)
    },
    /**
     * 获取模糊搜索的列表
     * @param state
     * @returns {function(*): *}
     */
    fuzzySearchInsList:(state)=>(fuzzySearch)=>{
      return state.insData.filter(item=> insApi.isFuzzyMatch(fuzzySearch,item.diaryTitle))
    }
  }
}

export default insAbout;
