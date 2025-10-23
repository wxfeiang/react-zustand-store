import react from '@vitejs/plugin-react-swc'
import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'
import path from 'node:path'
import { proxyServer } from './src/pages/utils/http/tools/proxyServer'
import dayjs from 'dayjs'
// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log('command, mode -> ', command, mode)
  const env = loadEnv(mode, path.resolve(process.cwd(), 'env'))
  const {
    VITE_APP_PORT,
    VITE_APP_TITLE,
    VITE_DELETE_CONSOLE,
    VITE_APP_PUBLIC_BASE,
    VITE_APP_PROXY_ENABLE,
  } = env
  console.log('环境变量 env -> ', env)
  return {
    envDir: './env', // 自定义env目录
    base: VITE_APP_PUBLIC_BASE,
    plugins: [react(), UnoCSS(), {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace('%BUILD_TIME%', dayjs().format('YYYY-MM-DD HH:mm:ss')).replace('%VITE_APP_TITLE%', VITE_APP_TITLE)
      },
    },],
    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src'),
        '@img': path.join(process.cwd(), './src/static/images'),
      },
    },
    server: {
      host: '0.0.0.0',
      hmr: true,
      port: Number.parseInt(VITE_APP_PORT, 10),
      // 仅 H5 端生效，其他端不生效（其他端走build，不走devServer)
      proxy: JSON.parse(VITE_APP_PROXY_ENABLE) ? proxyServer(env) : undefined,
    },
    esbuild: {
      drop: VITE_DELETE_CONSOLE === 'true' ? ['console', 'debugger'] : ['debugger'],
    },
    build: {
      sourcemap: false,
      // 方便非h5端调试
      // sourcemap: VITE_SHOW_SOURCEMAP === 'true', // 默认是false
      target: 'es6',
      // 开发环境不用压缩
      minify: mode === 'development' ? false : 'esbuild',
    },
  }

})
