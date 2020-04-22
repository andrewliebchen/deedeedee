import React from "react";
import { Flex, Button, Select } from "theme-ui";
import figma from "../figma";
import { encodeString } from "use-query-params";
import { getCurrentScene } from "../utils/helpers";

const Nav = props => (
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
    <Button onClick={() => props.setSceneId(encodeString("0:1"))} mr={2}>
      {getCurrentScene(props.sceneId) ? "Home" : "Start"}
    </Button>
    <Select
      sx={{ pr: 5 }}
      value={props.sceneId}
      onChange={event => props.setSceneId(event.target.value)}
    >
      {figma
        .filter(node => node.nodeType === "page")
        .map(scene => (
          <option key={scene.id} value={scene.id}>
            {scene.name}
          </option>
        ))}
    </Select>
    <Button
      variant="secondary"
      ml={2}
      onClick={() => props.setCursor(!props.cursor)}
    >
      {props.cursor ? "Hide cursor" : "Show cursor"}
    </Button>
  </Flex>
);

export default Nav;
