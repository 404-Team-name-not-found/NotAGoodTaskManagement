const { getReasonPhrase, StatusCodes, ReasonPhrases } = require('http-status-codes');
const service = require('./user.service');

const user = {
  name: { type: 'string' },
  username: { type: 'string' },
  email: { type: 'string', "format": "email" },
  imgUrl: { type: 'string', "format": "uri-template" },
  title: { type: 'string' },
  role: { type: 'string', "enum": ["team-member", "team-manager"] },
  phone: { type: 'string', "pattern": "^05[0-9]{8}$" },
  groupid: { type: 'number' },
};

const defaultSchema = {
  tags: ['API User'],
  body: {
    type: 'object',
    properties: {
      ...user,
      password: { type: 'string', "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})" }
    },
  },
  response: {
    200: { description: 'Success response', type: 'object', properties: { responseTitle: { type: 'string' } } },
    400: { description: 'Bad request', type: 'object', properties: { responseTitle: { type: 'string' }, error: {} } },
  },
};

const getUsers = {
  schema: {
    tags: defaultSchema.tags,
    description: '',
    response: {
      200: {
        description: 'Success response',
        type: 'object',
        properties: {
          responseTitle: { type: 'string' },
          users: {
            type: 'array',
            items: { type: 'object', properties: { ...user } }
          }
        }
      },
      400: { description: 'Bad request', type: 'object', properties: { responseTitle: { type: 'string' }, error: {} } },
    }
  },
  handler: async (req, reply) => {
    try {
      const { users, status, error } = await service.getUsers();
      reply.code(status).send({ responseTitle: getReasonPhrase(status), users, ...(error ? { error } : {}) });
    } catch (err) { reply.code(StatusCodes.BAD_REQUEST).send({ responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST), error: { message: err } }); }
  }
};

const getUser = {
  schema: {
    tags: defaultSchema.tags,
    description: '',
    params: {
      email: { type: 'string', "format": "email" },
    },
    response: {
      200: {
        description: 'Success response',
        type: 'object',
        properties: {
          responseTitle: { type: 'string' },
          user: { type: 'object', properties: { ...user } },
        },
      },
      400: { description: 'Bad request', type: 'object', properties: { responseTitle: { type: 'string' }, error: {} } },
    }
  },
  handler: async (req, reply) => {
    const { email } = req.params;
    try {
      const { user, status, error } = await service.getUser(email);
      reply.code(status).send({ responseTitle: getReasonPhrase(status), user, ...(error ? { error } : {}) });
    } catch (err) { reply.code(StatusCodes.BAD_REQUEST).send({ responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST), error: { message: err } }); }
  }
}

const addUser = {
  schema: {
    tags: defaultSchema.tags,
    body: {
      type: 'object',
      required: ['name', 'username', 'password', 'email'],
      properties: {
        ...user,
        password: { type: 'string', "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})" }
      },
    },
    response: defaultSchema.response,
    description: '<p> The user was added successfuly</p>'
  },
  handler: async (req, reply) => {
    try {
      const { status, error } = await service.addUser(req.body);
      reply.code(status).send({ responseTitle: status === 200 ? "The user was created successfully" : getReasonPhrase(status), ...(error ? { error } : {}) });
    } catch (err) { reply.code(StatusCodes.BAD_REQUEST).send({ responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST), error: { message: err } }); }
  }
};

const updateUser = {
  schema: {
    tags: defaultSchema.tags,
    params: {
      email: { type: 'string', "format": "email" },
    },
    body: defaultSchema.body,
    response: defaultSchema.response,
    description: '<p>The user was updated</p>',
  },
  handler: async (req, reply) => {
    const { email } = req.params;
    try {
      console.log(email);
      const { status, error } = await service.updateUser(email, req.body);
      reply.code(status).send({ responseTitle: status === 200 ? "The user was updated successfully" : getReasonPhrase(status), ...(error ? { error } : {}) });
    } catch (err) { reply.code(StatusCodes.BAD_REQUEST).send({ responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST), error: { message: err } }); }
  }
};

const deleteUser = {
  schema: {
    tags: defaultSchema.tags,
    params: {
      email: { type: 'string', "format": "email" },
    },
    response: defaultSchema.response
  },
  handler: async (req, reply) => {
    const { email } = req.params;
    try {
      const { status, error } = await service.deleteUser(email);
      reply.code(status).send({ responseTitle: status === 200 ? "The user was deleted successfully" : getReasonPhrase(status), ...(error ? { error } : {}) });
    } catch (err) { reply.code(StatusCodes.BAD_REQUEST).send({ responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST), error: { message: err } }); }
  }
}

module.exports = { getUsers, getUser, addUser, updateUser, deleteUser, };
