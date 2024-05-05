'use client';
import React, { useState } from 'react';
import { Modal, Button, Form, Input, Row, Col } from 'antd';
import { UserAddOutlined, FacebookOutlined } from '@ant-design/icons'; // Importing an icon
import { joinEvent } from '@/app/actions';

interface EventJoinButtonProps {
  eventId: string;
  facebookLink?: string;
}

const EventJoinButton: React.FC<EventJoinButtonProps> = ({
  eventId,
  facebookLink,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // State to track registration

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (!name) {
      return;
    }
    joinEvent(eventId, name, email, phone);
    setIsModalVisible(false);
    setIsRegistered(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Row gutter={16} justify="center" style={{ paddingTop: '20px' }}>
      <Col>
        {isRegistered ? (
          <div style={{ fontSize: '24px', color: '#4CAF50' }}>Tack!</div>
        ) : (
          <>
            <Button
              type="primary"
              size="large"
              className="join-button"
              icon={<UserAddOutlined />}
              onClick={showModal}
            >
              Jag kommer!
            </Button>
          </>
        )}
        <Modal
          title="Join Event"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Avbryt
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Jag kommer
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item
              label="Namn"
              name="name"
              rules={[
                { required: true, message: 'Du behöver skriva ett namn.' },
              ]}
            >
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Epost (frivilligt)" name="email">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Telefonnummer (frivilligt)" name="phone">
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Item>
          </Form>
        </Modal>
      </Col>
      {facebookLink && (
        <Col>
          <Button
            type="link"
            href={facebookLink}
            target="_blank"
            icon={<FacebookOutlined />}
            style={{ color: '#4267B2' }}
          >
            Event
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default EventJoinButton;
