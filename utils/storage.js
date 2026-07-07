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
function getList(key) {
    return wx.getStorageSync(key) || [];
}
function saveByDate(key, value) {
    const list = getList(key);
    const index = list.findIndex((item) => item.date === value.date);
    if (index >= 0) {
        list[index] = value;
    }
    else {
        list.push(value);
    }
    wx.setStorageSync(key, list);
}
function getProfile() {
    return wx.getStorageSync(keys.profile) || exports.defaultProfile;
}
function saveProfile(profile) {
    wx.setStorageSync(keys.profile, profile);
}
function getDailyLogs() {
    return getList(keys.dailyLogs);
}
function saveDailyLog(log) {
    saveByDate(keys.dailyLogs, log);
}
function getWorkoutLogs() {
    return getList(keys.workoutLogs);
}
function saveWorkoutLog(log) {
    saveByDate(keys.workoutLogs, log);
}
function getCardioLogs() {
    return getList(keys.cardioLogs);
}
function saveCardioLog(log) {
    saveByDate(keys.cardioLogs, log);
}
