import { HttpClient } from 'utils';

/**
 * 获取类型字典服务
 * @param  params 格式为{ type: typeArray }
 */
export async function getTypeDicts(params) {
  return HttpClient.get('/api/typedicts', params);
}
