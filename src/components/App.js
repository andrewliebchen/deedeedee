import "aframe";
import { backgrounds } from "../utils/backgrounds";
import { Box } from "theme-ui";
import { Entity, Scene } from "aframe-react";
import { sizeConversion, getCurrentScene } from "../utils/helpers";
import {
  useQueryParam,
  StringParam,
  encodeString,
  decodeString
} from "use-query-params";
import Cursor from "./Cursor";
import figma from "../figma";
import manifest from "../manifest";
import Nav from "./Nav";
import React, { useState } from "react";

const App = () => {
  const [sceneId, setSceneId] = useQueryParam("scene", StringParam);
  const [cursor, setCursor] = useState(true);

  const currentScene = getCurrentScene(sceneId);

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Nav
        cursor={cursor}
        sceneId={sceneId}
        setCursor={setCursor}
        setSceneId={setSceneId}
      />
      {currentScene && (
        <Scene vrModeUi={{ enabled: true }}>
          <Entity
            primitive="a-sky"
            src={backgrounds[manifest.scenes[currentScene.name].background]}
            rotation={{ y: -90 }}
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
              const src = `data:image/png;base64,${Buffer.from(buffer).toString(
                "base64"
              )}`;

              return (
                <Entity
                  key={plane.id}
                  geometry={{
                    primitive: "plane",
                    width: plane.width / sizeConversion,
                    height: plane.height / sizeConversion
                  }}
                  material={{
                    src: src,
                    transparent: true
                  }}
                  position={planeManifest.position}
                  rotation={planeManifest.rotation}
                  events={{
                    click: () =>
                      planeManifest.target &&
                      setSceneId(
                        encodeString(
                          figma.find(
                            node =>
                              node.nodeType === "page" &&
                              node.name === planeManifest.target
                          ).id
                        )
                      )
                  }}
                />
              );
            })}

          <Entity primitive="a-camera">{cursor && <Cursor />}</Entity>

          <Entity primitive="tracked-controls" hand="left" />
          <Entity primitive="tracked-controls" hand="right" />

          <Entity trackedControls="hand: left" />
          <Entity trackedControls={{ hand: "right" }} />
        </Scene>
      )}
    </Box>
  );
};

export default App;
