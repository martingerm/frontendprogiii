import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Button } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import AdminPage from "./pages/AdminPage";
import CreateClient from "./pages/CreateClient";
import EditClient from "./pages/EditClient";
import HomePage from "./pages/HomePage";

const { Header, Content } = Layout;




function App() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <Router>
      <Layout>
        <Header>
          {isAuthenticated ? (
            <Button onClick={() => logout({ returnTo: window.location.origin })}>Logout</Button>
          ) : (
            <Button onClick={loginWithRedirect}>Login</Button>
          )}
        </Header>
        <Content>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/client" element={<AdminPage />} />
            <Route path="/client/crear" element={<CreateClient />} />
            <Route path="/client/:id/edit" element={<EditClient />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App
