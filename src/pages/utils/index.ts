import { Base64 } from "js-base64"

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
