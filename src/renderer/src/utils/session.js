import store from '../store/store'

function resetVuexState() {
  store.commit('syncAbout/reset')
  store.commit('userAbout/resetUser')
  store.commit('planAbout/resetData')
  store.commit('tagAbout/resetData')
  store.commit('diaryAbout/resetData')
  store.commit('insAbout/resetData')
  store.commit('pictureAbout/setData', [])
  store.commit('weatherAbout/resetWeather')
}

export async function clearSession({ clearLoginStatus = true, clearSyncMeta = false } = {}) {
  const loginUserId = await window.api.electronStore.appStore.getLoginUserId()

  if (loginUserId !== -1) {
    await window.api.electronStore.appStore.setUserStore(loginUserId)

    if (clearLoginStatus) {
      await window.api.electronStore.appStore.changeUserLoginStatus(loginUserId)
    }

    await window.api.electronStore.userStore.setUserToken('')
    if (clearSyncMeta) {
      await window.api.electronStore.userStore.setUserSyncMeta(undefined)
    }
  }

  localStorage.removeItem('token')
  localStorage.removeItem('userSyncMeta')
  resetVuexState()
}
