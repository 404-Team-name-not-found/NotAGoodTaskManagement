const path = require("path");
const fastify = require("fastify")({ logger: true });
const fastifySwagger = require("fastify-swagger");
const swaggerOptions = require("./swagger.config");

const PORT = process.env.PORT || 8080;

fastify.register(fastifySwagger, swaggerOptions);
fastify.register(require("./api/story/index.js"));

const startServer = async () => {
  try {
    await fastify.listen(PORT);
    fastify.log.info(`server listening on ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
