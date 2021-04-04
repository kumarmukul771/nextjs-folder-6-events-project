import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getEventById } from "../../dummy-data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import { getStaticProps } from "..";

function EventDetailPage() {
  const router = useRouter();

  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  const [featuredEvents, setFeaturedEvents] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://netjs-course-default-rtdb.firebaseio.com/events.json"
      );
      const data = await response.json();
      let updatedEvents = data;
      console.log(data);

      setFeaturedEvents(updatedEvents);
    })();
  }, []);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

// export async function getServerSideProps(context){

// }

export default EventDetailPage;
