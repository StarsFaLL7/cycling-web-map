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
