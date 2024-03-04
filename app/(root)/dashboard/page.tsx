"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <div className="h-full">
      <div className="space-y-[10px]">
        <div className="display-1-bold text-white-100">
          Hello {session?.user?.name},
        </div>
        <div>
          <p className="paragraph-1-regular">
            Time to jot down your latest learnings today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
