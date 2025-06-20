import React from "react";
import TaskDashboard from "../layouts/TaskDashboardLayout";
import { SyncLoader } from "@/components/mud/SyncLoader";
import { useMUD } from "@/providers/mud";

const LandingPage: React.FC = () => {
  const {
    sync: { syncedAtLeastOnce },
  } = useMUD();

  return <>{!syncedAtLeastOnce ? <SyncLoader /> : <TaskDashboard />}</>;
};

export default React.memo(LandingPage);
