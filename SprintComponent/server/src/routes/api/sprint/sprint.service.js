
const {getItems,getItem,DeleteItem,updateSpecificItem,isExist,InsertItem,} = require("../../../../services/genericCrudQueries.js");
const { StatusCodes } = require('http-status-codes');
const TABLE_NAME = "Sprints";

sprint = {
  name: { type: "string" },
  description: { type: "string" },
  duration:{type:"strint"},
  startDate: { type: "string" },
};

/**
 * Used to get all existing Sprints.
 * 
 * @returns relevant status code and array of all the Sprints objects.
 */

async function getSprints() {
    try {
      let res;
      res = await getItems(TABLE_NAME).then((sprints) => { return sprints})
      return { sprint: res , status: StatusCodes.OK}
    } catch (err) {
        return { status: StatusCodes.BAD_REQUEST };
    }
}

/**
 * Used to get a Sprint by id.
 *
 * @param {int} id (int representing the Sprint's id)
 * 
 * @returns relevant status code and the wanted Sprint object.
 */

async function getSprint(id) {
  try {
    let res;
    res = await getItem(TABLE_NAME, "id", id).then((queryResult) => { return queryResult });

    return { _sprint:res.pop(), status: StatusCodes.OK };
  }
  catch (err) {
      return { status: StatusCodes.BAD_REQUEST, error: err.message };
  }
}


/**
 * Used to update a Sprint.
 *
 * @param {object} name (string representing the Sprint name)
 * @param {object} updatedSprint (object representing the properties to change)
 * @returns relevant status code.
 */

async function updateSprint(name, updatedSprint) {
  try {
      let Exist;
      console.log(name)
      await isExist(TABLE_NAME, "name", name).then((queryResult) => { Exist = queryResult });
      if (!Exist) throw new Error(`Sprint with the name- ${name} does not exist`);
      await updateSpecificItem("name", name , TABLE_NAME , updatedSprint);
      return { status: StatusCodes.OK };
  }
  catch (error) {
      return { status: StatusCodes.BAD_REQUEST, error: error.message };
  };
}


/**
 * Used to delete a Sprint.
 *
 * @param {int} id (string representing the Sprints's id)
 * 
 * @returns relevant status code.
 */

async function deleteSprint(id) {
  try {
      const exist = await isExist(TABLE_NAME, "id", id);
      if (!exist) throw new Error(`Sprint with the id- ${id} does not exist`);
      console.log(exist)
      await DeleteItem(TABLE_NAME, id);
      return { status: StatusCodes.OK };
  }
  catch (error) {
      return { status: StatusCodes.BAD_REQUEST, error: error.message };
  }
}

/**
 * Used to add a Sprint.
 *
 * @param {object} newSprint (object representing the new Sprint object to add)}
 * 
 * @returns relevant status code.
 */
async function addSprint(newSprint) {
  try{
    await InsertItem(TABLE_NAME, newSprint);
    return { status: StatusCodes.OK };
  }
  catch(err){
    return { status: StatusCodes.BAD_REQUEST, error: err.message };
  }
}

module.exports ={ getSprints, getSprint,updateSprint, deleteSprint, addSprint}
