"use client";
import { parseISO, format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { useState, useEffect } from "react";

const EventDetailledView = ({ event, isEventLoaded }) => {
  useEffect(() => {
    if (event?.requests) {
      const newUniqueFilterValues = {
        type_of_content: getUniqueFilterValues("type_of_content"),
        support: getUniqueFilterValues("support"),
        topic: getUniqueFilterValues("topic"),
        target: getUniqueFilterValues("target"),
      };
      setUniqueFilterValues(newUniqueFilterValues);
    }
  }, [event?.requests]);

  // État pour contrôler si les filtres sont affichés ou non
  const [showFilters, setShowFilters] = useState(false);

  const start_date = event?.start_date ? parseISO(event.start_date) : null;
  const end_date = event?.end_date ? parseISO(event.end_date) : null;
  const formattedStartDate = start_date
    ? format(start_date, "dd/MM/yyyy", { locale: fr })
    : "N/A";
  const formattedEndDate = end_date
    ? format(end_date, "dd/MM/yyyy", { locale: fr })
    : "N/A";

  const links = [
    {
      name: "Accéder au back office",
      href: `https://app.eventmaker.io/?locale=fr&redirected_event_id=${event?._id}`,
    },
    {
      name: "Accéder au site de l'évènement",
      href: `https://${event?.website_domain_name}`,
    },
  ];
  const stats = [
    { name: "Date de début", value: formattedStartDate },
    { name: "Date de fin", value: formattedEndDate },
  ];
  const data = [
    { name: "Type d'évènement", value: event?.type_of_event },
    { name: "Public", value: event?.public_type },
    { name: "Thématiques", value: event?.thematics },
  ];

  const [filters, setFilters] = useState({
    type_of_content: "",
    support: "",
    topic: "",
    target: "",
  });

  const [uniqueFilterValues, setUniqueFilterValues] = useState({
    type_of_content: [],
    support: [],
    topic: [],
    target: [],
  });
  const filterConfigurations = [
    { key: "type_of_content", label: "Tous les contenus" },
    { key: "support", label: "Tous les supports" },
    { key: "target", label: "Toutes les cibles" },
    { key: "topic", label: "Tous les objets" },
    // Ajoutez d'autres filtres ici
  ];

  const resetFilters = () => {
    setFilters({
      type_of_content: "",
      support: "",
      topic: "",
      target: "",
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const getUniqueFilterValues = (filterKey) => {
    const values = event?.requests?.map((request) => request[filterKey]) || [];
    return [...new Set(values)];
  };

  const filteredRequests = Object.keys(filters).reduce(
    (filteredRequests, filterKey) => {
      const filterValue = filters[filterKey];
      if (filterValue) {
        return filteredRequests.filter(
          (request) => request[filterKey] === filterValue
        );
      }
      return filteredRequests;
    },
    event?.requests || []
  );

  // Fonction pour vérifier si au moins un filtre est sélectionné
  const isFilterSelected = () => {
    return Object.values(filters).some((value) => value !== "");
  };
  return (
    <div className="relative isolate w-full  glassmorphism mb-10 overflow-hidden bg-gray-900 py-24 sm:py-12">
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-3 lg:px-3">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            <span className="green_gradient">{event?.title} </span>
            <br />
            <span className="black_gradient text-2xl">{event?.organizer}</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-500">
            {event?.description}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-gray-800 sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href} target="_blank">
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>

          <dl className="mt-6 grid grid-cols-1 card_container gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
            <h2 className="text-2xl font-bold text-center tracking-tight text-black sm:text-3xl">
              <span className="blue_gradient"> Les informations </span>
              de votre évènement
            </h2>

            {!event?.type_of_event ? (
              <Link
                className=" prompt_cta_card text-center"
                href={`/event/${event?._id}/edit`}
              >
                <span className=" cta_text p-1 ">
                  Ajouter les informations de mon évènement{" "}
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ) : (
              <Link
                className=" prompt_cta_card text-center"
                href={`/event/${event?._id}/edit`}
              >
                <span className=" cta_text p-1 ">
                  Modifier les informations de mon évènement{" "}
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            )}
            {event?.type_of_event &&
              data.map((stat) => (
                <div key={stat.name} className="flex card flex-col-reverse">
                  <dt className="text-base leading-7 text-gray-500">
                    {stat.name}
                  </dt>
                  <dd className="text-2xl font-bold leading-9 tracking-tight text-gray-800">
                    {stat.value}
                  </dd>
                </div>
              ))}
            {/* partie générer mon contenu par catégorie */}
            {event?.categories && (
              <div className="card_container">
                <h3 className="text-2xl font-bold text-center tracking-tight text-black sm:text-3xl">
                  Générer vos contenus{" "}
                  <span className="red_gradient">par catégories</span>
                </h3>
                {!event?.retroplannings ? (
                  <Link
                    className=" prompt_cta_card text-center"
                    href={`/event/${event?._id}/retroplanning`}
                  >
                    <span className=" cta_text p-1 ">
                      Créer mes contenus{" "}
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  </Link>
                ) : (
                  <Link
                    className=" prompt_cta_card text-center"
                    href={`/event/${event?._id}/retroplanning`}
                  >
                    <span className=" cta_text p-1 ">
                      Consulter mes contenus{" "}
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  </Link>
                )}
                {/* <div className="card_container">
                {event?.categories &&
                  event?.categories?.filter(stat => stat.selected === true).map((stat) => (
                    <div key={stat.name} className="flex card flex-col-reverse">
                      <dt className="text-base leading-7 text-gray-500">
                        {stat.population}
                      </dt>
                      <dd className="text-2xl font-bold leading-9 tracking-tight text-gray-800">
                        {stat.name}
                      </dd>
                    </div>
                  ))}</div> */}
              </div>
            )}
            {/* partie générer mon contenu individuel */}
            {event?.type_of_event && (
              <div className="card_container">
                <h3 className="text-2xl font-bold text-center tracking-tight text-black sm:text-3xl">
                  <span className="orange_gradient">Les contenus générés </span>
                  pour votre évènement
                </h3>

                <Link
                  className=" prompt_cta_card text-center"
                  href={`/event/${event?._id}/request/new`}
                >
                  <span className=" cta_text p-1 ">
                    Générer du contenu pour mon évènement{" "}
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
                {event?.requests.length > 0 && (
                  <div className="w-full text-center ">
                    <button
                      onClick={() => setShowFilters(!showFilters)} // Basculer l'affichage des filtres
                      className="text-gray-400"
                    >
                      {showFilters
                        ? "Masquer les filtres"
                        : "Afficher les filtres"}{" "}
                      <span aria-hidden="true">{showFilters ? "↑" : "↓"}</span>
                    </button>
                  </div>
                )}
                {showFilters && (
                  <div className="flex flex-wrap md:flex-nowrap w-full">
                    {filterConfigurations.map((filterConfig) => {
                      const filterKey = filterConfig.key;
                      const filterLabel = filterConfig.label;
                      const filterValues = uniqueFilterValues[filterKey];

                      return (
                        filterValues.length > 0 && (
                          <select
                            key={filterKey}
                            name={filterKey}
                            value={filters[filterKey]}
                            onChange={handleFilterChange}
                            className="select w-full max-w-lg text-sm font-thin md:max-w-xs m-2"
                          >
                            <option className="text-sm " value="">
                              {filterLabel}
                            </option>
                            {filterValues.map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        )
                      );
                    })}
                    {isFilterSelected() && (
                      <div className="text-center w-full">
                        <button
                          onClick={resetFilters}
                          className="text-center  w-10/12 outline_btn mx-auto mt-1"
                        >
                          Réinitialiser les filtres
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {event.requests &&
                  event.requests !== undefined &&
                  filteredRequests.map((request) => (
                    <Link
                      key={request._id}
                      className="flex text-center card flex-col"
                      href={`/event/${event._id}/request/${request._id}`}
                    >
                      <dd className="text-base tracking-tight text-gray-800">
                        <span className="inline-flex items-center mb-2 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                          {request.topic}
                        </span>{" "}
                        <span className="inline-flex items-center mb-2 rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-700/10">
                          {request.tone}
                        </span>
                        <br />
                        Retrouvez votre{" "}
                        <span className="text-2xl font-bold tracking-tight green_gradient">
                          {request.type_of_content}
                        </span>
                      </dd>
                      <dd className="text-base tracking-tight text-gray-800">
                        pour votre{" "}
                        <span className="text-2xl font-bold tracking-tight blue_gradient">
                          {request.support}
                        </span>
                      </dd>
                      <dd className="text-base tracking-tight text-gray-800">
                        à destination de vos{" "}
                        <span className="text-2xl font-bold tracking-tight black_gradient">
                          {request.target}
                        </span>
                      </dd>
                    </Link>
                  ))}
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default EventDetailledView;
