const { getMessages, getMessage, addMessage, updateMessage, deleteMessage } = require("./Message.controller.js");

/**
 * Used as a router for the Message's routes.
 *
 * @param fastify fastify instance
 * @param options
 * @param done
 */
function MessageRoutes(fastify, options, done) {
  fastify.get("/all", getMessages);
  fastify.get("/:id", getMessage);
  fastify.post("/add", addMessage);
  fastify.patch("/edit/:id", updateMessage);
  fastify.delete("/:id", deleteMessage);
  done();
}

module.exports = MessageRoutes;
