/**
 * 同步元数据接口
 */

import httpClient from "../httpClient";

export const addSyncMeta = (data) => httpClient.post("/syncMeta/add", data);
