const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const src = path.resolve(__dirname, `src`)
const dst = path.resolve(__dirname, `public`)

module.exports = {
  context: src,
  entry: path.resolve(src, `index.ts`),
  output: {
    path: dst,
    filename: `bundle.[hash].min.js`
  },
  mode: 'production',
  devServer: {
    contentBase: dst,
    compress: true,
    inline: true,
    host: 'localhost',
    port: 8000,
    hot: true,
    liveReload: true,
    watchContentBase: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [`ts-loader`],
      },
      {
        test: /\.html$/,
        loader: `html-loader`,
        options: {
          minimize: true,
        },
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          `style-loader`,
          {
            loader: `css-loader`,
            options: {
              importLoaders: 2
            }
          },
          `sass-loader`,
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({
                  grid: true,
                })
              ],
            },
          },
          {
            loader: "sass-loader",
            options: {}
          }
        ],
      },
			{
				test: /\.(jpg|jpeg|JPG|JPEG|png|gif|svg|mp4|webm|ttf|woff2|woff|eot)$/i,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
            outputPath: 'assets',
            esModule: false,
					}
				}
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      options: {
        minimize: {
          minifyCSS: true,
          useShortDoctype: true,
        },
      },
      minify: false,
    }),
    new CopyWebpackPlugin([
			{ 
				from: './assets', 
				to: path.resolve(dst, './assets'),
				ignore: [],
			},
    ], {context: src}),
    new WriteFileWebpackPlugin(),
  ],
  resolve: {
    extensions: [`.ts`],
  },
}