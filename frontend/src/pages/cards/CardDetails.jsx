import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import {
  getComments,
  addComment,
} from "../../services/comment.service";
import { showError, showSuccess } from "../../utils/toast";
import Loader from "../../components/common/Loader";

const CardDetails = () => {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getComments(id);
      setComments(res.data || []);
    } catch (err) {
      showError(err?.response?.data?.message || "Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const handleAdd = async () => {
    if (!text) return showError("Comment required");

    try {
      await addComment(id, { text });
      showSuccess("Comment added");
      setText("");
      fetchData();
    } catch (err) {
      showError(err?.response?.data?.message || "Failed to add comment");
    }
  };

  return (
    <MainLayout title="Card Details">
      <div className="p-6 space-y-6">
        {/* Add Comment */}
        <div className="bg-zinc-900 p-4 rounded-xl space-y-3">
          <textarea
            placeholder="Write comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800"
          />

          <button
            onClick={handleAdd}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Add Comment
          </button>
        </div>

        {/* Comments */}
        {loading ? (
          <Loader />
        ) : comments.length === 0 ? (
          <div className="text-gray-400">No comments yet</div>
        ) : (
          <div className="space-y-3">
            {comments.map((c) => (
              <div
                key={c.id}
                className="bg-zinc-900 p-4 rounded-xl"
              >
                <p>{c.text}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {c.user?.email}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CardDetails;