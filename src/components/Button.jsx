// Button.js
import React from "react";

const Button = ({ buttonText, handleSubmit }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        type="submit"
        className="w-[30%] py-3 bg-[#2B2F36] text-white rounded-lg hover:bg-gray-500 focus:outline-none"
        onClick={handleSubmit}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Button;
