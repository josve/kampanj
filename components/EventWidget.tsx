import Link from 'next/link';
import dayjs from 'dayjs';

interface Args {
  event: {
    _id: string;
    name: string;
    date: string; // Assume date includes full ISO string or similar
    startTime: string; // Assuming startTime and endTime are part of the event object
    endTime: string;
    location: string;
    published: boolean;
  };
  locale: string;
  translations: Record<string, string>;
}

const EventWidget = ({ event, locale, translations }: Args) => {
  dayjs.locale(locale);

  // Format date and times
  const formattedDate = dayjs(event.date).format('YYYY-MM-DD');
  const formattedStartTime = dayjs(event.startTime, 'HH:mm:ss').format('HH.mm');
  const formattedEndTime = dayjs(event.endTime, 'HH:mm:ss').format('HH.mm');

  return (
    <Link href={`/${locale}/event/${event._id}`} className="event-widget">
      <div
        className="shift-box"
        title="Click for more information or to register for this event."
      >
        {!event.published && (
          <div className="draft-label">{translations['draft']}</div>
        )}
        <div className="event-list-title">
          <img
            src="/images/icon_event_black.png"
            className="event-list-icon"
          ></img>
          {event.name}
        </div>
        <div className="event-list-description">
          <p>{`${formattedDate}, ${formattedStartTime}-${formattedEndTime}`}</p>
          <p>{event.location}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventWidget;
