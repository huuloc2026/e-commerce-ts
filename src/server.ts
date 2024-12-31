import app from "./app";
import config from "./config/config";
import logger from "./middlewares/logger";



const server = app.listen(Number(config.server.port), () => {
  console.log(`Server running on http://localhost:${config.server.port}`);
});

process.on('SIGNINT',()=>{
  server.close(()=>console.log(`Exit Server`))
})

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});