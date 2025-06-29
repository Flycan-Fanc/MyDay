/**
 * @description: 灵感store
 */

import User from '../../models/User'

import {nanoid} from 'nanoid'
import { dayjs } from "element-plus";

const userApi = {

}

const userAbout = {
  namespaced:true,
  state:{
    isDateChanged: false,
    userData:[
      {
        userId: "U001",
        userAccount: "alice123",
        userPassword: "alice123",
        email: "alice@example.com",
        userName: "Alice",
        avatarId: "",
        userProfile: "Hello, I'm Alice!",
        userRole: 0,
        isVip: 0,
        createTime: "2023-01-15 10:30:00",
        isDelete: 0
      },
    ],
  },
  actions:{
    /**
     * 用户数据改变
     * @param context
     */
    userDataChanged(context){
      context.commit('userDataChanged')
    },
    /**
     * 添加用户
     * @param context
     * @param value
     */
    addUser(context,value){
      let userId = value.userId  // TODO: 后续需要修改为后端生成
      let userAccount = value.userAccount
      let userPassword = value.userPassword || ''
      let email = value.email
      let userName = value.userName
      // TODO:后续增加修改头像功能
      let avatarId = value.avatarId || ''
      let userProfile = value.userProfile
      // TODO：后续增加管理员功能以及vip功能
      let userRole = 0
      let isVip = 0
      let createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
      let isDelete = 0
      let user = {
        userId, userAccount, userPassword, email, userName, avatarId, userProfile, userRole, isVip, createTime, isDelete
      }
      context.commit('addUser',user)
    },
    /**
     * 修改用户信息
     * @param context
     * @param value
     */
    editUser(context,value){
      let userId = value.userId
      let userAccount = value.userAccount
      let userPassword = value.userPassword
      let email = value.email
      let userName = value.userName
      // TODO:后续增加修改头像功能
      let avatarId = value.avatarId || ''
      let userProfile = value.userProfile
      // TODO：后续增加管理员功能以及vip功能
      let userRole = 0
      let isVip = 0
      let createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
      let isDelete = 0
      let user = {
        userId, userAccount, userPassword, email, userName, avatarId, userProfile, userRole, isVip, createTime, isDelete
      }
      context.commit('editUser',user)
    },
    /**
     * 删除用户
     * @param context
     * @param value
     */
    deleteUser(context,value){
      context.commit('deleteUser',value)
    },
  },
  mutations:{
    userDataChanged(state) {
      state.isDateChanged = !state.isDateChanged
    },
    /**
     * 添加用户
     * @param state
     * @param value
     */
    addUser(state,value){
      // TODO:后续增加唯一性校验，由注册逻辑和后端校验
      state.userData = value
    },
    /**
     * 修改用户信息
     * @param state
     * @param value
     */
    editUser(state,value){
      Object.assign(state.userData,value)
    },
    /**
     * 删除用户
     * @param state
     * @param value
     */
    deleteUser(state,value){
      state.userData = state.userData.filter(item => item.userId !== value)
    },
  },
  getters:{
    getUserId(state){
      return state.userData.userId
    }
  }
}

export default userAbout;
