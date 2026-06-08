import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import {
  getCompanies,
  createCompany,
} from "../../services/company.service";
import { showError, showSuccess } from "../../utils/toast";
import Loader from "../../components/common/Loader";

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getCompanies();
      setCompanies(res.data || []);
    } catch (err) {
      showError(err?.response?.data?.message || "Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    if (!name) return showError("Company name is required");

    try {
      await createCompany({ name });
      showSuccess("Company created");
      setName("");
      fetchData();
    } catch (err) {
      showError(err?.response?.data?.message || "Creation failed");
    }
  };

  return (
    <MainLayout title="Companies">
      <div className="p-6 space-y-6">
        {/* Create Company */}
        <div className="bg-zinc-900 p-4 rounded-xl space-y-3">
          <input
            type="text"
            placeholder="Enter company name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800"
          />

          <button
            onClick={handleCreate}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Add Company
          </button>
        </div>

        {/* List */}
        {loading ? (
          <Loader />
        ) : companies.length === 0 ? (
          <div className="text-gray-400">No companies found</div>
        ) : (
          <div className="space-y-3">
            {companies.map((c) => (
              <div
                key={c.id}
                className="bg-zinc-900 p-4 rounded-xl"
              >
                {c.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Company;