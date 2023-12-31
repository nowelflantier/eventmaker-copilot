"use client";
// import Link from "next/link";
import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
// import { useEvent } from "@utils/EventContext";
// import { callOpenAI } from "@utils/openaiContext";
// import LoadingScreen from "./LoadingScreen";
import { useChat } from "ai/react";
import { useSearchParams } from "next/navigation";

const FormRequest2 = ({
  type,
  event,
  setEvent,
  request,
  setRequest,
  currentRequest,
}) => {
  const router = useRouter();
  // const [request, setRequest] = useState()
  const [public_type, setPublic_type] = useState("");
  const [type_of_content, setType_of_content] = useState("");
  const [support, setSupport] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("");
  const [target, setTarget] = useState("");
  const searchParams = useSearchParams();
  // const regenerate = searchParams.get("regenerate");

  // const [title, setTitle] = useState();
  // const [organizer, setOrganizer] = useState();
  // const [start_date, setStart_date] = useState()
  // const [end_date, setEnd_date] = useState()
  // const [thematics, setThematics] = useState()

  const [concatPrompt, setConcatPrompt] = useState(
    `Le/la ${event?.type_of_event} intitulé "${event?.title}" organisé par ${event?.organizer} est un évènement à destination d'un public ${event?.public_type} et qui aura lieu du ${event?.start_date} au ${event?.end_date}. Ses thématiques principales sont : ${event?.thematics}. Je veux générer un/une ${request?.type_of_content} pour mon ${request?.support} dont l'objet est "${request?.topic} " et qui est destiné aux ${request?.target} avec un ton ${request?.tone}.`
  );

  const params = useParams();
  const contentRef = useRef(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Mettez à jour l'état local pour le champ de formulaire correspondant
    if (name === "type_of_content") setType_of_content(value);
    if (name === "support") setSupport(value);
    if (name === "topic") setTopic(value);
    if (name === "target") setTarget(value);
    if (name === "tone") setTone(value);
    // Met à jour l'état 'request' avec les valeurs des champs du formulaire
    setRequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));

    // setRequest({ ...request, generatedPrompt: concatPrompt }); // Mise à jour de l'état de la requête avec concatPrompt
    console.log("handleChange - name:", name, "value:", value);

    handleInputChange(e);
  };
  const system = `Tu es un assistant virtuel pour les organisateurs d'événements utilisant la plateforme Eventmaker. Ton rôle est de générer du contenu pertinent pour les sites web et emails, formaté en HTML, en fonction des informations de l'événement concerné et des demandes spécifiques. \n\n L'objectif est de fournir du contenu directement utilisable, sans introduction ni conversation. Les réponses doivent être rédigées comme si elles provenaient de l'organisateur de l'événement lui-même. \n\n Eventmaker permet aux organisateurs de créer la vitrine de leur événement sur le web, des formulaires d'inscription, des emails, et propose des fonctionnalités de networking. \n\n En fonction de l'analyse du domaine d'activité, du type d'événement, du public ciblé et de la demande spécifique, retourne du contenu texte pertinent et formaté en HTML. Ce contenu doit être prêt à être copié/collé directement dans un email ou sur le site, et affiché tel quel dans un navigateur web. \n\n Tu dois insérer directement des variables en respectant ce format, par exemple : {{guest.first_name}}, {{guest.last_name}}, {{event.title}} `;
  const user = `Le/la Salon intitulé \"Salon International des Inventions\" organisé par Palexpo est un évènement à destination d'un public B2B et qui aura lieu du 8 mars 2024 au 11 mars 2024. Ses thématiques principales sont : Innovation, Invention, International. Je veux générer un/une texte pour mon email dont l'objet est \"Confirmation \" et qui est destiné aux Visiteurs avec un ton Amical.`;
  const assistant = `<HTML>\n  <body>\n    <h2>Confirmation de votre inscription - Salon International des Inventions</h2>\n    <p>Bonjour {{guest.first_name}},</p>\n    \n    <p>Nous sommes ravis de vous confirmer votre inscription au Salon International des Inventions, organisé par Palexpo. Merci d'avoir choisi de participer à cet événement unique en son genre.</p>\n    \n    <p>Le salon se déroulera du <strong>8 mars 2024 au 11 mars 2024</strong>. Nous espérons que ces quatre jours seront un moment riche en rencontres, en découvertes et en opportunités.</p>\n    \n    <p>Cet événement, axé sur les thématiques de l'innovation, de l'invention et de l'international, réunit des exposants de renommée mondiale venant des quatre coins du globe. Vous aurez ainsi l'opportunité d'explorer les dernières tendances technologiques, de découvrir des inventions révolutionnaires et de rencontrer des entrepreneurs inspirants.</p>\n    \n    <p>Nous vous encourageons à consulter notre site`;
  const { input, handleInputChange, handleSubmit, isLoading, messages, append } =
    useChat({
      body: {
        concatPrompt,
      },
      initialMessages: [
        {
          role: "system",
          content: `${system}`,
        },
        {
          role: "user",
          content: `${user}`,
        },
        {
          role: "assistant",
          content: `${assistant}`,
        },
      ],
      onResponse(response) {
        scrollToContent();
      },
    });

  // console.log("useChat - input:", {input}); // Log de input
  let redirectRequestId;
  if (requestId) {
    // En mode édition, utilisez l'ID de la requête que vous venez de mettre à jour
    redirectRequestId = requestId;
  } else {
    // En mode création, utilisez l'ID de la dernière requête dans le tableau
    const lastRequest = event?.requests?.[event.requests.length - 1];
    redirectRequestId = lastRequest?._id;
  }

  const saveEventData = async (updatedEvent) => {
    // e.preventDefault()
    // console.log(updatedEvent);
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });
      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        setRequest({});
        // Récupérez l'ID de la dernière requête dans le tableau des requêtes
        const lastRequest = data.requests?.[data.requests.length - 1];
        const newRequestId = lastRequest?._id;
        setTimeout(() => {
          router.push(`/event/${eventId}/request/${newRequestId}`);
        }, 2500);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Définir l'état initial des champs de formulaire en fonction de `request`
    setPublic_type(request?.public_type || "");
    setType_of_content(request?.type_of_content || "");
    setSupport(request?.support || "");
    setTopic(request?.topic || "");
    setTone(request?.tone);
    setTarget(request?.target);

    // Mettre à jour concatPrompt en utilisant les valeurs de `request` et `event`
    setConcatPrompt(
      `Le/la ${event?.type_of_event} intitulé "${event?.title}" organisé par ${event?.organizer} est un évènement à destination d'un public ${request?.public_type} et qui aura lieu du ${event?.start_date} au ${event?.end_date}. Ses thématiques principales sont : ${event?.thematics}. Je veux générer un/une ${request?.type_of_content} pour mon ${request?.support} dont l'objet est "${request?.topic} " et qui est destiné aux ${request?.target} avec un ton ${request?.tone}.`
    );
  }, [request]);
  useEffect(() => {
    // Mettre à jour concatPrompt en utilisant les valeurs actuelles des champs de formulaire
    setConcatPrompt(
      `Le/la ${event?.type_of_event} intitulé "${event?.title}" organisé par ${event?.organizer} est un évènement à destination d'un public ${public_type} et qui aura lieu du ${event?.start_date} au ${event?.end_date}. Ses thématiques principales sont : ${event?.thematics}. Je veux générer un/une ${type_of_content} pour mon ${support} dont l'objet est "${topic} " et qui est destiné aux ${target} avec un ton ${tone}.`
    );
  }, [type_of_content, support, topic, target, tone]); // Dépendances de l'effet

  useEffect(() => {
    if (!isLoading && generatedContent) {
      const newRequests = event.requests ? [...event.requests] : [];
      console.log("new request useeffect", newRequests);
      const updatedRequest = {
        ...request,
        // generatedContent: generatedContent,
        generatedContent: generatedContent,
        isContentGenerated: true,
      };
      // Trouver et mettre à jour la demande existante ou ajouter la nouvelle demande

      if (requestId) {
        const index = newRequests.findIndex((req) => req._id === requestId);
        newRequests[index] = updatedRequest;
      } else {
        newRequests.push(updatedRequest);
      }
      // Créez une copie de l'objet event avec les nouvelles requêtes
      const updatedEvent = {
        ...event,
        requests: newRequests,
      };

      console.log(updatedEvent);
      // Mettez à jour l'état global avec updatedEvent
      setEvent(updatedEvent);
      saveEventData(updatedEvent);
    }
  }, [isLoading]);

  const lastMessage =
    messages.length > 3 ? messages[messages.length - 1] : null;
  const generatedContent =
    lastMessage?.role === "assistant" ? lastMessage.content : null;
  // useEffect(() => {
  //   console.log(generatedContent);
  // }, [generatedContent])
  console.log(messages);

  const onSubmit = async (e) => {
    e.preventDefault();

    await append({
      content: concatPrompt,
      role: "user",
    });
    console.log("mesages", messages);
  };
  return (
    <section className="w-full max-w-full flex-start mb-10 flex-col">
      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={onSubmit}
      >
        {!generatedContent && (
          <>
            <label>
              <span className="font-satoshi font-bold text-base text-gray-700">
                Quel est le type de contenu souhaitez-vous générer ?
              </span>
              <select
                name="type_of_content"
                value={type_of_content}
                onChange={handleChange}
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

            <label>
              <span className="font-satoshi font-bold text-base text-gray-700">
                Pour quel support ?
              </span>
              <select
                name="support"
                // value={request?.support || ""}
                // onChange={handleChange}
                value={support}
                onChange={handleChange}
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
                value={topic}
                onChange={handleChange}
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
                value={target}
                onChange={handleChange}
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
                value={tone}
                onChange={handleChange}
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
          </>
        )}

        {!isLoading && !generatedContent && (
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
            <span className="loading loading-md loading-dots">
              <span style={{ backgroundColor: "white" }} />
              <span style={{ backgroundColor: "white" }} />
              <span style={{ backgroundColor: "white" }} />
            </span>
          </button>
        )}

        {generatedContent && (
          <>
            <output className="space-y-10 my-10">
              {generatedContent && (
                <>
                  <div>
                    <h2
                      className="sm:text-4xl text-3xl orange_gradient font-bold text-slate-900 mx-auto"
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
                      <div
                        className="preview_content"
                        dangerouslySetInnerHTML={{ __html: generatedContent }}
                      />

                      {/* <p>{generatedContent}</p> */}
                    </div>
                  </div>
                </>
              )}
            </output>
          </>
        )}
      </form>
    </section>
  );
};

export default FormRequest2;
