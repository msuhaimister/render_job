const { runSql } = require("./db-runner");

runSql("SELECT public.run_wallet_pipeline_mid_freq();")
  .then(() => {
    console.log("run_wallet_pipeline_mid_freq done");
  })
  .catch((err) => {
    console.error("run_wallet_pipeline_mid_freq failed:", err.message);
    process.exit(1);
  });
