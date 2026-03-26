const { runSql } = require("./db-runner");

runSql("SELECT public.run_bt_snapshot_capture();", {
  jobName: "run-bt-snapshot-capture",
})
  .then(() => {
    console.log("run_bt_snapshot_capture done");
  })
  .catch((err) => {
    console.error("run_bt_snapshot_capture failed:", err.message);
    process.exit(1);
  });
