import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // mode: 'development',
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    server: {
      headers: {
        "Content-Security-Policy":
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
          "connect-src 'self' http://localhost:8080 http://localhost:3000 ws://localhost:* http://ip-api.com https://nominatim.openstreetmap.org http://weather.service.msn.com;" +
          "img-src 'self' data: blob: http://localhost:3000"
      }
    },
    devServer:{
      proxy:"http://localhost:8080"    //请求路径为http://localhost:5000的资源时要走代理
    }
  }
})
