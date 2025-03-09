

// uno.config.ts
import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetUno,
    transformerDirectives,
    transformerVariantGroup,
    type Preset,
  } from 'unocss'

  const DIRECTION_MAPPIINGS = { t: 'top', r: 'right', b: 'bottom', l: 'left' }

  const presets: Preset[] = []

    presets.push(
      // 非小程序用官方预设
      presetUno(),
      // 支持css class属性化
      presetAttributify(),
    )

  export default defineConfig({
    presets: [
      ...presets,
      // 支持图标，需要搭配图标库，eg: @iconify-json/carbon, 使用 `<button class="i-carbon-sun dark:i-carbon-moon" />`
      presetIcons({
        scale: 1.2,
        warn: true,
        extraProperties: {
          display: 'inline-block',
          'vertical-align': 'middle',
        },
      }),
      // 将颜色函数 (rgb()和hsl()) 从空格分隔转换为逗号分隔，更好的兼容性app端，example：
      // `rgb(255 0 0)` -> `rgb(255, 0, 0)`
      // `rgba(255 0 0 / 0.5)` -> `rgba(255, 0, 0, 0.5)`
      // 与群友的正常写法冲突，先去掉！（2024-05-25）
      // presetLegacyCompat({
      //   commaStyleColorFunction: true,
      // }) as Preset,
    ],
    /**
     * 自定义快捷语句
     * @see https://github.com/unocss/unocss#shortcuts
     */
    shortcuts: [['center', 'flex justify-center items-center']],
    transformers: [
      // 启用 @apply 功能
      transformerDirectives(),
      // 启用 () 分组功能
      // 支持css class组合，eg: `<div class="hover:(bg-gray-400 font-medium) font-(light mono)">测试 unocss</div>`
      transformerVariantGroup(),
      // Don't change the following order
      // transformerAttributify({
      //   // 解决与第三方框架样式冲突问题
      //   prefixedOnly: true,
      //   prefix: 'fg',
      // }),
    ],
    rules: [
      [
        'p-safe',
        {
          padding:
            'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
        },
      ],
      ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
      ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
      [
        /^truncate-(\d+)$/,
        ([, d]) => ({
          overflow: 'hidden',
          display: '-webkit-box',
          'text-overflow': 'ellipsis',
          '-webkit-line-clamp': d,
          '-webkit-box-orient': 'vertical',
        }),
      ],
      [
        /^center-text-(\d+)$/,
        ([, d]) => ({
          height: `${d}px`,
          'align-items': 'center',
          'line-height': `${Number(d) - 2}px`,
        }),
      ],
      [
        /^wh-(full|\d+)(.*)/,
        ([, d, c]) => {
          if (d === 'full') {
            return {
              width: '100%',
              height: '100%',
            }
          } else {
            return {
              width: `${d}${c || 'px'}`,
              height: `${d}${c || 'px'}`,
            }
          }
        },
      ],
      [
        /^b(t|r|b|l|d)-(.*)/,
        ([, d, c]) => {
          const direction = DIRECTION_MAPPIINGS[d] || ''
          const p = direction ? `border-${direction}` : 'border'
          const attrs = c.split('_')
          if (
            // 属性中不包含 border-style 则默认 solid
            !attrs.some((item) =>
              /^(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)$/.test(item),
            )
          ) {
            attrs.push('solid')
          }
          // 属性中不包含 border-width 则默认 1px
          if (!attrs.some((item) => /^\d/.test(item))) {
            attrs.push('1px')
          }
          return {
            [p]: attrs.join(' '),
          }
        },
      ],
    ],
  })

