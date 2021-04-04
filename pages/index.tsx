import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";
import { EffectCallback, useEffect, useState } from "react";
import { GetStaticProps } from "next";

function HomePage(props) {
  const [featuredEvents, setFeaturedEvents] = useState(props.featuredEvents);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch(
        "https://netjs-course-default-rtdb.firebaseio.com/events.json"
      );
      const data = await response.json();
      let updatedEvents = [];
      for (let key in data) {
        updatedEvents.push({ ...data[key], id: key });
      }

      setFeaturedEvents(updatedEvents);
    }

    fetchEvents();
  }, []);

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch(
    "https://netjs-course-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  let updatedEvents = [];
  for (let key in data) {
    updatedEvents.push({ ...data[key], id: key });
  }
  return {
    props: {
      featuredEvents: updatedEvents,
    },
  };
};

export default HomePage;
