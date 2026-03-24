const { runSql } = require("./db-runner");

runSql("SELECT public.run_partition_maintenance_7d();")
  .then(() => {
    console.log("run_partition_maintenance_7d done");
  })
  .catch((err) => {
    console.error("run_partition_maintenance_7d failed:", err.message);
    process.exit(1);
  });
