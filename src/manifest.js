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
    "AUI Tablet": {
      position: {
        x: 0,
        y: 1.5,
        z: -1
      },
      rotation: {
        x: -8
      },
      target: "Page 2"
    },
    "AUI Bar": {
      position: {
        x: 0,
        y: 1.2,
        z: -1
      },
      rotation: {
        x: -48
      }
    },
    Dialog: {
      position: {
        x: 0,
        y: 1.5,
        z: -1.2
      }
    }
  }
};
