const path = require("path");
const fastify = require("fastify")({ logger: true });
const fastifySwagger = require("fastify-swagger");
const swaggerOptions = require("./swagger.config.json");
const autoload = require("fastify-autoload");

const PORT = process.env.PORT || 8080;

fastify.register(fastifySwagger, swaggerOptions);
fastify.register(autoload, { dir: path.join(__dirname, "src", "routes"), autoHooks: true, cascadeHooks: true });

const startServer = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
