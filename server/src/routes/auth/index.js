
function AuthRoutes(instance, options, done) {
  instance.post('/signup', (request, reply) => {
    // some logic ...
    const jwtTOKEN = instance.jwt.sign(request.body);
    reply.send({ jwtTOKEN });
  });

  done();
}

module.exports = AuthRoutes;