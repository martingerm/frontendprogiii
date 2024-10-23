// src/pages/HomePage.jsx
import { Button } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom"; // Asegúrate de que esto esté importado

function HomePage() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bienvenido a la aplicación</h1>
      {!isAuthenticated ? (
        <>
          <Button onClick={loginWithRedirect}>Login con Gmail</Button>
          {/* Puedes agregar un botón para login normal si lo deseas */}
          {/* <Button onClick={loginWithRedirect}>Login</Button> */}
        </>
      ) : (
        <Button onClick={() => navigate("/client")}>
          Ir a Administración de Clientes
        </Button>
      )}
    </div>
  );
}

export default HomePage;
