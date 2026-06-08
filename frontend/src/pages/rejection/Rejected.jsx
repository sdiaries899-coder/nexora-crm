import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { getRejectedCards } from "../../services/rejection.service";
import { showError } from "../../utils/toast";
import Loader from "../../components/common/Loader";

const Rejected = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getRejectedCards();
      setData(res.data || []);
    } catch (err) {
      showError(
        err?.response?.data?.message || "Failed to load rejected cards"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout title="Rejected Cards">
      <div className="p-6">
        {loading ? (
          <Loader />
        ) : data.length === 0 ? (
          <div className="text-gray-400">No rejected cards found</div>
        ) : (
          <div className="space-y-3">
            {data.map((r) => (
              <div
                key={r.id}
                className="bg-zinc-900 p-4 rounded-xl"
              >
                <p className="font-medium">Card ID: {r.cardId}</p>
                <p className="text-sm text-gray-400">
                  Reason: {r.reason}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  By: {r.user?.email}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Rejected;