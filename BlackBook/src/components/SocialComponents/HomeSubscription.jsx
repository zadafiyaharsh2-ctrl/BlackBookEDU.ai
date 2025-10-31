import React from "react";

const subscriptions = [
  { id: 1, name: "Tech Insider", price: "$5 / mo", img: "https://i.pravatar.cc/40?img=5" },
  { id: 2, name: "AI Digest", price: "$8 / mo", img: "https://i.pravatar.cc/40?img=12" },
  { id: 3, name: "Design Trends", price: "$3 / mo", img: "https://i.pravatar.cc/40?img=8" },
];

const HomeSubscription = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-5 text-center text-white tracking-wide">
        Your Subscriptions
      </h2>

      <div className="flex flex-col gap-4">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="flex justify-between items-center bg-[#222222] hover:bg-[#2f2f2f] transition-all duration-300 ease-in-out p-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-[1.02] group"
          >
            <div className="flex items-center gap-3">
              {/* 🟣 Profile Circle */}
              <img
                src={sub.img}
                alt={sub.name}
                className="w-10 h-10 rounded-full border border-gray-500 object-cover group-hover:border-[#00bcd4] transition-colors duration-300"
              />

              {/* 🧾 Subscription Info */}
              <div>
                <p className="font-semibold text-white group-hover:text-[#00bcd4] transition-colors duration-300">
                  {sub.name}
                </p>
                <p className="text-sm text-gray-400 mt-1">{sub.price}</p>
              </div>
            </div>

            {/* ⚙️ Manage Button */}
            <button className="text-sm font-semibold text-gray-300 hover:text-[#00bcd4] transition-all duration-300">
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSubscription;
