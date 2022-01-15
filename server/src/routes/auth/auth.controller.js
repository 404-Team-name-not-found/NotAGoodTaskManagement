const service = require('../api/user/user.service');
const { getReasonPhrase, StatusCodes, ReasonPhrases } = require('http-status-codes');

const user = {
  name: { type: 'string' },
  username: { type: 'string' },
  email: { type: 'string', "format": "email" },
  password: { type: 'string', "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})" },
  imgUrl: { type: 'string', "format": "uri-template" },
  title: { type: 'string' },
  role: { type: 'string', "enum": ["team-member", "team-manager"] },
  phone: { type: 'string', "pattern": "^05[0-9]{8}$" },
  groupid: { type: 'number' },
};

const signUp = {
  schema: {
    tags: ['Auth API'],
    description: '',
    body: {
      type: 'object',
      required: ['name', 'username', 'password', 'email'],
      properties: {
        ...user
      }
    },
    response: {
      200: { description: 'Success response', type: 'object', properties: { responseTitle: { type: 'string' }, token: { type: 'string' } } },
      400: { description: 'Bad request', type: 'object', properties: { responseTitle: { type: 'string' }, error: {} } },
    }
  },
  handler: async (request, reply) => {
    const signObject = { username: request.body.username, email: request.body.email };
    const jwtTOKEN = request.fastify.jwt.sign(signObject);

    try {
      const { status, error } = await service.signUp(request.body, request.fastify);
      reply.code(status).send({ responseTitle: status === 200 ? "Account created successfully" : getReasonPhrase(status), token: jwtTOKEN, ...(error ? { error } : {}) });
    } catch (err) { reply.code(StatusCodes.BAD_REQUEST).send({ responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST), error: { message: err } }); }
  }
};

const signIn = {
  schema: {
    tags: ['Auth API'],
    description: '',
    body: {
      type: 'object',
      required: ['username', 'email', 'password'],
      properties: {
        ...user
      }
    },
    response: {
      200: { description: 'Success response', type: 'object', properties: { responseTitle: { type: 'string' }, token: { type: 'string' } } },
      400: { description: 'Bad request', type: 'object', properties: { responseTitle: { type: 'string' }, error: {} } },
    }
  },
  handler: async (request, reply) => {
    let username = request.body.username;
    let email = request.body.email;
    const signObject = { username, email };
    const jwtTOKEN = request.fastify.jwt.sign(signObject);
    let property;
    let value;
    if (!email && !username)
      reply.status(400).send({ responseTitle: "The username / password invalid, please try again", error: {} });
    else {
      if (email) {
        property = 'email';
        value = email;
      }
      else if (username) {
        property = 'username';
        value = username;
      }
      try {
        const { status, title } = await service.signIn(request.body, property, value, request.fastify);
        console.log(`status: ${status}`)
        reply.code(status).send({ responseTitle: title, token: jwtTOKEN });
      } catch (err) { console.error(err); reply.code(StatusCodes.BAD_REQUEST).send({ responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST), error: { message: err } }); }
    }
  }
};

/**
 * Used to validate the user's jwt token.
 *
 * @param {object} param0 { request, reply }
 */
async function validateJWT(request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) { reply.send(err) }
};

module.exports = { signUp, signIn, validateJWT, };