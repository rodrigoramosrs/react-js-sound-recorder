module.exports = {
  type: "react-component",
  npm: {
    esModules: true,
    umd: {
      global: "umd_build",
      externals: {
        react: "React",
      },
    },
  },
  babel: {
    runtime: false,
    env: {
      targets: {
        browsers: [
          "last 2 chrome versions",
          "last 2 firefox versions",
          "last 2 safari versions",
        ],
      },
    },
  },
};
