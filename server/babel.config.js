module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  ignore: [
    /node_modules/,
    /useCases\/.*\/tests\/[^\/]+\.test\.ts/,
   ],
  plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
}
