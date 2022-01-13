const pool = require("./../../services/DB/sql.connections").pool;
const {
  getItems,
  getItem,
  DeleteItem,
} = require("./../../services/DB/genericCrudQueries");
const SCHEMA = "public";
const dumyData = require("../../../storyData");
const story = {
  name: { type: "string" },
  icon: { type: "string", format: "uri-template" },
  color: { type: "string" },
  startDate: { type: "string" },
  endDate: { type: "string" },
};
function getStorys() {
  return getItems("Story");
}

function getStory(tableName, id) {
  return getItem(tableName, id);
}

function updateStory(itemId, tableName, change) {
  return updateSpecificItem(itemId, tableName, change);
}
function deleteStory(tableName = "Story", id) {
  return DeleteItem(tableName, id);
}
function addStory(newStory) {
  return insertStory(...newStory);
}
