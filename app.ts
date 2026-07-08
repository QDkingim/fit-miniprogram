import { initCloud } from "./utils/cloud";
import { syncLocalDataToCloud } from "./utils/storage";

App<IAppOption>({
  onLaunch() {
    initCloud();
    syncLocalDataToCloud();
  },
  globalData: {}
});
