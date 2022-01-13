const { getStorys, getStory, addStory, updateStory, deleteStory, } = require('./story.controller');
     
/**
 * Used as a router for the User's routes.
 *
 * @param fastify fastify instance
 * @param options
 * @param done
 */
function storyRoutes(fastify, options, done) {

    fastify.get('/all', getStorys);
    
    fastify.get('/:id', getStory);
    
    fastify.post('/add', addStory);
    
    fastify.put('/edit/:id', updateStory);
    
    fastify.delete('/:id', deleteStory);
    
    done();
};
    
module.exports = storyRoutes;