import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { uploadFile } from "../../services/file.service";
import { showError, showSuccess } from "../../utils/toast";

const FileManager = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return showError("Please select a file");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadFile(formData);

      setUrl(res.data?.url);
      showSuccess("File uploaded successfully");
    } catch (err) {
      showError(err?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout title="File Manager">
      <div className="p-6 space-y-6">
        <div className="bg-zinc-900 p-4 rounded-xl space-y-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-white"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </div>

        {url && (
          <div className="bg-zinc-900 p-4 rounded-xl">
            <p className="text-sm text-gray-400 mb-2">Uploaded File:</p>

            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 underline"
            >
              View File
            </a>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default FileManager;