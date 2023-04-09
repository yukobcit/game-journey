import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import RouteGuard from "./RouteGuard";

import Header from "./Header";
import Login from "./Login";
import Home from "./Home";
import Game from "./Game/Games";
import MyGamesJornal from "./Game/MyGamesJornal";
import TimeLine from "./Game/TimeLine";


const amplifyConfig = {
  Auth: {
    mandatorySignIn: false,
    region: import.meta.env.VITE_APP_REGION,
    userPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_APP_USER_POOL_CLIENT_ID,
    identityPoolId: import.meta.env.VITE_APP_IDENTITY_POOL_ID,
  },

  API: {
    endpoints: [
      {
        name: "api",
        endpoint: import.meta.env.VITE_APP_API_URL,
        region: import.meta.env.VITE_APP_REGION,
      },
    ],
  },
};
Amplify.configure(amplifyConfig);

export default function App() {
  return (
    <Authenticator.Provider>
      <BrowserRouter>
      <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <RouteGuard>
                  <Home />
                </RouteGuard>
              }
            />
            <Route
              path="/games"
              element={
                <RouteGuard>
                  <Game />
                </RouteGuard>
              }
            />
            <Route
              path="/my-games"
              element={
                <RouteGuard>
                  <MyGamesJornal />
                </RouteGuard>
              }
            />
            <Route path = "/timeline" element = {<TimeLine />} />
            <Route path="/about" element={<div>About</div>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </BrowserRouter>
    </Authenticator.Provider>
  );
}
