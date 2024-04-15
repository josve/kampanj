import { FunctionComponent } from 'react';
import Link from 'next/link';
import connectToDatabase from '../../../../db';
import EventWidget from '@/components/EventWidget';
import { ObjectId } from 'mongodb';
import Header from '@/components/Header';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import SectionContent from '@/components/SectionContent';
import ReactMarkdown from 'react-markdown';
import { getDictionary } from '@/app/languages';
import { authOptions } from '@/utils/authConfig';
import { getServerSession } from 'next-auth';
import EditMarkdown from '@/components/EditMarkdown';
import { updateDescription } from '@/app/actions';

interface PageProps {
  params: {
    eventId: string;
    locale: string;
  };
}

export default async function Page({ params: { eventId, locale } }: PageProps) {
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
          <SectionHeader
            imagePath="/images/icon_event_white.png"
            translations={eventDescription}
          >
            {session && (
              <EditMarkdown
                content={event.description}
                id={event._id.toString()}
                action={updateDescription}
              ></EditMarkdown>
            )}
          </SectionHeader>
          <SectionContent>
            <ReactMarkdown>{event.description}</ReactMarkdown>
          </SectionContent>
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
