import Link from 'next/link';

interface Args {
  event: {
    _id: string;
    name: string;
    date: string;
    location: string;
    published: boolean;
  };
  locale: string;
  translations: Record<string, string>;
}

const EventWidget = ({ event, locale, translations }: Args) => (
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
        <p>{event.date}</p>
        <p>{event.location}</p>
      </div>
    </div>
  </Link>
);

export default EventWidget;
