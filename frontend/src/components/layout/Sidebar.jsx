import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass =
    "block px-4 py-2 rounded hover:bg-zinc-800 text-sm";

  const activeClass = "bg-zinc-800";

  return (
    <div className="w-56 bg-zinc-900 p-4 flex flex-col gap-2">
      <h2 className="text-lg font-semibold mb-4">CRM</h2>

      <NavLink
        to="/"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/board"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }
      >
        Board
      </NavLink>

      <NavLink
        to="/users"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }
      >
        Users
      </NavLink>

      <NavLink
        to="/admin"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }
      >
        Admin
      </NavLink>

      <NavLink
        to="/companies"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }
      >
        Companies
      </NavLink>

      <NavLink
        to="/stages"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }
      >
        Stages
      </NavLink>

      <NavLink
        to="/files"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }
      >
        Files
      </NavLink>

      <NavLink
        to="/rejections"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }
      >
        Rejections
      </NavLink>

      <NavLink
        to="/import-export"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : ""}`
        }
      >
        Import/Export
      </NavLink>
    </div>
  );
};

export default Sidebar;