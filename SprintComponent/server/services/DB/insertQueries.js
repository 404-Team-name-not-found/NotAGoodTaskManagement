const pool = require("./sql.connections").pool;

async function insertTask(name,estimation,creationDate,status,assigedTo,creator,sprintId,storyId, groupId){
  const client = await pool.connect();
  const res = client.query(
    `INSERT INTO public."Tasks"(
         name, estimation, "creationDate", status, "assigedTo", creator, "sprintId", "storyId", "groupId")
        VALUES ( '${name}', '${estimation}', '${creationDate}', '${status}', '${assigedTo}', '${creator}', '${sprintId}', '${storyId}', ${groupId}) returning *`
  );
  client.release();
  return await res;
}

async function insertUser(username, password,imgurl,email, title, role,phone,groupid) {
  const client = await pool.connect();
  const res = client.query(
    `INSERT INTO public."Users"(
        username, password, "imgUrl", title, role, email, phone, groupid)
        VALUES ('${username}', '${password}', '${imgurl}','${email}', '${title}', '${role}', '${phone}', ${groupid}) returning *`
  );
  client.release();
  return await res.rows;
}

async function insertMessage(title, author, content, taskid) {
  const client = await pool.connect();
  const res = client.query(
    `INSERT INTO public."Messages"(
         title, author, content, "taskId")
        VALUES ( '${title}', '${author}', '${content}', '${taskid}')`
  );
  client.release();
  return await res.rows;
}

async function insertSprint(name, description, duration, startDate) {
  const client = await pool.connect();
  const res = client.query(
    `INSERT INTO public."Sprints"(
         name, description, duration, "startDate")
        VALUES ( '${name}', '${description}', '${duration}', '${startDate}')`
  );
  client.release();
  return await res.rows;
}

async function insertGroup(name, numberOfUsers, description, imgUrl) {
  const client = await pool.connect();
  const res = client.query(
    `INSERT INTO public."Groups"(
         name, "numOfUsers", description, "imgUrl")
        VALUES ('${name}' , '${numberOfUsers}', '${description}', '${imgUrl}')`
  );
  client.release();
  return await res.rows;
}

async function insertStory(name, icon, color, description, startDate, endDate) {
  const client = await pool.connect();
  const res = client.query(
    `INSERT INTO public."Story"(
         name, icon, color, description, "startDate", "endDate")
        VALUES ( '${name}', '${icon}', '${color}', '${description}', '${startDate}', '${endDate}');`
  );
  client.release();
  return await res.rows;
}

module.exports.insertGroup=insertGroup;
module.exports.insertMessage=insertMessage;
module.exports.insertSprint=insertSprint;
module.exports.insertStory=insertStory;
module.exports.insertTask=insertTask;
module.exports.insertUser=insertUser;