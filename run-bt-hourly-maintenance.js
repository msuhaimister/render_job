const { runSql } = require("./db-runner");

async function main() {
  await runSql("SELECT public.run_bt_outcome_fill();", {
    jobName: "run-bt-hourly-maintenance:outcome-fill",
  });

  await runSql("SELECT public.run_bt_refresh_views();", {
    jobName: "run-bt-hourly-maintenance:refresh-views",
  });

  console.log("bt hourly maintenance done");
}

main().catch((err) => {
  console.error("bt hourly maintenance failed:", err.message);
  process.exit(1);
});
