import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Button, Space, message } from "antd";
import { getClients, deleteClient } from "../api/client"; // Asegúrate de importar la API
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

function AdminPage() {
  const { isAuthenticated } = useAuth0();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const data = await getClients();
        setClients(data); // Guardar los datos de clientes
      } catch  {
        message.error("Error al cargar los clientes.");
      }
      setLoading(false);
    };

    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      setClients(clients.filter((client) => client._id !== id));
      message.success("Cliente eliminado correctamente.");
    } catch  {
      message.error("Error al eliminar el cliente.");
    }
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/client/${record._id}/edit`)}
          >
            Editar
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            danger
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Administración de Clientes</h2>
      <Button type="primary" onClick={() => navigate("/client/crear")}>
        Crear Cliente
      </Button>
      <Table
        columns={columns}
        dataSource={clients}
        loading={loading}
        rowKey="_id" // Clave única para cada fila, en este caso, el _id del cliente
        pagination={{ pageSize: 5 }} // Paginación con 5 clientes por página
      />
    </div>
  );
}

export default AdminPage;
