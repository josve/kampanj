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
import { updateDescription, updateInstruction } from '@/app/actions';
import EditSection from '@/components/EditSection';
import dayjs from 'dayjs';
import EventJoinButton from '@/components/EventJoinButton'; // Adjust the import path as necessary

interface PageProps {
  params: {
    eventId: string;
    locale: string;
  };
}

export default async function Page({ params: { eventId, locale } }: PageProps) {
  dayjs.locale(locale);

  const db = await connectToDatabase();
  const event = await db
    .collection('events')
    .findOne({ _id: new ObjectId(eventId) });

  const formattedDate = dayjs(event.date).format('YYYY-MM-DD');
  const formattedStartTime = dayjs(event.startTime, 'HH:mm:ss').format('HH.mm');
  const formattedEndTime = dayjs(event.endTime, 'HH:mm:ss').format('HH.mm');

  const getEventData = {
    title: event.name,
    subtitle: `${event.location}, ${formattedDate}, ${formattedStartTime}-${formattedEndTime}`,
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
          {session && <EditSection locale={locale} event={event} />}
          <EventJoinButton
            eventId={event._id.toString()}
            facebookLink={event.facebook}
          />
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

          {session && (
            <>
              <SectionHeader
                imagePath="/images/icon_event_white.png"
                translations={dictionary['Registered']}
              />
              <SectionContent>
                <table>
                  <thead>
                    <tr>
                      <th>Namn</th>
                      <th>Email</th>
                      <th>Telefon</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.participants.map((participant, index) => (
                      <tr key={index}>
                        <td>{participant.name}</td>
                        <td>{participant.email}</td>
                        <td>{participant.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </SectionContent>
            </>
          )}

          <SectionHeader
            imagePath="/images/icon_instruction_white.png"
            translations={instructions}
          >
            {session && (
              <EditMarkdown
                content={event.instruction}
                id={event._id.toString()}
                action={updateInstruction}
              ></EditMarkdown>
            )}
          </SectionHeader>
          <SectionContent>
            <ReactMarkdown>{event.instruction}</ReactMarkdown>
          </SectionContent>
        </>
      )}
    </>
  );
}
