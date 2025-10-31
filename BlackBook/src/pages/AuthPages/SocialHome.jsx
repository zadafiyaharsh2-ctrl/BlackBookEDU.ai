import React from "react";
import SocialSidebar from "../../components/SocialComponents/SocialSidebar";
import HomeFeed from "../../components/SocialComponents/HomeFeed";
import HomeProfileCard from "../../components/SocialComponents/HomeProfileCard";
import HomeSearch from "../../components/SocialComponents/HomeSearch";
import HomeSubscription from "../../components/SocialComponents/HomeSubscription";
import HomeSuggested from "../../components/SocialComponents/HomeSuggested";

const SocialHome = () => {
  return (
    <div className="min-h-screen bg-[#262626] flex justify-center py-4 px-4">
      <div className="grid grid-cols-12 gap-4 w-full max-w-7xl">
        
        {/* LEFT SECTION */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* 1 - Profile Card */}
          <div className="bg-[#1E1E1E] rounded-2xl shadow p-0">
            <HomeProfileCard />
          </div>

          {/* 2 - Sidebar */}
          <div className="bg-[#1E1E1E] rounded-2xl shadow p-0">
            <SocialSidebar />
          </div>
        </div>

        {/* CENTER SECTION */}
        <div className="col-span-6 flex flex-col gap-4">
          {/* 3 - Search Bar */}
          <div className="bg-[#1E1E1E] rounded-2xl shadow p-0">
            <HomeSearch />
          </div>

          {/* 8 - Main Feed */}
          <div className="bg-[#1E1E1E] rounded-2xl shadow p-4 flex-1 overflow-y-auto">
            <HomeFeed />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* 6 - Subscription */}
          <div className="bg-[#1E1E1E] rounded-2xl shadow p-4">
            <HomeSubscription />
          </div>

          {/* 7 - Suggested for You */}
          <div className="bg-[#1E1E1E] rounded-2xl shadow p-4">
           
            <HomeSuggested/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SocialHome;
