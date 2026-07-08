"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_1 = require("../../utils/date");
const storage_1 = require("../../utils/storage");
const flags = ["protein", "carb", "vegetable", "sugarFree"];
Page({
    data: {
        today: (0, date_1.todayKey)(),
        date: (0, date_1.todayKey)(),
        weightKg: "",
        waistCm: "",
        steps: "",
        sleepHours: "",
        waterLiters: "",
        dietMap: {
            protein: false,
            carb: false,
            vegetable: false,
            sugarFree: false
        }
    },
    async onShow() {
        const editDate = wx.getStorageSync("pendingEditDate") || (0, date_1.todayKey)();
        wx.setStorageSync("pendingEditDate", "");
        await this.loadDate(editDate);
    },
    async loadDate(date) {
        const logs = await (0, storage_1.getDailyLogs)();
        const log = logs.find((item) => item.date === date);
        const dietMap = {
            protein: !!log?.dietFlags.includes("protein"),
            carb: !!log?.dietFlags.includes("carb"),
            vegetable: !!log?.dietFlags.includes("vegetable"),
            sugarFree: !!log?.dietFlags.includes("sugarFree")
        };
        this.setData({
            date,
            weightKg: log?.weightKg || "",
            waistCm: log?.waistCm || "",
            steps: log?.steps || "",
            sleepHours: log?.sleepHours || "",
            waterLiters: log?.waterLiters || "",
            dietMap
        });
    },
    onDateChange(event) {
        this.loadDate(event.detail.value);
    },
    onInput(event) {
        const field = event.currentTarget.dataset.field;
        this.setData({ [field]: event.detail.value });
    },
    toggleDiet(event) {
        const flag = event.currentTarget.dataset.flag;
        this.setData({ [`dietMap.${flag}`]: !this.data.dietMap[flag] });
    },
    async save() {
        const dietFlags = flags.filter((flag) => this.data.dietMap[flag]);
        await (0, storage_1.saveDailyLog)({
            date: this.data.date,
            weightKg: Number(this.data.weightKg) || undefined,
            waistCm: Number(this.data.waistCm) || undefined,
            steps: Number(this.data.steps) || undefined,
            sleepHours: Number(this.data.sleepHours) || undefined,
            waterLiters: Number(this.data.waterLiters) || undefined,
            dietFlags
        });
        wx.showToast({ title: "已保存", icon: "success" });
    }
});
