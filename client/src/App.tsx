import { Routes } from "./routes";
import Layout from "./components/Layout";
// import { useAuth } from "./store/authSlice";

function App() {
  // const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100">
      <Layout>
        <Routes />
      </Layout>
    </div>
  );
}

export default App;
