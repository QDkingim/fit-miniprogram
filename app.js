"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloud_1 = require("./utils/cloud");
const storage_1 = require("./utils/storage");
App({
    onLaunch() {
        (0, cloud_1.initCloud)();
        (0, storage_1.syncLocalDataToCloud)();
    },
    globalData: {}
});
