import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { getUsers } from "../../services/user.service";
import { showError } from "../../utils/toast";
import Loader from "../../components/common/Loader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data || []);
    } catch (err) {
      showError(err?.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout title="Users">
      <div className="p-6">
        {loading ? (
          <Loader />
        ) : users.length === 0 ? (
          <div className="text-gray-400">No users found</div>
        ) : (
          <div className="space-y-3">
            {users.map((u) => (
              <div
                key={u.id}
                className="bg-zinc-900 p-4 rounded-xl flex justify-between"
              >
                <div>
                  <p className="font-medium">{u.email}</p>
                  <p className="text-sm text-gray-400">
                    Role: {u.role}
                  </p>
                </div>

                <div className="text-sm">
                  {u.isVerified ? (
                    <span className="text-green-500">Verified</span>
                  ) : (
                    <span className="text-red-500">Not Verified</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Users;