import store from '../store/store'
import * as syncMetaAPI from './api/modules/syncMeta'
import { dataRemoteFetch } from './dataRemoteFetch'
import { getSyncMetaVersion, normalizeSyncMeta } from './syncMeta'

function hasLocalBusinessData() {
  return (
    store.state.tagAbout.userTags.length > 0 ||
    store.state.planAbout.planData.length > 0 ||
    store.state.diaryAbout.diaryData.length > 0 ||
    store.state.insAbout.insData.length > 0 ||
    store.state.pictureAbout.pictureData.length > 0
  )
}

export async function dataSync() {
  const localSyncMeta = normalizeSyncMeta(JSON.parse(localStorage.getItem('userSyncMeta')))
  try {
    if (!localSyncMeta?.userId) {
      await store.dispatch('syncAbout/markLocalOnly', {
        localVersion: 0,
        remoteVersion: 0,
        detail: '仅本地',
      })
      return { status: 'skipped', reason: 'missing_local_meta' }
    }

    await store.dispatch('syncAbout/setSyncing', {
      localVersion: Number(localSyncMeta.dataVersion ?? 0),
      remoteVersion: Number(store.state.syncAbout.remoteVersion ?? 0),
    })

    const remoteSyncMeta = await syncMetaAPI.getSyncMeta(localSyncMeta.userId)
    if (!remoteSyncMeta) {
      await store.dispatch('syncAbout/markLocalOnly', {
        localVersion: Number(localSyncMeta.dataVersion ?? 0),
        remoteVersion: 0,
        detail: '仅本地',
      })
      return { status: 'skipped', reason: 'missing_remote_meta' }
    }

    const localVersion = getSyncMetaVersion(localSyncMeta)
    const remoteVersion = getSyncMetaVersion(remoteSyncMeta)
    console.info('[dataSync] compare versions', { localVersion, remoteVersion })

    if (localVersion < remoteVersion) {
      if (hasLocalBusinessData()) {
        console.warn('[dataSync] remote data is ahead, but local business data exists; auto-fetch is disabled')
        await store.dispatch('syncAbout/markPending', {
          localVersion,
          remoteVersion,
          detail: '待同步',
        })
        return { status: 'skipped', reason: 'remote_ahead_with_local_data' }
      }
      await dataRemoteFetch(localSyncMeta.userId, remoteSyncMeta, { preferRemote: true })
      return { status: 'fetched' }
    }

    if (localVersion > remoteVersion) {
      console.warn('[dataSync] local data is ahead of remote; automatic remote push is disabled')
      await store.dispatch('syncAbout/markPending', {
        localVersion,
        remoteVersion,
        detail: '待同步',
      })
      return { status: 'skipped', reason: 'local_ahead' }
    }

    await store.dispatch('syncAbout/markSynced', {
      localVersion,
      remoteVersion,
      detail: '已同步',
    })
    return { status: 'noop', reason: 'version_equal' }
  } catch (err) {
    await store.dispatch('syncAbout/markError', {
      localVersion: Number(localSyncMeta?.dataVersion ?? store.state.syncAbout.localVersion ?? 0),
      remoteVersion: Number(store.state.syncAbout.remoteVersion ?? 0),
      lastError: err?.message || '数据同步失败',
    })
    throw err
  }
}
