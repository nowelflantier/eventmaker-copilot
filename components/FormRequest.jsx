"use client";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import { useEvent } from "@utils/EventContext";
import { callOpenAI } from "@utils/openaiContext";
import LoadingScreen from "./LoadingScreen";

export const config = {
  runtime: "edge",
};

const FormRequest = ({ type, event, setEvent, currentRequest }) => {
  const router = useRouter();

  // console.log(currentRequest);
  // const [newRequest, setNewRequest] = useState(request)
  const [request, setRequest] = useState();
  const [content, setContent] = useState();
  let concatPrompt = "";
  const params = useParams();
  const eventId = params.id;
  const requestId = params.req_id;
  const cancel_link = requestId
    ? `/event/${eventId}/request/${requestId}`
    : `/event/${eventId}`;
  const [submitting, setSubmitting] = useState(false);

  // const generateContent = async (generatedPrompt) => {
  //   let response; // Déclarez la variable en dehors du bloc try

  //   try {
  //     console.log("Generated Prompt:", generatedPrompt);
  //     response = await fetch("/api/generate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(generatedPrompt),
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   // if (!response.ok) {
  //   //   console.log(error);
  //   //   throw new Error(response.statusText);
  //   // }

  //   const generatedContent = await response.json();
  //   return generatedContent; // Retournez la valeur générée
  // };

  // const generateBio = async (concatPrompt) => {
  //   // e.preventDefault();
  //   setContent("");
  //   let done = false;
  //   let result = '';
  //   // setLoading(true);
  //   console.log(concatPrompt);
  //   const response = await fetch("/api/generate", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       prompt: concatPrompt,
  //     }),
  //   });

  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }

  //   const data = response.body;
  //   if (!data) {
  //     return;
  //   }
  //   const reader = data.getReader();
  //   const decoder = new TextDecoder();
  //    done = false;

  //   while (!done) {
  //     const { value, done: doneReading } = await reader.read();
  //     done = doneReading;
  //     const chunkValue = decoder.decode(value);
  //     setContent((prev) => prev + chunkValue);
  //   }

  //   // setLoading(false);
  // };

  let redirectRequestId;
  if (requestId) {
    // En mode édition, utilisez l'ID de la requête que vous venez de mettre à jour
    redirectRequestId = requestId;
  } else {
    // En mode création, utilisez l'ID de la dernière requête dans le tableau
    const lastRequest = data.requests?.[data.requests.length - 1];
    redirectRequestId = lastRequest?._id;
  }
  // useEffect(() => {
  //   if (content) {
  //     // Mettez à jour request avec le contenu généré

  //     const updatedRequest = { ...request, generatedContent: content };

  //     // Ici, vous pouvez ajouter le reste de votre logique pour mettre à jour event et rediriger l'utilisateur
  //     // ...

  //     // Redirection après 2 secondes (ou autre délai de votre choix)
  //     setTimeout(() => {
  //       router.push(`/event/${eventId}/request/${redirectRequestId}`);
  //     }, 2000);
  //   }
  // }, [content]); // Ce useEffect sera déc

  const generateBio = async (concatPrompt) => {
    setContent(""); // Réinitialisez le contenu
    console.log(concatPrompt);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: concatPrompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let result = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      result += chunkValue;
    }

    // setContent(result); // Mettez à jour l'état content directement ici
    return result
  };

  useEffect(() => {
    setRequest(currentRequest);
  }, [currentRequest]);
  useEffect(() => {
    // console.log(request);
  }, [request]);
  useEffect(() => {
    // console.log(event);
  }, [event]);

  const handleSubmit = async (e) => {
    console.log("État initial de event.requests:", event.requests);

    e.preventDefault();
    setSubmitting(true);
    // Créer une copie du tableau requests
    const newRequests = event.requests ? [...event.requests] : [];
    console.log("newRequests avant la mise à jour:", newRequests);

    // Concaténer les valeurs des champs souhaités
    concatPrompt = `Le/la ${event.type_of_event} intitulé "${event.title}" organisé par ${event.organizer} est un évènement à destination d'un public ${event.public_type} et qui aura lieu du ${event.start_date} au ${event.end_date}. Ses thématiques principales sont : ${event.thematics}. Je veux générer un/une ${request.type_of_content} pour mon ${request.support} dont l'objet est "${request.topic} " et qui est destiné aux ${request.target} avec un ton ${request.tone}.`;

    // console.log(generatedPrompt);

    // Générer le contenu
    const jsonContent = await generateBio(concatPrompt);
    const parsedContent = JSON.parse(jsonContent);
    const generatedContent = parsedContent.result;

    console.log(generatedContent);
    // Mettre à jour la requête avec le contenu généré
    const updatedRequest = {
      ...request,
      generatedContent: generatedContent,
      generatedPrompt: concatPrompt,
    };

    // Trouver et mettre à jour la demande existante ou ajouter la nouvelle demande

    if (requestId) {
      const index = newRequests.findIndex((req) => req._id === requestId);
      newRequests[index] = updatedRequest;
    } else {
      newRequests.push(updatedRequest);
    }
    console.log("newRequests après la mise à jour:", newRequests);

    // Créez une copie de l'objet event avec les nouvelles requêtes
    const updatedEvent = {
      ...event,
      requests: newRequests,
    };

    console.log(updatedEvent);
    // Mettez à jour l'état global avec updatedEvent
    setEvent(updatedEvent);

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });
      const data = await response.json();
      console.log(data);

      // if (response.ok) {
      //   setRequest({});

      //   // Attendre 2 secondes avant de rediriger l'utilisateur
      //   setTimeout(() => {
      //     router.push(`/event/${eventId}/request/${redirectRequestId}`);
      //   }, 2000);
     // }
    } catch (error) {
      console.log(error.message);
    } finally {
            setTimeout(() => {
        router.push(`/event/${eventId}/request/${redirectRequestId}`);
        setSubmitting(false);
      }, 2000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));
    // jusqu'ici ok, le useEffect ressort la request modifiée
  };

  return (
    <section className="w-full max-w-full flex-start mb-10 flex-col">
      <Suspense fallback={<LoadingScreen />}>
        {submitting || content ? (
          <LoadingScreen data={content} />
        ) : (
          <form
            className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
            onSubmit={handleSubmit}
          >
            {event?.public_type && (
              <label>
                <span className="font-satoshi font-bold text-base text-gray-700">
                  Quel est le type de contenu souhaitez-vous générer ?
                </span>
                <select
                  name="type_of_content"
                  value={request?.type_of_content || ""}
                  onChange={handleChange}
                  required
                  className="form_input"
                >
                  <option value="" disabled hidden>
                    Choisissez une option
                  </option>
                  <option value="Texte">Texte brut</option>
                  <option value="Structure">
                    Structure de page ou d'email
                  </option>
                </select>
              </label>
            )}
            {request?.type_of_content && (
              <label>
                <span className="font-satoshi font-bold text-base text-gray-700">
                  Pour quel support ?
                </span>
                <select
                  name="support"
                  value={request?.support || ""}
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
            )}
            {request?.support && (
              <label>
                <span className="font-satoshi font-bold text-base text-gray-700">
                  Dans quel but ?
                </span>
                <select
                  name="topic"
                  value={request?.topic || ""}
                  onChange={handleChange}
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
            )}
            {request?.topic && (
              <label>
                <span className="font-satoshi font-bold text-base text-gray-700">
                  Quelle est la cible de votre contenu ?
                </span>
                <select
                  name="target"
                  value={request?.target || ""}
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
            )}
            {request?.target && (
              <label>
                <span className="font-satoshi font-bold text-base text-gray-700">
                  Quel ton souhaitez vous adopter dans votre contenu ?
                </span>
                <select
                  name="tone"
                  value={request?.tone || ""}
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
            )}

            <div className="flex-end mx-3 mb-5 gap-4">
              <Link href={cancel_link} className="text-gray-500 text-sm">
                Annuler
              </Link>
              <button
                type="submit"
                className="px-5 py-1.5 text-sm black_btn rounded-full text-white"
                disabled={submitting}
              >
                {submitting ? `${type}...` : type}
              </button>
            </div>
          </form>
        )}
      </Suspense>
    </section>
  );
};

export default FormRequest;
