"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_1 = require("../../utils/date");
const plan_1 = require("../../utils/plan");
const storage_1 = require("../../utils/storage");
const stats_1 = require("../../utils/stats");
Page({
    data: {
        dateText: (0, date_1.todayKey)(),
        weekday: (0, date_1.weekdayText)(),
        plan: (0, plan_1.todayPlan)((0, date_1.weekdayText)()),
        stats: (0, stats_1.buildReviewStats)([], [], [])
    },
    onShow() {
        const weekday = (0, date_1.weekdayText)();
        this.setData({
            dateText: (0, date_1.todayKey)(),
            weekday,
            plan: (0, plan_1.todayPlan)(weekday),
            stats: (0, stats_1.buildReviewStats)((0, storage_1.getDailyLogs)(), (0, storage_1.getWorkoutLogs)(), (0, storage_1.getCardioLogs)())
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
