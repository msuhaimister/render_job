const { runSql } = require("./db-runner");

runSql("SELECT public.run_wallet_pipeline_low_freq();")
  .then(() => {
    console.log("run_wallet_pipeline_low_freq done");
  })
  .catch((err) => {
    console.error("run_wallet_pipeline-low-freq failed:", err.message);
    process.exit(1);
  });
