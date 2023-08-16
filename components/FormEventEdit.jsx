import Link from "next/link";
import { useState } from "react";

const FormEventEdit = ({ type, event, submitting, handleSubmit, setEvent }) => {
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
        <label>
          <span className="font-satoshi font-bold text-base text-gray-700">
            Quel est le type de votre évènement ?
          </span>
          <select
            name="type_of_event"
            value={event?.type_of_event || ""}
            onChange={handleChange}
            required
            className="form_input"
          >
            <option value="" disabled hidden>
              Choisissez une option
            </option>

            <option value="Salon">Salon</option>
            <option value="Foire">Foire</option>
            <option value="Congrès">Congrès</option>
          </select>
        </label>
        {event?.type_of_event && (
          <label>
            <span className="font-satoshi font-bold text-base text-gray-700">
              Pour quel public ?
            </span>
            <select
              name="public_type"
              value={event?.public_type || ""}
              onChange={handleChange}
              required
              className="form_input"
            >
              <option value="" disabled hidden>
              Choisissez une option
            </option>
              <option value="B2B">B2B</option>
              <option value="B2C">B2C</option><option value="B2C & B2B">B2C & B2B</option>
            </select>
          </label>
        )}
       
        {event?.public_type && (
        <label>
          <span className="font-satoshi font-bold text-base text-gray-700">
            Quelles sont les thématiques principales de votre évènement ?
          </span>
          <textarea
            name="thematics"
            value={event?.thematics || ""}
            onChange={handleChange}
            placeholder="Ex : Marketing, Evènementiel, Data"
            required
            className="form_input"
          />
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

export default FormEventEdit;
