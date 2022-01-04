const {
  getAllStorys,
  getStoryById,
  getStoryByTopic,
} = require("./StoryController.js");

const Story = {
  type: "object",
  properties: {
    id: { type: "inteeger" },
    title: { type: "string" },
    endDate: { type: "string" },
  },
};

// Get all Storys

const GetAllStorysOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        storys: "Story",
      },
    },
    handler: getAllStorys,
  },
};

const GetStoryById = {
  schema: {
    response: {
      200: Story,
    },
  },
};

const GetStoryByTopic = {
  schema: {
    response: {
      200: Story,
    },
  },
};

function storyRoutes(fastify, option, done) {
  fastify.get("/storys", getAllStorys);
  fastify.get("/storys/:id", getStoryById);
  fastify.get("/storys/:topic", getStoryByTopic);

  done();
}

module.exports = storyRoutes;
