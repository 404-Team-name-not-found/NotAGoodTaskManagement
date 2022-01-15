const { StatusCodes } = require("http-status-codes");
const genericQueries = require("../../../services/genericCrudQueries");

const TABLE_NAME = "Messages";

/**
 * Used to get all existing Messages.
 *
 * @returns relevant status code and array of all the Message objects.
 */
async function getMessages() {
  try {
    let res;
    await genericQueries.getItems(TABLE_NAME).then((queryResult) => {
      res = queryResult;
    });
    return { Messages: res, status: StatusCodes.OK };
  } catch (err) {
    return { status: StatusCodes.BAD_REQUEST, error: err.message };
  }
}

/**
 * Used to get a Message by id.
 *
 * @param {number} id (number representing the Message's id)
 *
 * @returns relevant status code and the wanted Message object.
 */
async function getMessage(id) {
  try {
    let isExist;
    await genericQueries.isExist(TABLE_NAME, "id", id).then((queryResult) => {
      isExist = queryResult;
    });
    if (!isExist) throw new Error(`Message with this id does not exist`);

    let res;
    await genericQueries.getItem(TABLE_NAME, "id", id).then((queryResult) => {
      res = queryResult;
    });
    return { Message: res[0], status: StatusCodes.OK };
  } catch (err) {
    return { status: StatusCodes.BAD_REQUEST, error: err.message };
  }
}

/**
 * Used to add a Message.
 *
 * @param {object} newMessage (object representing the new Message object to add)}
 *
 * @returns relevant status code.
 */
async function addMessage(newMessage) {
  try {
    await genericQueries.insertItem(TABLE_NAME, newMessage);
    return { status: StatusCodes.OK };
  } catch (err) {
    return { status: StatusCodes.BAD_REQUEST, error: err.message };
  }
}

/**
 * Used to update a Message.
 *
 * @param {object} id (string representing the Message's id)
 * @param {object} change (object representing the properties to change)
 *
 * @returns relevant status code.
 */
async function updateMessage(id, change) {
  try {
    if (Object.keys(change).length === 0) throw new Error(`The changed object was sent empty`);
    let isExist;
    await genericQueries.isExist(TABLE_NAME, "id", id).then((queryResult) => {
      isExist = queryResult;
    });
    if (!isExist) throw new Error(`Message with the id- ${id} does not exist`);
    await genericQueries.updateSpecificItem("id", id, TABLE_NAME, change);
    return { status: StatusCodes.OK };
  } catch (error) {
    return { status: StatusCodes.BAD_REQUEST, error: error.message };
  }
}

/**
 * Used to delete a Message.
 *
 * @param {number} id (number representing the Message's id)
 *
 * @returns relevant status code.
 */
async function deleteMessage(id) {
  try {
    const isExist = await genericQueries.isExist(TABLE_NAME, "id", id);
    if (!isExist) throw new Error(`Message with the id- ${id} does not exist`);
    await genericQueries.deleteItem(TABLE_NAME, "id", id);
    return { status: StatusCodes.OK };
  } catch (error) {
    return { status: StatusCodes.BAD_REQUEST, error: error.message };
  }
}

module.exports = {
  getMessages,
  getMessage,
  addMessage,
  updateMessage,
  deleteMessage,
};
