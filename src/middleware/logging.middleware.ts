import { logger } from "../logger";

export function loggingError(err, req, res, next) {
    logger.log({
        level: 'error',
        message: `Method Name: ${err.name}, Arguments: ${JSON.stringify(err.args)}, Error: ${err.message}`
    });
    next();
}

export function loggingInfo(name, args) {
    logger.log({
        level: 'info',
        message: `Method Name: ${name}, Arguments: ${JSON.stringify(args)}`
    });
}