import React from "react";
import { Bell, Heart, MessageCircle, UserPlus } from "lucide-react"; // using lucide icons

const NotificationCard = () => {
  // demo notifications — you can replace with API data later
  const notifications = [
    {
      id: 1,
      user: "Aarav Sharma",
      action: "liked your post",
      time: "2h ago",
      icon: <Heart className="text-pink-500" size={18} />,
    },
    {
      id: 2,
      user: "Priya Verma",
      action: "commented on your photo",
      time: "4h ago",
      icon: <MessageCircle className="text-blue-400" size={18} />,
    },
    {
      id: 3,
      user: "Rohan Patel",
      action: "started following you",
      time: "1d ago",
      icon: <UserPlus className="text-green-400" size={18} />,
    },
  ];

  return (
    <div className="bg-[#1E1E1E] rounded-2xl shadow p-5 text-white">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Bell className="text-yellow-400" /> Notifications
      </h2>

      <div className="flex flex-col gap-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-center justify-between bg-[#2a2a2a] hover:bg-[#333333] transition-all duration-300 p-3 rounded-xl cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1E1E1E] rounded-full">
                {n.icon}
              </div>
              <div>
                <p className="font-medium text-sm">
                  <span className="text-white">{n.user}</span>{" "}
                  <span className="text-gray-300">{n.action}</span>
                </p>
                <p className="text-xs text-gray-500">{n.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCard;
