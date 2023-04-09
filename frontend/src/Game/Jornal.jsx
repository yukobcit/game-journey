import { useState, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import '../styles/Jornal.css'
import JornalRecord from "./JornalRecord";

const Jornal = ({ game }) => {
  const [jornals, setJornals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [jornal, setJornal] = useState("");

  useEffect(() => {
      // fetch the data for the selected game
      const fetchJornals = async () => {
        try {
          const response = await API.get("api", `/jornals/${game.id}`);
          const jornals = response.jornals;
          console.log("jornals: ", jornals);
          setJornals(jornals);
        } catch (error) {
          console.error(error);
          // Handle the error in whatever way is appropriate for your application
        }
      };
      fetchJornals();
  }, [game]);

  const handleSelect = () => {
    onSelect(game);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // submit the jornal to the server
    try{
        const response = await API.post("api", `/jornal/${game.id}`, {
            body: {
                jornal,
            },
        });
        const newJornals = [...jornals, response.jornal];
        setJornals(newJornals);
    } catch (error) {
        console.error(error);
        // Handle the error in whatever way is appropriate for your application
    }
    // clear the form and hide it
    setJornal("");
    setShowForm(false);
  };

  const handleJornalUpdate = async (jornalId, updatedJornal) => {
    try {
      await API.put("api", `/jornal/${jornalId}`, {
        body: {
          jornal: updatedJornal,
        },
      });
  
      const updatedJornals = jornals.map((item) => {
        if (item.id === jornalId) {
          return {
            ...item,
            jornal: updatedJornal,
          };
        }
        return item;
      });
  
      setJornals(updatedJornals);
    } catch (error) {
      console.error(error);
      setInput(content);
    }
  };
  
  const handleJornalDelete = async (jornalId) => {
    try {
        await API.del("api", `/jornal/${jornalId}`);
        const updatedJornals = jornals.filter((jornal) => jornal.id !== jornalId);
        setJornals(updatedJornals);
    } catch (error) {
        console.error(error);
    }
  };
  
  return (
    <div className="jornal-single">
      {game ? (
        <>
          <h2>{game.title} Jornal</h2>
          <div className="jornal-single-entry">{game.description}</div>
          {showForm ? (
            <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="jornal">New record:</label>
                <textarea
                  id="jornal"
                  value={jornal}
                  onChange={(e) => setJornal(e.target.value)}
                />
              </div>
              <div>
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button onClick={() => setShowForm(true)}>New record</button>
          )}
            <div className="jornal-records">
            {jornals &&
                jornals.map((jornal) => (
                <JornalRecord key={jornal.id} jornal={jornal} onUpdate={handleJornalUpdate} onDelete={handleJornalDelete}/>
                ))}
            </div>


        </>
      ) : (
        <div>Please select a game to see the journal.</div>
      )}

    </div>
  );
};
export default Jornal;
