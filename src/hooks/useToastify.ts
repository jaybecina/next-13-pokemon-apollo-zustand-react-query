import React from "react";
import { toast } from "react-toastify";

export const useToastify = (type: string, message: string) => {
  return toast(message, {
    hideProgressBar: true,
    autoClose: 2000,
    type: type === "success" ? "success" : "error",
    position: "bottom-right",
  });
};
