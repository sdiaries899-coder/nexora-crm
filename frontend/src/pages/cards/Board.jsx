import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { getStages } from "../../services/stage.service";
import { getCards, moveCard, createCard } from "../../services/card.service";
import { showError, showSuccess } from "../../utils/toast";
import Loader from "../../components/common/Loader";

const Board = () => {
  const [stages, setStages] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCard, setNewCard] = useState({ title: "", stageId: "" });

  const fetchData = async () => {
    try {
      const [stageRes, cardRes] = await Promise.all([
        getStages(),
        getCards(),
      ]);

      setStages(stageRes.data || []);
      setCards(cardRes.data?.data || []);
    } catch (err) {
      showError(err?.response?.data?.message || "Failed to load board");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMove = async (cardId, stageId) => {
    try {
      await moveCard(cardId, stageId);
      showSuccess("Card moved");
      fetchData();
    } catch (err) {
      showError(err?.response?.data?.message || "Move failed");
    }
  };

  const handleCreate = async () => {
    if (!newCard.title || !newCard.stageId) {
      return showError("Title and stage required");
    }

    try {
      await createCard(newCard);
      showSuccess("Card created");
      setNewCard({ title: "", stageId: "" });
      fetchData();
    } catch (err) {
      showError(err?.response?.data?.message || "Creation failed");
    }
  };

  return (
    <MainLayout title="Board">
      <div className="p-6 space-y-6">
        {/* Create Card */}
        <div className="bg-zinc-900 p-4 rounded-xl flex gap-3">
          <input
            placeholder="Card title"
            value={newCard.title}
            onChange={(e) =>
              setNewCard((prev) => ({ ...prev, title: e.target.value }))
            }
            className="bg-zinc-800 p-2 rounded w-full"
          />

          <select
            value={newCard.stageId}
            onChange={(e) =>
              setNewCard((prev) => ({ ...prev, stageId: e.target.value }))
            }
            className="bg-zinc-800 p-2 rounded"
          >
            <option value="">Select Stage</option>
            {stages.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleCreate}
            className="bg-blue-600 px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* Board */}
        {loading ? (
          <Loader />
        ) : (
          <div className="flex gap-4 overflow-x-auto">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="bg-zinc-900 p-4 rounded-xl min-w-[250px]"
              >
                <h3 className="mb-3 font-semibold">{stage.name}</h3>

                <div className="space-y-2">
                  {cards
                    .filter((c) => c.stageId === stage.id)
                    .map((card) => (
                      <div
                        key={card.id}
                        className="bg-zinc-800 p-3 rounded"
                      >
                        <p>{card.title}</p>

                        <select
                          value={card.stageId}
                          onChange={(e) =>
                            handleMove(card.id, e.target.value)
                          }
                          className="bg-zinc-700 mt-2 p-1 rounded w-full"
                        >
                          {stages.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Board;