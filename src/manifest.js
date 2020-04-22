// TODO: Add position helpers

export default {
  scenes: {
    "Page 1": {
      background: "dome"
    },
    "Page 2": {
      background: "dome"
    }
  },
  planes: {
    "Frame 1": {
      position: {
        x: 0,
        y: 1.5,
        z: -1
      },
      rotation: {
        x: -8
      }
    },
    "Frame 2": {
      position: {
        x: 0,
        y: 1.2,
        z: -1
      },
      rotation: {
        x: -48
      },
      target: "Page 2"
    }
  }
};
