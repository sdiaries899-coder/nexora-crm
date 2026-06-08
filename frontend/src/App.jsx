import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      {/* Toast Notifications */}
      <Toaster />

      {/* Routes */}
      <AppRoutes />
    </>
  );
};

export default App;