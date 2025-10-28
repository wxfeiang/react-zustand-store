import { http } from '@/pages/utils/http/alova'
import { paramsAllData } from './types';

import { safeParseWechatPayJSON } from '../utils';
import { filter, map, merge } from 'lodash-es';

export function actionInfo(paramsAllData: paramsAllData) {
  const {
    bodyData,
    url,
    method,
    paramsData,
    outherData,
    headerData
  } = paramsAllData
  const meta = merge({}, ...map(outherData, (item => ({ [item.name]: item.status }))))
  const headers = merge(
    {},
    ...map(filter(headerData, (item => item.status && item.position === 'Header')),
      (item => ({ [item.key]: item.value }))
    )
  )
  const params = safeParseWechatPayJSON(paramsData, 'params')
  const data = safeParseWechatPayJSON(bodyData, 'body')
  if (method === 'POST') {
    return http.Post(url,
      data,
      {
        headers,
        meta,
        params
      }
    )
  }
  if (method === 'GET') {
    return http.Get(url,
      {
        headers,
        meta,
        params
      }
    )
  }
}



