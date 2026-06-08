import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import {
  getAdminStats,
  updateUserRole,
} from "../../services/admin.service";
import { getUsers } from "../../services/user.service";
import { showError, showSuccess } from "../../utils/toast";
import Loader from "../../components/common/Loader";

const AdminPanel = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([
        getAdminStats(),
        getUsers(),
      ]);

      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      showError(err?.response?.data?.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, role);
      showSuccess("Role updated");
      fetchData();
    } catch (err) {
      showError(err?.response?.data?.message || "Update failed");
    }
  };

  return (
    <MainLayout title="Admin Panel">
      <div className="p-6 space-y-6">
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-zinc-900 p-4 rounded-xl">
                Users: {stats?.totalUsers}
              </div>
              <div className="bg-zinc-900 p-4 rounded-xl">
                Cards: {stats?.totalCards}
              </div>
              <div className="bg-zinc-900 p-4 rounded-xl">
                Companies: {stats?.totalCompanies}
              </div>
              <div className="bg-zinc-900 p-4 rounded-xl">
                Comments: {stats?.totalComments}
              </div>
            </div>

            {/* Users */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Users</h3>

              {users.map((u) => (
                <div
                  key={u.id}
                  className="bg-zinc-900 p-4 rounded-xl flex justify-between items-center"
                >
                  <div>
                    <p>{u.email}</p>
                    <p className="text-sm text-gray-400">
                      Role: {u.role}
                    </p>
                  </div>

                  <select
                    value={u.role}
                    onChange={(e) =>
                      handleRoleChange(u.id, e.target.value)
                    }
                    className="bg-zinc-800 p-2 rounded"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default AdminPanel;