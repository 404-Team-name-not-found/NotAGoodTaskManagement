const controller = require('./auth.controller');
/**
 * Used as a router for the Auth's routes.
 * @param fastify 
 * @param options
 * @param done
 */

const authRoutes = (fastify, options, done) => {
    fastify.post('/signup', controller.signUp);

    fastify.post('/signin', controller.signIn);

    done();
};

module.exports = authRoutes;