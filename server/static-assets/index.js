import webpack from 'webpack'
import webpackConfig from './webpack-config'


export default function (app) {
  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
}


export function build (cb) {
  const compiler = webpack(webpackConfig)
  compiler.run(cb)
}
