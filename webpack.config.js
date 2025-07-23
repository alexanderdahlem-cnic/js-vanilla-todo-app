const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/js/index.ts",
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "public/dist"),
    publicPath: "/dist/",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 8666,
    open: true,
    liveReload: true,
    hot: false,
    watchFiles: ["public/**/*.html", "src/**/*.{js,ts,scss}"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
  ],
  resolve: {
    extensions: [".ts", ".js", ".scss"],
  },
};
