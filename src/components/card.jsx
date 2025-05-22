import React from "react";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow-md rounded-lg pb-3 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export { Card, CardContent };