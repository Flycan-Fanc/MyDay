import httpClient from "../httpClient";
import { normalizeSyncMeta } from "../../syncMeta";

export const addSyncMeta = (userId) => {
  return httpClient.post(`/syncMeta/add/${userId}`).then(normalizeSyncMeta)
}

export const getSyncMeta = (userId) => {
  return httpClient.get(`/syncMeta/${userId}`).then(normalizeSyncMeta)
}

export const updateSyncMeta = (userId) => {
  return httpClient.post(`/syncMeta/update/${userId}`).then(normalizeSyncMeta)
}

export const deleteSyncMeta = (userId) => {
  return httpClient.delete(`/syncMeta/${userId}`)
}
