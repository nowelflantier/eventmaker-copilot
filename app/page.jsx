
import Setup from "@components/Setup";
import User from "@models/user";


const Home = () => { 

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
      <span className="green_gradient text-center">Avec Eventmaker Copilot </span>
        <br className="max-md:hidden" />
         boostez vos évènements
         <br className="max-md:hidden" />
         <span className="green_gradient text-center"> avec la puissance de l'IA</span>
      </h1>
      {/* <h2 className="head_text text-center">{User?.username}</h2> */}
      <p className="desc text-center">Eventmaker Copilot est une application web destinée aux organisateurs d'évènements. 
      <br/>
      <span className="text-xs mb-16">work in progress</span></p>
      <Setup/>
    </section>  
  );
};

export default Home;
