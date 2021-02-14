/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const WebpackShellPluginNext = require('webpack-shell-plugin-next')

const cssLoader = 'css-loader';


const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: ['autoprefixer']
    }
  }
};

module.exports = function(env, { runTest, analyze }) {
  const production = env.production || process.env.NODE_ENV === 'production';
  const test = env.test || process.env.NODE_ENV === 'test';
  return {
    mode: production ? 'production' : 'development',
    devtool: production ? 'source-map' : 'inline-source-map',
    entry: test ? './test/all-spec.ts' :  './src/main.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'entry-bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    devServer: {
      historyApiFallback: true,
      open: false,
      lazy: false
    },
    module: {
      rules: [
        { test: /\.(png|gif|jpg|cur)$/i, loader: 'url-loader', options: { limit: 8192 } },
        { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff2' } },
        { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
        { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' },
        { test: /\.css$/i, use: [ 'style-loader', cssLoader, postcssLoader ] },
        { test: /\.ts$/i, use: ['ts-loader', '@aurelia/webpack-loader'], exclude: /node_modules/ },
        { test: /\.html$/i, use: '@aurelia/webpack-loader', exclude: /node_modules/ }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'index.ejs' }),
      analyze && new BundleAnalyzerPlugin(),
      test && runTest && new WebpackShellPluginNext({
        dev: false,
        swallowError: true,
        onBuildEnd: {
          scripts: [ 'npm run test:headless' ]
        }
      })
    ].filter(p => p)
  }
}
