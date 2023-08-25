"use client";
import { useState } from "react";

const RetroplanningView = ({ planningData }) => {
  // État pour suivre la visibilité des e-mails pour chaque catégorie
  const [visibility, setVisibility] = useState(
    planningData.reduce((acc, category) => {
      acc[category.id] = false; // Masqué par défaut
      return acc;
    }, {})
  );

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
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            <span className="green_gradient">TITLE </span>
            <br />
            <span className="black_gradient text-2xl">title 2?</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-500">
            Voici les différents rétroplanning proposés pour vos catégories :
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <dl className="mt-6 grid grid-cols-1 card_container gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card_container">
              {planningData.map((category) => (
                <div
                  key={category.id}
                  className="flex text-center cursor-pointer card_emails flex-col"
                >
                  <h2>
                  <span className="text-2xl font-bold tracking-tight blue_gradient">
                    <button
                      onClick={() => toggleVisibility(category.id)}
                    >
                      {category.name}
                    </button></span>
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
      </div>
    </div>
  );
};

export default RetroplanningView;
