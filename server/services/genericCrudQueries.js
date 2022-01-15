const pool = require("./sql.connections.js").pool;

//helper function
const getKeysAndValues = (object) => {
  const newObj = JSON.parse(JSON.stringify(object));
  delete newObj.id;
  const keys = Object.keys(newObj);
  return [keys, keys.map((key) => newObj[key])];
};

/**
 * Used to get all rows within a specific table.
 * @param {string} tableName
 * @resolve the requested table
 */
async function getItems(tableName) {
  const res = pool.query(`SELECT * FROM "${tableName}"`);
  return (await res).rows;
}

/**
 * Used to get specific rows where propery = value
 * @param {string} tableName
 * @param {string} property
 * @param {string} value
 * @resolve the requested items
 */
async function getItem(tableName, property, value) {
  const res = pool.query(`SELECT * FROM "${tableName}" WHERE ${property}='${value}'`);
  return (await res).rows;
}

/**
 * Used to delete a specific row from a specific table
 * @param {string} tableName
 * @param {Number} property
 * @param {Number} value
 * @resolve The row that was deleted
 */
async function deleteItem(tableName, property, value) {
  const query = `DELETE FROM "${tableName}" WHERE "${property}"=${value} RETURNING * `;
  const res = pool.query(query);
  return (await res).rows;
}

/**
 * Used to check if a value exist in a spesific column
 * @param {string} tablename
 * @param {string} colname
 * @param {*} value
 * @resolve true if exist, false otherwise
 */
async function isExist(tablename, colname, value) {
  const res = pool.query(`SELECT count(1) FROM  "${tablename}" where ${colname}='${value}'`).then((res) => res.rows[0].count >= 1);
  return await res;
}

/**
 * Used to update a specific item with where primaryKey = value
 * @param {string} primaryKey item primary key
 * @param {*} value
 * @param {string} tableName the table name
 * @param {Object} change the object AFTER the change
 * @resolve the updated row
 */
async function updateSpecificItem(primaryKey, value, tableName, change) {
  const [keys, values] = getKeysAndValues(change);
  const update = keys.map((key, index) => `"${key}" = $${index + 1}`).join(",");
  const query = `UPDATE public."${tableName}" SET ${update} WHERE "${primaryKey}" = ${value} RETURNING *`;
  const res = pool.query(query, values);
  return await res.rows;
}
/**
 * Used to send a custom query
 * @param {string} query
 * @param {array} values
 * @resolve The query result
 */
async function sendCustomQuery(query, values) {
  const res = pool.query(query, values);
  return (await res).rows;
}
/**
 * Used to insert a item into the db
 * @param {string} tablename
 * @param {*} objectToInsert
 * @resolve the created item
 */
async function insertItem(tablename, objectToInsert) {
  const [keys, values] = getKeysAndValues(objectToInsert);
  const pramKeys = keys.map((item) => `"${item}"`).join(",");
  const valuesString = [...Array(values.length)].map((c, index) => `$${index + 1}`).join(",");
  const query = `INSERT INTO "${tablename}" (${pramKeys}) VALUES (${valuesString}) RETURNING *`;
  const res = pool.query(query, values);
  return (await res).rows;
}

module.exports = { getItem, getItems, deleteItem, updateSpecificItem, isExist, sendCustomQuery, insertItem };
