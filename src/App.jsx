import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Settings from "./pages/Settings";

function App() {
  const [page, setPage] = useState(
    window.location.hash === "#settings" ? "settings" : "login"
  );

  useEffect(() => {
    const handleHashChange = () => {
      setPage(window.location.hash === "#settings" ? "settings" : "login");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return page === "settings" ? <Settings /> : <Login />;
}

export default App;