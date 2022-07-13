import winston from "winston";
import custom from "./customLevels";

class Logger {
  private logger: winston.Logger;

  constructor() {
    const prodTransport = new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    });
    const transport = new winston.transports.Console({
      format: custom.formatter,
    });
    this.logger = winston.createLogger({
      level: this.isDevEnvironment() ? 'debug' : 'warn',
      levels: custom.customLevels.levels,
      transports: [this.isDevEnvironment() ? transport : prodTransport],
    });
    winston.addColors(custom.customLevels.colors);
  }

  http(msg: any, meta?: any) {
    this.logger.http(msg, meta);
  }

  debug(msg: any, meta?: any) {
    this.logger.debug(msg, meta);
  }

  info(msg: any, meta?: any) {
    this.logger.info(msg, meta);
  }

  warn(msg: any, meta?: any) {
    this.logger.warn(msg, meta);
  }

  error(msg: any, meta?: any) {
    this.logger.error(msg, meta);
  }

  // fatal(msg: any, meta?: any) {
  //   this.logger.log('fatal', msg, meta);
  // }

  isDevEnvironment(): boolean {
    const env = process.env.NODE_ENV || 'development'
    return env === 'development'
  }
}

const logger = new Logger();
export default logger;


