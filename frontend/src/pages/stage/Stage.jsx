import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import {
  getStages,
  createStage,
} from "../../services/stage.service";
import { showError, showSuccess } from "../../utils/toast";
import Loader from "../../components/common/Loader";

const Stage = () => {
  const [stages, setStages] = useState([]);
  const [name, setName] = useState("");
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getStages();
      setStages(res.data || []);
    } catch (err) {
      showError(err?.response?.data?.message || "Failed to load stages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    if (!name || order === "") {
      return showError("Name and order are required");
    }

    try {
      await createStage({
        name,
        order: Number(order),
      });

      showSuccess("Stage created");
      setName("");
      setOrder("");
      fetchData();
    } catch (err) {
      showError(err?.response?.data?.message || "Creation failed");
    }
  };

  return (
    <MainLayout title="Stages">
      <div className="p-6 space-y-6">
        {/* Create Stage */}
        <div className="bg-zinc-900 p-4 rounded-xl space-y-3">
          <input
            type="text"
            placeholder="Stage name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800"
          />

          <input
            type="number"
            placeholder="Order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800"
          />

          <button
            onClick={handleCreate}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Add Stage
          </button>
        </div>

        {/* List */}
        {loading ? (
          <Loader />
        ) : stages.length === 0 ? (
          <div className="text-gray-400">No stages found</div>
        ) : (
          <div className="space-y-3">
            {stages.map((s) => (
              <div
                key={s.id}
                className="bg-zinc-900 p-4 rounded-xl flex justify-between"
              >
                <span>{s.name}</span>
                <span className="text-gray-400">
                  Order: {s.order}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Stage;