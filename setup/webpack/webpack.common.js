const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const pathTo = require('../util');

module.exports = {
  entry: pathTo.entryPointSrc,
  output: {
    filename: '[name].[hash].js',
    path: pathTo.distDir,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              failOnError: true,
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
          },
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     hmr: process.env.NODE_ENV === 'development',
          //     reloadAll: true,
          //   },
          // },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[hash:base64:5]',
              importLoaders: 3,
            },
          },
          {
             loader: 'quark-loader',
             options: {
               compress: true,
             },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|jpg|jpeg|png|pdf)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin([
      { from: pathTo.publicDir, to: pathTo.dist },
    ]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
    }),
    new HtmlWebpackPlugin({
      title: 'I\'m Mohsen Shafiei',
      filename: 'index.html',
      languageCode: 'en-US',
      template: pathTo.htmlTemplateSrc,
      inject: true,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        description: `
          Mohsen Shafiei Tafreshi Official Website.
          Mohsen Shafiei is a frontend engineer.
          webpack, javascript, frontend, frontend developer,
          frontend engineer, css, html, frontend engineer.
        `,
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: pathTo.typescriptConfigSrc,
      async: false,
    }),
  ],
  resolve: {
    modules: [
      'node_modules',
      pathTo.srcDir,
    ],
    extensions: ['.ts', '.tsx', '.js', '.scss'],
  },
  target: 'web',
}
