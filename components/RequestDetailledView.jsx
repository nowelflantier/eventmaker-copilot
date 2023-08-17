"use client";
import { parseISO, format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { callOpenAI } from "@utils/openaiContext";

const RequestDetailedView = ({ event, requestId }) => {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id;
  const start_date = event?.start_date ? parseISO(event.start_date) : null;
  const end_date = event?.end_date ? parseISO(event.end_date) : null;
  const formattedStartDate = start_date
    ? format(start_date, "dd/MM/yyyy", { locale: fr })
    : "N/A";
  const formattedEndDate = end_date
    ? format(end_date, "dd/MM/yyyy", { locale: fr })
    : "N/A";

  const [request, setRequest] = useState();
  const [prompt, setPrompt] = useState()
  const [content, setContent] = useState()
  useEffect(() => {
    setRequest(event?.requests?.find((req) => req._id === requestId));
    
    
  }, [event]);

  useEffect(() => {
    setPrompt(request?.generatedPrompt)
  
  
  }, [request])

  // useEffect(() => {
  //   const fetchContent = async () => {
  //     if (!request?.generatedContent && prompt) {
  //       const responseContent = await callOpenAI(prompt);
  //       setContent(responseContent);
  //     }
  //   };

  //   fetchContent();
  // }, [prompt, request]);
  
  const fetchContent = async () => {
    if (!request?.generatedContent && prompt) {
      const responseContent = await callOpenAI(prompt);
      setContent(responseContent);
    }
  };
  useEffect(() => {
    console.log(content);
  

  }, [content])
  
  

  const aiResponse = request?.generatedContent;
  // "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hac habitasse platea dictumst quisque sagittis purus sit. Sit amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus. Tellus integer feugiat scelerisque varius morbi enim nunc. Turpis tincidunt id aliquet risus feugiat in ante metus dictum. Consequat ac felis donec et odio pellentesque diam volutpat commodo. Dignissim suspendisse in est ante in nibh mauris cursus mattis. Vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt. Lacinia at quis risus sed vulputate odio ut enim. Ut porttitor leo a diam. Aliquam purus sit amet luctus venenatis lectus magna fringilla. Tortor id aliquet lectus proin nibh nisl condimentum. Massa placerat duis ultricies lacus sed turpis. Nibh tortor id aliquet lectus proin nibh. Est ullamcorper eget nulla facilisi etiam dignissim diam quis. Dictum at tempor commodo ullamcorper a lacus vestibulum sed. Lobortis scelerisque fermentum dui faucibus in ornare. Orci a scelerisque purus semper. Volutpat maecenas volutpat blandit aliquam. Non diam phasellus vestibulum lorem sed risus ultricies tristique.";

  const links = [
    {
      name: "Modifier les détails de la requête",
      href: `/event/${eventId}/request/${requestId}/edit`,
    },
    {
      name: "Re-générer le contenu",
      href: `#`,
    },
    {
      name: "Retour à la page de l'évènement",
      href: `/event/${eventId}`,
    },
  ];

  const data = [
    { name: "Type d'évènement", value: event?.type_of_event },
    { name: "Public", value: event?.public_type },
    { name: "Thématiques", value: event?.thematics },
  ];

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
          <p className="mb-4">
            <span className="black_gradient font-bold text-2xl">
              {request?.topic}
            </span>{" "}
            - {event?.title}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
            Votre{" "}
            <span className="green_gradient">{request?.type_of_content}</span> à
            insérer dans votre{" "}
            <span className="blue_gradient">{request?.support}</span> à
            destination de vos{" "}
            <span className="orange_gradient">{request?.target}</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-500">
            {event?.description}
          </p>
        </div>
        <div className="flex prompt_infocard flex-col-reverse">
          <dt className="text-base leading-7 text-gray-800">{aiResponse}</dt>
          {/* <dd className="text-2xl font-bold leading-9 tracking-tight text-gray-800"> */}
          {/* {aiResponse}
          </dd> */}
        </div> 
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
      
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-gray-800 sm:grid-cols-2 md:flex lg:gap-x-10">
           
            {links.map((link) => (
              <Link key={link.name} href={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </div>
          {/* <dl className="mt-6 grid grid-cols-1 card_container gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
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
               <Link
                className=" prompt_cta_card text-center"
                href={`/event/${event?._id}`}
              >
                <span className=" cta_text p-1 ">
                  Retour à la page de mon évènement{" "}
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
          </dl> */}
        </div>
      </div>
    </div>
  );
};

export default RequestDetailedView;
