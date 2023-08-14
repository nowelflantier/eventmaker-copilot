"use client";

import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { useSession } from "next-auth/react";
import { useUser } from "@utils/UserContext";
import { fetchDataFromServer } from "./FetchEvents";

const EventCardList = ({ events, areEventsLoaded, fetchEvents }) => {
  return areEventsLoaded ? (
    <div className="prompt_layout">
    {events.map((event) => <EventCard event={event} key={event._id} />)}</div>
  ) : (
    <button onClick={fetchEvents} className="black_btn mt-5 mx-auto">
      Charger mes évènements
    </button>
  );
};
const Feed = () => {
  const { token, user, events, setEvents } = useUser();
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState("");
  const [areEventsLoaded, setAreEventsLoaded] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);


  const fetchEvents = async () => {
    const fetchedEvents = await fetchDataFromServer(user.token);
    setEvents(fetchedEvents);
    setAreEventsLoaded(true);
  };

  useEffect(() => {
    {
      user && fetchEvents();
    }
  }, [user]);

  const filterEvents = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return events.filter(
      (item) =>
        regex.test(item.title) ||
        regex.test(item.organizer) ||
        regex.test(item.website_domain_name)
    );
  };
  const handleSearchChange = (e) => {
    e.preventDefault();
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterEvents(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  // const handleTagClick = (tagName) => {
  //   setSearchText(tagName);

  //   const searchResult = filterPrompts(tagName);
  //   setSearchedResults(searchResult);
  // };

  return (
    session?.user &&
    user?.token && (
      <section className="feed">
        <h2 className="font-bold text-xl ">
          <span className="green_gradient text-center">Vos évènements</span>
        </h2>

        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Rechercher un évènement"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer mb-10"
          />
        </form>
        {searchText
          ? <EventCardList events={searchedResults} fetchEvents={fetchEvents} areEventsLoaded={areEventsLoaded} />
          : <EventCardList events={events} fetchEvents={fetchEvents} areEventsLoaded={areEventsLoaded} />}
            
      </section>
    )
  );
};

export default Feed;
