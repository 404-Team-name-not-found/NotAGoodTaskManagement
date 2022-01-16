const {getReasonPhrase,StatusCodes,ReasonPhrases,} = require("http-status-codes");
const service = require("./sprint.service.js");

sprint = {
  name: { type: "string" },
  description: { type: "string" },
  duration: { type: "string" },
  startDate: { type: "string" , format : "date" },
};

const defaultSchema = {
  tags: ["API Sprint"],
  body: {
    type: "object",
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
          sprints: {
            type: "array",
            items: { type: "object", properties: {...sprint} },
          },
        },
      },
    },
  },
  handler: async (req, reply) => {
    try {
      const { sprint, status ,error} = await service.getSprints();
      reply.code(status).send({ responseTitle: getReasonPhrase(status), sprints:sprint, ...(error ? { error } : {}) });
    } catch (err) { reply.code(StatusCodes.BAD_REQUEST).send({ responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST), error: { message: err } }); }
  },
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
          sprint: { type: "object", properties: {...sprint} },
        },
      },
    },
  },
  handler: async (req, reply) => {
    const { id } = req.params;
    try {
      const { _sprint, status, error } = await service.getSprint(id);
      reply.code(status).send({ responseTitle: getReasonPhrase(status), sprint:_sprint, ...(error ? { error } : {}) });
    } catch (err) { reply.code(StatusCodes.BAD_REQUEST).send({ responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST), error: { message: err } }); }
  },
};

const addSprint = {
  schema: {
    tags: defaultSchema.tags,
    body: {
      type: 'object',
      required: ['name', 'description', 'duration', 'startDate'],
      properties: {...sprint},
    },
    response: defaultSchema.response,
    description: '<p> The Sprint was added successfuly</p>'
  },
  handler: async (req, reply) => {
    try {
      const { status, error } = await service.addSprint(req.body);
      reply.code(status).send({ responseTitle: status === 200 ? "The Sprint was created successfully" : getReasonPhrase(status), ...(error ? { error } : {}) });
    } catch (err) { reply.code(StatusCodes.BAD_REQUEST).send({ responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST), error: { message: err } }); }
  }
};

const updateSprint = {
  schema: {
    tags: defaultSchema.tags,
    description: "<p>The Sprint has been updated!</p>",
    body: defaultSchema.body,
    response: defaultSchema.response,
    params: {
      name: { type: "string" }
    },
  },
  handler: async (req, reply) => {
    try {
      const {name}  = req.params;
      console.log(name);
      const { status, error } = await service.updateSprint(name, req.body);
      reply
        .code(status)
        .send({
          responseTitle:
            status === 200
              ? "The Sprint was updated successfully"
              : getReasonPhrase(status),
          ...(error ? { error } : {}),
        });
    } catch (err) {
      reply
        .code(StatusCodes.BAD_REQUEST)
        .send({
          responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST),
          error: { message: err },
        });
    }
  },
};

const deleteSprint = {
  schema: {
    tags: defaultSchema.tags,
    params: {
      id : {type:"number"}
    },
    response: defaultSchema.response
  },
  handler: async (req, reply) => {
    const { id } = req.params;
    try {
      const { status, error } = await service.deleteSprint(id);
      reply.code(status).send({ responseTitle: status === 200 ? "The Sprint was deleted successfully" : getReasonPhrase(status), ...(error ? { error } : {}) });
    } catch (err) { reply.code(StatusCodes.BAD_REQUEST).send({ responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST), error: { message: err } }); }
  }
}

module.exports = {
  getSprints,
  getSprint,
  addSprint,
  updateSprint,
  deleteSprint,
};
