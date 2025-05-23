import React from "react";

const Button = ({ onClick, children, className = "", disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-3 rounded-lg text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 ${className}`}
  >
    {children}
  </button>
);

export default Button;