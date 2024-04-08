import { FunctionComponent } from 'react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import connectToDatabase from '../../../../db';
import EventWidget from '@/components/EventWidget';
import { ObjectId } from 'mongodb';
import Header from '@/components/Header';
import Section from '@/components/Section';
import ReactMarkdown from 'react-markdown';

export default async function Page({ params: { eventId } }) {
  const db = await connectToDatabase();
  const event = await db
    .collection('events')
    .findOne({ _id: new ObjectId(eventId) });

  const getEventData = (key: string) => {
    if (key === 'title') {
      return event.name;
    } else if (key === 'subtitle') {
      return `${event.location}, ${event.date}`;
    }
  };

  const eventDescription = await getTranslations('EventDescription');

  const eventOccations = await getTranslations('EventOccations');
  const instructions = await getTranslations('Instructions');

  return (
    <>
      {event && (
        <>
          <Header translations={getEventData}></Header>
          <Section
            imagePath="/icon_event_white.png"
            translations={eventDescription}
          >
            <ReactMarkdown>{event.description}</ReactMarkdown>
          </Section>
          <Section
            imagePath="/icon_registration_white.png"
            translations={eventOccations}
          >
            <span className="help-text">
              {eventOccations('description_text')}
            </span>
          </Section>
          <Section
            imagePath="/icon_instruction_white.png"
            translations={instructions}
          >
            <ReactMarkdown>{event.instructions}</ReactMarkdown>
          </Section>
        </>
      )}
    </>
  );
}
