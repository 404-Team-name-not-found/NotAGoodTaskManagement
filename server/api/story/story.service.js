const pool = require("./../../services/DB/sql.connections.js").pool;
const {getItems,getItem,DeleteItem,} = require("./../../services/DB/genericCrudQueries.js");
const {insertStory} = require("../../services/DB/insertQueries.js")
const SCHEMA = "public";

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

function getStory(id) {
  return getItem("Story", id);
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

module.exports ={getStorys,getStory,updateStory,deleteStory,addStory}