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
        userPassword: "p@ssw0rd1",
        email: "alice@example.com",
        userName: "Alice",
        avatarId: "",
        userProfile: "Hello, I'm Alice!",
        userRole: 0,
        isVip: 0,
        createTime: "2023-01-15 10:30:00",
        isDelete: 0
      },
      {
        userId: "U002",
        userAccount: "bob_tech",
        userPassword: "b0bSecure!",
        email: "bob@example.com",
        userName: "Bob",
        avatarId: "",
        userProfile: "Tech enthusiast",
        userRole: 0,
        isVip: 0,
        createTime: "2023-02-20 14:15:00",
        isDelete: 0
      },
      {
        userId: "U003",
        userAccount: "charlie_g",
        userPassword: "ch@rlie99",
        email: "charlie@example.com",
        userName: "Charlie",
        avatarId: "",
        userProfile: "Music lover",
        userRole: 0,
        isVip: 0,
        createTime: "2023-03-05 09:00:00",
        isDelete: 0
      },
      {
        userId: "U004",
        userAccount: "diana_m",
        userPassword: "D1@naPass",
        email: "diana@example.com",
        userName: "Diana",
        avatarId: "",
        userProfile: "Bookworm",
        userRole: 0,
        isVip: 0,
        createTime: "2023-04-10 16:45:00",
        isDelete: 0
      },
      {
        userId: "U005",
        userAccount: "evan_dev",
        userPassword: "ev@n2023",
        email: "evan@example.com",
        userName: "Evan",
        avatarId: "",
        userProfile: "Web developer",
        userRole: 0,
        isVip: 0,
        createTime: "2023-05-12 11:20:00",
        isDelete: 0
      },
      {
        userId: "U006",
        userAccount: "fiona_s",
        userPassword: "F!ona1234",
        email: "fiona@example.com",
        userName: "Fiona",
        avatarId: "",
        userProfile: "Nature photographer",
        userRole: 0,
        isVip: 0,
        createTime: "2023-06-18 13:10:00",
        isDelete: 0
      },
      {
        userId: "U007",
        userAccount: "george_k",
        userPassword: "ge0rgeKK",
        email: "george@example.com",
        userName: "George",
        avatarId: "",
        userProfile: "Coffee addict",
        userRole: 0,
        isVip: 0,
        createTime: "2023-07-22 08:30:00",
        isDelete: 0
      },
      {
        userId: "U008",
        userAccount: "hannah_m",
        userPassword: "h@nnahMM",
        email: "hannah@example.com",
        userName: "Hannah",
        avatarId: "",
        userProfile: "Yoga instructor",
        userRole: 0,
        isVip: 0,
        createTime: "2023-08-30 17:00:00",
        isDelete: 0
      },
      {
        userId: "U009",
        userAccount: "ian_coder",
        userPassword: "I@nPython",
        email: "ian@example.com",
        userName: "Ian",
        avatarId: "",
        userProfile: "Python developer",
        userRole: 0,
        isVip: 0,
        createTime: "2023-09-14 10:45:00",
        isDelete: 0
      },
      {
        userId: "U010",
        userAccount: "julia_d",
        userPassword: "Juli@2023",
        email: "julia@example.com",
        userName: "Julia",
        avatarId: "",
        userProfile: "Digital artist",
        userRole: 0,
        isVip: 0,
        createTime: "2023-10-05 15:20:00",
        isDelete: 0
      }
    ],
  },
  actions:{
    /**
     * 添加用户
     * @param context
     * @param value
     */
    addUser(context,value){
      let userId = nanoid()
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
