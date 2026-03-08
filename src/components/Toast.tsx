import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { TOAST_DURATION } from "../utils/constants";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

// Global toast state
let toastId = 0;
const toastListeners: Array<(toast: ToastMessage) => void> = [];

export const showToast = (
  message: string,
  type: ToastType = "success",
  duration = TOAST_DURATION,
) => {
  const id = `toast-${toastId++}`;
  const toast: ToastMessage = { id, type, message, duration };
  toastListeners.forEach((listener) => listener(toast));
  return id;
};

interface ToastProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, toast.duration || TOAST_DURATION);

    return () => clearTimeout(timer);
  }, [toast, onRemove]);

  const bgColor = {
    success: "bg-success",
    error: "bg-danger",
    info: "bg-blue-primary",
  }[toast.type];

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    info: AlertCircle,
  }[toast.type];

  return (
    <div
      className={`${bgColor} text-white px-4 py-3 rounded-button flex items-center gap-2 shadow-lg animate-slide-in-down max-w-sm`}
    >
      <Icon size={20} />
      <span className="text-sm font-medium flex-1">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="ml-2 hover:opacity-80 transition-opacity"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const listener = (toast: ToastMessage) => {
      setToasts((prev) => [...prev, toast]);
    };
    toastListeners.push(listener);
    return () => {
      const index = toastListeners.indexOf(listener);
      if (index > -1) {
        toastListeners.splice(index, 1);
      }
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return createPortal(
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-auto">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>,
    document.body,
  );
};

export default Toast;
