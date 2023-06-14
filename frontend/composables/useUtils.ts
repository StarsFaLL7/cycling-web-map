export const clearRoute = () => {
  const route = useRoute();
  const router = useRouter();

  return router.replace(route.path);
};

export const setRouteQuery = (key: string, query: string) => {
  const route = useRoute();
  const router = useRouter();

  return router.replace(`${route.path}?${key}=${query}`);
};

export const getLocalUrl = (path: string) => {
  if (path.startsWith("/")) path = path.substring(1);
  return new URL(`../assets/${path}`, import.meta.url).href;
};