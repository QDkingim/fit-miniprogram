"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_1 = require("../../utils/date");
const plan_1 = require("../../utils/plan");
const storage_1 = require("../../utils/storage");
Page({
    data: {
        date: (0, date_1.todayKey)(),
        exercises: plan_1.defaultExercises
    },
    onShow() {
        const date = (0, date_1.todayKey)();
        const log = (0, storage_1.getWorkoutLogs)().find((item) => item.date === date);
        this.setData({
            date,
            exercises: log?.exercises || plan_1.defaultExercises.map((item) => ({ ...item }))
        });
    },
    onExerciseInput(event) {
        const index = Number(event.currentTarget.dataset.index);
        const field = event.currentTarget.dataset.field;
        this.setData({
            [`exercises[${index}].${field}`]: Number(event.detail.value) || undefined
        });
    },
    toggleDone(event) {
        const index = Number(event.currentTarget.dataset.index);
        this.setData({
            [`exercises[${index}].done`]: !this.data.exercises[index].done
        });
    },
    save() {
        (0, storage_1.saveWorkoutLog)({
            date: this.data.date,
            exercises: this.data.exercises
        });
        wx.showToast({ title: "已保存", icon: "success" });
    }
});
