import React, { useState, useEffect } from "react";
import SocialSidebar from "../../components/SocialComponents/SocialSidebar";
import HomeFeed from "../../components/SocialComponents/HomeFeed";
import HomeProfileCard from "../../components/SocialComponents/HomeProfileCard";
import HomeSearch from "../../components/SocialComponents/HomeSearch";
import HomeSubscription from "../../components/SocialComponents/HomeSubscription";
import HomeSuggested from "../../components/SocialComponents/HomeSuggested";
import { ArrowUpCircleIcon } from "lucide-react"; // optional — nice icon

const SocialHome = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 👇 Show button after scrolling down 300px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowScrollTop(true);
      else setShowScrollTop(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👇 Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#262626] flex justify-center py-4 px-4">
      <div className="grid grid-cols-12 gap-4 w-full max-w-7xl">
        {/* LEFT SECTION */}
        <div className="col-span-3 flex flex-col gap-4 sticky top-4 h-fit">
          <div className="bg-[#1E1E1E] rounded-2xl shadow p-0">
            <HomeProfileCard />
          </div>

          <div className="bg-[#1E1E1E] rounded-2xl shadow p-0">
            <SocialSidebar />
          </div>
        </div>

        {/* CENTER SECTION */}
        <div className="col-span-6 flex flex-col gap-4">
          <div className="bg-[#1E1E1E] rounded-2xl shadow p-0 sticky top-4 z-10">
            <HomeSearch />
          </div>

          <div className="bg-[#1E1E1E] rounded-2xl shadow p-4 flex-1 overflow-y-auto h-[80vh]">
            <HomeFeed />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="col-span-3 flex flex-col gap-4 sticky top-4 h-fit">
          <div className="bg-[#1E1E1E] rounded-2xl shadow p-4">
            <HomeSubscription />
          </div>

          <div className="bg-[#1E1E1E] rounded-2xl shadow p-4">
            <HomeSuggested />
          </div>
        </div>
      </div>

      {/* 👇 Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#1E1E1E] hover:bg-[#3a3a3a] text-white rounded-full p-3 shadow-lg transition-all duration-300"
        >
          <ArrowUpCircleIcon className="w-7 h-7" />
        </button>
      )}
    </div>
  );
};

export default SocialHome;
