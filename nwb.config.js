// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  type: "react-component",
  webpack: {
    // terser: {
    //   terserOptions: {
    //     mangle: true,
    //     beautify: true
    //   }
    // },
    rules: {
      exclude: {
        test: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        exclude: [
          "src/lib/dist/wavesurfer.js",
          "src/lib/dist/plugin/wavesurfer.regions.js",
        ],
        loader: "dumb-loader",

      },
    },
  },
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
