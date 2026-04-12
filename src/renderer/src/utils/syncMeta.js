export function normalizeSyncMeta(syncMeta) {
  if (!syncMeta) {
    return null
  }

  return {
    userId: syncMeta.userId,
    dataVersion: Number(syncMeta.dataVersion ?? syncMeta.data_version ?? 0),
    dataHash: syncMeta.dataHash ?? syncMeta.data_hash ?? '',
  }
}

export function getSyncMetaVersion(syncMeta, fallback = 0) {
  return Number(normalizeSyncMeta(syncMeta)?.dataVersion ?? fallback)
}
