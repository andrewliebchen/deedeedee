import { AUI, OCUI } from "./utils/presets";

export default {
  scenes: {
    "Page 1": { background: "dome" },
    "Page 2": { background: "office" }
  },
  planes: { bar: { ...AUI.bar }, Modal: { ...OCUI.dialog } }
};
