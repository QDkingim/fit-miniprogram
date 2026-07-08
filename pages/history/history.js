"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("../../utils/storage");
function uniqueDates(dailyLogs, workoutLogs, cardioLogs) {
    return Array.from(new Set([...dailyLogs, ...workoutLogs, ...cardioLogs].map((item) => item.date))).sort().reverse();
}
function dietText(log) {
    if (!log || !log.dietFlags.length) {
        return "--";
    }
    const labels = {
        protein: "蛋白",
        carb: "主食",
        vegetable: "蔬菜",
        sugarFree: "控糖"
    };
    return log.dietFlags.map((flag) => labels[flag] || flag).join(" / ");
}
function workoutText(log) {
    if (!log) {
        return "--";
    }
    const done = log.exercises.filter((item) => item.done).length;
    return `${done}/${log.exercises.length} 个动作完成`;
}
Page({
    data: {
        dates: [],
        selectedDate: "",
        dailyLog: null,
        workoutLog: null,
        cardioLog: null,
        dietText: "--",
        workoutText: "--",
        hasRecord: false
    },
    async onShow() {
        await this.loadHistory();
    },
    async loadHistory(selectedDate) {
        const [dailyLogs, workoutLogs, cardioLogs] = await Promise.all([(0, storage_1.getDailyLogs)(), (0, storage_1.getWorkoutLogs)(), (0, storage_1.getCardioLogs)()]);
        const dates = uniqueDates(dailyLogs, workoutLogs, cardioLogs);
        const date = selectedDate || this.data.selectedDate || dates[0] || "";
        const dailyLog = dailyLogs.find((item) => item.date === date) || null;
        const workoutLog = workoutLogs.find((item) => item.date === date) || null;
        const cardioLog = cardioLogs.find((item) => item.date === date) || null;
        this.setData({
            dates,
            selectedDate: date,
            dailyLog,
            workoutLog,
            cardioLog,
            dietText: dietText(dailyLog || undefined),
            workoutText: workoutText(workoutLog || undefined),
            hasRecord: !!(dailyLog || workoutLog || cardioLog)
        });
    },
    onDateChange(event) {
        const index = Number(event.detail.value);
        const date = this.data.dates[index];
        this.loadHistory(date);
    },
    goCheckin() {
        wx.setStorageSync("pendingEditDate", this.data.selectedDate);
        wx.switchTab({ url: "/pages/checkin/checkin" });
    },
    goWorkout() {
        wx.setStorageSync("pendingEditDate", this.data.selectedDate);
        wx.switchTab({ url: "/pages/workout/workout" });
    },
    goCardio() {
        wx.setStorageSync("pendingEditDate", this.data.selectedDate);
        wx.navigateTo({ url: "/pages/cardio/cardio" });
    },
    deleteRecord(event) {
        const kind = event.currentTarget.dataset.kind;
        const date = this.data.selectedDate;
        if (!date) {
            return;
        }
        const labels = {
            daily: "打卡",
            workout: "训练",
            cardio: "快走"
        };
        wx.showModal({
            title: "删除记录",
            content: `确定删除 ${date} 的${labels[kind]}记录吗？`,
            confirmText: "删除",
            confirmColor: "#dc2626",
            success: async (result) => {
                if (!result.confirm) {
                    return;
                }
                if (kind === "daily") {
                    await (0, storage_1.deleteDailyLog)(date);
                }
                else if (kind === "workout") {
                    await (0, storage_1.deleteWorkoutLog)(date);
                }
                else {
                    await (0, storage_1.deleteCardioLog)(date);
                }
                wx.showToast({ title: "已删除", icon: "success" });
                await this.loadHistory("");
            }
        });
    }
});
