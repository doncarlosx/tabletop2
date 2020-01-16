const path = require('path')

module.exports = {
    entry: {
        playerUI: path.resolve(__dirname, 'main.js'),
    },
    output: {
        filename: '[name].dist.js',
        path: path.resolve(__dirname),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    }
                ],
            },
        ],
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, '../..'),
        ]
    },
    devtool: 'source-map',
    devServer: {
        port: 8082,
    },
}