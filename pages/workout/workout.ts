import { todayKey } from "../../utils/date";
import { defaultExercises } from "../../utils/plan";
import { getWorkoutLogs, saveWorkoutLog } from "../../utils/storage";

Page({
  data: {
    date: todayKey(),
    exercises: defaultExercises
  },

  async onShow() {
    const date = todayKey();
    const logs = await getWorkoutLogs();
    const log = logs.find((item) => item.date === date);
    this.setData({
      date,
      exercises: log?.exercises || defaultExercises.map((item) => ({ ...item }))
    });
  },

  onExerciseInput(event: WechatMiniprogram.Input) {
    const index = Number(event.currentTarget.dataset.index);
    const field = event.currentTarget.dataset.field;
    this.setData({
      [`exercises[${index}].${field}`]: Number(event.detail.value) || undefined
    });
  },

  toggleDone(event: WechatMiniprogram.TouchEvent) {
    const index = Number(event.currentTarget.dataset.index);
    this.setData({
      [`exercises[${index}].done`]: !this.data.exercises[index].done
    });
  },

  async save() {
    await saveWorkoutLog({
      date: this.data.date,
      exercises: this.data.exercises
    });
    wx.showToast({ title: "已保存", icon: "success" });
  }
});
