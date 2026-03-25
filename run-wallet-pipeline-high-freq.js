const { runSql } = require("./db-runner");

runSql("SELECT public.run_wallet_pipeline_high_freq();", {
  jobName: "run-wallet-pipeline-high-freq",
})
  .then(() => {
    console.log("run_wallet_pipeline_high_freq done");
  })
  .catch((err) => {
    console.error("run_wallet_pipeline_high_freq failed:", err.message);
    process.exit(1);
  });
