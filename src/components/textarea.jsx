import React from "react";

const Textarea = ({ value, onChange, placeholder, rows = 5, className = "" }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className={`border border-gray-300 rounded-lg p-3 w-full ${className}`}
  />
);

export default Textarea;