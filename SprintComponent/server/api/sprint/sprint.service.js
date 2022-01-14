const pool = require("./../../services/DB/sql.connections.js").pool;
const {getItems,getItem,DeleteItem,} = require("./../../services/DB/genericCrudQueries.js");
const {insertSprint} = require("../../services/DB/insertQueries.js")
const SCHEMA = "public";

sprint = {
  name: { type: "string" },
  description: { type: "string" },
  duration:{type:"strint"},
  startDate: { type: "string" },
};


function getSprints() {
  return getItems("Sprint");
}

function getSprint(id) {
  return getItem("Sprint", id);
}

function updateSprint(itemId, tableName, change) {
  return updateSpecificItem(itemId, tableName, change);
}
function deleteSprint(tableName = "Sprint", id) {
  return DeleteItem(tableName, id);
}
function addSprint(newSprint) {
  return insertSprint(...newSprint);
}

module.exports ={ getSprints, getSprint,updateSprint, deleteSprint, addSprint}