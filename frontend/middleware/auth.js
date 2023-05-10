export default defineNuxtRouteMiddleware((to, from) => {
  const user = useStrapiUser();

  if (from.path === "/profile" && !user.value) {
    return navigateTo("/");
  }

  if (to.path === "/profile" && !user.value) {
    return abortNavigation();
  }
});
