export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 192,
      propList: ['*'],
      minPixelValue: 2, // 忽略小于 2px 的转换
    },
  },
};
