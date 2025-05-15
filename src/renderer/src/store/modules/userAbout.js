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
     * 添加用户
     * @param context
     * @param value
     */
    addUser(context,value){
      let userId = nanoid()  // TODO: 后续需要修改为后端生成
      let userAccount = value.userAccount
      let userPassword = value.userPassword || ''
      let email = value.email
      let userName = value.userName
      // TODO:后续增加修改头像功能
      let avatarId = ""
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
      let avatarId = ""
      let userProfile = value.userProfile
      // TODO：后续增加管理员功能以及vip功能
      let userRole = 0
      let isVip = 0
      let createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
      let isDelete = 0
      let user = {
        userId, userAccount, userPassword, email, userName, avatarId, userProfile, userRole, isVip, createTime, isDelete
      }
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
    /**
     * 添加用户
     * @param state
     * @param value
     */
    addUser(state,value){
      // TODO:后续增加唯一性校验，由注册逻辑和后端校验
      state.userData.push(value)
    },
    /**
     * 修改用户信息
     * @param state
     * @param value
     */
    editUser(state,value){
      state.userData.forEach(item=>{
        if(item.userId === value.userId){
          item.userAccount = value.userAccount
          item.userPassword = value.userPassword
          item.email = value.email
          item.userName = value.userName
          item.avatarId = value.avatarId
          item.userProfile = value.userProfile
          item.userRole = value.userRole
          item.isVip = value.isVip
          item.createTime = value.createTime
          item.isDelete = value.isDelete
        }
      })
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

  }
}

export default userAbout;
