import React from "react";
import { useNavigate } from "react-router-dom";

const HomeProfileCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-[#1E1E1E] text-white rounded-xl p-4 flex flex-col items-center justify-center hover:bg-[#242424] transition-all duration-300 shadow-md"
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center text-2xl font-bold">
          HZ
        </div>
        <div className="absolute bottom-0 right-0 bg-blue-500 w-5 h-5 rounded-full border-2 border-gray-800 flex items-center justify-center text-white text-sm">
          +
        </div>
      </div>

      <h2 className="mt-3 text-lg font-semibold">Harsh Zadafiya</h2>
      <p className="text-gray-400 text-sm text-center">Indian Institute of Information Technology Surat</p>
      <p className="text-gray-500 text-xs mt-1">Surat, Gujarat</p>

      <div className="mt-3 flex items-center gap-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/d/db/Indian_Institute_of_Information_Technology%2C_Surat_Logo.png"
          alt="IIIT Surat"
          className="w-5 h-5"
        />
        <span className="text-xs text-gray-300">IIIT Surat</span>
      </div>
    </div>
  );
};

export default HomeProfileCard;

