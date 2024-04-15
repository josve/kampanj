import { FunctionComponent } from 'react';
import Section from './Section';
import Link from 'next/link';
import connectToDatabase from '../db';
import EventWidget from './EventWidget';
import { getDictionary } from '@/app/languages';

interface Args {
  locale: string;
}

export default async function CurrentSection({ locale }: Args) {
  const dictionary = await getDictionary(locale);

  const w = dictionary['Current'];

  const db = await connectToDatabase();
  const events = await db.collection('events').find({}).toArray();

  return (
    <Section translations={w} imagePath="/images/icon_event_white.png">
      <span className="help-text">{w['description_text']}</span>
      {events.map((event) => (
        <EventWidget locale={locale} key={event._id} event={event} />
      ))}
    </Section>
  );
}
