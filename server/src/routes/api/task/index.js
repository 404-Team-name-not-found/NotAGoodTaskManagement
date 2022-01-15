const { getTasks, getTask, addTask, updateTask, deleteTask, } = require('./task.controller.js');
     
/**
 * Used as a router for the Task's routes.
 *
 * @param fastify fastify instance
 * @param options
 * @param done
 */
function taskRoutes(fastify, options, done) {

    fastify.get('/all', getTasks);
    
    fastify.get('/:id', getTask);
    
    fastify.post('/add', addTask);
    
    fastify.patch('/edit/:id', updateTask);
    
    fastify.delete('/:id', deleteTask);
    
    done();
};
    
module.exports = taskRoutes;
