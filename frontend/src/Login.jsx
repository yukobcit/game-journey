import { useAuthenticator} from "@aws-amplify/ui-react";
import { Navigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";

import "@aws-amplify/ui-react/styles.css";

export default function Login() {
  const { route } = useAuthenticator((context) => [context.route]);

  if (route == "idle") {
    return <></>;
  }

  if (route == "authenticated") {
    return <Navigate to="/" />;
  }

  return (
    <Authenticator signUpAttributes={["email"]} />
  );
}
