const { getUsers, getUser, addUser, updateUser, deleteUser, } = require('./user.controller.js');
     
/**
 * Used as a router for the User's routes.
 *
 * @param fastify fastify instance
 * @param options
 * @param done
 */
function userRoutes(fastify, options, done) {

    fastify.get('/all', getUsers);
    
    fastify.get('/:email', getUser);
    
    fastify.post('/add', addUser);
    
    fastify.patch('/edit/:email', updateUser);
    
    fastify.delete('/:email', deleteUser);
    
    done();
};
    
module.exports = userRoutes;
