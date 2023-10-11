/** @type {import('next').NextConfig} */

module.exports = {
  favicon: "/favicon.png",
};

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "groupa",
        mongodb_password: "lQmUgiSqy13bPiSo",
        mongodb_clustername: "recipes",
        mongodb_database: "devdb",
      },
      images: {
        domains: ["img.sndimg.com"],
      },
      reactStrictMode: true,
    };
  }

  return {
    env: {
      mongodb_username: "groupa",
      mongodb_password: "lQmUgiSqy13bPiSo",
      mongodb_clustername: "recipes",
      mongodb_database: "devdb",
    },
    images: {
      domains: ["img.sndimg.com"],
    },
    reactStrictMode: true,
  };
};
