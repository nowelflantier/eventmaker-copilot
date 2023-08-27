"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useChat } from "ai/react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";

const GenerateRetroplanning = ({ planningData, event, setEvent, eventId }) => {
  let updatedEvent = {}
  const router = useRouter()
  const pathname = usePathname()
  const [formVisibility, setFormVisibility] = useState(false);
  const [formData, setFormData] = useState([]);
  const [concatPrompt, setConcatPrompt] = useState();
  // Fonction pour créer le prompt
  const createPrompt = () => {
    let categoriesString = event?.categories
      .filter((category) => category.selected === true)
      .map(
        (category) => `- ${category.name} - id : ${category.id} - category.tone`
      )
      .join("\n");

    const promptString = `L'événement "${event?.title}" se déroulera du ${event?.start_date} au ${event?.end_date}. Voici les catégories pour lesquelles générer du contenu :\n${categoriesString}\nLes thématiques principales de l'événement sont ${event?.thematics}. Le type d'événement est un(e) ${event?.type_of_event} et le public cible est ${event?.public_type}.`;

    setConcatPrompt(promptString);
    // console.log(promptString);
    return promptString;
  };
  // Fonction pour mettre à jour le formulaire
  const updateFormData = ({ categoryId, field, value }) => {
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
    createPrompt();
    setFormData(updatedFormData);
  };

  const links = [
    {
      name: "Retour à la page de l'évènement",
      href: `/event/${eventId}`,
    },
    {
      name: pathname === `/event/${eventId}/retroplannings` ? "Modifier mes rétroplannings" : "Retour au dashboard",
      href: pathname === `/event/${eventId}/retroplannings` ? `/event/${eventId}/retroplannings/new` : '/dashboard',
    },
  ];

  const saveEventData = async (updatedEvent) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setTimeout(() => {
          router.push(`/event/${eventId}/retroplannings`)
        })
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  const system = `Générer un rétroplanning pour l'événement dont les informations te seront communiquées dans un prochain message. Tu dois créer un rétroplanning spécifique pour prévoir au mieux les communications pour chacune des catégories demandées en prenant en compte des dates cohérentes (par exemple les exposant ou les conférenciers doivent être contacté largement en amont, voire être booké d'une année sur l'autre) : \n- Exposant - id : 123\n- Visiteur - id : 456\n- Newsletter - id : 789\n- VIP  - XYZ\n- Speakers -ABC\nFormate le contenu au format Javascript, par exemple en respectant la structure de la base de données suivante :\n[\n{\ncategory_name: category_name,\nid: cateogory_id,\nemails: [{\ndate: date_heure_denvoi,\nsubject: subject,\nobjectif: objectif_de_lemail,\n},\n{\ndate: date_heure_denvoi,\nsubject: subject,\nobjectif: objectif_de_lemail,\n}]\n}\n]\n`;
  const user = `L'événement \"Les automnales 2023\" qui se déroule du 10 novembre 2023 9h00 au 22 novembre 2023 18h00. Les coour prévoir au mieux les communications pour chacune des catégories suivantes : \n- Exposant\n- Visiteur\n- Newsletter\n- VIP\nLes thématiques principales de l'évènement sont les sports nautiques, de montagne, collectifs mais aussi le vin, les spécialités locales suisses. Le type d'événement est un(e) Foire et le public cible est B2C.`;
  const assistant = `[{\n    \"id\": \"123\",\n    \"category_name\": \"Exposant\"\n    \"emails\": [{\n        \"date\": \"01/01/2023 09:00\",\n        \"subject\": \"Appel à candidatures pour les exposants\",\n        \"objectif\": \"Inviter les exposants à participer à l'événement\"\n    },\n    {\n        \"date\": \"01/07/2023 09:00\",\n        \"subject\": \"Confirmation des exposants retenus\",\n        \"objectif\": \"Notifier les exposants sélectionnés pour leur participation\"\n    },\n    {\n        \"date\": \"01/10/2023 09:00\",\n        \"subject\": \"Informations pratiques pour les exposants\",\n        \"objectif\": \"Fournir les détails logistiques et les informations nécessaires aux exposants\"\n    }]\n},\n{\n    \"id\": \"456\",\n\"category_name\": \"Visiteur\"\n    \"emails\": [{\n        \"date\": \"01/08/2023 09:00\",\n        \"subject\": \"Invitation à visiter Les Automnales 2023\",\n        \"objectif\": \"Encourager les visiteurs à participer à l'événement\"\n    },\n    {\n        \"date\": \"01/11/2023 09:00\",\n        \"subject\": \"Programme complet de l'événement\",\n        \"objectif\": \"Donner un aperçu détaillé du programme et des activités proposées\"\n    },\n    {\n        \"date\": \"01/15/2023 09:00\",\n        \"subject\": \"Rappel de l'événement\",\n        \"objectif\": \"Rappeler aux visiteurs la date et les horaires de l'événement\"\n    }]\n},\n{\n    \"id\": \"789\",\n\"category_name\": \"Newsletter\"\n    \"emails\": [{\n        \"date\": \"01/20/2023 09:00\",\n        \"subject\": \"Inscription à la newsletter de Les Automnales 2023\",\n        \"objectif\": \"Encourager les personnes intéressées à s'inscrire à la newsletter pour recevoir les dernières actualités\"\n    },\n    {\n        \"date\": \"01/25/2023 09:00\",\n        \"subject\": \"Offres exclusives pour les abonnés à la newsletter\",\n        \"objectif\": \"Proposer des offres spéciales aux abonnés de la newsletter\"\n    },\n    {\n        \"date\": \"01/30/2023 09:00\",\n        \"subject\": \"Derniers rappels avant l'événement\",\n        \"objectif\": \"Rappeler aux abonnés les dates et les horaires de l'événement\"\n    }]\n},\n{\n    \"id\": \"XYZ\",\n\"category_name\": \"VIP\"\n    \"emails\": [{\n        \"date\": \"01/01/2023 09:00\",\n        \"subject\": \"Invitation VIP à Les Automnales 2023\",`;

  const { isLoading, messages, append } =
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
        // console.log("Réponse reçue:", response);
      },
      onError() {
        // console.log("Erreur reçue:", error);
      },
    });
  // console.log("Valeurs retournées par useChat:", { handleSubmit, isLoading, messages });

  const lastMessage =
    messages.length > 3 ? messages[messages.length - 1] : null;
  const generatedContent =
    lastMessage?.role === "assistant" ? lastMessage.content : null;

  //   console.log({messages, lastMessage, generatedContent});
  const onSubmit = async (e) => {
    e.preventDefault();
    await append({
      content: concatPrompt,
      role: "user",
    });
    console.log("mesages", messages);
  };
  useEffect(() => {
    console.log("État de isLoading:", isLoading);
    if (!isLoading && generatedContent) {
      setFormVisibility(false);
      // Convertir la chaîne de caractères en objet JavaScript
      const parsedGeneratedContent = JSON.parse(generatedContent);
      console.log(parsedGeneratedContent);

      // Vérifier si retroplannings existe déjà dans l'événement
    //   const newRetroplannings = event.retroplannings
    //     ? [...event.retroplannings, ...parsedGeneratedContent] // Ajouter le nouveau contenu au tableau existant
    //     : parsedGeneratedContent; // Utiliser le nouveau contenu comme tableau initial
    const newRetroplannings = parsedGeneratedContent
    updatedEvent = {
        ...event,
        retroplannings: newRetroplannings,
      };
        console.log(updatedEvent);
      // Mettez à jour l'état global avec updatedEvent
        setEvent(updatedEvent);
        saveEventData(updatedEvent);
    }
  }, [isLoading]);
  useEffect(() => {
    console.log("event", pathname);
    updatedEvent = event
  }, [event]);  // Se déclenche à chaque changement de `event`
  useEffect(() => {
    console.log("updated event",updatedEvent);
  

  }, [updatedEvent])
  
  return (
    <div className="relative isolate w-full glassmorphism mb-10 overflow-hidden bg-gray-900 py-24 sm:py-12">
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
          {/* formulaire de qualification */}
    
       {pathname === `/event/${eventId}/retroplannings/new` && <div className="card_container">
                <form
                  className=" w-full m-4  flex flex-col gap-7 glassmorphism"
                  onSubmit={onSubmit}
                >
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
                                  onChange={(e) => {
                                    updateFormData({
                                      categoryId: category.id,
                                      field: "tone",
                                      value: e.target.value,
                                    });
                                  }}
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
                            </div>
                          </div>
                        );
                      }
                    )}
                  <div className="flex-end mx-3 mb-5 gap-4">
                    {!isLoading && (
                      <button
                        type="submit"
                        className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                        // disabled={submitting}
                      >
                        Générer mes retro-plannings &rarr;
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
                  </div>
                </form>
              </div>}
       

          <p className=" text-lg leading-8 text-gray-500"></p>
        </div>
        {event?.retroplannings?.length > 0 && pathname === `/event/${eventId}/retroplannings` && (
          <>
            <div className="card_container">
              <h3 className="text-2xl mt-6 font-bold text-center tracking-tight text-black sm:text-3xl">
                <span className="red_gradient">
                  Voici les différents rétroplanning{" "}
                </span>
                proposés pour vos catégories :
              </h3>
            </div>
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <dl className="mt-6 grid grid-cols-1 card_container gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="card_container">
                  {event?.retroplannings?.map((retroplanning) => (
                    <div
                      key={retroplanning.id}
                      className="flex text-center cursor-pointer card_emails flex-col"
                    >
                      <h2 className=" text-2xl font-bold tracking-tight text-black sm:text-2xl">
                        <span
                          className="black_gradient"
                          onClick={() => toggleVisibility(retroplanning.id)}
                        >
                          {retroplanning.category_name}
                        </span>
                      </h2>

                          <div className="card_container">
                            {retroplanning.emails.map((email, index) => (
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
                        
                    </div>
                  ))}
                </div>
              </dl>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GenerateRetroplanning;
