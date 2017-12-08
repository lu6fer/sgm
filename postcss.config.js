
module.export = {
  plugins: [
      require('postcss-import')(),
      require('postcss-cssnext')({
          browsers : [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9'
          ]
      }),
      require('postcss-reporter')({
          clearAllMessages: true
      })
  ]
};