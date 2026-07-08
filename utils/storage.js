"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultProfile = void 0;
exports.getProfile = getProfile;
exports.saveProfile = saveProfile;
exports.getDailyLogs = getDailyLogs;
exports.saveDailyLog = saveDailyLog;
exports.getWorkoutLogs = getWorkoutLogs;
exports.saveWorkoutLog = saveWorkoutLog;
exports.getCardioLogs = getCardioLogs;
exports.saveCardioLog = saveCardioLog;
exports.syncLocalDataToCloud = syncLocalDataToCloud;
const cloud_1 = require("./cloud");
const keys = {
    profile: "profile",
    dailyLogs: "dailyLogs",
    workoutLogs: "workoutLogs",
    cardioLogs: "cardioLogs"
};
exports.defaultProfile = {
    gender: "男",
    age: 26,
    heightCm: 175,
    startWeightKg: 100,
    targetWeightKg: 70,
    waistCm: 96,
    sleepTargetHours: 7.5,
    stepTarget: 6000
};
function getLocalList(key) {
    return wx.getStorageSync(key) || [];
}
function saveLocalByDate(key, value) {
    const list = getLocalList(key);
    const index = list.findIndex((item) => item.date === value.date);
    if (index >= 0) {
        list[index] = value;
    }
    else {
        list.push(value);
    }
    wx.setStorageSync(key, list);
}
async function getCloudList(action, localKey) {
    if (!(0, cloud_1.isCloudReady)()) {
        return getLocalList(localKey);
    }
    try {
        const list = await (0, cloud_1.callDataService)(action);
        wx.setStorageSync(localKey, list);
        return list;
    }
    catch {
        return getLocalList(localKey);
    }
}
async function getProfile() {
    const localProfile = wx.getStorageSync(keys.profile) || exports.defaultProfile;
    if (!(0, cloud_1.isCloudReady)()) {
        return localProfile;
    }
    try {
        const profile = await (0, cloud_1.callDataService)("getProfile");
        if (profile) {
            wx.setStorageSync(keys.profile, profile);
            return profile;
        }
    }
    catch {
        return localProfile;
    }
    return localProfile;
}
async function saveProfile(profile) {
    wx.setStorageSync(keys.profile, profile);
    if ((0, cloud_1.isCloudReady)()) {
        try {
            await (0, cloud_1.callDataService)("saveProfile", profile);
        }
        catch {
            return;
        }
    }
}
function getDailyLogs() {
    return getCloudList("listDailyLogs", keys.dailyLogs);
}
async function saveDailyLog(log) {
    saveLocalByDate(keys.dailyLogs, log);
    if ((0, cloud_1.isCloudReady)()) {
        try {
            await (0, cloud_1.callDataService)("saveDailyLog", log);
        }
        catch {
            return;
        }
    }
}
function getWorkoutLogs() {
    return getCloudList("listWorkoutLogs", keys.workoutLogs);
}
async function saveWorkoutLog(log) {
    saveLocalByDate(keys.workoutLogs, log);
    if ((0, cloud_1.isCloudReady)()) {
        try {
            await (0, cloud_1.callDataService)("saveWorkoutLog", log);
        }
        catch {
            return;
        }
    }
}
function getCardioLogs() {
    return getCloudList("listCardioLogs", keys.cardioLogs);
}
async function saveCardioLog(log) {
    saveLocalByDate(keys.cardioLogs, log);
    if ((0, cloud_1.isCloudReady)()) {
        try {
            await (0, cloud_1.callDataService)("saveCardioLog", log);
        }
        catch {
            return;
        }
    }
}
async function syncLocalDataToCloud() {
    if (!(0, cloud_1.isCloudReady)()) {
        return;
    }
    try {
        const profile = wx.getStorageSync(keys.profile);
        if (profile) {
            await (0, cloud_1.callDataService)("saveProfile", profile);
        }
        await Promise.all([
            ...getLocalList(keys.dailyLogs).map((log) => (0, cloud_1.callDataService)("saveDailyLog", log)),
            ...getLocalList(keys.workoutLogs).map((log) => (0, cloud_1.callDataService)("saveWorkoutLog", log)),
            ...getLocalList(keys.cardioLogs).map((log) => (0, cloud_1.callDataService)("saveCardioLog", log))
        ]);
    }
    catch {
        return;
    }
}
