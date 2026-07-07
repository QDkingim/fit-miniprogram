"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_1 = require("../../utils/date");
const storage_1 = require("../../utils/storage");
Page({
    data: {
        date: (0, date_1.todayKey)(),
        minutes: "35",
        speed: "5.0",
        incline: "5",
        fatigue: "3"
    },
    onShow() {
        const date = (0, date_1.todayKey)();
        const log = (0, storage_1.getCardioLogs)().find((item) => item.date === date);
        this.setData({
            date,
            minutes: log?.minutes || "35",
            speed: log?.speed || "5.0",
            incline: log?.incline || "5",
            fatigue: log?.fatigue || "3"
        });
    },
    onInput(event) {
        const field = event.currentTarget.dataset.field;
        this.setData({ [field]: event.detail.value });
    },
    save() {
        (0, storage_1.saveCardioLog)({
            date: this.data.date,
            minutes: Number(this.data.minutes) || 0,
            speed: Number(this.data.speed) || 0,
            incline: Number(this.data.incline) || 0,
            fatigue: Number(this.data.fatigue) || 3,
            done: true
        });
        wx.showToast({ title: "已保存", icon: "success" });
    }
});
