import "aframe";
import { Entity, Scene } from "aframe-react";
import {
  useQueryParam,
  StringParam,
  encodeString,
  decodeString
} from "use-query-params";
import manifest from "./manifest";
import figma from "./figma";
import React from "react";
import { backgrounds } from "./utils/backgrounds";

const conversionRate = 1000;

const App = () => {
  const [sceneId, setSceneId] = useQueryParam("scene", StringParam);
  const currentScene = figma.find(
    node => node.nodeType === "page" && node.id === sceneId
  );

  return (
    <div>
      <button
        style={{ position: "fixed", zIndex: 1 }}
        onClick={() => setSceneId(encodeString("0:1"))}
      >
        Home
      </button>
      <Scene vrModeUi={{ enabled: true }}>
        <Entity
          primitive="a-sky"
          src={backgrounds[manifest.scenes[currentScene.name].background]}
        />
        {figma
          .filter(
            node =>
              node.nodeType === "frame" &&
              node.parent.id === decodeString(sceneId)
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
                    planeManifest.target && setSceneId(encodeString("28:31"))
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
