const pool = require("./sql.connections").pool;
/**
 * Given a table name, return all the rows within the table
 * @param {String} tableName
 * @returns {object}
 */
async function getItems(tableName) {
  const client = await pool.connect();
  const res = client.query(`SELECT * FROM "${tableName}"`);
  client.release();
  return (await res).rows;
}

/**
 * Given a table name and a specific id, return the specifc row from the table with the given id
 * @param {string} tableName
 * @param {number} id
 * @returns {object}
 */
async function getItem(tableName, id) {
  const client = await pool.connect();
  const res = client.query(`SELECT * FROM "${tableName}" WHERE id=${id}`);
  client.release();
  return (await res).rows;
}

/**
 * Given a table name and an id, remove the row in the table with the given id
 * @param {String} tableName
 * @param {Number} id
 * @returns
 */
async function DeleteItem(tableName, id) {
  const client = await pool.connect();
  const res = client.query(
    `DELETE FROM ${tableName} WHERE id=${id} RETURNING * `
  );
  client.release();
  return (await res).rows;
}

/**
 * check if the given value is exist in the table in the given column
 * @param {String} tablename
 * @param {String} colname
 * @param {*} value
 * @returns
 */
async function checkExist(tablename, colname, value) {
  const client = await pool.connect();
  const res = client
    .query(`SELECT count(*) FROM  "${tablename}" where ${colname}='${value}'`)
    .then((res) => res.rows[0].count >= 1);
  client.release();
  return await res;
}

//helper function
const getKeysAndValues = (object) => {
  delete object.id;
  const keys = Object.keys(object);
  return [keys, keys.map((key) => object[key])];
};

/**
 * update a specific item with the given id in the given table
 * @param {Number} itemId the item id
 * @param {String} tableName the table name
 * @param {Object} change the object AFTER the change
 * @returns
 */
async function updateSpecificItem(itemId, tableName, change) {
  [keys, values] = getKeysAndValues(change);
  const update = keys.map((key, index) => `"${key}" = $${index + 1}`).join(",");
  const query = `UPDATE public."${tableName}" SET ${update} WHERE id = ${itemId} RETURNING *`;
  const client = await pool.connect();
  const res = client.query(query, values);
  client.release();
  return await (
    await res
  ).rows;
}
/**
 *
 * @param {String} query the query
 * @param {Array} values values in the query
 * @returns
 */
async function sendCustomQuery(query, values) {
  const client = await pool.connect();
  const res = client.query(query, values);
  client.release();
  return (await res).rows;
}

module.exports.DeleteItem = DeleteItem;
module.exports.getItems = getItems;
module.exports.getItem = getItem;
module.exports.updateSpecificItem = updateSpecificItem;
module.exports.checkExist = checkExist;
module.exports.sendCustomQuery = sendCustomQuery;
