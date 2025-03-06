import { defineConfig, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'
const DIRECTION_MAPPIINGS = { t: 'top', r: 'right', b: 'bottom', l: 'left' }

export default defineConfig({
    presets: [
        presetIcons({
            warn: true,
            prefix: ['i-'],
            extraProperties: {
                display: 'inline-block',
            },
        })
    ],
    transformers: [
        // 启用 @apply 功能
        transformerDirectives(),
        // 启用 () 分组功能
        // 支持css class组合，eg: `<div class="hover:(bg-gray-400 font-medium) font-(light mono)">测试 unocss</div>`
        transformerVariantGroup(),
        // Don't change the following order
        // transformerAttributify({
        //     // 解决与第三方框架样式冲突问题
        //     prefixedOnly: true,
        //     prefix: 'fg',
        // }),
    ],
    // 快捷方式
    shortcuts: {
        'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
        'btn-green': 'text-white bg-green-500 hover:bg-green-700',
    },
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
