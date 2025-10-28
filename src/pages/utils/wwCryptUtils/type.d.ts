// system params type

// 定义 Header 接口
interface Header {
  responsek?: string
  ResponseK?: string
  responsev?: string
  Responsev?: string
}
// 定义 Response 接口
interface Response {
  header: Header
  data: string | IResponse
  statusCode: number | string
  errMsg?: string
}

interface ParamList {
  enable: boolean
  paramList: string[]
  whiteList: string[]
  headerKey: string
  expandMap: { [key: string]: unknown[] }
  type: string
  paramId: string
}
interface FilterData {
  enable: boolean
  paramList: string[]
  whiteList: string[]
  headerKey: string
  expandMap: { [key: string]: unknown[] }
  type: string
  paramId: string
}
interface SysTemType {
  resstrppd: string;
  appSecret: string;
  dot: string;
  filterData: FilterData;

}
interface ResponseHeader {
  responsek?: string;
  ResponseK?: string;
  responsev?: string;
  Responsev?: string;
}

interface ResponseData {
  headers: ResponseHeader;
  data: string;
}

interface DecryptedResult {
  msg?: string;
  [key: string]: unknown;
}
interface RequestConfig {
  headers: Record<string, string>;
  params?: string;
}

interface RequestMethod {
  type: string;
  url: string;
  data: unknown;
  config: RequestConfig;
}


