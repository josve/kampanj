'use client';

import { useEffect, useState } from 'react';

import { updateEvent } from '@/app/actions';
import { Form, Input, Switch, Button, Row, Col } from 'antd';

interface Args {
  locale: string;
  translations: Record<string, string>;
  event: any;
}

const EditDialog: FunctionComponent<Args> = ({
  locale,
  translations,
  event,
}: Args) => {
  // Create react state for name, location and published, and set the initial values to the event object
  const [name, setName] = useState(event.name || '');
  const [location, setLocation] = useState(event.location || '');
  const [published, setPublished] = useState(event.published || false);

  // Three functions for updating the state of the name, location and published from onChange handlers.
  const updateName = (name: string) => {
    setName(name);
  };

  const updateLocation = (location: string) => {
    setLocation(location);
  };

  const updatePublished = (published: boolean) => {
    setPublished(published);
  };

  // Call server function updateEvent which takes the event _id and the new name, location and published values. Call the function when the submit button is clicked.
  const callServerEvent = () => {
    updateEvent(event._id, name, location, published);
    window.location.reload();
  };

  return (
    <>
      <div className="edit-event">
        <Form layout="vertical" className="edit-event">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={translations['name']} required>
                <Input
                  placeholder={translations['name']}
                  value={name}
                  onChange={(e) => updateName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={translations['location']} required>
                <Input
                  placeholder={translations['location']}
                  value={location}
                  onChange={(e) => updateLocation(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label={translations['published']}
                valuePropName="checked"
              >
                <Switch
                  checked={published}
                  onChange={(checked) => updatePublished(checked)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={callServerEvent}>
                {translations['save']}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default EditDialog;
