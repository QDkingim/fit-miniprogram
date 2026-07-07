"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("../../utils/storage");
Page({
    data: {
        profile: (0, storage_1.getProfile)()
    },
    onShow() {
        this.setData({ profile: (0, storage_1.getProfile)() });
    },
    onInput(event) {
        const field = event.currentTarget.dataset.field;
        this.setData({
            [`profile.${field}`]: Number(event.detail.value) || 0
        });
    },
    save() {
        (0, storage_1.saveProfile)(this.data.profile);
        wx.showToast({ title: "已保存", icon: "success" });
    }
});
