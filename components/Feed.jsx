"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";
import { useUser } from "@utils/UserContext";
import { fetchDataFromServer } from "./FetchEvents";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const { token, user, events, setEvents } = useUser();
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState("");
  const [areEventsLoaded, setAreEventsLoaded] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [posts, setPosts] = useState([]);

  const handleLoadEventsClick = async () => {
    const fetchedEvents = await fetchDataFromServer( user.token );
    setEvents(fetchedEvents)
    setAreEventsLoaded(true)
  };

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
  const handleSearchChange = (e) => {
    e.preventDefault();
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
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
      <section className="mb-10 feed">
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
          ? true
          : // seached events card list
            // events cards list
            true}
        {areEventsLoaded ? (
          events.map((event) => <div key={event._id}>
            <PromptCard event={event}/>
            </div>)
        ) : (
          <button
            onClick={handleLoadEventsClick}
            className="black_btn mt-5 mx-auto"
          >
            Charger mes évènements
          </button>
        )}
      </section>
    )
  );
};

export default Feed;
