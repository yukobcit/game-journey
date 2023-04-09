import React, { useEffect, useState } from 'react';
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import '../styles/Games.css'
import Form from './FormGame';

const Games = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [ games, setGames ] = useState([]);
  const [showForm, setShowForm] = useState(false); // add a state variable to track whether the form should be shown or not
  const [myGames, setMyGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("api", "/games");
        setGames(response.games);
      } catch (error) {
        console.error(error);
        // Handle the error in whatever way is appropriate for your application
      }
    };
    const fetchMyGames = async () => {
      try {
        const response = await API.get("api", "/mygames");
        setMyGames(response.myGames);
        console.log("mygames",response.myGames);
      } catch (error) {
        console.error(error);
        // Handle the error in whatever way is appropriate for your application
      }
    };

    fetchData();
    fetchMyGames();
  }, []);

  const isGameInMyList = (gameId) => {
    if(!myGames) return false;
    return myGames.some((myGame) => myGame.game_id === gameId);
  };
  
  const handleRemoveGameFromList = async (gameId) => {
    try {
      const response = await API.del("api", `/mygame/${gameId}`);
      setMyGames((myGames) => myGames.filter((myGame) => myGame.id !== gameId));
    } catch (error) {
      console.log(error);
    }
  };

  const renderGameButton = (game) => {
    console.log("game", game.id);
    if (isGameInMyList(game.id)) {
      return <button onClick={() => handleRemoveGameFromList(game.id)}>Remove from My Games</button>;
    } else {
      return <button onClick={() => handleAddGameToList(game.id)}>Add to My Games</button>;
    }
  };

  const handleFormToggle = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleSubmit = async (name, company, console, description, releaseDate) => {
    try {
      const response = await API.post("api", "/game", {
        body: {
          name,
          company,
          console,
          description,
          release_date: releaseDate,
        },
      });
      setGames([...games, response.game]);
    } catch (error) {
      // Handle the error in whatever way is appropriate for your application
    }
  };

  const handleAddGameToList = async (gameId) => {
    try {
      const response = await API.post("api", `/mygames/${gameId}`, {
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper">
      <div className='top'>
        <h2>List of Games</h2>
        {showForm == false ? 
        <div className='normal'>
        <button onClick={handleFormToggle}>Add Game</button>
        <div className="games">

        {games && games.map((game) => (
          <div key={game.id} className="game">
            <h3>{game.name ? game.name : "No Data"}</h3>
            <p><span>Company:</span> {game.company ? game.company : "No Data"}</p>
            <p><span>Console:</span> {game.console ? game.console : "No Data"}</p>
            <p><span>Description:</span> {game.description ? game.description : "No Data"}</p>
            {renderGameButton(game)}
            </div>
            ))}
          </div> 
        </div>
        :
        <div className='form-wrapper'>
          <button onClick={handleFormToggle}>Close</button>
          <Form onSubmit={handleSubmit} /> 
        </div>
       }


        </div>
        
    </div>
  );
};

export default Games;
