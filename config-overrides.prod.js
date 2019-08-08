var CompressionPlugin = require('compression-webpack-plugin');

module.exports = function(config) {
    config.plugins.splice(-1, 0, new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        // test: /\.js$|\.css$/,
        test: /\.js$/,
        // deleteOriginalAssets: true,
        cache: true
    }));
}
