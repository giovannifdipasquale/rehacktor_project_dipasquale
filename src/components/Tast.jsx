// src/components/Toast.jsx
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const icons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationCircleIcon,
  info: InformationCircleIcon,
};

const colors = {
  success: "bg-green-50 text-green-800",
  error: "bg-red-50 text-red-800",
  warning: "bg-yellow-50 text-yellow-800",
  info: "bg-blue-50 text-blue-800",
};

export function Toast({ show, type = "info", message, onClose }) {
  const Icon = icons[type];

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`fixed bottom-4 right-4 z-50 rounded-lg p-4 shadow-lg ${colors[type]}`}
      >
        <div className="flex items-center">
          <Icon className="h-6 w-6" aria-hidden="true" />
          <p className="ml-3 text-sm font-medium">{message}</p>
          <button
            onClick={onClose}
            className="ml-4 inline-flex text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <XCircleIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Transition>
  );
}
