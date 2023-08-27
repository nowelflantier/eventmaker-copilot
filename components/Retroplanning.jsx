"use client";
import { useState } from "react";
import Link from "next/link";

const RetroplanningView = ({ planningData, event, eventId }) => {
  // État pour suivre la visibilité des e-mails pour chaque catégorie
  const [visibility, setVisibility] = useState(
    planningData.reduce((acc, category) => {
      acc[category.id] = false; // Masqué par défaut
      return acc;
    }, {})
  );

  const [formVisibility, setFormVisibility] = useState(true);
  // Fonction pour mettre à jour le formulaire

  // Initialisation de formData avec les valeurs de event.retroplannings
  const [formData, setFormData] = useState([]);

  // Fonction pour mettre à jour le formulaire
  const updateFormData = ({ categoryId, field, value }) => {
    console.log("Updating form data", { categoryId, field, value, formData }); // Debug

    const updatedFormData = [...formData];
    const index = updatedFormData.findIndex(
      (item) => item.categoryId === categoryId
    );

    if (index !== -1) {
      updatedFormData[index] = {
        ...updatedFormData[index],
        [field]: value,
      };
    } else {
      updatedFormData.push({
        categoryId,
        [field]: value,
      });
    }

    setFormData(updatedFormData);
  };

  const links = [
    {
      name: "Retour à la page de l'évènement",
      href: `/event/${eventId}`,
    },
  ];
  const handleFormVisibility = () => {
    setFormVisibility(!formVisibility);
  };
  const toggleVisibility = (categoryId) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [categoryId]: !prevVisibility[categoryId],
    }));
  };
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
        <div className="mx-auto  lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="green_gradient">{event?.title} </span>
            <br />
            <span className="black_gradient text-2xl">{event?.organizer}</span>
          </h1>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base mb-4 font-semibold leading-7 text-gray-800 sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                <Link key={link.name} href={link.href}>
                  {link.name} <span aria-hidden="true">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="card_container">
            <button
              className="prompt_cta_card text-center"
              onClick={handleFormVisibility}
            >
              <span className="cta_text p-1">
                Générer du contenu pour mon évènement{" "}
                <span aria-hidden="true">&rarr;</span>
              </span>
            </button>
          </div>
          {formVisibility && (
            <>
              {" "}
              <div className="card_container">
              <form className=" w-full m-4  flex flex-col gap-7 glassmorphism">
                {event?.categories
                  .filter((category) => category.selected === true)
                  .map(
                    (
                      category // Utilisation de event.categories ici
                    ) => {
                      const retroPlanning = event?.retroplannings?.find(
                        (item) => item.id === category.id
                      );
                      const formCategory = formData?.find(
                        (item) => item.categoryId === category.id
                      );

                      return (
                        <div
                          key={category.id}
                          className="flex text-left w-full flex-col"
                        >
                          <h2
                            className="text-2xl font-bold tracking-tight sm:text-2xl"
                            onClick={() => toggleVisibility(category.id)}
                          >
                            <span className="blue_gradient">
                              {category.name}
                            </span>
                          </h2>

                          <div>
                            {/* Formulaire pour chaque catégorie */}
                          
                              <label>
                                <span className="font-satoshi font-bold text-base text-gray-700">
                                  Quel ton souhaitez vous adopter dans votre
                                  contenu ?
                                </span>
                                <select
                                  name="tone"
                                  value={
                                    formCategory?.tone ||
                                    retroPlanning?.tone ||
                                    ""
                                  }
                                  onChange={(e) =>
                                    updateFormData({
                                      categoryId: category.id,
                                      field: "tone",
                                      value: e.target.value,
                                    })
                                  }
                                  required
                                  className="form_input"
                                >
                                  <option value="" disabled hidden>
                                    Choisissez une option
                                  </option>
                                  <option value="Neutre">Neutre</option>
                                  <option value="Professionnel">
                                    Professionnel
                                  </option>
                                  <option value="Amical">Amical</option>
                                  <option value="Excité">Excité</option>
                                  <option value="Enjoué">Enjoué</option>
                                  <option value="Jovial">Jovial</option>
                                  <option value="Froid">Froid</option>
                                </select>
                              </label>
                              {/* <label>
                              <span className="font-satoshi font-bold text-base text-gray-700">
                                Combien d'emails souhaitez vous générer ?
                              </span>
                              <select
                                name="email_amount"
                                value={
                                  formCategory?.email_amount ||
                                  retroPlanning?.email_amoun1 ||
                                  ""
                                }
                                onChange={(e) =>
                                  updateFormData({
                                    categoryId: category.id,
                                    field: "email_amount",
                                    value: e.target.value,
                                  })
                                }
                                required
                                className="form_input"
                              >
                                <option value="" disabled hidden>
                                  Choisissez une option
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                              </select>
                            </label> */}
                            
                            {/* <input
                          type="number"
                          className="form_input"
                          placeholder="Nombre d'emails"
                          onChange={(e) =>
                            updateFormData(
                              category.id,
                              "emailCount",
                              e.target.value
                            )
                          }
                        /> */}
                            {/* ... Ajoutez d'autres champs de formulaire ici */}
                          </div>
                        </div>
                      );
                    }
                  )}
                <div className="flex-end mx-3 mb-5 gap-4">
                  <button
                    onClick={handleFormVisibility}
                    className="text-gray-500 text-sm"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-1.5 text-sm black_btn rounded-full text-white"
                    // disabled={submitting}
                  >
                    {/* {submitting ? `${type}...` : type} */}
                    Générer mes retro-plannings
                  </button>
                </div></form>
              </div>
            </>
          )}

          <div className="card_container">
            <h3 className="text-2xl mt-6 font-bold text-center tracking-tight text-black sm:text-3xl">
              <span className="red_gradient">
                Voici les différents rétroplanning{" "}
              </span>
              proposés pour vos catégories :
            </h3>
          </div>
          <p className=" text-lg leading-8 text-gray-500"></p>
        </div>
        {event?.categories && (
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <dl className="mt-6 grid grid-cols-1 card_container gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="card_container">
                {planningData.map((category) => (
                  <div
                    key={category.id}
                    className="flex text-center cursor-pointer card_emails flex-col"
                  >
                    <h2 className=" text-2xl font-bold tracking-tight text-black sm:text-2xl">
                      <span
                        className="black_gradient"
                        onClick={() => toggleVisibility(category.id)}
                      >
                        {category.name}
                      </span>
                    </h2>
                    {visibility[category.id] && (
                      <div className="card_container">
                        {category.emails.map((email, index) => (
                          <div
                            key={index}
                            className="flex text-center card flex-col"
                          >
                            <p>
                              <span className="font-bold">Date :</span>{" "}
                              {email.date}
                            </p>
                            <p>
                              <span className="font-bold">Sujet :</span>{" "}
                              {email.subject}
                            </p>
                            <p>
                              <span className="font-bold">Objectif :</span>{" "}
                              {email.objectif}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetroplanningView;
