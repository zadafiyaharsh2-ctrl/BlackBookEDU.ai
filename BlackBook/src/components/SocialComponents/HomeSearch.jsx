import React from "react";
import { Search } from "lucide-react"; // modern icon set (optional)

const HomeSearch = () => {
  return (
    <div className="flex items-center bg-[#1E1E1E] rounded-full px-4 py-2 shadow-inner">
      {/* Search Icon */}
      <Search className="text-white w-5 h-10" />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search posts, people or topics..."
        className="ml-3 w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
      />
    </div>
  );
};

export default HomeSearch;

