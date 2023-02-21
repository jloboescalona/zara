import compression from 'compression'
import { env } from 'process'
import express from 'express'
import { resolve } from 'path'
import webpack from 'webpack'

let frontPath = 'client'
const app = express()
const PORT = 3000

app.use(compression())

if (env?.NODE_ENV === 'development') {
  try {
    const webpackConfig = require('../../webpack.config.dev.client')
    const compiler = webpack(webpackConfig)

    app.use(
      require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
      })
    )

    app.use(
      require('webpack-hot-middleware')(compiler, {
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
      })
    )
  } catch (error) {
    if (error) {
      console.log("error", error)
    }
  }
  frontPath = '../client'
}

app.use('/client', express.static(
  resolve(__dirname, frontPath
)))

app.get('/*', (req, res)=>{

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>PodCaster</title>
      <meta name="theme-color" content="#ffffff">
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
    </head>
    <body>
      <div id="root"></div>
      <script src='/client/bundle.js'></script>
    </body>
    </html>
  `
  res.status(200).set({ 'Content-Type': 'text/html' }).end(html)

})

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});