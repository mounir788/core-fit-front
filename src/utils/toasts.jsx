import toast from "react-hot-toast";
import { FaCircleCheck } from "react-icons/fa6";
import { ToastContent } from "../components/ToastContent";
import { ToastIcon } from "../styles/generalStyles";
import { IoWarning } from "react-icons/io5";
import { PiWarningCircleFill } from "react-icons/pi";
import { HiInformationCircle } from "react-icons/hi";

// Functions to trigger different toasts
export const showErrorToast = (error) => {
  toast.error(
    <ToastContent
      title={"Error"}
      message={
        error?.response?.status === 422
          ? Object.entries(error?.response?.data).map(([key, value]) => value)
          : typeof error === "string"
          ? error
          : "Something went wrong. We couldn't process your request. Please try again."
      }
    />,
    {
      duration: 10000,
      style: {
        padding: "16px",
        background: "linear-gradient(180deg, #FFD4D1 0%, #FFFFFF 100%)",
        color: "#374151",
      },
      icon: (
        <ToastIcon>
          <IoWarning size={24} color="#FF3B30" />
        </ToastIcon>
      ),
    }
  );
};

export const showSuccessToast = (message) => {
  toast.success(
    <ToastContent
      title={"Success"}
      message={message || "Your request has been successfully completed!"}
    />,
    {
      duration: 3000,
      style: {
        padding: "16px",
        background: "linear-gradient(180deg, #C0FFD0 0%, #FFFFFF 100%)",
        color: "#374151",
      },
      icon: (
        <ToastIcon>
          <FaCircleCheck size={24} color="#34C759" />
        </ToastIcon>
      ),
    }
  );
};

export const showWarningToast = (message) => {
  toast(
    <ToastContent
      title={"Warning"}
      message={
        message ||
        "Are you sure you want to delete this item? This action cannot be undone."
      }
    />,
    {
      duration: 5000,
      style: {
        padding: "16px",
        background: "linear-gradient(180deg, #FFECA0 0%, #FFFFFF 100%)",
        color: "#374151",
      },
      icon: (
        <ToastIcon>
          <PiWarningCircleFill size={24} color="#FFCC00" />
        </ToastIcon>
      ),
    }
  );
};

export const showInfoToast = (message) => {
  toast(
    <ToastContent
      title={"Informative"}
      message={
        message ||
        "Your submission has been received. You will be notified once it's processed."
      }
    />,
    {
      duration: 5000,
      style: {
        padding: "16px",
        background: "linear-gradient(180deg, #AAD2FF 0%, #FFFFFF 100%)",
        color: "#374151",
      },
      icon: (
        <ToastIcon>
          <HiInformationCircle size={24} color="#086AD8" />
        </ToastIcon>
      ),
    }
  );
};
