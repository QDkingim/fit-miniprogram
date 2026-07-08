"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudEnvId = void 0;
exports.isCloudReady = isCloudReady;
exports.initCloud = initCloud;
exports.callDataService = callDataService;
exports.cloudEnvId = "cloud1-d3gjd847w08fab98f";
function isCloudReady() {
    return !!exports.cloudEnvId && !!wx.cloud;
}
function initCloud() {
    const cloud = wx.cloud;
    if (!exports.cloudEnvId || !cloud) {
        return;
    }
    cloud.init({
        env: exports.cloudEnvId,
        traceUser: true
    });
}
async function callDataService(action, payload) {
    const cloud = wx.cloud;
    if (!exports.cloudEnvId || !cloud) {
        throw new Error("Cloud environment is not configured.");
    }
    const result = await cloud.callFunction({
        name: "dataService",
        data: {
            action,
            payload
        }
    });
    return result.result;
}
