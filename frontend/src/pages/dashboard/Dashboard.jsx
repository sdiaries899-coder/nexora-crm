import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { getDashboard } from "../../services/dashboard.service";
import { showError } from "../../utils/toast";
import Loader from "../../components/common/Loader";
import Stats from "./Stats";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getDashboard();
      setData(res.data);
    } catch (err) {
      showError(err?.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout title="Dashboard">
      <div className="p-6">
        {loading ? (
          <Loader />
        ) : data ? (
          <Stats stats={data} />
        ) : (
          <div className="text-gray-400">No data available</div>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;