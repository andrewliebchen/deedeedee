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
import { Button, Box, Flex, Select } from "theme-ui";

const conversionRate = 1000;

const App = () => {
  const [sceneId, setSceneId] = useQueryParam("scene", StringParam);
  const currentScene = figma.find(
    node => node.nodeType === "page" && node.id === sceneId
  );

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Flex
        sx={{
          bg: "background",
          borderRadius: 8,
          bottom: 0,
          m: 3,
          p: 2,
          position: "fixed",
          zIndex: 1,
          justifyContent: "space-between"
        }}
      >
        <Button onClick={() => setSceneId(encodeString("0:1"))} mr={2}>
          {currentScene ? "Home" : "Start"}
        </Button>
        <Select
          sx={{ pr: 5 }}
          onChange={event => setSceneId(event.target.value)}
        >
          {figma
            .filter(node => node.nodeType === "page")
            .map(scene => (
              <option key={scene.id} value={scene.id}>
                {scene.name}
              </option>
            ))}
        </Select>
      </Flex>
      {currentScene && (
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
              const src = `data:image/jpeg;base64,${Buffer.from(
                buffer
              ).toString("base64")}`;

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
      )}
    </Box>
  );
};

export default App;
