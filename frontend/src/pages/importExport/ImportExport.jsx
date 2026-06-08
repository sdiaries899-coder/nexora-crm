import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import {
  importData,
  exportData,
} from "../../services/importExport.service";
import { showError, showSuccess } from "../../utils/toast";

const ImportExport = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    if (!file) return showError("Select file first");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await importData(formData);

      showSuccess(res?.data?.message || "Import successful");
      setFile(null);
    } catch (err) {
      showError(err?.response?.data?.message || "Import failed");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setLoading(true);

      const blob = await exportData();

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "crm_data.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      showSuccess("Export successful");
    } catch (err) {
      showError("Export failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout title="Import / Export">
      <div className="p-6 space-y-6">
        {/* Import */}
        <div className="bg-zinc-900 p-4 rounded-xl space-y-4">
          <h3 className="font-semibold">Import Excel</h3>

          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={handleImport}
            disabled={loading}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            {loading ? "Importing..." : "Import"}
          </button>
        </div>

        {/* Export */}
        <div className="bg-zinc-900 p-4 rounded-xl space-y-4">
          <h3 className="font-semibold">Export Excel</h3>

          <button
            onClick={handleExport}
            disabled={loading}
            className="bg-green-600 px-4 py-2 rounded"
          >
            {loading ? "Exporting..." : "Export"}
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ImportExport;