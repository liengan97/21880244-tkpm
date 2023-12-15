interface LocalMap {
  [key: string]: any
}

export class SimpleCache<T> {
  private map: LocalMap;

  constructor() {
    this.map = {};
  }

  add(key: string, value: T) {
    this.map[key] = value;
  }

  get(key: string) {
    return this.map[key];
  }

  remove(key: string) {
    delete this.map[key];
  }

  entries() {
    return Object.entries(this.map);
  }

  has(key: string) {
    return this.map[key];
  }
}

// class SimpleInmemoryCacheDao<T> {

//   private cache: SimpleCache<T>;

//   constructor() {
//     this.cache = new SimpleCache<T>();
//   }

//   getCache(cacheName: string): SimpleCache<T> {
//     if (!this.cache.get(cacheName)) {
//       const simpleCache: SimpleCache<T> = new SimpleCache<T>();
//       this.cache.add(cacheName, simpleCache);
//     }

//     const cache = this.cache.get(cacheName);
//     if (!(cache instanceof SimpleCache)) {
//       throw Error("Cache error");
//     }

//     return cache;
//   }
// }

class SimpleInmemoryCacheDao {

  private simpleCache: SimpleCache<Object>;

  constructor() {
    this.simpleCache = new SimpleCache<Object>();
  }

  getCache<T>(cacheName: string): SimpleCache<T> {
    if (!this.simpleCache.has(cacheName)) {
      this.simpleCache.add(cacheName, new SimpleCache<T>())
    }
    return this.simpleCache.get(cacheName);
  }
}

export default new SimpleInmemoryCacheDao();