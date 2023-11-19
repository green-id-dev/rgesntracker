module.exports = {
    apps: [
      {
        name: "sustainable-checker",
        script: "./dist/server/entry.mjs",
        env: {
          NODE_ENV: "development",
          PORT: 4321,
        },
      },
    ],
  };
  