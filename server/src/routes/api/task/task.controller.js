const { getReasonPhrase, StatusCodes, ReasonPhrases } = require('http-status-codes');
const service = require('./task.service');

const task = {
    id: { type: 'number' },
    name: { type: 'string' },
    description: { type: 'string' },
    estimation: { type: 'number' },
    creationDate: { type: 'string', "format": "date"},
    endDate: { type: 'string', "format": "date"},
    status: { type: 'string' },
    assignedTo: { type: 'number' },
    creator: { type: 'number' },
    sprintId: { type: 'number' },
    storyId: { type: 'number' },
    groupId: { type: 'number' },
};

const defaultSchema = {
    tags: ['API Task'],
    body: {
        type: 'object',
        properties: {
            ...task,
        },
    },
    response: {
        200: { description: 'Success response', type: 'object', properties: { responseTitle: { type: 'string' } } },
        400: { description: 'Bad request', type: 'object', properties: { responseTitle: { type: 'string' }, error: {} } },
    },
};

const getTasks = {
    schema: {
        tags: defaultSchema.tags,
        description: '',
        response: {
            200: {
                description: 'Success response',
                type: 'object',
                properties: {
                    responseTitle: { type: 'string' },
                    tasks: {
                        type: 'array',
                        items: { type: 'object', properties: { ...task } }
                    }
                }
            },
            400: { description: 'Bad request', type: 'object', properties: { responseTitle: { type: 'string' }, error: {} } },
        }
    },
    handler: async (req, reply) => {
        try {
            const { tasks, status, error } = await service.getTasks();
            reply.code(status).send({ responseTitle: getReasonPhrase(status), tasks, ...(error ? { error } : {}) });
        } catch (err) { reply.code(StatusCodes.BAD_REQUEST).send({ responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST), error: { message: err } }); }
    }
};

const getTask = {
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
                    task: { type: 'object', properties: { ...task } },
                },
            },
            400: { description: 'Bad request', type: 'object', properties: { responseTitle: { type: 'string' }, error: {} } },
        }
    },
    handler: async (req, reply) => {
        const { id } = req.params;
        try {
            const { task, status, error } = await service.getTask(id);
            reply.code(status).send({ responseTitle: getReasonPhrase(status), task, ...(error ? { error } : {}) });
        } catch (err) { reply.code(StatusCodes.BAD_REQUEST).send({ responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST), error: { message: err } }); }
    }
}

const addTask = {
    schema: {
        tags: defaultSchema.tags,
        body: {
            type: 'object',
            required: ['name', 'creator', 'creationDate'],
            properties: {
                ...task,
            },
        },
        response: defaultSchema.response,
        description: ''
    },
    handler: async (req, reply) => {
        try {
            const { status, error } = await service.addTask(req.body);
            reply.code(status).send({ responseTitle: status === 200 ? "The task was created successfully" : getReasonPhrase(status), ...(error ? { error } : {}) });
        } catch (err) { reply.code(StatusCodes.BAD_REQUEST).send({ responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST), error: { message: err } }); }
    }
};

const updateTask = {
    schema: {
        tags: defaultSchema.tags,
        params: {
            id: { type: 'number' },
        },
        body: defaultSchema.body,
        response: defaultSchema.response,
        description: '',
    },
    handler: async (req, reply) => {
        const { id } = req.params;
        try {
            const { status, error } = await service.updateTask(id, req.body);
            reply.code(status).send({ responseTitle: status === 200 ? "The task was updated successfully" : getReasonPhrase(status), ...(error ? { error } : {}) });
        } catch (err) { reply.code(StatusCodes.BAD_REQUEST).send({ responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST), error: { message: err } }); }
    }
};

const deleteTask = {
    schema: {
        tags: defaultSchema.tags,
        params: {
            id: { type: 'number' },
        },
        response: defaultSchema.response
    },
    handler: async (req, reply) => {
        const { id } = req.params;
        try {
            const { status, error } = await service.deleteTask(id);
            reply.code(status).send({ responseTitle: status === 200 ? "The task was deleted successfully" : getReasonPhrase(status), ...(error ? { error } : {}) });
        } catch (err) { reply.code(StatusCodes.BAD_REQUEST).send({ responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST), error: { message: err } }); }
    }
}

module.exports = { getTasks, getTask, addTask, updateTask, deleteTask, };
