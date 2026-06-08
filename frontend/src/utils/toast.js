import { toast } from "react-hot-toast";

/**
 * @desc Show Success Toast
 */
export const showSuccess = (message = "Success") => {
  toast.success(message, {
    duration: 3000,
    position: "top-right",
  });
};

/**
 * @desc Show Error Toast
 */
export const showError = (message = "Something went wrong") => {
  toast.error(message, {
    duration: 4000,
    position: "top-right",
  });
};