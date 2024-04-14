import { FunctionComponent } from 'react';
import Link from 'next/link';
import connectToDatabase from '../../../../db';
import EventWidget from '@/components/EventWidget';
import { ObjectId } from 'mongodb';
import Header from '@/components/Header';
import Section from '@/components/Section';
import ReactMarkdown from 'react-markdown';
import { getDictionary } from '@/app/languages';
import { authOptions } from '@/utils/authConfig';
import { getServerSession } from 'next-auth';

export default async function Page({ params: { eventId, locale } }) {
  const db = await connectToDatabase();
  const event = await db
    .collection('events')
    .findOne({ _id: new ObjectId(eventId) });

  const getEventData = {
    title: event.name,
    subtitle: `${event.location}, ${event.date}`,
  };

  const dictionary = await getDictionary(locale);

  const eventDescription = dictionary['EventDescription'];

  const eventOccations = dictionary['EventOccations'];
  const instructions = dictionary['Instructions'];

  const session = await getServerSession(authOptions);

  return (
    <>
      {event && (
        <>
          <Header translations={getEventData} locale={locale}></Header>
          <Section
            imagePath="/images/icon_event_white.png"
            translations={eventDescription}
          >
            <ReactMarkdown>{event.description}</ReactMarkdown>
          </Section>
          <Section
            imagePath="/images/icon_registration_white.png"
            translations={eventOccations}
          >
            <span className="help-text">
              {eventOccations['description_text']}
            </span>
          </Section>
          <Section
            imagePath="/images/icon_instruction_white.png"
            translations={instructions}
          >
            <ReactMarkdown>{event.instructions}</ReactMarkdown>
          </Section>
        </>
      )}
    </>
  );
}
