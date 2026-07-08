import { defaultProfile, getProfile, saveProfile } from "../../utils/storage";

Page({
  data: {
    profile: defaultProfile
  },

  async onShow() {
    this.setData({ profile: await getProfile() });
  },

  onInput(event: WechatMiniprogram.Input) {
    const field = event.currentTarget.dataset.field;
    this.setData({
      [`profile.${field}`]: Number(event.detail.value) || 0
    });
  },

  async save() {
    await saveProfile(this.data.profile);
    wx.showToast({ title: "已保存", icon: "success" });
  }
});
