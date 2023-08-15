"use client";

import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { useSession } from "next-auth/react";
import { useUser } from "@utils/UserContext";
import { fetchDataFromServer } from "./FetchEvents";

const EventCardList = ({
  events,
  areEventsLoaded,
  handleAddFavorite,
  fetchEvents,
}) => {
  return areEventsLoaded ? (
    <div className="prompt_layout">
      {events?.map((event) => (
        <EventCard
          event={event}
          key={event._id}
          handleAddFavorite={handleAddFavorite}
        />
      ))}
    </div>
  ) : (
    <button onClick={fetchEvents} className="black_btn mt-5 mx-auto">
      Charger mes évènements
    </button>
  );
};
const Feed = () => {
  const { user, events, setEvents, favoriteEvents, setFavoriteEvents } =
    useUser();
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState("");
  const [areEventsLoaded, setAreEventsLoaded] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchEvents = async () => {
    const fetchedEvents = await fetchDataFromServer(user.token);
    const fetchedUser = await fetch(`/api/users/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setFavoriteEvents(fetchedUser.favoriteEvents);
    setEvents(fetchedEvents);
    setAreEventsLoaded(true);
  };

  const updateUserFavorites = async (action, favoriteEvent) => {
    console.log({ action, favoriteEvent });
    const response = await fetch(`/api/users/${user._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action, // 'add' ou 'remove'
        favoriteEvent, // L'événement à ajouter ou supprimer
      }),
    });
    if (!response.ok) {
      console.error("Erreur du serveur:", response.status, response.statusText);
      const text = await response.text(); // Lire la réponse comme texte si ce n'est pas du JSON
      console.error("Réponse du serveur:", text);
      return;
    }
    const data = await response.json();
    return data;
  };

  const handleAddFavorite = async (event) => {
    const favoriteEvent = {
      title: event.title,
      _id: event._id,
    };
    console.log(favoriteEvent);
    const updatedUser = await updateUserFavorites("add", favoriteEvent);
    console.log(updatedUser);
    setFavoriteEvents(updatedUser.favoriteEvents);
  };

  const handleRemoveFavorite = async (event) => {
    const updatedUser = await updateUserFavorites("remove", event);
    setFavoriteEvents(updatedUser.favoriteEvents);
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
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterEvents(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

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
        {user.favoriteEvents && (
          <EventCardList
            events={favoriteEvents}
            areEventsLoaded={areEventsLoaded}
          />
        )}
        {searchText ? (
          <EventCardList
            events={searchedResults}
            fetchEvents={fetchEvents}
            handleAddFavorite={handleAddFavorite}
            areEventsLoaded={areEventsLoaded}
          />
        ) : (
          <EventCardList
            events={events}
            fetchEvents={fetchEvents}
            handleAddFavorite={handleAddFavorite}
            areEventsLoaded={areEventsLoaded}
          />
        )}
      </section>
    )
  );
};

export default Feed;
