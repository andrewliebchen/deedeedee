import figma from "../figma";

export const sizeConversion = 1000;

export const getCurrentScene = sceneId =>
  figma.find(node => node.nodeType === "page" && node.id === sceneId);
