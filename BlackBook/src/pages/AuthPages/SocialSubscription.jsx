import React from "react";
import Navbar from "../../components/AuthComponents/Navbar";
import HomeProfileCard from "../../components/SocialComponents/HomeProfileCard";
import SocialSidebar from "../../components/SocialComponents/SocialSidebar";
const SocialSubscription = () => {
  return (
    <div>
      <Navbar />
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
        </div>
      </div>
    </div>
  );
};

export default SocialSubscription;
