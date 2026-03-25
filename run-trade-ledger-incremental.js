const { runSql } = require("./db-runner");

runSql("SELECT public.run_trade_ledger_incremental_cron();", {
  jobName: "run-trade-ledger-incremental",
})
  .then(() => {
    console.log("run_trade_ledger_incremental_cron done");
  })
  .catch((err) => {
    console.error("run_trade_ledger_incremental_cron failed:", err.message);
    process.exit(1);
  });
