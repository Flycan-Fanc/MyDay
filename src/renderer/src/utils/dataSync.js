import store from '../store/store'
import * as syncMetaAPI from './api/modules/syncMeta'
import { dataRemoteFetch } from './dataRemoteFetch'

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
  const localSyncMeta = JSON.parse(localStorage.getItem('userSyncMeta'))
  if (!localSyncMeta?.userId) {
    return { status: 'skipped', reason: 'missing_local_meta' }
  }

  const remoteSyncMeta = await syncMetaAPI.getSyncMeta(localSyncMeta.userId)
  if (!remoteSyncMeta) {
    return { status: 'skipped', reason: 'missing_remote_meta' }
  }

  if (localSyncMeta.dataVersion < remoteSyncMeta.data_version) {
    if (hasLocalBusinessData()) {
      console.warn('[dataSync] remote data is ahead, but local business data exists; auto-fetch is disabled')
      return { status: 'skipped', reason: 'remote_ahead_with_local_data' }
    }
    await dataRemoteFetch(localSyncMeta.userId, remoteSyncMeta, { preferRemote: true })
    return { status: 'fetched' }
  }

  if (localSyncMeta.dataVersion > remoteSyncMeta.data_version) {
    console.warn('[dataSync] local data is ahead of remote; automatic remote push is disabled')
    return { status: 'skipped', reason: 'local_ahead' }
  }

  return { status: 'noop', reason: 'version_equal' }
}
