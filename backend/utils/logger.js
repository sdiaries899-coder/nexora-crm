/**
 * @desc Simple Logger Utility
 */

const isProd = process.env.NODE_ENV === "production";

const format = (level, message, meta) => {
  const time = new Date().toISOString();
  return {
    time,
    level,
    message,
    ...(meta && { meta }),
  };
};

export const logger = {
  info: (message, meta) => {
    const log = format("INFO", message, meta);
    if (!isProd) {
      console.log(`🟢 [INFO] ${log.time} - ${message}`, meta || "");
    } else {
      console.log(JSON.stringify(log));
    }
  },

  warn: (message, meta) => {
    const log = format("WARN", message, meta);
    if (!isProd) {
      console.warn(`🟡 [WARN] ${log.time} - ${message}`, meta || "");
    } else {
      console.warn(JSON.stringify(log));
    }
  },

  error: (message, meta) => {
    const log = format("ERROR", message, meta);
    if (!isProd) {
      console.error(`🔴 [ERROR] ${log.time} - ${message}`, meta || "");
    } else {
      console.error(JSON.stringify(log));
    }
  },
};