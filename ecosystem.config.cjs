module.exports = {
    apps: [
      {
        name: "rgesn-tracker",
        script: "./dist/server/entry.mjs",
        env: {
          NODE_ENV: "development",
          PORT: 8080,
        },
      },
    ],
  };
  