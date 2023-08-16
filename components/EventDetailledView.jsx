import { parseISO, format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";

const EventDetailledView = ({ event, isEventLoaded }) => {
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
    { name: "Type de contenu", value: event?.type_of_content },
    { name: "Thématiques", value: event?.thematics },
  ];

  return (
    <div className="relative isolate w-11/12  glassmorphism mb-10 overflow-hidden bg-gray-900 py-24 sm:py-32">
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
          <dl className="mt-6 grid grid-cols-1 gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="flex prompt_infocard flex-col-reverse"
              >
                <dt className="text-base leading-7 text-gray-500">
                  {stat.name}
                </dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-gray-800">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          
          <dl className="mt-6 grid grid-cols-1 card_container gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          <h2 className="text-2xl font-bold text-center tracking-tight text-white sm:text-6xl">
            <span className="green_gradient">Votre contenu personnalisé </span>
            {/* <br className="leading-3"/> */}
           
          </h2>
          <p className="ext-2xl leading-3 font-bold text-center tracking-tight text-white sm:text-6xl"> <span className="black_gradient text-2xl">pour votre évènement</span></p>
          {!event?.type_of_content ? (
          <Link
            className=" prompt_cta_card text-center"
            href={`/event/${event?._id}/edit`}
          >
            <span className=" cta_text p-1 ">
              Générer les contenus de mon évènement avec Eventmaker Copilot{" "}
              <span aria-hidden="true">&rarr;</span>
            </span>
          </Link>
        ) : (
          <Link
            className=" prompt_cta_card text-center"
            href={`/event/${event?._id}/edit`}
          >
            <span className=" cta_text p-1 ">
              Modifier les informations de votre évènement{" "}
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
          </dl>
        </div>
      </div>
    </div>
  );
};

export default EventDetailledView;
