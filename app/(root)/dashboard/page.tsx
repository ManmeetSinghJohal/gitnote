import React, { Suspense } from "react";

import Dashboard from "@/components/dashboard";
export const dynamic = "force-dynamic";

const DashboardPage = () => {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
};

export default DashboardPage;
