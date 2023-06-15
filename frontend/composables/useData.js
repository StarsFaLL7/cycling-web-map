export const getRoutes = async () => {
    const {find} = useStrapi4();

    return await find("routes", {
        populate: "*",
    });
};

export const getRoute = async (id) => {
    const {findOne} = useStrapi4();

    return await findOne("routes", id, {
        populate: ['coords', 'author', 'createdBy']
    });
}

export const getPlaces = async () => {
    const {find} = useStrapi4();

    return await find("places", {
        populate: "*",
    });
};