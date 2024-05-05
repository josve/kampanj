import { FunctionComponent } from 'react';
import Section from './Section';
import Link from 'next/link';
import connectToDatabase from '../db';
import EventWidget from './EventWidget';
import { getDictionary } from '@/app/languages';
import { authOptions } from '@/utils/authConfig';
import { getServerSession } from 'next-auth';
import AddEventButton from '@/components/AddEventButton'; // Import the new component

interface Args {
  locale: string;
}

export default async function CurrentSection({ locale }: Args) {
  const dictionary = await getDictionary(locale);

  const w = dictionary['Current'];

  const session = await getServerSession(authOptions);
  const isAdmin = !!session;
  const query = isAdmin ? {} : { published: true }; // Conditional query based on the session variable
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  const db = await connectToDatabase();
  const events = await db
    .collection('events')
    .find({
      ...query,
      date: { $gte: currentDate },
    })
    .sort({ date: 1, startTime: 1 })
    .toArray();

  const groupedEvents = events.reduce((groups, event) => {
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(currentDate.getDate() + 1);

    let dateLabel = '';
    if (eventDate.toDateString() === currentDate.toDateString()) {
      dateLabel = 'Idag';
    } else if (eventDate.toDateString() === tomorrow.toDateString()) {
      dateLabel = 'Imorgon';
    } else {
      dateLabel = eventDate.toLocaleDateString('sv-SE', {
        day: 'numeric',
        month: 'short',
        weekday: 'short',
      });
    }

    if (!groups[dateLabel]) {
      groups[dateLabel] = [];
    }
    groups[dateLabel].push(event);
    return groups;
  }, {});

  return (
    <Section translations={w} imagePath="/images/icon_event_white.png">
      {isAdmin && <AddEventButton />}
      <span className="help-text">{w['description_text']}</span>
      {Object.entries(groupedEvents).map(([dateLabel, events]) => (
        <div key={dateLabel}>
          <h2>{dateLabel}</h2>
          {events.map((event) => (
            <EventWidget
              locale={locale}
              key={event._id}
              event={event}
              translations={w}
            />
          ))}
        </div>
      ))}
    </Section>
  );
}
