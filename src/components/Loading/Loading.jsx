import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="loader w-full h-full ease-linear rounded-full border-4 border-t-primary border-gray-200 animate-spin"></div>
    </div>
  );
}

export default Loading;
