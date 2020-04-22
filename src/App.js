import "aframe";
import { Entity, Scene } from "aframe-react";
import {
  useQueryParam,
  StringParam,
  encodeString,
  decodeString
} from "use-query-params";
import dome from "./images/oculus_dome.jpg";
import manifest from "./manifest";
import figma from "./figma";
import React from "react";

const conversionRate = 1000;

const App = () => {
  const [scene, setScene] = useQueryParam("scene", StringParam);

  return (
    <div>
      <button
        style={{ position: "fixed", zIndex: 1 }}
        onClick={() => setScene(encodeString("0:1"))}
      >
        Home
      </button>
      <Scene vrModeUi={{ enabled: true }}>
        <Entity primitive="a-sky" src={dome} />
        {figma
          .filter(
            node =>
              node.nodeType === "frame" &&
              node.parent.id === decodeString(scene)
          )
          .map(plane => {
            const planeManifest = manifest.planes[plane.name];

            const buffer = new Uint8Array(Object.values(plane.bytes));
            const src = `data:image/jpeg;base64,${Buffer.from(buffer).toString(
              "base64"
            )}`;

            return (
              <Entity
                key={plane.id}
                geometry={{
                  primitive: "plane",
                  width: plane.width / conversionRate,
                  height: plane.height / conversionRate
                }}
                material={{ src: src }}
                position={planeManifest.position}
                rotation={planeManifest.rotation}
                events={{
                  click: () =>
                    planeManifest.target && setScene(encodeString("28:31"))
                }}
              />
            );
          })}
        <Entity primitive="a-camera">
          <Entity
            primitive="a-cursor"
            animation__click={{
              property: "scale",
              startEvents: "click",
              from: "0.1 0.1 0.1",
              to: "1 1 1",
              dur: 150
            }}
          />
        </Entity>
      </Scene>
    </div>
  );
};

export default App;
