import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";

const mainNav = [
  { icon: HomeIcon, title: "Home" },
  { icon: SearchIcon, title: "Your Library" },
  { icon: LibraryIcon, title: "Library" },
];

const secNav = [
  { icon: PlusCircleIcon, title: "Create Playlist" },
  { icon: HeartIcon, title: "Liked Songs" },
  { icon: RssIcon, title: "Your Episodes" },
];

const styles = {
  wrapper:
    "border-gray-900 p-5 text-xs text-gray-500 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36",
  btnWrapper: "space-y-4",
  btn: "flex items-center space-x-2 hover:text-white",
  icon: "h-5 w-5",
  hr: "border-t-[0.1px] border-gray-900",
  playlist: "cursor-pointer hover:text-white",
};

export { mainNav, secNav, styles };
