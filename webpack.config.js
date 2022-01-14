const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.jsx"),
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "bundle.js"
  },
  devServer: {
    // contentBase
    static: {
      directory: path.join(__dirname, "public/")
    },
    port: 9000,
    // hotOnly
    hot: "only",
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        pathRewrite: { "^/api": "" }
      },
      "/messages": {
        target: "http://localhost:3001",
        pathRewrite: { "^/messages": "" }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults"
                  }
                ],
                "@babel/preset-react"
              ]
            }
          }
        ]
      }
    ]
  }
};
