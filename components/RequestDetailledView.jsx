"use client";
import { parseISO, format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { callOpenAI } from "@utils/openaiContext";
import { useChat } from "ai/react";
import { Toaster, toast } from 'react-hot-toast';


const RequestDetailedView = ({ event, requestId }) => {
  const router = useRouter();
  const contentRef = useRef(null);

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
  const [prompt, setPrompt] = useState();
  const [content, setContent] = useState();


  useEffect(() => {
    setRequest(event?.requests?.find((req) => req._id === requestId));
  }, [event]);

  const onSubmit = (e) => {
    // e.preventDefault();
    setPrompt(request?.generatedPrompt);
    console.log(prompt);
    handleSubmit(e);
  };

  // const onSubmit = (e) => {
  //   // e.preventDefault();
  //   handleSubmit(e);
  // };
  // const fetchContent = async () => {
  //   if (!request?.generatedContent && prompt) {
  //     const responseContent = await callOpenAI(prompt);
  //     setContent(responseContent);
  //   }
  // };
  // useEffect(() => {
  //   console.log(content);

  // }, [content])


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

  return (
    <div className="relative isolate w-full  glassmorphism mb-10 overflow-hidden bg-gray-900 py-24 sm:py-12">
             <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
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
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                <div
                  className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                  onClick={() => {
                    navigator.clipboard.writeText(request?.generatedContent);
                    toast("Contenu copié dans le presse papier !", {
                      icon: "✂️",
                    });
                  }}
                  key={request?.generatedContent}
                >
                  <p>{request?.generatedContent}</p>
                </div>
              </div>
            
          
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-gray-800 sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <Link key={link.name} href={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailedView;
