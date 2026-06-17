// import nodemailer from "nodemailer";
// import { emailQueue } from "../queues/email.queue.js";
// import { logger } from "../utils/logger.js";
// import AppError from "../utils/AppError.js";
// import { serviceHandler } from "../utils/serviceHandler.js";

// /**
//  * @desc Fallback Mail Transport (if Redis queue not available)
//  */
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// /**
//  * @desc Send Email (Queue first, fallback direct)
//  */
// export const sendEmail = serviceHandler(
//   async ({ to, subject, html }) => {
//     if (!to || !subject || !html) {
//       throw new AppError("All email fields are required", 400);
//     }

//     // ✅ If queue available → use queue
//     if (emailQueue) {
//       await emailQueue.add("sendEmail", { to, subject, html });

//       logger.info("Email queued", { to, subject });
//     } else {
//       // ✅ fallback direct send
//       await transporter.sendMail({
//         from: `"OneCRM" <${process.env.EMAIL_USER}>`,
//         to,
//         subject,
//         html,
//       });

//       logger.warn("Email sent directly (queue unavailable)", { to });
//     }

//     return true;
//   }
// );

import nodemailer from "nodemailer";
import { logger } from "../utils/logger.js";

/**
 * @desc Send Email Directly (No Redis Queue)
 */
export const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"OneCRM" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    logger.info("Email sent successfully", {
      messageId: info.messageId,
      to,
    });

    return true;
  } catch (err) {
    logger.error("Email sending failed", {
      error: err.message,
    });

    throw err;
  }
};