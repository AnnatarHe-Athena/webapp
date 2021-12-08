const { promises: fs } = require('fs')
const gql = require('graphql-tag')
// const pkg = require('./package.json')

function onTransformGraphqlFile(content) {
  // const exportDefault = 'export default `' + gql(content) + '`'

  // return exportDefault
  return `export default ${JSON.stringify(gql(content))}`
}

const pkg = {
  name: 'snowpack-graphql-tag'
}

module.exports = function plugin(snowpackConfig, options) {
  return {
    name: pkg.name,
    resolve: {
      input: ['.graphql', '.gql'],
      output: ['.js'],
    },

    async load({ filePath }) {
      const content = await fs.readFile(filePath, { encoding: 'utf-8' });
      return {
        '.js': onTransformGraphqlFile(content),
      }
    }
  }
}
