export const getRoutes = async () => {
  const { find } = useStrapi4();

  return await find("routes", {
    populate: "*",
  });
};
