import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Bell,
  Mail,
  Repeat,
  DollarSign,
  User,
  Plus,
} from "lucide-react";

const SocialSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  // update active tab when route changes
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", icon: <Home size={20} />, path: "/Social" },
    { name: "Notification", icon: <Bell size={20} />, path: "/social/notifications" },
    { name: "Message", icon: <Mail size={20} />, path: "/social/messages" },
    { name: "Subscription", icon: <Repeat size={20} />, path: "/social/subscriptions" },
    { name: "My Earning", icon: <DollarSign size={20} />, path: "/social/earnings" },
    { name: "My Profile", icon: <User size={20} />, path: "/profile" },
  ];

  const handleNavClick = (path) => {
    setActive(path);
    navigate(path);
  };

  return (
    <div className="flex flex-col justify-between h-[400px] w-full bg-[#1E1E1E] text-white rounded-2xl p-4 shadow-lg">
      {/* Navigation Links */}
      <div className="flex flex-col gap-3">
        {navItems.map((item, index) => {
          const isActive = active === item.path;
          return (
            <div
              key={index}
              onClick={() => handleNavClick(item.path)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 ease-in-out
              ${
                isActive
                  ? "bg-white text-black font-semibold shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-[#2a2a2a]"
              }`}
            >
              {item.icon}
              <span className="text-[15px] font-medium">{item.name}</span>
            </div>
          );
        })}
      </div>

      {/* Add Post Button */}
      <button
        onClick={() => navigate("/social/add-post")}
        className="flex items-center justify-center gap-2 mt-4 bg-white text-black font-semibold py-2 rounded-xl hover:bg-gray-200 transition-all duration-300"
      >
        <Plus size={18} /> Add Post
      </button>
    </div>
  );
};

export default SocialSidebar;
