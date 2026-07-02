import { BrowserRouter, Routes, Route, Navigate, useOutletContext } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Customers from "./pages/Customers.jsx";
import Meters from "./pages/Meters.jsx";
import Bills from "./pages/Bills.jsx";

// Wrapper to pass searchQuery from Layout outlet context to each page
function WithSearch(Component) {
  return function WrappedPage() {
    const ctx = useOutletContext() || {};
    return <Component searchQuery={ctx.searchQuery || ""} />;
  };
}

const CustomersPage = WithSearch(Customers);
const MetersPage = WithSearch(Meters);
const BillsPage = WithSearch(Bills);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { borderRadius: "10px", background: "#101a2e", color: "#f1f5f9", fontSize: "13px", border: "1px solid rgba(255,255,255,0.08)" },
            success: { iconTheme: { primary: "#f59e0b", secondary: "#0b1220" } },
            error: { iconTheme: { primary: "#ef4444", secondary: "#f1f5f9" } },
          }}
        />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Protected — all inside Layout */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/meters" element={<MetersPage />} />
            <Route path="/bills" element={<BillsPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
