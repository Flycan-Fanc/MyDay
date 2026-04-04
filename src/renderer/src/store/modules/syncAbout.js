const DEFAULT_STATE = () => ({
  status: 'local_only',
  localVersion: 0,
  remoteVersion: 0,
  detail: '\u4ec5\u672c\u5730',
  lastError: '',
})

const STATUS_DETAIL_MAP = {
  local_only: '\u4ec5\u672c\u5730',
  synced: '\u5df2\u540c\u6b65',
  pending: '\u5f85\u540c\u6b65',
  syncing: '\u540c\u6b65\u4e2d',
  error: '\u540c\u6b65\u5931\u8d25',
}

const syncAbout = {
  namespaced: true,
  state: DEFAULT_STATE(),
  actions: {
    initialize(context, payload = {}) {
      context.commit('initialize', payload)
    },
    setSyncing(context, payload = {}) {
      context.commit('setSyncing', payload)
    },
    markPending(context, payload = {}) {
      context.commit('markPending', payload)
    },
    markSynced(context, payload = {}) {
      context.commit('markSynced', payload)
    },
    markLocalOnly(context, payload = {}) {
      context.commit('markLocalOnly', payload)
    },
    markError(context, payload = {}) {
      context.commit('markError', payload)
    },
    reset(context) {
      context.commit('reset')
    },
  },
  mutations: {
    initialize(state, payload) {
      const localVersion = Number(payload.localVersion ?? 0)
      const remoteVersion = Number(payload.remoteVersion ?? localVersion)
      state.localVersion = localVersion
      state.remoteVersion = remoteVersion
      state.lastError = ''

      if (payload.status) {
        state.status = payload.status
        state.detail = payload.detail || STATUS_DETAIL_MAP[payload.status] || STATUS_DETAIL_MAP.local_only
        return
      }

      if (!payload.hasRemote) {
        state.status = 'local_only'
        state.detail = payload.detail || STATUS_DETAIL_MAP.local_only
        return
      }

      if (localVersion > remoteVersion) {
        state.status = 'pending'
        state.detail = payload.detail || STATUS_DETAIL_MAP.pending
        return
      }

      if (localVersion === remoteVersion) {
        state.status = 'synced'
        state.detail = payload.detail || STATUS_DETAIL_MAP.synced
        return
      }

      state.status = 'pending'
      state.detail = payload.detail || STATUS_DETAIL_MAP.pending
    },
    setSyncing(state, payload) {
      if (payload.localVersion !== undefined) {
        state.localVersion = Number(payload.localVersion)
      }
      if (payload.remoteVersion !== undefined) {
        state.remoteVersion = Number(payload.remoteVersion)
      }
      state.status = 'syncing'
      state.detail = payload.detail || STATUS_DETAIL_MAP.syncing
      state.lastError = ''
    },
    markPending(state, payload) {
      if (payload.localVersion !== undefined) {
        state.localVersion = Number(payload.localVersion)
      }
      if (payload.remoteVersion !== undefined) {
        state.remoteVersion = Number(payload.remoteVersion)
      }
      state.status = 'pending'
      state.detail = payload.detail || STATUS_DETAIL_MAP.pending
      if (payload.clearError !== false) {
        state.lastError = ''
      }
    },
    markSynced(state, payload) {
      const version = Number(payload.localVersion ?? payload.remoteVersion ?? state.localVersion)
      state.localVersion = version
      state.remoteVersion = Number(payload.remoteVersion ?? version)
      state.status = 'synced'
      state.detail = payload.detail || STATUS_DETAIL_MAP.synced
      state.lastError = ''
    },
    markLocalOnly(state, payload) {
      if (payload.localVersion !== undefined) {
        state.localVersion = Number(payload.localVersion)
      }
      if (payload.remoteVersion !== undefined) {
        state.remoteVersion = Number(payload.remoteVersion)
      }
      state.status = 'local_only'
      state.detail = payload.detail || STATUS_DETAIL_MAP.local_only
      if (payload.clearError !== false) {
        state.lastError = ''
      }
    },
    markError(state, payload) {
      if (payload.localVersion !== undefined) {
        state.localVersion = Number(payload.localVersion)
      }
      if (payload.remoteVersion !== undefined) {
        state.remoteVersion = Number(payload.remoteVersion)
      }
      state.status = 'error'
      state.detail = payload.detail || STATUS_DETAIL_MAP.error
      state.lastError = payload.lastError || ''
    },
    reset(state) {
      Object.assign(state, DEFAULT_STATE())
    },
  },
  getters: {
    statusLabel(state) {
      return STATUS_DETAIL_MAP[state.status] || STATUS_DETAIL_MAP.local_only
    },
    tooltipText(state, getters) {
      const versions = `\u672c\u5730 v${state.localVersion} / \u8fdc\u7aef v${state.remoteVersion}`
      if (state.status === 'error' && state.lastError) {
        return `${getters.statusLabel}\uff1a${state.lastError} (${versions})`
      }
      return `${getters.statusLabel} (${versions})`
      // return `${getters.statusLabel}`
    },
  },
}

export default syncAbout
