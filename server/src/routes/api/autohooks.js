
const validateJWT = async (request, reply) => {
  try { 
    await request.jwtVerify()
  } catch (err) { reply.send(err) }
};

// example for what you can do with the user gained from jwtVerify, please do not do it like this its just an example
const insertUserDataToBody = async (request, reply) => {
  console.log("AAAAA")
  // request.body = request.body ? { ...request.body, ...request.user } : { ...request.user };
};

async function ApiHooks(instance, options) {
  instance.addHook("onRequest", validateJWT);
  instance.addHook("preHandler", insertUserDataToBody);
}

module.exports = ApiHooks;