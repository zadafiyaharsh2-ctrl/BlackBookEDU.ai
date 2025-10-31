import React from "react";

const suggestions = [
  {
    id: 1,
    name: "Riya Sharma",
    username: "@riya.codes",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=riya",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    username: "@dev.arjun",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=arjun",
  },
  {
    id: 3,
    name: "Priya Patel",
    username: "@priya.designs",
    avatar: "https://api.dicebear.com/9.x/thumbs/svg?seed=priya",
  },
];

const HomeSuggested = () => {
  return (
    <div >
      <h2 className="text-xl font-bold mb-5 text-center text-white tracking-wide">
        Suggested for You
      </h2>

      <div className="flex flex-col gap-4">
        {suggestions.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-[#222222] hover:bg-[#2f2f2f] transition-all duration-300 ease-in-out p-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-[1.02] group"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-[#ffffff] transition-all duration-300"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 bg-[#00bcd4]/40 transition-all duration-300"></div>
              </div>

              <div>
                <p className="font-semibold text-white group-hover:text-[#00bcd4] transition-colors duration-300">
                  {user.name}
                </p>
                <p className="text-sm text-gray-400">{user.username}</p>
              </div>
            </div>

            <button className="text-sm font-semibold text-gray-300 hover:text-[#ffffff] transition-all duration-300">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSuggested;
