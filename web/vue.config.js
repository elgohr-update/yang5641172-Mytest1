// vue.config.js
module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  devServer: {
    port: 8081
  },
  pwa: {
    name: "阅读",
    themeColor: "#ffffff",
    msTileColor: "#000000",

    appleMobileWebAppCapable: "yes",
    // appleMobileWebAppStatusBarStyle: "black-translucent"

    // manifestOptions: {
    //   display: "standalone"
    // }

    // configure the workbox plugin
    // workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      // swSrc: "src/service-worker.js"
      // ignoreURLParametersMatching: [new RegExp("accessToken")],
      runtimeCaching: [
        {
          // 首页
          urlPattern: new RegExp("^https://.*/index.html"),
          handler: "networkFirst",
          options: {
            cacheName: "home",
            cacheableResponse: {
              statuses: [200]
            }
          }
        },
        {
          // 获取书架
          urlPattern: new RegExp("^https://[^/]*/reader3/getBookshelf"),
          handler: "staleWhileRevalidate",
          options: {
            cacheName: "bookshelf",
            cacheableResponse: {
              statuses: [200]
            }
          }
        },
        {
          // 获取书源
          urlPattern: new RegExp("^https://[^/]*/reader3/getSources"),
          handler: "staleWhileRevalidate",
          options: {
            cacheName: "bookSources",
            cacheableResponse: {
              statuses: [200]
            }
          }
        },
        {
          // 获取书籍章节列表
          urlPattern: new RegExp("^https://[^/]*/reader3/getChapterList"),
          handler: "networkFirst",
          options: {
            cacheName: "bookChapterList",
            networkTimeoutSeconds: 5,
            cacheableResponse: {
              statuses: [200]
            }
          }
        },
        {
          // 获取书籍内容
          urlPattern: new RegExp("^https://[^/]*/reader3/getBookContent"),
          handler: "cacheFirst",
          options: {
            cacheName: "bookContent",
            cacheableResponse: {
              statuses: [200]
            },
            expiration: {
              maxAgeSeconds: 86400 * 30,
              maxEntries: 1000
            }
          }
        }
      ]
    }
  }
};
