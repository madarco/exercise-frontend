let baseUrl = "https://swapi.tech/api";
const localCache = process.env.NEXT_PUBLIC_USE_LOCAL_CACHE != "false";

if (process.env.NEXT_PUBLIC_USE_SERVER_CACHE != "false") {
  baseUrl = "/api/swapi";
}

console.log(" ✓ Caching: ", { baseUrl, localStorageCache: localCache });

export { baseUrl, localCache };
