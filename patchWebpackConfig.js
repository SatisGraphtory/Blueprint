const fs = require('fs').promises;

async function patch() {
  let webpackConfig = await fs.readFile(
    './node_modules/react-scripts/config/webpack.config.js',
    'utf-8'
  );
  webpackConfig = webpackConfig.replace('new ForkTsCheckerWebpackPlugin({', 'new ForkTsCheckerWebpackPlugin({useTypescriptIncrementalApi: false,');
  await fs.writeFile(
    './node_modules/react-scripts/config/webpack.config.js',
    webpackConfig,
    'utf-8'
  );
}
patch();