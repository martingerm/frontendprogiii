// src/pages/CreateClient.jsx
import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { createClient } from '../api/client';

const CreateClient = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await createClient(values);
      message.success('Cliente creado exitosamente');
    } catch {
      message.error('Error al crear el cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Crear Cliente</h2>
      <Form onFinish={onFinish} layout="vertical">
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
            Crear
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateClient;
