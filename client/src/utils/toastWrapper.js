import { toast } from "react-hot-toast";

export const toastError = (message) => {
  return toast.error(message, {
    position: "top-center",
    duration: 3000,
  });
};

export const toastSuccess = (message) => {
  return toast.success(message, {
    position: "top-center",
    duration: 3000,
  });
};

export const toastInfo = (message) => {
  toast(message, {
    position: "top-center",
    duration: 3000,
  });
};
