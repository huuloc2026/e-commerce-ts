import app from "./app";
import config from "./config/config";

import logger from "./middlewares/logger";


const server = app.listen(Number(config.server.port), () => {
  console.log(`Server running on http://localhost:${config.server.port}`);
});

process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received.");
  logger.info("Closing server.");
  server.close((err) => {
    logger.info("Server closed.");
    // eslint-disable-next-line no-process-exit
    process.exit(err ? 1 : 0);
  });
});
