import Link from "next/link";

const FormEventEdit = ({
  type,
  event,
  submitting,
  handleSubmit,
  setEvent,
}) => {
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
            Quel type de contenu souhaitez-vous générer pour votre évènement ?
          </span>
          <textarea
          name="type_of_content" //
            value={event?.type_of_content || ""}
            onChange={handleChange}
            placeholder="Ex : Emails marketing pour des prospects froids"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-bold text-base text-gray-700">
            Quel est le type d'évènement qui décrit le mieux votre évènement ?
          </span>
          <textarea
          name="type_of_event"
            value={event?.type_of_event || ""}
            onChange={handleChange}
            placeholder="Ex : Congrès professionnel dédié au networking"
            required
            className="form_input"
          />
        </label>
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
        </label>
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
