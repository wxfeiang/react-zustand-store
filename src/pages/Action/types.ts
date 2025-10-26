interface objData {
  [key: string]: unknown
}
type method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
interface outherDataType {
  key: string
  name: string
  desc: string
  status: boolean
}
interface IGlobalParam {
  key: string;
  name: string;
  value: string;
  position: 'Header' | 'Query' | 'Body'; // 常用的参数位置
  status: boolean;
}
interface paramsAllData {
  bodyData?: objData[] | string,
  headerData?: IGlobalParam[],
  url: string,
  method: method
  outherData: outherDataType[]
  paramsData?: objData[] | string

}
export type { paramsAllData, method, outherDataType, IGlobalParam }