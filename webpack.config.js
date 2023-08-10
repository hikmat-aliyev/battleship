const path = require('path');

module.exports = {
  mode: 'development',
  entry: './resources/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
