import useAuth from "../../hooks/useAuth";

const Navbar = ({ title }) => {
  const { user, logout } = useAuth();

  return (
    <div className="h-14 flex items-center justify-between px-6 bg-zinc-900 border-b border-zinc-800">
      <h1 className="text-lg font-semibold">{title}</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">
          {user?.email}
        </span>

        <button
          onClick={logout}
          className="bg-red-600 px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;