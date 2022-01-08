// const postgreSQl = require('./postgreSQL.connection');
// const genericService = require('../../services/GenericModelService');
const axios = require('axios');
const { StatusCodes } = require('http-status-codes');
// const { GET_DELETE_URL, ADD_URL } = require('../../../../utils/constants/nsApi.constants');
// const { createConfig } = require('../../../services/configCreator.service');
// const { getUser } = require('./user.controller');
const pool = require("../../../../services/sql.connections").pool;

const waitFor = (ms) => new Promise((res) => setTimeout(res, ms));
const handleErrors = ({ response: { data } = {} }) => { throw new Error(JSON.stringify(data)); };

const SCHEMA = 'public';

const user = {
    id: { type: 'number' },
    name: { type: 'string' },
    username: { type: 'string' },
    email: { type: 'string' },
    imgUrl: { type: 'string' },
    title: { type: 'string' },
    role: { type: 'string' },
    phone: { type: 'string' },
    groupId: { type: 'number' },
};

function getUsers(){ 
    const query = `SELECT * FROM ${SCHEMA}.Users`;
    return sendQuery(query);
}

function getItemsWhere(property, value){
    const query = `SELECT * FROM ${SCHEMA}.Users WHERE ${property} = $1`;
    return sendQuery(query, [value]);
}

const sendQuery = (query, values=[]) => {
    // logger.databaseQuery(query + ', QUERY VALUES: ' + JSON.stringify(values));
    return pool.query(query, values).then(queryRes => queryRes.length <= 1 ? queryRes.rows[0] : queryRes.rows);
};

// /**
//  * add a user.
//  *
//  * @param {object} param0 { namespace (string representing the ns name), services (array representing the required services in the ns)}
//  * @returns relevant status code.
//  */
// async function addUser({...user}) {
//   try {
//     const isExist = await getUser(id);
//     if (isExist) throw new Error(`User with the name or the email of ${user} already exists`);
//     await createNS(namespace, createConfig(namespace, services));
//     return { status: StatusCodes.OK };
//   } catch (error) { logger.error(error.message); return { status: StatusCodes.BAD_REQUEST, error: error.message }; }
// }

// /**
//  * Used to update a namespace.
//  *
//  * @param {object} param0 { namespace (string representing the ns name), services (array representing the required services in the ns)}
//  * @returns relevant status code.
//  */
// async function updateNamespace({ namespace, services }) {
//   try {
//     const isExist = await getNSConfig(namespace);
//     if (!isExist) throw new Error(`NS with the name of ${namespace} does not exist`);
//     await updateNS(namespace, createConfig(namespace, services));
//     return { status: StatusCodes.OK };
//   } catch (error) { logger.error(error.message); return { status: StatusCodes.BAD_REQUEST, error: error.message }; }
// }

// /**
//  * Used to update a namespace.
//  *
//  * @param {object} param0 { namespace (string representing the ns name), services (array representing the required services in the ns)}
//  * @returns relevant status code.
//  */
// async function restartNSResourceOrService({ namespace, services, resources }) {
//   try {
//     const nsConfig = await getNSConfig(namespace);
//     if (!nsConfig) throw new Error(`NS with the name of ${namespace} does not exist`);
//     const tempConfig = {
//       ...nsConfig,
//       services: nsConfig.services.filter(({ id }) => !services.includes(id)),
//       resources: nsConfig.resources.filter(({ id }) => !resources.includes(id)),
//     };
//     await updateNS(namespace, tempConfig);
//     await waitFor(10000);
//     await updateNS(namespace, nsConfig);
//     return { status: StatusCodes.OK };
//   } catch (error) { logger.error(error.message); return { status: StatusCodes.BAD_REQUEST, error: error.message }; }
// }

// module.exports = { addNamespace, updateNamespace, restartNSResourceOrService };
module.exports = { getUsers, getItemsWhere}

