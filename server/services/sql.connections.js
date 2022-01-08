const { Pool } = require("pg");
const pool = new Pool({
  host: "abul.db.elephantsql.com",
  port: 5432,
  user: "ammakwtf",
  password: "QRcKPMHL9s5YQsC-bi0NfBA7pGyHWviu",
  database: "ammakwtf",
});

exports.pool = pool;