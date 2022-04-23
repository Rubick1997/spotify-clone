const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const styles = {
  wrapper:
    "relative top-0 flex-grow h-screen overflow-y-scroll scrollbar-hide bg-gray-900",
  header: "absolute top-10 right-8",
  userWrapper:
    "flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-80",
  userImg: "h-10 w-10 rounded-full",
  chevronIcon: "h-5 w-5",
  section:
    "flex h-80 items-end space-x-7 bg-gradient-to-b to-black p-8 text-white",
  playlistImg: "h44 w-44 shadow-2xl",
  playlistName: "md:text:3xl text-2xl font-bold xl:text-5xl",
  playlistDescr: "hidden md:inline-flex text-gray-500",
};

export { colors, styles };
