import figma from "../figma";

export const sizeConversion = 500;

export const getCurrentScene = sceneId =>
  figma.find(node => node.nodeType === "page" && node.id === sceneId);
