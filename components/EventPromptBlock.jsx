import React from 'react'
import Link from "next/link";
import { useEvent } from '@utils/EventContext';


const EventPromptBlock = ({event}) => {
    // const {event} = useEvent()
    const data = [
        { name: "Type d'évènement", value: event?.type_of_event },
        { name: "Public", value: event?.public_type },
        { name: "Thématiques", value: event?.thematics },
      ];
    
    console.log(event);

  return (
    <dl className="mt-6 grid grid-cols-1 card_container gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
    <h2 className="text-2xl font-bold text-center tracking-tight text-black sm:text-3xl">
      <span className="blue_gradient"> Les informations de </span>
      votre évènement
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
    {event?.type_of_event && (
      <div className="card_container">
        <h3 className="text-2xl font-bold text-center tracking-tight text-black sm:text-3xl">
          <span className="orange_gradient">
            Les contenus générés pour{" "}
          </span>
          votre évènement
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
        {event?.requests &&
          event.requests.map((request) => (
            <div key={request._id} className="flex text-center card flex-col">
              <dd className="text-base tracking-tight text-gray-800">
                Retrouvez votre <span className="text-2xl font-bold tracking-tight green_gradient">{request.type_of_content}</span>
              </dd>
              <dd className="text-base tracking-tight text-gray-800">
                pour votre <span className="text-2xl font-bold tracking-tight blue_gradient">{request.support}</span>
              </dd>
              <dd className="text-base tracking-tight text-gray-800">
              à destination de vos{" "}<span className="text-2xl font-bold tracking-tight black_gradient">{request.target}</span>
              </dd>
            </div>
          ))}
      </div>
    )}
  </dl>
  )
}

export default EventPromptBlock