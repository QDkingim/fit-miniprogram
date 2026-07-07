import { getProfile, saveProfile } from "../../utils/storage";

Page({
  data: {
    profile: getProfile()
  },

  onShow() {
    this.setData({ profile: getProfile() });
  },

  onInput(event: WechatMiniprogram.Input) {
    const field = event.currentTarget.dataset.field;
    this.setData({
      [`profile.${field}`]: Number(event.detail.value) || 0
    });
  },

  save() {
    saveProfile(this.data.profile);
    wx.showToast({ title: "已保存", icon: "success" });
  }
});
