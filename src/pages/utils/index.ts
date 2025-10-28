import { Base64 } from "js-base64"
import { notification } from 'antd';
import { isObject, } from 'lodash-es';
/**
 * 获取连续解码后的验证码
 * @param count 解码次数
 * @returns 解码后的字符串
 */
export function getContCode(count: number, code: string): string {
  let initialCode = code
  if (count > 0) {
    for (let i = 0; i < count; i++) {
      initialCode = Base64.decode(initialCode)
    }
  }
  return initialCode
}



export const safeParseWechatPayJSON = (input: string | object | undefined, cuTitle?: string) => {
  if (!input) {
    return null;
  }
  if (isObject(input)) {
    return input
  }
  const cleanInput = input
    .toString() // 防止非字符串输入
    .trim() // 去除首尾空白
    .replace(/\s+/g, ''); // 去掉空格和换行符
  try {
    return JSON.parse(cleanInput);
  } catch (error) {
    console.error(error);
    notification.error({
      message: '操作提示',
      description: `${cuTitle ? cuTitle : ""}数据转换出错了，请检查数据格式！`,
      placement: 'topRight', // 通知弹出位置
      duration: 5, // 自动关闭时间（秒）
    });
    return null;
  }
};
