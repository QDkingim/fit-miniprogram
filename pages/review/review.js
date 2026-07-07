"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("../../utils/storage");
const stats_1 = require("../../utils/stats");
Page({
    data: {
        stats: (0, stats_1.buildReviewStats)([], [], []),
        weightDeltaText: "--"
    },
    onShow() {
        const stats = (0, stats_1.buildReviewStats)((0, storage_1.getDailyLogs)(), (0, storage_1.getWorkoutLogs)(), (0, storage_1.getCardioLogs)());
        const weightDeltaText = typeof stats.weightDelta === "number" ? `${stats.weightDelta > 0 ? "+" : ""}${stats.weightDelta}kg` : "--";
        this.setData({
            stats,
            weightDeltaText
        });
    }
});
