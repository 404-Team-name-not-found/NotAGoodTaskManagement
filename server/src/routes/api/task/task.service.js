const { StatusCodes } = require('http-status-codes');
const genericQueries = require("../../../../services/genericCrudQueries")

const TABLE_NAME = "Tasks";

/**
 * Used to get all existing tasks.
 * 
 * @returns relevant status code and array of all the task objects.
 */
async function getTasks() {
    try {
        let res;
        await genericQueries.getItems(TABLE_NAME).then((queryResult) => { res = queryResult; });
        return { tasks: res, status: StatusCodes.OK };
    } catch (err) {
        return { status: StatusCodes.BAD_REQUEST, error: err.message };
    }
}

/**
 * Used to get a task by id.
 *
 * @param {number} id (number representing the task's id)
 * 
 * @returns relevant status code and the wanted task object.
 */
async function getTask(id) {
    try {
        let isExist;
        await genericQueries.isExist(TABLE_NAME, "id", id).then((queryResult) => { isExist = queryResult });
        if (!isExist) throw new Error(`Task with this id does not exist`);

        let res;
        await genericQueries.getItem(TABLE_NAME, "id", id).then((queryResult) => { res = queryResult });
        return { task: res, status: StatusCodes.OK };
    }
    catch (err) {
        return { status: StatusCodes.BAD_REQUEST, error: err.message };
    }
}

/**
 * Used to add a task.
 *
 * @param {object} newTask (object representing the new task object to add)}
 * 
 * @returns relevant status code.
 */
async function addTask(newTask) {
    try {
        let isExist;
        await genericQueries.isExist(TABLE_NAME, "name", newTask.name).then((queryResult) => { isExist = queryResult });
        if (isExist) throw new Error(`Task with this name already exists`);

        await genericQueries.insertItem(TABLE_NAME, newTask);
        return { status: StatusCodes.OK };
    }
    catch (err) {
        return { status: StatusCodes.BAD_REQUEST, error: err.message };
    }
}

/**
 * Used to update a task.
 *
 * @param {object} id (string representing the task's id)
 * @param {object} change (object representing the properties to change)
 *
 * @returns relevant status code.
 */
async function updateTask(id, change) {
    try {
        let isExist;
        await genericQueries.isExist(TABLE_NAME, "id", id).then((queryResult) => { isExist = queryResult });
        if (!isExist) throw new Error(`Task with the id- ${id} does not exist`);
        await genericQueries.updateSpecificItem("id", id, TABLE_NAME, change);
        return { status: StatusCodes.OK };
    }
    catch (error) {
        return { status: StatusCodes.BAD_REQUEST, error: error.message };
    }
}

/**
 * Used to delete a task.
 *
 * @param {number} id (number representing the task's id)
 * 
 * @returns relevant status code.
 */
async function deleteTask(id) {
    try {
        const isExist = await genericQueries.isExist(TABLE_NAME, "id", id);
        if (!isExist) throw new Error(`Task with the id- ${id} does not exist`);
        await genericQueries.deleteItem(TABLE_NAME, "id", id);
        return { status: StatusCodes.OK };
    }
    catch (error) {
        return { status: StatusCodes.BAD_REQUEST, error: error.message };
    }
}

module.exports = { getTasks, getTask, addTask, updateTask, deleteTask, };
