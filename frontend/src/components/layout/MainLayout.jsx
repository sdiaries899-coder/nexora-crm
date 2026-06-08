import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = ({ children, title }) => {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar title={title} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-black">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;