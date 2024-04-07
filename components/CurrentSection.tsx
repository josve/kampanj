import { FunctionComponent } from 'react';
import { useTranslations } from 'next-intl';
import Section from './Section';
import Link from 'next/link';
import connectToDatabase from '../db'
import EventWidget from './EventWidget';

export default async function CurrentSection({ locale }) {
  const w = useTranslations('Current');

  const db = await connectToDatabase();
  const events = await db.collection('events').find({}).toArray();
    
  return (
    <Section translations={w} imagePath="/icon_event_white.png" >
    <span className="help-text">
        {w('description_text')}
    </span>
    {events.map((event) => (
        <EventWidget locale={locale} key={event._id} event={event} />
      ))}
    </Section>
  );
};
