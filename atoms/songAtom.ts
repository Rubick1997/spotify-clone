import { atom } from "recoil";

export const curretTrackIdState = atom({
  key: "currentTrackIdState",
  default: "" as string,
});

export const isPLayingState = atom({
  key: "isPLayingState",
  default: false as boolean,
});
