import Link from "next/link";

const Form = ({
  type,
  userData,
  submitting,
  handleSubmit,
  setUserData,
}) => {
  console.log(userData);
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
          <label>
          <span className="font-satoshi font-bold text-base text-gray-700">
            Votre prénom
          </span>
          <input
            value={userData?.first_name || ""}
            onChange={(e) => {
              setUserData({ ...userData, first_name: e.target.value });
            }}
            placeholder="Entrez votre prénom ici"
            required
            className="form_input"
          />
        </label>
          <label>
          <span className="font-satoshi font-bold text-base text-gray-700">
            Votre nom
          </span>
          <input
            value={userData?.last_name || ""}
            onChange={(e) => {
              setUserData({ ...userData, last_name: e.target.value });
            }}
            placeholder="Entrez votre nom ici"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-bold text-base text-gray-700">
            Votre token Eventmaker
          </span>
          <input
            value={userData?.token }
            onChange={(e) => {
              setUserData({ ...userData, token: e.target.value });
            }}
            placeholder="Entrez votre token ici"
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

export default Form;
