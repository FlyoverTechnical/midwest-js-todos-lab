const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const devMode = argv.mode === "development";
  const bootStaticDirectory = path.resolve(
    __dirname,
    "../todo-proxy/src/main/resources/static"
  );

  let outputPath = path.resolve(__dirname, "dist");
  if (!devMode) {
    outputPath = bootStaticDirectory;
  }

  return {
    devtool: "cheap-eval-source-map",
    output: {
      path: outputPath,
      publicPath: "/",
      filename: "[name].[chunkhash].js"
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader"
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(["dist", bootStaticDirectory], {
        watch: devMode,
        allowExternal: true
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].[hash].css"
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html"
      })
    ],
    devServer: {
      port: 8080,
      historyApiFallback: true,
      proxy: {
        "/api/**": {
          target: "http://localhost:8888",
          changeOrigin: true,
          secure: false
        }
      }
    }
  };
};
