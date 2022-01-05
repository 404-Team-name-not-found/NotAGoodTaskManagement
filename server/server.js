const fastify = require('fastify')({ logger: true });

const PORT = process.env.PORT || 8080

fastify.get('/', (req, reply) => {
    reply.send('The server is running on port 8080');
});

const startServer = async () => {
    try {
      await fastify.listen(PORT);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };

  startServer();