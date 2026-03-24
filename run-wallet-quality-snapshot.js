const { runSql } = require("./db-runner");

runSql("SELECT public.run_wallet_quality_snapshot();")
  .then(() => {
    console.log("run_wallet_quality_snapshot done");
  })
  .catch((err) => {
    console.error("run_wallet_quality_snapshot failed:", err.message);
    process.exit(1);
  });
