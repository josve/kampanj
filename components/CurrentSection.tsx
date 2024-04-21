import { FunctionComponent } from 'react';
import Section from './Section';
import Link from 'next/link';
import connectToDatabase from '../db';
import EventWidget from './EventWidget';
import { getDictionary } from '@/app/languages';
import { authOptions } from '@/utils/authConfig';
import { getServerSession } from 'next-auth';

interface Args {
  locale: string;
}

export default async function CurrentSection({ locale }: Args) {
  const dictionary = await getDictionary(locale);

  const w = dictionary['Current'];

  const session = await getServerSession(authOptions);
  const isAdmin = !!session;
  const query = isAdmin ? {} : { published: true }; // Conditional query based on the session variable

  const db = await connectToDatabase();
  const events = await db.collection('events').find(query).toArray();

  return (
    <Section translations={w} imagePath="/images/icon_event_white.png">
      <span className="help-text">{w['description_text']}</span>
      {events.map((event) => (
        <EventWidget
          locale={locale}
          key={event._id}
          event={event}
          translations={w}
        />
      ))}
    </Section>
  );
}
