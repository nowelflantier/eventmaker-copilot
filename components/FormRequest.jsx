import Link from "next/link";
import { useState } from "react";

const FormRequest = ({ type, event, submitting, handleSubmit, setEvent }) => {
  const [eventType, setEventType] = useState(event?.type_of_event || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
    console.log(event);
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
            value={event?.type_of_content || ""}
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
          {event?.type_of_content && (
        <label>
          <span className="font-satoshi font-bold text-base text-gray-700">
            Pour quel support ?
          </span>
          <select
            name="support"
            value={event?.support || ""}
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
        </label>)}
        {event?.support && (
        <label>
          <span className="font-satoshi font-bold text-base text-gray-700">
            Quelle est la cible de votre contenu ?
          </span>
          <select
            name="target"
            value={event?.target || ""}
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
        </label>)}
        
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
