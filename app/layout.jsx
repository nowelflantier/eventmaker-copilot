import "@styles/globals.css";
import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import { UserProvider } from "@utils/UserContext";
import { EventProvider } from "@utils/EventContext";



export const metadata = {
  title: "Eventmaker Copilot",
  description: "Exploitez le potentiel de vos évènements grâce à l'IA",
};
const RootLayout = ({children}) => {
 

  return (
    <html lang="fr">
      <body>
        <Provider>
          <UserProvider>
            <EventProvider>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Navbar/>
          {children}
        </main>
        </EventProvider>
        </UserProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
