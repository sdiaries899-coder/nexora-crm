import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/layout/ProtectedRoute";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyLogin from "../pages/auth/VerifyLogin";
import VerifyRegister from "../pages/auth/VerifyRegister";

// Main Pages
import Dashboard from "../pages/dashboard/Dashboard";
import Board from "../pages/cards/Board";
import CardDetails from "../pages/cards/CardDetails";
import Users from "../pages/users/Users";
import AdminPanel from "../pages/admin/AdminPanel";
import Company from "../pages/company/Company";
import Stage from "../pages/stage/Stage";
import FileManager from "../pages/files/FileManager";
import Rejected from "../pages/rejection/Rejected";
import ImportExport from "../pages/importExport/ImportExport";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-login" element={<VerifyLogin />} />
      <Route path="/verify-register" element={<VerifyRegister />} />

      {/* Protected */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/board"
        element={
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        }
      />

      <Route
        path="/card/:id"
        element={
          <ProtectedRoute>
            <CardDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      <Route
        path="/companies"
        element={
          <ProtectedRoute>
            <Company />
          </ProtectedRoute>
        }
      />

      <Route
        path="/stages"
        element={
          <ProtectedRoute>
            <Stage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/files"
        element={
          <ProtectedRoute>
            <FileManager />
          </ProtectedRoute>
        }
      />

      <Route
        path="/rejections"
        element={
          <ProtectedRoute>
            <Rejected />
          </ProtectedRoute>
        }
      />

      <Route
        path="/import-export"
        element={
          <ProtectedRoute>
            <ImportExport />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;