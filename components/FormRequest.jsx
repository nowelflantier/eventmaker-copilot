'use client'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormRequest = ({ type, event, setEvent }) => {


  const router = useRouter();
  const [request, setRequest] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Créer une copie du tableau requests
    const newRequests = event.requests ? [...event.requests] : [];
    // Ajouter l'objet request au tableau requests
    newRequests.push(request);

    // Créez une copie de l'objet event avec les nouvelles requêtes
    const updatedEvent = {
      ...event,
      requests: newRequests,
    };

    // Mettez à jour l'état global avec updatedEvent
    await setEvent(updatedEvent);

    try {
      const response = await fetch(`/api/events/${event._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setRequest({});
        // Rediriger vers la page de l'événement ou une autre page si l'événement est créé/mis à jour avec succès
        router.push(`/event/${event._id}`);
        console.log(event);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));
    // console.log(request);
  };

  return (
    <section className="w-full max-w-full flex-start mb-10 flex-col">
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
              <option value="Texte">Texte</option>
              <option value="Structure">Structure</option>
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
              <option value="Grand public">Grand public</option>
              <option value="Visiteurs">Visiteurs</option>
              <option value="Prospects">Prospects</option>
              <option value="Exposants">Exposants</option>
              <option value="Organisation">Organisation</option>
              <option value="VIP">VIP</option>
              <option value="Invités">Invités</option>
            </select>
          </label>
        )}

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
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
    </section>
  );
};

export default FormRequest;
