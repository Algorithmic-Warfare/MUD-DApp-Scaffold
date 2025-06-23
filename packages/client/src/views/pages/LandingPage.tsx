import React from "react";
import TaskDashboard from "../layouts/TaskDashboardLayout";
import { SyncLoader } from "@/components/mud/SyncLoader";
import { useMud } from "@/providers/mud";

const LandingPage: React.FC = () => {
  const {
    sync: { syncedAtLeastOnce },
  } = useMud();

  return <>{!syncedAtLeastOnce ? <SyncLoader /> : <TaskDashboard />}</>;
};

export default React.memo(LandingPage);
