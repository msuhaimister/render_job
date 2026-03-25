const { Client } = require("pg");

function nowIso() {
  return new Date().toISOString();
}

function toSafeDbTarget(connectionString) {
  try {
    const u = new URL(connectionString);
    const host = u.hostname || "unknown-host";
    const port = u.port || "5432";
    const db = (u.pathname || "").replace(/^\//, "") || "unknown-db";
    const user = u.username || "unknown-user";
    return `${user}@${host}:${port}/${db}`;
  } catch (_) {
    return "unparseable-database-url";
  }
}

function logPgError(err) {
  console.error("[db] Error message:", err && err.message ? err.message : String(err));
  if (err && err.code) console.error("[db] SQLSTATE:", err.code);
  if (err && err.detail) console.error("[db] Detail:", err.detail);
  if (err && err.hint) console.error("[db] Hint:", err.hint);
  if (err && err.where) console.error("[db] Where:", err.where);
  if (err && err.position) console.error("[db] Position:", err.position);
  if (err && err.schema) console.error("[db] Schema:", err.schema);
  if (err && err.table) console.error("[db] Table:", err.table);
  if (err && err.column) console.error("[db] Column:", err.column);
  if (err && err.constraint) console.error("[db] Constraint:", err.constraint);
  if (err && err.stack) console.error("[db] Stack:", err.stack);
}

async function runSql(sql, options = {}) {
  const jobName = options.jobName || "unnamed-job";
  const connectionString = process.env.DATABASE_URL;
  const startMs = Date.now();

  console.log(`[${jobName}] ${nowIso()} Starting job`);
  console.log(`[${jobName}] DATABASE_URL exists:`, Boolean(connectionString));
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  console.log(`[${jobName}] DB target:`, toSafeDbTarget(connectionString));
  console.log(`[${jobName}] SQL: ${sql}`);

  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log(`[${jobName}] Connected`);

    const result = await client.query(sql);
    console.log(
      `[${jobName}] Query succeeded in ${Date.now() - startMs} ms; rowCount=${result.rowCount}`
    );
    if (result.rows && result.rows.length > 0) {
      console.log(`[${jobName}] Result rows:`, JSON.stringify(result.rows));
    }
    return result;
  } catch (err) {
    console.error(`[${jobName}] Query failed after ${Date.now() - startMs} ms`);
    logPgError(err);
    throw err;
  } finally {
    try {
      await client.end();
      console.log(`[${jobName}] Disconnected`);
    } catch (closeErr) {
      console.error(`[${jobName}] Failed to close connection:`, closeErr.message);
    }
  }
}

module.exports = { runSql };
