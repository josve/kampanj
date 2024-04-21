'use client';

import { useEffect, useState } from 'react';

import { updateEvent } from '@/app/actions';
import { Input, Switch, Button } from 'antd';

interface Args {
  locale: string;
  translations: Record<string, string>;
  event: any;
}

const EditDialog: FunctionComponent<Args> = async ({
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
  };

  return (
    <>
      <div className="edit-event">
        <Input
          placeholder={translations['name']}
          value={event.name}
          onChange={(e) => updateName(e.target.value)}
        />
        <Input
          placeholder={translations['location']}
          value={event.location}
          onChange={(e) => updateLocation(e.target.value)}
        />
        <Switch
          checked={event.published}
          onChange={(checked) => updatePublished(checked)}
        />
        <Button onClick={callServerEvent}>{translations['save']}</Button>
      </div>
    </>
  );
};

export default EditDialog;
