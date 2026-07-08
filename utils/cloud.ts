export const cloudEnvId = "cloud1-d3gjd847w08fab98f";

export function isCloudReady(): boolean {
  return !!cloudEnvId && !!wx.cloud;
}

export function initCloud(): void {
  const cloud = wx.cloud;
  if (!cloudEnvId || !cloud) {
    return;
  }

  cloud.init({
    env: cloudEnvId,
    traceUser: true
  });
}

export async function callDataService<T>(action: string, payload?: unknown): Promise<T> {
  const cloud = wx.cloud;
  if (!cloudEnvId || !cloud) {
    throw new Error("Cloud environment is not configured.");
  }

  const result = await cloud.callFunction({
    name: "dataService",
    data: {
      action,
      payload
    }
  });

  return result.result as T;
}
