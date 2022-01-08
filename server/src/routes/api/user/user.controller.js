const { getReasonPhrase, StatusCodes, ReasonPhrases } = require('http-status-codes');
const service = require('./user.service');

const user = {
  // id: { type: 'number'},
  name: { type: 'string' },
  username: { type: 'string' },
  email: { type: 'string', "format": "email" },
  imgUrl: { type: 'string', "format": "uri-template" },
  title: { type: 'string' },
  role: { type: 'string', "enum": ["team-member", "team-manager"] },
  phone: { type: 'string', "pattern": "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$" },
  groupId: { type: 'number' },
};

const defaultSchema = {
  tags: ['API User'],
  body: {
    type: 'object',
    required: ['name', 'username', 'password', 'email'],
    properties: {
      ...user,
      password: { type: 'string', pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z[0-9]@$!%*?&]{8,}$" }
    },
  },
  response: {
    200: { description: 'Success response', type: 'object', properties: { responseTitle: { type: 'string' } } },
    400: { description: 'Bad request', type: 'object', properties: { responseTitle: { type: 'string' }, error: {} } },
  },
};

const defaultHandlerCreator = ({ serviceFunc }) => async (req, reply) => {
  try {
    // if (validationFunc) validationFunc(req.body);
    const { status, error } = await serviceFunc(req.body);

    // reply.code(status).send({ responseTitle: getReasonPhrase(status), ...(error ? { error } : {}) });
  } catch (err) { reply.code(StatusCodes.BAD_REQUEST).send({ responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST), error: { message: err } }); }
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
      }
    }
  },
  handler: async (req, reply) => reply.send({ responseTitle: ReasonPhrases.OK, users: service.getUsers })
};

const getUser = {
  schema: {
    tags: defaultSchema.tags,
    description: '',
    params: {
      id: { type: 'number' },
    },
    response: {
      200: {
        description: 'Success response',
        type: 'object',
        properties: {
          responseTitle: { type: 'string' },
          user: { type: 'object', properties: { ...user } }
        },
      }
    }
  },
  handler: async (req, reply) => {
    const { id } = req.params;
    reply.send({ responseTitle: ReasonPhrases.OK, user: service.getItemsWhere('id', id) })
  }
}

const addUser = {
  schema: {
    ...defaultSchema,
    description: '<p> The user was added successfuly</p>'
  },
  handler: defaultHandlerCreator({ serviceFunc: service.addUser }),
};

const updateUser = {
  schema: {
    ...defaultSchema,
    description: '<p>The user was updated/p>',
  },
  handler: async (req, reply) => {
    const { id } = req.params;
    defaultHandlerCreator({ serviceFunc: service.updateUser(id) })
  }
};

const deleteUser = {
  schema: {
    params: {
      id: { type: 'number' },
    },
    response: defaultSchema.response
  },
  handler: async (req, reply) => {
    const { id } = req.params;
    reply.send({ responseTitle: ReasonPhrases.OK, serviceFunc: service.deleteUser(id) })
  }
}

module.exports = { getUsers, getUser, addUser, updateUser,deleteUser,};
