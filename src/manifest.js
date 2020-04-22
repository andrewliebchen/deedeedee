import { AUI, OCUI } from "./utils/presets";

export default {
  scenes: {
    "Page 1": {
      background: "dome"
    },
    "Page 2": {
      background: "office"
    }
  },
  planes: {
    "AUI Tablet": {
      ...AUI.tablet,
      target: "Page 2"
    },
    "AUI Bar": {
      ...AUI.bar
    },
    Dialog: {
      ...OCUI.dialog
    }
  }
};
