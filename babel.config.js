module.exports = function (api) {
  const isTest = api.env('test')
  const presets = [
    [
      "@babel/preset-env",
      {
        "modules": isTest ? 'commonjs' : false,
        "targets": [
          "last 2 versions",
          "Firefox ESR",
          "not ie < 11",
          "not ie_mob <= 11",
          "not op_mini all",
          "not op_mob 12.1",
          "not bb 7"
        ]
      }
    ],
    "@babel/preset-react"
  ]

  if (isTest) {
    presets.push(
      "@babel/preset-typescript"
    )
  }

  return {
    presets,
    "plugins": [
      [
        "babel-plugin-styled-components",
        {
          "ssr": false
        }
      ],
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-class-properties",
      [
        "@babel/plugin-transform-runtime",
        {
          "regenerator": true
        }
      ],
      "react-hot-loader/babel"
    ]
  }
}
