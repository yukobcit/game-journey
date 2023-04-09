import React, { useEffect, useState } from 'react';
import { Auth, API, Storage } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";

import Jornal from "./Jornal";

const JornalWindow = ({mygame}) => {
  const [jornals, setJornals] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const {user, signOut } = useAuthenticator((context) => [context.user]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchJornals = async () => {
      try {
        const response = await API.get("api", `/my_games_log/${mygame.id}`);
        setJornals(response.jornals);

      } catch (error) {
        console.log("Error fetching messages: ", error);
        // Optionally, display an error message to the user
      }
    };
    fetchJornals();
  }, [mygame]);

  const handleSend = async () => {
    try {
     // Send the message to the server
      const result = await API.post("api", `/my_game_log/${mygame.id}`, {
        body: { jornal : input },
      });
      setJornals([result.jornal, ...jornals]);

      // Clear the input field
      setInput("");

    } catch (error) {
      console.log("Error sending message: ", error);
      // Optionally, display an error message to the user
    }
  };
  
  const toggleEditing = (event) => {
    event.stopPropagation();
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="JornalWindow">
      <div className="jornal">
        {jornals.map((jornal) => (
          <Jornal key={jornal.id} jornal={jornal} />
        ))}
      </div>
      <div className="jornal-edit">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className=""
          placeholder="Record your jornal..."
        />
        <button
          onClick={handleSend}
          className=""
        >
          Send
        </button>
      </div>
    </div>
  );
}
export default JornalWindow;