const { getReasonPhrase, StatusCodes, ReasonPhrases } = require("http-status-codes");
const service = require("./message.service");

const Message = {
  id: { type: "number" },
  title: { type: "string" },
  author: { type: "number" },
  content: { type: "string" },
  taskId: { type: "number" },
};

const defaultSchema = {
  tags: ["API Message"],
  body: {
    type: "object",
    properties: {
      ...Message,
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

const getMessages = {
  schema: {
    tags: defaultSchema.tags,
    description: "",
    response: {
      200: {
        description: "Success response",
        type: "object",
        properties: {
          responseTitle: { type: "string" },
          Messages: {
            type: "array",
            items: { type: "object", properties: { ...Message } },
          },
        },
      },
      400: {
        description: "Bad request",
        type: "object",
        properties: { responseTitle: { type: "string" }, error: {} },
      },
    },
  },
  handler: async (req, reply) => {
    try {
      const { Messages, status, error } = await service.getMessages();
      reply.code(status).send({
        responseTitle: getReasonPhrase(status),
        Messages,
        ...(error ? { error } : {}),
      });
    } catch (err) {
      reply.code(StatusCodes.BAD_REQUEST).send({
        responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST),
        error: { message: err },
      });
    }
  },
};

const getMessage = {
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
          Message: { type: "object", properties: { ...Message } },
        },
      },
      400: {
        description: "Bad request",
        type: "object",
        properties: { responseTitle: { type: "string" }, error: {} },
      },
    },
  },
  handler: async (req, reply) => {
    const { id } = req.params;
    try {
      const { Message, status, error } = await service.getMessage(id);
      reply.code(status).send({
        responseTitle: getReasonPhrase(status),
        Message,
        ...(error ? { error } : {}),
      });
    } catch (err) {
      reply.code(StatusCodes.BAD_REQUEST).send({
        responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST),
        error: { message: err },
      });
    }
  },
};

const addMessage = {
  schema: {
    tags: defaultSchema.tags,
    body: {
      type: "object",
      required: ["title", "author", "content", "taskId"],
      properties: {
        ...Message,
      },
    },
    response: defaultSchema.response,
    description: "",
  },
  handler: async (req, reply) => {
    try {
      const { status, error } = await service.addMessage(req.body);
      reply.code(status).send({
        responseTitle: status === 200 ? "The Message was created successfully" : getReasonPhrase(status),
        ...(error ? { error } : {}),
      });
    } catch (err) {
      reply.code(StatusCodes.BAD_REQUEST).send({
        responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST),
        error: { message: err },
      });
    }
  },
};

const updateMessage = {
  schema: {
    tags: defaultSchema.tags,
    params: {
      id: { type: "number" },
    },
    body: defaultSchema.body,
    response: defaultSchema.response,
    description: "",
  },
  handler: async (req, reply) => {
    const { id } = req.params;
    try {
      const { status, error } = await service.updateMessage(id, req.body);
      reply.code(status).send({
        responseTitle: status === 200 ? "The Message was updated successfully" : getReasonPhrase(status),
        ...(error ? { error } : {}),
      });
    } catch (err) {
      reply.code(StatusCodes.BAD_REQUEST).send({
        responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST),
        error: { message: err },
      });
    }
  },
};

const deleteMessage = {
  schema: {
    tags: defaultSchema.tags,
    params: {
      id: { type: "number" },
    },
    response: defaultSchema.response,
  },
  handler: async (req, reply) => {
    const { id } = req.params;
    try {
      const { status, error } = await service.deleteMessage(id);
      reply.code(status).send({
        responseTitle: status === 200 ? "The Message was deleted successfully" : getReasonPhrase(status),
        ...(error ? { error } : {}),
      });
    } catch (err) {
      reply.code(StatusCodes.BAD_REQUEST).send({
        responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST),
        error: { message: err },
      });
    }
  },
};
module.exports = { getMessages, getMessage, addMessage, updateMessage, deleteMessage };
