const { default: fastify } = require('fastify');
const { StatusCodes } = require('http-status-codes');
const genericQueries = require("../../../../services/genericCrudQueries");

const TABLE_NAME = "Users";

/**
 * Used to get all existing users.
 * 
 * @returns relevant status code and array of all the user objects.
 */
async function getUsers() {
    try {
        let res;
        await genericQueries.getItems(TABLE_NAME).then((queryResult) => { res = queryResult; });
        return { users: res, status: StatusCodes.OK };
    } catch (err) {
        return { status: StatusCodes.BAD_REQUEST, error: err.message };
    }
}

/**
 * Used to get a user by email.
 *
 * @param {string} email (string representing the user's email)
 * 
 * @returns relevant status code and the wanted user object.
 */
async function getUser(email) {
    try {
        let isExist;
        await genericQueries.isExist(TABLE_NAME, "email", email).then((queryResult) => { isExist = queryResult });
        if (!isExist) throw new Error(`User with this email does not exist`);

        let res;
        await genericQueries.getItem(TABLE_NAME, "email", email).then((queryResult) => { res = queryResult });
        return { user: res[0], status: StatusCodes.OK };
    }
    catch (err) {
        return { status: StatusCodes.BAD_REQUEST, error: err.message };
    }
}

/**
 * Used to add a user.
 *
 * @param {object} newUser (object representing the new user object to add)}
 * @param {object} fastify (instance of fastify)
 * 
 * @returns relevant status code.
 */
async function addUser(newUser, fastify) {
    try {
        let isExist;
        await genericQueries.isExist(TABLE_NAME, "email", newUser.email).then((queryResult) => { isExist = queryResult });
        if (isExist) throw new Error(`User with this email or username already exists`);

        // Generate hash for the user password and replace the unhashed one with the hashed
        const hashedPassword = await fastify.bcrypt.hash(newUser.password);
        newUser.password = hashedPassword;

        await genericQueries.insertItem(TABLE_NAME, newUser);
        return { status: StatusCodes.OK };
    }
    catch (err) {
        return { status: StatusCodes.BAD_REQUEST, error: err.message };
    }
}

/**
 * Used to update a user.
 *
 * @param {object} email (string representing the user's email)
 * @param {object} updatedUser (object representing the properties to change)
 *
 * @returns relevant status code.
 */
async function updateUser(email, updatedUser) {
    try {
        if (Object.keys(change).length === 0) throw new Error(The changed object was sent empty);
        let isExist;
        await genericQueries.isExist(TABLE_NAME, "email", email).then((queryResult) => { isExist = queryResult });
        if (!isExist) throw new Error(`User with the email- ${email} does not exist`);
        await genericQueries.updateSpecificItem("email", email, TABLE_NAME, updatedUser);
        return { status: StatusCodes.OK };
    }
    catch (error) {
        return { status: StatusCodes.BAD_REQUEST, error: error.message };
    }
}

/**
 * Used to delete a user.
 *
 * @param {object} email (string representing the user's email)
 * 
 * @returns relevant status code.
 */
async function deleteUser(email) {
    try {
        const isExist = await genericQueries.isExist(TABLE_NAME, "email", email);
        if (!isExist) throw new Error(`User with the email- ${email} does not exist`);
        await genericQueries.deleteItem(TABLE_NAME, "email", email);
        return { status: StatusCodes.OK };
    }
    catch (error) {
        return { status: StatusCodes.BAD_REQUEST, error: error.message };
    }
}

/**
 * Used to sign up a user.
 *
 * @param {object} user (object representing the user's email)
 * @param {object} fastify (instance of fastify)
 * 
 * @returns relevant status code.
 */
async function signUp(user, fastify) {
    return await addUser(user, fastify);
}

/**
 * Used to sign in a user.
 *
 * @param {object} user (object representing the user's email)
 * @param {string} property (the property used for sign in)
 * @param {string} value (the property's value) 
 * @param {object} fastify (instance of fastify)
 * 
 * @returns relevant status code.
 */
async function signIn(user, property, value, fastify) {
    try {
        let isExist;
        await genericQueries.isExist(TABLE_NAME, property, value).then((queryResult) => { isExist = queryResult });
        if (!isExist) throw new Error("The username, the email or the password don't exist");
        let existUser;
        let res;
        await genericQueries.getItem(TABLE_NAME, property, value).then((queryResult) => { existUser = queryResult; });

        await fastify.bcrypt.hash(user.password)
            .then(hash => fastify.bcrypt.compare(user.password, existUser.password))
            .then(match => res = match)
            .catch(err => { throw new Error(err.message) });
        if (res) return { status: StatusCodes.OK, title: "You've been signed in successfully!" };
        return { status: 400, title: "The username, the email or the password don't exist" };
    }
    catch (err) {
        return { status: 400, title: err.message };
    }
}

module.exports = { getUsers, getUser, addUser, updateUser, deleteUser, signUp, signIn };

