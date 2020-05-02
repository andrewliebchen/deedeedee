import { AUI, OCUI } from "./utils/presets";

export default {
  scenes: {
    "Scene 1": { background: "dome" },
    "Scene 2": { background: "dome" },
    "Scene 3": { background: "dome" },
    "Scene 4": { background: "dome" },
    "Scene 5": { background: "dome" }
  },
  planes: {
    "AUI Bar": {
      ...AUI.bar
    },
    "Sharing tablet": { ...AUI.tablet },
    "Camera roll": { ...AUI.tablet },
    "Max view": { ...OCUI.dialog },
    "USS destinations": { ...OCUI.dialog },
    "Newsfeed Composer": { ...OCUI.dialog }
  }
};
