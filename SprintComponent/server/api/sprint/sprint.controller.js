const {
  getReasonPhrase,
  StatusCodes,
  ReasonPhrases,
} = require("http-status-codes");
const service = require("./sprint.service.js");

sprint = {
  name: { type: "string" },
  description: { type: "string" },
  duration: { type: "string" },
  startDate: { type: "string" },
};

const defaultSchema = {
  tags: ["API User"],
  body: {
    type: "object",
    required: ["name", "description", "duration", "startDate"],
    properties: {
      ...sprint,
    },
  },
  response: {
    200: {
      description: "Success response",
      type: "object",
      properties: { responseTitle: { type: "string" } },
    },
    400: {
      description: "Bad request",
      type: "object",
      properties: { responseTitle: { type: "string" }, error: {} },
    },
  },
};

const defaultHandlerCreator =
  ({ serviceFunc }) =>
  async (req, reply) => {
    try {
      const { status, error } = await serviceFunc(req.body);
    } catch (err) {
      reply.code(StatusCodes.BAD_REQUEST).send({
        responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST),
        error: { message: err },
      });
    }
  };

const getSprints = {
  schema: {
    tags: defaultSchema.tags,
    description: "",
    response: {
      200: {
        description: "Success response",
        type: "object",
        properties: {
          responseTitle: { type: "string" },
          sprint: { type: "object", properties: sprint },
        },
      },
    },
  },
  handler: async (req, reply) =>
    reply.send({
      responseTitle: ReasonPhrases.OK,
      sprint: service.getSprints(),
    }),
};

const getSprint = {
  schema: {
    tags: defaultSchema.tags,
    description: "",
    params: {
      id: { type: "number" },
    },
    response: {
      200: {
        description: "Success response",
        type: "object",
        properties: {
          responseTitle: { type: "string" },
          sprint: { type: "object", properties: sprint },
        },
      },
    },
  },
  handler: async (req, reply) => {
    const { id } = req.params;
    reply.send({
      responseTitle: ReasonPhrases.OK,
      sprint: service.getSprint(id),
    });
  },
};

const addSprint = {
  schema: {
    ...defaultSchema,
    description: "<p> New Sprint has been update<p>",
  },
  handler: defaultHandlerCreator({ serviceFunc: service.addSprint }),
};

const updateSprint = {
  schema: {
    ...defaultSchema,
    description: "<p>The Sprint has been updated!/p>",
    params: {
      itemId: { type: "number" },
      change: {type:"string"},
    },
  },
  handler: async (req, reply) => {
    const { itemId } = req.params;
    const { change } = req.params;
    defaultHandlerCreator({
      serviceFunc: service.updateUser(itemId, "Sprint", change),
    });
  },
};

const deleteSprint = {
  schema: {
    params: {
      id: { type: "number" },
    },
    response: defaultSchema.response,
  },
  handler: async (req, res) => {
    const { id } = req.params;
    res.send({
      responseTitle: ReasonPhrases.OK,
      serviceFunc: service.deleteSprint(id),
    });
  },
};

module.exports = {
  getSprints,
  getSprint,
  addSprint,
  updateSprint,
  deleteSprint,
};
