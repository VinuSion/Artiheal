import React from "react";
import {
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

type SignLabelProps = {
  variant?: "warning" | "error" | "info" | "success";
  message?: string;
};

const SignLabel: React.FC<SignLabelProps> = ({ variant, message }) => {
  const getIconAndColor = () => {
    let icon = null;
    let textColor = "";
    let bgColor = "";

    switch (variant) {
      case "error":
        textColor = "text-red-600";
        bgColor = "bg-red-100";
        icon = <ExclamationTriangleIcon className={`h-3 w-3 ${textColor}`} />;
        break;
      case "warning":
        textColor = "text-amber-600";
        bgColor = "bg-amber-100";
        icon = <ExclamationCircleIcon className={`h-3 w-3 ${textColor}`} />;
        break;
      case "info":
        textColor = "text-blue-600";
        bgColor = "bg-blue-100";
        icon = <InformationCircleIcon className={`h-3 w-3 ${textColor}`} />;
        break;
      case "success":
        textColor = "text-emerald-600";
        bgColor = "bg-emerald-100";
        icon = <CheckCircleIcon className={`h-3 w-3 ${textColor}`} />;
        break;
      default:
        textColor = "text-slate-600";
        bgColor = "bg-slate-200";
        icon = <XCircleIcon className={`h-3 w-3 ${textColor}`} />;
        break;
    }

    return { icon, textColor, bgColor };
  };

  const { icon, textColor, bgColor } = getIconAndColor();

  return (
    <span className={`inline-flex items-center w-auto text-xs ${bgColor} rounded ${textColor} p-[2px] px-2`}>
      {icon}
      { message ? (
        <span className="ml-1">{message}</span>
      ) : (<></>)}
    </span>
  );
};

export default SignLabel;

