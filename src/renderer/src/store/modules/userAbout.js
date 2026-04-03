import { dayjs } from 'element-plus'

const userAbout = {
  namespaced: true,
  state: {
    isDateChanged: false,
    userData: {},
  },
  actions: {
    userDataChanged(context) {
      context.commit('userDataChanged')
    },
    addUser(context, value) {
      const user = {
        userId: value.userId,
        userAccount: value.userAccount,
        userPassword: value.userPassword || '',
        email: value.email,
        userName: value.userName,
        avatarId: value.avatarId || '',
        userProfile: value.userProfile,
        userRole: value.userRole ?? 0,
        isVip: value.isVip ?? 0,
        createTime: value.createTime || dayjs().format('YYYY-MM-DD HH:mm:ss'),
        isDelete: value.isDelete ?? 0,
      }
      context.commit('addUser', user)
    },
    editUser(context, value) {
      const user = {
        userId: value.userId,
        userAccount: value.userAccount,
        userPassword: value.userPassword || '',
        email: value.email,
        userName: value.userName,
        avatarId: value.avatarId || '',
        userProfile: value.userProfile,
        userRole: value.userRole ?? 0,
        isVip: value.isVip ?? 0,
        createTime: value.createTime || dayjs().format('YYYY-MM-DD HH:mm:ss'),
        isDelete: value.isDelete ?? 0,
      }
      context.commit('editUser', user)
    },
    deleteUser(context, value) {
      context.commit('deleteUser', value)
    },
    resetUser(context) {
      context.commit('resetUser')
    },
  },
  mutations: {
    userDataChanged(state) {
      state.isDateChanged = !state.isDateChanged
    },
    addUser(state, value) {
      state.userData = value
    },
    editUser(state, value) {
      Object.assign(state.userData, value)
    },
    deleteUser(state, value) {
      if (state.userData.userId === value) {
        state.userData = {}
      }
    },
    resetUser(state) {
      state.userData = {}
    },
  },
  getters: {
    getUserId(state) {
      return state.userData?.userId
    },
  },
}

export default userAbout
