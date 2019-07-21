const path = require('path')
const { createPluginPaths, createPluginOptions } = require('gatsby-source-netlify-cms')
const defaultConfig = require('./src/cms/default-config.json')

module.exports = (options) => {
  const config = {
    ...defaultConfig,
    ...options.config
  }
  const cmsPluginOptions = createPluginOptions(config)
  const cmsPluginPaths = createPluginPaths(config)
  // Pass the path for this plugin for the demo copy if needed
  // We only set this up if we have optional default data to load (best practice)
  cmsPluginOptions.copyRootPath = `${__dirname}`

  
  return {
    plugins: [
      // Setup the netlify cms source (data)
      {
        resolve: "gatsby-source-netlify-cms",
        options: cmsPluginOptions
      },
      // Setup the file source plugins for the above
      ...cmsPluginPaths,
      // Setup the netlify cms plugin
      {
        resolve: 'gatsby-plugin-netlify-cms',
        options: {
          modulePath: `${__dirname}/src/cms`,
          manualInit: true, // We will not load a config automatically
        },
      }
    ]
  }
}