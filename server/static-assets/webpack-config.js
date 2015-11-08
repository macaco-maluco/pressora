import path from 'path'
import { HotModuleReplacementPlugin, optimize } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import reactTransform from 'babel-plugin-react-transform'
import { join } from 'path'

const projectPath = join(__dirname, '../../')
const watch = process.env.NODE_ENV !== 'production'


const plugins = [new HtmlWebpackPlugin({ template: 'client/index.html', inject: true })]
if (watch) {
  plugins.push(new HotModuleReplacementPlugin())
} else {
  plugins.push(new optimize.UglifyJsPlugin())
}


const entry = ['./index']
if (watch) {
  entry.push('webpack-hot-middleware/client')
}


export default {
  context: projectPath + '/client',

  eslint: {
    configFile: path.join(projectPath, '.eslintrc'),
    failOnError: !watch
  },

  entry,

  resolve: {
    root: [
      path.join(projectPath, '/node_modules')
    ]
  },

  output: {
    path: path.join(projectPath, 'dist'),
    filename: 'index-[hash].js'
  },

  plugins,

  babel: {
    optional: ['runtime'],
    stage: 0,
    env: {
      development: {
        plugins: [reactTransform],
        extra: {
          'react-transform': {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module']
            }, {
              transform: 'react-transform-catch-errors',
              imports: ['react', 'redbox-react']
            }]
          }
        }
      }
    }
  },

  module: {
    preLoaders: [
      {
        test: /(\.js)|(\.jsx)$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],

    loaders: [
      {
        test: /\.(png|jpg|gif|mp3)$/,
        loader: 'url-loader?limit=8192&name=[name]-[hash].[ext]'
      },
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!autoprefixer-loader?browsers=last 2 versions!resolve-url!sass?sourceMap&outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(projectPath, './node_modules'))
      },
      {
        test: /\.(ttf|eot|woff|svg)$/,
        loader: 'file?name=[name]-[hash].[ext]'
      },
      {
        test: /(\.js)|(\.jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}
