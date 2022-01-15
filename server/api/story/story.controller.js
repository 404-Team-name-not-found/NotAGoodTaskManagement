const {
  getReasonPhrase,
  StatusCodes,
  ReasonPhrases,
} = require("http-status-codes");
const service = require("./story.service.js");

story = {
  name: { type: "string" },
  icon: { type: "string", format: "uri-template" },
  color: { type: "string" },
  startDate: { type: "string" },
  endDate: { type: "string" },
};

const defaultSchema = {
  tags: ["API User"],
  body: {
    type: "object",
    required: ["name", "icon", "color", "startDate", "endDate"],
    properties: {
      ...story,
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

const getStorys = {
  schema: {
    tags: defaultSchema.tags,
    description: "",
    response: {
      200: {
        description: "Success response",
        type: "object",
        properties: {
          responseTitle: { type: "string" },
          story: { type: "object", properties: story },
        },
      },
    },
  },
  handler: async (req, reply) =>
    reply.send({
      responseTitle: ReasonPhrases.OK,
      story: service.getStorys(),
    }),
};

const getStory = {
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
          story: { type: "object", properties: story },
        },
      },
    },
  },
  handler: async (req, reply) => {
    const { id } = req.params;
    reply.send({
      responseTitle: ReasonPhrases.OK,
      story: service.getStory(id),
    });
  },
};

const addStory = {
  schema: {
    ...defaultSchema,
    description: "<p> New Story has been update<p>",
  },
  handler: defaultHandlerCreator({ serviceFunc: service.addStory }),
};

const updateStory = {
  schema: {
    ...defaultSchema,
    description: "<p>The Story has been updated!/p>",
  },
  handler: async (req, reply) => {
    const { itemId } = req.params;
    const { change } = req.params;
    defaultHandlerCreator({
      serviceFunc: service.updateUser(itemId, "Story", change),
    });
  },
};

const deleteStory = {
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
      serviceFunc: service.deleteStory(id),
    });
  },
};

module.exports = { getStorys, getStory, addStory, updateStory, deleteStory };
