"use client";
// import Link from "next/link";
import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
// import { useEvent } from "@utils/EventContext";
// import { callOpenAI } from "@utils/openaiContext";
// import LoadingScreen from "./LoadingScreen";
import { useChat } from "ai/react";

const FormRequest2 = ({
  type,
  event,
  setEvent,
  request,
  setRequest,
  currentRequest,
}) => {
  const router = useRouter();
  const [public_type, setPublic_type] = useState("");
  const [type_of_content, setType_of_content] = useState("");
  const [support, setSupport] = useState("");
  const [topic, setTopic] = useState("");
  const [target, setTarget] = useState("");
  const [concatPrompt, setConcatPrompt] = useState(
    `Le/la ${event?.type_of_event} intitulé "${event?.title}" organisé par ${event?.organizer} est un évènement à destination d'un public ${event?.public_type} et qui aura lieu du ${event?.start_date} au ${event?.end_date}. Ses thématiques principales sont : ${event?.thematics}. Je veux générer un/une ${request?.type_of_content} pour mon ${request?.support} dont l'objet est "${request?.topic} " et qui est destiné aux ${request?.target} avec un ton ${request?.tone}.`
  );

  const params = useParams();
  const contentRef = useRef(null);
  const [currentMessage, setCurrentMessage] = useState([
    {
      role: "system",
      content:
        "Tu es Eventmaker Copilot, tu aides les organisateurs d'évènements qui utilisent la plateforme Eventmaker à optimiser la gestion de leur évènement et leur facilitent la tâche en leur proposant du contenu pertinent pour les sites web et emails.\n\nEventmaker leur permet notamment de créer la vitrine de leur évènement sur le web, des formulaires d'inscription, des emails et propose des fonctionnalités de networking.\n\nTu vas recevoir les informations de l'évènement concerné ainsi qu'une requete plus spécifique.\nRetourne une structure ou du contenu texte pertinents selon ton analyse de leur domaine d'activité, le type d'évènement et le public ciblé et la demande de la request.\n\nIntègre dans ta réponse des thématiques annexes et complémentaires pour les utilisateurs et le SEO.",
    },
  ]);

  const eventId = params.id;
  const requestId = params.req_id;
  const cancel_link = requestId
    ? `/event/${eventId}/request/${requestId}`
    : `/event/${eventId}`;
  const [submitting, setSubmitting] = useState(false);

  const scrollToContent = () => {
    if (contentRef.current !== null) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setRequest((prevRequest) => ({
  //     ...prevRequest,
  //     [name]: value,
  //   }));
  //   setConcatPrompt(
  //     `Le/la ${event?.type_of_event} intitulé "${event?.title}" organisé par ${event?.organizer} est un évènement à destination d'un public ${event?.public_type} et qui aura lieu du ${event?.start_date} au ${event?.end_date}. Ses thématiques principales sont : ${event?.thematics}. Je veux générer un/une ${request?.type_of_content} pour mon ${request?.support} dont l'objet est "${request?.topic} " et qui est destiné aux ${request?.target} avec un ton ${request?.tone}.`
  //   );
  //   // setRequest({ ...request, generatedPrompt: concatPrompt }); // Mise à jour de l'état de la requête avec concatPrompt
  //   console.log(concatPrompt);
  // };

  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      body: {
        concatPrompt,
        target,
        public_type,
        type_of_content,
        support,
        topic,
      },
      onResponse() {
        scrollToContent();
      },
    });

  //console.log("useChat - input:", input); // Log de input
  console.log("useChat - isLoading:", isLoading); // Log de isLoading
  console.log("useChat - messages:", messages); // Log de messages
  let redirectRequestId;
  if (requestId) {
    // En mode édition, utilisez l'ID de la requête que vous venez de mettre à jour
    redirectRequestId = requestId;
  } else {
    // En mode création, utilisez l'ID de la dernière requête dans le tableau
    const lastRequest = event?.requests?.[event.requests.length - 1];
    redirectRequestId = lastRequest?._id;
  }

  // useEffect(() => {
  //   setRequest(currentRequest);
  //   console.log({ request, currentRequest });
  // }, [currentRequest]);
  useEffect(() => {
    setConcatPrompt(
      `Le/la ${event?.type_of_event} intitulé "${event?.title}" organisé par ${event?.organizer} est un évènement à destination d'un public ${event?.public_type} et qui aura lieu du ${event?.start_date} au ${event?.end_date}. Ses thématiques principales sont : ${event?.thematics}. Je veux générer un/une ${input?.type_of_content} pour mon ${input?.support} dont l'objet est "${input?.topic} " et qui est destiné aux ${input?.target} avec un ton ${input?.tone}.`
    );
  }, [input]);

  const onSubmit = (e) => {
    // e.preventDefault();
    console.log(input);
    setTarget(input.target);
    setPublic_type(input.public_type);
    setType_of_content(input.type_of_content);
    setSupport(input.support);
    setTopic(input.topic);
    handleSubmit(e);
  };

  const lastMessage = messages[messages.length - 1];
  const generatedContent =
    lastMessage?.role === "assistant" ? lastMessage.content : null;

  return (
    <section className="w-full max-w-full flex-start mb-10 flex-col">
      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={onSubmit}
      >
        {event?.public_type && !submitting && (
          <label>
            <span className="font-satoshi font-bold text-base text-gray-700">
              FormReq2 - Quel est le type de contenu souhaitez-vous générer ?
            </span>
            <select
              name="type_of_content"
              // value={request?.type_of_content || ""}
              value={input?.type_of_content}
              onChange={handleInputChange}
              required
              className="form_input"
            >
              <option value="" disabled hidden>
                Choisissez une option
              </option>
              <option value="Texte">Texte brut</option>
              <option value="Structure">Structure de page ou d'email</option>
            </select>
          </label>
        )}
        
          <label>
            <span className="font-satoshi font-bold text-base text-gray-700">
              Pour quel support ?
            </span>
            <select
              name="support"
              // value={request?.support || ""}
              // onChange={handleChange}
              value={input?.support}
              onChange={handleInputChange}
              required
              className="form_input"
            >
              <option value="" disabled hidden>
                Choisissez une option
              </option>
              <option value="Site web">Site web</option>
              <option value="Email">Email</option>
            </select>
          </label>
        
        
          <label>
            <span className="font-satoshi font-bold text-base text-gray-700">
              Dans quel but ?
            </span>
            <select
              name="topic"
              value={input?.topic}
              onChange={handleInputChange}
              // value={request?.topic || ""}
              // onChange={handleChange}
              required
              className="form_input"
            >
              <option value="" disabled hidden>
                Choisissez une option
              </option>
              <option value="Accueil">Accueil</option>
              <option value="Invitation">Invitation</option>
              <option value="Confirmation">Confirmation</option>
              <option value="Modération">Modération</option>
              <option value="Informations pratiques">
                Informations pratiques
              </option>
              <option value="Programme de conférences">
                Programme de conférences
              </option>
            </select>
          </label>
      
        
          <label>
            <span className="font-satoshi font-bold text-base text-gray-700">
              Quelle est la cible de votre contenu ?
            </span>
            <select
              name="target"
              // value={request?.target || ""}
              // onChange={handleChange}
              value={input?.target}
              onChange={handleInputChange}
              required
              className="form_input"
            >
              <option value="" disabled hidden>
                Choisissez une option
              </option>
              <option value="Visiteurs">Visiteurs</option>
              <option value="Prospects">Prospects</option>
              <option value="Exposants">Exposants</option>
              <option value="Prestataires">Prestataires</option>
              <option value="VIPs">VIPs</option>
              <option value="Invités">Invités</option>
            </select>
          </label>
       
          <label>
            <span className="font-satoshi font-bold text-base text-gray-700">
              Quel ton souhaitez vous adopter dans votre contenu ?
            </span>
            <select
              name="tone"
              // value={request?.tone || ""}
              // onChange={handleChange}
              value={input?.tone}
              onChange={handleInputChange}
              required
              className="form_input"
            >
              <option value="" disabled hidden>
                Choisissez une option
              </option>
              <option value="Neutre">Neutre</option>
              <option value="Professionnel">Professionnel</option>
              <option value="Amical">Amical</option>
              <option value="Excité">Excité</option>
              <option value="Enjoué">Enjoué</option>
              <option value="Jovial">Jovial</option>
              <option value="Froid">Froid</option>
            </select>
          </label>
        

        {!isLoading && (
          <button
            className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
            type="submit"
          >
            Générer votre contenu &rarr;
          </button>
        )}
        {isLoading && (
          <button
            className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
            disabled
          >
            <span className="loading">
              <span style={{ backgroundColor: "white" }} />
              <span style={{ backgroundColor: "white" }} />
              <span style={{ backgroundColor: "white" }} />
            </span>
          </button>
        )}

        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <output className="space-y-10 my-10">
          {generatedContent && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={contentRef}
                >
                  Votre contenu généré : 
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                <div
                  className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedContent);
                    toast("Content copied to clipboard", {
                      icon: "✂️",
                    });
                  }}
                  key={generatedContent}
                >
                  <p>{generatedContent}</p>
                </div>
              </div>
            </>
          )}
        </output>
      </form>
    </section>
  );
};

export default FormRequest2;
