import { atom } from "recoil";

type ItemType = {
  track: {
    name: string;
    id: string;
    album: {
      images: any[];
      name: string;
    };
    artists: any[];
    duration_ms: number;
    uri: string;
  };
};

interface Playlist {
  images: any[];
  name: string;
  description: string;
  followers: {
    total: number;
  };
  owner: {
    display_name: string;
  };
  tracks: {
    items: ItemType[];
    total: number;
  };
}

export const playlistState = atom({
  key: "playlistState",
  default: {} as Playlist,
});

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "77LmKGUhiSRuze7pDpqO6l" as string,
});
