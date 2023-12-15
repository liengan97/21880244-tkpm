import InMemoryCacheDao, { SimpleCache } from '../dao/immemory.cache.dao';

export const getCache = <T>(cacheName: string): SimpleCache<T> => {
  return InMemoryCacheDao.getCache(cacheName);
}
