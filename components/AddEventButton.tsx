'use client';
import React, { useState } from 'react';
import { Button, Modal, Form, Input, Col, Row, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addEvent } from '@/app/actions';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';

const AddEventButton: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  dayjs.locale('sv');

  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState(() => dayjs(new Date()));

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    addEvent(eventName, date.toISOString());
    setIsModalVisible(false);
    setEventName('');
    window.location.reload(); // Reload the page after adding an event
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEventName(''); // Reset the input field on cancel
  };

  return (
    <>
      <Col>
        <Row>
          <Button
            color="rgb(246, 228, 0)"
            type="primary"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            Ny aktivitet
          </Button>
        </Row>
      </Col>
      <Modal
        title="Lägg till ny aktivitet"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Namn" required>
            <Input
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <Form.Item label="Datum">
              <DatePicker
                value={date}
                onChange={(date) => setDate(dayjs(date))}
              />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddEventButton;
