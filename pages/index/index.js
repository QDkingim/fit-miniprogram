"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_1 = require("../../utils/date");
const plan_1 = require("../../utils/plan");
const storage_1 = require("../../utils/storage");
const stats_1 = require("../../utils/stats");
function buildTodayStatus(dailyLogs, workoutLogs, cardioLogs, action) {
    const date = (0, date_1.todayKey)();
    const dailyDone = dailyLogs.some((log) => log.date === date);
    const workoutDone = workoutLogs.some((log) => log.date === date && log.exercises.some((item) => item.done));
    const cardioDone = cardioLogs.some((log) => log.date === date && log.done);
    const required = [
        { key: "daily", label: "基础打卡", done: dailyDone },
        { key: "workout", label: "力量训练", done: action !== "workout" || workoutDone },
        { key: "cardio", label: "坡度快走", done: action !== "cardio" || cardioDone }
    ];
    const pending = required.filter((item) => !item.done);
    return {
        dailyDone,
        workoutDone,
        cardioDone,
        workoutClosed: action !== "workout" || workoutDone,
        cardioClosed: action !== "cardio" || cardioDone,
        workoutLabel: action === "workout" ? "力量训练" : "今日无需力量",
        cardioLabel: action === "cardio" ? "坡度快走" : "今日无需有氧",
        pending,
        pendingText: pending.length ? `还差 ${pending.map((item) => item.label).join("、")}` : "今日闭环已完成",
        completedCount: required.length - pending.length,
        totalCount: required.length
    };
}
Page({
    data: {
        dateText: (0, date_1.todayKey)(),
        weekday: (0, date_1.weekdayText)(),
        plan: (0, plan_1.todayPlan)((0, date_1.weekdayText)()),
        stats: (0, stats_1.buildReviewStats)([], [], []),
        todayStatus: buildTodayStatus([], [], [], (0, plan_1.todayPlan)((0, date_1.weekdayText)()).action)
    },
    async onShow() {
        const weekday = (0, date_1.weekdayText)();
        const plan = (0, plan_1.todayPlan)(weekday);
        const [dailyLogs, workoutLogs, cardioLogs] = await Promise.all([(0, storage_1.getDailyLogs)(), (0, storage_1.getWorkoutLogs)(), (0, storage_1.getCardioLogs)()]);
        this.setData({
            dateText: (0, date_1.todayKey)(),
            weekday,
            plan,
            stats: (0, stats_1.buildReviewStats)(dailyLogs, workoutLogs, cardioLogs),
            todayStatus: buildTodayStatus(dailyLogs, workoutLogs, cardioLogs, plan.action)
        });
    },
    goCheckin() {
        wx.switchTab({ url: "/pages/checkin/checkin" });
    },
    goWorkout() {
        wx.switchTab({ url: "/pages/workout/workout" });
    },
    goCardio() {
        wx.navigateTo({ url: "/pages/cardio/cardio" });
    }
});
