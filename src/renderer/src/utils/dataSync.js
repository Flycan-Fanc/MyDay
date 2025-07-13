import * as syncMetaAPI from "./api/modules/syncMeta";
import { dataRemoteStorage } from "./dataRemoteStorage";
import { dataRemoteFetch } from "./dataRemoteFetch";


export async function dataSync(){
  // 1. 获取 本地 和 远程 用户同步元信息
  let localSyncMeta = JSON.parse(localStorage.getItem('userSyncMeta'))
  let remoteSyncMeta = await syncMetaAPI.getSyncMeta(localSyncMeta.userId)

  console.log(`本地dataVersion:${localSyncMeta.dataVersion}, 远程dataVersion:${JSON.stringify(remoteSyncMeta)}`)
  // 2. 比较本地和远程的dataVersion
  if(localSyncMeta.dataVersion < remoteSyncMeta.data_version){
    // 本地dataVersion小于远程dataVersion，需要同步到本地
    await dataRemoteFetch(localSyncMeta.userId)
  } else if(localSyncMeta.dataVersion > remoteSyncMeta.data_version){
    // 本地dataVersion大于远程dataVersion，需要同步到远程
    await dataRemoteStorage();
  }
}
