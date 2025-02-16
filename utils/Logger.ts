import winston from "winston";
import path from "path";

const loggingDir = path.resolve(__dirname, "../logging");

const clearLogs = () => {
    const files = ['error.log', 'combined.log'];
    files.forEach(file => {
      const filePath = `${loggingDir}/${file}`;
      try {
        require('fs').unlinkSync(filePath);
      } catch (err) {
        // file doesn't exist, ignore
      }
    });
  };
  
  clearLogs();
  
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        customFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `${loggingDir}/error.log`, level: "error" }),
        new winston.transports.File({ filename: `${loggingDir}/combined.log` }),
    ],
});

export default logger;

//SKONTAJ KAKO LOGGER DA SE POKRECE SVAKI PUT OD NULE

