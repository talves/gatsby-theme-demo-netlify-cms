const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const baseConfig = require('./src/cms/default-config.json')

const pascalCase = str => {
  return ` ${str}`.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

const { collections } = baseConfig
const markdownCollections = collections.filter(collection => collection.folder)

exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const { basePath = '/' } = options

  markdownCollections.forEach(async (collection) => {
    // create the collection page
    const slug = path.join(basePath, `${collection.name}`).replace(/\\/g, '/')
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/${collection.name}/index.js`),
    })
    // create the item pages for the collection
    const allName = `all${pascalCase(collection.name)}`
    const result = await graphql(`
      query {
        ${allName} {
          nodes {
            internal {
              type
            }
            name
            slug
          }
        }
      }
    `)

    if (result.errors) {
      reporter.panic(`Error loading the query ${allName}`, result.errors)
    }

    result.data[allName].nodes.forEach(node => {
      const slug = path.join(basePath, node.internal.type.toLowerCase(), node.name).replace(/\\/g, '/')
      actions.createPage({
        path: slug,
        component: require.resolve(`./src/templates/${collection.name}.js`),
        context: {
          name: node.name,
          slug,
          collection: collection.name,
        }
      })
    })
  })

}

/*
  Runs prior to Gatsby doing anything else
  We are creating the cms config from options and base!
*/
exports.onPreBootstrap = (props, options) => {
  const { store, reporter } = props
  const { config = {} } = options
  const { program } = store.getState()

  // Combine the base config with passed in config, (overwrites base)
  const newConfig = {
    ...baseConfig,
    ...config,
  }
  const dirName = path.dirname(require.resolve('./')) // __dirname
  const dirProgram = path.dirname(require.resolve(program.directory))

  const cmsDir = path.join(dirName, `./src/cms`)
  // Write out the config for the build of the cms (src/cms/config.json)
  if (!fs.existsSync(cmsDir)) mkdirp.sync(cmsDir)
  const configFilePath = path.join(cmsDir, `config.json`)
  if (!fs.existsSync(configFilePath)) {
    fs.writeFileSync(configFilePath, JSON.stringify(newConfig, null, 2), { flag: 'w', encoding: 'utf8' });
  } else {
    reporter.warn(`[gatsby-theme-demo-netlify-cms] File ${configFilePath} already exists!`);
  }
  // shadow the config file when using this theme as a plugin!
  if (dirName !== dirProgram) {
    const shadowDir = path.join(program.directory, `./src/gatsby-theme-demo-netlify-cms/cms`)
    if (!fs.existsSync(shadowDir)) mkdirp.sync(shadowDir)
    const shadowFilePath = path.join(shadowDir, `config.json`)
    if (!fs.existsSync(shadowFilePath)) {
      fs.writeFileSync(shadowFilePath, JSON.stringify(newConfig, null, 2), { flag: 'w', encoding: 'utf8' });
    } else {
      reporter.warn(`[gatsby-theme-demo-netlify-cms] Shadow File ${shadowFilePath} already exists!`);
    }
  }
}

exports.onCreateDevServer = ({ app }) => {
  const fsMiddlewareAPI = require('netlify-cms-backend-fs/dist/fs')
  fsMiddlewareAPI(app)
}
