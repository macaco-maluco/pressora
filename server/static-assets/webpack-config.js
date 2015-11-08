import path from 'path'
import { DefinePlugin, HotModuleReplacementPlugin, optimize } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import reactTransform from 'babel-plugin-react-transform'
import { join } from 'path'

const projectPath = join(__dirname, '../../')
const watch = process.env.NODE_ENV !== 'production'


const plugins = [
  new HtmlWebpackPlugin({ template: 'client/landing-page.html', filename: 'index.html', chunks: ['common', 'index'], inject: true }),
  new HtmlWebpackPlugin({ template: 'client/game.html', filename: 'game.html', chunks: ['common', 'game'], inject: true }),
  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new optimize.CommonsChunkPlugin({ name: 'common' })
]

if (watch) {
  plugins.push(new HotModuleReplacementPlugin())
} else {
  plugins.push(new optimize.UglifyJsPlugin())
}


const entry = {
  index: ['./landing-page'],
  game: ['./game']
}
if (watch) {
  Object.keys(entry).forEach(e => entry[e].push('webpack-hot-middleware/client'))
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
    filename: '[name]-[hash].js',
    chunkFilename: '[id].bundle.js'
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
        loader: 'url-loader?limit=33792&name=[name]-[hash].[ext]'
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
