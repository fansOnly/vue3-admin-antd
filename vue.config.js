/* eslint-disable no-undef */
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: process.env.NODE_ENV === 'development',
    devServer: {
        port: 8020,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                ws: false,
                chainOrigin: true, // 跨域
                pathRewrite: {
                    '^/api': '/'
                }
            }
        },
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true
                }
            },
        }
    },
    configureWebpack: () => {
        if(process.env.NODE_ENV === 'production') {
            return {
                optimization: {
                    minimizer: [
                        new TerserPlugin({
                            sourceMap: false,
                            terserOptions: {
                                compress: {
                                    // warnings: false,
                                    drop_console: true, //注释console
                                    drop_debugger: true,
                                    pure_funcs: ['console.log'] //移除console
                                }
                            }
                        })
                    ]
                }
            }
        }
    },
    chainWebpack: config => {
        config.plugin('html')
            .tap(options => {
                options[0].title = 'fans design'
                return options
            })
        // config
        //     .when(process.env.NODE_ENV === 'development',
        //         config => config.devtool('source-map')
        //     )
        config.resolve.alias.set('@', resolve('src'))
            .set('views', resolve('src/views'))
            .set('components', resolve('src/components'))
            .set('config', resolve('src/config'))
            .set('api', resolve('src/api'))
            .set('utils', resolve('src/utils'))
        config.when(process.env.NODE_ENV === 'production',
            config => {
                config.plugin('CompressionWebpackPlugin')
                    .use(require('compression-webpack-plugin'), [{
                        algorithm: 'gzip',
                        test: /\.(js|css)/,
                        threshold: 10240,  // 处理资源大小
                        minRatio: 0.6,  // 压缩比例
                        // deleteOriginalAssets: false,  // 删除原始资源文件
                    }])
                    .end()
                // config.plugin('BundleAnalyzerPlugin')
                //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                //     .end()
                // config
                //     .plugin('SkeletonPlugin')
                //     .use('page-skeleton-webpack-plugin', [{
                //         pathname: path.resolve(__dirname, './shell'), // 用来存储 shell 文件的地址
                //         staticDir: path.resolve(__dirname, './dist'), // 最好和 `output.path` 相同
                //         routes: ['/admin',], // 将需要生成骨架屏的路由添加到数组中
                //     }])
                //     .end()
            }
        )
    }
}
