const storys = require("../storyData.js");
const getAllStorys = (res, reply) => {
  reply.send(storyData);
};

const getStoryById = (res, reply) => {
  const { id } = req.param;
  const story = storys.find((story) => item.id === id);
  reply.send(item);
};

const getStoryByTopic = (res, reply) => {
  const { topic } = req.param;
  const story = storys.find((story) => item.topic === topic);
  reply.send(item);
};

module.exports = { getAllStorys, getStoryById, getStoryByTopic };
