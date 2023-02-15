import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function PrimaryDownloadButton(props) {
  const { buttonText } = props;

  const [browserOS, setBrowserOS] = useState("");

  useEffect(() => {
    if (navigator.userAgent.indexOf("Mac") != -1) {
    setBrowserOS("Download for Mac OS");
    } else if (navigator.userAgent.indexOf("Win") != -1) {
      setBrowserOS("Download for Windows");
    } else if (navigator.userAgent.indexOf("Lin") != -1) {
      setBrowserOS("Download for Linux");
    } else if (navigator.userAgent.indexOf("like Mac") != -1) {
      setBrowserOS("Your're on iOS!");
    } else if (navigator.userAgent.indexOf("Android") != -1) {
      setBrowserOS("Your're on Android!");
    } 
  }, []);

  console.log(navigator.userAgent)

  // "https://github.com/audacity/audacity/releases/download/Audacity-3.2.4/audacity-macOS-3.2.4-universal.dmg"
  // "https://github.com/audacity/audacity/releases/download/Audacity-3.2.4/audacity-win-3.2.4-x64.exe"
  // "https://github.com/audacity/audacity/releases/download/Audacity-3.2.4/audacity-linux-3.2.4-x64.AppImage"

  return (
    <motion.button
      className="flex w-fit gap-x-3 items-center rounded-md px-3 h-10 bg-blue-700 text-white mt-4"
      whileHover={{ scale: 1.15 }}
    >
      <svg
        className="w-4 fill-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
      </svg>
      {browserOS}
    </motion.button>
  );
}

export default PrimaryDownloadButton;