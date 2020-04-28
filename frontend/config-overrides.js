const webpack = require('webpack')

module.exports = (config, env) => {
  const containerEnv = Object.keys(process.env).reduce((acc, curr) => {
    if (curr !== 'SECRET_KEY'){
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr])
      return acc
    }
  }, {})

  config.plugins.push(new webpack.DefinePlugin(containerEnv))

  return config
}