// src/pages/EditClient.jsx
import { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getClientById, updateClient } from '../api/client';

const EditClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Instanciar el hook useNavigate


  useEffect(() => {
    const fetchClient = async () => {
      try {
        const data = await getClientById(id);
        setClient(data);
      } catch  {
        message.error('Error al cargar el cliente');
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateClient(id, values);
      message.success('Cliente actualizado exitosamente');
      navigate("/client"); // Redirigir a la página de administración

    } catch  {
      message.error('Error al actualizar el cliente');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Editar Cliente</h2>
      <Form onFinish={onFinish} layout="vertical" initialValues={client}>
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Correo Electrónico"
          name="email"
          rules={[{ required: true, message: 'Por favor ingresa el correo' }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Actualizar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditClient;
