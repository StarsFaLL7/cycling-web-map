'use strict';

/**
 * route service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::route.route');
