const { getSprint,  getSprints,  addSprint,  updateSprint,  deleteSprint, } = require('./sprint.controller');
     
/**
 * Used as a router for the User's routes.
 *
 * @param fastify fastify instance
 * @param options
 * @param done
 */
function sprintRoutes(fastify, options, done) {

    fastify.get('/all', getSprints);
    
    fastify.get('/:id', getSprint);
    
    fastify.post('/add', addSprint);
    
    fastify.put('/edit/:id', updateSprint);
    
    fastify.delete('/:id', deleteSprint);
    
    done();
};
    
module.exports = sprintRoutes;